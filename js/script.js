import { CV_DATA } from './data.js?v=2.6';
import * as Components from './components.js?v=2.7';

const haptics = {
  trigger: (type) => {
    if (typeof navigator === 'undefined' || !navigator.vibrate) return;
    try {
      if (type === 'light') navigator.vibrate(15);
      else if (type === 'medium') navigator.vibrate(30);
      else if (type === 'selection') navigator.vibrate(20);
      else if (type === 'nudge') navigator.vibrate([60, 50, 30, 50, 15, 50, 10]); // Sliding forward feel
      else if (type === 'reverse-nudge') navigator.vibrate([10, 50, 15, 50, 30, 50, 60]); // Sliding backward feel
      else if (type === 'expand') navigator.vibrate([10, 80, 20, 80, 30, 80, 40, 60, 60]); // 450ms ascending
      else if (type === 'collapse') navigator.vibrate([60, 60, 40, 80, 30, 80, 20, 80, 10]); // 450ms descending
    } catch(e) {}
  }
};

// DOM Elements
const track = document.getElementById('track');
const dotsEl = document.getElementById('dots');
const viewport = document.getElementById('viewport');
const bar = document.getElementById('bar');
const bento = document.getElementById('bento');
const bentoGrid = bento.querySelector('.bento-grid');

let cards = [];
let bentoItems = [];
let cur = 0;
let bentoOpen = false;
let wheelLocked = false;
let scrollFrame = 0;
let swipeStartX = 0;
let swipeStartY = 0;
let swipeStartScrollLeft = 0;
let swipeStartIndex = 0;
let swipeTracking = false;
let swipeLocked = false;

// Initialization
function init() {
  renderAll();
  setupNavigation();
  setupScrollSync();
  setupEventListeners();
  syncActiveFromScroll();
  setActive(0, true);
}

function renderAll() {
  // 1. Render Cards
  track.innerHTML = `
    ${Components.renderHero()}
    ${Components.renderExperience()}
    ${Components.renderCompetencies()}
    ${Components.renderStack()}
    ${Components.renderContact()}
  `;
  cards = Array.from(document.querySelectorAll('.card'));

  // 2. Render Bento
  bentoGrid.innerHTML = Components.renderBento();
  bentoItems = Array.from(document.querySelectorAll('.bc'));
}

function setupNavigation() {
  const navLabels = ["Интро", "Сейчас", "Qugo", "Опыт", "Скиллы", "Стек", "Связь"];
  
  // Bento Dot
  const bentoBtn = document.createElement('button');
  bentoBtn.className = 'bento-dot';
  bentoBtn.id = 'bento-open';
  bentoBtn.innerHTML = `
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor"/>
      <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor"/>
      <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor"/>
      <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor"/>
    </svg>
  `;
  bentoBtn.addEventListener('click', () => {
    haptics.trigger('medium');
    openBento();
  });
  dotsEl.appendChild(bentoBtn);

  // Nav Dots
  cards.forEach((card, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' on' : '');
    d.innerHTML = navLabels[i] || (i + 1);
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);

    card.addEventListener('click', () => {
      if (i !== cur) goTo(i);
    });
  });
}

function setupScrollSync() {
  track.addEventListener('scroll', requestScrollSync, { passive: true });
}

function requestScrollSync() {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0;
    syncActiveFromScroll();
  });
}

function syncActiveFromScroll() {
  if (!cards.length) return;

  const center = track.scrollLeft + track.offsetWidth / 2;
  let closestIndex = cur;
  let closestDistance = Infinity;

  cards.forEach((card, i) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = Math.abs(cardCenter - center);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  });

  if (!bentoOpen && closestIndex !== cur) setActive(closestIndex);
}

function setActive(i, silent = false) {
  if (i !== cur && !bentoOpen && !silent) {
    if (i > cur) {
      haptics.trigger('nudge');
    } else {
      haptics.trigger('reverse-nudge');
    }
  }

  cur = i;
  const allDots = dotsEl.querySelectorAll('.dot');
  allDots.forEach((d, j) => d.classList.toggle('on', j === i));
  
  // Mobile nav scroll sync
  const activeDot = allDots[i];
  if (activeDot && window.innerWidth < 600) {
    dotsEl.scrollTo({ 
      left: activeDot.offsetLeft - dotsEl.offsetWidth / 2 + activeDot.offsetWidth / 2, 
      behavior: 'smooth' 
    });
  }

  cards.forEach((c, j) => c.classList.toggle('active', j === i));
}

