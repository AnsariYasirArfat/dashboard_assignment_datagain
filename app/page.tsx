import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect to appeal letter page as the main page
  redirect("/appeal-letter");
}
