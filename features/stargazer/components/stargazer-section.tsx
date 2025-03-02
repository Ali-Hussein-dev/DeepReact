"use client";
import { Star } from "lucide-react";
import { Stargazer, StargazerLoading } from "./stargazer";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { urls } from "@/constants/urls";

export const StargazerSection = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["stargazers"],
    queryFn: () => fetch("api/stargazer").then((res) => res.json()),
  });

  return (
    <section className="relative w-full py-6">
      <div className="w-full px-4 sm:px-0 flex gap-4 flex-col items-center pt-2">
        {/* <h1 className="relative text-pretty z-10 tracking-tight gap-1 transition text-center font-display text-4xl sm:text-5xl font-semibold">
          <span className="relative whitespace-nowrap text-white">
            <span className="absolute z-0 bg-brand-200/10 w-[110%] h-[110%] -left-[5%] -top-[2.5%] -rotate-1" />
            <span className="relative z-10 text-brand-400">
              {data?.stargazerCount.toLocaleString() || "..."} devs
            </span>
          </span>
        </h1> */}

        <div className="flex items-center gap-2">
          <div className="flex justify-center items-center flex-wrap">
            {isFetching ? (
              <>
                {Array.from({ length: 6 }).map((_, i) => (
                  <StargazerLoading key={i} />
                ))}
                {/* <StargazerMore /> */}
              </>
            ) : (
              <>
                {data?.stargazers.map((o: { id: number; login: string }) => (
                  <Stargazer key={o.id} login={o.login} name={o.login} />
                ))}
                {/* <StargazerMore /> */}
              </>
            )}
          </div>
        </div>
        <p className="text-muted-foreground text-lg/7 max-w-prose text-center text-pretty sm:text-wrap">
          Join our stargazers!
        </p>

        <div className="flex flex-col items-center gap-2">
          <Button
            className="order-2 button px-4 has-[>svg]:px-10 h-11 rounded-xl text-muted-foreground group"
            variant={"outline"}
            asChild
          >
            <a
              href={urls.github}
              target="_blank"
              rel="noreferrer"
              className="flex gap-1 items-center"
            >
              Star on GitHub
              <Star className="size-4 shrink-0 group-hover:fill-foreground transition-colors" />
            </a>
            {/* {data?.stargazerCount.toLocaleString() || "..."} */}
          </Button>
        </div>
      </div>
    </section>
  );
};
