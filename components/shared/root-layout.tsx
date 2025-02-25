import { LogoLink } from "@/components/shared/logo";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { urls } from "@/constants/urls";

const navItems = [
  {
    name: "Submit",
    href: urls.suggest,
  },
  {
    name: "Contributors",
    href: urls.internal.contributors,
  },
  {
    name: "Subscribe",
    href: urls.subscribe,
  },
];

//======================================
export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <Header
        Logo={
          <div className="flex justify-end">
            <LogoLink />
            <span className="mt-3 text-xs text-muted-foreground/80">alpha</span>
          </div>
        }
        navItems={navItems}
      />
      <div className="w-full grow">{children}</div>
      <Footer />
    </main>
  );
}
