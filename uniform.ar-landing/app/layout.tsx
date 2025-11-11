import ClientLayout from "./ClientLayout";
import "./globals.css";

export const metadata = {
  title: "UNIFORM.AR",
  description: "Indumentaria de trabajo y uniformes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
