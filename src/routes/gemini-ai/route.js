// config
import "dotenv/config";
import response from "../../config/response/responseSucces.js";
import route from "../../lib/route.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
// fetch ai
const genAI = new GoogleGenerativeAI(process.env.SECRET_KEY_AI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
let history = [];
let engineAI; // Deklarasikan engineAI di luar untuk akses global
let historyUser = []

// Fungsi untuk memulai sesi obrolan baru
function startNewChat() {
    engineAI = model.startChat({
        history: history,
        generationConfig: {
            maxOutputTokens: 100,
        },
    });
}

// Mulai sesi obrolan awal
startNewChat();

route.get("/getHistoryUser",(req,res)=>{
   return response(200,historyUser,"OK",false,res)
})

route.post("/clear", (req, res) => {
    history = []; // Hapus riwayat
    historyUser = []
    startNewChat(); // Mulai sesi obrolan baru
    response(200, {}, "Riwayat obrolan telah dihapus dan sesi baru telah dimulai", false, res);
});

route.post("/gemini", async (req, res) => {
    const { prompt } = req.body; // Tidak perlu await di sini
    if (!prompt) {
        return response(400, null, "Perlu prompt", true, res);
    }
    try {
        const result = await engineAI.sendMessage(prompt);
        const data = result.response.text();
        historyUser.push({ prompt:prompt, response: data }); // Simpan riwayat
        
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
        console.error(error); // Gunakan console.error untuk kesalahan
        return response(500, null, "Terjadi kesalahan server", true, res);
    }
});

export default route;
