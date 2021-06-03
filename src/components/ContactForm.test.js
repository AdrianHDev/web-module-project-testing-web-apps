import React from "react";
import {
  getAllByTestId,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
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
  let firstnameField = contactNode.getByLabelText(/First Name\*/i);
  let submitButton = contactNode.getByTestId(/submitTest/i);
  userEvent.type(firstnameField, "Yes");
  userEvent.click(submitButton);
  let error = await contactNode.getByText(/must have at least 5 characters/i);
  expect(error);
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  let contactNode = render(<ContactForm />);
  let submitButton = contactNode.getByTestId(/submitTest/i);
  userEvent.click(submitButton);
  let errors = await contactNode.findAllByTestId("error");
  expect(errors.length === 3);
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  let contactNode = render(<ContactForm />);
  let firstnameField = contactNode.getByLabelText(/First Name\*/i);
  let lastnameField = contactNode.getByLabelText(/Last Name\*/);
  let submitButton = contactNode.getByTestId(/submitTest/i);
  userEvent.type(firstnameField, "Taheel");
  userEvent.type(lastnameField, "Remaarwa");
  userEvent.click(submitButton);
  let errors = await contactNode.findAllByTestId("error");
  expect(errors.length === 1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  let contactNode = render(<ContactForm />);
  let emailField = contactNode.getByLabelText(/Email\*/i);
  let submitButton = contactNode.getByTestId(/submitTest/i);
  userEvent.type(emailField, "fainfianfia");
  userEvent.click(submitButton);
  let error = await contactNode.findByText(
    /email must be a valid email address/i
  );
  expect(error);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  let contactNode = render(<ContactForm />);
  let submitButton = contactNode.getByTestId(/submitTest/i);
  userEvent.click(submitButton);
  let error = await contactNode.findByText(/lastName is a required field/i);
  expect(error);
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  let contactNode = render(<ContactForm />);
  /* Get Form Fields */

  let firstnameField = contactNode.getByLabelText(/First Name\*/i);
  let lastnameField = contactNode.getByLabelText(/Last Name\*/);
  let emailField = contactNode.getByLabelText(/Email\*/)
  let submitButton = contactNode.getByTestId(/submitTest/i);
  /* Fill out Form */

  userEvent.type(firstnameField, "Taheel");
  userEvent.type(lastnameField, "Remaarwa");
  userEvent.type(emailField, 'test@test.com')
  
  /* Submit form */
  userEvent.click(submitButton);

  /* Verify there are no errors */
  let errors = contactNode.queryAllByTestId("error");
  expect(errors === null);

  /* Verify form inputs are now rendered */
  contactNode.getByText('Taheel');
  contactNode.getByText('Remaarwa')
  contactNode.getByText('test@test.com')
});

test("renders all fields text when all fields are submitted.", async () => {
  let contactNode = render(<ContactForm />);
  /* Get Form Fields */

  let firstnameField = contactNode.getByLabelText(/First Name\*/i);
  let lastnameField = contactNode.getByLabelText(/Last Name\*/);
  let emailField = contactNode.getByLabelText(/Email\*/)
  let messageField = contactNode.getByLabelText(/Message/i)
  let submitButton = contactNode.getByTestId(/submitTest/i);
  /* Fill out Form */

  userEvent.type(firstnameField, "Taheel");
  userEvent.type(lastnameField, "Remaarwa");
  userEvent.type(emailField, 'test@test.com')
  userEvent.type(messageField, 'LAWOALTOAJWTLAKTWAKTLK')
  
  /* Submit form */
  userEvent.click(submitButton);

  /* Verify form inputs are now rendered */
  contactNode.getByTestId('firstnameDisplay');
  contactNode.getByTestId('lastnameDisplay')
  contactNode.getByTestId('emailDisplay')
  contactNode.getByTestId('messageDisplay')
});
