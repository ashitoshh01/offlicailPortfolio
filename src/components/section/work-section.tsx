/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { DATA } from "@/data/resume";

const MONTH_MAP: Record<string, string> = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

function formatShortDate(dateStr?: string) {
  if (!dateStr) return "";
  return dateStr.replace(
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g,
    (match) => MONTH_MAP[match] || match
  );
}

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none flex items-center justify-center font-bold text-xs text-muted-foreground uppercase select-none">
        {alt ? alt.split(" ").map((w) => w[0]).slice(0, 2).join("") : ""}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${alt} logo`}
      width={40}
      height={40}
      loading="lazy"
      decoding="async"
      className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none bg-white"
      onError={() => setImageError(true)}
    />
  );
}

export default function WorkSection() {
  return (
    <div className="w-full grid gap-6">
      {DATA.work.map((work) => {
        const isSameStartEnd =
          (work.start as string) === (work.end as string | undefined);
        const dateDisplay = isSameStartEnd
          ? work.start
          : `${work.start} - ${work.end ?? "Present"}`;

        const shortStart = formatShortDate(work.start as string);
        const shortEnd = work.end
          ? formatShortDate(work.end as string)
          : "Present";
        const shortDateDisplay = isSameStartEnd
          ? shortStart
          : `${shortStart} - ${shortEnd}`;

        const companyShort =
          ("companyShort" in work && (work.companyShort as string)) ||
          (work.company.includes("Google Student Ambassador") ? "GSA" : null);

        return (
          <div key={work.company} className="w-full grid gap-2">
            <div className="flex items-center gap-x-3 justify-between w-full text-left">
              <div className="flex items-center gap-x-3 flex-1 min-w-0">
                <LogoImage src={work.logoUrl} alt={work.company} />
                <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                  <h3 className="font-semibold leading-none flex items-center gap-2 text-base">
                    {companyShort ? (
                      <>
                        <span className="sm:hidden">{companyShort}</span>
                        <span className="hidden sm:inline">{work.company}</span>
                      </>
                    ) : (
                      work.company
                    )}
                  </h3>
                  <div className="font-sans text-sm text-muted-foreground">
                    {work.title}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                <span className="sm:hidden">{shortDateDisplay}</span>
                <span className="hidden sm:inline">{dateDisplay}</span>
              </div>
            </div>
            {work.description && (
              <div className="p-0 ml-11 md:ml-13 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {work.description}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
