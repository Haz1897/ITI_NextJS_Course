import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "./bootstrapclient";
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
