import { render, screen, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import Detail from "../detail";

import { vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

test("Detail", async () => {
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

  // const homejsx = Detail({ params: { slug: "bob" } });
  render(<Detail params={{ slug: "bob" }} />);

  // await waitFor(() => {
  //   expect(screen.getByText("Loading...")).not.toBeDefined();
  // });

  await waitFor(() => {
    expect(screen.getByText("myability")).toBeDefined();
  });
});
