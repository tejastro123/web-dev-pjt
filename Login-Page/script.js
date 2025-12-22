// Toggle password visibility
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
  // Toggle the type attribute
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  
  // Toggle the icon (can be swapped with a different icon if you like)
  togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
});

// Form validation
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  let valid = true;

  // Clear any previous errors
  usernameError.textContent = '';
  passwordError.textContent = '';
  errorMessage.textContent = '';

  // Validate username (simple validation)
  if (usernameInput.value.trim() === '') {
    usernameError.textContent = 'Username is required';
    valid = false;
  }

  // Validate password (simple validation)
  if (passwordInput.value.trim() === '') {
    passwordError.textContent = 'Password is required';
    valid = false;
  }

  // Final check
  if (valid) {
    // For demonstration, just log the user in or display a success message
    alert('Login successful');
    loginForm.reset();
    togglePassword.textContent = '👁️'; // Reset the password toggle icon
  } else {
    errorMessage.textContent = 'Please fix the errors above and try again.';
  }
});
