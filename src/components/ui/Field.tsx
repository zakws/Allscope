import type { ReactNode } from "react";

/**
 * Accessible form field wrapper: label, optional description, error message.
 * The child input must carry id={id}, aria-describedby and aria-invalid —
 * use the helper props returned by fieldAria().
 */
export function Field({
  id,
  label,
  required = false,
  optionalLabel = false,
  description,
  error,
  children,
  className = "",
}: {
  id: string;
  label: string;
  required?: boolean;
  optionalLabel?: boolean;
  description?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-[0.9rem] font-medium text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-orange">
            *
          </span>
        )}
        {optionalLabel && !required && (
          <span className="ml-2 text-[0.75rem] font-normal text-ink-3">optional</span>
        )}
      </label>
      {description && (
        <p id={`${id}-desc`} className="text-[0.8rem] leading-relaxed text-ink-3">
          {description}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[0.8rem] font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function fieldAria(id: string, error?: string, hasDescription?: boolean) {
  const describedBy =
    [hasDescription ? `${id}-desc` : null, error ? `${id}-error` : null]
      .filter(Boolean)
      .join(" ") || undefined;
  return {
    id,
    "aria-describedby": describedBy,
    "aria-invalid": error ? true : undefined,
  } as const;
}
