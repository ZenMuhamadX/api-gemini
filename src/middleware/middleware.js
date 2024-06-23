import response from "../config/response/responseSucces.js";

export const middlewareAllowedMethod = (req, res, next) => {
   try {
      const contenType = req.headers["content-type"]
      const allowedMethods = ["POST"];
      if (!allowedMethods.includes(req.method)) {
         return res.status(405).json({
            status: 405,
            message: "Method Not Allowed",
         });
      }
      if (contenType == "application/json") {
         next();
      } else {
         return response(400, [], "Bad Request", "Invalid Content-Type", res);
      }
      if (typeof req.body !== "object" || Array.isArray(req.body)) {
         return response(400, [], "Bad Request", "Invalid JSON Data", res); // Menggunakan kode status 400 untuk Bad Request
      }
   } catch (error) {
      console.error("Error in middleware:", error); // Logging kesalahan
      response(500, [], "Internal Server Error", "An error occurred", res); // Menangani kesalahan tak terduga
   }
};
