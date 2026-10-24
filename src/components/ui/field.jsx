import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

const control =
  "w-full rounded-md border bg-canvas px-2 text-base text-ink transition-[border-color,box-shadow] duration-200 placeholder:text-muted focus:outline-none focus-visible:outline-none focus:border-ink focus:ring-2 focus:ring-primary/25 aria-[invalid=true]:border-primary";

export function Field({ id, label, error, hint, className, children }) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-primary">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ className, invalid, describedBy, ...props }) {
  return (
    <input
      aria-invalid={invalid ? "true" : undefined}
      aria-describedby={describedBy}
      className={cn(control, "h-6 border-border", className)}
      {...props}
    />
  );
}

export function Textarea({ className, invalid, describedBy, ...props }) {
  return (
    <textarea
      aria-invalid={invalid ? "true" : undefined}
      aria-describedby={describedBy}
      className={cn(control, "min-h-[160px] resize-y border-border py-1.5", className)}
      {...props}
    />
  );
}

export function Select({ className, invalid, describedBy, children, ...props }) {
  return (
    <div className="relative">
      <select
        aria-invalid={invalid ? "true" : undefined}
        aria-describedby={describedBy}
        className={cn(control, "h-6 appearance-none border-border pr-5", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        strokeWidth={1.75}
        className="pointer-events-none absolute top-1/2 right-2 size-[20px] -translate-y-1/2 text-muted"
      />
    </div>
  );
}

export function Checkbox({ id, children, invalid, describedBy, className, ...props }) {
  return (
    <div className={cn("flex items-start gap-1.5", className)}>
      <input
        id={id}
        type="checkbox"
        aria-invalid={invalid ? "true" : undefined}
        aria-describedby={describedBy}
        className="mt-0.5 size-[20px] shrink-0 cursor-pointer appearance-none rounded-sm border border-ink-soft bg-canvas bg-center bg-no-repeat transition-colors checked:border-primary checked:bg-primary checked:bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2016%2016%22%3E%3Cpath%20d=%22M3.5%208.5l3%203%206-7%22%20fill=%22none%22%20stroke=%22white%22%20stroke-width=%222%22/%3E%3C/svg%3E')] aria-[invalid=true]:border-primary"
        {...props}
      />
      <label htmlFor={id} className="text-sm text-muted">
        {children}
      </label>
    </div>
  );
}
