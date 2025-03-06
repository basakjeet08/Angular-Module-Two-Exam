import { UserRole } from './UserRole';

export class User {
  readonly id: string = crypto.randomUUID();
  constructor(readonly name: string, readonly role: UserRole) {}
}
