interface Props {
  className?: string;
  style?: React.CSSProperties;
}

function LogoSvg({ className, style }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60.14 69.34"
      fill="#fff"
      className={className}
      style={style}
    >
      <path d="M60.14 17.34 30.07 0 0 17.34v34.67l30.07 17.33 30.07-17.33z" />
    </svg>
  );
}

export { LogoSvg };
