import { cookies } from "next/headers";
import SeoGrowthPageContent from "../components/seo-growth-page";
import { LOCALE_COOKIE_NAME, normalizeLocale } from "../../utils/i18n/config";
import { getDictionary } from "../../utils/i18n/dictionaries";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get(LOCALE_COOKIE_NAME)?.value);

  return getDictionary(locale).metadata.seoGrowth;
}

export default function SeoGrowthPage() {
  return <SeoGrowthPageContent />;
}
