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
      <DialogContent className="max-w-3xl sm:max-w-4xl max-h-[92vh] flex flex-col p-4 sm:p-6 overflow-hidden">
        <DialogHeader className="space-y-1 pb-2">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-none">
              <FileText className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">Ashitosh Lavhate — Resume</DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
                Computer Science Undergraduate • Applied AI, Backend Systems & Automation
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 pb-3 border-b">
          <div className="flex items-center gap-2">
            <a
              href="/resume.pdf"
              download="Ashitosh_Lavhate_Resume.pdf"
              onClick={handleDownload}
            >
              <Button size="sm" className="gap-2 font-medium cursor-pointer shadow-sm">
                {downloaded ? (
                  <>
                    <CheckCircle2 className="size-4 text-emerald-300" />
                    Downloaded to System!
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
              variant={showPreview ? "secondary" : "outline"}
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="gap-2 cursor-pointer"
            >
              <Eye className="size-4" />
              {showPreview ? "Hide Preview" : "Preview Resume"}
            </Button>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer">
              <ExternalLink className="size-3.5" />
              Open PDF in New Tab
            </Button>
          </a>
        </div>

        {/* Preview Area */}
        {showPreview ? (
          <div className="relative flex-1 min-h-[50vh] sm:min-h-[64vh] max-h-[68vh] w-full rounded-xl overflow-y-auto border bg-neutral-100 dark:bg-neutral-900 p-2 sm:p-4 mt-2 shadow-inner">
            <div className="max-w-[760px] mx-auto bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden">
              <img
                src="/resume-page-1.png"
                alt="Ashitosh Lavhate Resume"
                className="w-full h-auto block select-none"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed bg-muted/20 my-4 space-y-4">
            <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <FileText className="size-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-base">Resume Ready for Download</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Save the resume to your system or toggle preview to view the complete document right here.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="/resume.pdf"
                download="Ashitosh_Lavhate_Resume.pdf"
                onClick={handleDownload}
              >
                <Button className="gap-2 cursor-pointer">
                  <Download className="size-4" />
                  Download Resume
                </Button>
              </a>
              <Button variant="outline" onClick={() => setShowPreview(true)} className="gap-2 cursor-pointer">
                <Eye className="size-4" />
                Show Preview
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
