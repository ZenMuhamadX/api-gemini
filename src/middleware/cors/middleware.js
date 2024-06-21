import cors from "cors";
export const crossOriginResourceSharing = (req, res, next) => {
   cors();
   next();
};
