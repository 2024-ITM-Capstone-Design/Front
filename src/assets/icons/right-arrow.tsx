import React from "react";

type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

const RightArrowIcon = ({ width, height, color }: IconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.53125 4.15625L11.5938 7M11.5938 7L8.53125 9.84375M11.5938 7H2.40625"
      stroke={color}
      stroke-opacity="0.6"
      stroke-width="1.3125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default RightArrowIcon;
