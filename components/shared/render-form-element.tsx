/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import type { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import type { FormElement, SelectOption } from "@/types/form-types";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import {
//   MultiSelect,
//   MultiSelectContent,
//   MultiSelectItem,
//   MultiSelectList,
//   MultiSelectTrigger,
//   MultiSelectValue,
// } from "@/components/ui/multi-select";
import { MultipleSelect } from "@/components/ui/multi-selector";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const RenderFormElement = ({
  formElement,
  form,
}: {
  formElement: FormElement;
  form: UseFormReturn<any, any, undefined>;
}): React.ReactElement => {
  const { fieldType, ...restFormElement } = formElement;
  // @ts-expect-error fix this
  const htmlInputAttributes: React.HTMLAttributes<HTMLElement> = {
    ...restFormElement,
  };
  switch (fieldType) {
    case "Input":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          render={({ field }: { field: ControllerRenderProps }) => (
            <FormItem className="w-full">
              <FormLabel>
                {formElement.label}
                {formElement.label && formElement.required ? " *" : ""}
              </FormLabel>
              <FormControl>
                <Input
                  // type={formElement.type ?? "text"}
                  // disabled={formElement.disabled}
                  // placeholder={formElement.placeholder}
                  // required={formElement.required}
                  // step={formElement?.step}
                  {...htmlInputAttributes}
                  {...field}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(formElement.type == "number" ? +val : val);
                  }}
                />
              </FormControl>
              <FormDescription>{formElement.description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "Textarea":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          render={({ field }: { field: ControllerRenderProps }) => (
            <FormItem className="w-full">
              <FormLabel>
                {formElement.label} {formElement.required && "*"}
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  {...htmlInputAttributes}
                  placeholder={formElement.placeholder}
                  required={formElement.required}
                  disabled={formElement.disabled}
                  className="resize-none"
                />
              </FormControl>
              <FormDescription>{formElement.description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "Checkbox":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          render={({ field }: { field: ControllerRenderProps }) => (
            <FormItem className="flex w-full items-center gap-2 space-y-0 py-1">
              <FormControl>
                <Checkbox
                  {...field}
                  {...htmlInputAttributes}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="leading-none">
                {formElement.label} {formElement.required && " *"}
              </FormLabel>
              {formElement.description ? (
                <FormDescription>{formElement.description}</FormDescription>
              ) : (
                ""
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "RadioGroup":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          render={({ field }: { field: ControllerRenderProps }) => (
            <FormItem className="flex w-full flex-col gap-2 py-1">
              <FormLabel className="mt-0">
                {formElement?.label} {formElement.required && " *"}
              </FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value}>
                  {formElement.options.map(({ label, value }: SelectOption) => (
                    <div key={value} className="flex items-center gap-x-2">
                      <RadioGroupItem value={value} id={value} />
                      <Label htmlFor={value}>{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              {formElement.description && (
                <FormDescription>{formElement.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "ToggleGroup": {
      const options = formElement.options.map(
        ({ label, value }: SelectOption) => (
          <ToggleGroupItem
            value={value}
            key={value}
            className="flex items-center gap-x-2"
          >
            {label}
          </ToggleGroupItem>
        ),
      );
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          render={({ field }: { field: ControllerRenderProps }) => (
            <FormItem className="flex w-full flex-col gap-2 py-1">
              <FormLabel className="mt-0">
                {formElement?.label} {formElement.required && "*"}
              </FormLabel>
              <FormControl>
                {formElement.type === "single" ? (
                  <ToggleGroup
                    {...field}
                    type="single"
                    variant="outline"
                    onValueChange={field.onChange}
                    value={formElement.defaultValue}
                    className="flex items-center justify-start gap-2"
                  >
                    {options}
                  </ToggleGroup>
                ) : (
                  <ToggleGroup
                    {...field}
                    type="multiple"
                    variant="outline"
                    onValueChange={field.onChange}
                    value={
                      Array.isArray(formElement.defaultValue)
                        ? formElement.defaultValue.filter(
                            (val: string) => val !== undefined,
                          )
                        : [formElement.defaultValue].filter(
                            (val) => val !== undefined,
                          )
                    }
                    className="flex items-center justify-start gap-2"
                  >
                    {options}
                  </ToggleGroup>
                )}
              </FormControl>
              {formElement.description && (
                <FormDescription>{formElement.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
    case "Switch":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          render={({ field }: { field: ControllerRenderProps }) => (
            <FormItem className="flex w-full flex-col justify-center rounded border p-3">
              <div className="flex h-full items-center justify-between">
                <FormLabel className="w-full grow">
                  {formElement.label}
                </FormLabel>
                <FormControl>
                  <Switch
                    {...field}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
              {formElement.description && (
                <FormDescription>{formElement.description}</FormDescription>
              )}
            </FormItem>
          )}
        />
      );
    case "Select":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          render={({ field }: { field: ControllerRenderProps }) => (
            <FormItem className="w-full">
              <FormLabel>
                {formElement.label}
                {formElement.label && formElement.required && " *"}
              </FormLabel>
              <Select
                {...field}
                value={field.value}
                onValueChange={field.onChange}
                required={formElement.required}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={formElement.placeholder || "Select item"}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {formElement.options.map(({ label, value }: SelectOption) => (
                    <SelectItem key={label} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>{formElement.description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "MultiSelect":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          render={({ field }: { field: ControllerRenderProps }) => (
            <FormItem className="w-full">
              <FormLabel>
                {formElement.label} {formElement.required ? " *" : ""}
              </FormLabel>
              <MultipleSelect
                options={formElement.options}
                inputProps={{
                  ...field,
                  name: formElement.name,
                  required: formElement.required,
                  className: "rounded-md",
                }}
                placeholder={formElement.placeholder || "Select item"}
                creatable
                onChange={(optionsArray) =>
                  form.setValue(formElement.name, optionsArray)
                }
                value={field.value}
              />
              {/* <MultiSelect value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <MultiSelectTrigger>
                    <MultiSelectValue
                      placeholder={formElement.placeholder || "Select item"}
                    />
                  </MultiSelectTrigger>
                </FormControl>
                <MultiSelectContent>
                  <MultiSelectList>
                    {formElement.options.map(
                      ({ label, value }: SelectOption) => (
                        <MultiSelectItem key={label} value={value}>
                          {label}
                        </MultiSelectItem>
                      ),
                    )}
                  </MultiSelectList>
                </MultiSelectContent>
              </MultiSelect> */}
              <FormDescription>{formElement.description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "DatePicker":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          render={({ field }: { field: ControllerRenderProps }) => {
            const date = field.value;
            return (
              <FormItem className="flex w-full flex-col">
                <div>
                  <FormLabel>
                    {formElement.label} {formElement.required ? " *" : ""}
                  </FormLabel>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 size-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(newDate: Date | undefined) => {
                        form.setValue(field.name, newDate, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>{formElement.description}</FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      );
    case "H1":
      return (
        <h1
          key={formElement.content}
          className={cn("mt-6 text-3xl font-bold", formElement.className)}
        >
          {formElement.content}
        </h1>
      );
    case "H2":
      return <h2 className="mt-4 text-xl font-bold">{formElement.content}</h2>;
    case "H3":
      return (
        <h3 className="font-semiboldbold mt-3 text-lg">
          {formElement.content} content
        </h3>
      );
    case "P":
      return (
        <p className="mb-4 mt-0 text-wrap pt-0 tracking-wider text-foreground/60 dark:text-foreground/60">
          {formElement.content}
        </p>
      );
    case "Separator":
      return (
        <div className="w-full py-3">
          <Separator {...htmlInputAttributes} />
        </div>
      );
    default:
      return <div>Invalid Form Element</div>;
  }
};
