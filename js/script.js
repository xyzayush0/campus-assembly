const events = [
  {
    "id": "1",
    "name": "Signal Sprint",
    "category": "Technical",
    "date": "2026-12-04T10:00:00+05:30",
    "venue": "Innovation Lab",
    "description": "Build a working signal visualiser with a team, then demo it in two minutes."
  },
  {
    "id": "2",
    "name": "Print Room",
    "category": "Workshops",
    "date": "2026-12-05T11:00:00+05:30",
    "venue": "Design Studio",
    "description": "Turn a hand-drawn motif into a two-colour poster in a guided print session."
  },
  {
    "id": "3",
    "name": "After Hours",
    "category": "Cultural",
    "date": "2026-12-05T17:00:00+05:30",
    "venue": "Open-air Stage",
    "description": "An evening of student bands, acoustic sets and original songs."
  },
  {
    "id": "4",
    "name": "Small Models",
    "category": "Lectures",
    "date": "2026-12-06T14:00:00+05:30",
    "venue": "Seminar Hall",
    "description": "Explore how compact machine-learning models run on everyday devices."
  },
  {
    "id": "5",
    "name": "Motion Lab",
    "category": "Technical",
    "date": "2026-12-07T10:00:00+05:30",
    "venue": "Robotics Lab",
    "description": "Tune a tabletop rover and guide it around a timed obstacle course."
  },
  {
    "id": "6",
    "name": "Field Notes",
    "category": "Workshops",
    "date": "2026-12-08T12:00:00+05:30",
    "venue": "Media Room",
    "description": "Build a photo essay from six frames and edit it with the campus media club."
  }
];

const $ = selector => document.querySelector(selector);
const zone = 'Asia/Kolkata';
const time = new Intl.DateTimeFormat('en-IN', {timeZone:zone, hour:'2-digit', minute:'2-digit'});
const clock = new Intl.DateTimeFormat('en-IN', {timeZone:zone, hour:'2-digit', minute:'2-digit', second:'2-digit'});
events.sort((a,b) => Date.parse(a.date) - Date.parse(b.date));
for (const event of events) $('#event').add(new Option(event.name, event.id));

function renderEvents(category) {
  const matching = events.filter(event => category === 'All' || category === event.category);
  $('#lineup').innerHTML = matching.map(event => `
    <article class="event">
      <time class="date" datetime="${event.date}"><strong>${event.date.slice(8,10)}</strong>DEC</time>
      <div><div class="meta">${event.category} · ${time.format(new Date(event.date))} IST · ${event.venue}</div>
      <h3>${event.name}</h3><p>${event.description}</p></div>
      <button data-event="${event.id}" aria-label="Register for ${event.name}">Register</button>
    </article>`).join('');
  for (const button of $('#filters').children) button.setAttribute('aria-pressed',button.textContent === category);
}
for (const category of ['All', ...new Set(events.map(event => event.category))]) {
  const button = document.createElement('button');
  button.textContent = category;
  button.onclick = () => renderEvents(category);
  $('#filters').append(button);
}
renderEvents('All');
$('#lineup').onclick = e => {
  const id = e.target.dataset.event;
  if (!id) return;
  $('#event').value = id;
  $('#event').dispatchEvent(new Event('input',{bubbles:true}));
  location.hash = 'register';
  $('#student').focus({preventScroll:true});
};

function tick() {
  const now = new Date();
  $('#clock').textContent = clock.format(now) + ' IST';
  const next = events.find(event => Date.parse(event.date) > now);
  if (!next) {
    $('#next-name').textContent = 'Programme complete';
    $('#next-place').textContent = 'The December edition has ended.';
    $('#countdown').replaceChildren();
    return;
  }
  $('#next-name').textContent = next.name;
  $('#feature-art').src = 'images/poster-' + next.id + '.svg';
  $('#next-place').textContent = next.date.slice(8,10) + ' Dec · ' + time.format(new Date(next.date)) + ' IST · ' + next.venue;
  const seconds = Math.floor((Date.parse(next.date) - now) / 1000);
  const values = [Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60];
  $('#countdown').innerHTML = ['days','hours','minutes','seconds'].map((unit,i) => '<span>'+String(values[i]).padStart(2,'0')+'<small>'+unit+'</small></span>').join('');
}
tick();
setInterval(tick,1000);

