import { formatDate } from "@/utils/date-mapper";

export const DateTimer = ({ dateString, options, ...rest }: any) => {
  return (
    <time dateTime={dateString} {...rest}>
      {formatDate(dateString, options)}
    </time>
  );
};
