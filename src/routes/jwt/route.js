// Import necessary modules
import route from "../../lib/route.js";
import { generateJWT } from "../../lib/genrateJWT.js";
import response from "../../config/response/responseSucces.js";

// Define a route to handle JWT creation
route.post("/jwt", async (req, res) => {
   // Extract payload data from the request body
   const { role, username, email } = req.body;
   // Check if payload is provided
   if (!role || !username || !email) {
      // Return an error response if payload is missing
      return response(
         400,
         {
            role: "your role",
            username: "your name",
            email: "your email",
         },
         "Payload is required",
         true,
         res
      );
   }
   // Attempt to generate a JWT
   try {
      const token = generateJWT({
         role,
         username,
         email,
      });
      // Handle successful JWT generation (e.g., send a success response)
      return response(200, { token }, "JWT generated successfully", false, res);
   } catch (error) {
      // Handle errors during JWT generation (e.g., log the error and send an error response)
      console.error("Error generating JWT:", error);
      return response(500, [], "Failed to generate JWT", true, res);
   }
});

// Export the createJWT route handler
export default route;
