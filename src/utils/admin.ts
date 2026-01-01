export const ADMIN_EMAILS = [
  'acctopedge@gmail.com',
  'moksh2031@gmail.com',
  'smittilva2006@gmail.com',
  'team@topedgeai.com'
];

export const isAdminEmail = (email: string | null | undefined): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email);
};
