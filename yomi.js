// 휴대폰에서는 호버가 없으니 눌러서 읽기를 켜고 끈다
document.addEventListener('click',e=>{const w=e.target.closest('.hv');if(w)w.classList.toggle('on')});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.classList.contains('hv')){e.preventDefault();e.target.classList.toggle('on')}});

// 소리 내어 읽기: 브라우저 내장 일본어 음성 사용
(()=>{
  const ss=window.speechSynthesis;
  if(!ss)return;
  let voice=null;
  const pick=()=>{const v=ss.getVoices().filter(v=>/^ja/i.test(v.lang));voice=v.find(v=>/Kyoko|O-ren|Google|Nanami/i.test(v.name))||v[0]||null};
  pick();ss.addEventListener?.('voiceschanged',pick);

  // 후리가나가 있으면 가나로 읽혀서 오독을 막는다
  const text=el=>{const c=el.cloneNode(true);c.querySelectorAll('.say,.sl').forEach(b=>b.remove());c.querySelectorAll('ruby').forEach(r=>{const rt=r.querySelector('rt');r.replaceWith(rt?rt.textContent:r.textContent)});return c.textContent.replace(/[／\/]/g,'、').trim()};
  const speak=(el,rate)=>{ss.cancel();const u=new SpeechSynthesisUtterance(text(el));u.lang='ja-JP';if(voice)u.voice=voice;u.rate=rate;ss.speak(u)};

  const icon='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  document.querySelectorAll('.sentence .jp').forEach(jp=>{
    const bar=document.createElement('div');bar.className='say-bar';
    bar.innerHTML=`<button class="say" type="button" aria-label="읽어 주기">${icon}<span>듣기</span></button><button class="say" type="button" aria-label="천천히 읽어 주기"><span>천천히</span></button>`;
    const[b1,b2]=bar.children;b1.onclick=()=>speak(jp,.9);b2.onclick=()=>speak(jp,.6);
    jp.after(bar);
  });

  // 표의 일본어 단어와 예문(.eg)은 눌러서 듣는다. 한 글자 한자는 읽기가 여럿이라 뺀다
  const words=[...document.querySelectorAll('td.w,.eg')].filter(el=>text(el).length>1);
  words.forEach(el=>{el.classList.add('sayable');el.title='눌러서 듣기'});
  document.addEventListener('click',e=>{const w=e.target.closest('.sayable');if(w)speak(w,.85)});

  const hint=document.querySelector('.hint-yomi');
  if(hint)hint.insertAdjacentHTML('beforeend',' 문장 아래 <b>듣기</b>를 누르거나 표·예문의 일본어를 누르면 소리 내어 읽어 준다.');
})();
