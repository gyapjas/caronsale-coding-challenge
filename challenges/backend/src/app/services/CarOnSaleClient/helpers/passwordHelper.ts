import crypto from 'crypto';

const hashPassword = (password: string, cycles?: number): string => {
  password = password || '';
  cycles = cycles <= 0 || cycles > 100 ? 0 : cycles || 5;

  for(; cycles-- > 0;) {
    password = crypto.createHash('sha512').update(password).digest('hex');
  }

  return password;
}

export { hashPassword };
