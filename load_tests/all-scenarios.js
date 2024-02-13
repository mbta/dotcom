const fs = require('fs');
const path = require('path');

const filesPath = path.join(__dirname, '..', 'scenarios');
const files = fs.readdirSync(filesPath);

const fileToName = (file) => file.replace(/-/g, '.').replace('.js', '').toLowerCase();

files.forEach((file) => {
  const { scenario } = require(path.join(filesPath, file));
console.log(scenario)
  exports[fileToName(file)] = async function(page, context) {
    await scenario({ page, baseURL: context.vars.target });
  };
});
