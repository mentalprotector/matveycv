import { CV_DATA } from './data.js';

export function renderHero() {
  const p = CV_DATA.profile;
  return `
    <div class="card c-dark" id="c1" data-i="0">
      <span class="cn">01/07</span>
      <div class="lbl" style="margin-bottom:14px">
        <span class="pulse" style="display:inline-block;vertical-align:middle;margin-right:8px"></span>Senior / Lead
      </div>
      <h1 class="hero-name">${p.name}<br><em>${p.surname}</em></h1>
      <p class="hero-sub">Связующее звено между продуктовым видением и технической реальностью.</p>
      <p class="hero-quote">${p.quote}</p>
      <div class="tags" style="margin-bottom:28px">
        ${p.roles.map(role => `<span class="tg">${role}</span>`).join('')}
      </div>
      <div class="hero-links">
        ${p.links.map(link => `<a href="${link.url}" target="_blank">${link.label}</a>`).join('')}
      </div>
    </div>
  `;
}

export function renderExperience() {
  return CV_DATA.experience.map((exp, idx) => {
    const num = idx + 2;
    if (exp.items) { // Earlier experience
      return `
        <div class="card ${exp.theme}" id="c${num}" data-i="${num-1}">
          <span class="cn" style="color:#1a1a1a">0${num}/07</span>
          <div class="lbl">${exp.title}</div>
          <div class="e-list">
            ${exp.items.map(item => `
              <div class="e-row">
                <div class="e-hd">
                  <span class="ey">${item.period}</span>
                  <span class="er">${item.role}</span>
                  <span class="ec">${item.company}</span>
                </div>
                <div class="ed">${item.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
    return `
      <div class="card ${exp.theme}" id="c${num}" data-i="${num-1}">
        <span class="cn" style="color:#1a1a1a">0${num}/07</span>
        <div class="bg-logo">${exp.company}</div>
        <div class="lbl">Сейчас · ${exp.period}</div>
        <div class="now-body">
          <h2 class="serif-h">${exp.role.replace(' & ', '&<br><em>').replace('Lead', 'Lead</em>')}</h2>
          <p class="body-txt">${exp.desc}</p>
          <div class="tags">
            ${exp.tags.map(t => `<span class="tg">${t}</span>`).join('')}
          </div>
          ${exp.details ? `
            <div class="stats" style="margin-top: 20px;">
              ${exp.details.map(d => `
                <div style="flex: 1 1 100%; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px; margin-bottom: 4px;">
                  <span class="sv" style="font-size: 18px; font-family: var(--mono); text-transform: uppercase; opacity: 0.8;">${d.title}</span>
                  <span class="sl">${d.text}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

export function renderCompetencies() {
  const c = CV_DATA.competencies;
  return `
    <div class="card ${c.theme}" id="c5" data-i="4">
      <span class="cn">05/07</span>
      <div class="lbl">Компетенции</div>
      <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:24px">
        <h2 class="serif-h">Сильные<br><em>стороны</em></h2>
        <div class="comp-grid">
          ${c.list.map(item => `
            <div class="comp-item">
              <div class="comp-name">${item.name}</div>
              <div class="comp-desc">${item.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function renderStack() {
  const s = CV_DATA.stack;
  return `
    <div class="card ${s.theme}" id="c6" data-i="5">
      <span class="cn" style="color:#1a1a1a">06/07</span>
      <div class="lbl">${s.title}</div>
      <div class="st-body">
        ${s.categories.map(cat => `
          <div class="st-sec">${cat.name}</div>
          <div class="st-wrap">
            ${cat.tools.map(tool => `<span class="si ${tool === 'Python' || tool === 'Next.js' || tool === 'Agile / Scrum / Kanban' ? 'b' : ''}">${tool}</span>`).join('')}
          </div>
        `).join('')}
        <p style="font-size: 10px; opacity: 0.3; margin-top: 20px; font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.05em;">${s.footerNote}</p>
      </div>
    </div>
  `;
}

export function renderContact() {
  const p = CV_DATA.profile;
  return `
    <div class="card c-dark" id="c7" data-i="6">
      <span class="cn">07/07</span>
      <div class="lbl" style="margin-bottom:16px">Давайте работать вместе</div>
      <h2 class="ct-hl">Готов к<br><em>новому</em><br>вызову</h2>
      <div class="ct-links">
        <a class="ct-a prim" href="${p.links[0].url}" target="_blank">↗ ${p.links[0].label}</a>
        <a class="ct-a" href="${p.links[1].url}" target="_blank">LinkedIn</a>
      </div>
      <p class="ct-note">Senior / Lead · PM · AI Architect · Product Analyst</p>
    </div>
  `;
}

export function renderBento() {
  const p = CV_DATA.profile;
  const ex = CV_DATA.experience;
  const comp = CV_DATA.competencies;
  const st = CV_DATA.stack;

  return `
    <!-- hero -->
    <div class="bc bc-hero" data-target="0">
      <div class="bc-label">01 · Интро</div>
      <div class="bc-title">${p.name}<br><em>${p.surname}</em></div>
      <div class="bc-body">${p.roles.slice(0,2).join(' · ')}</div>
      <div class="bc-tags">
        <span class="bc-tag">Senior</span><span class="bc-tag">Lead</span>
      </div>
    </div>
    <!-- now -->
    <div class="bc bc-now" data-target="1">
      <div class="bc-label">02 · Сейчас</div>
      <div class="bc-title">${ex[0].company}</div>
      <div class="bc-body">${ex[0].role}</div>
      <div class="bc-tags">
        ${ex[0].tags.slice(0,3).map(t => `<span class="bc-tag">${t}</span>`).join('')}
      </div>
    </div>
    <!-- earlier -->
    <div class="bc bc-earlier" data-target="3">
      <div class="bc-label">04 · Ранний опыт · ${ex[2].period}</div>
      <div class="bc-body" style="line-height:1.4">
        ${ex[2].items.slice(0,2).map(item => `<div>${item.role} @ ${item.company.split(' ')[0]}</div>`).join('')}
      </div>
    </div>
    <!-- qugo -->
    <div class="bc bc-qugo" data-target="2">
      <div class="bc-label">03 · ${ex[1].company} · ${ex[1].period}</div>
      <div class="bc-title">PM / <em>Delivery</em></div>
      <div class="bc-body">${ex[1].details[0].text}</div>
    </div>
    <!-- comp -->
    <div class="bc bc-comp" data-target="4">
      <div class="bc-label">05 · ${comp.navLabel}</div>
      <div class="bc-title">${comp.title}</div>
      <div class="bc-comp-list">
        ${comp.list.slice(0,3).map(item => `<div class="bc-comp-row">${item.name}</div>`).join('')}
      </div>
    </div>
    <!-- stack -->
    <div class="bc bc-stack" data-target="5">
      <div class="bc-label">06 · ${st.navLabel}</div>
      <div class="bc-chips-grid">
        ${st.categories.map(cat => `
          <div>
            <div style="font-size: 8px; text-transform: uppercase; opacity: 0.3; margin-bottom: 4px;">${cat.name.split(' ')[0]}</div>
            ${cat.tools.slice(0,3).map(tool => `<span class="bc-chip ${tool==='Python'||tool==='Next.js'||tool==='Agile / Scrum / Kanban' ? 'b':''}">${tool}</span>`).join('')}
          </div>
        `).join('')}
      </div>
      <div class="bc-chips-compact" style="display: flex; flex-wrap: wrap; gap: 6px;">
        <span class="bc-chip b">Python</span><span class="bc-chip b">Next.js</span>
        <span class="bc-chip">Docker</span><span class="bc-chip">LLM</span>
      </div>
      <div style="font-size: 9px; opacity: 0.3; margin-top: auto; padding-top: 8px; border-top: 1px solid rgba(0,0,0,0.05);">освою всё что нужно</div>
    </div>
    <!-- contact -->
    <div class="bc bc-contact" data-target="6">
      <div class="bc-contact-inner">
        <div class="bc-title">Готов к новому вызову</div>
        <div class="bc-clinks">
          <a class="bc-cl p" href="${p.links[0].url}" target="_blank">↗ TG</a>
          <a class="bc-cl" href="${p.links[1].url}" target="_blank">LinkedIn</a>
        </div>
      </div>
    </div>
  `;
}
