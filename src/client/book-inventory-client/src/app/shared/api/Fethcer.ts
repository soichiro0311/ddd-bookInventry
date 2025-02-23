export const commonFetcher = async (url: string) => {
  const response = await fetch(url);
  const json = await response.json();
  return { data: json, statusCode: response.status };
};
