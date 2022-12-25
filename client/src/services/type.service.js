import httpService from "./http.service";
// import localStorageService from "./localStorage.service";

const typeEndpoint = "type/";

const typeService = {
  get: async () => {
    const { data } = await httpService.get(typeEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(typeEndpoint, payload);
    return data;
  },
  getTypeById: async (id) => {
    const { data } = await httpService.get(typeEndpoint + id);
    return data;
  },
  update: async (payload, id) => {
    const { data } = await httpService.patch(typeEndpoint + id, payload);
    return data;
  },
  deleteTypeById: async (id) => {
    const { data } = await httpService.delete(typeEndpoint + id);
    return data;
  },
};
export default typeService;
