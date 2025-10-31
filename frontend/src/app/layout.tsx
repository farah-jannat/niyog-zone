import type { Metadata } from "next";
import { Lato } from "next/font/google";
import ReactQueryProvider from "@/providers/react-query-provider";

import "./globals.css";
import Container from "@/components/container";
import Footer from "@/components/widgets/footer";

// Define the font variable
const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Niyog Zone",
  description: "Created by fvoid",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lato.variable}  font-lato  antialiased`}>
        <ReactQueryProvider>
          {children}

          {/* <Container className="mt-[60px] bg-white"> */}
            <Footer />
          {/* </Container> */}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