function setTheme(dark) {
  document.body.classList.toggle('dark',dark);
  $('#theme').setAttribute('aria-pressed',dark);
}
let savedTheme;
try { savedTheme = localStorage.getItem('assembly-theme'); } catch {}
setTheme(savedTheme ? savedTheme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches);
$('#theme').onclick = () => {
  setTheme(!document.body.classList.contains('dark'));
  try { localStorage.setItem('assembly-theme',document.body.classList.contains('dark')?'dark':'light'); } catch {}
};
function menu(open) {
  $('#nav').classList.toggle('open',open);
  $('#menu').setAttribute('aria-expanded',open);
}
$('#menu').onclick = () => menu(!$('#nav').classList.contains('open'));
$('#nav').onclick = () => menu(false);
document.addEventListener('keydown', e => { if(e.key === 'Escape' && $('#nav').classList.contains('open')) { menu(false); $('#menu').focus(); } });
function highlight() {
  const sections = [...document.querySelectorAll('main section')];
  const active = sections.filter(s => s.getBoundingClientRect().top <= 100).pop() || sections[0];
  for (const a of $('#nav').children) {
    if (a.hash === '#' + active.id) a.setAttribute('aria-current','location');
    else a.removeAttribute('aria-current');
  }
}
highlight();
addEventListener('scroll',highlight,{passive:true});

const nameRule = [/^[\p{L}][\p{L}\p{M} .'’-]{1,59}$/u,'Enter a name of 2–60 characters.'];
const emailRule = [/^[^\s@]+@[^\s@]+\.[^\s@.]{2,}$/,'Enter a complete email address.'];
const rules = {
  student:nameRule, sender:nameRule, email:emailRule, reply:emailRule,
  roll:[/^\d{10}$/,'Enter a 10-digit roll number.'],
  phone:[/^[6-9]\d{9}$/,'Enter a 10-digit mobile number starting with 6–9.'],
  department:[/./,'Choose your department.'], event:[/./,'Choose an event.'],
  gender:[/./,'Select a gender option.'], message:[/^[\s\S]{15,}$/,'Write at least 15 characters.']
};
for (const form of document.forms) {
  const status = form.querySelector('[role=status]');
  const fields = [...new Set([...form.elements].map(el => el.name).filter(Boolean))];
  function validate(key) {
    const control = form.elements.namedItem(key);
    const [pattern,error] = rules[key];
    const valid = pattern.test(control.value.trim());
    document.getElementById(key+'-error').textContent = valid ? '' : error;
    for (const el of form.querySelectorAll('[name="'+key+'"]')) {
      el.setAttribute('aria-describedby',key+'-error');
      el.setAttribute('aria-invalid',!valid);
    }
    return valid;
  }
  form.oninput = e => {
    status.textContent = '';
    if (e.target.getAttribute('aria-invalid') === 'true') validate(e.target.name);
  };
  form.onsubmit = e => {
    e.preventDefault();
    const invalid = fields.filter(key => !validate(key));
    if (invalid.length) {
      status.textContent = 'Please check the highlighted fields.';
      form.querySelector('[name="'+invalid[0]+'"]').focus();
      return;
    }
    status.textContent = form.closest('#register')
      ? 'Demo registration confirmed for '+$('#student').value.trim()+' — '+$('#event').selectedOptions[0].textContent+'.'
      : 'Thank you, '+$('#sender').value.trim()+'. Your feedback passed the demo check.';
    form.reset();
  };
}
