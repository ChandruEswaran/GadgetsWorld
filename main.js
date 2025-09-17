document.addEventListener('DOMContentLoaded', () =>  {
    const form = document.getElementById('formup');
    const inputs = form.querySelectorAll('input');
    const passwordInput = form.querySelector('#password');

    const strengthMeter = document.createElement('div');
    strengthMeter.style.height = '8px';
    strengthMeter.style.borderRadius = '5px';
    strengthMeter.style.marginTop = '5px';
    strengthMeter.style.backgroundColor = '#ddd';
    strengthMeter.style.transition = 'width 0.3s ease, background-color 0.3s ease';
    passwordInput.insertAdjacentElement('afterend', strengthMeter);

    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.textContent = 'Show';
    toggleBtn.style.marginLeft = '10px';
    toggleBtn.style.padding = '5px 10px';
    toggleBtn.style.fontSize = '0.9rem';
    toggleBtn.style.cursor = 'pointer';
    passwordInput.insertAdjacentElement('afterend', toggleBtn);

    toggleBtn.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = 'Hide';
      } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = 'Show';
      }
    });

    function checkPasswordStrength(password) {
      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[\W]/.test(password)) strength++;

      switch (strength) {
        case 0:
        case 1:
          return { color: 'red', width: '25%', text: 'Weak' };
        case 2:
          return { color: 'orange', width: '50%', text: 'Fair' };
        case 3:
          return { color: 'yellowgreen', width: '75%', text: 'Good' };
        case 4:
          return { color: 'green', width: '100%', text: 'Strong' };
      }
    }

    passwordInput.addEventListener('input', () => {
      const val = passwordInput.value;
      if (!val) {
        strengthMeter.style.width = '0';
        strengthMeter.style.backgroundColor = '#ddd';
        strengthMeter.title = '';
        return;
      }
      const strength = checkPasswordStrength(val);
      strengthMeter.style.width = strength.width;
      strengthMeter.style.backgroundColor = strength.color;
      strengthMeter.title = `Password strength: ${strength.text}`;
    });

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.validity.valid) {
          input.style.borderColor = 'green';
        } else {
          input.style.borderColor = 'red';
        }
      });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();

      let allValid = true;
      inputs.forEach(input => {
        if (!input.checkValidity()) {
          input.style.borderColor = 'red';
          allValid = false;
        }
      });

      if (!allValid) {
        alert('Please fill out all fields correctly.');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      setTimeout(() => {
        alert('Form submitted successfully! Thank you.');
        form.reset();
        strengthMeter.style.width = '0';
        strengthMeter.style.backgroundColor = '#ddd';
        inputs.forEach(input => (input.style.borderColor = '#ccc'));
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
      }, 2000);
    });
  });