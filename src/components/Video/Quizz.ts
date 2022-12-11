import { Quizz, VideoQuizz } from "../../types/video";

export const video: VideoQuizz = {
  id: "un id en somme",
  name: "",
  link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  vignette: "string",
  desc: "this is a video here",
  viewed: false,
  quizz: [
    {
      id_quizz: "id_du_quizz",
      question: "blablabla ?",
      responses: [
        { title: "lol", checked: false },
        { title: "lol", checked: false },
      ],
      correction: ["1"],
    },
    {
      id_quizz: "id_du_quizz",
      question: "blablabla ?222",
      responses: [
        { title: "lol222222222222222222222", checked: false },
        { title: "loooooool", checked: false },
      ],
      correction: ["1"],
    },
  ],
};

export const quizz: Quizz = {
  id_quizz: "id_du_quizz",
  question: "blablabla ? 2",
  responses: [
    { title: "lol11111", checked: false },
    { title: "lolaaaa", checked: false },
  ],
  correction: ["1"],
};
