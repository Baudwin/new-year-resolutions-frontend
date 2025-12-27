export default function AboutPage() {
  return (
    <main className="min-h-screen px-4 py-12 flex justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight">
          About
        </h1>

        <div className="mt-6 space-y-4 text-[15px] leading-7 text-neutral-800">
          <p>
            This is a quiet place to pause and think about something you want to work on.
          </p>

          <p>
            You write one New year Resolution. You receive a gentle response. That’s it.
          </p>

          <p>
            There are no accounts to manage, no goals to track, and no pressure to improve.
            Just a moment to reflect — and, if you choose, to return to later.
          </p>

          <p>
           Resolutions are shared anonymously so people can see they’re not alone
            in what they’re thinking about.
          </p>

        </div>

        <p className="mt-10 text-xs text-neutral-400">
          Made by Titah Baudwin!
        </p>
      </div>
    </main>
  );
}
