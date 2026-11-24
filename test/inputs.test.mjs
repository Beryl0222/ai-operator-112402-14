import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const d = JSON.parse(readFileSync(new URL('../inputs/session.json', import.meta.url), 'utf8'));

test("每笔特征片可组齐并有有效标签", () => {
  assert.ok(d.strokes.every(x=>x.chunks.flatMap(c=>c[1]).length===d.featureCount&&d.classes.includes(x.label)));
});

test("同档近共线笔迹含不同标签", () => {
  assert.ok(d.strokes[0].writer===d.strokes[1].writer&&d.strokes[0].label!==d.strokes[1].label&&Math.abs(d.strokes[0].chunks[0][1][0]-d.strokes[1].chunks[0][1][0])<0.01);
});

test("样本明确区分未观测和零", () => {
  assert.ok(d.strokes[2].chunks[1][1].includes(null)&&d.strokes[0].chunks[0][1].includes(0));
});
