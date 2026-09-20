import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CopyBlock } from "@/components/CopyBlock";
import { SaveVideoButton } from "@/components/SaveVideoButton";
import { ambassadors } from "@/content/ambassadors";
import { AMBASSADOR_VIDEO_URL, ambassadorLink, kitCopy } from "@/content/ambassador-kit";

// One page per Brand Ambassador: their link, the video, and the posting steps,
// built for a phone. Pages exist only for registered ambassadors (anything
// else is a 404), are not linked from anywhere on the site, and are noindex.
// This is NOT the referral link — visiting it never sets the referral cookie.
export const dynamicParams = false;
export function generateStaticParams() {
  return ambassadors.map((a) => ({ handle: a.handle }));
}

export const metadata: Metadata = {
  title: "Your Ambassador Kit · Desert After Dark",
  description: "Your personal link, the video, and step-by-step posting instructions.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

const eyebrow = "text-[12px] font-semibold uppercase tracking-[0.1em] text-gold";

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="pt-10 mt-10 border-t border-sand first:mt-0 first:pt-0 first:border-0">
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-2xl text-gold">{String(n).padStart(2, "0")}</span>
        <h2 className="font-serif text-[26px] leading-[1.15] text-noir">{title}</h2>
      </div>
      <div className="mt-5 flex flex-col gap-4 text-[16px] leading-[1.55] text-ink/85">{children}</div>
    </section>
  );
}

