import React from "react";
import { render, screen, within } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

// Test case to verify that the title is rendered correctly
test("renders the title 'Book Library'", () => {
  render(<App />);
  screen.getByText("Book Library");
});

// Test case to check initial book entries are displayed
test("displays initial books with title, author, and published year", () => {
  render(<App />);
  screen.getByText("Atomic Habits by James Clear (2018)");
  screen.getByText("Blue Mountain by David Brooks (2020)");
});

// Test case to verify input fields are rendered and can be typed into
test("renders input fields for title, author, and published year and allows typing", async () => {
  render(<App />);
  const titleInput = screen.getByLabelText("Title:");
  const authorInput = screen.getByLabelText("Author:");
  const yearInput = screen.getByLabelText("Published Year:");

  expect(titleInput).toHaveValue("");
  expect(authorInput).toHaveValue("");
  expect(yearInput).toHaveValue("");

  await userEvent.type(titleInput, "New Book Title");
  await userEvent.type(authorInput, "New Book Author");
  await userEvent.type(yearInput, "2024");

  expect(titleInput).toHaveValue("New Book Title");
  expect(authorInput).toHaveValue("New Book Author");
  expect(yearInput).toHaveValue("2024");
});

// Test case to verify new book is added to the list and input fields are cleared
test("adds a new book to the list and clears the input fields", async () => {
  render(<App />);
  const titleInput = screen.getByLabelText("Title:");
  const authorInput = screen.getByLabelText("Author:");
  const yearInput = screen.getByLabelText("Published Year:");

  await userEvent.type(titleInput, "New Book Title");
  await userEvent.type(authorInput, "New Book Author");
  await userEvent.type(yearInput, "2024");

  const buttonElement = screen.getByRole("button", { name: "Submit" });
  await userEvent.click(buttonElement);

  // eslint-disable-next-line testing-library/no-node-access
  const bookListElement = document.getElementById("book-list");

  if (!bookListElement) {
    throw new Error('The element with id "book-list" was not found');
  }
  within(bookListElement).getByText("New Book Title by New Book Author (2024)");

  expect(titleInput).toHaveValue("");
  expect(authorInput).toHaveValue("");
  expect(yearInput).toHaveValue("");
});

// Test case to verify clicking on a book removes it from the list
test("removes a book from the list when clicked", async () => {
  render(<App />);
  const titleInput = screen.getByLabelText("Title:");
  const authorInput = screen.getByLabelText("Author:");
  const yearInput = screen.getByLabelText("Published Year:");

  await userEvent.type(titleInput, "Book to Remove");
  await userEvent.type(authorInput, "Author");
  await userEvent.type(yearInput, "2024");

  const buttonElement = screen.getByRole("button", { name: "Submit" });
  await userEvent.click(buttonElement);

  const bookToRemove = screen.getByText("Book to Remove by Author (2024)");
  await userEvent.click(bookToRemove);

  expect(
    screen.queryByText("Book to Remove by Author (2024)")
  ).not.toBeInTheDocument();
});

// Test case to verify button is enabled/disabled based on input field values
test("submit button is enabled when all input fields have text", async () => {
  render(<App />);
  const titleInput = screen.getByLabelText("Title:");
  const authorInput = screen.getByLabelText("Author:");
  const yearInput = screen.getByLabelText("Published Year:");
  const buttonElement = screen.getByRole("button", { name: "Submit" });

  expect(buttonElement).toBeDisabled(); // Initially disabled

  await userEvent.type(titleInput, "Test Book");
  await userEvent.type(authorInput, "Test Author");
  await userEvent.type(yearInput, "2024");
  expect(buttonElement).toBeEnabled(); // Enabled after typing

  await userEvent.click(buttonElement);

  expect(buttonElement).toBeDisabled(); // Disabled again after clearing
});
