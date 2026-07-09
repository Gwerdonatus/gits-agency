import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "./files/Inter-400.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

export const playfair = localFont({
  src: [
    {
      path: "./files/PlayfairDisplay-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  preload: true,
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const greatVibes = localFont({
  src: [
    {
      path: "./files/GreatVibes-400.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  preload: true,
  fallback: ["cursive"],
});
