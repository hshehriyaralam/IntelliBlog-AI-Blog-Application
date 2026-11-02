'use client'
import { User } from "lucide-react";
import { useAllUserQuery } from "../../Redux/Services/userApi"
import {liveRefetchOptions} from "../../hooks/rtkOptions"
import React, { useMemo } from "react";


const AuthorsFilter = React.memo(({ themeValue, light, dark, value, onChange }: any) => {
  const { data: allUsers, isLoading } = useAllUserQuery(undefined,liveRefetchOptions);
  const users = useMemo(() => allUsers?.data || [], [allUsers]);
  return (
    <div>
      <label
        className="mb-2 flex items-center gap-2 text-sm font-extrabold text-[var(--ink)]"
      >
        <User size={16} />
        Author
      </label>
      <select
  value={value || ""}
  onChange={(e) => onChange(e.target.value)}
  disabled={isLoading}
  className="min-h-12 w-full min-w-[230px] rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--white)] px-3 py-2 text-base text-[var(--ink)] outline-none focus:shadow-[4px_4px_0_var(--purple)] sm:w-[28%]"
>
  <option value="">All authors</option>
  {users.map((user: any, index: number) => (
    <option
      key={user?._id ?? `user-${index}`}
      value={String(user?.id ?? "")}
    >
      {user?.name || "Unknown"}
    </option>
  ))}
</select>
    </div>
  );
})

export default AuthorsFilter;
