import { formatDate } from "@/utils/date-mapper";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DateTimer = ({ dateString, options, ...rest }: any) => {
  return (
    <time dateTime={dateString} {...rest}>
      {formatDate(dateString, options)}
    </time>
  );
};
