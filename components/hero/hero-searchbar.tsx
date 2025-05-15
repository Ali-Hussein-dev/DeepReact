"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSearch } from "react-icons/fi";
import * as React from "react";

export const HeroSearchbar = () => {
  const [input, setInput] = useState("");
  const router = useRouter();
  const searchPath = `/search?tab=all&q=${input.trim()}`;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") return;
    router.push(searchPath);
  };

  React.useEffect(() => {
    // how to detect if the input is focused
    const handleKeyDown = (e: KeyboardEvent) => {
      if (input.trim() === "") return;

      const isFocused =
        inputRef.current && document.activeElement === inputRef.current;
      if (e.key === "Enter" && isFocused) {
        router.push(searchPath);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className="mx-auto w-full max-w-2xl py-6">
      <form
        className="gap-1 flex justify-start items-center border border-dashed rounded-full p-2"
        onSubmit={onSubmit}
      >
        <Input
          ref={inputRef}
          placeholder="Search React Ecosystem"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="h-10 rounded-full border-none pl-5"
        />
        <Button
          size="icon"
          variant={"outline"}
          className="size-10 rounded-full border-none"
        >
          <FiSearch />
        </Button>
      </form>
    </div>
  );
};
