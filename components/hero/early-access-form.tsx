"use client";
import { earlyAccessAction } from "@/actions/early-access-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type ActionResponse } from "@/types/action-response";
import * as React from "react";

const initialState: ActionResponse = {
  success: false,
  message: "",
};
//======================================
export function EarlyAccessForm() {
  const [state, serverAction, isPending] = React.useActionState(
    earlyAccessAction,
    initialState
  );
  return (
    <form
      action={serverAction}
      className="mx-auto w-full max-w-md gap-4 flex flex-col items-center"
    >
      {state.success && <p className="text-green-500">{state.message}</p>}
      <Input name="email" placeholder="Enter your email" className="h-10" />
      <Button>{isPending ? "Saving..." : "Join waitlist"}</Button>
    </form>
  );
}
