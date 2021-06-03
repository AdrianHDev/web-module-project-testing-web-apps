import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  let contactNode = render(<ContactForm />);
  const header = contactNode.getByText(/Contact Form/i);
  expect(header).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  let contactNode = render(<ContactForm />);
  let userField = contactNode.getByLabelText(/First Name\*/i);
  let submitButton = contactNode.getByTestId(/submitTest/i);
  await (() => {
    userEvent.type(userField, "Yes");
    userEvent.click(submitButton);
  })();
  let errorMsg = contactNode.getByText(/must have at least 5 characters/i);
  expect(errorMsg);
  // console.log(userField);
});

test("renders THREE error messages if user enters no values into any fields.", async () => {});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {});

test("renders all fields text when all fields are submitted.", async () => {});
