import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Pokemon from "../page";

import { vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

test("Home", async () => {
  fetchMocker.mockResponse(
    JSON.stringify({
      name: "bob",
      sprites: {
        front_default: "http://example.com",
      },
      height: 1,
      weight: 1,
      abilities: [
        {
          ability: {
            name: "myability",
          },
        },
      ],
    })
  );

  const homejsx = await Pokemon({ params: { slug: "bob" } });
  render(homejsx);
  expect(screen.getByText("myability")).toBeDefined();
});
