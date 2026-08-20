"use client";

import { useCallback, useRef, useState } from "react";
import { track } from "@/lib/analytics";

const ALLOWED = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".jpg", ".jpeg", ".png", ".zip"];
const MAX_FILE_MB = 25;
const MAX_FILES = 10;
const MAX_TOTAL_MB = 100;

function fmtSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function extOf(name: string): string {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i).toLowerCase() : "";
}

/**
 * Accessible drag-and-drop multi-file input that keeps files inside a real
 * <input type="file"> (via DataTransfer) so native form submission and server
 * actions receive them without any client-side upload trickery.
 * Upload progress is the form's genuine pending state — never a fake bar.
 */
export function FileUploader({
  name,
  label,
  multiple = true,
  maxFiles = MAX_FILES,
  analyticsEvent,
}: {
  name: string;
  label: string;
  multiple?: boolean;
  maxFiles?: number;
  analyticsEvent?: "tender_file_upload";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const sync = useCallback((next: File[]) => {
    const dt = new DataTransfer();
    next.forEach((f) => dt.items.add(f));
    if (inputRef.current) inputRef.current.files = dt.files;
    setFiles(next);
  }, []);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const newErrors: string[] = [];
      const current = [...files];
      for (const f of Array.from(incoming)) {
        if (current.some((c) => c.name === f.name && c.size === f.size)) continue;
        const ext = extOf(f.name);
        if (!ALLOWED.includes(ext)) {
          newErrors.push(`${f.name}: file type ${ext || "(none)"} not accepted.`);
          continue;
        }
        if (f.size > MAX_FILE_MB * 1024 * 1024) {
          newErrors.push(`${f.name}: over the ${MAX_FILE_MB} MB per-file limit.`);
          continue;
        }
        if (f.size === 0) {
          newErrors.push(`${f.name}: file is empty.`);
          continue;
        }
        if (current.length >= maxFiles) {
          newErrors.push(`Maximum ${maxFiles} files per submission.`);
          break;
        }
        current.push(f);
      }
      const total = current.reduce((s, f) => s + f.size, 0);
      if (total > MAX_TOTAL_MB * 1024 * 1024) {
        newErrors.push(`Combined size exceeds ${MAX_TOTAL_MB} MB. Remove a file or send a link instead.`);
        // Re-sync the unchanged accepted list so input.files always mirrors
        // the visible list (the native input was cleared on pick).
        sync(files);
      } else {
        sync(current);
        if (analyticsEvent && current.length > files.length) {
          track(analyticsEvent, { count: current.length });
        }
      }
      setErrors(newErrors);
    },
    [files, maxFiles, sync, analyticsEvent],
  );

  const remove = useCallback(
    (idx: number) => {
      sync(files.filter((_, i) => i !== idx));
      setErrors([]);
    },
    [files, sync],
  );

  return (
    <div className="flex flex-col gap-2">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`flex flex-col items-start gap-3 border border-dashed px-6 py-8 text-left transition-colors ${
          dragOver ? "border-orange bg-orange/5" : "border-line-600 bg-surface-850"
        }`}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M14 19V5m0 0-5 5m5-5 5 5" stroke="var(--signal-orange)" strokeWidth="1.6" strokeLinecap="square" />
          <path d="M4 19v4h20v-4" stroke="var(--concrete-400)" strokeWidth="1.6" strokeLinecap="square" />
        </svg>
        <p className="text-[0.9rem] text-ink-2">
          Drag files here, or{" "}
          <button
            type="button"
            className="font-medium text-orange underline underline-offset-2 hover:text-orange-400"
            onClick={() => inputRef.current?.click()}
          >
            choose files
          </button>
        </p>
        <p className="tech-label text-ink-3">
          PDF · DOC · XLS · JPG · PNG · ZIP · max {MAX_FILE_MB} MB each, {maxFiles} files
        </p>
        <input
          ref={inputRef}
          type="file"
          name={name}
          multiple={multiple}
          accept={ALLOWED.join(",")}
          aria-label={label}
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => {
            // Read the picker selection, then ALWAYS clear the native input —
            // state + sync() is the single source of truth, so input.files
            // mirrors the visible list even when a selection is rejected.
            const picked = e.target.files ? Array.from(e.target.files) : [];
            e.target.value = "";
            addFiles(picked);
          }}
        />
      </div>

      <div aria-live="polite">
        {errors.length > 0 && (
          <ul className="mt-1 space-y-1">
            {errors.map((e, i) => (
              <li key={i} className="text-[0.8rem] font-medium text-error">
                {e}
              </li>
            ))}
          </ul>
        )}
        {files.length > 0 && (
          <ul className="mt-2 divide-y divide-line-750 border border-line-750">
            {files.map((f, i) => (
              <li key={`${f.name}-${f.size}`} className="flex items-center justify-between gap-3 px-3 py-2">
                <span className="min-w-0 flex-1 truncate text-[0.85rem] text-ink-2">{f.name}</span>
                <span className="tech-label shrink-0 text-ink-3">{fmtSize(f.size)}</span>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="tech-label shrink-0 px-2 py-1.5 text-ink-3 hover:text-error"
                  aria-label={`Remove ${f.name}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
