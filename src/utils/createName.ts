export const createName = (email: string): string => {
  const name = email.split("@")[0];
  return name!;
};
