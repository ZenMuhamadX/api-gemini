import jwt from "jsonwebtoken";
import fs from "fs";
export const verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        let publicKey;
        try {
            publicKey = fs.readFileSync("public_key.pem"); // Membaca kunci publik dari file
        }
        catch (err) {
            console.error("Error reading public key file:", err);
            reject(err);
            return;
        }
        jwt.verify(token, publicKey, (err, decoded) => {
            if (err) {
                // Token tidak valid atau telah kedaluwarsa
                console.error("Error verifikasi token:", err);
                reject(err);
            }
            else {
                // Token valid, muatan (payload) tersedia di 'decoded'
                resolve(decoded);
            }
        });
    });
};
