import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modal/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modal/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modal/RentModal";
import SearchModal from "./components/modal/SearchModal";
import { ScrollProvider } from "./context/ScrollContext";
import Footer from "./components/footer/Footer";
import NavForSmallScreen from "./components/NavForSmallScreen";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hotel Booking",
  description: "Booking app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ScrollProvider>
          <ToasterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
          <div className="pb-20 pt-5">{children}</div>
          <NavForSmallScreen currentUser={currentUser}/>
          <Footer />
        </ScrollProvider>
      </body>
    </html>
  );
}
