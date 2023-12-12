/* eslint-disable prefer-const */
/* eslint-disable no-dupe-else-if */
/* eslint-disable no-else-return */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */

const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    const splittedUrl = this._urlSplitter(url);
    // console.log("Parsed URL:", url);
    // console.log("Splitted URL:", splittedUrl);
    return this._urlCombiner(splittedUrl);
  },

  parseActiveUrlWithoutCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    // console.log("Parsed URL Without Combiner:", url);
    return this._urlSplitter(url);
  },

  _urlSplitter(url) {
    const urlSplits = url.split("?");
    const queryParams = new URLSearchParams(urlSplits[1] || "");
    const pathSegments = urlSplits[0].split("/");
    const resource = pathSegments[1] || null;
    const isSearch = resource === "search";
    return {
      resource: isSearch ? "search" : resource,
      id: isSearch ? queryParams.get("q") || null : pathSegments[2] || null,
      verb: urlSplits[3] || null,
    };
  },

  _urlCombiner({ resource, id, verb }) {
    if (resource === "search") {
      return (resource ? `/${resource}` : "") + (id ? `?q=:id` : "");
    }
    return (
      (resource ? `/${resource}` : "/") +
      (id ? "/:id" : "") +
      (verb ? `/${verb}` : "")
    );
  },
};

export default UrlParser;
