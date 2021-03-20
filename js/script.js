/**
 * DOM Selectors
 */
const nameField = document.getElementById('name');
const jobRoleField = document.getElementById('title');
const jobRoleOtherField = document.getElementById('other-job-role');
const tshirtDesignField = document.getElementById('design');
const tshirtColorField = document.getElementById('color');
const tshirtDesignOptions = document.querySelectorAll('[data-theme]');
const activitiesFieldset = document.getElementById('activities');
const activityCheckboxes = document.querySelectorAll('#activities-box input');
const activitiesTotalCost = document.getElementById('activities-cost');
const paymentMethodElement = document.getElementById('payment');
const creditCardInputs = document.getElementById('credit-card');
const form = document.querySelector('form');
const emailField = document.getElementById('email');
const creditCardNumField = document.getElementById('cc-num');
const zipField = document.getElementById('zip');
const cvvField = document.getElementById('cvv');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');


/**
 * Set form up
 */
nameField.focus();
jobRoleOtherField.hidden = true;
tshirtColorField.disabled = true;
paypal.hidden = true;
bitcoin.hidden = true;
paymentMethodElement.value = 'credit-card';
// Clearer focus states for activity checkboxes
for(let i = 0; i < activityCheckboxes.length; i++){
    activityCheckboxes[i].addEventListener('focus', () => {
        activityCheckboxes[i].parentElement.classList.add('focus');
    }); 
    activityCheckboxes[i].addEventListener('blur', () => {
        activityCheckboxes[i].parentElement.classList.remove('focus');
    });
}


/**
 * Prevent submission if validation fails
 */
form.addEventListener('submit', (e) => {
    console.log("Form submitted");
    if (validateForm() == false){
        e.preventDefault();
        console.log("Errors on form");
    } else {
        console.log("Form validation passed");
    }
});


/**
 * Set below fields to validate in real-time on keyup
 */
nameField.addEventListener('keyup', (e) => {if(e.code != 'Tab') {isValidName(e.target)}});
emailField.addEventListener('keyup', (e) => {if(e.code != 'Tab') {isValidEmail(e.target)}});
creditCardNumField.addEventListener('keyup', (e) => {if(e.code != 'Tab') {isValidCardNum(e.target)}});
zipField.addEventListener('keyup', (e) => {if(e.code != 'Tab') {isValidZip(e.target)}});
cvvField.addEventListener('keyup', (e) => {if(e.code != 'Tab') {isValidCVV(e.target)}});


/**
 * Listen for job role change and toggle the other role field
 */
jobRoleField.addEventListener('change', () => {
    if (jobRoleField.value == 'other') {
        jobRoleOtherField.hidden = false;
    } else {
        jobRoleOtherField.hidden = true;
    }
});


/**
 * Setup correct t-shirt color options when t-shirt theme changed
 */
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


/**
 * Total up the cost of activities when selections change
 */
activitiesFieldset.addEventListener('change', (e) => {
    let totalCost = 0;
    for (let i = 0; i < activityCheckboxes.length; i++) {
        if (activityCheckboxes[i].checked) {
            totalCost += parseInt(activityCheckboxes[i].getAttribute('data-cost'));
        }
    }
    activitiesTotalCost.innerText = `Total: $${totalCost}`;
});


/**
 * Disabled/Enable activites according to clashes on the event time
 */
activitiesFieldset.addEventListener('change', (e) => {
    const selectedActivity = e.target;
    const activityTime = selectedActivity.nextElementSibling.nextElementSibling;
    for (let i = 0; i < activityCheckboxes.length; i++) {
        if (selectedActivity.getAttribute('name') != activityCheckboxes[i].getAttribute('name') &&
            activityTime.textContent == activityCheckboxes[i].nextElementSibling.nextElementSibling.textContent) {
            if(selectedActivity.checked){
                activityCheckboxes[i].disabled = true;
                activityCheckboxes[i].parentElement.classList.add('disabled');
            } else {
                activityCheckboxes[i].disabled = false;
                activityCheckboxes[i].parentElement.classList.remove('disabled');
            }
        }
    }
});


/**
 * Show or hide payment detils for selected method of payment
 */
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
        let hintText = '';
        if(/^\s*$/.test(field.value)){
            hintText = 'Email field cannot be blank';
        } else {
            hintText = 'Email address must be formatted correctly';
        }
        showValidationHint(field, hintText);
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


function showValidationHint(element, hint='') {
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'inherit';
    if (hint) {element.parentElement.lastElementChild.textContent = hint;}
}

function showValidationSuccess(element) {
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = 'none';
}









