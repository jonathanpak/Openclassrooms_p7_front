export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public jobTitle: string,
    public service: string,
    public displayPicture: string
  ) {}
}
