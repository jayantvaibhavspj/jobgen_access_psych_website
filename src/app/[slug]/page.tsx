import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import BookingRequestPage from "@/components/booking-request-page";
import ContentPageView from "@/components/content-page";
import LocationsDirectory from "@/components/locations-directory";
import TeamDirectory from "@/components/team-directory";
import { pages, SITE_URL } from "@/lib/site-data";

type RouteParams = { slug: string };

const extraRoutes = [
  "online-booking-request",
  "meet-our-team",
  "our-locations",
  "blog",
  "book",
  "bookings-referrals",
  "how-to-book",
  "training-request-form",
];

export function generateStaticParams(): RouteParams[] {
  return [...new Set([...Object.keys(pages), ...extraRoutes])].map((slug) => ({ slug }));
}

function getPage(slug: string) {
  if (slug === "blog") return pages.blogs;
  if (slug === "book" || slug === "bookings-referrals" || slug === "how-to-book") {
    return pages["how-to-book-an-appointment-with-access-psych"];
  }
  return pages[slug];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "online-booking-request") {
    return {
      title: "Bookings & Referrals",
      description: "Make a booking or referral request with Access Psych.",
      openGraph: {
        title: "Bookings & Referrals | Access Psych",
        description: "Make a booking or referral request with Access Psych.",
        url: `/${slug}`,
      },
    };
  }
  const page = getPage(slug);
  if (!page) return { title: "Page not found" };
  const image = page.image ?? `${SITE_URL}/wp-content/uploads/2022/06/Homepage_1.jpg`;
  return {
    title: page.title,
    description: page.intro,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      type: "website",
      title: `${page.title} | Access Psych`,
      description: page.intro,
      url: `/${slug}`,
      images: [{ url: image, alt: page.imageAlt ?? page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} | Access Psych`,
      description: page.intro,
      images: [image],
    },
  };
}

export default async function InnerPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;

  if (slug === "bookings-referrals") redirect("/how-to-book-an-appointment-with-access-psych");
  if (slug === "book") redirect("/how-to-book-an-appointment-with-access-psych");
  if (slug === "how-to-book") redirect("/how-to-book-an-appointment-with-access-psych");
  if (slug === "training-request-form") redirect("/online-booking-request");
  if (slug === "online-booking-request") return <BookingRequestPage />;
  if (slug === "meet-our-team") {
    const page = pages["meet-our-team"];
    return <><ContentPageView page={page} slug={slug} /><TeamDirectory /></>;
  }

  const page = getPage(slug);
  if (!page) notFound();

  return (
    <>
      <ContentPageView page={page} showCta={slug !== "our-locations"} slug={slug} />
      {slug === "our-locations" && (
        <>
          <LocationsDirectory />
          {page.cta && <section className="page-cta"><div className="section-container page-cta-inner"><div><h2>Make a booking or referral.</h2></div><a className="button button-dark" href={page.cta.href}>Contact our team <span aria-hidden="true">↗</span></a></div></section>}
        </>
      )}
    </>
  );
}
