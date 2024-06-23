import response from "../../config/response/responseSucces.js";
import { verifyJWT } from "../../lib/verifyJWT.js";

export const verifyAuthJWT = async (req, res, next) => {
   const header = req.headers.authorization;
   if (!header) {
      return response(
         401,
         null,
         "Unauthorized",
         "Token must be provided in header",
         res
      );
   }
   try {
      const token = header.split(" ")[1]; // Ambil token dari header authorization (format: Bearer <token>)
      const decoded = await verifyJWT(token); // Melakukan verifikasi JWT dengan token
      console.log("hasil", decoded);
      if (decoded) {
         next(); // Lanjutkan jika token valid
      } else {
         return response(401, null, "Unauthorized", "Invalid Token", res);
      }
   } catch (error) {
      console.error(error);
      return response(
         500,
         null,
         "Internal Server error",
         "Invalid JWT token",
         res
      );
   }
};
