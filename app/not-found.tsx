import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-2">
      <span>TODO 404 page content</span>
      <Link href="/">Home</Link>
    </div>
  );
}
