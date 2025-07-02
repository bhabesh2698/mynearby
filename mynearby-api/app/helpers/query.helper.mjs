const queryHelper = async (fn, erFn = (e) => [e, null]) => {
    try {
        const result = await fn();
        return [null, result];
    } catch (err) {
        return erFn(err)
    }
}

//   module.exports = catchAsync;

export default queryHelper;