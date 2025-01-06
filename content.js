// Define a mapping of text to replace with pet supply-related examples
const replacements = {
  "Blog": "Pet Care Blog",
  "Tools": "Pet Care Tools",
  "FAQ": "Pet FAQ",
  "PIM": "Pet Inventory Management",
  "/tools/ai-content-detector": "/products/dog-food-detector",
  "/blog/chatgpt-detector-tools": "/blog/top-dog-training-tools",
  "/blog/ai-replacing-jobs-statistics": "/blog/pet-adoption-statistics",
  "/tools/ai-keyword-tool": "/tools/pet-name-generator",
  "/ai-content-detector": "/pet-health-checker",
  "/tools/keyword-rank-checker": "/tools/popular-pet-toys",
  "/blog/chatgpt-prompts-for-seo": "/blog/tips-for-pet-grooming",
  "/tools/google-website-rank-checker": "/tools/find-vet-locations",
  "/blog/the-best-gpts": "/blog/top-pet-care-products",
  "/tools/ai-title-generator": "/tools/pet-store-name-generator",
  "/tools": "/products",
  "/blog/how-many-people-use-google": "/blog/how-many-people-own-pets",
  "/ai-chip-makers": "/microchip-suppliers",
  "/tools/domain-rating": "/tools/pet-insurance-calculator",
  "/blog/how-to-make-chatgpt-undetectable": "/blog/how-to-choose-pet-friendly-vacations"
};

// Alert to confirm the script is running
alert("Content script is running on this page!");

// Log the current URL to confirm the script is attached to the right page
console.log("Content script loaded on:", window.location.href);

// Function to replace text in a node
function replaceTextInNode(node) {
  for (const [original, replacement] of Object.entries(replacements)) {
    if (node.nodeValue.includes(original)) {
      console.log(`Replacing "${original}" with "${replacement}"`);
      node.nodeValue = node.nodeValue.replace(new RegExp(original, 'g'), replacement);
    }
  }
}

// Walk through the DOM and replace text
function walkDOM(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    console.log(`Text node detected: "${node.nodeValue.trim()}"`);
    replaceTextInNode(node);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    node.childNodes.forEach(walkDOM);
  }
}

// Observe the #app element for dynamic changes
function observeAppElement() {
  const app = document.getElementById("app");

  if (app) {
    console.log("App element detected: Starting text replacement");

    // Replace text in the initial render
    walkDOM(app);

    // Set up a MutationObserver to monitor for changes
    const observer = new MutationObserver((mutations) => {
      console.log("MutationObserver triggered:", mutations);
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            console.log("New element added:", node);
            walkDOM(node);
          } else if (node.nodeType === Node.TEXT_NODE) {
            console.log("New text node added:", node.nodeValue.trim());
            replaceTextInNode(node);
          }
        });
      });
    });

    // Observe changes in the #app element and its subtree
    observer.observe(app, { childList: true, subtree: true });
    console.log("MutationObserver started for #app");
  } else {
    console.error("#app element not found! Retrying in 1 second...");
    setTimeout(observeAppElement, 1000); // Retry after 1 second if #app is not found
  }
}

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded, starting script...");
  observeAppElement();
});
