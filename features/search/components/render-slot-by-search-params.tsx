"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
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
  const renderTab = slots[tab] || <div className="">No slot for {param}</div>;

  return <>{renderTab}</>;
}
