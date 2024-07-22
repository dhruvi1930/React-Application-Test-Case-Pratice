import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// render application title
test("renders title weather app", () => {
  render(<App />);
  const linkElement = screen.getByText(/weather app/i);
  expect(linkElement).toBeInTheDocument();
});

// input filed and button
test("render input filed and button", () => {
  render(<App />);
  screen.getByPlaceholderText("Enter City");
  screen.getByRole("button");
});
