import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio of Nguyễn Hoàng Nam - Performance Marketing Specialist",
  description:
    "CV Landing Page của Nguyễn Hoàng Nam - Performance Marketing Specialist. Chuyên gia tối ưu quảng cáo, phân tích dữ liệu, thiết kế landing page và ứng dụng AI Marketing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
        {process.env.NEXT_PUBLIC_GTM && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />}
      </body>
    </html>
  );
}
