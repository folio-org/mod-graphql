const fs = require('fs');
const yaml = require('js-yaml');
const Logger = require('../configuredLogger');


function listAPIs(apiFile, maybeDir, maybeSkip, maybeMatch, maybeExclude) {
  const dir = maybeDir || process.env.RAML_DIR || '.';
  const skip = maybeSkip !== undefined ? maybeSkip :
    process.env.RAML_SKIP !== undefined ? parseInt(process.env.RAML_SKIP, 10) :
      false;
  const match = maybeMatch || process.env.RAML_MATCH || undefined;
  const exclude = maybeExclude || process.env.RAML_EXCLUDE || undefined;

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
      } else if (exclude && name.match(exclude)) {
        logger.log('exclude', `excluding matching module ${name}`);
      } else if (skip && !fs.existsSync(`${pathPrefix}/${name}`)) {
        logger.log('skip', `absent module ${name}`);
      } else {
        module.forEach((section, i) => {
          if (section.multiple) {
            logger.log('nomulti', `omitting module '${name}' section ${i + 1} (${section.directory})`);
          } else if (!section.files) {
            console.warn(`no files for module '${name}' section ${i + 1} (${section.directory})`);
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
