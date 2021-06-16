export const fetchURLAsync = async (url) => {
  const result = await fetch(url);
  return result.json();
};
