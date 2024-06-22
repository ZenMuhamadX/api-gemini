import db from "../../config/database/db.js";
import response from "../../config/response/responseSucces.js";
import route from "../../lib/route.js";
import { verifyAuthJWT } from "../../middleware/auth/middleware.js";

const dataFromSupabase = async (id) => {
   const { data, count, error, statusText, status } = await db
      .from("web-ai")
      .select()
      .eq("id", id);
   const datas = { data, count, error, statusText, status };
   return datas;
};

route.get("/getdata", async (req, res) => {
   const ID = req.query.ID;
   const token = req.query.token;
   if (!ID || !token) {
      return res.status(400).json({
         status: 400,
         message: "ID,token must provided in the query parameter",
      });
   } else if (token != "04022008") {
      return res.status(401).json({
         status: 401,
         message: "Unauthorized",
      });
   }
   const datas = await dataFromSupabase(ID);
   if (typeof ID !== "string") {
      return res.status(400).json({
         status: 400,
         message: "ID must be a string",
      });
   }
   try {
      if (datas.data == "") {
         res.status(datas.status).json({
            status: datas.status,
            message: "no matching ID in database",
         });
         return;
      }
      if (datas.status > 300) {
         res.status(datas.status).json({
            status: datas.status,
            error: datas.error,
         });
         return;
      }
      response(datas.status, datas.data, datas.statusText, datas.error, res);
   } catch (error) {
      res.status(500).json({
         status: 500,
         error: true,
         message: "Internal Server err",
      });
   }
});
export default route;
