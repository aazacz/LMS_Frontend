import React, { useState } from "react";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { MdVisibility } from "react-icons/md";

const usePasswordToggle = () => {
  const [visible, setVisibility] = useState(false);

  const Icon = visible ? (
    <MdVisibility
      className="cursor-pointer bg-transparent text-blue-900"
      onClick={() => setVisibility(!visible)}
    />
  ) : (
    <MdOutlineVisibilityOff
      className="cursor-pointer bg-transparent "
      onClick={() => setVisibility(!visible)}
    />
  );
  const inputType = visible ? "text" : "password";

  return [inputType, Icon];
};

export default usePasswordToggle;
