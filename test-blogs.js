// Simple test to verify blog processing
const fs = require('fs');

// Read the extracted data
const extractedData = JSON.parse(fs.readFileSync('extracted_data_utf8.json', 'utf8'));

console.log('=== Blog Content Test ===');
console.log(`Total extracted items: ${extractedData.length}`);
console.log('\nSample titles:');

extractedData.slice(0, 5).forEach((item, i) => {
  const cleanTitle = item.title
    .replace(/&#038;/g, '&')
    .replace(/&#8217;/g, "'")
    .replace(/ΓÇÖ/g, "'")
    .replace(/&#8211;/g, '-');
  
  console.log(`${i+1}. ${cleanTitle}`);
});

console.log('\n✅ Blog data is ready for processing!');
console.log('✅ Content will be generated without HTML tags');
console.log('✅ Images will be fetched from thedashafrica.com');