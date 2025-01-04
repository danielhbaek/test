(function () {
  const xmlFileURL = 'https://raw.githubusercontent.com/danielhbaek/test/refs/heads/main/mappings.xml';

  function updateTitle() {
    const currentURL = window.location.href;

    fetch(xmlFileURL)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'application/xml');
        const urlMappings = parseXMLFile(xmlDoc);
        const newTitle = urlMappings[currentURL];

        if (newTitle) {
          document.title = newTitle;
        }
      })
      .catch(error => console.error('Error fetching or parsing the XML file:', error));
  }

  function parseXMLFile(xmlDoc) {
    const urlElements = xmlDoc.getElementsByTagName('url');
    const mappings = {};

    for (let i = 0; i < urlElements.length; i++) {
      const location = urlElements[i].getElementsByTagName('location')[0].textContent;
      const title = urlElements[i].getElementsByTagName('title')[0].textContent;

      if (location && title) {
        mappings[location.trim()] = title.trim();
      }
    }

    return mappings;
  }

  updateTitle();
})();
