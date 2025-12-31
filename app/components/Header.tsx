import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full py-6 px-8 sm:px-2 bg-neutral-100 shadow">
      <div className=" px-4">
        <Link
          href="/"
          className="text-xl font-semibold text-neutral-900 hover:opacity-80 transition uppercase"
        >
          Resolutions.
        </Link>
      </div>
    </header>
  );
}