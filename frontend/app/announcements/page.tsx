import { redirect } from "next/navigation";

// Announcements is currently a synonym for the changelog. Redirect rather than
// duplicate. When the two diverge, replace this with a real page.
export default function AnnouncementsPage(): never {
  redirect("/changelog");
}
