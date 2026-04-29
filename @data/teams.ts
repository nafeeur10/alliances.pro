interface TeamProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  positions: string[];
  socialNetworks: SocialNetworkProps[];
}

interface SocialNetworkProps {
  name: string;
  url: string;
}

export const teamList: TeamProps[] = [
  {
    imageUrl:
      "https://pbs.twimg.com/profile_images/1310888203134447618/pl7LN59m_400x400.jpg",
    firstName: "Nafeeur",
    lastName: "Rahman",
    positions: ["Founder & CEO"],
    socialNetworks: [
      {
        name: "X",
        url: "https://x.com/Nafeeur_Rahman",
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/nafeeur10",
      },
    ],
  },
  {
    imageUrl:
      "https://media.licdn.com/dms/image/v2/C4D03AQFyPoHzeiwpCQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1517476970081?e=1770854400&v=beta&t=3DfYKSqQLrTSSZIKZncdxfpFH1ARQ1LWzhuQDMY7X3o",
    firstName: "Mushfiqur",
    lastName: "Rahman",
    positions: ["Product Manager", "Content Strategist"],
    socialNetworks: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/muhammadmushfiq/",
      },
      {
        name: "X",
        url: "https://x.com/MailToMushfiq",
      },
    ],
  },
  {
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D5603AQGfEkf-9_RVyQ/profile-displayphoto-scale_400_400/B56Zku5JyiIAAg-/0/1757428359304?e=1770854400&v=beta&t=KbDjg8j5ycLntKWrT_CEoZk06yrqBK-Gi5J5Pdmu93g",
    firstName: "Md Ohidul",
    lastName: "Islam",
    positions: ["Backend Developer"],
    socialNetworks: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/ohidulonline/",
      }
    ],
  },
  {
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D5603AQE_oT3ySgzyYQ/profile-displayphoto-scale_400_400/B56Zg8retNHMAo-/0/1753364689110?e=1770854400&v=beta&t=lfQmtOJdXmAPb1F1oPBVCfDS6HTFPxWm1a-phTrFH88",
    firstName: "A H M Mosiur",
    lastName: "Rahaman",
    positions: ["Fullstack Developer", "UX Researcher"],
    socialNetworks: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/a-h-m-mosiur-rahaman-98a103107/",
      },
    ],
  },
];
