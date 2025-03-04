"use client";
import { earlyAccessAction } from "@/actions/early-access-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type ActionResponse } from "@/types/action-response";
import * as React from "react";
// import { urls } from "@/constants/urls";
// import { BsGithub } from "react-icons/bs";

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
    <div className="mx-auto w-full max-w-lg">
      <form
        action={serverAction}
        className="w-full gap-4 flex jusitify-start p-3 rounded-xl items-center border "
      >
        <Input
          name="email"
          placeholder="Enter your email"
          className="h-10 border-none"
        />
        <div className="gap-2 flex items-center justify-center">
          {/* <Button type="button" asChild variant="outline">
            <a href={urls.github} target="_blank" rel="noreferrer">
              <BsGithub />
              GitHub
            </a>
          </Button> */}
          <Button size="lg" className="font-semibold text-base">
            {isPending ? "Saving..." : "Join waitlist"}
          </Button>
        </div>
      </form>
      {state.success && (
        <p className="text-muted-foreground text-center pt-3">
          {state.message}
        </p>
      )}
    </div>
  );
}
