import {
  loginCta,
  navLogo,
  resourceFeatured,
  resourceGroups,
  routeList,
  signupCta
} from "@/@data/navbar";

import { Navbar } from "./navbar";

export function NavbarShell() {
  return (
    <Navbar
      logo={navLogo}
      routes={routeList}
      resourceGroups={resourceGroups}
      resourceFeatured={resourceFeatured}
      loginCta={loginCta}
      signupCta={signupCta}
    />
  );
}
