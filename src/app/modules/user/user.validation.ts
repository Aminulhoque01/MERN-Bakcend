export function isValidPassword(password: string): boolean {
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
  return password.length >= 8 && re.test(password);
}
