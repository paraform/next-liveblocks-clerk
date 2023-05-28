import LiveAvatars from "@/components/live-avatars";

type PageProps = {};

function Page(props: PageProps) {
  return (
    <main className="flex w-full h-screen justify-center items-center">
      <LiveAvatars />
    </main>
  );
}

export default Page;
