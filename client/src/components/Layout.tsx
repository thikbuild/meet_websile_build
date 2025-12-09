import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export default function Layout({ children, hideFooter = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navigation />
      <main className="pt-20">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}
