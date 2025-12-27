'use client';

import { useEffect, useState } from 'react';

type Resolution = {
  id: string;
  text: string;
};

export default function WallPage() {
  const [items, setItems] = useState<Resolution[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  async function fetchResolutions(nextCursor?: string | null) {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/resolution/public`
    );

    if (nextCursor) {
      url.searchParams.set('cursor', nextCursor);
    }

    const res = await fetch(url.toString(), {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to load resolutions');
    }

    return res.json();
  }

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchResolutions();
        setItems(data.items);
        setCursor(data.nextCursor ?? null);
        setHasMore(Boolean(data.nextCursor));
      } catch {
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function loadMore() {
    if (!cursor || loadingMore) return;

    setLoadingMore(true);

    try {
      const data = await fetchResolutions(cursor);
      setItems((prev) => [...prev, ...data.items]);
      setCursor(data.nextCursor ?? null);
      setHasMore(Boolean(data.nextCursor));
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <main className="min-h-screen px-4 py-12 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Page framing */}
        <header className="mb-10">

          <p className="mt-2 text-lg text-neutral-600 max-w-md">
            Some resolutions people are quietly working on.
          </p>
            <div className="mt-3">
                <a
                    href="/"
                    className="text-sm text-neutral-600 hover:text-neutral-900 transition"
                >
                    Write your own
                </a>
                </div>
        </header>


        {/* Content */}
        {loading ? (
          <p className="text-sm text-neutral-500">
            Loading…
          </p>
        ) : (
          <>
            {/* Wall */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="border border-neutral-200 rounded-2xl p-5 bg-white"
                >
                  <p className="text-xs text-neutral-500 mb-2">
                    Someone wrote:
                  </p>

                  <p className="text-[15px] leading-7 text-neutral-900 capitalize">
                    “{item.text}”
                  </p>
                </article>
              ))}
            </section>

            {/* Load more */}
            {hasMore && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition disabled:opacity-50"
                >
                  {loadingMore
                    ? 'Loading more…'
                    : 'See more reflections'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
