import { User } from './../shared/user.model';
export class Thread {
  public id: string;
  public authorId: number;
  public title: string;
  public content: string;
  public dateCreated: string;
  public categoryId: number;
  public usersLike?: string[];
  public likeAmount: number;
  public answersAmount: [];
  public username: string;
  public imageUrl: string;

  constructor(
    authorId: number,
    title: string,
    content: string,
    dateCreated: string,
    categoryId: number
  ) {
    this.authorId = authorId;
    this.title = title;
    this.content = content;
    this.categoryId = categoryId;
    this.dateCreated = dateCreated;
  }
}
