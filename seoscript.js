{\rtf1\ansi\ansicpg1252\cocoartf2758
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 (function () \{\
  const textFileURL = 'https://yourdomain.com/textfile.txt';\
\
  function updateTitle() \{\
    const currentURL = window.location.href;\
\
    fetch(textFileURL)\
      .then(response => response.text())\
      .then(data => \{\
        const urlMappings = parseTextFile(data);\
        const newTitle = urlMappings[currentURL];\
\
        if (newTitle) \{\
          document.title = newTitle;\
        \}\
      \})\
      .catch(error => console.error('Error fetching or parsing the text file:', error));\
  \}\
\
  function parseTextFile(data) \{\
    const lines = data.split('\\n');\
    const mappings = \{\};\
\
    lines.forEach(line => \{\
      const [url, title] = line.split('|').map(item => item.trim());\
      if (url && title) \{\
        mappings[url] = title;\
      \}\
    \});\
\
    return mappings;\
  \}\
\
  updateTitle();\
\})();\
}