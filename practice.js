/* ================= PRACTICE MODE: say "Hashem" instead of Hashem's holy name while learning ================= */
(function(){
const on=()=>S.practice!==false;
// Sound-outs (English letters)
const RX=[[/A-do-n(?:oi|ai)/g,"Hashem"],[/A·do·n(?:oi|ai)/g,"Ha·shem"],[/E-lo-h/g,"E-lo-k"],[/E·lo·h/g,"E·lo·k"],[/e-lo-h/g,"e-lo-k"]];
const fixSay=s=>typeof s==="string"?RX.reduce((t,[a,b])=>t.replace(a,b),s):s;
// Spoken Hebrew: the four-letter name and A-do-noi become "Hashem"; Elo-h-im becomes Elo-k-im
const NIQ=/[֑-ׇ]/g;
function fixHe(text){ return String(text).split(/(\s+)/).map(tok=>{ const bare=tok.replace(NIQ,"").replace(/[,.:;!?״׳]/g,"");
  if(bare==="יי"||bare==="אדני"||bare==="יהוה") return tok.replace(/[^\s,.:;!?]+/,"הַשֵּׁם");
  return tok.replace(/(א[֑-ׇ]*לֹ)ה/g,"$1ק") }).join("") }
window.practiceSpeak=t=>on()?fixHe(t):t;

/* Swap the sound-outs in the shared tables, keeping the originals so the switch can go back */
const ORIG=new Map();
function swapAll(){
  try{ ACC.forEach(e=>{ if(e[1]!=="say") return; if(!ORIG.has(e)) ORIG.set(e,[e[2],e[3]]); const [a,s]=ORIG.get(e); e[2]=on()?fixSay(a):a; e[3]=on()?fixSay(s):s }) }catch(err){}
  try{ (typeof GEN_SET!=="undefined"?GEN_SET:[]).forEach(g=>{ const o=g.girl; if(!o) return; if(!ORIG.has(o)) ORIG.set(o,[o.say,o.sef]); const [a,s]=ORIG.get(o); o.say=on()?fixSay(a):a; o.sef=on()?fixSay(s):s }) }catch(err){}
  try{ applyAccent() }catch(err){}
  try{ if(!$("view").hidden) renderPrayer() }catch(err){}
}

/* Every spoken word goes through speechSynthesis.speak (already wrapped by the Sound switch); fix the text first */
const ss=window.speechSynthesis;
if(ss){ const prev=ss.speak.bind(ss); ss.speak=function(u){ try{ if(on()&&u&&u.text) u.text=fixHe(u.text) }catch(e){} return prev(u) } }

/* Settings switch */
$("aDone").insertAdjacentHTML("beforebegin",`<div class="arow" data-noglo><span><b>🙏 Practice mode</b><small>While learning, shows and says <b>“Hashem”</b> instead of Hashem's holy name. Turn it off only when davening for real.</small></span><button class="sw" id="swPr" type="button" role="switch"></button></div>`);
function paint(){ $("swPr").setAttribute("aria-checked",String(on())) }
$("swPr").onclick=()=>{ S.practice=!on(); save(); paint(); swapAll(); toast(on()?"Practice mode on: we'll say “Hashem”":"Practice mode off") };
paint(); swapAll();
})();
