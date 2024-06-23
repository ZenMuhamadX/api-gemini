// config
import "dotenv/config";
import response from "../../config/response/responseSucces.js";
import route from "../../lib/route.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
// fetch ai
const genAI = new GoogleGenerativeAI(process.env.SECRET_KEY_AI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
let history = [];
const engineAI = model.startChat({
   history: history,
   generationConfig: {
      maxOutputTokens: 100,
   },
});

// route.post("/clear", (req, res) => {
//    response(200, history, "history clear", false, res);
//    console.log(history);
//    history = [];
//    console.log(history);
// });

route.post("/gemini", async (req, res) => {
   const { prompt } = await req.body;
   if (!prompt) {
      return response(400, null, "Require prompt", true, res);
   }
   try {
      const result = await engineAI.sendMessage(prompt);
      const data = result.response.text();
      return response(
         200,
         {
            prompt: prompt,
            engineAI: data,
         },
         "OK",
         false,
         res
      );
   } catch (error) {
      console.log(error);
      return response(500, null, "Internal Server Error", error, res);
   }
});

export default route;
