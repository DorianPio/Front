import { Video } from "./video";

export type Theme = {
  name: string;
  id: number;
  videos: Video[];
  valided?: boolean;
};
