(function () {
  const textFileURL = 'https://yourdomain.com/textfile.txt';

  function updateTitle() {
    const currentURL = window.location.href;

    fetch(textFileURL)
      .then(response => response.text())
      .then(data => {
        const urlMappings = parseTextFile(data);
        const newTitle = urlMappings[currentURL];

        if (newTitle) {
          document.title = newTitle;
        }
      })
      .catch(error => console.error('Error fetching or parsing the text file:', error));
  }

  function parseTextFile(data) {
    const lines = data.split('\n');
    const mappings = {};

    lines.forEach(line => {
      const [url, title] = line.split('|').map(item => item.trim());
      if (url && title) {
        mappings[url] = title;
      }
    });

    return mappings;
  }

  updateTitle();
})();
