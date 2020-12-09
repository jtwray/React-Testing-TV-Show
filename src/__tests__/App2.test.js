import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { FetchMock } from "@react-mock/fetch";
import App from "../App";
import { fetchShow } from "../api/fetchShow";
import { episodeData } from "../api/testEpisodes";
// Hoist helper functions (but not vars) to reuse between test cases
const renderComponent = (episodeData) =>
  render(
    <FetchMock
      mocks={[
        {
          matcher:
            "https://api.tvmaze.com/singlesearch/shows?q=stranger-things&embed=episodes",
          method: "GET",
          response: { episodeData },
        },
      ]}
    >
      <App />
    </FetchMock>
  );

it("renders poster Title and dropdown", async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText, rerender } = renderComponent(episodeData);

  // It takes time for the counter to appear because
  // the GET request has a slight delay
  await expect(screen.getByText(/\bFetching data\b/i));
  await rerender(<App />);
  await expect(screen.getByText(/\bStranger Things\b/i));
});

it("4 dropdown Options load when click the button select episode", async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = await renderComponent({ episodeData });

  // It takes time for the button to appear because
  // the GET request has a slight delay
  await expect(screen.getByText(/\bselect episode\b/i));

  await fireEvent.click(getByText(/\bselect episode\b/i));
  await expect(screen.getAllByText(/\bseason\b[1-4]/i)).toHaveLength(4);
});
