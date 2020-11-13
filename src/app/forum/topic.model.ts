export class Topic {
  public topic: {};
  public mainCategory: string;
  public subCategories: { name: string; id: number }[];
  public id: number;

  constructor(mainCategory: string, subCategories: {}[], id: number) {
    this.topic = { mainCategory, subCategories, id };
  }
}
// export class Topic {
//   public topic: {};
//   public mainCategory: string;
//   public subCategories: string[];
//   public id: number;

//   constructor(mainCategory: string, subCategories: string[], id: number) {
//     this.topic = { mainCategory, subCategories, id };
//   }
// }
