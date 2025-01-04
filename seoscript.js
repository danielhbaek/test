(function () {
  const titleXmlFileURL = 'https://raw.githubusercontent.com/danielhbaek/test/refs/heads/main/mappings.xml';
  const linkXmlFileURL = 'https://raw.githubusercontent.com/danielhbaek/test/refs/heads/main/link-mappings.xml';

  function updateTitle() {
    const currentURL = normalizeURL(window.location.href);

    console.log('Current URL:', currentURL); // Log the current page URL

    fetch(titleXmlFileURL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.text();
      })
      .then(data => {
        console.log('Fetched XML data for title:', data); // Log raw XML content for title

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'application/xml');

        if (xmlDoc.getElementsByTagName('parsererror').length) {
          throw new Error('Error parsing title XML file');
        }

        const urlMappings = parseTitleMappings(xmlDoc);

        console.log('Parsed URL mappings:', urlMappings); // Log parsed mappings

        const newTitle = urlMappings[currentURL];

        if (newTitle) {
          console.log('Setting new title:', newTitle); // Log the new title
          document.title = newTitle;
        } else {
          console.warn('No matching title found for the current URL');
        }

        // Add link replacement functionality after title update
        addLinksFromXML();
      })
      .catch(error => console.error('Error fetching or processing the title XML file:', error));
  }

  function parseTitleMappings(xmlDoc) {
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

  function addLinksFromXML() {
    fetch(linkXmlFileURL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.text();
      })
      .then(data => {
        console.log('Fetched XML data for links:', data); // Log raw XML content for links

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'application/xml');

        if (xmlDoc.getElementsByTagName('parsererror').length) {
          throw new Error('Error parsing link XML file');
        }

        const linkMappings = parseLinkMappings(xmlDoc);

        console.log('Parsed link mappings:', linkMappings); // Log parsed link mappings

        // Replace strings in the content with links
        addLinksToPage(linkMappings);
      })
      .catch(error => console.error('Error fetching or processing the link XML file:', error));
  }

  function parseLinkMappings(xmlDoc) {
    const linkElements = xmlDoc.getElementsByTagName('link');
    const mappings = [];

    for (let i = 0; i < linkElements.length; i++) {
      const text = linkElements[i].getElementsByTagName('text')[0].textContent.trim();
      const url = linkElements[i].getElementsByTagName('url')[0].textContent.trim();

      if (text && url) {
        mappings.push({ text, url });
      }
    }

    return mappings;
  }

  function addLinksToPage(linkMappings) {
    const paragraphs = document.querySelectorAll('p'); // Select all paragraph elements

    paragraphs.forEach(paragraph => {
      let paragraphText = paragraph.innerHTML;

      linkMappings.forEach(mapping => {
        const { text, url } = mapping;

        // Check if the text exists in the paragraph
        const regex = new RegExp(`\\b${text}\\b`, 'i'); // Match whole words, case insensitive
        if (regex.test(paragraphText)) {
          console.log(`Found "${text}" in paragraph:`, paragraphText);

          // Replace the first occurrence of the text with a link
          paragraphText = paragraphText.replace(regex, `<a href="${url}" target="_blank">${text}</a>`);
          paragraph.innerHTML = paragraphText;
        }
      });
    });
  }

  function normalizeURL(url) {
    return url.replace(/\/$/, ''); // Normalize by removing trailing slash
  }

  // Call the title update and link replacement functions
  updateTitle();
})();
