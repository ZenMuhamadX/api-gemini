import response from "../config/response/responseSucces.js";
import route from "../lib/route.js";

const get = route.get("/", (req, res) => {
   response(200, [], "Hello from api", false, res);
});
export default get;
