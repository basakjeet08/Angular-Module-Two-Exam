export class Book {
  readonly id: string = crypto.randomUUID();

  constructor(
    readonly title: string,
    readonly author: string,
    readonly isbn: string,
    readonly availability?: boolean
  ) {}
}
