export class ProductCreatedEvent {
  constructor(
    public readonly email: string,
    public readonly name: string,
    public readonly password: string,
  ) {}
}
