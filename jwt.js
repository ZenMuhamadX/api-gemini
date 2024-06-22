import { generateJWT } from "./src/lib/genrateJWT.js";

const jwt = generateJWT({
   role: "admin",
   status: "active",
   username: "admin",
   email: "admin@gmail.com",
});
console.log(jwt);
