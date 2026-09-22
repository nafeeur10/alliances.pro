/**
 * Coded hero illustrations for docs pages. Pure SVG — no image assets, so it
 * stays sharp at any size and reads on both themes.
 *
 * `shopify-plug`: your apps on the left, a plug crossing the middle, and the
 * Shopify mark on the right. The connection metaphor for "link your Shopify
 * Partner account so your apps' merchants land in the CRM".
 */

const ART_STYLES = `
  @keyframes docArtPlug {
    from { transform: translateX(-12px); }
    to   { transform: translateX(0); }
  }
  @keyframes docArtSpark {
    0%, 100% { opacity: 0.3; transform: scale(0.9); }
    50%      { opacity: 1;   transform: scale(1.08); }
  }
  @keyframes docArtFloat {
    from { transform: translateY(5px); }
    to   { transform: translateY(-5px); }
  }
  .doc-art-plug  { animation: docArtPlug 2.4s ease-in-out infinite alternate; }
  .doc-art-spark { animation: docArtSpark 1.6s ease-in-out infinite; transform-origin: 408px 170px; }
  .doc-art-mark  { animation: docArtFloat 5s ease-in-out infinite alternate; }
  @media (prefers-reduced-motion: reduce) {
    .doc-art-plug, .doc-art-spark, .doc-art-mark { animation: none; }
  }
`;

// The official Shopify mark (simple-icons path), drawn in white on the disc.
const SHOPIFY_GLYPH =
  "M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z";

/** One row of the app list: icon tile, two text bars, a synced tick. */
function AppRow({ y, fill }: { y: number; fill: string }) {
  return (
    <g>
      <rect x="30" y={y} width="38" height="38" rx="11" fill={fill} />
      <rect x="80" y={y + 8} width="86" height="9" rx="4.5" fill="#CBD5E1" />
      <rect x="80" y={y + 24} width="56" height="7" rx="3.5" fill="#E2E8F0" />
      <circle cx="206" cy={y + 19} r="11" fill="#DCFCE7" />
      <path
        d={`M201 ${y + 19}l3.4 3.6 6.6-7`}
        stroke="#16A34A"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
  );
}

function ShopifyPlugArt() {
  return (
    <svg
      viewBox="0 0 620 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="h-auto w-full"
    >
      <style dangerouslySetInnerHTML={{ __html: ART_STYLES }} />
      <defs>
        <linearGradient
          id="da-mark"
          x1="420"
          y1="90"
          x2="590"
          y2="255"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8FC65A" />
          <stop offset="0.55" stopColor="#5E9E44" />
          <stop offset="1" stopColor="#3F7A33" />
        </linearGradient>
        <linearGradient
          id="da-plug"
          x1="268"
          y1="132"
          x2="344"
          y2="208"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6366F1" />
          <stop offset="0.5" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#0EA5E9" />
        </linearGradient>
        <linearGradient
          id="da-prong"
          x1="344"
          y1="0"
          x2="400"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CBD5E1" />
          <stop offset="1" stopColor="#94A3B8" />
        </linearGradient>
        <linearGradient
          id="da-spark"
          x1="396"
          y1="140"
          x2="420"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FDE68A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient
          id="da-app1"
          x1="30"
          y1="112"
          x2="68"
          y2="150"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A78BFA" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient
          id="da-app2"
          x1="30"
          y1="164"
          x2="68"
          y2="202"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FBBF24" />
          <stop offset="1" stopColor="#F97316" />
        </linearGradient>
        <linearGradient
          id="da-app3"
          x1="30"
          y1="216"
          x2="68"
          y2="254"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#38BDF8" />
          <stop offset="1" stopColor="#0EA5E9" />
        </linearGradient>
        <radialGradient
          id="da-glow"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(505 170) scale(140)"
        >
          <stop stopColor="#5E9E44" stopOpacity="0.22" />
          <stop offset="0.55" stopColor="#5E9E44" stopOpacity="0.08" />
          <stop offset="1" stopColor="#5E9E44" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ---- Your apps ---- */}
      <g>
        <rect
          x="6"
          y="54"
          width="232"
          height="232"
          rx="22"
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth="2"
        />
        <rect x="30" y="78" width="80" height="10" rx="5" fill="#94A3B8" />
        <AppRow y={112} fill="url(#da-app1)" />
        <AppRow y={164} fill="url(#da-app2)" />
        <AppRow y={216} fill="url(#da-app3)" />
      </g>

      {/* ---- Shopify: the mark on a disc ---- */}
      <circle cx="505" cy="170" r="140" fill="url(#da-glow)" />
      <g className="doc-art-mark">
        <circle cx="505" cy="170" r="88" fill="url(#da-mark)" />
        <circle cx="505" cy="170" r="79" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="2" />
        <g transform="translate(461.8 126.8) scale(3.6)">
          <path d={SHOPIFY_GLYPH} fill="#FFFFFF" />
        </g>
      </g>

      {/* ---- Spark across the gap ---- */}
      <g className="doc-art-spark">
        <path d="M414 142l-16 30h11l-7 27 20-34h-11l9-23z" fill="url(#da-spark)" />
      </g>

      {/* ---- The connector between them ---- */}
      <g className="doc-art-plug">
        <rect x="344" y="152" width="56" height="11" rx="5.5" fill="url(#da-prong)" />
        <rect x="344" y="187" width="56" height="11" rx="5.5" fill="url(#da-prong)" />
        <rect x="268" y="132" width="76" height="76" rx="24" fill="url(#da-plug)" />
        <rect x="286" y="156" width="40" height="9" rx="4.5" fill="#FFFFFF" fillOpacity="0.85" />
        <rect x="286" y="176" width="26" height="9" rx="4.5" fill="#FFFFFF" fillOpacity="0.55" />
        <path
          d="M268 170h-38"
          stroke="#334155"
          strokeWidth="13"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

export function DocHeroArt({ variant }: { variant?: string }) {
  if (variant !== "shopify-plug") return null;
  return <ShopifyPlugArt />;
}
