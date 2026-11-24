import {readFileSync} from 'node:fs';
import * as input from './inputs/album-inputs.mjs';

const source=JSON.parse(readFileSync(new URL('./inputs/album-inputs.json',import.meta.url),'utf8'));
console.log(JSON.stringify({名称:'相册训练目标和分组资料',首项:source['n'],字段:Object.keys(source),取数函数:Object.keys(input)},null,2));
