// 휴대폰에서는 호버가 없으니 눌러서 읽기를 켜고 끈다
document.addEventListener('click',e=>{const w=e.target.closest('.hv');if(w)w.classList.toggle('on')});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.classList.contains('hv')){e.preventDefault();e.target.classList.toggle('on')}});
