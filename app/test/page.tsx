import Link from "next/link";

export default function Test() {
  return (
    <div className="flex flex-col gap-2">
      <div>Test</div>
      <Link href="/">Go to Home page</Link>
    </div>
  );
}
