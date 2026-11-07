import { cp, mkdir, rm } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const path of ['src', 'docs', 'config', 'scripts', 'test', 'README.md', 'THE_ALUHA.md', 'CREDITS.md', 'LICENSE', 'package.json'])
  await cp(path, `dist/${path}`, { recursive: true });
console.log('Built portable source distribution in dist/. Requires Node.js 20+. Not a native game binary.');
