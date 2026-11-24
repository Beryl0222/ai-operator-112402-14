import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import { albumScore, albumObjective } from '../inputs/album-inputs.mjs';

const data=JSON.parse(readFileSync(new URL('../inputs/album-inputs.json',import.meta.url),'utf8'));
test('相册训练目标和分组资料的格式与关联', () => {
  const a = albumScore(51), b = albumScore(190);
  assert.equal(a.canonical,b.canonical);
  assert.notEqual(a.device,b.device);
  assert.ok(data.groupQuota.reduce((a,q)=>a+q[1],0)<=data.selected);
  assert.ok(data.groupQuota.reduce((a,q)=>a+q[2],0)>=data.selected);
  assert.ok(data.scratchBytes<data.n**2*4);
  assert.ok(data.assignments.some(a=>a[0]==='unknown'));
  assert.ok(albumScore(142).s>2.9);
  assert.equal(albumScore(142).group,"unknown");
});
