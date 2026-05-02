import DiscordIcon from "@/components/icons/discord-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SectionContainer from "@/components/layout/section-container";
import { getHomeSections, pickObject, pickString, readPayload } from "@/lib/cms";

export async function CommunitySection() {
  const { sections } = await getHomeSections();
  const payload = readPayload<Record<string, unknown>>(sections, "community");

  const headlineLead = pickString(payload, "headline_lead", "Ready to join this");
  const headlineHighlight = pickString(payload, "headline_highlight", "Community?");
  const body = pickString(
    payload,
    "body",
    "Join our vibrant Discord community! Connect, share, and grow with like-minded enthusiasts."
  );
  const cta = pickObject<{ label: string; url: string }>(payload, "cta", {
    label: "Click to dive in!",
    url: "https://discord.com/"
  });

  return (
    <SectionContainer>
      <div className="mx-auto lg:max-w-(--breakpoint-lg)">
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col items-center text-3xl font-bold md:text-4xl">
              <DiscordIcon className="text-[#5e7ce9]" />
              <div>
                {headlineLead}
                <span className="from-primary/60 to-primary bg-linear-to-b bg-clip-text pl-2 text-transparent">
                  {headlineHighlight}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground mx-auto max-w-screen-sm space-y-4 text-center text-xl">
            <p>{body}</p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button size="lg" asChild>
              <a href={cta.url} target="_blank" rel="noreferrer">
                {cta.label}
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </SectionContainer>
  );
}
