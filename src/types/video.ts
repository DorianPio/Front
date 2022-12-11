export type Video = {
  id: number;
  name: string;
  vignette: string;
  link: string;
  desc: string;
  viewed: boolean;
};
export type VideoQuizz = {
  id: string;
  name: string;
  vignette: string;
  link: string;
  desc: string;
  viewed: boolean;
  quizz: Quizz[];
};

export type Quizz = {
  id_quizz: string;
  question: string;
  responses: Responses[];
  correction: string[]; //hash
};

export type Responses = {
  title: string;
  checked: boolean;
};

export type BadAnswer = {
  question: string;
  answerGiven: string;
  answerCorrect: string;
};

export type Answer = {
  question: number;
  answers: boolean[];
};
