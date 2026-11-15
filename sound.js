/* ================= MASTER SOUND: when Sound is off, Shlomo's voice is off too ================= */
(function(){
const ss=window.speechSynthesis; if(!ss) return;
const realSpeak=ss.speak.bind(ss);
// Every spoken word goes through speechSynthesis.speak. With Sound off, skip it but still tell the
// app the word "finished", so read-along and buttons keep moving instead of waiting forever.
ss.speak=function(u){ if(S.sound) return realSpeak(u);
  setTimeout(()=>{ try{ u.onstart&&u.onstart(new Event("start")) }catch(e){} try{ u.onend&&u.onend(new Event("end")) }catch(e){} try{ u.dispatchEvent&&u.dispatchEvent(new Event("end")) }catch(e){} },0) };
// Settings: Shlomo's voice shows as off (and can't be switched) while Sound is off, just like Music
const _pb=paintBar; paintBar=function(){ _pb(); const b=$("swVoice"); if(!b) return; const v=S.voice!==false&&!!HEV;
  b.setAttribute("aria-checked",String(v&&!!S.sound)); b.disabled=!S.sound };
const _ss=setSound; setSound=function(on){ if(!on){ try{ ss.cancel() }catch(e){} } _ss(on) };
paintBar();
})();

/* ================= YOUR LEVEL: tap to see all the levels ================= */
(function(){
const btn=$("rankBtn"); if(!btn||typeof RANKS==="undefined") return;
const MEAN={"New Talmid":"Talmid means <b>student</b>. Everyone starts here!","Aleph-Bais Star":"You're shining with your Hebrew letters.","Siddur Scholar":"You really know your way around the siddur.","Yeshiva Ace":"You learn like a real yeshiva bochur!","Chacham":"Chacham means <b>wise person</b>. The top level!"};
document.body.insertAdjacentHTML("beforeend",`<div class="shsheet" id="lvSheet" data-noglo hidden><div class="shsh-in" role="dialog" aria-label="Your level">
  <button class="glx" id="lvX" type="button" aria-label="Close">✕</button><h3 class="fg-h" style="margin:0">Your level</h3>
  <p style="margin:0;font-family:var(--text);font-size:1.05rem">Earn <b>gelt</b> by learning prayers, letters, the parsha, mitzvos and more. The more gelt you earn, the higher your level!</p>
  <div id="lvList" style="display:flex;flex-direction:column;gap:8px"></div></div></div>`);
function render(){ const g=S.gelt||0; let cur=0; RANKS.forEach((r,i)=>{ if(g>=r[0]) cur=i });
  $("lvList").innerHTML=RANKS.map((r,i)=>{ const got=g>=r[0], now=i===cur, nx=i===cur+1;
    return `<div class="lvrow${now?" now":""}${got?" got":""}"><span class="rank">${r[2]}</span><div><b>${r[1]}${now?" · <em>you are here</em>":""}</b><small>${MEAN[r[1]]||""}</small>
      <span class="lvg">${got?(i===0?"Start":"✓ Reached at "+r[0]+" gelt"):nx?`${r[0]-g} more gelt to go (needs ${r[0]})`:`Needs ${r[0]} gelt`}</span></div></div>` }).join("") }
btn.onclick=()=>{ try{ sfx.pop() }catch(e){} render(); $("lvSheet").hidden=false };
$("lvX").onclick=()=>{ $("lvSheet").hidden=true };
$("lvSheet").onclick=e=>{ if(e.target.id==="lvSheet") $("lvSheet").hidden=true };
document.head.insertAdjacentHTML("beforeend",`<style>
.statbtn{border:0;font:inherit;color:inherit;text-align:left;cursor:pointer}
.statbtn:active{transform:scale(.97)}
.statlbl{display:block;font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--gold)}
.lvrow{display:grid;grid-template-columns:38px 1fr;gap:12px;align-items:center;background:var(--klaf);border:2px solid var(--rule);border-radius:14px;padding:10px 12px;opacity:.7}
.lvrow.got{opacity:1}.lvrow.now{border-color:var(--gold-hi);background:color-mix(in srgb,var(--gold-hi) 14%,var(--klaf));opacity:1}
.lvrow .rank{width:34px;height:34px;border-radius:9px;background:var(--tech);color:#ffd77a;display:grid;place-items:center;font-family:var(--he);font-weight:700;font-size:1.2rem}
.lvrow b{display:block;font-family:var(--display);font-weight:400;font-size:1.15rem;color:var(--tech)}
.lvrow b em{font-style:normal;font-family:var(--say);font-size:.8rem;font-weight:700;color:var(--gold)}
.lvrow small{display:block;font-size:.88rem;color:var(--ink);line-height:1.35}
.lvrow small b{display:inline;font-family:inherit;font-size:inherit;color:var(--tech)}
.lvg{display:block;font-size:.8rem;font-weight:700;color:var(--muted);margin-top:2px}
.lvrow.got .lvg{color:var(--good)}
</style>`);
})();

