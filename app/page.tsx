import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-2 w-full h-screen justify-center items-center">
      <h1 className="font-bold text-3xl mb-8">Liveblocks Examples</h1>
      <Link href="/avatars" className="underline hover:text-blue-500">
        Live Avatars
      </Link>
      <Link href="/cursors" className="underline hover:text-blue-500">
        Live Cursors
      </Link>
      <Link href="/cursors-scroll" className="underline hover:text-blue-500">
        Live Cursors with Scroll
      </Link>
    </main>
  );
}
