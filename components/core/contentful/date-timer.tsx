import { formatDate } from "@/utils/date-mapper";

const DateTimer = ({ dateString, options, ...rest }: any) => {
  return (
    <time dateTime={dateString} {...rest}>
      {formatDate(dateString, options)}
    </time>
  );
};

export default DateTimer;
