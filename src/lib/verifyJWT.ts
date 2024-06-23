import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyJWT = (token: string): Promise<any> => {
   return new Promise((resolve, reject) => {
      let privateKey: any;
      try {
         privateKey = process.env.PRIVATE_KEY;
      } catch (err) {
         console.error("Error reading private_key :", err);
         reject(err);
         return;
      }

      jwt.verify(token, privateKey, (err: any, decoded: any) => {
         if (err) {
            // Token tidak valid atau telah kedaluwarsa
            reject(err);
         } else {
            // Token valid, muatan (payload) tersedia di 'decoded'
            resolve(decoded);
         }
      });
   });
};
