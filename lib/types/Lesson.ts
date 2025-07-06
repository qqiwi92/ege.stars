export type TheoryLesson = {
  type: "theory";
  title: string;
  content: {
    type: string;
    content: string;
  }[];
};
export type PracticeLesson = {
  type: "practice";
  title: string;
  content: { content: string; answer: string }[];
};
export type TestLesson = {
  type: "test";
  title: string;
  content: { content: string; answer: string }[];
};
export type Lesson = PracticeLesson | TheoryLesson | TestLesson;
