const I18N={
 en:{title:"Sadat Academy For Management Science",
     nav:{home:"Home",rules:"Publication Rules",board:"Editorial Board",current:"Current Issue",archive:"Archive",login:"Login"},
     home:{h2:"Welcome to the Academic Journal",p:"This is a scientific journal issued by Sadat Academy for Management Sciences, providing academic content for researchers, students, and faculty members."},
     rules:{h2:"Publication Rules",p:"Authors must follow submission guidelines, formatting rules, and ethical standards before submitting manuscripts."},
     board:{h2:"Editorial Board",p:"Our board consists of distinguished professors and experts in management, economics, and social sciences."},
     current:{h2:"Current Issue",p:"The current issue features research on digital transformation, leadership, and sustainable development."},
     archive:{h2:"Archive",p:"Browse previous issues with a wide range of scholarly articles."},
     login:{heading:"Login",academicId:"Academic ID",password:"Password",submit:"Login",noAccount:"Don't have an account?",registerHere:"Register here"},
     register:{heading:"Registration",fullname:"Full Name",major:"Major",academicId:"Academic ID",email:"Email",password:"Password",phone:"Phone Number",submit:"Create Account"}
 },
 ar:{title:"أكاديمية السادات للعلوم الإدارية",
     nav:{home:"الرئيسية",rules:"قواعد النشر",board:"هيئة التحرير",current:"المشكلة الحالية",archive:"الأرشيف",login:"تسجيل الدخول"},
     home:{h2:"مرحباً بكم في المجلة العلمية",p:"هذه مجلة علمية تصدر عن أكاديمية السادات للعلوم الإدارية، وتوفر محتوى أكاديمي للباحثين والطلاب وأعضاء هيئة التدريس."},
     rules:{h2:"قواعد النشر",p:"يجب على المؤلفين اتباع إرشادات التقديم وقواعد التنسيق والمعايير الأخلاقية قبل إرسال مخطوطاتهم."},
     board:{h2:"هيئة التحرير",p:"تتألف هيئة التحرير من أساتذة وخبراء متميزين في مجالات الإدارة والاقتصاد والعلوم الاجتماعية."},
     current:{h2:"العدد الحالي",p:"يتضمن العدد الحالي أبحاثاً عن التحول الرقمي والقيادة والتنمية المستدامة."},
     archive:{h2:"الأرشيف",p:"تصفح الأعداد السابقة التي تضم مجموعة واسعة من المقالات العلمية."},
     login:{heading:"تسجيل الدخول",academicId:"الرقم الأكاديمي",password:"كلمة المرور",submit:"دخول",noAccount:"ليس لديك حساب؟",registerHere:"سجل هنا"},
     register:{heading:"التسجيل",fullname:"الاسم الكامل",major:"التخصص",academicId:"الرقم الأكاديمي",email:"البريد الإلكتروني",password:"كلمة المرور",phone:"رقم الهاتف",submit:"إنشاء حساب"}
 }};
function getLang(){return localStorage.getItem('lang')||'en';}
function setLang(l){localStorage.setItem('sams_lang', l);}
function applyLang(){
 const lang=getLang(),t=I18N[lang]; document.body.dir=(lang==='ar')?'rtl':'ltr';
 const title=document.getElementById('academy-title')||document.querySelector('.academy-name'); if(title) title.textContent=t.title;
 ['home','rules','board','current','archive','login'].forEach(k=>{
   document.querySelectorAll('[data-nav="'+k+'"]').forEach(a=>a.textContent=t.nav[k]);
 });
 const page=(document.body.getAttribute('data-page')||'').trim();
 if(page&&t[page]){ const h2=document.querySelector('.card h2'); const p=document.querySelector('.card p'); if(h2) h2.textContent=t[page].h2; if(p) p.textContent=t[page].p; }
 if(document.getElementById('loginForm')){
   const L=t.login;
   const map={'label[for="login_id"]':L.academicId,'label[for="login_pass"]':L.password,'#loginForm button[type="submit"]':L.submit,'#login_heading':L.heading,'#login_noacct':L.noAccount,'#showReg':L.registerHere};
   Object.keys(map).forEach(sel=>{const el=document.querySelector(sel); if(el) el.textContent=map[sel];});
 }
 if(document.getElementById('regForm')){
   const R=t.register;
   const map={'label[for="reg_name"]':R.fullname,'label[for="reg_major"]':R.major,'label[for="reg_id"]':R.academicId,'label[for="reg_email"]':R.email,'label[for="reg_pass"]':R.password,'label[for="reg_phone"]':R.phone,'#regForm button[type="submit"]':R.submit};
   Object.keys(map).forEach(sel=>{const el=document.querySelector(sel); if(el) el.textContent=map[sel];});
 }
}
function switchLanguage(lang){ setLang(lang); applyLang(); }
function markActive(){ const file=location.pathname.split('/').pop()||'home.html'; document.querySelectorAll('nav a.link, nav a').forEach(a=>{a.classList.toggle('active', a.getAttribute('href')===file);}); }
function saveUser(u){const users=JSON.parse(localStorage.getItem('sams_users')||'{}');users[u.academicId]=u;localStorage.setItem('sams_users',JSON.stringify(users));}
function getUser(id){const users=JSON.parse(localStorage.getItem('sams_users')||'{}');return users[id]||null;}
document.addEventListener('DOMContentLoaded', ()=>{ applyLang(); markActive(); });

