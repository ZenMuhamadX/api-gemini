const response = (status, data, statusText, error, res) => {
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
