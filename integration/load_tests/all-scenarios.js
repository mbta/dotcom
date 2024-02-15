const fs = require("fs");
const path = require("path");

const { fileToMetricName } = require("../utils");

const filesPath = path.join(__dirname, "..", "scenarios");
const files = fs.readdirSync(filesPath);

files.forEach((file) => {
  const { scenario } = require(path.join(filesPath, file));

  exports[fileToMetricName(file)] = async function (page, context) {
    await scenario({ page, baseURL: context.vars.target });
  };
});
