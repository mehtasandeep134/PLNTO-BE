export class UserCreatedEvent {
  constructor(
    public readonly email: string,
    public readonly name: string,
    public readonly password: string,
    public readonly stripeCustomerId: string,
  ) {}
}
