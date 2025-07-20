import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const [type = 'local', name] = process.argv.slice(2);

if (!name) {
  console.error('Usage: node make-migration.mjs [local|global] <name>');
  process.exit(1);
}

const migrationsDir = path.resolve(__dirname, '..', 'migrations', type);
process.env.MIGRATIONS_DIR = migrationsDir;

execSync(`pnpm db:generate ${name}`, { stdio: 'inherit' });

const globalsPath = path.resolve(__dirname, '..', 'shared', 'globals.json');
const { GLOBAL_TABLES } = JSON.parse(fs.readFileSync(globalsPath, 'utf8'));

const files = fs
  .readdirSync(migrationsDir)
  .filter((f) => f.endsWith('.sql'))
  .map((f) => ({ file: f, time: fs.statSync(path.join(migrationsDir, f)).mtime }))
  .sort((a, b) => b.time - a.time);

if (files.length === 0) process.exit(0);
const latestFile = path.join(migrationsDir, files[0].file);
const content = fs.readFileSync(latestFile, 'utf8');

for (const table of GLOBAL_TABLES) {
  if (content.includes(table) && type !== 'global') {
    fs.unlinkSync(latestFile);
    console.error(`\u274c A(z) \`${table}\` tábla globális, nem módosítható a projekt-specifikus migrációk között!`);
    process.exit(1);
  }
}
