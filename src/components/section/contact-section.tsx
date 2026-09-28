import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";
import { Mail, MapPin } from "lucide-react";
import { Icons } from "@/components/icons";

export default function ContactSection() {
  return (
    <div className="relative rounded-xl border border-border bg-card shadow-sm p-8 sm:p-10">
      {/* Pill Badge */}
      <div className="absolute -top-3.5 border bg-primary z-20 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2 shadow-sm pointer-events-none">
        <span className="text-background text-sm font-medium">Contact</span>
      </div>

      {/* Decorative Grid - isolated and behind content */}
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden pointer-events-none z-0">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>

      {/* Interactive Content - elevated and clickable */}
      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Get in Touch
        </h2>
        <p className="mx-auto max-w-lg text-muted-foreground text-balance text-sm sm:text-base leading-relaxed">
          I&apos;m always open to discussing software engineering, interesting projects, collaboration, or new opportunities. Whether you want to build something together or just say hi, feel free to reach out.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full max-w-md">
          <Link
            href={`mailto:${DATA.contact.email}`}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Mail className="size-4" />
            <span>{DATA.contact.email}</span>
          </Link>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <Link
              href={DATA.contact.social.GitHub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:bg-muted text-foreground text-sm font-medium transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Icons.github className="size-4" />
              GitHub
            </Link>
            <Link
              href={DATA.contact.social.LinkedIn.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:bg-muted text-foreground text-sm font-medium transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Icons.linkedin className="size-4" />
              LinkedIn
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
          <MapPin className="size-3.5" />
          <span>{DATA.location}</span>
        </div>
      </div>
    </div>
  );
}
