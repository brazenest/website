import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";

const baseUrl = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:5174";
const executablePath =
  process.env.PLAYWRIGHT_CHROMIUM_PATH ?? "/snap/bin/chromium";
const outputDir = process.env.PLAYWRIGHT_OUTPUT_DIR ?? "artifacts/visual-smoke";

const routes = [
  "/",
  "/about/",
  "/work/",
  "/packages/",
  "/contact/",
  "/engineering/",
  "/production/",
  "/engineering/projects/timeshare-search-rentals/",
  "/production/projects/bellagio-fountain-film/",
];

const viewports = [
  { name: "414x896", width: 414, height: 896 },
  { name: "390x844", width: 390, height: 844 },
  { name: "393x852", width: 393, height: 852 },
  { name: "375x812", width: 375, height: 812 },
  { name: "402x874", width: 402, height: 874 },
  { name: "384x832", width: 384, height: 832 },
  { name: "1920x1080", width: 1920, height: 1080 },
  { name: "1536x864", width: 1536, height: 864 },
  { name: "1280x1200", width: 1280, height: 1200 },
  { name: "1366x768", width: 1366, height: 768 },
  { name: "800x600", width: 800, height: 600 },
  { name: "1280x720", width: 1280, height: 720 },
];

async function triggerScrollDependentContent(page) {
  await page.evaluate(async () => {
    const delay = (duration) =>
      new Promise((resolve) => window.setTimeout(resolve, duration));
    const distance = Math.max(window.innerHeight * 0.8, 400);

    for (
      let position = 0;
      position < document.documentElement.scrollHeight;
      position += distance
    ) {
      window.scrollTo(0, position);
      await delay(90);
    }

    window.scrollTo(0, document.documentElement.scrollHeight);
    await delay(140);
    window.scrollTo(0, 0);
    await delay(140);
  });
}

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  executablePath,
  headless: true,
});

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
    });

    const page = await context.newPage();

    for (const route of routes) {
      const url = new URL(route, baseUrl).toString();
      const response = await page.goto(url, { waitUntil: "networkidle" });

      if (!response?.ok()) {
        throw new Error(
          `${url} returned ${response?.status() ?? "no response"}`,
        );
      }

      await triggerScrollDependentContent(page);

      const overflow = await page.evaluate(() => {
        const documentWidth = document.documentElement.scrollWidth;
        const viewportWidth = window.innerWidth;
        const overflowingElements = [...document.body.querySelectorAll("*")]
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              tag: element.tagName.toLowerCase(),
              id: element.id,
              className:
                typeof element.className === "string" ? element.className : "",
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
            };
          })
          .filter((element) => element.right > viewportWidth + 1)
          .slice(0, 5);

        return {
          documentWidth,
          viewportWidth,
          overflowingElements,
        };
      });

      if (overflow.documentWidth > overflow.viewportWidth + 1) {
        throw new Error(
          `${url} overflows ${viewport.name}: ${overflow.documentWidth}px document width for ${overflow.viewportWidth}px viewport. ${JSON.stringify(
            overflow.overflowingElements,
          )}`,
        );
      }

      const slug =
        route === "/"
          ? "home"
          : route.replaceAll("/", "-").replace(/^-|-$/g, "");
      const path = `${outputDir}/${viewport.name}-${slug}.png`;
      await page.screenshot({ path, fullPage: true });
      console.log(`${response.status()} ${viewport.name} ${url} -> ${path}`);
    }

    await context.close();
  }
} finally {
  await browser.close();
}
