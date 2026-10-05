import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social preview in the site's own language: navy-to-blue field, cyan bloom,
 * chrome-toned name, glass stat row.
 */
export default async function OpenGraphImage() {
  const clash = await readFile(
    join(process.cwd(), "app/fonts/ClashDisplay-Bold.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#06141d",
          backgroundImage:
            "radial-gradient(70% 60% at 50% 115%, rgba(135,206,235,.55) 0%, rgba(135,206,235,0) 60%), radial-gradient(60% 50% at 50% 65%, rgba(33,110,140,.6) 0%, rgba(33,110,140,0) 70%), linear-gradient(180deg, #06141d 0%, #0d3c53 55%, #05111a 100%)",
          fontFamily: "Clash",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{ fontSize: 34, letterSpacing: "-0.02em" }}>AH.</span>
          <span
            style={{
              fontSize: 17,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(214,233,243,.76)",
            }}
          >
            {site.handle}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 22,
              letterSpacing: "0.02em",
              color: "rgba(255,255,255,.85)",
              marginBottom: 14,
            }}
          >
            {site.kicker}
          </span>
          <span
            style={{
              fontSize: 116,
              lineHeight: 0.9,
              letterSpacing: "-0.035em",
              backgroundImage:
                "linear-gradient(180deg,#ffffff 0%,#dceef7 46%,#8fb3c4 62%,#ffffff 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {site.name}
          </span>
          <span
            style={{
              fontSize: 34,
              marginTop: 18,
              color: "rgba(255,255,255,.92)",
            }}
          >
            Video Editor & Social Media Manager
          </span>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {[
            "50M+ views",
            "2M+ followers",
            "120M+ engagement",
            "6 years",
          ].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                padding: "14px 26px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,.2)",
                backgroundColor: "rgba(14,48,66,.55)",
                fontSize: 24,
                color: "rgba(255,255,255,.9)",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Clash", data: clash, style: "normal", weight: 700 }],
    },
  );
}
