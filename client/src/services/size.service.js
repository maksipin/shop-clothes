import httpService from "./http.service";
// import localStorageService from "./localStorage.service";

const sizeEndpoint = "size/";

const sizeService = {
  get: async () => {
    const { data } = await httpService.get(sizeEndpoint);
    console.log(data);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(sizeEndpoint, payload);
    return data;
  },
  getSizeById: async (id) => {
    const { data } = await httpService.get(sizeEndpoint + id);
    return data;
  },
  update: async (payload, id) => {
    const { data } = await httpService.patch(sizeEndpoint + id, payload);
    return data;
  },
  deleteSizeById: async (id) => {
    const { data } = await httpService.delete(sizeEndpoint + id);
    return data;
  },
};
export default sizeService;
