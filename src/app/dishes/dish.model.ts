export class Review{
  constructor(public stars: number,
              public content: string) {}
}

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
              public reviews: Review[],
              public imagePaths: Image[],
              public rate?: number
  ) {
  }
}
