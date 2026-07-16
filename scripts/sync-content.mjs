import { access, cp, mkdir, readdir, rm } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';

const collection = process.argv[2];
const sources = {
  posts: process.env.CONTENT_POSTS_DIR ?? join(homedir(), 'Documents/second-brain/Publishing/posts'),
  til: process.env.CONTENT_TIL_DIR ?? join(homedir(), 'Documents/second-brain/Publishing/til'),
};

if (!(collection in sources)) {
  throw new Error(`Unknown collection: ${collection}. Use "posts" or "til".`);
}

const source = resolve(sources[collection]);
const destination = resolve(`src/content/${collection}`);

if (source === destination) {
  throw new Error(`CONTENT_${collection.toUpperCase()}_DIR must not be ${destination}.`);
}

try {
  await access(source);
} catch {
  throw new Error(
    `${collection} source directory not found: ${source}\n` +
      `Set CONTENT_${collection.toUpperCase()}_DIR to the vault directory.`,
  );
}

await mkdir(destination, { recursive: true });
for (const entry of await readdir(destination)) {
  await rm(join(destination, entry), { recursive: true, force: true });
}

await cp(source, destination, { recursive: true, dereference: true });
console.log(`Synced ${collection} content: ${source} → ${destination}`);
