import { Divider } from "#components/core/divider";
import { Reference } from "#components/core/reference";

interface ReferenceItem {
  href: string;
  text: string;
}

const references: ReferenceItem[] = [
  { href: "https://lib.psu.by/", text: "Научная библиотека" },
  {
    href: "https://elib.psu.by/?ysclid=ldmvgwmhof471840611",
    text: "Репозиторий научной библиотеки",
  },
  {
    href: "http://elib.psu.by:8009/marcweb2/",
    text: "Каталог научной библиотеки",
  },
  { href: "https://cit.psu.by/", text: "Центр информационных технологий" },
  { href: "http://talent.psu.by/", text: "Центр талантов" },
];

export function ReferencesList() {
  return (
    <div className="grow flex flex-col gap-2 sm:gap-2.5 lg:gap-3">
      <Divider>{"Ресурсы ПГУ"}</Divider>

      <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-1">
        {references.map(({ href, text }, ind) => (
          <Reference key={ind} href={href} target="_blank" text={text} />
        ))}
      </div>
    </div>
  );
}
