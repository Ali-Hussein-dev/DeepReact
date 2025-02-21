"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { RenderFormElement } from "@/components/shared/render-form-element";
import { useStateAction } from "next-safe-action/stateful-hooks";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Contributor } from "@/supabase/types/db.types";
import { contributorSubmissionSchema } from "@/features/contributors/contributor-submission-schema";
import { createContributorAction } from "@/features/contributors/actions/contributors-actions";
import { ContributorsList } from "@/features/contributors/components/contributors-list";
import { FaSpinner } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const fields = [
  {
    name: "name",
    label: "Contributor Name",
    placeholder: "Add full name of the contributor",
    fieldType: "Input",
    required: true,
  },
  {
    name: "role",
    placeholder: "Role",
    label: "Role of the contributor",
    fieldType: "Input",
  },
  {
    name: "why",
    label: "Explain briefly why should we add this contributor?",
    placeholder: "Include a brief description",
    fieldType: "Textarea",
    rows: 5,
  },
  {
    name: "twitter_username",
    label: "Twitter Username",
    placeholder: "Contributor's Twitter username",
    fieldType: "Input",
  },
  {
    name: "personal_website_url",
    label: "Website",
    placeholder: "Contributor's personal website",
    fieldType: "Input",
    type: "url",
    required: true,
  },
] as const;
const buttonLabel = {
  executing: "Sending...",
  idle: "Sent",
  hasErrored: "Something went wrong!",
  hasSucceeded: "Sent",
};
const SuggestForm = () => {
  const {
    execute,
    // result,
    status,
    // input,
  } = useStateAction(createContributorAction, {});
  const form = useForm<typeof contributorSubmissionSchema._type>({
    defaultValues: {
      name: "",
      why: "",
      role: "",
      twitter_username: "",
      personal_website_url: "",
    },
    resolver: zodResolver(contributorSubmissionSchema),
  });
  const onSubmit = (data: typeof contributorSubmissionSchema._type) => {
    execute(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {fields.map((field) => (
          <RenderFormElement key={field.name} form={form} formElement={field} />
        ))}
        <div className="pt-2 flex justify-end items-center">
          <Button type="submit">{buttonLabel[status]}</Button>
        </div>
      </form>
    </Form>
  );
};
export const SuggestContributorDialog = () => {
  return (
    <Dialog>
      <div className="flex justify-end items-center">
        <DialogTrigger asChild>
          <Button variant="outline">Suggest Contributor</Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>Suggest Contributor</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Suggest a contributor to be added to the list
          </DialogDescription>
        </DialogHeader>
        <SuggestForm />
      </DialogContent>
    </Dialog>
  );
};

//======================================
export function SearchableContributorsList({
  initialContributors,
}: {
  initialContributors: Pick<
    Contributor,
    "name" | "role" | "bio" | "avatar_url"
  >[];
}) {
  const form = useForm({ defaultValues: { q: "" } });
  const { watch } = form;
  const { data, fetchStatus, refetch } = useQuery({
    queryKey: ["searchAuthors", watch("q") ?? "initial"],
    queryFn: async () =>
      await fetch(`/api/authors?q=${watch("q")}`).then((res) => res.json()),
    enabled: false,
    initialData: { data: initialContributors },
    select: (data) => data.data,
  });
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await refetch();
  };

  return (
    <div>
      <SuggestContributorDialog />
      <Form {...form}>
        <form onSubmit={onSubmit} className="mb-5 pt-4">
          <div className="gap-2 flex justify-start items-center">
            <RenderFormElement
              form={form}
              formElement={{
                type: "text",
                name: "q",
                placeholder: "Search contributors",
                required: true,
                fieldType: "Input",
                className: "h-12 w-full rounded-xl",
              }}
            />
            <Button
              size="icon"
              className="size-12 rounded-xl"
              variant="outline"
            >
              {fetchStatus === "fetching" ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaSearch />
              )}
            </Button>
          </div>
        </form>
      </Form>
      {data?.length > 0 ? (
        <ContributorsList contributors={data} />
      ) : (
        <div className="w-full gap-4 rounded border border-dashed px-3 py-6 flex flex-col items-center justify-center">
          <p className="text-2xl text-secondary-foreground font-bold">
            No contributor found
          </p>
          <div>
            <SuggestContributorDialog />
          </div>
        </div>
      )}
    </div>
  );
}
