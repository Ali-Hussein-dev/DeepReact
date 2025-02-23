"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CgClose, CgMenu } from "react-icons/cg";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const headerVariants = cva("w-full mx-auto", {
  variants: {
    variant: {
      default: "container",
      centered: "max-w-2xl",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface BaseHeaderProps extends VariantProps<typeof headerVariants> {
  sticky?: boolean;
  children?: React.ReactNode;
}

const BaseHeader = ({ sticky, variant, children }: BaseHeaderProps) => {
  return (
    <header
      className={cn(
        "w-full bg-background py-2 backdrop-blur",
        sticky && variant === "centered" && "top-3 md:sticky",
        sticky && variant === "default" && "top-0 md:sticky"
      )}
    >
      <div className={headerVariants({ variant })}>{children}</div>
    </header>
  );
};

interface NavProps {
  Logo: React.ReactNode;
  navItems: Array<{ name: string; href: string }>;
}

const DesktopNav = ({ Logo, navItems }: NavProps) => {
  return (
    <div className="hidden md:block">
      <div className="w-full gap-2 px-4 pb-2 pt-3 flex justify-start items-center sm:px-0">
        {Logo}
        <nav className="grow gap-3 flex justify-end items-center">
          {navItems.map((link) => (
            <Button key={link.name} variant="link" className="px-1" asChild>
              <Link href={link.href} prefetch={false}>
                {link.name}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
};

const MobileNav = ({ Logo, navItems }: NavProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      className={cn(
        "pt-2 md:hidden",
        isOpen && "z-40 size-full min-h-screen bg-background"
      )}
    >
      <div className="pb-2 flex justify-between items-center">
        {Logo}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="rounded-xl"
          variant={"outline"}
        >
          {isOpen ? <CgClose /> : <CgMenu />}
        </Button>
      </div>

      <dialog
        open={isOpen}
        aria-modal="true"
        aria-labelledby="mobile-navigation"
        className={
          isOpen
            ? "animate-popover-in h-auto w-full bg-inherit px-4 pt-4"
            : "hidden"
        }
      >
        <nav className="flex flex-col gap-5">
          <h2 id="mobile-navigation" className="sr-only">
            Mobile Navigation
          </h2>

          {navItems.map((link) => (
            <Button
              key={link.href}
              asChild
              variant="link"
              className="w-full justify-center rounded-xl"
              size="lg"
              onClick={() => setIsOpen(false)}
            >
              <Link prefetch={false} href={link.href}>
                {link.name}
              </Link>
            </Button>
          ))}
        </nav>
      </dialog>
      {isOpen && (
        <style jsx global>{`
          body {
            overflow: hidden;
          }
        `}</style>
      )}
    </div>
  );
};

export interface HeaderProps extends BaseHeaderProps, NavProps {}

export const Header = ({ Logo, sticky, variant, navItems }: HeaderProps) => {
  return (
    <BaseHeader sticky={sticky} variant={variant}>
      <DesktopNav Logo={Logo} navItems={navItems} />
      <MobileNav Logo={Logo} navItems={navItems} />
    </BaseHeader>
  );
};
