import response from "../config/response/responseSucces.js";

export const middleware = (req, res, next) => {
   try {
      if (typeof req.body !== "object" || Array.isArray(req.body)) {
         return response(400, [], "Bad Request", "Invalid JSON Data"); // Menggunakan kode status 400 untuk Bad Request
      }
      next();
   } catch (error) {
      console.error("Error in middleware:", error); // Logging kesalahan
      response(500, [], "Internal Server Error", "An error occurred"); // Menangani kesalahan tak terduga
   }
};
