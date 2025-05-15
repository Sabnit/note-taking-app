import clsx from "clsx";
import React from "react";
import { Plus } from "lucide-react";

import IconButton from "../../atoms/IconButton";

/**
 * Toggles(open/close) the AddNote model
 * @param {object} props
 * @param {'nav' | 'normal'} [props.variant] - Visual style of the button
 * @param {function} [props.onClick] - Click handler function, triggered when the button is clicked.
 */
const AddNoteButton = ({ variant = "normal", onClick }) => {
  const baseStyles = "py-2 text-red-400 font-medium hover:text-red-600";

  const variants = {
    nav: "px-4 mt-4 w-full",
    normal: "px-0 w-fit",
  };

  const buttonStyles = clsx(baseStyles, variants[variant]);

  return (
    <IconButton variant="iconText" className={buttonStyles} onClick={onClick}>
      <Plus size={20} />
      Add note
    </IconButton>
  );
};

export default AddNoteButton;
