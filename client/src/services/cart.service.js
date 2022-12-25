import httpService from "./http.service";
// import localStorageService from "./localStorage.service";

const cartEndpoint = "cart/";

const cartService = {
  get: async () => {
    const { data } = await httpService.get(cartEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(cartEndpoint, payload);
    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(cartEndpoint + id);
    return data;
  },
  update: async (id, payload) => {
    const { data } = await httpService.patch(cartEndpoint + id, payload);
    return data;
  },
};
export default cartService;
