import { randomBytes } from 'crypto';

const TOKEN_LENGTH = 10;

export function generateInvitationToken() {
  return randomBytes(TOKEN_LENGTH).toString('base64url').slice(0, TOKEN_LENGTH);
}
