import { useQuery } from "@tanstack/react-query";

const useTeacherSets = () => {
  return useQuery({
    queryKey: ["teacherSetNew"],
    queryFn: async () => {
      // immitate for now
      await new Promise((resolve) => setTimeout(resolve, 100));

      return [
        {
          name: "ЕГКР 2025",
          videoWalkthroughLink: "https://www.youtube.com/watch?v=8Jb5V5HtA2M",
          complexity: "medium",
          date: "04.07.2025",
        },
        {
          name: "Дальний восток 2025",
          videoWalkthroughLink: "",
          complexity: "easy",
          date: "02.07.2025",
        },
        {
          name: "Досрок 2025",
          videoWalkthroughLink: "https://www.youtube.com/watch?v=12345678910",
          complexity: "hard",
          date: "01.07.2025",
        },
        {
          name: "ЕГКР 2024",
          videoWalkthroughLink: "https://www.youtube.com/watch?v=8Jb5V5HtA2M",
          complexity: "medium",
          date: "04.07.2024",
        },
        {
          name: "Дальний восток 2024",
          videoWalkthroughLink: "",
          complexity: "easy",
          date: "02.07.2024",
        },
        {
          name: "Досрок 2024",
          videoWalkthroughLink: "https://www.youtube.com/watch?v=12345678910",
          complexity: "hard",
          date: "01.07.2024",
        },
        {
          name: "ЕГКР 2023",
          videoWalkthroughLink: "https://www.youtube.com/watch?v=8Jb5V5HtA2M",
          complexity: "medium",
          date: "04.07.2023",
        },
        {
          name: "Дальний восток 2023",
          videoWalkthroughLink: "",
          complexity: "easy",
          date: "02.07.2023",
        },
        {
          name: "Досрок 2023",
          videoWalkthroughLink: "https://www.youtube.com/watch?v=12345678910",
          complexity: "hard",
          date: "01.07.2023",
        },
      ];
    },
  });

};

export default useTeacherSets;
