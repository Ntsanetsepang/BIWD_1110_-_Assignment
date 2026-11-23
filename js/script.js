// script.js - javascript for my Lesotho website
// I used bootstrap for the layout and wrote the rest myself plus help of google ai

// ========= dark mode button =================
var themeButton = document.getElementById("themeToggle");

// the site always starts in light mode when it opens
themeButton.innerHTML = "🌙";

themeButton.onclick = function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeButton.innerHTML = "☀️";
  } else {
    themeButton.innerHTML = "🌙";
  }
};



// ================= search and filter (destinations page) =================
var searchBox = document.getElementById("destinationSearch");

if (searchBox) {
  var cards = document.querySelectorAll("[data-destination]");
  var filterButtons = document.querySelectorAll(".filter-btn");
  var chosenCategory = "all";

  // this hides the cards that dont match
  function showMatchingCards() {
    var text = searchBox.value.toLowerCase();

    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var category = card.getAttribute("data-category");
      var categoryOk = chosenCategory == "all" || category == chosenCategory;
      var textOk = card.textContent.toLowerCase().includes(text);

      if (categoryOk && textOk) {
        card.classList.remove("d-none");
      } else {
        card.classList.add("d-none");
      }
    }
  }

  searchBox.oninput = showMatchingCards;

  // when a filter button is clicked
  for (var j = 0; j < filterButtons.length; j++) {
    filterButtons[j].onclick = function () {
      for (var k = 0; k < filterButtons.length; k++) {
        filterButtons[k].classList.remove("active");
      }

      this.classList.add("active");
      chosenCategory = this.getAttribute("data-filter");
      showMatchingCards();
    };
  }
}






// ================ booking calculator (stays page) =================
var calculator = document.getElementById("bookingCalculator");

if (calculator) {
  var nightsInput = document.getElementById("nights");
  var guestsInput = document.getElementById("guests");
  var stayType = document.getElementById("stayType");
  var totalText = document.getElementById("bookingTotal");

  function updateTotal() {
    var nights = Number(nightsInput.value) || 0;
    var guests = Number(guestsInput.value) || 0;
    var rate = Number(stayType.value);

    totalText.innerHTML = "M " + (nights * guests * rate);
  }

  calculator.oninput = updateTotal;
  updateTotal();
}




// ================= check the forms (validation)================
var forms = document.querySelectorAll(".js-validated-form");

for (var f = 0; f < forms.length; f++) {
  forms[f].onsubmit = function (event) {
    event.preventDefault();

    // if something is wrong show the bootstrap error messages
    if (!this.checkValidity()) {
      this.classList.add("was-validated");

      var fields = this.querySelectorAll("input, select, textarea");
      for (var n = 0; n < fields.length; n++) {
        if (!fields[n].checkValidity()) {
          fields[n].focus();
          break;
        }
      }

      return;
    }

    var message = this.querySelector(".success-message");
    if (message) {
      message.classList.remove("d-none");
      message.scrollIntoView();
    }

    // save the name so we can welcome them back
    var nameField = this.querySelector('[name="name"]');
    if (nameField) {
      localStorage.setItem("lesothoVisitorName", nameField.value);
    }

    this.reset();
    this.classList.remove("was-validated");
  };
}




// ================ welcome message with the saved name =================
var savedName = localStorage.getItem("lesothoVisitorName");
var welcome = document.getElementById("welcomeMessage");

if (savedName && welcome) {
  welcome.textContent = "Welcome back, " + savedName + ". Your next adventure awaits.";
}
