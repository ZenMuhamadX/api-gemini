import jwt from "jsonwebtoken";
import fs from "fs";

export const verifyJWT = (token: string): Promise<any> => {
   return new Promise((resolve, reject) => {
      let publicKey: Buffer;
      try {
         publicKey = fs.readFileSync("public_key.pem"); // Membaca kunci publik dari file
      } catch (err) {
         console.error("Error reading public key file:", err);
         reject(err);
         return;
      }

      jwt.verify(token, publicKey, (err: any, decoded: any) => {
         if (err) {
            // Token tidak valid atau telah kedaluwarsa
            console.error("Error verifikasi token:", err);
            reject(err);
         } else {
            // Token valid, muatan (payload) tersedia di 'decoded'
            resolve(decoded);
         }
      });
   });
};
