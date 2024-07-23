import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("renders title weather app", () => {
  render(<App />);
  const linkElement = screen.getByText(/weather app/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders input field and button", () => {
  render(<App />);
  screen.getByPlaceholderText("Enter City");
  screen.getByRole("button");
});

test("user can enter city name and print weather", async () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText("Enter City");
  const buttonElement = screen.getByRole("button");

  await userEvent.type(inputElement, "Surat");
  expect(inputElement).toHaveValue("Surat");

  await userEvent.click(buttonElement);

  // Wait for the weather data to be displayed
  await waitFor(() => {
    screen.getByText(/Weather: 27.99/i); // 300K to Celsius
    screen.getByText(/Speed: 4.63/i);
    screen.getByText(/Humidity: 89/i);
  });

  expect(inputElement).toHaveValue("");
});
