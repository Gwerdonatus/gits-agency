// src/lib/metadata.ts
import type { Metadata } from "next";

const SITE_URL  = "https://gits.donatusgwer.workers.dev";
const SITE_NAME = "GITS";
const IMG_ROOT  = "/GITS_Complete_Image_Package";

interface PageMeta {
  title: string;
  description: string;
  path: string;
}

export function buildMetadata({ title, description, path }: PageMeta): Metadata {
  const canonical = `${SITE_URL}${path}`;
  const image     = `${IMG_ROOT}/social/og-image.png`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website", url: canonical, siteName: SITE_NAME,
      title: `${title} — ${SITE_NAME}`, description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${SITE_NAME}`, description,
      images: { url: image, alt: title },
    },
  };
}