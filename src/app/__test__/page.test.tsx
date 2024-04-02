import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../page";

test("Home", async () => {
  const homejsx = await Home();
  render(homejsx);
  expect(
    screen.getByRole("heading", { level: 3, name: "Pokedex" })
  ).toBeDefined();
});
