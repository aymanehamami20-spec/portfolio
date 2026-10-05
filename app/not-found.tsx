import Link from "next/link";
import ChromeText from "@/components/ui/ChromeText";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display display-lg mt-5">
        <ChromeText>Cut from the edit.</ChromeText>
      </h1>
      <p className="muted mt-5 max-w-md text-pretty">
        That page isn&rsquo;t here. The work is one click away.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href="/" variant="primary" size="lg">
          Back to home
        </ButtonLink>
        <Link
          href="/#work"
          className="glass rounded-full px-7 py-3.5 text-[0.95rem] font-semibold transition hover:border-white/35"
        >
          Selected work
        </Link>
      </div>
    </section>
  );
}
