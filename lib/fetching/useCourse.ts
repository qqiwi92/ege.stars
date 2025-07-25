import { useQuery } from "@tanstack/react-query";
import { Course } from "../types/Course";

const useCourse = ({ course_id }: { course_id: string }) => {
  return useQuery<Course>({
    queryKey: ["course", course_id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return {
        name: "Математика",
        excercises: [
          { id: "1", title: "Планиметрия" },
          { id: "2", title: "Векторы" },
          { id: "3", title: "Стереометрия" },
          { id: "4", title: "Вероятность (базовый уровень)" },
          { id: "5", title: "Вероятность (повышенный уровень)" },
          { id: "6", title: "Уравнения" },
          { id: "7", title: "Выражения" },
          { id: "8", title: "Графики функций (базовый уровень)" },
          { id: "9", title: "Прикладная задача" },
          { id: "10", title: "Текстовая задача (движение, проценты)" },
          { id: "11", title: "Графики функций (повышенный уровень)" },
          { id: "12", title: "Анализ функций" },
          { id: "13", title: "Уравнения и неравенства (2 балла)" },
          { id: "14", title: "Стереометрия (3 балла)" },
          { id: "15", title: "Неравенства (2 балла)" },
          { id: "16", title: "Экономическая задача (2 балла)" },
          { id: "17", title: "Планиметрия (3 балла)" },
          { id: "18", title: "Задача с параметром (4 балла)" },
          { id: "19", title: "Олимпиадная задача / целые числа (4 балла)" },
        ],
        first_part: [1, 12],
        sets: [
          {
            name: "Все",
            max_points: 100,
            numbers: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 18, 19,
            ],
          },
          {
            name: "Джентлеменский набор",
            max_points: 76,
            numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16],
          },
          {
            name: "Джентлеменский набор plus",
            max_points: 76,
            numbers: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 18, 19,
            ],
          },
          {
            name: "Только первая часть",
            max_points: 52,
            numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          },
          {
            name: "Только вторая часть",
            max_points: 24,
            numbers: [13, 15, 16, 18, 19],
          },
        ],
      };
    },
  });
};

export default useCourse;