/* ================= FOLLOW THE YAD: show a little yad and explain the word ================= */
(function(){
const ICON=`<svg class="yadico" viewBox="0 0 34 100" aria-hidden="true"> <defs><linearGradient id="ySilB" x1="0" x2="1"><stop offset="0" stop-color="#9aa3b5"/><stop offset=".45" stop-color="#ffffff"/><stop offset="1" stop-color="#7f889c"/></linearGradient> <linearGradient id="yGldB" x1="0" x2="1"><stop offset="0" stop-color="#b8851f"/><stop offset=".5" stop-color="#ffe29a"/><stop offset="1" stop-color="#a87618"/></linearGradient> <radialGradient id="yGemB" cx=".35" cy=".3"><stop offset="0" stop-color="#bcd3ff"/><stop offset=".5" stop-color="#2f5fd0"/><stop offset="1" stop-color="#132c74"/></radialGradient></defs> <path d="M8 15 Q-3 36 10 54" fill="none" stroke="url(#yGldB)" stroke-width="1.7" stroke-dasharray="2.2 1.5" stroke-linecap="round"/> <path d="M10 12 L9 4 L13 8 L17 2 L21 8 L25 4 L24 12Z" fill="url(#yGldB)" stroke="#8a6212" stroke-width=".6"/> <circle cx="17" cy="2.2" r="1.7" fill="#fff3c4"/><circle cx="9" cy="4" r="1.1" fill="#fff3c4"/><circle cx="25" cy="4" r="1.1" fill="#fff3c4"/> <rect x="9" y="11.5" width="16" height="3.5" rx="1.5" fill="url(#yGldB)"/> <rect x="14" y="15" width="6" height="48" rx="2" fill="url(#ySilB)" stroke="#6d768a" stroke-width=".5"/> <path d="M14 20 l6 -3 M14 26 l6 -3 M14 49 l6 -3 M14 55 l6 -3 M14 61 l6 -3" stroke="#c9ced9" stroke-width=".8"/> <rect x="12.5" y="22" width="9" height="3" rx="1.4" fill="url(#yGldB)"/> <ellipse cx="17" cy="33" rx="4.8" ry="6.2" fill="url(#yGldB)" stroke="#8a6212" stroke-width=".5"/> <ellipse cx="17" cy="33" rx="3" ry="4.2" fill="url(#yGemB)"/><circle cx="15.8" cy="31" r="1.1" fill="#fff"/> <rect x="12.5" y="41" width="9" height="3" rx="1.4" fill="url(#yGldB)"/> <path d="M12 62 L22 62 L25 70 L9 70Z" fill="url(#yGldB)" stroke="#8a6212" stroke-width=".6"/><path d="M10.5 66.5 h13" stroke="#fff3c4" stroke-width=".8" opacity=".85"/> <path d="M13 69.5 L22 69.5 C24.6 72 25.6 76 25.2 79.5 C24.8 83 23.5 85.3 21 85.8 L15 85.8 C13 85 12.2 82 12.3 78 C12.4 74.5 12.6 72 13 69.5Z" fill="url(#ySilB)" stroke="#6d768a" stroke-width=".6"/> <rect x="18.4" y="80.6" width="2.8" height="6.8" rx="1.4" fill="url(#ySilB)" stroke="#6d768a" stroke-width=".5"/><rect x="21" y="80.3" width="2.6" height="6" rx="1.3" fill="url(#ySilB)" stroke="#6d768a" stroke-width=".5"/><rect x="23.3" y="79.8" width="2.2" height="4.8" rx="1.1" fill="url(#ySilB)" stroke="#6d768a" stroke-width=".5"/> <path d="M15.2 82 C15 88 15.3 94 15.5 97.2 C15.8 99.4 18.2 99.4 18.5 97.2 C18.7 94 19 88 18.8 82Z" fill="url(#ySilB)" stroke="#6d768a" stroke-width=".6"/> <path d="M16 95.4 C16.1 97.3 17.9 97.3 18 95.4 C17.4 94.8 16.6 94.8 16 95.4Z" fill="#fff" stroke="#8a93a6" stroke-width=".35"/> <path d="M15.6 88.8 q1.4 .45 2.8 0 M15.7 92.2 q1.3 .4 2.6 0" stroke="#8a93a6" stroke-width=".45" fill="none" stroke-linecap="round"/> <path d="M12.6 75.6 C15.5 77.3 19 78.1 21.8 77.9 C23 77.9 23 79.7 21.8 79.9 C18.6 80.4 15 79.6 12.3 78.3Z" fill="url(#ySilB)" stroke="#6d768a" stroke-width=".55"/> <path d="M20.6 78 q1.2 .1 1.2 .9 q0 .8 -1.2 .8" fill="#fff" stroke="#8a93a6" stroke-width=".3"/></svg>`;
const _sp=setPlayBtn; setPlayBtn=function(){ _sp(); const b=$("playAll"); if(!b) return;
  if(!playing){ b.classList.add("yadbtn"); b.innerHTML=`${ICON}<span class="yadtx"><b>▶ Follow the <span class="gl yadgl" role="button" tabindex="0" data-gk="yad" aria-label="yad: tap for meaning">yad</span></b></span>` }
  else b.classList.remove("yadbtn") };
document.head.insertAdjacentHTML("beforeend",`<style>
#playAll.yadbtn{display:flex;align-items:center;justify-content:center;gap:12px;padding:8px 16px 8px 10px;text-align:left;line-height:1.2;min-height:64px;overflow:visible}
#playAll .yadgl{text-decoration:underline dotted #5a3b05;text-decoration-thickness:2.5px;text-underline-offset:5px;padding:2px 3px;margin:-2px -1px;border-radius:6px}
#playAll .yadgl:hover,#playAll .yadgl.act{background:rgba(255,255,255,.45)}
.yadico{width:22px;height:64px;flex:none;overflow:visible;transform:rotate(-18deg);filter:drop-shadow(1px 2px 1px rgba(0,0,0,.35));margin:0 4px 0 8px}
.yadtx{display:flex;flex-direction:column;gap:2px;min-width:0}
.yadtx b{font-size:1.15rem}
.yadtx small{font-size:.86rem;font-weight:600;opacity:.9}
.yadtx small bdi{font-family:var(--he);font-weight:700;font-size:1.2em;padding:0 2px}.yadtx small b{font-size:inherit}
</style>`);
setPlayBtn();
})();
