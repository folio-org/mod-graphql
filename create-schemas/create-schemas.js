#!/usr/bin/env node

const fs = require('fs');
const execSync = require('child_process').execSync;
const mergeJsonSchemas = require('merge-json-schemas');

if (process.argv.length !== 3) {
  console.error(`Usage: ${process.argv[1]} schemaconf.json`);
  process.exit(1);
}

const configName = process.argv[2];
const config = parseSchema(configName);
createSchemas(config);
process.exit(0);




function createSchemas(config) {
  config.forEach(moduleConfig => createModuleSchemas(moduleConfig));
}


function createModuleSchemas(moduleConfig) {
  const { module, release, overlays } = moduleConfig;

  obtainSchemas(module, release);

  if (overlays) {
    Object.keys(overlays).sort().forEach(schemaName => {
      const schemaOverlays = overlays[schemaName];
      handleOverlaysForSchema(module, schemaName, schemaOverlays);
    });
  }
}


function obtainSchemas(module, release) {
  console.log(`Obtaining schemas for ${module} v${release}`);

  // There may be a better way to do this, but cloning the source from
  // a well-known GitHub organization, checking out the relevant
  // release tag, and removing all but the `raml` directory will
  // suffice for now. It's fragile, though.
  system(`git clone git@github.com:folio-org/${module}`);
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


function handleOverlay(jsonPath, overlay) {
  console.log(`  Handling overlay at ${jsonPath}`);

  if (typeof overlay === 'string') {
    overlay = expandOverlaySummary(overlay);
  }

  console.log(`   -- jsonPath='${jsonPath}'`);
  // XXX insert
}


// Example: "callnumbertype.json call-number-types?id=itemLevelCallNumberTypeId callNumberTypes.0"
function expandOverlaySummary(summary) {
  const regexp = /^(.*?) (.*?)\?(.*?)=(.*?) (.*)$/;
  const res = summary.match(regexp);
  if (!res) {
    throw(Error(`bad overlay summary: '${summary}'`));
  }

  const [ undefined, schemaRef, linkBase, linkFromField, linkToField, includedElement ] = res;
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
  fs.writeFileSyc(fileName, schemaText, 'utf8');
}


function system(command) {
  const output = execSync(command);
  console.log(`  -- ${command}`);
  process.stdout.write(output);
}
