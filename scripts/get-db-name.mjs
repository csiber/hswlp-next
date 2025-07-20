import { parseWranglerConfig } from './utils/parse-wrangler.mjs';

const binding = process.argv[2];

try {
  const config = parseWranglerConfig();
  const db = binding
    ? config.d1_databases?.find((d) => d.binding === binding)
    : config.d1_databases?.[0];
  const dbName = db?.database_name;

  if (!dbName) {
    console.error('Database name not found in wrangler.jsonc');
    process.exit(1);
  }

  console.log(dbName);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
