import { User } from './user.model';

export class Post {
  constructor(
    public id: string,
    public threadId: string,
    public content: string,
    public author: User,
    public dateCreated: string
  ) {}
}
