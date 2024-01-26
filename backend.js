export const API = () => {
  const url = process.env.EXPO_PUBLIC_API_URL;
  return `${url}/api`;
};

export const IMG = () => {
  const url = process.env.EXPO_PUBLIC_API_URL;
  return `${url}`;
};
