type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};
function DownloadIcon({ width, height, color }: IconProps) {
  return (
    <svg
      width={width ? width : "17"}
      height={height ? height : "17"}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.3909 11.6875V14.875H2.06589V11.6875H0.0117188V14.875C0.0117188 16.0438 0.936094 17 2.06589 17H14.3909C15.5207 17 16.4451 16.0438 16.4451 14.875V11.6875H14.3909ZM13.3638 7.4375L11.9156 5.93937L9.25547 8.68062V0H7.2013V8.68062L4.54116 5.93937L3.09297 7.4375L8.22838 12.75L13.3638 7.4375Z"
        fill={color ? color : "white"}
      />
    </svg>
  );
}

export default DownloadIcon;
