export const createError = (err, status = 500) => {
    const internalError = new Error(
        'Internal ' + err.name + ': ' + err.message
    );
    internalError.status = status;
    return internalError;
};
