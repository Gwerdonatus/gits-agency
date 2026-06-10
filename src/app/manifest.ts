// src/app/manifest.ts
import type { MetadataRoute } from "next";

const IMG_ROOT = "/GITS_Complete_Image_Package";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GITS — Premium Digital Agency",
    short_name: "GITS",
    description: "GITS designs and engineers premium digital products — clarity · speed · quality.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    orientation: "portrait-primary",
    icons: [
      { src: `${IMG_ROOT}/pwa/android-chrome-192x192.png`, sizes: "192x192", type: "image/png" },
      { src: `${IMG_ROOT}/pwa/android-chrome-512x512.png`, sizes: "512x512", type: "image/png" },
      { src: `${IMG_ROOT}/pwa/maskable-icon-512x512.png`,  sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}