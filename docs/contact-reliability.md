# Enquiry delivery and retry boundaries

The server-rendered form keeps its fields and submit control disabled until the
client handler is attached. Without JavaScript, direct email and WhatsApp links
remain available. The form also declares POST as a defense against native GET
submission putting personal details in the URL or browser history. It does not
provide a separate native submission route.

The form snapshots its values before disabling the editable fields. A synchronous
in-flight guard prevents repeated submit events from creating additional requests
in that form. Fields become editable after an error; acceptance clears the form.
Keyboard focus moves to the error or acceptance message, and explicitly starting
another enquiry focuses Name. The initial page load does not take focus.

## Supported provider retry contract

The browser creates an opaque UUID v4 for a logical enquiry. It reuses that key
only while the same form instance has an unchanged serialized payload. Editing
the payload or starting another enquiry after acceptance creates a new key. The
key and payload are kept in memory, not local/session storage or analytics.

The contact route validates the optional `Idempotency-Key` header, namespaces it
as `pixaloom-enquiry-<uuid>`, and passes it to the existing ByteSend endpoint.
No timestamps or per-request metadata are added to the provider body. Legacy
callers without a key remain supported; they have no retry deduplication from
this integration. Reloading, navigating away or using another tab creates a new
form instance and therefore does not preserve this protection.

ByteSend's published API contract specifies a 24-hour replay window: the same
key/body returns the earlier email ID, a different body produces a conflict, and
an in-progress send can also produce a conflict. Primary source reviewed on
6 November 2026:

- [Send-email route and documented header contract](https://github.com/ByteSendApp/ByteSend/blob/88cd18d4736c0b6c6dc6a7046ec2b7523ea79c54/apps/web/src/server/public-api/api/emails/send-email.ts)
- [Provider locking and replay implementation](https://github.com/ByteSendApp/ByteSend/blob/88cd18d4736c0b6c6dc6a7046ec2b7523ea79c54/apps/web/src/server/service/idempotency-service.ts)

This source review is not verification of the exact running cloud revision or a
custom ByteSend installation. A backend that ignores the header cannot provide
the documented protection. No real emails were sent to test the provider.

## Ambiguous outcomes

There are no automatic retries. A provider timeout, network error, conflict or
malformed acceptance response must not be presented as proof that no email was
sent. The API returns an unconfirmed-delivery message and asks the visitor to
contact the studio before resending. Provider acceptance is not inbox delivery.
The response and logs never expose enquiry contents, provider bodies, credentials
or idempotency keys. Operational acceptance events are not unique-delivery counts.

The upload is bounded by 24,000 bytes and a five-second read deadline. Provider
fetching and response reading share a ten-second abort signal; the browser allows
twenty seconds for its request. JSON content types are matched as media types,
not substrings. Control characters are rejected in the name and email fields
before those values are used for email headers.

## Local verification

`scripts/contact-resilience.test.cjs` exercises input boundaries, ambiguity,
legacy callers, invalid keys, and concurrent/replayed sends against a local
fixture of the published ByteSend contract. That fixture demonstrates our
integration's behavior, not the live provider's behavior.

The same suite redirects native fetch to a loopback HTTP server that either
never returns headers or stalls partway through its JSON body. A shortened real
abort timer verifies both cases exit, use the configured ten-second deadline,
and do not automatically send again. Only a synthetic test credential is used.
`scripts/inquiry-submission.test.cjs` covers form concurrency, key reuse/rotation,
pending-field protection, error recovery and focus transitions. Existing budget,
validation, upload and email regression suites remain applicable.
