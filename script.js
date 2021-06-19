const phone = document.getElementById('phone');
const message = document.getElementById('message');
const btnClear = document.getElementById('btn-clear');
const btnChat = document.getElementById('btn-chat');
const theme = document.getElementById('theme');
const github = document.getElementById('github');

const errorAnimation = 'animate__shakeX';
const clearAnimation = 'animate__flipInX';

const PAGE_LOAD_YES = true;
const PAGE_LOAD_NO = false;

const validPhoneNumberCharacters = '()+-., 0123456789';

function addError() {
  phone.classList.add(errorAnimation);
  phone.style.color = 'var(--error)';
  phone.style.borderColor = 'var(--error)';
}

function resetError() {
  phone.style.color = '';
  phone.style.borderColor = '';
}

function focusPhone() {
  phone.selectionStart = phone.selectionEnd = phone.value.length;
  phone.focus();
}

function lightMode() {
  theme.children[0].classList.replace('fa-moon', 'fa-sun');
  localStorage.setItem('theme', 'light');
  document.documentElement.setAttribute('data-theme', 'light');
}

function darkMode() {
  theme.children[0].classList.replace('fa-sun', 'fa-moon');
  localStorage.setItem('theme', 'dark');
  document.documentElement.setAttribute('data-theme', 'dark');
}

function clearForm() {
  resetError();

  phone.value = '';
  message.value = '';

  phone.classList.add(clearAnimation);
  message.classList.add(clearAnimation);
}

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
    }
  } else {
    addError();
  }
}

function switchTheme(isPageLoad) {
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

function browseCode() {
  window.open('https://github.com/patel-priyank/WhatsChat-Web');
}

phone.addEventListener('animationend', () => {
  if (phone.classList.contains(errorAnimation)) {
    phone.classList.remove(errorAnimation);
    resetError();
    focusPhone();
  }

  if (phone.classList.contains(clearAnimation)) {
    phone.classList.remove(clearAnimation);
    focusPhone();
  }
});

message.addEventListener('animationend', () => {
  if (message.classList.contains(clearAnimation)) {
    message.classList.remove(clearAnimation);
  }
});

btnClear.addEventListener('click', clearForm);
btnChat.addEventListener('click', chat);
github.addEventListener('click', browseCode);

theme.addEventListener('click', () => {
  switchTheme(PAGE_LOAD_NO);
});

switchTheme(PAGE_LOAD_YES);
focusPhone();
