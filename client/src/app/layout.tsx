import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "W5i Registro de Ponto",
  description: "Solução para liberação de acessos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={(inter.className, "w-screen h-screen")}>
        <Providers>{children}</Providers>
        <Image
          src={"/w5i.png"}
          className="bottom-0 fixed"
          width={100}
          height={100}
          alt="W5i logo"
        ></Image>
      </body>
    </html>
  );
}
