const fs = require('fs');
const path = require('path');

const target = path.join(
  __dirname,
  '..',
  'src',
  'generated',
  'prisma',
  'package.json',
);

fs.writeFileSync(target, JSON.stringify({ type: 'module' }, null, 2) + '\n');
console.log(`Wrote ${target}`);
