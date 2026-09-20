// The message Mike sends each Brand Ambassador, as plain text so it pastes
// cleanly into a text or an Instagram DM. {name} and {link} are filled in per
// person by buildAmbassadorMessage().

export const AMBASSADOR_VIDEO_URL = "https://www.theatlaslist.club/videos/desert-after-dark-story.mp4";
export const AMBASSADOR_LINK_BASE = "https://www.theatlaslist.club/r/";

const TEMPLATE = `Hey {name} — thank you for being an Atlas List Brand Ambassador for Desert After Dark (Saturday, October 10, Paradise Valley). Everything you need is below. It takes about five minutes.

YOUR PERSONAL LINK — this is how you get credit
{link}

THE VIDEO
Attached to this message. Backup download:
https://www.theatlaslist.club/videos/desert-after-dark-story.mp4

POST IT TO YOUR STORY (three frames works best)

Frame 1 — the video
1. Save the video to your camera roll.
2. Open Instagram, tap + and choose Story, then pick the video.
3. Tap the sticker icon at the top of the screen (the square smiley face).
4. Tap LINK.
5. Paste your personal link into the URL box.
6. Tap "Customize sticker text" and type: APPLY FOR AN INVITE
7. Tap Done. Drag the sticker to the lower middle of the screen and pinch it bigger. Keep it off the very top and bottom, where Instagram's own buttons cover it.
8. Tag @theatlaslist so we can reshare you, then tap Your Story.

Frame 2 — you, talking to camera (this is the frame that gets people to tap)
Record 10 to 15 seconds in your own words. Hit three points:
- What it is: "A private fashion show and mansion party in Paradise Valley on October 10."
- Why they should listen to you: "I'll be there, and it's invite-only."
- What to do: "Tap the link on this story and apply. It takes about three minutes."
Add the same link sticker (steps 3 to 7).

Frame 3 — the reminder
A photo of you with the link sticker again and this text on screen:
"Invite-only. Spots are limited. Apply through my link."

THE CALL TO ACTION — say or show this on every frame
"Tap the link, hit Apply, and fill out the short application. It takes three minutes."
One ask only. Don't send people to your bio, to @theatlaslist, or to your DMs instead. Every extra step loses people.

MAKE IT WORK HARDER
- Evenings tend to get the most views, so post when your followers are usually online.
- Put your link in your bio until October 10, and save the story to a Highlight called "Oct 10" so it lasts past 24 hours.
- When someone replies or DMs to ask about it, send them your link directly. Those are your warmest leads.
- Post again about once a week until the event. Most people need to see something two or three times before they act.
- Posting a Reel or a feed post too? Links aren't clickable there, so write "link in my bio" in the caption.

GOOD TO KNOW
- You only get credit when someone applies through your link. If they find the website another way, we can't see that they came from you.
- Everyone applies and is approved individually, including your friends.
- Because you're an ambassador, add "Atlas List ambassador" in small text on your story. It keeps you on the right side of Instagram's and the FTC's disclosure rules.

Questions? Text me. Thank you, this makes a real difference for us.
— Mike`;

export const AMBASSADOR_KIT_BASE = "https://www.theatlaslist.club/ambassador/";

// Each ambassador's own page: their link, the video and the posting steps.
export function ambassadorKitUrl(handle: string): string {
  return AMBASSADOR_KIT_BASE + handle;
}

// The short DM Mike sends to hand someone their page.
export function buildKitDm(first: string, handle: string): string {
  return `Hey ${first || "there"}! Here's your personal Desert After Dark ambassador page. Your link, the video, and step-by-step posting instructions are all in one place:\n\n${ambassadorKitUrl(handle)}`;
}

// Copy-and-paste text used on the ambassador's page.
export const kitCopy = {
  stickerText: "APPLY FOR AN INVITE",
  callToAction: "Tap the link, hit Apply, and fill out the short application. It takes three minutes.",
  talkingPoints: [
    "What it is: “A private fashion show and mansion party in Paradise Valley on October 10.”",
    "Why they should listen to you: “I'll be there, and it's invite-only.”",
    "What to do: “Tap the link on this story and apply. It takes about three minutes.”",
  ],
  reminderText: "Invite-only. Spots are limited. Apply through my link.",
  disclosure: "Atlas List ambassador",
  caption:
    "Desert After Dark. October 10. A private fashion show and mansion party in Paradise Valley, curated by @theatlaslist.\n\nInvite-only, and every application is reviewed. Link in my bio to apply. It takes three minutes.\n\nAtlas List ambassador\n\n#DesertAfterDark #TheAtlasList #ParadiseValley #Scottsdale",
  dmReply: (link: string) =>
    `Here's my link to apply for Desert After Dark on October 10. It takes about three minutes, and every application is reviewed:\n\n${link}`,
} as const;

export function ambassadorLink(handle: string): string {
  return AMBASSADOR_LINK_BASE + handle;
}

export function buildAmbassadorMessage(first: string, handle: string): string {
  return TEMPLATE.replace("{name}", first || "there").replace("{link}", ambassadorLink(handle));
}
