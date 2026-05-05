import { CV_DATA } from './data.js?v=2.5';

// Role formatting: remove <br>, use <em> for second part
function formatRole(role) {
  if (role.includes(' / ')) {
    const parts = role.split(' / ');
    return `${parts[0]} <span class="role-sep">/</span> <em>${parts[1]}</em>`;
  } else if (role.includes(' & ')) {
    const parts = role.split(' & ');
    return `${parts[0]} <span class="role-sep">&</span> <em>${parts[1]}</em>`;
  }
  return role;
}

export function renderHero() {
  const p = CV_DATA.profile;
  return `
    <div class="card c-dark" id="c1" data-i="0">
      <span class="cn">01/07</span>
      <div class="lbl" style="margin-bottom:14px">
        <span class="pulse" style="display:inline-block;vertical-align:middle;margin-right:8px"></span>${formatRole('Senior / Lead')}
      </div>
      <h1 class="hero-name">${p.name} <em>${p.surname}</em></h1>
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

    const roleDisplay = formatRole(exp.role);

    return `
      <div class="card ${exp.theme}" id="c${num}" data-i="${num-1}">
        <span class="cn" style="color:#1a1a1a">0${num}/07</span>
        <div class="bg-logo">${exp.company}</div>
        <div class="lbl">${idx === 0 ? 'Сейчас · ' : ''}${exp.period}</div>
        <div class="now-body">
          <h2 class="serif-h role-title">${roleDisplay}</h2>
          <p class="body-txt">${exp.desc}</p>
          <div class="tags">
            ${exp.tags.map(t => `<span class="tg">${t}</span>`).join('')}
          </div>
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
      <div class="lbl">${c.navLabel}</div>
      <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:24px">
        <h2 class="serif-h">Сильные <em>стороны</em></h2>
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
            ${cat.tools.map(tool => `<span class="si ${tool === 'Python' || tool === 'Next.js' || tool.includes('Agile') ? 'b' : ''}">${tool}</span>`).join('')}
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
      <h2 class="ct-hl">Готов к <em>новому</em> вызову</h2>
      <div class="ct-links">
        <a class="ct-a prim" href="${p.links[0].url}" target="_blank">↗ ${p.links[0].label}</a>
        <a class="ct-a" href="${p.links[1].url}" target="_blank">${p.links[1].label}</a>
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
    <div class="bc bc-hero" data-target="0">
      <div class="bc-label">01 · Интро</div>
      <div class="bc-title">${p.name} <em>${p.surname}</em></div>
      <div class="bc-body" style="font-weight: 500; opacity: 0.8;">${p.roles.join(' · ')}</div>
      <div class="bc-tags">
        <span class="bc-tag">Senior</span>
        <span class="bc-tag">Lead</span>
        <span class="bc-tag">AI Architect</span>
      </div>
    </div>
    <div class="bc bc-now" data-target="1">
      <div class="bc-label">02 · Сейчас</div>
      <div class="bc-title">${ex[0].company}</div>
      <div class="bc-body" style="font-size: 11px; text-transform: uppercase; font-weight: bold; opacity: 0.7; margin-bottom: 8px; color: #1a1a1a; letter-spacing: 0.05em;">${formatRole(ex[0].role)}</div>
      <div class="bc-body">${ex[0].bentoDesc}</div>
      <div class="bc-tags">
        ${ex[0].tags.map(t => `<span class="bc-tag">${t}</span>`).join('')}
      </div>
    </div>
    <div class="bc bc-earlier" data-target="3">
      <div class="bc-label">04 · ${ex[2].period}</div>
      <div class="bc-title">Ранний <em>опыт</em></div>
      <div class="bc-body" style="line-height:1.6; display: flex; flex-direction: column; gap: 4px;">
        ${ex[2].items.map(item => `<div><span style="opacity: 0.5; font-size: 0.9em;">${item.role}</span> @ ${item.company}</div>`).join('')}
      </div>
    </div>
    <div class="bc bc-qugo" data-target="2">
      <div class="bc-label">03 · ${ex[1].period}</div>
      <div class="bc-title">PM Qugo <em>Fintech</em></div>
      <div class="bc-body">${ex[1].bentoDesc}</div>
      <div class="bc-tags desktop-only" style="margin-top: 12px;">
        <span class="bc-tag">Agile / Scrum</span>
        <span class="bc-tag">Jira / Confluence</span>
      </div>
    </div>
    <div class="bc bc-comp" data-target="4">
      <div class="bc-label">05 · ${comp.navLabel}</div>
      <div class="bc-title">Сильные <em>стороны</em></div>
      <div class="bc-comp-list">
        ${comp.list.map(item => `<div class="bc-comp-row">${item.name}</div>`).join('')}
      </div>
    </div>
    <div class="bc bc-stack" data-target="5">
      <div class="bc-label">06 · ${st.navLabel}</div>
      <div class="bc-title">Стек <em>технологий</em></div>
      <!-- Desktop: Full Grid -->
      <div class="bc-chips-grid">
        ${st.categories.map(cat => `
          <div style="display: flex; flex-wrap: wrap; gap: 6px; align-content: flex-start;">
            <div style="font-size: 11px; text-transform: uppercase; font-weight: bold; opacity: 0.7; margin-bottom: 10px; width: 100%; color: #1a1a1a; letter-spacing: 0.05em;">${cat.name}</div>
            ${cat.tools.map(tool => `<span class="bc-chip ${tool === 'Python' || tool === 'Next.js' || tool.includes('Agile') ? 'b' : ''}">${tool}</span>`).join('')}
          </div>
        `).join('')}
        <div style="font-size: 10px; opacity: 0.3; margin-top: auto; padding-top: 12px; border-top: 1px solid rgba(0,0,0,0.05);">Если чего-то нет — освою быстро</div>
      </div>
      <!-- Mobile: Focused List -->
      <div class="bc-chips-compact" style="gap: 6px;">
        ${st.categories[0].tools.slice(0, 5).map(t => `<span class="bc-chip b">${t}</span>`).join('')}
        ${st.categories[1].tools.slice(0, 4).map(t => `<span class="bc-chip b">${t}</span>`).join('')}
        ${st.categories[2].tools.slice(0, 3).map(t => `<span class="bc-chip">${t}</span>`).join('')}
        <span class="bc-chip more">...</span>
      </div>
    </div>
    <div class="bc bc-contact" data-target="6">
      <div class="bc-contact-inner">
        <div class="bc-title">Готов к <em>новому</em> вызову</div>
        <div class="bc-clinks">
          <a class="bc-cl p" href="${p.links[0].url}" target="_blank" onclick="event.stopPropagation()">↗ Telegram</a>
          <a class="bc-cl" href="${p.links[1].url}" target="_blank" onclick="event.stopPropagation()">LinkedIn</a>
        </div>
      </div>
    </div>
  `;
}
