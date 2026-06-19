// Dev-only helper: extract every JSON-LD block from the built dist/, parse it,
// and emit a canonical (recursively key-sorted) representation per page so two
// builds can be compared for SEMANTIC equality (key order independent).
// Usage: node scripts/ldcanon.mjs > snapshot.txt
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const sortKeys = (v) =>
  Array.isArray(v)
    ? v.map(sortKeys)
    : v && typeof v === 'object'
      ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, sortKeys(v[k])]))
      : v;

const walk = (dir) => {
  const out = [];
  for (const name of readdirSync(dir)) {
    const fp = join(dir, name);
    if (statSync(fp).isDirectory()) out.push(...walk(fp));
    else if (name.endsWith('.html')) out.push(fp);
  }
  return out;
};

const files = walk('dist').sort();
const lines = [];
for (const fp of files) {
  const html = readFileSync(fp, 'utf8');
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  blocks.forEach((m, i) => {
    let canon;
    try {
      canon = JSON.stringify(sortKeys(JSON.parse(m[1])));
    } catch {
      canon = 'PARSE_ERROR:' + m[1].slice(0, 80);
    }
    lines.push(`${fp.replace(/\\/g, '/')}#${i}\t${canon}`);
  });
}
process.stdout.write(lines.join('\n') + '\n');
process.stderr.write(`pages=${files.length} ldjson_blocks=${lines.length}\n`);
