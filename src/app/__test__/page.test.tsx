import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Home from "../page";

import { vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

test("Home", async () => {
  fetchMocker.mockResponse(
    JSON.stringify({ results: [{ name: "bob", url: "http://example.com" }] })
  );

  const homejsx = await Home();
  render(homejsx);
  expect(screen.getByRole("link", { name: "bob" })).toBeDefined();
});
