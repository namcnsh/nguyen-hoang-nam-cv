# Ads Manager Screenshots Section Design

Date: 2026-08-14

## Source facts

- Source folder: `/home/coder/REPO/my_portfolio/Ads Capture`
- Screenshots found:
  - `Ads Facebook Image 1.PNG` — 1835×895
  - `Ads Google Image 1.png` — 1861×946
  - `Ads Google Image 2.png` — 1861×947
  - `Ads Google Image 3.png` — 1861×946
  - `Ads Tiktok Image 1.PNG` — 1836×945
- Existing homepage order in `app/page.js`: Hero, Featured Case Studies, About, Experience, Skills, Education, Projects, Contact.
- User-approved placement: after `Experience`, before `Skills`.
- Existing homepage section pattern: rounded dark cards, violet section pill, gradient divider, white/10 borders, large vertical spacing.

## Goal

Add a new homepage section that displays screenshots from Google Ads, Facebook Ads, and TikTok Ads manager UIs as portfolio evidence for hands-on performance marketing work.

## Approved approach

Use a responsive screenshot gallery:

- Desktop: two-column grid.
- Mobile: one-column grid.
- Because there are five screenshots, the final card spans both desktop columns to avoid an unbalanced last row.
- Each card uses the existing portfolio visual language: dark glass panel, subtle border, rounded corners, gradient highlight, platform badge, shadow.
- Each image uses a fixed visual frame with `object-contain`, preserving original screenshot ratios without cropping.

## Content structure

Section ID: `ads-screenshots`

Section label:

- Vietnamese: `Ảnh trình quản lý quảng cáo`
- English: `Ads manager screenshots`

Intro copy:

- Vietnamese: `Một số ảnh chụp màn hình từ các nền tảng Google Ads, Facebook Ads và TikTok Ads, thể hiện kinh nghiệm làm việc trực tiếp với tài khoản quảng cáo và dữ liệu chiến dịch.`
- English: `Selected screenshots from Google Ads, Facebook Ads, and TikTok Ads interfaces, showing hands-on work with ad accounts and campaign data.`

Cards:

1. Google Ads — `Ads Google Image 1.png`
2. Google Ads — `Ads Google Image 2.png`
3. Google Ads — `Ads Google Image 3.png`
4. Facebook Ads — `Ads Facebook Image 1.PNG`
5. TikTok Ads — `Ads Tiktok Image 1.PNG`

## Architecture

- Add a new component at `app/components/homepage/ads-screenshots/index.jsx`.
- Add import and render in `app/page.js` immediately after `<Experience />`.
- Store/copy images under `public/ads-capture/` so Next.js can serve them via static paths.
- Add section labels and intro copy to `utils/i18n/dictionaries.js` for both `vi` and `en` dictionaries.
- Do not modify unrelated sections.

## Image handling

- Preserve original screenshots.
- Use `next/image` with known width and height from measured dimensions.
- Use `sizes="(min-width: 1024px) 50vw, 100vw"`.
- Use `object-contain`, not `object-cover`, so no UI details are cropped.
- Use descriptive alt text per platform.

## Styling

- Match current Tailwind style from existing homepage sections.
- Section spacing: `my-12 lg:my-24`; include `border-t border-white/10 pt-10 lg:pt-14` to separate it after Experience.
- Use a two-column grid at `lg` breakpoint.
- Card classes follow existing rounded dark card pattern.
- Image frame uses dark inner background, border, rounded corners, overflow hidden, and aspect ratio near `2 / 1` because all screenshots are roughly 1.94–2.08:1.

## Accessibility

- Section has a stable anchor ID.
- Each image has alt text describing platform and purpose.
- Decorative gradients are non-interactive.

## Verification

Run:

1. `npm run lint`
2. `npm run build`

Confirm no lint/build errors before reporting completion.
