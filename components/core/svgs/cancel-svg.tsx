interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export function CancelSvg({ className, style }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1"
      stroke="#374151"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="m7 7 10 10m0-10L7 17" />
    </svg>
  );
}
