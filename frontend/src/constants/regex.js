/**
 * Collection of regular expressions used for client-side form validation.
 * - `password`: Minimum 8 characters, including uppercase, lowercase, number, and special character.
 */

export const REGEX = {
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
};
