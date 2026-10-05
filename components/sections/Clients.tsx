import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import SkyGlow from "@/components/ui/SkyGlow";
import { clientProof, clients } from "@/content/site";

/**
 * Client marquee (PRD §07).
 *
 * IMPORTANT before publishing: verify the exact spelling of every name and
 * confirm with Aymen that each client may be displayed publicly. Names render
 * as text until a logo file is added to /public/media/clients and wired up in
 * content/site.ts.
 */
export default function Clients() {
  // Rendered twice so the marquee loop wraps seamlessly at -50%.
  const loop = [...clients, ...clients];

  return (
    <section
      id="clients"
      className="section-pad relative overflow-hidden"
      aria-labelledby="clients-heading"
    >
      <SkyGlow className="top-[18%] left-1/2 h-[16rem] w-[46rem] -translate-x-1/2" intensity={0.35} />

      <div className="shell relative">
        <SectionHeading
          index="06"
          eyebrow="Clients & collaborations"
          title={<span id="clients-heading">Brands I&rsquo;ve built for.</span>}
        />
      </div>

      <div className="mask-x mt-10 overflow-hidden py-2">
        <ul
          className="animate-marquee flex w-max items-center gap-4 sm:gap-6"
          style={{ ["--marquee-duration" as string]: "42s" }}
        >
          {loop.map((client, index) => (
            <li
              key={`${client.name}-${index}`}
              className="glass flex h-16 shrink-0 items-center gap-3 rounded-full px-6 sm:h-20 sm:px-8"
              aria-hidden={index >= clients.length ? "true" : undefined}
            >
              {client.logo ? (
                <Image
                  src={client.logo}
                  alt=""
                  width={48}
                  height={34}
                  className="h-6 w-auto object-contain sm:h-7"
                />
              ) : null}
              <span className="display text-[1.05rem] whitespace-nowrap text-white/75 sm:text-[1.35rem]">
                {client.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Channels and pages from the Drive's "People I worked with" folder. */}
      <div className="shell relative mt-12">
        <ul className="hide-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-6 sm:overflow-visible sm:px-0">
          {clientProof.map((item) => (
            <li key={item.name} className="w-[38vw] max-w-[180px] shrink-0 snap-start sm:w-auto sm:max-w-none">
              <figure>
                <div className="glass relative aspect-[9/19] overflow-hidden rounded-[18px] p-1">
                  <div className="relative h-full w-full overflow-hidden rounded-[14px]">
                    <Image
                      src={item.src}
                      alt={`${item.name} — channel / profile`}
                      fill
                      sizes="(max-width: 640px) 40vw, 15vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <figcaption className="mt-2 text-center text-[0.72rem] font-medium text-white/75">
                  {item.name}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
