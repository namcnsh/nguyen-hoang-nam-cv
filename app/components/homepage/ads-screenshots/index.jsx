"use client";

import Image from "next/image";
import { useState } from "react";

import { useI18n } from "@/app/components/i18n-provider";

const screenshots = [
  {
    id: "google1",
    platform: "Google Ads",
    src: "/ads-capture/ads-google-image-1.png",
    width: 1861,
    height: 946,
    accent: "from-sky-500/30 to-cyan-400/10",
  },
  {
    id: "google2",
    platform: "Google Ads",
    src: "/ads-capture/ads-google-image-2.png",
    width: 1861,
    height: 947,
    accent: "from-blue-500/30 to-sky-400/10",
  },
  {
    id: "google3",
    platform: "Google Ads",
    src: "/ads-capture/ads-google-image-3.png",
    width: 1861,
    height: 946,
    accent: "from-cyan-500/30 to-blue-400/10",
  },
  {
    id: "facebook1",
    platform: "Facebook Ads",
    src: "/ads-capture/ads-facebook-image-1.png",
    width: 1835,
    height: 895,
    accent: "from-violet-500/30 to-fuchsia-400/10",
  },
  {
    id: "tiktok1",
    platform: "TikTok Ads",
    src: "/ads-capture/ads-tiktok-image-1.png",
    width: 1836,
    height: 945,
    accent: "from-emerald-500/30 to-lime-400/10",
  },
];

function AdsScreenshots() {
  const { dictionary } = useI18n();
  const { sections, adsScreenshotsIntro, adsScreenshotsLabels } = dictionary.home;
  const [activeScreenshot, setActiveScreenshot] = useState(null);

  return (
    <section id="ads-screenshots" className="relative z-50 my-12 border-t border-white/10 pt-10 lg:my-24 lg:pt-14">
      <div className="mb-8 flex items-center gap-4">
        <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-violet-100">
          {sections.adsScreenshots}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/40 to-transparent" />
      </div>

      <div className="mb-8 max-w-3xl rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_32px_rgba(0,0,0,0.18)]">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">{sections.adsScreenshots}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300 md:text-base">{adsScreenshotsIntro}</p>
      </div>

      <div className="grid gap-7">
        {screenshots.map((screenshot) => {
          const labels = adsScreenshotsLabels[screenshot.id];

          return (
            <article
              key={screenshot.src}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,36,0.92)_0%,rgba(8,10,24,0.98)_100%)] p-4 shadow-[0_0_40px_rgba(0,0,0,0.20)] lg:p-5"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${screenshot.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
              <div className="relative">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
                    {screenshot.platform}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveScreenshot(screenshot)}
                  className="relative block w-full overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#05070f]/80 outline-none transition focus-visible:ring-2 focus-visible:ring-blue-400/60"
                  aria-label={labels.open}
                >
                  <Image
                    src={screenshot.src}
                    alt={labels.alt}
                    width={screenshot.width}
                    height={screenshot.height}
                    sizes="100vw"
                    className="h-auto w-full object-contain"
                  />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {activeScreenshot ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <button type="button" className="absolute inset-0 cursor-default" aria-label={dictionary.common.close} onClick={() => setActiveScreenshot(null)} />
          <div className="relative max-h-[92vh] w-full max-w-[96rem] overflow-auto rounded-[1.5rem] border border-white/10 bg-[#05070f] p-3 shadow-[0_0_60px_rgba(0,0,0,0.55)]">
            <button
              type="button"
              onClick={() => setActiveScreenshot(null)}
              className="sticky top-0 z-10 ml-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white text-lg font-semibold text-[#070913] outline-none transition focus-visible:ring-2 focus-visible:ring-blue-400/60"
              aria-label={dictionary.common.close}
            >
              ×
            </button>
            <Image
              src={activeScreenshot.src}
              alt={adsScreenshotsLabels[activeScreenshot.id].alt}
              width={activeScreenshot.width}
              height={activeScreenshot.height}
              sizes="100vw"
              className="h-auto w-full rounded-xl"
              priority
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default AdsScreenshots;
