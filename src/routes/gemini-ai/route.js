// config
import "dotenv/config";
import response from "../../config/response/responseSucces.js";
import route from "../../lib/route.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
// fetch ai
const genAI = new GoogleGenerativeAI(process.env.SECRET_KEY_AI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const engineAI = model.startChat({
   history: [],
   generationConfig: {
      maxOutputTokens: 100,
   },
});

route.post("/", async (req, res) => {
   const { prompt } = await req.body;
   if (!prompt) {
      return response(400, null, "Bad Request Require Prompt", true, res);
   }
   try {
      const result = await engineAI.sendMessage(prompt);
      const data = result.response.text();
      return response(200, data, "OK", false, res);
   } catch (error) {
      return response(500, null, "Internal Server Error", true, res);
   }
});

export default route;
