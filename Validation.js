/*-----------Getting the ID's----------- */
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const strengthMsg = document.getElementById("strengthMsg");

const togglePassword = document.getElementById("togglePassword");
const clearBtn = document.getElementById("clearBtn");

/* ---------- Validation ---------- */
function validateName() {
    if (nameInput.value.trim() === "") {
        nameError.classList.remove("hidden");
        return false;
    }
    nameError.classList.add("hidden");
    return true;
}

function validateEmail() {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(emailInput.value)) {
        emailError.classList.remove("hidden");
        return false;
    }
    emailError.classList.add("hidden");
    return true;
}

function validatePassword() {
    if (passwordInput.value.length < 6) {
        passwordError.classList.remove("hidden");
        return false;
    }
    passwordError.classList.add("hidden");
    return true;
}

function validateForm() {
    const valid =
        validateName() &&
        validateEmail() &&
        validatePassword();

    submitBtn.disabled = !valid;
    submitBtn.classList.toggle("opacity-50", !valid);
    submitBtn.classList.toggle("cursor-not-allowed", !valid);
}

/* ----------  Strength Password  ---------- */
function checkStrength(password) {
    let strength = 0;

    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[@$!%*?&#]/.test(password)) strength++;

    if (password.length === 0) {
        strengthMsg.textContent = "";
        return;
    }
    if (strength <= 1) {
        strengthMsg.textContent = "Low password strength";
        strengthMsg.className = "text-sm mt-1 text-red-400";
    } else if (strength <= 3) {
        strengthMsg.textContent = "Medium password strength";
        strengthMsg.className = "text-sm mt-1 text-yellow-400";
    } else {
        strengthMsg.textContent = "Strong password strength";
        strengthMsg.className = "text-sm mt-1 text-green-400";
    }
}

nameInput.addEventListener("input", validateForm);
emailInput.addEventListener("input", validateForm);
passwordInput.addEventListener("input", () => {
    validateForm();
    checkStrength(passwordInput.value);
});

/* Show / Hide Password */
togglePassword.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";

    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
});

/* Clear Button */
clearBtn.addEventListener("click", () => {
    document.getElementById("registerForm").reset();
    submitBtn.disabled = true;
    submitBtn.classList.add("opacity-50", "cursor-not-allowed");
    nameError.classList.add("hidden");
    emailError.classList.add("hidden");
    passwordError.classList.add("hidden");
    strengthMsg.textContent = "";
});

/* Submit */
document.getElementById("registerForm").addEventListener("submit", e => {
    e.preventDefault();
    alert("Registration Successful!!!");
});
