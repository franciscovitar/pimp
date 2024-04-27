import { Roboto } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ToastProvider from "@/provider/toast-provider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

import Script from "next/script";

export const metadata = {
  title: "Pimp",
  description:
    "Explora tu belleza única en nuestros centros de estética ubicados tanto en Barracas como en la exclusiva zona de Puerto Madero.",
  keywords: ["Puerto Madero", "Masajes", "Centro de estetica"],
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://pimpestetica.com/" />
        <meta
          name="google-site-verification"
          content="hJNEEvo2OH-xiweilmBxCf3RDnAjuGwCajSbdYDnN7Y"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-NLGKT1ZQZS"
        />
        <Script
          id="gtm-script"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
                  
            gtag('config', 'G-NLGKT1ZQZS');
            `,
          }}
        />
      </head>
      <body translate="no" className={roboto.className}>
        <ToastProvider /> {children}
      </body>
    </html>
  );
}
