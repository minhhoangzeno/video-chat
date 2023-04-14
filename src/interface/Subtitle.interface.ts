import { IAuthor } from "./Author.interface";

export interface ISubtitle {
  id: string;
  startSeconds: number;
  endSeconds: number;
  startTime: string;
  endTime: string;
  text: string;
  authorId: string;
  author: IAuthor;
}
