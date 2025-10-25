async function data(){ return fetch("/data/site.json").then(r=>r.json()); }
function toast(msg){ let t=document.createElement("div"); t.className="toast"; t.textContent=msg;
  document.body.appendChild(t); setTimeout(()=>t.remove(),1800); }
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
  if(aff){ aff.innerHTML=d.affiliates.map(a=>`<div class="card">
      <h3>${a.name}</h3>
      ${a.code ? `<p>Use code: <strong>${a.code}</strong> <button class="btn small ghost" onclick="navigator.clipboard.writeText('${a.code}').then(()=>toast('Code copied: ${a.code}'))">Copy</button></p>` : ""}
      <p style="color:#059669">${a.perk||""}</p>
      <div class="flex" style="gap:10px;flex-wrap:wrap;margin-top:8px">
        <a class="btn" href="${a.url}" target="_blank" rel="nofollow sponsored noopener">${a.cta || "Open link"}</a>
        ${a.learn ? `<a class="btn ghost" href="${a.learn}">Why this link</a>` : ""}
      </div>
      <p class="kicker" style="margin-top:8px">Official domain only. AOGRL may earn a commission at no extra cost.</p>
    </div>`).join(""); }
}
init();
