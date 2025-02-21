import * as React from "react";
import { RootLayout } from "@/components/shared/root-layout";

//======================================
export default function ContributorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout>{children} </RootLayout>;
}
