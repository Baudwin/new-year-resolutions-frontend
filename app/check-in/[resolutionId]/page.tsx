'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function CheckInPage() {
  const params = useParams();
  const router = useRouter();
  const resolutionId = params.resolutionId

  const [resolution, setResolution] = useState<any>(null);
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/resolution/${resolutionId}`,
      { credentials: 'include' },
    )
      .then(res => res.json())
      .then(data => setResolution(data));
  }, [resolutionId]);



  const submitCheckIn = async()=>{
    setSaving(true);

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/check-ins/${resolutionId}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      },
    );

    router.push('/');
  }


  return (

    resolution ? 

    <main className="min-h-screen flex items-center justify-center px-4 text-black py-16 sm:py-12">
      <div className="max-w-xl w-full">

        <p className="text-sm text-neutral-500 mb-4">
          You were thinking about this earlier:
        </p>

        <div className="border border-neutral-200 bg-neutral-50 p-4 rounded-lg mb-6">
          <p>{resolution?.text}</p>
        </div>


        <p className="text-sm text-neutral-500 mb-4">
          At the time, these were the thoughts you were given:
        </p>

        <div className="border border-neutral-200 bg-neutral-50 p-4 rounded-lg mb-8">
          <p className="text-neutral-700 leading-relaxed">
            {resolution?.aiResponse?.responseText}
          </p>
        </div>

        <h1 className="text-lg font-medium mb-2">
          How does this feel now?
        </h1>

        <textarea
          rows={4}
          placeholder="You can write a little, or nothing at all."
          value={text}
          onChange={e => setText(e.target.value)}
          className="w-full border border-neutral-300 rounded-lg p-4 mb-6"
        />


        <div className="mt-6 flex justify-between gap-4">
        <button
          onClick={submitCheckIn}
          disabled={saving}
          className="px-6 py-2 bg-neutral-900 text-white rounded-lg shadow"
        >
          {saving ? 'Saving…' : 'Save check-in'}
        </button>

          <button
            onClick={() => router.push('/')}
            className="text-sm text-neutral-600 rounded-xl border border-neutral-200 px-5 py-2 shadow "
          >
            Leave it here
          </button>
        </div>

      </div>
    </main>

    :

    null
  );
}
