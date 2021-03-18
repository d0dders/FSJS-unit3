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


function isValidName(text) {
    return /\S+/.test(text);
}

function isValidEmail(email) {
    return /[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(email);
}

function isValidActivities() {
    let activitySelected = false;
    // Don't rely on total cost incase we ever have a free event
    for (let i = 0; i < activityCheckboxes.length; i++) {
        if (activityCheckboxes[i].checked) {
            activitySelected = true;
        }
    }
    return activitySelected;
}


const form = document.querySelector('form');
const emailField = document.getElementById('email');
form.addEventListener('submit', (e) => {
    console.log("Form submitted");
    console.log(`Name is valid: ${isValidName(nameField.value)}`);
    console.log(`Email is valid: ${isValidEmail(emailField.value)}`);
    console.log(`Acivities valid: ${isValidActivities()}`);
    if (isValidName(nameField.value) &&
        isValidEmail(emailField.value) &&
        isValidActivities()) 
    {
        e.preventDefault();
    }
});