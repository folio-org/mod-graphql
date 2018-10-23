const fs = require('fs');
const yaml = require('js-yaml');
const Logger = require('../configuredLogger');


function listAPIs(apiFile, maybeDir, maybeSkip, maybeMatch) {
  const dir = maybeDir || process.env.RAML_DIR || '.';
  const skip = maybeSkip !== undefined ? maybeSkip :
    process.env.RAML_SKIP !== undefined ? parseInt(process.env.RAML_SKIP, 10) :
      false;
  const match = maybeMatch || process.env.RAML_MATCH || undefined;

  const logger = new Logger();
  const ramlFiles = [];
  const pathPrefix = dir || '.';
  let dfault;

  const modules = yaml.safeLoad(fs.readFileSync(apiFile, 'utf8'));

  // For some reason, these come back to us in the order specified in the file
  const moduleNames = Object.keys(modules);
  moduleNames.forEach(name => {
    if (name === 'default') {
      // Should be first;
      if (dfault) throw new Error('multiple "default" entries in API YAML');
      dfault = modules[name];
    } else {
      if (!dfault) throw new Error('no initial "default" entry in API YAML');
      const module = modules[name];
      if (match && !name.match(match)) {
        logger.log('nomatch', `omitting non-matching module ${name}`);
      } else if (skip && !fs.existsSync(`${pathPrefix}/${name}`)) {
        logger.log('skip', `absent module ${name}`);
      } else {
        module.forEach((section, i) => {
          if (!section.files) {
            console.warn(`no files for module '${name}' section ${i + 1}:`, section);
          } else {
            section.files.forEach(ramlName => {
              ramlFiles.push(`${pathPrefix}/${name}/${section.directory}/${ramlName}.raml`);
            });
          }
        });
      }
    }
  });

  logger.log('ramllist', `${ramlFiles.length} RAML files:`, JSON.stringify(ramlFiles, null, 2));

  return ramlFiles;
}


exports.listAPIs = listAPIs;
