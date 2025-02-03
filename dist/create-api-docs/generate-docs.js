import fs from 'fs/promises';
import path from 'path';
import { createDocument } from '../openapi';
const generateDocs = async (payloadConfig, outputPath = 'doc/spec.json', options) => {
    const apiDocs = await createDocument(payloadConfig, options);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify(apiDocs, null, 2), 'utf-8');
};
export default generateDocs;
