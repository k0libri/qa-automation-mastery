import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  timeout: 30_000,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  projects: [
    {
      name: "ui",
      testDir: "./tests/ui/specs",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://practicesoftwaretesting.com",
      },
    },
    {
      name: "api",
      testDir: "./tests/api/specs",
      use: {
        baseURL: "https://api.practicesoftwaretesting.com",
      },
    },
  ],
});
