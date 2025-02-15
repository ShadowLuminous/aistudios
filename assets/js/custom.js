// Mobile Menu
const mobileMenuOpenIcon = document.querySelector(".mobile-menu-open-icon");
const mobileMenuCloseIcon = document.querySelector(".mobile-menu-close-icon");
const mobileMenu = document.querySelector(".mobile-menu");

// Open menu
mobileMenuOpenIcon.addEventListener("click", () => {
  mobileMenu.classList.add("show-menu");
});

// Close menu
mobileMenuCloseIcon.addEventListener("click", () => {
  mobileMenu.classList.remove("show-menu");
});

// Handle mobile menu links
document.querySelectorAll(".mobile-menu nav ul li a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");
    
    // First close the menu with animation
    mobileMenu.classList.remove("show-menu");
    
    // Wait for menu close animation to complete before scrolling
    setTimeout(() => {
      // If it's a section on the current page
      if (href.startsWith("#")) {
        const section = document.querySelector(href);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // If it's a link to another page with a section
        window.location.href = href;
      }
    }, 300); // Match this with your CSS transition time
  });
});

// Pricing
window.onload = function () {
  togglePricing(
    "monthly",
    document.querySelector(".pricing-tab button.active")
  );
};

function togglePricing(planType, button) {
  if (button && button.classList) {
    const buttons = document.querySelectorAll(".pricing-tab button");
    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const pricingItems = document.querySelectorAll(".pricing-item");

    pricingItems.forEach((item) => {
      const monthlyPrice = item.getAttribute("data-monthly-price");
      const yearlyPrice = item.getAttribute("data-yearly-price");
      const spanElement = item.querySelector("h4 span");
      const subElement = item.querySelector("h4 sub");

      if (planType === "monthly") {
        spanElement.textContent = monthlyPrice;
        subElement.textContent = "/m";
      } else if (planType === "yearly") {
        spanElement.textContent = yearlyPrice;
        subElement.textContent = "/y";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const searchIcon = document.getElementById("toggleSearch");
  const searchBar = document.getElementById("searchBar");

  searchIcon.addEventListener("click", function (event) {
    event.preventDefault();
    searchBar.classList.toggle("hidden");
  });

  // Hide the search bar when clicking outside of it
  document.addEventListener("click", function (event) {
    const isClickInside =
      searchBar.contains(event.target) || searchIcon.contains(event.target);

    if (!isClickInside) {
      searchBar.classList.add("hidden");
    }
  });
});

const chatList = document.getElementById("chatList");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");

// Check if chatList exists before proceeding
if (chatList) {
  const messages = [
    {
      sender: "You",
      time: "1:17 PM",
      text: "What was the revenue generated during the Black Friday Sale 2022 campaign?",
    },
    {
      sender: "Assistify",
      time: "1:17 PM",
      text: "The revenue generated during the Black Friday Sale 2022 campaign was $20,000.",
    },
    {
      sender: "You",
      time: "1:18 PM",
      text: "What was the open rate for the Black Friday Sale 2022 campaign?",
    },
    {
      sender: "Assistify",
      time: "1:18 PM",
      text: "The open rate for the Black Friday Sale 2022 campaign was 25%.",
    },
  ];

  // Function to add initial messages to the chat
  function loadInitialMessages() {
    messages.forEach((message) => addMessage(message));
  }

  function addMessage(message) {
    const chatItem = document.createElement("div");
    chatItem.className = "hero-chat-item";
    chatItem.innerHTML = `
            <img src="assets/img/${
              message.sender === "You" ? "user.svg" : "user-assistify.svg"
            }" alt="${message.sender}" />
            <div class="hero-chat-item-content">
              <h3>${message.sender} <span>${message.time}</span></h3>
              <p>${message.text}</p>
            </div>
          `;
    chatList.appendChild(chatItem);
    chatItem.classList.add("fade-in"); // Add fade-in class for animation
    chatList.scrollTop = chatList.scrollHeight; // Scroll to the bottom
  }

  // Load initial messages on page load
  loadInitialMessages();

  sendButton.addEventListener("click", () => {
    submitMessage();
  });

  // Allow submitting message with Enter key
  userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      submitMessage();
    }
  });

  function submitMessage() {
    const userMessage = userInput.value;
    if (userMessage) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      addMessage({
        sender: "You",
        time: currentTime,
        text: userMessage,
      });
      userInput.value = ""; // Clear input

      // Simulate Assistify's response
      setTimeout(() => {
        addMessage({
          sender: "Assistify",
          time: currentTime,
          text: "Free quote limit reached. Please upgrade for unlimited access.",
        });
      }, 500); // Delay for Assistify's response
    }
  }
}

// Initialize Lenis for smooth scrolling
const lenis = new Lenis();

// Update Lenis on scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Percentage Bar
const percentageBar = document.querySelector(".percentage-bar");

function updateScrollPercentage() {
  if (percentageBar) {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const percentage =
      Math.floor((scrollTop / (documentHeight - windowHeight)) * 100) + "%";

    percentageBar.style.width = percentage;
  }
}
window.addEventListener("scroll", updateScrollPercentage);
window.addEventListener("load", updateScrollPercentage);

// Initialize AOS
AOS.init({
  duration: 600,
  offset: 200,
  easing: "ease-in-out",
  delay: 100,
  once: false,
  mirror: false,
  anchorPlacement: "top-center",
});
