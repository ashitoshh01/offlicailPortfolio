/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, FileText, Eye, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumeDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ResumeDialog({
  children,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: ResumeDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [activePage, setActivePage] = useState<"all" | "1" | "2">("all");

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? setControlledOpen : setInternalOpen;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="w-[calc(100vw-1.5rem)] sm:w-full max-w-3xl sm:max-w-4xl max-h-[90vh] sm:max-h-[92vh] flex flex-col p-4 sm:p-6 overflow-hidden">
        <DialogHeader className="space-y-1 pb-2 pr-8 sm:pr-10 text-left">
          <div className="flex items-center gap-2.5">
            <div className="size-8 sm:size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <FileText className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-base sm:text-xl font-bold leading-tight truncate sm:whitespace-normal">
                Ashitosh Lavhate — Resume
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-muted-foreground truncate sm:whitespace-normal">
                Computer Science Undergraduate — Software Engineer • 2 Pages
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Action Controls when Preview is Open */}
        {showPreview && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pb-3 border-b">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <a
                href="/resume.pdf"
                download="Ashitosh_Lavhate_Resume.pdf"
                onClick={handleDownload}
                className="flex-1 sm:flex-none"
              >
                <Button size="sm" className="w-full sm:w-auto gap-2 font-medium cursor-pointer shadow-sm text-xs sm:text-sm">
                  {downloaded ? (
                    <>
                      <CheckCircle2 className="size-4 text-emerald-300" />
                      Downloaded!
                    </>
                  ) : (
                    <>
                      <Download className="size-4" />
                      <span className="sm:hidden">Download</span>
                      <span className="hidden sm:inline">Download Resume (PDF)</span>
                    </>
                  )}
                </Button>
              </a>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowPreview(false)}
                className="gap-1.5 text-xs sm:text-sm cursor-pointer"
              >
                <Eye className="size-4" />
                Hide Preview
              </Button>

              <div className="flex items-center gap-0.5 sm:gap-1 bg-muted/70 p-0.5 rounded-lg text-xs border">
                <button
                  type="button"
                  onClick={() => setActivePage("all")}
                  className={cn(
                    "px-2 sm:px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer text-xs",
                    activePage === "all"
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="sm:hidden">All</span>
                  <span className="hidden sm:inline">All (2 Pages)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActivePage("1")}
                  className={cn(
                    "px-2 sm:px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer text-xs",
                    activePage === "1"
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Page 1
                </button>
                <button
                  type="button"
                  onClick={() => setActivePage("2")}
                  className={cn(
                    "px-2 sm:px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer text-xs",
                    activePage === "2"
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Page 2
                </button>
              </div>
            </div>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer">
                <ExternalLink className="size-3.5" />
                Open PDF in New Tab
              </Button>
            </a>
          </div>
        )}

        {/* Preview Area or Clean Responsive Empty State */}
        {showPreview ? (
          <div className="relative flex-1 min-h-0 max-h-[62vh] sm:max-h-[70vh] w-full rounded-xl overflow-y-auto border bg-neutral-100 dark:bg-neutral-900/60 p-2 sm:p-4 mt-1 sm:mt-2 shadow-inner">
            <div className="max-w-[760px] mx-auto space-y-4 sm:space-y-6">
              {(activePage === "all" || activePage === "1") && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between px-1 text-xs font-medium text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block size-2 rounded-full bg-primary" />
                      Page 1 of 2
                    </span>
                    <span className="text-[11px] text-muted-foreground/80">Experience & Projects</span>
                  </div>
                  <div className="bg-white rounded-lg shadow-md border border-neutral-200 overflow-hidden">
                    <img
                      src="/resume-page-1.webp"
                      alt="Ashitosh Lavhate Resume - Page 1"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto block select-none"
                    />
                  </div>
                </div>
              )}

              {(activePage === "all" || activePage === "2") && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between px-1 text-xs font-medium text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block size-2 rounded-full bg-primary" />
                      Page 2 of 2
                    </span>
                    <span className="text-[11px] text-muted-foreground/80">Achievements & Leadership</span>
                  </div>
                  <div className="bg-white rounded-lg shadow-md border border-neutral-200 overflow-hidden">
                    <img
                      src="/resume-page-2.webp"
                      alt="Ashitosh Lavhate Resume - Page 2"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto block select-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-5 sm:p-10 text-center rounded-xl border border-dashed bg-muted/20 my-auto py-8 sm:py-14 space-y-4">
            <div className="size-14 sm:size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <FileText className="size-7 sm:size-8" />
            </div>
            <div className="space-y-1.5 max-w-md px-2">
              <h3 className="font-semibold text-base sm:text-lg">Resume Ready for Download</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Save the resume directly to your device or toggle the preview to inspect both pages right here.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 w-full max-w-xs sm:max-w-md pt-2">
              <a
                href="/resume.pdf"
                download="Ashitosh_Lavhate_Resume.pdf"
                onClick={handleDownload}
                className="w-full sm:w-auto"
              >
                <Button className="w-full sm:w-auto gap-2 cursor-pointer font-medium shadow-sm">
                  {downloaded ? (
                    <>
                      <CheckCircle2 className="size-4 text-emerald-300" />
                      Downloaded!
                    </>
                  ) : (
                    <>
                      <Download className="size-4" />
                      Download Resume (PDF)
                    </>
                  )}
                </Button>
              </a>
              <Button
                variant="outline"
                onClick={() => setShowPreview(true)}
                className="w-full sm:w-auto gap-2 cursor-pointer"
              >
                <Eye className="size-4" />
                Show Preview
              </Button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full sm:w-auto gap-1.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <ExternalLink className="size-3.5" />
                  Open in New Tab
                </Button>
              </a>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
