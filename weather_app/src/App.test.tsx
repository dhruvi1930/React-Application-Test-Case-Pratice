import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

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

// user can enter city name and print weather
test("render api call function", async () => {
  render(<App />);
  const inputElement: HTMLInputElement =
    screen.getByPlaceholderText("Enter City");
  const buttonElement: HTMLButtonElement = screen.getByRole("button");

  await userEvent.type(inputElement, "Waterloo");
  expect(inputElement).toHaveValue("Waterloo");

  await userEvent.click(buttonElement);
  expect(inputElement).toHaveValue("");
  screen.getByText("Weather");
});
