import React from "react";
import styled from '@emotion/styled';
import classNames from "classnames";

// Create a styled component with the desired styles
const TitleWrapper = styled('div')({
  fontFamily: "Poppins",
  fontStyle: "normal",
});

const Title = ({
  title,
  secondTitle,
  fontSize,
  fontWeight,
  color,
  className,
  opacity
}) => {
  // Use TitleWrapper component instead of makeStyles
  return (
    <TitleWrapper
      className={classNames(className)} // Use classNames directly
      style={{
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color,
        opacity
      }}
    >
      <span style={{ fontWeight: "bold" }}>{secondTitle}</span>&nbsp;
      {title}
    </TitleWrapper>
  );
};

export default Title;
