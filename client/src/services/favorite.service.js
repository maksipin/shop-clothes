import httpService from "./http.service";
// import localStorageService from "./localStorage.service";

const favoriteEndpoint = "favorite/";

const favoriteService = {
  get: async () => {
    const { data } = await httpService.get(favoriteEndpoint);
    return data;
  },
  add: async (payload) => {
    const { data } = await httpService.post(favoriteEndpoint, payload);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(favoriteEndpoint, payload);
    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(favoriteEndpoint + id);
    return data;
  },
};
export default favoriteService;
