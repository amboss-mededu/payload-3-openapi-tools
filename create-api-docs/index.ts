import type { RawOptions } from '../openapi/options';
import generateDocs from './generate-docs';
import { importPayloadConfig } from './importPayloadConfig';
const generatorOptions: RawOptions = {
  disableAccessAnalysis: true,
  exclude: {
    authPaths: true,
    authCollection: true,
    passwordRecovery: true,
    preferences: true,
  }
}

const configPath = process.argv[2];

const importedConfig = await importPayloadConfig(configPath);

console.log("Generating OpenAPI docs");

generateDocs(importedConfig, undefined, generatorOptions);

console.log("OpenAPI docs generated");