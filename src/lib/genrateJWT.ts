import "dotenv/config"; // Mengimpor konfigurasi dari file .env
import jwt from "jsonwebtoken"; // Mengimpor modul jsonwebtoken untuk menghasilkan JWT

// Mendeklarasikan variabel untuk menyimpan kunci privat
let privateKey: any;
try {
   // Membaca kunci privat dari file private_key.pem
   privateKey = process.env.PRIVATE_KEY;
} catch (error) {
   // Menangani kesalahan jika gagal membaca kunci privat
   console.error("Error membaca kunci privat:", error);
   throw new Error("Gagal membaca kunci privat");
}
// Mendefinisikan interface untuk payload JWT
interface payloadMustBeObject {
   role: string;
   username: string;
   email?: string;
}

// Fungsi untuk menghasilkan JWT
export const generateJWT = (payload: payloadMustBeObject): string => {
   // Validasi jika payload kosong
   if (!payload) {
      throw new Error("payload empty");
   }
   try {
      // Menghasilkan JWT menggunakan payload, kunci privat, dan opsi penandatanganan
      const token = jwt.sign(payload, privateKey);
      return token; // Mengembalikan token JWT yang dihasilkan
   } catch (error) {
      // Menangani kesalahan jika gagal menghasilkan JWT
      console.error("Error menghasilkan JWT:", error);
      throw new Error("Gagal menghasilkan JWT");
   }
};
