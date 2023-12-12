/* eslint-disable radix */
/* eslint-disable function-paren-newline */
/* eslint-disable no-else-return */
import MUSEUM_API_ENDPOINT from "../globals/api-endpoint";

class MuseumSource {
  static async museumList() {
    try {
      const response = await fetch(MUSEUM_API_ENDPOINT.MUSEUM_LIST);

      const responseJson = await response.json();

      return responseJson.data;
    } catch (error) {
      console.error(`Error fetching museum list: ${error}`);
      throw error;
    }
  }

  static async detailMuseum(id) {
    try {
      const response = await fetch(MUSEUM_API_ENDPOINT.MUSEUM_DETAIL(id));
      // console.log(MUSEUM_API_ENDPOINT.MUSEUM_DETAIL(id));

      const responseJson = await response.json();
      // console.log(responseJson);

      if (response.ok) {
        const museum = responseJson.data.find(
          (item) => item.id_museum === parseInt(id)
        );
        return museum;
      } else {
        throw new Error(
          `Failed to fetch museum details. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error(`Error fetching museum list: ${error}`);
      throw error;
    }
  }

  static async museumByProvinsi(provinsi) {
    try {
      const response = await fetch(
        MUSEUM_API_ENDPOINT.MUSEUM_PROVINSI(provinsi)
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseJson = await response.json();

      // console.log(responseJson.data);
      return responseJson.data;
    } catch (error) {
      console.error(`Error fetching museum by provinsi: ${error}`);
      throw error;
    }
  }

  static async provinsiList() {
    try {
      const response = await fetch(MUSEUM_API_ENDPOINT.PROVINSI_LIST);

      const responseJson = await response.json();
      // console.log(responseJson.data.provinsi);

      return responseJson.data.provinsi;
    } catch (error) {
      console.error(`Error fetching provinsi list: ${error}`);
      throw error;
    }
  }
}

export default MuseumSource;
