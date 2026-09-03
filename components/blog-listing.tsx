'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { publishedBlogPosts as blogPosts, blogCategories } from '@/components/blog-posts';
import { cn } from '@/components/utils';

export function BlogListing() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filtered = useMemo(
    () =>
      activeCategory === 'All'
        ? blogPosts
        : blogPosts.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <section className="py-8 sm:py-10">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-bg-700 bg-bg-850 px-2 py-0.5 text-[11px] text-fg-200">
              <span className="h-2 w-2 rounded-full bg-accent-500" />
              <span>Blog</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-fg-100 sm:text-3xl">
            Insights &amp; Guides
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-fg-300">
            Expert articles on web design, development, SEO, and digital strategy for businesses in George, Western Cape and the Garden Route.
          </p>
        </div>

        {/* Category filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {blogCategories.map((cat) => {
            const count =
              cat === 'All'
                ? blogPosts.length
                : blogPosts.filter((p) => p.category === cat).length;
            if (count === 0 && cat !== 'All') return null;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-medium transition',
                  activeCategory === cat
                    ? 'border-accent-600 bg-accent-600/10 text-accent-400'
                    : 'border-bg-700 bg-bg-800 text-fg-200 hover:border-fg-300/30 hover:bg-bg-700'
                )}
              >
                {cat}
                <span className="ml-1.5 text-[10px] opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Featured post */}
        {activeCategory === 'All' && filtered.length > 0 && (
          <Link
            href={`/blog/${filtered[0].slug}`}
            className="mb-6 block overflow-hidden rounded-lg border border-bg-700 bg-bg-800/40 transition hover:border-bg-600 hover:bg-bg-800/60"
          >
            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-accent-600/30 bg-accent-600/10 px-2 py-0.5 text-[10px] font-medium text-accent-400">
                  Latest
                </span>
                <span className="rounded-full border border-bg-700 bg-bg-850 px-2 py-0.5 text-[10px] text-fg-300">
                  {filtered[0].category}
                </span>
                <span className="text-[10px] text-fg-400">{filtered[0].date}</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-fg-100 sm:text-xl">
                {filtered[0].title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-fg-300">
                {filtered[0].excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs text-fg-400">{filtered[0].readTime}</span>
                <span className="text-xs font-medium text-accent-400">Read article →</span>
              </div>
            </div>
          </Link>
        )}

        {/* Blog grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(activeCategory === 'All' ? filtered.slice(1) : filtered).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-bg-700 bg-bg-800/40 transition hover:border-bg-600 hover:bg-bg-800/60"
            >
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-bg-700 bg-bg-850 px-2 py-0.5 text-[10px] text-fg-300">
                    {post.category}
                  </span>
                  <span className="text-[10px] text-fg-400">{post.date}</span>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-fg-100 group-hover:text-accent-400 transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-fg-300">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span className="text-[10px] text-fg-400">{post.readTime}</span>
                  <span className="text-[10px] font-medium text-accent-400 opacity-0 transition group-hover:opacity-100">
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm text-fg-300">
            No articles found in this category.
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-10 rounded-lg border border-bg-700 bg-bg-800/40 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-fg-100">Need a website that generates leads?</h3>
              <p className="mt-1 text-xs text-fg-300">
                We build conversion-first websites for businesses in George and the Garden Route. Let&apos;s talk.
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex shrink-0 items-center justify-center rounded-full border border-accent-600 bg-accent-600 px-5 py-2.5 text-sm font-medium text-white transition hover:border-accent-500 hover:bg-accent-500"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
