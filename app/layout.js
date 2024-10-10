import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/Providers";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import LoadUser from "@/lib/loadUser";


const inter = Inter({
  subsets: ["latin"]
});

export const metadata = {
  title: "AW2024",
  description: "A celebration of love | A & W",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <AuthProvider>
          <LoadUser />
          <Navbar />
          {children}
          <Toaster />
        </AuthProvider>

      </body>
    </html>
  );
}
