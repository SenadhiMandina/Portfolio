import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../lib/data";
import profilePhoto from "../assets/profile-photo.webp";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <a href="#home" className="flex items-center justify-center gap-2 md:justify-start">
              <span className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-cyan-300/50 shadow-[0_0_16px_rgba(34,211,238,0.25)]">
                <img
                  src={profilePhoto}
                  alt="Senadhi Mandina"
                  className="h-full w-full object-cover object-[center_24%]"
                />
              </span>
              <span className="font-display text-lg font-semibold text-white">
                Senadhi<span className="text-gradient">.dev</span>
              </span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-white/40">
              {profile.role} & {profile.subRole}. Building intelligent software, one commit at a time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a href={profile.github} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full glass text-white/60 transition-all hover:scale-110 hover:text-cyan-300" aria-label="GitHub">
              <Github size={17} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full glass text-white/60 transition-all hover:scale-110 hover:text-cyan-300" aria-label="LinkedIn">
              <Linkedin size={17} />
            </a>
            <a href={`mailto:${profile.email}`} className="grid h-10 w-10 place-items-center rounded-full glass text-white/60 transition-all hover:scale-110 hover:text-cyan-300" aria-label="Email">
              <Mail size={17} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
