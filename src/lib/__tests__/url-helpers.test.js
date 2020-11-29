import expect from 'expect';
import { getDisplayUrl } from '../helpers/url-helpers';

describe('url helper functions', () => {
  it('should return the correct display url when hostname starts with www.', () => {
    const result = getDisplayUrl('https://www.facebook.com');
    expect(result).toEqual('facebook.com');
  });

  it('should return the correct display url when hostname does not start with www.', () => {
    const result = getDisplayUrl('https://google.com');
    expect(result).toEqual('google.com');
  });
});
