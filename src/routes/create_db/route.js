import db from "../../config/database/db.js";
import response from "../../config/response/responseSucces.js";
import route from "../../lib/route.js";

route.post("/", (req, res) => {
   const data = req.body;
   response(200, data, "OK", true, res);
});
export default route;
