import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to /en as the default locale
  redirect("/en");
}
