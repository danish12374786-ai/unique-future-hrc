const jobs=[
{id:1,title:"Electrician",category:"Construction",location:"Dubai, UAE",experience:"2+ years",salary:"AED 1,500–2,200"},
{id:2,title:"Security Guard",category:"Security",location:"Dubai, UAE",experience:"1+ year",salary:"AED 1,200–1,800"},
{id:3,title:"Chef",category:"Hospitality",location:"Sharjah, UAE",experience:"2+ years",salary:"AED 1,800–2,800"},
{id:4,title:"Mechanical Engineer",category:"Engineering",location:"Abu Dhabi, UAE",experience:"3+ years",salary:"AED 4,000–6,000"},
{id:5,title:"Heavy Driver",category:"Drivers",location:"Dubai, UAE",experience:"2+ years",salary:"AED 2,500–3,500"},
{id:6,title:"Office Assistant",category:"Office",location:"Sharjah, UAE",experience:"1+ year",salary:"AED 1,800–2,500"}
];

function header(){
return `<div class="topbar"><div class="container topbar-inner"><div class="top-left"><a href="tel:+971556465473">☎ +971 55 646 5473</a><a href="mailto:uniquefuturehrc@gmail.com">✉ uniquefuturehrc@gmail.com</a></div><div class="top-right"><span>Sharjah, UAE</span><span>f</span><span>in</span><span>◎</span><span>▶</span></div></div></div>
<header class="header"><div class="container nav"><a class="brand" href="index.html"><img src="assets/logo.svg" alt="Unique Future logo"><div class="brand-text"><strong>UNIQUE <span>FUTURE</span></strong><small>HUMAN RESOURCES CONSULTANCY</small></div></a><button class="menu-btn" id="menu-btn" aria-label="Open menu">☰</button><nav class="nav-links" id="nav-links"><a href="index.html">Home</a><a href="about.html">About</a><a href="services.html">Services</a><a href="vacancies.html">Vacancies</a><a href="countries.html">Countries</a><a href="industries.html">Industries</a><a href="employers.html">For Employers</a><a href="contact.html">Contact</a><a class="nav-apply" href="apply.html">Apply Now</a></nav></div></header>`;
}
function footer(){
return `<footer class="footer"><div class="container footer-grid"><div><div class="brand"><img src="assets/logo.svg" alt="Unique Future logo"><div class="brand-text"><strong style="color:#fff">UNIQUE <span>FUTURE</span></strong><small style="color:#cbd6e0">HUMAN RESOURCES CONSULTANCY</small></div></div><p style="margin-top:18px">Connecting talent with trusted opportunities and helping employers build dependable teams.</p></div><div><h3>Company</h3><a href="about.html">About Us</a><a href="services.html">Our Services</a><a href="countries.html">Countries</a><a href="contact.html">Contact</a></div><div><h3>Careers</h3><a href="vacancies.html">All Vacancies</a><a href="apply.html">Apply Now</a><a href="faq.html">FAQ</a></div><div><h3>For Employers</h3><a href="employers.html">Hire Manpower</a><a href="industries.html">Industries</a><a href="contact.html">Request a Call</a></div></div><div class="container footer-bottom"><span>© 2026 Unique Future HR Consultancy. All rights reserved.</span><span><a href="privacy.html" style="display:inline">Privacy</a> · <a href="terms.html" style="display:inline">Terms</a></span></div></footer>`;
}
document.addEventListener("DOMContentLoaded",()=>{
const h=document.getElementById("site-header"); if(h) h.innerHTML=header();
const f=document.getElementById("site-footer"); if(f) f.innerHTML=footer();
const menu=document.getElementById("menu-btn"), nav=document.getElementById("nav-links");
if(menu) menu.addEventListener("click",()=>nav.classList.toggle("open"));

const featured=document.getElementById("featured-jobs"), all=document.getElementById("all-jobs");
function cards(list){
return list.map(j=>`<article class="job-card"><span class="tag">${j.category}</span><h3>${j.title}</h3><div class="job-meta"><span>⌖ ${j.location}</span><span>◷ ${j.experience}</span><span>◉ ${j.salary}</span></div><a class="btn btn-outline" href="job-details.html?id=${j.id}">View Details →</a></article>`).join("");
}
if(featured) featured.innerHTML=cards(jobs.slice(0,3));
if(all){
const search=document.getElementById("job-search"), category=document.getElementById("job-category");
const render=()=>{let list=jobs.filter(j=>(!category.value||j.category===category.value)&&(!search.value||`${j.title} ${j.location}`.toLowerCase().includes(search.value.toLowerCase())));all.innerHTML=list.length?cards(list):`<div class="form-card" style="grid-column:1/-1"><h3>No matching vacancies found.</h3><p>Try another search or category.</p></div>`};
search.addEventListener("input",render);category.addEventListener("change",render);render();
}
const params=new URLSearchParams(location.search), id=Number(params.get("id"));
const title=document.getElementById("job-title"), loc=document.getElementById("job-location"), content=document.getElementById("job-content"), link=document.getElementById("apply-link");
if(title){
const j=jobs.find(x=>x.id===id)||jobs[0]; title.textContent=j.title; loc.textContent=`${j.location} • ${j.category} • ${j.experience}`;
content.innerHTML=`<span class="tag">${j.category}</span><h2>Position overview</h2><p>We are currently presenting this sample vacancy for the Unique Future website. Replace the details below with the confirmed job requirement before publishing.</p><h2>Job information</h2><ul><li>Location: ${j.location}</li><li>Experience: ${j.experience}</li><li>Salary: ${j.salary}</li><li>Category: ${j.category}</li></ul><h2>Candidate profile</h2><p>Applicants should have relevant experience, valid documents where applicable and a professional attitude. Final eligibility depends on the employer's confirmed requirement.</p><h2>How to apply</h2><p>Use the Apply Now button to submit your candidate information and CV.</p>`;
if(link) link.href=`apply.html?position=${encodeURIComponent(j.title)}`;
}
const position=document.getElementById("position"); if(position){const p=new URLSearchParams(location.search).get("position");if(p)position.value=p;}
function formHandler(formId,statusId,message){const form=document.getElementById(formId),status=document.getElementById(statusId);if(!form)return;form.addEventListener("submit",e=>{e.preventDefault();status.textContent=message;status.style.color="#19734a";form.reset();});}
formHandler("candidate-form","form-status","Application form validated successfully. Connect this form to a secure backend before accepting real CVs.");
formHandler("employer-form","employer-status","Requirement form validated successfully. Connect this form to your business email/CRM before going live.");
formHandler("contact-form","contact-status","Enquiry form validated successfully. Connect this form to your email/backend before going live.");
});
