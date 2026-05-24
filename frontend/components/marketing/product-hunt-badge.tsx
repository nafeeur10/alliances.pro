interface ProductHuntBadgeProps {
  className?: string;
  alt?: string;
}

const HREF =
  "https://www.producthunt.com/products/alliances-pro?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-alliances-pro";
const SRC =
  "https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1153957&theme=light&t=1779615770521";
const DEFAULT_ALT =
  "Alliances PRO - #1 Follow-up focused CRM for Small Businesses | Product Hunt";

export function ProductHuntBadge({ className, alt = DEFAULT_ALT }: ProductHuntBadgeProps) {
  return (
    <a
      href={HREF}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label="View Alliances PRO on Product Hunt"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SRC} alt={alt} width={250} height={54} loading="lazy" />
    </a>
  );
}
