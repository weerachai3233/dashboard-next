"use client";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";
import LayoutComponent from "@/components/layout/LayoutComponent";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const noLayoutRoutes = ["/login"];
  const isNoLayout = noLayoutRoutes.includes(pathname);

  return (
    <html lang="en">
      <head>
        <title>Weerachai Ruecha</title>
        <link rel="icon" href="/logo/logo.png" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            {isNoLayout ? (
              children
            ) : (
              <LayoutComponent>{children}</LayoutComponent>
            )}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
