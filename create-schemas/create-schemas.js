#!/usr/bin/env node

const getopts = require("getopts")
const fs = require('fs');
const execSync = require('child_process').execSync;
const jp = require('jsonpath');

const options = getopts(process.argv.slice(2), {
  boolean: ['help', 'fetch', 'rewrite', 'overlay'],
  alias: {
    h: "help",
  },
  default: {
    fetch: false,
    rewrite: false,
    overlay: false,
  }
})

if (options.help || options._.length !== 1) {
  console.error(`Usage: ${process.argv[1]} [--(no-)fetch] [--(no-)rewrite] [--(no-)overlay] schemaconf.json`);
  process.exit(1)
}

const configName = options._[0];
const config = parseSchema(configName);
createSchemas(config, options);
process.exit(0);




function createSchemas(config, options) {
  config.forEach(moduleConfig => createModuleSchemas(moduleConfig, options));
}


function createModuleSchemas(moduleConfig, options) {
  const { module, release, overlays } = moduleConfig;

  if (options.fetch) {
    system(`rm -rf ${module}`);
  }
  if (!fs.existsSync(module)) {
    obtainSchemas(module, release);
  }

  if ((options.rewrite || options.overlay) && overlays) {
    Object.keys(overlays).sort().forEach(schemaName => {
      if (options.overlay) {
        handleOverlaysForSchema(module, schemaName, overlays[schemaName]);
      } else {
        console.log(` Skipping overlays for schema ${schemaName}`);
      }
    });
  }
}


function obtainSchemas(module, release) {
  console.log(`Obtaining schemas for ${module} v${release}`);

  // There may be a better way to do this, but cloning the source from
  // a well-known GitHub organization, checking out the relevant
  // release tag, and removing all but the `raml` directory will
  // suffice for now. It's fragile, though.
  system(`git clone --recurse-submodules https://github.com/folio-org/${module}`);
  process.chdir(module);
  system(`git checkout --quiet v${release}`);
  process.chdir('..');
  system(`mv ${module}/ramls .`);
  system(`rm -rf ${module}`);
  system(`mkdir ${module}`);
  system(`mv ramls ${module}`);
}


function handleOverlaysForSchema(module, schemaName, schemaOverlays) {
  console.log(` Handling overlays for schema ${schemaName}`);

  const schema = parseSchema(`${module}/ramls/${schemaName}`);

  Object.keys(schemaOverlays).sort().forEach(jsonPath => {
    const overlay = schemaOverlays[jsonPath];
    handleOverlay(schema, jsonPath, overlay);
  });

  writeSchema(`${module}/ramls/${schemaName}`, schema);
}


function handleOverlay(schema, jsonPath, overlay) {
  console.log(`  Handling overlay at ${jsonPath}`);

  if (typeof overlay === 'string') {
    overlay = expandOverlaySummary(overlay);
  }

  const res = jsonPath.match(/(.*)\.(.*)/);
  let basePath, insertAs;
  if (res) {
    basePath = `$.properties.${res[1]}`;
    insertAs = res[2];
  } else {
    basePath = '$.properties';
    insertAs = jsonPath;
  }

  const target = jp.query(schema, basePath);
  if (target.length === 0) {
    console.warn(`*** could not find basePath ${basePath}`);
  } else {
    console.log(`   -- jsonPath='${jsonPath}' -> (${basePath}, ${insertAs})`);
    target[0][insertAs] = overlay;
  }
}


// Example: "callnumbertype.json call-number-types?id=itemLevelCallNumberTypeId callNumberTypes.0"
function expandOverlaySummary(summary) {
  const regexp = /^(.*?) (.*?)\?(.*?)=(.*?) (.*)$/;
  const res = summary.match(regexp);
  if (!res) {
    throw(Error(`bad overlay summary: '${summary}'`));
  }

  const [ undefined, schemaRef, linkBase, linkToField, linkFromField, includedElement ] = res;
  return {
    'type': 'object',
    'folio:$ref': schemaRef,
    'readonly': true,
    'folio:isVirtual': true,
    'folio:linkBase': linkBase,
    'folio:linkFromField': linkFromField,
    'folio:linkToField': linkToField,
    'folio:includedElement': includedElement,
  }
}




function parseSchema(fileName) {
  const schemaText = fs.readFileSync(fileName, 'utf8');
  return JSON.parse(schemaText);
}


function writeSchema(fileName, schemaObj) {
  const schemaText = JSON.stringify(schemaObj, null, 2);
  fs.writeFileSync(fileName, schemaText, 'utf8');
}


function system(command) {
  const output = execSync(command);
  console.log(`  -- ${command}`);
  process.stdout.write(output);
}
