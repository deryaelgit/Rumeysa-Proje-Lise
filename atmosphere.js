/* Özgün sentetik atmosfer; tarihî kayıt içermez. */
(() => {
 let context,master,timer;
 function stop(){clearTimeout(timer);if(context){context.close().catch(()=>{});context=null;}window.dispatchEvent(new Event('atlas-sound-stop'));}
 function tone(f,t,d,end=f){const o=context.createOscillator(),g=context.createGain();o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(end,t+d);g.gain.setValueAtTime(.001,t);g.gain.linearRampToValueAtTime(.15,t+.05);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(master);o.start(t);o.stop(t+d);}
 async function play(kind,volume){stop();const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw Error('Bu tarayıcı ses üretimini desteklemiyor.');context=new Audio();master=context.createGain();master.gain.value=volume;master.connect(context.destination);await context.resume();function loop(){if(!context)return;const t=context.currentTime+.05;if(kind==='ferry'){tone(138,t,3);tone(207,t,2.8);}else if(kind==='bell'){for(const offset of [0,.45])for(const f of [980,1470])tone(f,t+offset,1.5);}else{tone(1600,t,.7,900);tone(1200,t+.8,.6,1700);tone(1800,t+1.8,.8,800);}timer=setTimeout(loop,5000);}loop();}
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});window.addEventListener('pagehide',stop);
 window.AtlasSound={play,stop,setVolume:v=>{if(master)master.gain.value=v;},isPlaying:()=>!!context};
})();
