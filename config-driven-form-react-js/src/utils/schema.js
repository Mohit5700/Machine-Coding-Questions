import * as yup from "yup";

export const schema = [
  {
    component: "TEXT_FIELD", // Used by FormField switchboard to match a component
    name: "name", // The unique key where this value is stored in state
    label: "Your Name", // Visual label shown to the user
    isRequired: true, // Flag to display visual indicators (like red asterisks)
    validate: yup.string().required("Name is required"), // Individual field rule
    type: "text", // HTML standard input attribute
  },
  {
    component: "TEXT_FIELD",
    name: "email",
    label: "Your Email",
    isRequired: true,
    validate: yup
      .string()
      .email("Invalid email address")
      .required("Name is required"),
    type: "email",
  },
  {
    component: "TEXT_FIELD",
    name: "password",
    label: "Password",
    isRequired: true,
    validate: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    type: "password",
  },
  {
    component: "TEXT_FIELD",
    name: "confirmPassword",
    label: "Confirm Password",
    isRequired: true,
    // yup.ref("password") creates a dynamic link checking if this value matches the password field
    validate: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    type: "password",
  },
  {
    component: "RADIO_BUTTON",
    name: "gender",
    label: "Gender",
    isRequired: true,
    options: ["Male", "Female", "Other"], // Custom configuration metadata for rendering multiple items
    validate: yup.string().required("Selecting a gender is required"),
  },
  {
    component: "DATE_PICKER",
    name: "birthdata",
    label: "Date of Birth",
    validate: yup.date(), // Fallback parsing validation rule without custom messaging
  },
  {
    component: "SLIDER",
    name: "rating",
    label: "Rating",
    minValue: 1,
    maxValue: 5,
    validate: yup
      .number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be no more than 5"),
  },
  {
    component: "CHECKBOX",
    name: "accept-terms",
    label: "I accept the terms and conditions",
    isRequired: true,
    validate: yup
      .bool()
      .oneOf([true], "You must accept the terms and conditions")
      .required("Please accept the terms"),
  },
];
