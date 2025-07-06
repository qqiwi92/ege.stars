import { useQuery } from "@tanstack/react-query";

const useCheatSheet = ({
  excersiceID,
  courseName,
}: {
  excersiceID: string;
  courseName: string;
}) => {
  return useQuery({
    queryKey: ["cheatSheet", excersiceID, courseName],
    queryFn: async () => {
      // immitate for now
      await new Promise((resolve) => setTimeout(resolve, 100)) 
      return [
        {
          id: "1",
          title: "Теория по стериометрии",
          estTimeInMin: 3,
          haveNotSeen: false,
        },
        {
          id: "2",
          title: "Практика",
          estTimeInMin: 6,
          haveNotSeen: true,
        },
        {
          id: "3",
          title: "ДЗ",
          estTimeInMin: 30,
          haveNotSeen: true,
        },
        {
          id: "4",
          title: "Повторение",
          estTimeInMin: 5,
          haveNotSeen: false,
        },
      ];
    },
  });

};

export default useCheatSheet;
