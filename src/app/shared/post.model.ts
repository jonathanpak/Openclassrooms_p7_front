export class Post {
  public id: number;
  public dateCreated: string;

  constructor(
    public authorId: number,
    public content: string,
    public threadId: number
  ) {
    this.dateCreated = new Date().toISOString().slice(0, 10);
  }
}
