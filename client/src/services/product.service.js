import httpService from "./http.service";
// import localStorageService from "./localStorage.service";

const productEndpoint = "product/";

const productService = {
  get: async () => {
    const { data } = await httpService.get(productEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(productEndpoint, payload);
    return data;
  },
  getProductById: async (id) => {
    const { data } = await httpService.get(productEndpoint + id);
    return data;
  },
  update: async (payload, id) => {
    const { data } = await httpService.patch(productEndpoint + id, payload);
    return data;
  },
  updateQuantity: async () => {
    const { data } = await httpService.patch(productEndpoint + "quantity/");
    return data;
  },
  updateImg: async (payload, id) => {
    const { data } = await httpService.patch(
      productEndpoint + "img/" + id,
      payload
    );
    return data;
  },
};
export default productService;
