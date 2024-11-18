'use strict';

/**
 * Add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

/**
 * Navbar toggle
 */

const navToggler = document.querySelector("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

// Toggle text visibility and button text for the first card
document.getElementById('read-more-1').addEventListener('click', function (event) {
  event.preventDefault();
  const moreText1 = document.getElementById('more-text-1');

  if (moreText1.style.display === "none") {
    moreText1.style.display = "block"; // Show the extra text
    this.textContent = 'Read Less'; // Change button text to 'Read Less'
  } else {
    moreText1.style.display = "none"; // Hide the extra text
    this.textContent = 'Read More'; // Change button text back to 'Read More'
  }
});

// Toggle text visibility and button text for the second card
document.getElementById('read-more-2').addEventListener('click', function (event) {
  event.preventDefault();
  const moreText2 = document.getElementById('more-text-2');

  if (moreText2.style.display === "none") {
    moreText2.style.display = "block"; // Show the extra text
    this.textContent = 'Read Less'; // Change button text to 'Read Less'
  } else {
    moreText2.style.display = "none"; // Hide the extra text
    this.textContent = 'Read More'; // Change button text back to 'Read More'
  }
});

// Toggle text visibility and button text for the third card
document.getElementById('read-more-3').addEventListener('click', function (event) {
  event.preventDefault();
  const moreText3 = document.getElementById('more-text-3');

  if (moreText3.style.display === "none") {
    moreText3.style.display = "block"; // Show the extra text
    this.textContent = 'Read Less'; // Change button text to 'Read Less'
  } else {
    moreText3.style.display = "none"; // Hide the extra text
    this.textContent = 'Read More'; // Change button text back to 'Read More'
  }
});

fetch('https://api.openweathermap.org/data/2.5/weather?q=Astana&units=metric&appid=3c2b60ccc507a85663211812d9ad34d9')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const description = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    document.getElementById('weather').textContent = `
    Weather in Astana: ${description}, 
    Temperature: ${temperature}°C, 
    Humidity: ${humidity}%, 
    Wind Speed: ${windSpeed} m/s
  `;
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
    document.getElementById('weather').textContent = 'Error fetching weather data. Please try again later.';
  });

/**
 * Activate header when window scrolls down 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
};

window.addEventListener("scroll", activeElemOnScroll);

addEventOnElem(window, "scroll", activeElemOnScroll);

// Create an Audio object once
const audio = new Audio('/assets/music/Yellow.mp3');

const soundBtn = document.getElementById('sound-btn');
soundBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Prevents link navigation

  if (audio.paused) {
    audio.play().catch(error => console.error('Error playing audio:', error));
  } else {
    audio.pause();
    audio.currentTime = 0; // Reset playback to the beginning
  }
});

// "Back to Top" button
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    backToTopBtn.classList.add("active");
  } else {
    backToTopBtn.classList.remove("active");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

document.addEventListener("DOMContentLoaded", function() {
  function setRating(ratingWrapper, rating) {
      const stars = ratingWrapper.querySelectorAll(".star ion-icon");
      stars.forEach((star, index) => {
          star.setAttribute("name", index < rating ? "star" : "star-outline");
      });
  }

  document.querySelectorAll(".rating-wrapper").forEach(ratingWrapper => {
      ratingWrapper.addEventListener("click", (event) => {
          if (event.target.closest(".star")) {
              const rating = Array.from(ratingWrapper.children).indexOf(event.target.closest(".star")) + 1;
              setRating(ratingWrapper, rating);
              alert(`You rated this product ${rating} star(s)!`);
          }
      });
  });
});

// Registration form functionality
const userBtn3 = document.getElementById('user-btn3');
const registerModal3 = document.getElementById('register-modal3');
const closeRegister3 = document.getElementById('close-register3');
const registerForm3 = document.getElementById('register-form3');
const successMessage3 = document.getElementById('success-message3');

userBtn3.addEventListener('click', () => {
  registerModal3.style.display = 'flex';
});

closeRegister3.addEventListener('click', () => {
  registerModal3.style.display = 'none';
  successMessage3.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === registerModal3) {
    registerModal3.style.display = 'none';
    successMessage3.style.display = 'none';
  }
});

registerForm3.addEventListener('submit', (event) => {
  event.preventDefault();
  successMessage3.style.display = 'block';
  registerForm3.reset();
});

// FAQ functionality
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    this.parentElement.classList.toggle("active");

    var pannel = this.nextElementSibling;

    if (pannel.style.display === "block") {
      pannel.style.display = "none";
    } else {
      pannel.style.display = "block";
    }
  });
}

// Function to save user data
function registerUser(username, email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const existingUser = users.find(user => user.username === username);

  if (existingUser) {
    alert('A user with this username already exists!');
    return false;
  }

  users.push({ username, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registration successful!');
  return true;
}

// Handle registration form submission
document.getElementById('register-form3').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username3').value;
  const email = document.getElementById('email3').value;
  const password = document.getElementById('password3').value;

  if (registerUser(username, email, password)) {
    document.getElementById('register-modal3').style.display = 'none';
  }
});

// Function to log in
function loginUser(username, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    alert('Login successful!');
    return true;
  } else {
    alert('Invalid username or password!');
    return false;
  }
}

// Example login button event
document.querySelector('.navbar-action-btn').addEventListener('click', function(event) {
  event.preventDefault();
  const username = prompt('Enter username:');
  const password = prompt('Enter password:');

  loginUser(username, password);
});

// Function to log out
function logoutUser() {
  localStorage.removeItem('loggedInUser');
  alert('You have been logged out');
}

// Example logout button event
document.querySelector('.logout-btn').addEventListener('click', logoutUser);

// Check login state on page load
document.addEventListener('DOMContentLoaded', () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const loginBtn = document.querySelector('.navbar-action-btn');
  const logoutBtn = document.querySelector('.logout-btn');

  if (loggedInUser) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline';
  } else {
    loginBtn.style.display = 'inline';
    logoutBtn.style.display = 'none';
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Переменные для элементов навигации
  const navToggleBtn = document.querySelector(".nav-toggle-btn");
  const navbar = document.querySelector("[data-navbar]");
  const navLinks = document.querySelectorAll("[data-nav-link]");

  // Открыть/Закрыть навигационное меню при нажатии на кнопку
  if (navToggleBtn && navbar) {
      navToggleBtn.addEventListener("click", () => {
          navbar.classList.toggle("active");
          navToggleBtn.classList.toggle("active");
      });
  }

  // Закрытие меню при нажатии на любую ссылку в меню
  navLinks.forEach((link) => {
      link.addEventListener("click", () => {
          if (navbar.classList.contains("active")) {
              navbar.classList.remove("active");
              navToggleBtn.classList.remove("active");
          }
      });
  });
});
