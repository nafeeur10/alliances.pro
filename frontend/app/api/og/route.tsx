import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

// nodejs runtime — edge runtime in dev hits "Code generation from strings disallowed".
// In production both work; nodejs avoids the dev-server-only restriction.
export const runtime = "nodejs";

const BRAND_BG_TOP = "#0F172A"; // slate-900
const BRAND_BG_BOTTOM = "#1E293B"; // slate-800
const BRAND_ACCENT = "#F59E0B"; // amber-500 — matches Filament panel primary
const BRAND_ACCENT_SOFT = "#FCD34D"; // amber-300

const truncate = (s: string, max: number): string =>
  s.length <= max ? s : `${s.slice(0, max - 1).trimEnd()}…`;

export async function GET(req: NextRequest): Promise<ImageResponse> {
  const { searchParams } = new URL(req.url);
  const title = truncate(searchParams.get("title") ?? "Alliances PRO", 90);
  const subtitle = truncate(
    searchParams.get("subtitle") ??
      "The CRM platform built for service businesses that grow sideways.",
    160
  );
  const eyebrow = truncate(searchParams.get("eyebrow") ?? "alliances.pro", 60);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background: `linear-gradient(135deg, ${BRAND_BG_TOP} 0%, ${BRAND_BG_BOTTOM} 100%)`,
          color: "#F8FAFC",
          fontFamily: "Inter, sans-serif",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${BRAND_ACCENT}33 0%, transparent 70%)`
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: BRAND_ACCENT_SOFT,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 1.2,
            textTransform: "uppercase"
          }}
        >
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: BRAND_ACCENT
            }}
          />
          {eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28
          }}
        >
          <div
            style={{
              fontSize: title.length > 50 ? 78 : 96,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              color: "#FFFFFF",
              maxWidth: 1000
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 36,
              lineHeight: 1.3,
              color: "#CBD5E1",
              maxWidth: 1000
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#94A3B8",
            fontSize: 22,
            fontWeight: 500,
            paddingTop: 28,
            borderTop: "1px solid #334155"
          }}
        >
          <span>Alliances PRO · alliances.pro</span>
          <span style={{ color: BRAND_ACCENT_SOFT, fontWeight: 700 }}>
            14-day free trial · no credit card
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=86400, immutable"
      }
    }
  );
}
