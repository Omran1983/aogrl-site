async function data(){ return fetch("/data/site.json").then(r=>r.json()); }
function fillContacts(d){
  const y=document.getElementById("y"); if(y) y.textContent=(new Date).getFullYear();
  const em=document.getElementById("emailLink"); if(em){ em.href="mailto:"+d.owner.email; em.textContent=d.owner.email; }
  const wa=document.getElementById("waLink"); if(wa){ wa.href=d.owner.whatsapp; }
  const waCTA=document.getElementById("waCTA"); if(waCTA){ waCTA.href=d.owner.whatsapp; }
  const ph=document.getElementById("phones"); if(ph){ ph.textContent=d.owner.phones.join(" · "); }
}
async function init(){
  const d=await data(); fillContacts(d);
  const svc=document.getElementById("svcGrid");
  if(svc){ svc.innerHTML=d.services.map(s=>`<div class="card"><span class="kicker">${s.slug}</span>
  <h3>${s.name}</h3><div class="price">From ${s.price}</div>
  <ul class="list">${s.points.map(p=>`<li>${p}</li>`).join("")}</ul>
  <div style="margin-top:10px"><a class="btn" href="/solutions/${s.slug}.html">See details</a></div></div>`).join(""); }
  const aff=document.getElementById("affGrid");
  if(aff){ aff.innerHTML=d.affiliates.map(a=>`<div class="card"><h3>${a.name}</h3><p style="color:#059669">${a.perk||""}</p>
  <a class="btn" href="${a.url}" target="_blank" rel="nofollow sponsored noopener">${a.cta||"Sign up"}</a></div>`).join(""); }
}
init();
