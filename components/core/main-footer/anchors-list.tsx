import fb from "#assets/svg/facebook-link.svg";
import inst from "#assets/svg/instagram-link.svg";
import tg from "#assets/svg/telegram-link.svg";
import vk from "#assets/svg/vkontakte-link.svg";
import yt from "#assets/svg/youtube-link.svg";
import { Anchor } from "#components/core/anchor";
import { Picture } from "#components/core/picture";

interface AnchorPictureItem {
  src: string;
  alt: string;
  href: string;
}

const anchorPictures: AnchorPictureItem[] = [
  {
    src: tg,
    alt: "telegram",
    href: "https://t.me/psu_by",
  },
  {
    src: inst,
    alt: "instagram",
    href: "https://www.instagram.com/psu.by/",
  },
  {
    src: vk,
    alt: "vk",
    href: "https://vk.com/polotsk_university",
  },
  {
    src: fb,
    alt: "facebook",
    href: "https://www.facebook.com/psu.by/",
  },
  {
    src: yt,
    alt: "youtube",
    href: "https://www.youtube.com/c/PolotskUniversity",
  },
];

export function AnchorsList() {
  return (
    <div className="flex justify-center gap-2 sm:gap-2.5 lg:gap-3">
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
