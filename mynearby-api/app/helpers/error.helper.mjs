// import objHelper from "./object.helper.mjs";

export default (e) => {
    console.log(e);
    // objHelper.captureException(e);
    return [{ message: e.message }, null];
}