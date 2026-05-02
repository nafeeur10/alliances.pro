import React from "react";
import Image from "next/image";
import Link from "next/link";

import { teamList as fallbackTeam } from "@/@data/teams";
import GithubIcon from "@/components/icons/github-icon";
import LinkedInIcon from "@/components/icons/linkedin-icon";
import XIcon from "@/components/icons/x-icon";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SectionContainer from "@/components/layout/section-container";
import SectionHeader from "@/components/layout/section-header";
import { getHomeSections, pickArray, pickString, readPayload, resolveAssetUrl } from "@/lib/cms";

interface SocialNetwork {
  name: string;
  url: string;
}

interface TeamMember {
  imageUrl: string;
  firstName: string;
  lastName: string;
  positions: string[];
  socialNetworks: SocialNetwork[];
}

export async function TeamSection() {
  const { sections } = await getHomeSections();
  const payload = readPayload<Record<string, unknown>>(sections, "team");

  const members = pickArray<TeamMember>(payload, "members", fallbackTeam);

  const socialIcon = (socialName: string) => {
    switch (socialName) {
      case "LinkedIn":
        return <LinkedInIcon />;
      case "Github":
        return <GithubIcon />;
      case "X":
        return <XIcon />;
    }
  };

  return (
    <SectionContainer id="team">
      <SectionHeader
        subTitle={pickString(payload, "eyebrow", "Team")}
        title={pickString(payload, "headline", "The Company Dream Team")}
        description={pickString(payload, "sub", "")}
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map(({ imageUrl, firstName, lastName, positions, socialNetworks }, index) => {
          const avatarSrc = resolveAssetUrl(imageUrl) ?? imageUrl;
          return (
            <Card
              key={`${firstName}-${lastName}-${index}`}
              className="bg-muted group/hoverimg flex h-full flex-col overflow-hidden pt-0"
            >
              <figure className="overflow-hidden">
                <Image
                  src={avatarSrc}
                  width={300}
                  height={300}
                  className="aspect-square w-full object-cover saturate-0 transition-all duration-200 ease-linear group-hover/hoverimg:scale-[1.05] group-hover/hoverimg:saturate-100"
                  alt={`${firstName} ${lastName} — ${(positions ?? []).join(", ")}`}
                  unoptimized
                />
              </figure>
              <CardHeader className="pt-0">
                <CardTitle className="text-lg">
                  {firstName}
                  <span className="text-primary ml-1">{lastName}</span>
                </CardTitle>
                <CardDescription>{(positions ?? []).join(", ")}</CardDescription>
              </CardHeader>

              <CardFooter className="mt-auto space-x-4">
                {(socialNetworks ?? []).map(({ name, url }, idx) => (
                  <Link
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener"
                    aria-label={`${firstName} ${lastName} on ${name}`}
                    className="transition-all hover:opacity-80"
                  >
                    {socialIcon(name)}
                  </Link>
                ))}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </SectionContainer>
  );
}
