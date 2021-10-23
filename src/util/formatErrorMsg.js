function formatErrorMsg(error){
    let errors = undefined;
    if (error.name == 'inputError') {
        errors = error.message;
    } else if (error.name == 'ValidationError') {
        errors = [error._message];
    } else {
        errors = [error.message];
    }
    return errors;
}

module.exports=formatErrorMsg;