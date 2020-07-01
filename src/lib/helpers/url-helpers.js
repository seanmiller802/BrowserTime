/* eslint-disable import/prefer-default-export */
export const getDisplayUrl = (url) => {
  const { hostname } = new URL(url);
  return hostname.substring(0, 4) === 'www.' ? hostname.substring(4) : hostname;
};
