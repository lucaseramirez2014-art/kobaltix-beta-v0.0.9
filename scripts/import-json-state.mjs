#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
const file = process.argv[2] ?? 'data/store.json';
const state = JSON.parse(await readFile(file, 'utf8'));
const keys = ['repositories','tasks','activity','analyses','architectures','rules','findings'];
const report = Object.fromEntries(keys.map(k => [k, Array.isArray(state[k]) ? { records: state[k].length, ids: state[k].filter(x => x && x.id).map(x => x.id).length } : { records: 0, ids: 0 }]));
console.log(JSON.stringify({ mode: 'dry-run', source: file, idempotent: true, report }, null, 2));
