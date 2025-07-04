import { useQuery } from "@tanstack/react-query";

const useCheatSheet = ({
  excersiceID,
  courseName,
}: {
  excersiceID: string;
  courseName: string;
}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["cheatSheet", excersiceID, courseName],
    queryFn: () => {
      // immitate for now
      return [
        {
          title: "Теория по стериометрии",
          estTimeInMin: 3,
          haveNotSeen: false,
        },
        {
          title: "Практика",
          estTimeInMin: 6,
          haveNotSeen: true,
        },
        {
          title: "ДЗ",
          estTimeInMin: 30,
          haveNotSeen: true,
        },
        {
          title: "Повторение",
          estTimeInMin: 5,
          haveNotSeen: false,
        },
      ];
    },
  });

  return { data, error, isLoading };
};

export default useCheatSheet;

