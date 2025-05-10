import { urls } from "@/constants/urls";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsGithub, BsTwitterX } from "react-icons/bs";

const links = [
  {
    label: "Terms of Service",
    href: urls.legal.terms,
  },
  {
    label: "Privacy Policy",
    href: urls.legal.privacy,
  },
  {
    label: "About",
    href: urls.about,
  },
];
const iconLinks = [
  {
    ICON: <BsGithub />,
    href: urls.github,
  },
  {
    ICON: <BsTwitterX />,
    href: urls.myTwitter,
  },
];
//======================================
export function Footer() {
  return (
    <footer className="container w-full gap-4 border-t border-dashed px-2 py-4 flex justify-between items-center flex-wrap md:px-0 ">
      <p>&copy; {new Date().getFullYear()} DeepReact.dev</p>
      <div className="gap-2 flex items-center justify-center flex-wrap">
        {links.map((link) => (
          <Button key={link.label} variant="link" className="px-1" asChild>
            <Link href={link.href} prefetch={false}>
              {link.label}
            </Link>
          </Button>
        ))}
        <div className="flex items-center justify-center flex-wrap">
          {iconLinks.map((link, i) => (
            <Button
              key={i}
              variant="ghost"
              className="px-1"
              asChild
              size="icon"
            >
              <Link href={link.href} prefetch={false}>
                {link.ICON}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
