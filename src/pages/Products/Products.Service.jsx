import { OK, PRODUCT_URL } from "../../services/http/http.config";
import { getRequest } from "../../services/http/http.service";

export const getProductList = async () => {
  try {
    const { data, status } = await getRequest(PRODUCT_URL);
    if (status === OK) {
      return data;
    }

    return status === OK ? data : [];
  } catch (err) {
    console.log("Error: ", err);
    return [];
  }
};
