const phone = document.getElementById('phone');
const message = document.getElementById('message');
const btnClear = document.getElementById('btn-clear');
const btnChat = document.getElementById('btn-chat');
const theme = document.getElementById('theme');
const github = document.getElementById('github');

const PAGE_LOAD_YES = true;
const PAGE_LOAD_NO = false;

const validPhoneNumberCharacters = '()+-., 0123456789';

// Add error colors
function addError() {
  phone.style.color = 'var(--error)';
  phone.style.borderColor = 'var(--error)';
}

// Remove error colors
function resetError() {
  phone.style.color = '';
  phone.style.borderColor = '';
}

// Clear form helper function
function clearForm() {
  resetError();

  phone.value = '';
  message.value = '';
}

// Open WhatsApp helper function
function chat() {
  let isValidPhone = true;

  if (phone.value && phone.value.length > 0) {
    for (let i = 0; i < phone.value.length; ++i) {
      if (!validPhoneNumberCharacters.includes(phone.value.charAt(i))) {
        isValidPhone = false;
        break;
      }
    }
  } else {
    isValidPhone = false;
  }

  if (isValidPhone) {
    let phoneNumber = phone.value.replace(/[^0-9]/g, '');

    if (phoneNumber && phoneNumber.length > 0) {
      let encodedText = encodeURI(message.value);

      window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`);

      resetError();
    } else {
      addError();
      setTimeout(() => resetError(), 2000);
    }
  } else {
    addError();
    setTimeout(() => resetError(), 2000);
  }
}

// Go to GitHub page
function browseCode() {
  window.open('https://github.com/patel-priyank/WhatsChat-Web');
}

// Enter button functionality
phone.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    btnChat.click();
  }
});

btnClear.addEventListener('click', clearForm);
btnChat.addEventListener('click', chat);
github.addEventListener('click', browseCode);

//#region Theming

// Set Light mode
function lightMode() {
  theme.children[0].classList.replace('fa-moon', 'fa-sun');
  localStorage.setItem('theme', 'light');
  document.documentElement.setAttribute('data-theme', 'light');
}

// Set Dark mode
function darkMode() {
  theme.children[0].classList.replace('fa-sun', 'fa-moon');
  localStorage.setItem('theme', 'dark');
  document.documentElement.setAttribute('data-theme', 'dark');
}

// Set Theme helper function
function setTheme(isPageLoad) {
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    let isDarkMode = currentTheme === 'dark';

    if (isDarkMode) {
      isPageLoad ? darkMode() : lightMode();
    } else {
      isPageLoad ? lightMode() : darkMode();
    }
  } else {
    let isDarkMode = window.matchMedia('prefers-color-scheme: dark').matches;

    if (isDarkMode) {
      isPageLoad ? darkMode() : lightMode();
    } else {
      isPageLoad ? lightMode() : darkMode();
    }
  }
}

// Set theme on click on button
theme.addEventListener('click', () => {
  setTheme(PAGE_LOAD_NO);
});

// Set theme on page load
setTheme(PAGE_LOAD_YES);

//#endregion
