import { CART_URL, OK } from "../../services/http/http.config";
import { postRequest } from "../../services/http/http.service";

export const addToCart = async (payload) => {
  try {
    const { status, data } = await postRequest(CART_URL, payload);
    return status === OK ? data : null;
  } catch (err) {
    console.log("Error: ", err);
    return null;
  }
};
