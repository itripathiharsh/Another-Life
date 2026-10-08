// Local API server entry (Stage 4 backend).
// Store lives in packages/api/.data/saves (drive D, gitignored).
// Run from repo root: npm run api. PORT env, default 3001.

import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LifeService } from './service';
import { startApiServer } from './server';
import { FileSaveStore } from './store';

const here = fileURLToPath(new URL('.', import.meta.url));
const storeDir = join(here, '..', '.data', 'saves');
const port = Number(process.env['PORT'] ?? '3001');

const service = new LifeService(new FileSaveStore(storeDir));
const { port: actual } = await startApiServer(service, Number.isSafeInteger(port) ? port : 3001);
console.log(`LegacyLife API on http://127.0.0.1:${actual} (store: ${storeDir})`);
