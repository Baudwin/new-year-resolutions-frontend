export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-4 py-12 flex justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight">
          Privacy
        </h1>

        <div className="mt-6 space-y-4 text-[15px] leading-7 text-neutral-800">
          <p>
            We do not ask you to create an account.
          </p>

          <p>
            Resolutions are not linked to your identity.
          </p>

          <p>
            Resolutions are shown anonymously.
            No names, emails, or identifying details are attached.
          </p>

          <p>
            We do not sell your data, track you across websites, or use
            reflections for advertising.
          </p>

          <p>
             Responses are generated to reply to your input, not to profile you.
          </p>
{/* 
          <p>
            If you clear your browser data, your anonymous identifier is removed.
          </p> */}
        </div>
      </div>
    </main>
  );
}
