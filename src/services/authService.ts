import { mockDelay } from '../api/client';
import type { User } from '../types/domain';

export interface Credentials { email: string; password: string; }
export interface RegisterPayload extends Credentials { name: string; }

const demoUser: User = { id: 'u-1', name: 'Datonomy Founder', email: 'demo@commerceforge.dev', role: 'admin', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80' };

export async function login(credentials: Credentials): Promise<User> {
  await mockDelay();
  if (!credentials.email.includes('@') || credentials.password.length < 6) throw new Error('Invalid credentials');
  return { ...demoUser, email: credentials.email };
}
export async function register(payload: RegisterPayload): Promise<User> { await mockDelay(); return { ...demoUser, name: payload.name, email: payload.email, role: 'customer' }; }
export async function forgotPassword(email: string): Promise<{ message: string }> { await mockDelay(); return { message: `Password reset instructions sent to ${email}` }; }
