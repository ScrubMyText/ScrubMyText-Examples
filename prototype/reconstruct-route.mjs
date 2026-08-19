// Reference implementation for POST /v1/reconstruct.
// Adapt `callModel` to the model provider already used by the ScrubMyText API.

const MODES = {
  light: { temperature: 0.5, instruction: 'Rewrite clearly while preserving meaning. Change wording and sentence construction where natural.' },
  strong: { temperature: 0.75, instruction: 'Reconstruct the passage from its underlying meaning. Change wording, syntax, sentence boundaries, transitions, and information ordering where possible.' },
  reconstruct: { temperature: 0.9, instruction: 'First infer the factual/semantic representation of the passage, then write it independently from that representation. Do not imitate the source sentence-by-sentence. Preserve facts, numbers, proper nouns, quotations, citations, qualifications, and intent.' }
};

function tokens(s) { return (s.toLowerCase().match(/[a-z0-9']+/g) || []); }
function lexicalChange(a,b) {
  const A = new Set(tokens(a)), B = new Set(tokens(b));
  if (!A.size && !B.size) return 0;
  let overlap=0; for (const x of A) if (B.has(x)) overlap++;
  return 1 - overlap / Math.max(A.size,B.size);
}
function sentenceLengths(s){return s.split(/(?<=[.!?])\s+/).filter(Boolean).map(x=>tokens(x).length)}
function structuralChange(a,b){
  const A=sentenceLengths(a),B=sentenceLengths(b); if(!A.length||!B.length)return 0;
  const countDelta=Math.min(1,Math.abs(A.length-B.length)/Math.max(A.length,B.length));
  const avg=x=>x.reduce((p,c)=>p+c,0)/x.length;
  const lenDelta=Math.min(1,Math.abs(avg(A)-avg(B))/Math.max(avg(A),avg(B),1));
  return Math.min(1,.35*countDelta+.65*lenDelta+lexicalChange(a,b)*.45);
}

export async function reconstruct({ text, mode='strong', callModel }) {
  if (typeof text !== 'string' || !text.trim()) throw new Error('text is required');
  if (text.length > 50000) throw new Error('text is too long');
  const cfg=MODES[mode]||MODES.strong;
  const system=`You are a semantic reconstruction engine. ${cfg.instruction}\n\nRules:\n- Preserve factual meaning.\n- Never invent facts, sources, quotations, dates, names, numbers, or citations.\n- Preserve direct quotations verbatim unless the user explicitly asks otherwise.\n- Preserve the user's intended tone and level of formality.\n- Return only the reconstructed text.\n- Do not claim that any watermark, detector signal, or provenance marker has been removed.`;
  const output=await callModel({system,input:text,temperature:cfg.temperature});
  return {text:output,mode,metrics:{lexical_change:lexicalChange(text,output),structural_change:structuralChange(text,output)},verification:{watermark_removed:null,claim:'not_tested'}};
}

// Express-style example:
// app.post('/v1/reconstruct', async (req,res) => {
//   try { res.json(await reconstruct({ ...req.body, callModel })); }
//   catch (e) { res.status(400).json({ error: e.message }); }
// });
