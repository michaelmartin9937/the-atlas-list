import { Avatar } from "./Avatar";
import { InstagramLink } from "./InstagramLink";

type Props = {
  name: string;
  handle: string;
  image?: string;
  title?: string; // small tracked role label
  note?: string; // italic serif line, e.g. "Dee Creator 360"
  link?: boolean; // false for placeholder handles
  logo?: boolean; // image is a brand mark, not a portrait
};

// Figma (Desert After Dark): a 70px portrait disc beside a Playfair name,
// an optional role / note, and the Instagram chip. Used for both the
// designer grid and the production team.
export function PersonTile({ name, handle, image, title, note, link = true, logo = false }: Props) {
  return (
    <li className="flex items-start gap-4">
      <Avatar name={name} image={image} tone="dark" logo={logo} />
      <div className="flex flex-col items-start pt-1">
        <span className="font-serif text-2xl md:text-[26px] leading-tight text-bone">{name}</span>
        {title && (
          <span className="mt-2 text-[12px] font-medium uppercase tracking-[0.12em] text-velvet-text">
            {title}
          </span>
        )}
        {note && <span className="mt-2 font-serif italic lining-nums text-base text-velvet-text">{note}</span>}
        <div className="mt-3">
          <InstagramLink handle={handle} label={`${name} on Instagram`} tone="dark" link={link} />
        </div>
      </div>
    </li>
  );
}
