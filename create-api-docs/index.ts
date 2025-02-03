import type { RawOptions } from '../openapi/options';
import generateDocs from './generate-docs';

const generatorOptions: RawOptions = {
  disableAccessAnalysis: true,
  exclude: {
    authPaths: true,
    authCollection: true,
    passwordRecovery: true,
    preferences: true,
  }
}

console.log("Generating OpenAPI docs");

generateDocs(undefined, generatorOptions);

console.log("OpenAPI docs generated");