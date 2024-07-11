import passwordStrength from './js/index.js';

const passwordField = document.getElementById('pass');
const passwordStrengthMeter = document.getElementById('password-strength');

passwordField.addEventListener('input', () => {
    const strength = passwordStrength(passwordField.value);
    let strengthMessage = '';

    switch (strength.score) {
        case 0:
            strengthMessage = 'Very weak';
            break;
        case 1:
            strengthMessage = 'Weak';
            break;
        case 2:
            strengthMessage = 'Moderate';
            break;
        case 3:
            strengthMessage = 'Strong';
            break;
        case 4:
            strengthMessage = 'Very strong';
            break;
        default:
            strengthMessage = 'Unknown';
    }

    passwordStrengthMeter.innerHTML = `<div>${strengthMessage}</div>`;
});