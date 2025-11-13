// --- ./components/UserInfo.jsx (The component using the utility) ---

import { User } from "@/types/access-control";
import { FormatUtils } from "@/utils/formatters"; // External dependency

export function UserInfo({ user }: { user: User }) {
  // Use the function
  const formattedDate = user.assignedAt
    ? FormatUtils.formatDate(user.assignedAt)
    : "";
  const formattedName =
    user.fio && user.email ? FormatUtils.formatName(user.fio, user.email) : "";

  return (
    <div>
      <h2>{formattedName}</h2>
      <p>Joined: {formattedDate}</p>
    </div>
  );
}
