import { test, expect } from "@playwright/test";

const SECTIONS = ["about", "skills", "work", "contact"] as const;

test("no console errors and no horizontal overflow", async ({ page }, info) => {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(e.message));

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const { scrollWidth, innerWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  expect(scrollWidth, `[${info.project.name}] horizontal overflow`).toBeLessThanOrEqual(
    innerWidth + 1,
  );

  expect(errors, `[${info.project.name}] console errors`).toEqual([]);
});

test("all sections render (works without animation)", async ({ browser }) => {
  // Reduced-motion path: content must be fully present with animation off.
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "What I do" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Selected projects" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Get in touch" })).toBeVisible();
  await ctx.close();
});

test("filmstrip capture", async ({ page }, info) => {
  const p = info.project.name;
  const dir = "verify-shots";
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${dir}/${p}-00-hero.png` });

  for (const id of SECTIONS) {
    await page.evaluate((sel) => {
      document.getElementById(sel)?.scrollIntoView({ block: "start" });
    }, id);
    // let the scroll settle + reveals fire + parallax update
    await page.waitForTimeout(1100);
    await page.screenshot({ path: `${dir}/${p}-${id}.png` });
  }
});
