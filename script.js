'use strict';
const cfg=window.OLHAI_CONFIG||{};
const pixelId=String(cfg.metaPixelId||'').trim();
if(/^\d+$/.test(pixelId)){
 (function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=true;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=true;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)})(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
 fbq('init',pixelId);fbq('track','PageView');
}
let groupUrl=null;
try{const u=new URL(cfg.groupUrl);if(u.protocol==='https:'&&u.hostname==='chat.whatsapp.com')groupUrl=u.href}catch{}
document.querySelectorAll('[data-group]').forEach(a=>{
 if(groupUrl)a.href=groupUrl;
 a.addEventListener('click',e=>{
  if(!groupUrl){e.preventDefault();alert('O link do grupo está indisponível no momento.');return;}
  if(typeof fbq==='function'){
   fbq('track','Lead',{content_name:'Central dos Achados',source:'botao_grupo_whatsapp'});
   fbq('trackCustom','CliqueGrupoWhatsApp',{source:'botao',destination:'WhatsApp',content_name:'Central dos Achados'});
  }
 });
});
const policies={terms:['Termos de uso','A Central dos Achados compartilha ofertas e links de lojas terceirizadas. Preços, descontos, frete, estoque e cupons podem mudar. Confira os valores e condições no aplicativo da loja antes de comprar. A participação no grupo é gratuita e alguns links podem gerar comissão de afiliado.'],privacy:['Privacidade','Esta página não solicita cadastro. O Meta Pixel é usado para medir visualizações e cliques no botão do WhatsApp. Um clique não confirma entrada no grupo. Ao abrir o WhatsApp, aplicam-se também as políticas desse serviço.']};
const policyDialog=document.getElementById('policy-dialog');
document.querySelectorAll('[data-policy]').forEach(b=>b.addEventListener('click',()=>{const [title,body]=policies[b.dataset.policy];document.getElementById('policy-title').textContent=title;document.getElementById('policy-text').textContent=body;policyDialog.showModal()}));
document.getElementById('close-policy').addEventListener('click',()=>policyDialog.close());

// Correct Safari/Chrome iOS visual viewport mismatches after pinch zoom or rotation.
(function(){
  let scheduled=false;
  function syncVisibleWidth(){
    scheduled=false;
    const vv=window.visualViewport;
    const layoutWidth=document.documentElement.clientWidth;
    const visibleWidth=vv&&Number.isFinite(vv.width)?vv.width:0;
    const width=Math.max(layoutWidth,visibleWidth);
    if(width>0 && width<10000){
      document.documentElement.style.setProperty('--olhai-visible-width',width+'px');
    }
  }
  function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(syncVisibleWidth)}
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('orientationchange',schedule,{passive:true});
  window.addEventListener('pageshow',schedule,{passive:true});
  if(window.visualViewport){
    window.visualViewport.addEventListener('resize',schedule,{passive:true});
    window.visualViewport.addEventListener('scroll',schedule,{passive:true});
  }
  schedule();
})();
