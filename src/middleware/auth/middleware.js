import response from "../../config/response/responseSucces.js";
import { verifyJWT } from "../../lib/verifyJWT.js";

export const verifyAuthJWT = (req, res, next) => {
   const header = req.headers.authorization;
   if (!header) {
      return response(
         401,
         null,
         "Unauthorized",
         "Token must be provided in header",
         res
      );
   } else {
      const token = header.split(" ")[1];
      verifyJWT(token);
      next();
   }
};
