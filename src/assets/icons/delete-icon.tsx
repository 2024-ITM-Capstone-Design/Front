import React from "react";
type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};
function DeleteIcon({ width, height, color }: IconProps) {
  return (
    <svg
      width={width ? width : "13"}
      height={height ? height : "15"}
      viewBox="0 0 13 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.4375 15C1.99062 15 1.60821 14.8369 1.29025 14.5108C0.97175 14.1842 0.8125 13.7917 0.8125 13.3333V2.5H0V0.833333H4.0625V0H8.9375V0.833333H13V2.5H12.1875V13.3333C12.1875 13.7917 12.0285 14.1842 11.7106 14.5108C11.3921 14.8369 11.0094 15 10.5625 15H2.4375ZM10.5625 2.5H2.4375V13.3333H10.5625V2.5ZM4.0625 11.6667H5.6875V4.16667H4.0625V11.6667ZM7.3125 11.6667H8.9375V4.16667H7.3125V11.6667Z"
        fill={color ? color : "#F4B5FA"}
      />
    </svg>
  );
}

export default DeleteIcon;