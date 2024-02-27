#!/usr/bin/env node

/* eslint-disable no-console, no-use-before-define, no-param-reassign */

const getopts = require('getopts');
const fs = require('fs');
const execSync = require('child_process').execSync;
const jp = require('jsonpath');

const globalOptions = getopts(process.argv.slice(2), {
  boolean: ['help', 'fetch', 'rewrite', 'overlay'],
  alias: {
    h: 'help',
  },
  default: {
    fetch: false,
    rewrite: false,
    overlay: false,
  }
});

if (globalOptions.help || globalOptions._.length !== 1) {
  console.error(`Usage: ${process.argv[1]} [--(no-)fetch] [--(no-)rewrite] [--(no-)overlay] schemaconf.json`);
  process.exit(1);
}

const configName = globalOptions._[0];
const globalConfig = parseSchema(configName);
createSchemas(globalConfig, globalOptions);
process.exit(0);




function createSchemas(config, options) {
  config.forEach(moduleConfig => createModuleSchemas(moduleConfig, options));
}


function createModuleSchemas(moduleConfig, options) {
  const { module, release, ramlPath, copyFiles, overlays } = moduleConfig;

  if (options.fetch) {
    system(`rm -rf ${module}`);
  }
  if (!fs.existsSync(module)) {
    obtainSchemas(module, release, ramlPath);
  }

  if (options.rewrite || options.overlay) {
    if (copyFiles) {
      copyFiles.forEach(entry => {
        system(`cp -r ${entry} ${module}/ramls/`);
      });
    }

    if (overlays) {
      Object.keys(overlays).sort().forEach(schemaName => {
        if (options.overlay) {
          handleOverlaysForSchema(module, schemaName, overlays[schemaName]);
        } else {
          console.log(` Skipping overlays for schema ${schemaName}`);
        }
      });
    }
  }
}


function obtainSchemas(module, release, ramlPath) {
  console.log(`Obtaining schemas for ${module} ${release}`);

  // There may be a better way to do this, but cloning the source from
  // a well-known GitHub organization, checking out the relevant
  // release tag, and removing all but the `raml` directory will
  // suffice for now. It's fragile, though.
  system(`git clone --recurse-submodules https://github.com/folio-org/${module}`);
  process.chdir(module);
  system(`git checkout --quiet ${release}`);
  system('git submodule update --init --recursive');
  process.chdir('..');
  system(`mv ${module}/${ramlPath || 'ramls'} ramls`);
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
    throw Error(`bad overlay summary: '${summary}'`);
  }

  // eslint-disable-next-line no-unused-vars
  const [__UNUSED, schemaRef, linkBase, linkToField, linkFromField, includedElement] = res;
  const virtualFields = {
    'readonly': true,
    'folio:isVirtual': true,
    'folio:linkBase': linkBase,
    'folio:linkFromField': linkFromField,
    'folio:linkToField': linkToField,
    'folio:includedElement': includedElement,
  };

  if (schemaRef.endsWith('[]')) {
    return {
      'type': 'array',
      'items': {
        'type': 'object',
        '$ref': schemaRef.substring(0, schemaRef.length - 2)
      },
      ...virtualFields
    };
  } else {
    return {
      'type': 'object',
      'folio:$ref': schemaRef,
      ...virtualFields
    };
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
