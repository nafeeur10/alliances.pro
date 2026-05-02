import { Badge } from "@/components/ui/badge";

interface HeroEyebrowProps {
  badgeText: string;
  tail: string;
}

export function HeroEyebrow({ badgeText, tail }: HeroEyebrowProps) {
  const maskedClasses =
    "bg-linear-to-r from-primary via-foreground to-primary bg-clip-text text-transparent font-semibold";

  return (
    <Badge variant="outline" className="bg-muted py-2 text-sm">
      {tail ? (
        <>
          <span className="mr-2">
            <Badge className="bg-background hover:bg-background">
              <span className={maskedClasses}>{badgeText}</span>
            </Badge>
          </span>
          <span className={maskedClasses}> {tail} </span>
        </>
      ) : (
        <span className={maskedClasses}> {badgeText} </span>
      )}
    </Badge>
  );
}
