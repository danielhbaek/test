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

// Function to walk through all text nodes in the DOM
function replaceTextInNode(node) {
  for (const [original, replacement] of Object.entries(replacements)) {
    node.nodeValue = node.nodeValue.replace(new RegExp(original, 'g'), replacement);
  }
}

// Walk through the DOM and replace text content
function walkDOM(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    replaceTextInNode(node);
  } else {
    node.childNodes.forEach(walkDOM);
  }
}

// Start replacing text on page load
walkDOM(document.body);
