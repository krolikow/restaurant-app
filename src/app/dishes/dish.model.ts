

class Image{
  constructor(public imagePath: string) {}

}
export class Dish {
  constructor(public name: string,
              public cuisine: string,
              public type: string,
              public category: string,
              public ingredients: string[],
              public amount: number,
              public price: number,
              public currency: string,
              public description: string,
              public imagePaths: Image[],
  ) {
  }
}
