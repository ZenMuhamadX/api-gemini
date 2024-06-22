// Import necessary modules
import route from "../../lib/route.js";
import { generateJWT } from "../../lib/genrateJWT.js";
import response from "../../config/response/responseSucces.js";

// Define a route to handle JWT creation
route.post("/create", async (req, res) => {
   // Extract payload data from the request body
   const { role, status, username, email } = req.body;
   const payload = { role, status, username, email };
   // Check if payload is provided
   if (
      !payload.role ||
      !payload.status ||
      !payload.username ||
      !payload.email
   ) {
      // Return an error response if payload is missing
      return response(400, [], "Payload is required", true, res);
   }
   // Attempt to generate a JWT
   try {
      const token = generateJWT({
         role: payload.role,
         status: payload.status,
         username: payload.username,
         email: payload.email,
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
