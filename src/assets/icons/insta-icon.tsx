type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};
function InstaIcon({ width, height, color }: IconProps) {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5441 1H9.25352C4.69361 1 0.99707 4.74383 0.99707 9.36208V15.7332C0.99707 20.3514 4.69361 24.0953 9.25352 24.0953H15.5441C20.1041 24.0953 23.8006 20.3514 23.8006 15.7332V9.36208C23.8006 4.74383 20.1041 1 15.5441 1Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M12.3982 17.7228C15.221 17.7228 17.5093 15.4052 17.5093 12.5463C17.5093 9.68735 15.221 7.36975 12.3982 7.36975C9.57543 7.36975 7.28711 9.68735 7.28711 12.5463C7.28711 15.4052 9.57543 17.7228 12.3982 17.7228Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default InstaIcon;
