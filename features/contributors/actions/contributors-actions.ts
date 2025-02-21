"use server";

import { action } from "@/actions/safe-action";
import { supabase } from "@/supabase/supabase-client";
import { contributorSubmissionSchema } from "@/features/contributors/contributor-submission-schema";
// import { FieldError } from "react-hook-form";

export const createContributorAction = action
  .schema(contributorSubmissionSchema, {
    // compatiable with useForm from react-hook-form
    // handleValidationErrorsShape: async (errors) => {
    //   // todo: convert errors to react-hook-form shape
    //   return Promise.resolve(errors);
    // }
  })
  .stateAction(async ({ parsedInput }) => {
    const { error } = await supabase
      .from("contributors")
      .insert([{ ...parsedInput, is_draft: true }]);
    // TODO: notify me when someone suggest a contributor
    if (error) {
      console.warn({ error });
      return { success: false, error };
    }
    return { success: true };
  });
