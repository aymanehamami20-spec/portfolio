import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Monogram favicon — chrome "AH" on the site's electric blue. */
export default async function Icon() {
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
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          backgroundImage:
            "linear-gradient(160deg, #c2e6f5 0%, #87ceeb 48%, #216e8c 100%)",
          color: "#06141d",
          fontFamily: "Clash",
          fontSize: 30,
          letterSpacing: "-0.04em",
        }}
      >
        AH
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Clash", data: clash, style: "normal", weight: 700 }],
    },
  );
}
