import "./globals.css";
import { Poppins, Orbitron, Bebas_Neue } from "next/font/google";
import Navbar from "./Slides/Navbar";
import { Providers } from "./providers"; // ✅ client wrapper
import { Toaster } from "react-hot-toast"; // ✅ added

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-orbitron",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

export const metadata = {
  title: "Font Test",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${orbitron.variable} ${bebas.variable}`}
    >
      <body className="font-poppins">
        <Providers>
          <Navbar />
          {children}
          <Toaster position="top-right" reverseOrder={false} /> {/* ✅ added */}
        </Providers>
      </body>
    </html>
  );
}
