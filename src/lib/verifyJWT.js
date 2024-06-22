import jwt from "jsonwebtoken";
import fs from "fs";
export const verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        const publicKey = fs.readFileSync("public_key.pem");
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
