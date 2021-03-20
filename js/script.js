const nameField = document.getElementById('name');
nameField.focus();


const jobRoleField = document.getElementById('title');
const jobRoleOtherField = document.getElementById('other-job-role');
jobRoleOtherField.hidden = true;
jobRoleField.addEventListener('change', () => {
    if (jobRoleField.value == 'other') {
        jobRoleOtherField.hidden = false;
    } else {
        jobRoleOtherField.hidden = true;
    }
});


const tshirtDesignField = document.getElementById('design');
const tshirtColorField = document.getElementById('color');
const tshirtDesignOptions = document.querySelectorAll('[data-theme]');
tshirtColorField.disabled = true;
tshirtDesignField.addEventListener('change', () => {
    // Enable color picker and set it to first option
    tshirtColorField.disabled = false;
    tshirtColorField.selectedIndex = 0;
    // Loop the color options and show applicable colors
    if (tshirtDesignField.value == "js puns" || tshirtDesignField.value == "heart js") {
        for (let i = 0; i < tshirtDesignOptions.length; i++) {
            tshirtDesignOptions[i].textContent = tshirtDesignOptions[i].textContent.split('(')[0].trim();
            if (tshirtDesignOptions[i].getAttribute('data-theme') == tshirtDesignField.value) {
                tshirtDesignOptions[i].hidden = false;
            } else {
                tshirtDesignOptions[i].hidden = true;
            }
        }
    }
});


const activitiesFieldset = document.getElementById('activities');
const activityCheckboxes = document.querySelectorAll('#activities-box input');
const activitiesTotalCost = document.getElementById('activities-cost');
activitiesFieldset.addEventListener('change', (e) => {
    let totalCost = 0;
    for (let i = 0; i < activityCheckboxes.length; i++) {
        if (activityCheckboxes[i].checked) {
            totalCost += parseInt(activityCheckboxes[i].getAttribute('data-cost'));
        }
    }
    activitiesTotalCost.innerText = `Total: $${totalCost}`;
});


const paymentMethodElement = document.getElementById('payment');
const creditCardInputs = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
paypal.hidden = true;
bitcoin.hidden = true;
paymentMethodElement.value = 'credit-card';
paymentMethodElement.addEventListener('change', () => {
    creditCardInputs.hidden = true;
    paypal.hidden = true;
    bitcoin.hidden = true;
    document.getElementById(paymentMethodElement.value).hidden = false;
});


function isValidName(field) {
    const testString = /\S+/;
    let isValid = false;
    if (testString.test(field.value)) {
        showValidationSuccess(field);
        isValid = true;
    } else {
        showValidationHint(field);
    }
    return isValid;
}

function isValidEmail(field) {
    const testString = /[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    let isValid = false;
    if (testString.test(field.value)) {
        showValidationSuccess(field);
        isValid = true;
    } else {
        showValidationHint(field);
    }
    return isValid;
}

function isValidActivities() {
    let activitySelected = false;
    // Don't rely on total cost incase we ever have a free event
    for (let i = 0; i < activityCheckboxes.length; i++) {
        if (activityCheckboxes[i].checked) {
            activitySelected = true;
        }
    }
    if (activitySelected) {
        //Sending any child element of activity fieldset
        showValidationSuccess(activitiesTotalCost);
        activitySelected = true
    } else {
        showValidationHint(activitiesTotalCost);
    }
    return activitySelected;
}

function isValidCardNum(field){
    const testString = /^\d{13,16}$/;
    let isValid = false;
    if (testString.test(field.value)) {
        showValidationSuccess(field);
        isValid = true;
    } else {
        showValidationHint(field);
    }
    return isValid;
}

function isValidZip(field){
    const testString = /^\d{5}$/;
    let isValid = false;
    if (testString.test(field.value)) {
        showValidationSuccess(field);
        isValid = true;
    } else {
        showValidationHint(field);
    }
    return isValid;
}

function isValidCVV(field){
    const testString = /^\d{3}$/;
    let isValid = false;
    if (testString.test(field.value)) {
        showValidationSuccess(field);
        isValid = true;
    } else {
        showValidationHint(field);
    }
    return isValid;
}

function validateForm() {
    let isValid = true;
    if (!isValidName(nameField)) {
        isValid = false;
    }
    if (!isValidEmail(emailField)) {
        isValid = false;
    }
    if (!isValidActivities()) {
        isValid = false;
    }
    if (paymentMethodElement.value === 'credit-card') {
        if (!isValidCardNum(creditCardNumField)) {
            isValid = false;
        }
        if (!isValidZip(zipField)) {
            isValid = false;
        }
        if (!isValidCVV(cvvField)) {
            isValid = false;
        }
    }
    return isValid;
}


function showValidationHint(element) {
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'inherit';
}

function showValidationSuccess(element) {
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = 'none';
}

function removeValidationHints(element) {
    element.parentElement.classList.remove('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = 'none';
}

const form = document.querySelector('form');
const emailField = document.getElementById('email');
const creditCardNumField = document.getElementById('cc-num');
const zipField = document.getElementById('zip');
const cvvField = document.getElementById('cvv');
form.addEventListener('submit', (e) => {
    console.log("Form submitted");
    if (validateForm() == false){
        e.preventDefault();
        console.log("Errors on form");
    } else {
        console.log("Form validation passed");
    }
});


for(let i = 0; i < activityCheckboxes.length; i++){
    activityCheckboxes[i].addEventListener('focus', () => {
        activityCheckboxes[i].parentElement.classList.add('focus');
    }); 
    activityCheckboxes[i].addEventListener('blur', () => {
        activityCheckboxes[i].parentElement.classList.remove('focus');
    });
}