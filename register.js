// Get the form elements
const form = document.getElementById('register-form');
const passwordField = document.getElementById('password');
const confirmPasswordField = document.getElementById('confirm-password');
const passwordStrength = document.getElementById('password-strength');
const togglePasswordButton = document.getElementById('toggle-password');

// Password Strength Meter Function
function checkPasswordStrength(password) {
    let strength = 0;
    const regexes = [
        /[a-z]/,    // Lowercase letter
        /[A-Z]/,    // Uppercase letter
        /[0-9]/,    // Number
        /[!@#$%^&*(),.?":{}|<>]/, // Special characters
    ];

    regexes.forEach((regex) => {
        if (regex.test(password)) {
            strength++;
        }
    });

    let strengthText = "";
    if (strength === 0) {
        strengthText = "Weak";
        passwordStrength.style.color = "red";
    } else if (strength <= 2) {
        strengthText = "Medium";
        passwordStrength.style.color = "orange";
    } else {
        strengthText = "Strong";
        passwordStrength.style.color = "green";
    }
    passwordStrength.textContent = `Strength: ${strengthText}`;
}

// Toggle Password Visibility
togglePasswordButton.addEventListener('click', () => {
    const isPasswordVisible = passwordField.type === "text";
    passwordField.type = isPasswordVisible ? "password" : "text";
    confirmPasswordField.type = isPasswordVisible ? "password" : "text";
    togglePasswordButton.textContent = isPasswordVisible ? "👁️" : "🙈";
});

// Form Validation
form.addEventListener('submit', function(event) {
    // Check if passwords match
    if (passwordField.value !== confirmPasswordField.value) {
        alert("Passwords do not match!");
        event.preventDefault();  // Prevent form submission
    }
});

// Real-time Password Strength Check
passwordField.addEventListener('input', function() {
    checkPasswordStrength(passwordField.value);
});
