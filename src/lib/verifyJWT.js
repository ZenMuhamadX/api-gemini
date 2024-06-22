import jwt from "jsonwebtoken";
import "dotenv/config";
export const verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        let publicKey;
        try {
            publicKey = process.env.PUBLIC_KEY; // Membaca kunci publik
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
