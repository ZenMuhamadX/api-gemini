import "dotenv/config"; // Mengimpor konfigurasi dari file .env
import fs from "fs"; // Mengimpor modul file system untuk membaca kunci privat
import jwt from "jsonwebtoken"; // Mengimpor modul jsonwebtoken untuk menghasilkan JWT
// Mendeklarasikan variabel untuk menyimpan kunci privat
let privateKey;
try {
    // Membaca kunci privat dari file private_key.pem
    privateKey = fs.readFileSync("private_key.pem");
}
catch (error) {
    // Menangani kesalahan jika gagal membaca kunci privat
    console.error("Error membaca kunci privat:", error);
    throw new Error("Gagal membaca kunci privat");
}
// Menentukan opsi penandatanganan JWT, menggunakan algoritma RS256
const signOptions = {
    algorithm: "RS256",
};
// Fungsi untuk menghasilkan JWT
export const generateJWT = (payload) => {
    // Validasi jika payload kosong
    if (!payload) {
        throw new Error("payload empty");
    }
    try {
        // Menghasilkan JWT menggunakan payload, kunci privat, dan opsi penandatanganan
        const token = jwt.sign(payload, privateKey, signOptions);
        return token; // Mengembalikan token JWT yang dihasilkan
    }
    catch (error) {
        // Menangani kesalahan jika gagal menghasilkan JWT
        console.error("Error menghasilkan JWT:", error);
        throw new Error("Gagal menghasilkan JWT");
    }
};
