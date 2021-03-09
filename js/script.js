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
console.log(tshirtDesignOptions);
tshirtColorField.disabled = true;
tshirtDesignField.addEventListener('change', () => {
    if (tshirtDesignField.value = "js puns") {

    } else if (tshirtDesignField.value = "heart js") {

    }
});