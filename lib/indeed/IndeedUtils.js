'use strict';

const { URL, URLSearchParams } = require('url');
const DEFAULT_HOST = 'https://www.indeed.com/';

class IndeedTools {
  static createRawUrl(urlPath, { host } = {}) {
    return new URL(urlPath, host || DEFAULT_HOST);
  }

  static createUrl(urlPath, { host } = {}) {
    return IndeedTools.createRawUrl(urlPath, { host }).toString();
  }

  static createSearchJobsUrl({ searchTerm, location, radius, limit }, { host } = {}) {
    const url = IndeedTools.createRawUrl('/jobs', { host });

    const search = {};
    if (searchTerm) {
      search.q = searchTerm;
    }
    if (location) {
      search.l = location;
    }
    if (radius) {
      search.radius = radius;
    }
    if (limit) {
      if (limit > 50) {
        throw new Error('limit has a max of 50');
      }
      search.limit = limit;
    }

    url.search = new URLSearchParams(search);
    return url.toString();
  }

  static createJobPostingUrl({ indeedId }, { host } = {}) {
    const url = IndeedTools.createRawUrl('/viewjob', { host });
    url.search = new URLSearchParams({ jk: indeedId });
    return url.toString();
  }

  static createApplyUrl({ indeedId }, { host } = {}) {
    const url = IndeedTools.createRawUrl('/rc/clk', { host });
    // if the url is from "view job" then indeed returns the apply url
    url.search = new URLSearchParams({ jk: indeedId, from: 'vj' });
    return url.toString();
  }
}

module.exports = IndeedTools;
