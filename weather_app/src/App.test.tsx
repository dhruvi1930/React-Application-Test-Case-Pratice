import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// render application title
test("renders title weather app", () => {
  render(<App />);
  const linkElement = screen.getByText(/weather app/i);
  expect(linkElement).toBeInTheDocument();
});
