type IconProps = {
  width?: number;
  height?: number;
};

const DotIcon = ({ width, height }: IconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="4" cy="4" r="4" fill="#F7F7F7" />
  </svg>
);

export default DotIcon;
