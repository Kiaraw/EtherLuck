import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Lucky Lottery",
  description: "Joue et gagne des tokens avec la loterie Lucky Lottery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}