// import { Button } from "@mui/material";
import React from "react";

const IconButton = ({
  color,
  style,
  children,
  onClick,
  className,
  type,
  startIcon,
  endIcon,
  disabled,
}) => {
  return (
    <div className="flex">
      <button
        disabled={disabled}
        color={color}
        type={type}
        className={className}
        startIcon={startIcon}
        endIcon={endIcon}
        style={{
          fontFamily: "Poppins",
          fontStyle: "normal",
          textTransform: "none",
          ...style,
        }}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};
export default IconButton;
