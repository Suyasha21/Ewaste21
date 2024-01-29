import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import Navbar from "./Header/Navbar";
import Footer from "./Footer/Footer";
import { AuthProvider } from "./utils/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "ERecycleBin",
  description:
    "ERecycleBin - One stop solution to Recycle E-Waste, E-waste Facility Locator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="favicon.ico<generated>"
          type="image/svg"
          sizes="32x32"
        />
      </head>
      <body className={poppins.className}>
        <AuthProvider>
          <NextTopLoader color="#28af60" showSpinner={false} />
          <Navbar />
          <div className="pt-32">{children}</div>
          <Footer />
        </AuthProvider>
        <script
          src="//code.tidio.co/nahjhrv1wl11obryg96m3wgmpfhfrkbj.js"
          async
        ></script>
      </body>
    </html>
  );
}
