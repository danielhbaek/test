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

// Function to replace text content safely inside <div> tags
function replaceTextInDivs() {
  console.log("Running text replacement inside <div> elements...");

  // Select all div elements
  const divs = document.querySelectorAll("div");

  divs.forEach((div) => {
    if (div.childNodes.length === 1 && div.childNodes[0].nodeType === Node.TEXT_NODE) {
      const originalText = div.textContent.trim();

      for (const [original, replacement] of Object.entries(replacements)) {
        if (originalText.includes(original)) {
          console.log(`Replacing "${original}" with "${replacement}" in element:`, div);
          div.textContent = originalText.replace(new RegExp(original, "g"), replacement);
        }
      }
    }
  });
}

// Observe changes and replace text only in <div> tags
function observeAppElement() {
  const app = document.getElementById("app");

  if (app) {
    console.log("App element detected: Setting up MutationObserver");

    // Initial replacement
    replaceTextInDivs();

    // Set up a MutationObserver to monitor changes
    const observer = new MutationObserver(() => {
      console.log("Mutation detected, re-running text replacement in <div> elements...");
      replaceTextInDivs();
    });

    // Observe the #app element and its subtree
    observer.observe(app, { childList: true, subtree: true });
    console.log("MutationObserver started for #app");
  } else {
    console.error("#app element not found! Retrying in 1 second...");
    setTimeout(observeAppElement, 1000);
  }
}

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded, starting script...");
  observeAppElement();
});
