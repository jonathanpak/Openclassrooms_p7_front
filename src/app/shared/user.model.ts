export class User {
  public id: number;
  public jobTitle: string;
  public service: string;
  public displayPicture: string;

  constructor(
    public username: string,
    public email: string,
    private _token: string
  ) {}

  get token() {
    return this._token;
  }
}
