// Contest compliance checks for a prompt.md.
//   node tools/checkprompt.js <prompt.md>
const fs = require('fs');
const p = process.argv[2];
const t = fs.readFileSync(p, 'utf8');
const chars = [...t].length;                 // code points, the fair reading of "znaků"
const utf16 = t.length;

const fences = [...t.matchAll(/```[\s\S]*?```/g)].map(m => m[0]);
const b64 = [...t.matchAll(/[A-Za-z0-9+/]{200,}={0,2}/g)];
const dataUri = [...t.matchAll(/data:[a-z]+\/[a-z0-9.+-]+;base64,/gi)];
// crude "is there pasted source code" probe
const codey = [...t.matchAll(/^\s*(function\s+\w+\s*\(|const\s+\w+\s*=\s*\(|<script|<!DOCTYPE|<div\b|=>\s*{)/gim)].map(m => m[0]);

const res = {
  file: p,
  chars, utf16,
  under_10000: chars <= 10000,
  headroom: 10000 - chars,
  code_fences: fences.length,
  base64_blobs: b64.length,
  data_uris: dataUri.length,
  code_like_lines: codey.length,
  code_like_samples: codey.slice(0, 5),
  words: t.split(/\s+/).filter(Boolean).length,
};
res.clean = res.under_10000 && res.code_fences === 0 && res.base64_blobs === 0 && res.data_uris === 0 && res.code_like_lines === 0;
console.log(JSON.stringify(res, null, 2));
