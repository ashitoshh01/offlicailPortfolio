import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import { Icons } from "@/components/icons";

export default function ContactSection() {
  return (
    <div className="border rounded-xl p-8 sm:p-10 relative overflow-hidden">
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium">Contact</span>
      </div>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
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
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Get in Touch
        </h2>
        <p className="mx-auto max-w-lg text-muted-foreground text-balance">
          I&apos;m always excited to discuss backend engineering, applied AI, or new opportunities. Whether you want to collaborate on a project or just say hi, feel free to drop a message.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full max-w-md">
          <Link
            href={`mailto:${DATA.contact.email}`}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity shadow-sm"
          >
            <Mail className="size-4" />
            <span>{DATA.contact.email}</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href={DATA.contact.social.GitHub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-background hover:bg-muted text-foreground text-sm font-medium transition-colors"
            >
              <Icons.github className="size-4" />
              GitHub
            </Link>
            <Link
              href={DATA.contact.social.LinkedIn.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-background hover:bg-muted text-foreground text-sm font-medium transition-colors"
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