// `start` lets a numbered list continue after a copy block interrupts it.
function Steps({ items, start = 1 }: { items: React.ReactNode[]; start?: number }) {
  return (
    <ol className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-[2px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-noir text-[12px] font-semibold text-bone">
            {start + i}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export default async function AmbassadorKitPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle: raw } = await params;
  const handle = decodeURIComponent(raw).toLowerCase();
  const person = ambassadors.find((a) => a.handle === handle);
  if (!person) notFound();

  const link = ambassadorLink(person.handle);
  const b = (s: string) => <strong className="font-semibold text-noir">{s}</strong>;

  return (
    <article className="bg-pearl px-5 pt-10 pb-24">
      <div className="mx-auto max-w-[560px]">
        <span className={eyebrow}>Brand Ambassador</span>
        <h1 className="mt-4 font-serif text-[40px] leading-[1.05] text-noir">
          {person.first ? `${person.first}, here's your kit` : "Here's your kit"}
        </h1>
        {/* Same treatment as the event page's tagline: Thundr is the title sponsor. */}
        <p className="mt-3 font-serif italic text-[22px] leading-tight text-gold">
          Desert After Dark, powered by Thundr
        </p>
        <p className="mt-4 text-[16px] leading-[1.55] text-ink/80">
          Saturday, October 10 · Paradise Valley. Everything you need to post is on this page, in
          order. It takes about five minutes. Thank you for doing this.
        </p>

        <div className="mt-8">
          <CopyBlock label={`Your personal link · @${person.handle}`} text={link} buttonLabel="Copy my link" mono />
          <p className="mt-3 text-sm leading-[1.5] text-ink/70">
            This is how you get credit. It only counts when someone applies through this exact link.
          </p>
        </div>

        <div className="mt-12">
          <Step n={1} title="Save the video">
            <video
              className="w-full aspect-[9/16] max-h-[70vh] bg-black object-contain"
              controls
              playsInline
              preload="metadata"
              poster="/images/dad/story-poster.jpg"
            >
              <source src={AMBASSADOR_VIDEO_URL} type="video/mp4" />
            </video>
            <SaveVideoButton src="/videos/desert-after-dark-story.mp4" filename="desert-after-dark.mp4" />
          </Step>

          <Step n={2} title="Post it to your Story">
            <a
              href="instagram://story-camera"
              className="flex h-[52px] items-center justify-center border border-noir text-[13px] font-semibold uppercase tracking-[0.08em] text-noir hover:bg-gold hover:border-gold"
            >
              Open Instagram Stories
            </a>
            <Steps
              items={[
                <>Pick the video you just saved from your camera roll.</>,
                <>Tap the {b("sticker icon")} at the top of the screen. It's the square smiley face.</>,
                <>Tap {b("LINK")}.</>,
                <>Paste your personal link into the URL box. Copy it here:</>,
              ]}
            />
            <CopyBlock label="Paste into the URL box" text={link} buttonLabel="Copy my link" mono />
            <Steps
              start={5}
              items={[
                <>Tap {b("Customize sticker text")} and paste this:</>,
              ]}
            />
            <CopyBlock label="Sticker text" text={kitCopy.stickerText} buttonLabel="Copy sticker text" />
            <Steps
              start={6}
              items={[
                <>
                  Tap {b("Done")}. Drag the sticker to the {b("lower middle")} of the screen and pinch
                  it bigger. Keep it off the very top and bottom, where Instagram's own buttons cover
                  it.
                </>,
                <>Tag {b("@theatlaslist")} so we can reshare you.</>,
                <>Add this small text somewhere on the story. It keeps you within Instagram's and the FTC's disclosure rules:</>,
              ]}
            />
            <CopyBlock label="Disclosure" text={kitCopy.disclosure} buttonLabel="Copy" />
            <p>
              Then tap {b("Your Story")}.
            </p>
          </Step>

          <Step n={3} title="Add a second frame: you, talking">
            <p>
              This is the frame that gets people to tap. Record 10 to 15 seconds to camera, in your
              own words, and hit these three points:
            </p>
            <ul className="flex flex-col gap-2 border-l-2 border-gold pl-4">
              {kitCopy.talkingPoints.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p>Add the same link sticker, then put this line on screen:</p>
            <CopyBlock label="Call to action" text={kitCopy.callToAction} buttonLabel="Copy call to action" />
            <p className="text-sm text-ink/70">
              One ask only. Don't send people to your bio, to @theatlaslist, or to your DMs instead.
              Every extra step loses people.
            </p>
          </Step>

          <Step n={4} title="Add a third frame: the reminder">
            <p>A photo of you, with the link sticker again and this text on screen:</p>
            <CopyBlock label="On-screen text" text={kitCopy.reminderText} buttonLabel="Copy text" />
          </Step>

          <Step n={5} title="Post it as a Reel too">
            <Steps
              items={[
                <>In Instagram tap {b("+")}, choose {b("Reel")}, and pick the same video.</>,
                <>Paste this caption:</>,
              ]}
            />
            <CopyBlock label="Caption" text={kitCopy.caption} buttonLabel="Copy caption" />
            <Steps
              start={3}
              items={[
                <>Tag {b("@theatlaslist")} and set the location to {b("Paradise Valley, Arizona")}.</>,
                <>Tap {b("Share")}.</>,
              ]}
            />
          </Step>

          <Step n={6} title="Put your link in your bio">
            <p>
              Links in captions can't be tapped, so your bio is where Reel viewers go. Keep it there
              until October 10.
            </p>
            <Steps
              items={[
                <>Go to your profile and tap {b("Edit profile")}.</>,
                <>Tap {b("Links")}, then {b("Add external link")}.</>,
                <>Paste your link, title it {b("Desert After Dark · Apply")}, and tap {b("Done")}.</>,
              ]}
            />
            <CopyBlock label="Your link" text={link} buttonLabel="Copy my link" mono />
          </Step>

          <Step n={7} title="When someone asks about it">
            <p>Anyone who replies to your story is your warmest lead. Send them this:</p>
            <CopyBlock label="Reply to DMs with" text={kitCopy.dmReply(link)} buttonLabel="Copy reply" />
          </Step>

          <Step n={8} title="Make it work harder">
            <ul className="flex flex-col gap-3 list-disc pl-5">
              <li>Save the story to a Highlight called {b("Oct 10")} so it lasts past 24 hours.</li>
              <li>Evenings tend to get the most views. Post when your followers are usually online.</li>
              <li>Post again about once a week until the event. Most people need to see something two or three times.</li>
              <li>Everyone applies and is approved individually, including your friends.</li>
            </ul>
          </Step>
        </div>

        <p className="mt-14 text-center font-serif italic text-xl text-ink">Thank you. — Devaun &amp; Michael</p>
      </div>
    </article>
  );
}
