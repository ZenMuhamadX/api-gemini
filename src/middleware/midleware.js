// inisialisasi
import response from "../config/response/responseSucces.js";

export const middleware = (req, res, next) => {
   if (typeof req.body !== "object" || Array.isArray(req.body)) {
      return response(200, [], "Bad Request", "Invalid JSON Data");
   }
   next();
};
