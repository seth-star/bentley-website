const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const csvFilePath = path.join(__dirname, 'bentley_website-lzwl40ynq-shangos-projects_vercel_app_logs.csv');

const results = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    // Process the CSV data
    results.forEach((row) => {
      console.log(`Path: ${row.path_name}, Size: ${row.size}`);
    });
  });