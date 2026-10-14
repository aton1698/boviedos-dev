"use client";

import { useId, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import ChromaGrid, { type ChromaItem } from "./motion/ChromaGrid";

export interface SearchablePost extends ChromaItem {
  /** Lowercase-insensitive text the search looks into (title, excerpt, body). */
  searchText: string;
}

interface BlogSearchGridProps {
  posts: SearchablePost[];
  labels: {
    label: string;
    placeholder: string;
    clear: string;
    noResults: string;
    resultOne: string;
    resultMany: string;
  };
}

/** Case- and accent-insensitive: "ingenieria" finds "Ingeniería". */
const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

/** Search box that filters the post cards as you type; every word must appear somewhere in the post. */
export function BlogSearchGrid({ posts, labels }: BlogSearchGridProps) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const statusId = useId();

  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const visible = terms.length === 0 ? posts : posts.filter((post) => terms.every((term) => normalize(post.searchText).includes(term)));
  const status = terms.length === 0 ? "" : `${visible.length} ${visible.length === 1 ? labels.resultOne : labels.resultMany}`;

  return (
    <div>
      <div className="relative max-w-xl" role="search">
        <label htmlFor={inputId} className="sr-only">
          {labels.label}
        </label>
        <HugeiconsIcon
          icon={Search01Icon}
          size={20}
          strokeWidth={1.75}
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-accent"
        />
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={labels.placeholder}
          autoComplete="off"
          aria-describedby={statusId}
          className="min-h-12 w-full rounded-full border border-[var(--color-control-border)] bg-[var(--nav-surface)] py-2 pl-12 pr-12 text-base text-text placeholder:text-text-muted [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            aria-label={labels.clear}
            onClick={() => setQuery("")}
            className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-text-muted hover:bg-surface hover:text-text"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        )}
      </div>
      <p id={statusId} role="status" className="label mt-3 min-h-[1.5em]">
        {status}
      </p>

      {visible.length > 0 ? (
        <div className="mt-6">
          <ChromaGrid columns={3} minCardWidth={280} gap={24} items={visible} />
        </div>
      ) : (
        <p className="mt-6 rounded-2xl border border-divider bg-surface p-8 text-text-muted">{labels.noResults}</p>
      )}
    </div>
  );
}
