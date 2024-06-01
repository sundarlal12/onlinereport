const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the HTML content you want to convert to PDF
    const htmlContent = `
      <html>
        <head>
          <title>Generated PDF</title>
        </head>
        <body>
          <h1>Hello, World!</h1>
          <p>This is a PDF generated by an API using Puppeteer.</p>
        </body>
      </html>
    `;

    // Navigate to the HTML content
    await page.setContent(htmlContent);

    // Generate the PDF
    const pdfBuffer = await page.pdf({ format: 'A4' });

    // Close the browser instance
    await browser.close();

    // Set the header for the PDF download
    res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
    res.setHeader('Content-Disposition', 'inline; filename=output.pdf');


    // Send the PDF buffer as a response
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});