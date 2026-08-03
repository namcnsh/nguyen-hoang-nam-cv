import { GoogleTagManager } from "@next/third-parties/google";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDictionary } from "../utils/i18n/dictionaries";
import { LOCALE_COOKIE_NAME, normalizeLocale } from "../utils/i18n/config";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import { I18nProvider } from "./components/i18n-provider";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get(LOCALE_COOKIE_NAME)?.value);

  return getDictionary(locale).metadata.home;
}

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get(LOCALE_COOKIE_NAME)?.value);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <I18nProvider initialLocale={locale}>
          <ToastContainer />
          <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
            <Navbar />
            {children}
            <ScrollToTop />
          </main>
          <Footer />
        </I18nProvider>
        {process.env.NEXT_PUBLIC_GTM && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />}
      </body>
    </html>
  );
}
