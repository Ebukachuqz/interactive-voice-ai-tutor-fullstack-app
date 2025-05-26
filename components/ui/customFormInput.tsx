import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: "text" | "number" | "email" | "password";
  placeholder?: string;
  description?: string;
  control: Control<T>;
  className?: string;
}

export function CustomFormInput<T extends FieldValues>({
  name,
  label,
  type = "text",
  placeholder,
  description,
  control,
  className = "",
}: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              value={field.value ?? ""}
              onChange={(e) => {
                const value =
                  type === "number" ? e.target.valueAsNumber : e.target.value;
                field.onChange(value);
              }}
              className={cn(className, "input")}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
