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
    imageUrl: "https://pbs.twimg.com/profile_images/1310888203134447618/pl7LN59m_400x400.jpg",
    firstName: "Nafeeur",
    lastName: "Rahman",
    positions: ["Founder & CEO"],
    socialNetworks: [
      {
        name: "X",
        url: "https://x.com/Nafeeur_Rahman"
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/nafeeur10"
      }
    ]
  },
  {
    imageUrl:
      "https://media.licdn.com/dms/image/v2/C4D03AQFyPoHzeiwpCQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1517476970117?e=2147483647&v=beta&t=3Gb9DUMu7Y9xKWWFbhaFHLOtzPI3AM8bvX09mIuJx24",
    firstName: "Mushfiqur",
    lastName: "Rahman",
    positions: ["Product Manager", "Content Strategist"],
    socialNetworks: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/muhammadmushfiq/"
      },
      {
        name: "X",
        url: "https://x.com/MailToMushfiq"
      }
    ]
  },
  {
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D5603AQGfEkf-9_RVyQ/profile-displayphoto-crop_800_800/B56Zku5JyiIAAI-/0/1757428359081?e=1779321600&v=beta&t=8xYMiGPqKmlwyW-_hurwhG0-dMCgHTsOiGjmTOO4lyY",
    firstName: "Md Ohidul",
    lastName: "Islam",
    positions: ["Product Designer", "SaaS & Enterprise UX"],
    socialNetworks: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/ohidulonline/"
      }
    ]
  },
  {
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D5603AQE_oT3ySgzyYQ/profile-displayphoto-crop_800_800/B56Zg8retNHMAQ-/0/1753364688991?e=1779321600&v=beta&t=7DA3CqwNlMPYIyMqFPZJoNrxpRKeBVifQv20Qbb82sU",
    firstName: "A H M Mosiur",
    lastName: "Rahaman",
    positions: ["Full Stack Engineer", "Microservice"],
    socialNetworks: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/a-h-m-mosiur-rahaman-98a103107/"
      }
    ]
  }
];
