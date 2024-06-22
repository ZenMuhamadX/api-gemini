import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyJWT = (token: string): Promise<any> => {
   return new Promise((resolve, reject) => {
      let publicKey: any;
      try {
         publicKey = process.env.PUBLIC_KEY; // Membaca kunci publik
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
