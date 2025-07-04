import { useQuery } from "@tanstack/react-query";

const useTeacherSets = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["teacherSetNew"],
    queryFn: () => {
      // immitate for now
      return [
        {
          name: "ЕГКР 2025",
          videoWalkthroughLink: "https://www.youtube.com/watch?v=8Jb5V5HtA2M",
          complexity: "medium",
          date: "04.07.2025",
        },
        {
          name: "Дальний восток",
          videoWalkthroughLink: "",
          complexity: "easy",
          date: "02.07.2025",
        },
        {
          name: "Досрок",
          videoWalkthroughLink: "https://www.youtube.com/watch?v=12345678910",
          complexity: "hard",
          date: "01.07.2025",
        },
      ];
    },
  });

  return { data, error, isLoading };
};

export default useTeacherSets;
