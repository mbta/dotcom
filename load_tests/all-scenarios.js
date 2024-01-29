const fs = require('fs');
const path = require('path');

const filesPath = path.join(__dirname, '..', 'scenarios');
const files = fs.readdirSync(filesPath);

files.forEach((file) => {
    const { scenario } = require(path.join(filesPath, file));

    exports[`${file.replace('.js', '')}`] = async function(page, context) {
        await scenario.run({ page, baseURL: context.vars.target });
    };
});
