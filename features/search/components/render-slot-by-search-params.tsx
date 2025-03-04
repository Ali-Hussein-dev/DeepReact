"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
//======================================
export function RenderSlotBySearchParams({
  param,
  slots,
}: {
  param: string;
  slots: Record<string, React.ReactNode>;
}) {
  const searchParams = useSearchParams();
  const tab = searchParams?.get(param) as string;
  const renderTab = slots[tab];
  const router = useRouter();
  React.useEffect(() => {
    if (router && !renderTab) {
      router.push(`/`);
    }
  }, []);
  return <>{renderTab}</>;
}
