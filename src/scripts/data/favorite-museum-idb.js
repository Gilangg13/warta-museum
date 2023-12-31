/* eslint-disable consistent-return */
import { openDB } from "idb";
import CONFIG from "../globals/config";

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
  },
});

const FavoriteMuseumIdb = {
  async getMuseum(id) {
    if (!id) {
      return;
    }
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },

  async getAllMuseums() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },

  async putMuseum(museum) {
    if (!Object.prototype.hasOwnProperty.call(museum, "id")) {
      return;
    }

    return (await dbPromise).put(OBJECT_STORE_NAME, museum);
  },

  async deleteMuseum(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavoriteMuseumIdb;
