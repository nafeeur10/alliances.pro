import { loginCta, navLogo, resourceGroups, routeList, signupCta } from "@/@data/navbar";

import { Navbar } from "./navbar";

export function NavbarShell() {
  return (
    <Navbar
      logo={navLogo}
      routes={routeList}
      resourceGroups={resourceGroups}
      loginCta={loginCta}
      signupCta={signupCta}
    />
  );
}
