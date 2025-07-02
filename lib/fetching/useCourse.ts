const useCourse = ({ course_id }: { course_id: string }) => {
  return {
    name: "Математика",
    first_part: [1, 12],
    sets: [
      {
        name: "Джентлеменский набор",
        max_points: 76,
        numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16],
      },
      {
        name: "Джентлеменский набор plus",
        max_points: 76,
        numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 18, 19],
      },
    ],
  };
};

export default useCourse;
