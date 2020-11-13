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

  constructor(
    title: string,
    content: string,
    authorId: number,
    categoryId: number
  ) {
    this.id = '001';
    this.authorId = authorId;
    this.title = title;
    this.content = content;
    this.categoryId = categoryId;
    this.dateCreated = 'Now';
  }
}
