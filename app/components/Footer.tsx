export default function Footer() {
  return (
    <footer className="py-3 flex flex-col items-center gap-2 border">
      <nav className="flex gap-4 text-xs text-neutral-500">
        <a
          href="/privacy"
          className="hover:text-neutral-700 transition-colors"
        >
          Privacy
        </a>

        <span aria-hidden="true">·</span>

        <a
          href="/about"
          className="hover:text-neutral-700 transition-colors"
        >
          About
        </a>

        <span aria-hidden="true">·</span>

        <a
          href="/resolutions"
          className="hover:text-neutral-700 transition-colors"
        >
          What others are working on
        </a>
      </nav>

      <p className="text-[11px] text-neutral-400">
        Built by Titah Baudwin
      </p>
    </footer>
  );
}
