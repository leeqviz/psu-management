import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      <div>Home</div>
      <Link href="/test">Go to Test page</Link>
    </div>
  );
}
