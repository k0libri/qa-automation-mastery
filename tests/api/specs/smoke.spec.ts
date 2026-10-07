import { test, expect } from "@playwright/test";

test("GET /products returns 200", async ({ request }) => {
  const response = await request.get("/products");
  expect(response.status()).toBe(200);
});
