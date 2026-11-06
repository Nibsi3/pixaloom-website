export class RequestBodyError extends Error {
  constructor(readonly status: 400 | 408 | 413) {
    super('Request body could not be read.');
  }
}

// Limit both bytes and total read time. A broken or stalled stream must not
// keep an enquiry or best-effort analytics request open indefinitely.
export async function readRequestText(request: Request, { maxBytes, timeoutMs = 5000 }: { maxBytes: number; timeoutMs?: number }): Promise<string> {
  let reader: ReadableStreamDefaultReader<Uint8Array>;
  try {
    if (!request.body) throw new RequestBodyError(400);
    reader = request.body.getReader();
  } catch {
    throw new RequestBodyError(400);
  }

  let timer: ReturnType<typeof setTimeout> | undefined;
  let completed = false;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new RequestBodyError(408)), timeoutMs);
  });
  const read = async () => {
    const decoder = new TextDecoder('utf-8', { fatal: true });
    let text = '';
    let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        text += decoder.decode();
        completed = true;
        return text;
      }
      bytes += value.byteLength;
      if (bytes > maxBytes) throw new RequestBodyError(413);
      text += decoder.decode(value, { stream: true });
    }
  };

  try {
    return await Promise.race([read(), deadline]);
  } catch (error) {
    throw error instanceof RequestBodyError ? error : new RequestBodyError(400);
  } finally {
    clearTimeout(timer);
    // An underlying producer's cancel promise can also stall or reject.
    if (!completed) void reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}
