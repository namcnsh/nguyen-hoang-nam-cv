import { cookies } from "next/headers";
import GoogleAdsCaseStudyPage from "../components/google-ads-case-study-page";
import { LOCALE_COOKIE_NAME, normalizeLocale } from "../../utils/i18n/config";
import { getDictionary } from "../../utils/i18n/dictionaries";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get(LOCALE_COOKIE_NAME)?.value);
  const metadata = getDictionary(locale).metadata.googleAdsCaseStudy;

  return {
    ...metadata,
    alternates: { canonical: "https://www.nseilhn.online/google-ads-case-study" },
    openGraph: metadata,
  };
}

export default function GoogleAdsCaseStudyRoute() {
  return <GoogleAdsCaseStudyPage />;
}