function getLang(){ try { return localStorage.getItem('sams_lang') || 'en'; } catch { return 'en'; } }
function getSession(){ try { return JSON.parse(localStorage.getItem('sams_session')||'null'); } catch { return null; } }
function setSession(sess){ localStorage.setItem('sams_session', JSON.stringify(sess)); }
function clearSession(){ localStorage.removeItem('sams_session'); }

function renderAuthUI(){
  const session = getSession();
  const loginLink = document.querySelector('[data-nav="login"]');
  // place logout on the right, inside .lang-buttons if present
  const slot = document.querySelector('.lang-buttons') || document.querySelector('nav .nav-wrap') || document.querySelector('nav');

  const old = document.getElementById('logoutArea');
  if (old && old.parentNode) old.parentNode.removeChild(old);

  if (session){
    if (loginLink) loginLink.style.display = 'none';

    const area = document.createElement('div');
    area.id = 'logoutArea';
    area.style.display = 'flex';
    area.style.alignItems = 'center';
    area.style.gap = '8px';
    area.style.marginLeft = '8px';

    const name = document.createElement('span');
    name.className = 'user-name';
    name.textContent = session.name ? (session.name.split(' ')[0]) : (getLang()==='ar'?'مستخدم':'User');
    name.style.color = '#fff';
    name.style.fontSize = '14px';
    name.style.opacity = '0.9';

    const btn = document.createElement('button');
    btn.className = 'logout-btn';
    btn.title = (getLang()==='ar' ? 'تسجيل الخروج' : 'Logout');
    btn.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i>';
    Object.assign(btn.style, { background:'transparent', border:'0', cursor:'pointer', padding:'6px' });

    btn.addEventListener('click', () => {
      clearSession();
      if (loginLink) loginLink.style.display = '';
      renderAuthUI();
      // return to login page
      if (!/index\.html$/.test(location.pathname)) {
        location.href = 'index.html';
      }
    });

    area.appendChild(name);
    area.appendChild(btn);
    if (slot) slot.appendChild(area);
  } else {
    if (loginLink) loginLink.style.display = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    renderAuthUI();

    // enhance login form to set session on success
    const loginForm = document.getElementById('loginForm');
    if (loginForm){
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = (document.getElementById('login_id')?.value || '').trim();
        const pass = (document.getElementById('login_pass')?.value || '').trim();
        const msg = document.getElementById('login_msg');
        const u = (typeof getUser === 'function') ? getUser(id) : null;

        if (!id || !pass){
          if (msg) { msg.textContent = (getLang()==='ar'?'من فضلك أكمل البيانات':'Please fill in all fields'); msg.className='msg error'; }
          return;
        }

        if (!u || !u.password || u.password !== pass){
          if (msg) { msg.textContent = (getLang()==='ar'?'بيانات الدخول غير صحيحة':'Invalid credentials'); msg.className='msg error'; }
          return;
        }

        setSession({ id: id, name: u.name || u.fullname || 'User' });
        if (msg) { msg.textContent = (getLang()==='ar'?'تم تسجيل الدخول بنجاح':'Logged in successfully'); msg.className='msg success'; }
        // Go to home page
        setTimeout(()=>{ location.href = 'home.html'; }, 300);
      });
    }
  } catch(e){ console.error('auth ui init failed', e); }
});
// === end session + logout UI ===
