import httpService from "./http.service";
// import localStorageService from "./localStorage.service";

const colorEndpoint = "color/";

const colorService = {
  get: async () => {
    const { data } = await httpService.get(colorEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(colorEndpoint, payload);
    return data;
  },
  getById: async (id) => {
    const { data } = await httpService.get(colorEndpoint + id);
    return data;
  },
  updateById: async (payload, id) => {
    const { data } = await httpService.patch(colorEndpoint + id, payload);
    return data;
  },
  deleteById: async (id) => {
    const { data } = await httpService.delete(colorEndpoint + id);
    return data;
  },
};
export default colorService;
