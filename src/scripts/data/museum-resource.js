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
      console.log(MUSEUM_API_ENDPOINT.MUSEUM_DETAIL(id));

      const responseJson = await response.json();
      console.log(responseJson);

      return responseJson.data;
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

      return responseJson.data;
    } catch (error) {
      console.error(`Error fetching museum by provinsi: ${error}`);
      throw error;
    }
  }
}

export default MuseumSource;
