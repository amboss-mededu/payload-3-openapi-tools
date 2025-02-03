import fs from 'fs/promises';
import path from 'path';

import { importPayloadConfig } from '@/utilities/importPayloadConfig';
import { createDocument, type Options } from '../openapi';

const importedConfig = await importPayloadConfig();

const generateDocs = async (outputPath = 'doc/spec.json', options?: Options) => {
  const apiDocs = await createDocument(importedConfig, options);

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(apiDocs, null, 2), 'utf-8');
};

export default generateDocs;
