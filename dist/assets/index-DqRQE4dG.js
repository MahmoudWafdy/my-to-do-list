(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))c(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&c(u)}).observe(document,{childList:!0,subtree:!0});function s(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(a){if(a.ep)return;a.ep=!0;const n=s(a);fetch(a.href,n)}})();const T=document.querySelector(".DarkThemeToggle"),p=document.querySelector(".App__upperBackground"),r=document.querySelector(".App"),L=document.querySelector(".TaskSearchBar__input"),k=document.querySelector(".TaskList__list"),y=()=>document.querySelectorAll(".TaskList__deleteIcon"),v=()=>document.querySelectorAll(".TaskList__checkbox"),g=document.querySelector(".TaskList__link");let m=!0;const f=()=>{r.classList.toggle("App--isDark"),m?p.style.backgroundImage='url("images/bg-desktop-dark.jpg")':p.style.backgroundImage='url("images/bg-desktop-light.jpg")',m=!m,l("DarkModeFlage",r==null?void 0:r.classList.contains("App--isDark"))};T.addEventListener("click",()=>f());const o=e=>{const t=localStorage.getItem(e);return t?JSON.parse(t):!1},d=()=>{const e=document.querySelector(".TaskList__nav--leftItem"),s=(o("tasks")||[]).filter(c=>!c.isComplete).length;e.textContent=`${s} ${s===1?" Item ":" Items "} Left`},h=e=>{let t="";e.forEach(s=>{t+=`
        <li class="TaskList__taskContent${s.isComplete?" TaskList__taskContent--isActive":""}">
            <div class="TaskList__checkbox" tabindex="0" role="button">
                <img
                    class="TaskList__checkboxImg"
                    src="images/icon-check.svg"
                    alt=""
                />
            </div>
            <div class="TaskList__valueContent">
                <p class="TaskList__value">${s.value}</p>
                <img
                    class="TaskList__deleteIcon"
                    src="images/icon-cross.svg"
                    alt="basket-icone"
                />
            </div>
        </li>`}),k.innerHTML=t,L.value=""},E=(e,t)=>{if(confirm("?هل تريد حذف المهمة")===!1)return;const c=o("tasks");c.splice(t,1),l("tasks",c),i(c)},S=()=>{y().forEach((e,t)=>{e.addEventListener("click",s=>E(s,t))}),v().forEach((e,t)=>{e.addEventListener("click",s=>_(s,t)),e.addEventListener("keydown",s=>{s.key==="Enter"&&_(s,t)})}),document.querySelector(".Nav__container").style.display="flex"},C=()=>{const e=L.value;if(!e)return;const t={value:e,isComplete:!1},s=o("tasks")||[];s.push(t),l("tasks",s),i(s),d()},l=(e,t)=>{localStorage.setItem(e,JSON.stringify(t))};document.querySelector(".TaskSearchBar__button").addEventListener("click",e=>{e.preventDefault(),C()});const q=()=>{o("DarkModeFlage")&&f(),i(o("tasks"))},b=()=>{o("tasks")?document.querySelector(".Nav__container").style.display="flex":(k.innerHTML=`
        <li class=""EmptyList">
            <img class="EmptyList__img" src="./images/icon-empty.svg" alt="empty-icon"/>
            <p>قائمة المهمام فارغة</p>
        </li>
      `,document.querySelector(".Nav__container").style.display="none")},i=e=>{e!=null&&e.length?(h(e),S(),d()):b()},_=(e,t)=>{const s=o("tasks");e.currentTarget.parentElement.classList.toggle("TaskList__taskContent--isActive"),s[t].isComplete=!s[t].isComplete,l("tasks",s),d()};g.addEventListener("click",e=>{k.classList.toggle("TaskList__list--hideCompleted"),g.classList.toggle("TaskList__link--isActive"),d()});document.querySelector(".Nav__container .TaskList__link").addEventListener("click",()=>{const t=o("tasks").filter(s=>!s.isComplete);l("tasks",t),i(t)});const A=()=>{const e=o("tasks");i(e)},I=()=>{const t=(o("tasks")||[]).filter(s=>s.isComplete);t.length>0?i(t):k.innerHTML=`
            <li class=""EmptyList">
            <p class="NoCompletedTasks">No completed tasks</p>
            </li>
        `},D=()=>{const t=(o("tasks")||[]).filter(s=>!s.isComplete);i(t)};document.querySelectorAll(".TaskList__nav--link").forEach(e=>{e.addEventListener("click",t=>{const s=t.target;s.classList.contains("TaskList__link--all")?A():s.classList.contains("TaskList__link--active")?D():s.classList.contains("TaskList__link--completed")&&I(),document.querySelectorAll(".TaskList__nav--link").forEach(c=>{c.classList.remove("TaskList__nav--selected")}),s.classList.add("TaskList__nav--selected")})});q();
