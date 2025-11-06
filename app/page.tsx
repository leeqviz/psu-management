import { LinksSection } from "@/components/core/links-section";
import { NewsSection } from "@/components/core/news-section";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grow flex flex-col gap-4 sm:gap-5 lg:gap-6">
      <LinksSection />
      <div>Home</div>
      <Link href="/test">Go to Test page</Link>
      <NewsSection />
    </div>
  );
}
