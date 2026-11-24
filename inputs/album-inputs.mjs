import {readFileSync} from 'node:fs';
const data = JSON.parse(readFileSync(new URL('./album-inputs.json', import.meta.url), 'utf8'));
export function albumScore(index) {
  const pair = data.duplicates.find(([,b])=>b===index);
  const canonical=pair?pair[0]:index;
  const groups=data.groupQuota.map(([tag])=>tag);
  const group=data.groupOptions.some(([i])=>i===canonical)?'unknown':groups[(canonical*13+3)%groups.length];
  const s=data.manualScores.find(([i])=>i===canonical)?.[1] ?? ((index<512) ? 2 + Math.round(Math.cos((canonical+4)*.12)*32)/32 : ((index%27)-17)/11);
  return {canonical,index,device:index%2,group,s,weight:1+(canonical%11)/12};
}
export function albumObjective(canonical) {
  return Math.sin((canonical+7)*.031)/100;
}
