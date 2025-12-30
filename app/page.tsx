'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type ApiResponse = {
  resolution: { id: string; text: string; createdAt: string };
  aiResponse: { text: string; createdAt: string };
};

export default function HomePage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [latest, setLatest] = useState<any>(null);
  const router = useRouter();


    useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/resolution/latest`, {
      credentials: 'include',
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => setLatest(data))
      .catch(() => {});
  }, []);



  // const idempotencyKeyRef = useRef<string | null>(null);

  const canSubmit = useMemo(() => {
    const trimmedText = text.trim();
    return trimmedText.length >= 5 && trimmedText.length <= 150 && !loading;
  }, [text, loading]);

  function newIdempotencyKey() {
    return crypto.randomUUID();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

const trimmedText = text.trim();

    setLoading(true);
    setError(null);
    setResult(null);

    // idempotencyKeyRef.current = newIdempotencyKey();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/resolution`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            // 'Idempotency-Key': idempotencyKeyRef.current,
          },
          body: JSON.stringify({
            text: trimmedText,
            isPublic: true,
          }),
        }
      );

      if (!res.ok) {
        const bodyText = await res.text().catch(() => '');
        throw new Error(bodyText || `Request failed (${res.status})`);
      }

      const data = (await res.json()) as ApiResponse;
      setResult(data);
    } catch (err: any) {
      setError(
        err?.message?.includes('quota')
          ? 'Too many requests right now. Try again later.'
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }
  

  function onReset() {
    setText('');
    setResult(null);
    setError(null);
    setLoading(false);
    // idempotencyKeyRef.current = null;
  }

  return (

    latest ? 

          <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-xl w-full">
          <p className="text-sm text-neutral-500 mb-4">
            Hey! You were thinking about this earlier:
          </p>

          <div className="border border-neutral-200 bg-neutral-50 text-black p-4 rounded-lg mb-6">
            <p>"{latest.text}"</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => router.push(`/check-in/${latest.id}`)}
              className="px-4 py-2 bg-neutral-900 text-white rounded-lg"
            >
              Check in
            </button>

            <button
              onClick={() => setLatest(null)}
              className="text-neutral-600"
            >
              Start something new
            </button>
          </div>
        </div>
      </main>
      :
    
    <main className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-2xl">

        {/* Ai response */}
        {result ? (

            <div>
            <div className="mb-6">
          <p className="mt-2 text-2xl font-medium text-neutral-600">
            A few thoughts for you
          </p>
        </div>
          <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            

            <div className="text-xs text-neutral-500">
              Your reflection
            </div>

            <div className="mt-3 whitespace-pre-wrap text-[15px] leading-7 text-neutral-900">
              {result.aiResponse.text}
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={onReset}
                className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
              >
                Write another one
              </button>

            </div>
          </section>

            </div>

        ) : 
        
        (
            <div className='space-y-10'>

          <div className='mb-8'>
          <p className=' text-lg text-neutral-600 font-medium'>Its the start of a new year.</p>
          {/* <p className=' text-sm text-neutral-500 mb-6'>You made it though another year.</p> */}
          </div>

            <div>
          <h1 className="mt-2 mb-0.5 text-3xl text-neutral-600">
          What’s something you want to work on this year?
          </h1>
          <p className='text-neutral-500 mb-6 text-sm'>It doesnt't have to be perfect.</p>
     
            </div>

        <form onSubmit={onSubmit} className="">

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. I want to stop procrastinating and feel more in control."
            rows={5}
            maxLength={150}
            className="mt-3 w-full resize-none rounded-xl border border-neutral-200 p-4 text-[15px] leading-6 outline-none focus:ring-2 focus:ring-neutral-200 text-black"
            disabled={loading}
          />

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-xs text-neutral-500">
              {text.trim().length}/150
            </p>

            <button
              type="submit"
              disabled={!canSubmit}
              className=" rounded-md px-6 py-3 text-sm font-medium bg-neutral-900 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Taking a moment…' : 'Reflect'}
            </button>
          </div>

        <p className="mt-6 text-xs text-neutral-500">
          Tip: keep it honest and specific. The best answers come from real details.
        </p>


          {error && (
            <p className="mt-3 text-sm text-red-600">
              {error}
            </p>
          )}

        </form>
            </div>
            
            
        )
        
        
        }



      </div>
    </main>
  );
}
