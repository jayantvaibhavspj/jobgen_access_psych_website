import type { Metadata } from "next";
import HomePage from "@/components/home-page";
import { HOME_IMAGE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Access Psych | Mental health support across Australia",
  description:
    "Access psychology, therapy and counselling services across Australia. Our mental health clinicians have capacity for telehealth and face-to-face sessions.",
  openGraph: {
    title: "Access Psych | Mental health support across Australia",
    description:
      "Access psychology, therapy and counselling services across Australia. Our mental health clinicians have capacity for telehealth and face-to-face sessions.",
    url: "/",
    images: [HOME_IMAGE],
  },
};

export default function Home() {
  return <HomePage />;
}
