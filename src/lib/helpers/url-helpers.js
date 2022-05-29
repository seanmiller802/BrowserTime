/* eslint-disable import/prefer-default-export */

/** @module url-helpers */

/**
 * @function getDisplayUrl - Returns the hostname of a url.
 * @param {string} url the url of a history item
 * @returns {string}
 */
export const getDisplayUrl = (url) => {
  let hostname;
  try {
    hostname = new URL(url).hostname;
  } catch (e) {
    // sometimes the url will already be a hostname
    hostname = url;
  }
  return hostname.substring(0, 4) === 'www.' ? hostname.substring(4) : hostname;
};
