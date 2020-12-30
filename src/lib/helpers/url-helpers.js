/* eslint-disable import/prefer-default-export */

/** @module url-helpers */

/**
 * @function getDisplayUrl - Returns the hostname of a url.
 * @param {string} url the url of a history item
 * @returns {string}
 */
export const getDisplayUrl = (url) => {
  const { hostname } = new URL(url);
  return hostname.substring(0, 4) === 'www.' ? hostname.substring(4) : hostname;
};
