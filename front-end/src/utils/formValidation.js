export function minLengthValidation(inputData, minLength) {
    const { value } = inputData;
    removeClassErrorSuccess(inputData);
    if (value.length >= minLength) {
        inputData.classList.add('success');
        return true;
    } else {
        inputData.classList.add('error');
        return false;
    }
}

export function emailValidation(inputData) {
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
    removeClassErrorSuccess(inputData);

    const result = emailValid.test(inputData.value);

    if (result) {
        inputData.classList.add('success');
        return true;
    } else {
        inputData.classList.add('error');
        return false;
    }
}


function removeClassErrorSuccess(inputData) {
  inputData.classList.remove("success");
  inputData.classList.remove("error");
}
