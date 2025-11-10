import classroom from "#assets/svg/classroom-link.svg";
import mail from "#assets/svg/mail-link.svg";
import moodle from "#assets/svg/moodle-link.svg";
import { Anchor } from "#components/core/anchor";
import { Picture } from "#components/core/picture";

interface AnchorPictureItem {
  src: string;
  alt: string;
  href: string;
}

const anchorPictures: AnchorPictureItem[] = [
  {
    src: classroom,
    alt: "classroom",
    href: "https://classroom.google.com",
  },
  {
    src: moodle,
    alt: "moodle",
    href: "https://moodle.psu.by/",
  },
  {
    src: mail,
    alt: "mail",
    href: "https://mail.psu.by/",
  },
];

export function AnchorsList() {
  return (
    <div className="flex xxs:flex-col xxs:shrink-0 gap-2 sm:gap-2.5 lg:gap-3">
      {anchorPictures.map(({ src, alt, href }, ind) => (
        <Anchor
          key={ind}
          display="inline-block"
          tooltip={alt}
          target="_blank"
          href={href}
          className="group p-1"
        >
          <Picture
            src={src}
            className="group-hover:scale-[1.1] group-active:scale-[0.9] duration-200"
          />
        </Anchor>
      ))}
    </div>
  );
}
