import { MainFooter } from "#components/core/main-footer";
import { MainHeader } from "#components/core/main-header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`bg-gray-100 m-0 ${
        process.env.NEXT_PUBLIC_APP_ENV === "test"
          ? "ring-2 ring-inset ring-red-500 rounded-lg"
          : ""
      }`}
    >
      <div className="flex flex-col min-h-screen lg:container mx-auto px-4 h-full">
        <div className={"grow flex flex-col"}>
          <MainHeader />
          <div className={"grow flex flex-col"}>
            {/* TODO: navigation */}
            <main className="grow flex flex-col">{children}</main>
          </div>
        </div>
        <MainFooter />
      </div>
      {/* TODO: navigation */}
    </div>
  );
}
