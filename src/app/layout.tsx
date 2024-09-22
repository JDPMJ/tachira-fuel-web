import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import Bootstrap from "@/components/Bootstrap"; 
import { AuthProvider } from "@/contexts/AuthContext";
import { ReportGroupProvider } from "@/contexts/ReportGroupContext";
import { ReportProvider } from "@/contexts/ReportsContext";

export const metadata: Metadata = {
  title: "Combustible Táchira",
  description: "Mantente informado sobre la mesa de combustible en el estado Táchira."
}

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {

  return (
    <AuthProvider>
      <ReportGroupProvider>
        <ReportProvider>
          <html lang="es">
            <body>
              <Toaster />
              <Bootstrap />
              {children}
            </body>
          </html>
        </ReportProvider>
      </ReportGroupProvider>
    </AuthProvider>
  );
}