function goTo(i, instant = false) {
  const targetIdx = Math.max(0, Math.min(i, cards.length - 1));
  const card = cards[targetIdx];
  if (!card) return;

  const targetScrollLeft = card.offsetLeft - (track.offsetWidth - card.offsetWidth) / 2;
  
  if (instant) {
    track.scrollLeft = targetScrollLeft;
    syncActiveFromScroll();
    setActive(targetIdx, true);
    return;
  }

  const startScrollLeft = track.scrollLeft;
  const distance = targetScrollLeft - startScrollLeft;
  const duration = 800; // Faster, more responsive
  let startTime = null;

  function step(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // Quintic Ease Out: 1 - (1 - x)^5
    // Faster start, much smoother finish
    const ease = 1 - Math.pow(1 - progress, 5);
    
    track.scrollLeft = startScrollLeft + distance * ease;
    syncActiveFromScroll();
    if (timeElapsed < duration) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function openBento() {
  if (bentoOpen) return;
  bentoOpen = true;
  const activeCard = cards[cur];
  const src = activeCard.getBoundingClientRect();
  const targetCell = bentoItems.find(b => parseInt(b.dataset.target) === cur);
  
  bento.style.display = 'flex';
  
  requestAnimationFrame(() => {
    haptics.trigger('expand');
    bento.classList.add('open');
    viewport.style.opacity = '0';
    bar.style.opacity = '0';
    dotsEl.style.opacity = '0';
    
    if (targetCell) {
      targetCell.classList.add('animating');
      const dest = targetCell.getBoundingClientRect();
      const scaleX = src.width / dest.width;
      const scaleY = src.height / dest.height;
      const tx2 = src.left + src.width/2 - (dest.left + dest.width/2);
      const ty2 = src.top + src.height/2 - (dest.top + dest.height/2);
      
      targetCell.style.transition = 'none';
      targetCell.style.transform = `translate(${tx2}px,${ty2}px) scale(${scaleX},${scaleY})`;
      targetCell.style.zIndex = '10';
      
      bentoItems.forEach((b) => {
        if (b === targetCell) return;
        b.style.transition = 'none';
        b.style.opacity = '0';
        b.style.transform = 'scale(.92) translateY(20px)';
      });
      
      requestAnimationFrame(() => {
        targetCell.style.transition = ''; 
        targetCell.style.transform = '';
        targetCell.style.zIndex = '';
        bentoItems.forEach((b, idx) => {
          if (b === targetCell) return;
          const delay = (idx * 0.03).toFixed(2);
          b.style.transition = `opacity .35s ease ${delay}s, transform .4s cubic-bezier(0.32, 0.72, 0, 1) ${delay}s`;
          b.style.opacity = '';
          b.style.transform = '';
        });
        setTimeout(() => targetCell.classList.remove('animating'), 450);
      });
    }
  });
}

function closeBento(targetIdx) {
  if (!bentoOpen) return;
  haptics.trigger('collapse');
  const targetCard = cards[targetIdx !== undefined ? targetIdx : cur];
  const targetCell = bentoItems.find(b => parseInt(b.dataset.target) === (targetIdx !== undefined ? targetIdx : cur));
  const destCard = targetCard.getBoundingClientRect();
  
  if (targetCell) {
    targetCell.classList.add('animating');
    const src2 = targetCell.getBoundingClientRect();
    const scaleX = destCard.width / src2.width;
    const scaleY = destCard.height / src2.height;
    const tx3 = destCard.left + destCard.width/2 - (src2.left + src2.width/2);
    const ty3 = destCard.top + destCard.height/2 - (src2.top + src2.height/2);
    
    bentoItems.forEach((b) => {
      if (b === targetCell) return;
      b.style.transition = 'opacity .25s ease, transform .3s ease';
      b.style.opacity = '0';
      b.style.transform = 'scale(.9) translateY(-10px)';
    });
    
    targetCell.style.transition = `transform .42s cubic-bezier(0.32, 0.72, 0, 1), border-radius .38s ease`;
    targetCell.style.transform = `translate(${tx3}px,${ty3}px) scale(${scaleX},${scaleY})`;
    targetCell.style.zIndex = '10';
  }
  
  setTimeout(() => {
    bentoOpen = false;
    bento.classList.remove('open');
    bento.style.display = 'none';
    
    bentoItems.forEach(b => {
      b.style.transition = '';
      b.style.transform = '';
      b.style.opacity = '';
      b.style.zIndex = '';
      b.classList.remove('animating');
    });
    
    viewport.style.opacity = '1';
    bar.style.opacity = '1';
    dotsEl.style.opacity = '1';
    
    if (targetIdx !== undefined) goTo(targetIdx, true);
  }, 450);
}

function setupEventListeners() {
  document.addEventListener('keydown', e => {
    if (bentoOpen) { if (e.key === 'Escape') closeBento(cur); return; }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(cur + 1);
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goTo(cur - 1);
  });

  window.addEventListener('resize', () => {
    goTo(cur, true);
    syncActiveFromScroll();
  });

  track.addEventListener('pointerdown', e => {
    if (bentoOpen || e.button > 0) return;
    swipeTracking = true;
    swipeLocked = false;
    swipeStartX = e.clientX;
    swipeStartY = e.clientY;
    swipeStartScrollLeft = track.scrollLeft;
    swipeStartIndex = cur;
  }, { passive: true });

  track.addEventListener('pointermove', e => {
    if (!swipeTracking || bentoOpen) return;
    const dx = e.clientX - swipeStartX;
    const dy = e.clientY - swipeStartY;
    if (!swipeLocked && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      swipeLocked = true;
      track.setPointerCapture?.(e.pointerId);
    }
    if (!swipeLocked) return;
    e.preventDefault();
    track.scrollLeft = swipeStartScrollLeft - dx;
  });

  track.addEventListener('pointerup', finishSwipe);
  track.addEventListener('pointercancel', finishSwipe);

  track.addEventListener('wheel', e => {
    if (bentoOpen || window.innerWidth < 1024) return;
    e.preventDefault();
    if (wheelLocked) return;
    const delta = e.deltaY || e.deltaX;
    if (Math.abs(delta) < 20) return;
    wheelLocked = true;
    goTo(cur + (delta > 0 ? 1 : -1));
    setTimeout(() => { wheelLocked = false; }, 1000);
  }, { passive: false });

  // Bento cell clicks
  bentoItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = parseInt(item.dataset.target);
      closeBento(target);
    });
  });
}

function finishSwipe(e) {
  if (!swipeTracking) return;
  const dx = e.clientX - swipeStartX;
  const threshold = Math.min(120, Math.max(56, track.offsetWidth * 0.12));
  swipeTracking = false;

  if (!swipeLocked) return;
  track.releasePointerCapture?.(e.pointerId);

  if (Math.abs(dx) > threshold) {
    goTo(swipeStartIndex + (dx < 0 ? 1 : -1));
    return;
  }

  goTo(swipeStartIndex);
}

// Kick off
init();
