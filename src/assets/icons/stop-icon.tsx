import React from "react";
type IconProps = {
  width?: number;
  height?: number;
};
function StopIcon({ width, height }: IconProps) {
  return (
    <div>
      <svg
        width={width ? width : "9"}
        height={height ? height : "11"}
        viewBox="0 0 9 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 11H3V0H0V11ZM6 0V11H9V0H6Z" fill="white" />
      </svg>
    </div>
  );
}

export default StopIcon;
