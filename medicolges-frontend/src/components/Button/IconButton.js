import { Button } from "@mui/material";
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
      <Button
        disabled={disabled}
        color={color}
        type={type}
        className={className}
        startIcon={startIcon}
        endIcon={endIcon}
        style={{
          fontFamily: "Work Sans",
          fontStyle: "normal",
          textTransform: "none",
          ...style,
        }}
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  );
};
export default IconButton;