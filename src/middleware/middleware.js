import response from "../config/response/responseSucces.js";

export const middlewareAllowedMethod = (req, res, next) => {
   try {
      const allowedMethods = ["POST"];
      if (!allowedMethods.includes(req.method)) {
         return res.status(405).json({
            status: 405,
            message: "Method Not Allowed",
         });
      }
      if (req.headers["content-type"] != "application/json") {
         return response(400, [], "Bad Request", "Invalid Content-Type", res);
      }
      if (typeof req.body !== "object" || Array.isArray(req.body)) {
         return response(400, [], "Bad Request", "Invalid JSON Data", res); // Menggunakan kode status 400 untuk Bad Request
      }
      next();
   } catch (error) {
      console.error("Error in middleware:", error); // Logging kesalahan
      response(500, [], "Internal Server Error", "An error occurred", res); // Menangani kesalahan tak terduga
   }
};
