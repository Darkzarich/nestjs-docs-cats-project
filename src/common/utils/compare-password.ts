import * as bcrypt from 'bcrypt';

export async function comparePassword(password: string, hash: string) {
  const isMatch = await bcrypt.compare(password, hash);

  return isMatch;
}
