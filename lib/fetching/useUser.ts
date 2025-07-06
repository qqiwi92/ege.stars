import { useQuery } from "@tanstack/react-query";
import type { GitHubUser } from "../types/User";
const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("https://api.github.com/users/qqiwi92");
      return (await res.json()) as GitHubUser;
    },
  });
};
export default useUser;
