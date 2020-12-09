import React from "react";
import Episodes from "../components/Episodes";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { testEpisodes } from "../api/testEpisodes";

test("episodes renders ", () => {
  render(<Episodes episodes={null}/>);
  expect(screen.findByText(/\bFetching data...\b/i));
});
test("Episodes renders episode cards equal to the length of the array passed in on props object", async () => {
  const { rerender, getByText } = render(<Episodes episodes={null} />);

  expect(screen.queryByText(/episodes-number/i)).toBeNull();

  await rerender(<Episodes episodes={testEpisodes} />);

  expect(await screen.getAllByText(/\bseason \b[1-4]/i)).toHaveLength(4);
});
