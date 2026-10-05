import Image from "next/image";
import { heroMedia } from "@/content/site";

/**
 * Hero portrait slot: a transparent cut-out PNG sitting inside a breathing
 * cyan halo, exactly as the reference poster stages its subject.
 *
 * Until `heroMedia.portrait` is set, an empty labelled frame renders — never a
 * stock person, and never the person from the reference image.
 */
export default function Portrait() {
  return (
    <div className="relative z-10 flex h-full w-full items-end justify-center">
      {/* Cyan halo behind the head and shoulders. Sized to hug the figure
          rather than the stage, so it reads as a halo and not a wash. */}
      <div
        className="animate-halo pointer-events-none absolute bottom-[14%] left-1/2 h-[82%] w-[min(34rem,92%)] -translate-x-1/2 rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(160,218,242,1) 0%, rgba(135,206,235,.55) 44%, rgba(135,206,235,0) 74%)",
        }}
        aria-hidden="true"
      />
      {/* Tight inner glow that reads as rim light behind the head. */}
      <div
        className="pointer-events-none absolute bottom-[44%] left-1/2 h-[30%] w-[min(12rem,34%)] -translate-x-1/2 rounded-full bg-white/45 blur-[48px]"
        aria-hidden="true"
      />

      {heroMedia.portrait ? (
        <div className="relative z-10 h-full max-h-[560px] [mask-image:linear-gradient(180deg,#000_70%,transparent_100%)]">
        <Image
          src={heroMedia.portrait}
          alt={heroMedia.portraitAlt}
          // Intrinsic size of the supplied cut-out; it only sets the aspect
          // box, the rendered size comes from `h-full w-auto` below.
          width={189}
          height={343}
          priority
          sizes="(max-width: 768px) 65vw, 300px"
          className="h-full w-auto max-w-none object-contain object-bottom"
        />
        </div>
      ) : (
        <div className="glass-soft relative z-10 flex aspect-[3/4] h-full max-h-full w-[min(20rem,72%)] max-w-full flex-col items-center justify-center gap-2 rounded-t-[28px] rounded-b-none border-b-0 border-dashed px-5 text-center">
          <span className="text-[0.62rem] font-bold tracking-[0.22em] text-white/60 uppercase">
            Portrait
          </span>
          <span className="max-w-[15rem] text-[0.72rem] leading-snug text-white/40">
            Add <code className="text-white/60">portrait.png</code> (transparent
            cut-out) to <code className="text-white/60">/public/media/hero</code>
            {" "}and set it in{" "}
            <code className="text-white/60">content/site.ts</code>.
          </span>
        </div>
      )}
    </div>
  );
}
