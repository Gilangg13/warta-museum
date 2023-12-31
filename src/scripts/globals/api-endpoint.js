import CONFIG from "./config";

const { MUSEUM_URL } = CONFIG;

const MUSEUM_API_ENDPOINT = {
  MUSEUM_LIST: `${MUSEUM_URL}/museum`,
  MUSEUM_DETAIL: (id) => `${MUSEUM_URL}/museum/${id}`,
  MUSEUM_SEARCH: (search) => `${MUSEUM_URL}/museum/search?q=${search}`,
  MUSEUM_PROVINSI: (provinsi) => `${MUSEUM_URL}/museum/provinsi/${provinsi}`,
  PROVINSI_LIST: `${MUSEUM_URL}/provinsi`,
};

export default MUSEUM_API_ENDPOINT;
