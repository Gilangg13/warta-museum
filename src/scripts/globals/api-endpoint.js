import CONFIG from "./config";

const { MUSEUM_URL } = CONFIG;

const MUSEUM_API_ENDPOINT = {
  MUSEUM_LIST: `${MUSEUM_URL}/museum`,
  MUSEUM_DETAIL: (id) => `${MUSEUM_URL}/museum/${id}`,
  MUSEUM_PROVINSI: (provinsi) => `${MUSEUM_URL}/museum/provinsi/${provinsi}`,
};

export default MUSEUM_API_ENDPOINT;
