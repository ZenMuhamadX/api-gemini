const response = (
   status: number,
   data: object | null,
   statusText: string,
   error: boolean | string,
   res: any
) => {
   res.status(status).json({
      error,
      payload: {
         status,
         statusText,
         user: {
            data,
         },
      },
   });
};

export default response;
