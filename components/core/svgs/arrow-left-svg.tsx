interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export function ArrowLeftSvg({ className, style }: Props) {
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
      <path d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  );
}
