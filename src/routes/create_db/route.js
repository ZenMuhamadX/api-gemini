// import db from "../../config/database/db.js";
import response from "../../config/response/responseSucces.js";
import route from "../../lib/route.js";

route.post("/create", (req, res) => {
   const data = req.body;
   response(200, data, "coming soon", false, res);
});
export default route;
