(function () {
  const xmlFileURL = 'https://raw.githubusercontent.com/danielhbaek/test/refs/heads/main/mappings.xml';

  function updateTitle() {
    const currentURL = normalizeURL(window.location.href);

    console.log('Current URL:', currentURL); // Log the current page URL

    fetch(xmlFileURL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.text();
      })
      .then(data => {
        console.log('Fetched XML data:', data); // Log raw XML content test

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'application/xml');

        if (xmlDoc.getElementsByTagName('parsererror').length) {
          throw new Error('Error parsing XML file');
        }

        const urlMappings = parseXMLFile(xmlDoc);

        console.log('Parsed URL mappings:', urlMappings); // Log parsed mappings

        const newTitle = urlMappings[currentURL];

        if (newTitle) {
          console.log('Setting new title:', newTitle); // Log the new title
          document.title = newTitle;
        } else {
          console.warn('No matching title found for the current URL');
        }

        // Add the new functionality after the title is updated
        addLinkToProductFeed();
      })
      .catch(error => console.error('Error fetching or processing the XML file:', error));
  }

  function parseXMLFile(xmlDoc) {
    const urlElements = xmlDoc.getElementsByTagName('url');
    const mappings = {};

    for (let i = 0; i < urlElements.length; i++) {
      const location = urlElements[i].getElementsByTagName('location')[0].textContent;
      const title = urlElements[i].getElementsByTagName('title')[0].textContent;

      if (location && title) {
        mappings[normalizeURL(location.trim())] = title.trim();
      }
    }

    return mappings;
  }

  function normalizeURL(url) {
    return url.replace(/\/$/, ''); // Normalize by removing trailing slash
  }

  // New function: Add a link to the first instance of "product feed"
  function addLinkToProductFeed() {
    const targetText = 'product feed';
    const linkURL = 'https://www.feedseo.com/';
    const paragraphs = document.querySelectorAll('p'); // Select all paragraphs on the page

    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i];
      const paragraphText = paragraph.innerHTML;

      // Find the first instance of "product feed"
      const index = paragraphText.toLowerCase().indexOf(targetText);
      if (index !== -1) {
        console.log(`Found "${targetText}" in paragraph:`, paragraphText);

        // Replace the first instance with a link
        const beforeText = paragraphText.slice(0, index);
        const matchText = paragraphText.slice(index, index + targetText.length);
        const afterText = paragraphText.slice(index + targetText.length);

        paragraph.innerHTML = `${beforeText}<a href="${linkURL}" target="_blank">${matchText}</a>${afterText}`;
        console.log(`Updated paragraph:`, paragraph.innerHTML);
        break; // Stop after updating the first instance
      }
    }
  }

  updateTitle();
})();
