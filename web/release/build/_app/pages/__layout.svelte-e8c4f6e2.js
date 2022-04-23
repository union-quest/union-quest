var Qe=Object.defineProperty,Ge=Object.defineProperties;var Ke=Object.getOwnPropertyDescriptors;var Te=Object.getOwnPropertySymbols;var Ye=Object.prototype.hasOwnProperty,Je=Object.prototype.propertyIsEnumerable;var Ve=(l,e,r)=>e in l?Qe(l,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):l[e]=r,Be=(l,e)=>{for(var r in e||(e={}))Ye.call(e,r)&&Ve(l,r,e[r]);if(Te)for(var r of Te(e))Je.call(e,r)&&Ve(l,r,e[r]);return l},Ne=(l,e)=>Ge(l,Ke(e));import{D as je,C as Se,E as Xe,S as H,i as Q,s as G,k as le,f as k,m as pe,n as T,o as me,p as y,d as a,F as he,e as m,c as h,a as v,b as s,G as p,H as ve,I as ge,J as _e,K as q,L as Ze,v as J,w as X,x as Z,A as ee,j as S,l as C,M as et,N as ae,t as te,g as re,h as be,O,P as R,Q as ne,R as tt,u as rt,T as lt,U as nt,V as ke,W as st}from"../chunks/vendor-ce3c3463.js";import{b as Ce}from"../chunks/paths-28a87002.js";import{u as We,a as Pe}from"../chunks/url-74349e09.js";import{n as Ue}from"../chunks/notifications-998beaef.js";const we=Se({registration:void 0,updateAvailable:!1}),se=Ne(Be({},we),{get registration(){return je(we).registration},get updateAvailable(){return je(we).updateAvailable}});typeof window!="undefined"&&(window.serviceWorker=se);const K=Xe("service-worker");function $e(l){l&&(K.enabled?K.debug(`enabling logging for service worker, level: ${K.level}`):K.debug(`disabling logging for service worker, level: ${K.level}`),l.postMessage({type:"debug",level:K.level,enabled:K.enabled}))}const ot=3*60*1e3,it=30*60*1e3;function at(l){let e=performance.now();function r(){const t=performance.now();t-e>ot&&l.update(),e=t}["focus","pointerdown"].forEach(t=>window.addEventListener(t,r)),setInterval(()=>l.update(),it)}function ct(l,e){function r(){l.installing.addEventListener("statechange",function(){this.state==="installed"&&e(l)})}if(!!l){if(l.waiting)return e(l);l.installing?r():l.addEventListener("updatefound",r)}}if(typeof navigator!="undefined"&&"serviceWorker"in navigator){let l=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{l||(l=!0,window.location.reload())}),window.addEventListener("load",function(){const e=`${Ce}/service-worker.js`;navigator.serviceWorker.register(e).then(r=>{try{at(r)}catch{}se.set({registration:r,updateAvailable:!1}),$e(r.installing),$e(r.waiting),$e(r.active),ct(r,()=>{K.log("[Service Worker] Update found"),se.set({registration:r,updateAvailable:!0})})}).catch(r=>{K.log(r)})})}function ut(l){let e,r,t;const n=l[3].default,i=he(n,l,l[2],null);return{c(){e=m("li"),r=m("a"),i&&i.c(),this.h()},l(o){e=h(o,"LI",{class:!0});var d=v(e);r=h(d,"A",{class:!0,href:!0});var c=v(r);i&&i.l(c),c.forEach(a),d.forEach(a),this.h()},h(){s(r,"class","bg-white dark:bg-black inline-block py-2 px-4 border-yellow-800 text-yellow-800 font-semibold"),s(r,"href",l[1]),s(e,"class","-mb-px mr-1")},m(o,d){k(o,e,d),p(e,r),i&&i.m(r,null),t=!0},p(o,d){i&&i.p&&(!t||d&4)&&ve(i,n,o,o[2],t?_e(n,o[2],d,null):ge(o[2]),null),(!t||d&2)&&s(r,"href",o[1])},i(o){t||(y(i,o),t=!0)},o(o){T(i,o),t=!1},d(o){o&&a(e),i&&i.d(o)}}}function ft(l){let e,r,t;const n=l[3].default,i=he(n,l,l[2],null);return{c(){e=m("li"),r=m("span"),i&&i.c(),this.h()},l(o){e=h(o,"LI",{class:!0});var d=v(e);r=h(d,"SPAN",{class:!0,href:!0});var c=v(r);i&&i.l(c),c.forEach(a),d.forEach(a),this.h()},h(){s(r,"class","bg-white dark:bg-black inline-block border-l border-t border-r rounded-t py-2 px-4 border-yellow-600 text-yellow-600 font-semibold"),s(r,"href",l[1]),s(e,"class","-mb-px mr-1")},m(o,d){k(o,e,d),p(e,r),i&&i.m(r,null),t=!0},p(o,d){i&&i.p&&(!t||d&4)&&ve(i,n,o,o[2],t?_e(n,o[2],d,null):ge(o[2]),null),(!t||d&2)&&s(r,"href",o[1])},i(o){t||(y(i,o),t=!0)},o(o){T(i,o),t=!1},d(o){o&&a(e),i&&i.d(o)}}}function dt(l){let e,r,t,n;const i=[ft,ut],o=[];function d(c,f){return c[0]?0:1}return e=d(l),r=o[e]=i[e](l),{c(){r.c(),t=le()},l(c){r.l(c),t=le()},m(c,f){o[e].m(c,f),k(c,t,f),n=!0},p(c,[f]){let g=e;e=d(c),e===g?o[e].p(c,f):(pe(),T(o[g],1,1,()=>{o[g]=null}),me(),r=o[e],r?r.p(c,f):(r=o[e]=i[e](c),r.c()),y(r,1),r.m(t.parentNode,t))},i(c){n||(y(r),n=!0)},o(c){T(r),n=!1},d(c){o[e].d(c),c&&a(t)}}}function pt(l,e,r){let{$$slots:t={},$$scope:n}=e,{active:i=!1}=e,{href:o}=e;return l.$$set=d=>{"active"in d&&r(0,i=d.active),"href"in d&&r(1,o=d.href),"$$scope"in d&&r(2,n=d.$$scope)},[i,o,n,t]}class mt extends H{constructor(e){super();Q(this,e,pt,dt,G,{active:0,href:1})}}function ht(l){let e;return{c(){e=m("div"),this.h()},l(r){e=h(r,"DIV",{class:!0}),v(e).forEach(a),this.h()},h(){s(e,"class","page-loading svelte-1qhgcoi")},m(r,t){k(r,e,t)},p:q,i:q,o:q,d(r){r&&a(e)}}}function vt(l,e,r){let{cancel:t=()=>{}}=e;return l.$$set=n=>{"cancel"in n&&r(0,t=n.cancel)},[t]}class gt extends H{constructor(e){super();Q(this,e,vt,ht,G,{cancel:0})}}const ze=()=>{const l=Ze("__svelte__");return{page:{subscribe:l.page.subscribe},navigating:{subscribe:l.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:l.navigating.subscribe}},session:l.session}},_t={subscribe(l){return ze().page.subscribe(l)}},bt={subscribe(l){return ze().navigating.subscribe(l)}};function Oe(l,e,r){const t=l.slice();return t[3]=e[r],t}function kt(l){let e=l[3].title+"",r,t;return{c(){r=te(e),t=S()},l(n){r=re(n,e),t=C(n)},m(n,i){k(n,r,i),k(n,t,i)},p(n,i){i&1&&e!==(e=n[3].title+"")&&be(r,e)},d(n){n&&a(r),n&&a(t)}}}function Re(l){let e,r;return e=new mt({props:{href:l[3].href,active:We(l[3].href,l[1].url.pathname),$$slots:{default:[kt]},$$scope:{ctx:l}}}),{c(){J(e.$$.fragment)},l(t){X(e.$$.fragment,t)},m(t,n){Z(e,t,n),r=!0},p(t,n){const i={};n&1&&(i.href=t[3].href),n&3&&(i.active=We(t[3].href,t[1].url.pathname)),n&65&&(i.$$scope={dirty:n,ctx:t}),e.$set(i)},i(t){r||(y(e.$$.fragment,t),r=!0)},o(t){T(e.$$.fragment,t),r=!1},d(t){ee(e,t)}}}function qe(l){let e,r;return e=new gt({}),{c(){J(e.$$.fragment)},l(t){X(e.$$.fragment,t)},m(t,n){Z(e,t,n),r=!0},i(t){r||(y(e.$$.fragment,t),r=!0)},o(t){T(e.$$.fragment,t),r=!1},d(t){ee(e,t)}}}function wt(l){let e,r,t,n,i=l[0],o=[];for(let f=0;f<i.length;f+=1)o[f]=Re(Oe(l,i,f));const d=f=>T(o[f],1,1,()=>{o[f]=null});let c=l[2]&&qe();return{c(){e=m("ul");for(let f=0;f<o.length;f+=1)o[f].c();r=S(),c&&c.c(),t=le(),this.h()},l(f){e=h(f,"UL",{class:!0});var g=v(e);for(let _=0;_<o.length;_+=1)o[_].l(g);g.forEach(a),r=C(f),c&&c.l(f),t=le(),this.h()},h(){s(e,"class","flex m-1 border-b border-yellow-600")},m(f,g){k(f,e,g);for(let _=0;_<o.length;_+=1)o[_].m(e,null);k(f,r,g),c&&c.m(f,g),k(f,t,g),n=!0},p(f,[g]){if(g&3){i=f[0];let _;for(_=0;_<i.length;_+=1){const V=Oe(f,i,_);o[_]?(o[_].p(V,g),y(o[_],1)):(o[_]=Re(V),o[_].c(),y(o[_],1),o[_].m(e,null))}for(pe(),_=i.length;_<o.length;_+=1)d(_);me()}f[2]?c?g&4&&y(c,1):(c=qe(),c.c(),y(c,1),c.m(t.parentNode,t)):c&&(pe(),T(c,1,1,()=>{c=null}),me())},i(f){if(!n){for(let g=0;g<i.length;g+=1)y(o[g]);y(c),n=!0}},o(f){o=o.filter(Boolean);for(let g=0;g<o.length;g+=1)T(o[g]);T(c),n=!1},d(f){f&&a(e),et(o,f),f&&a(r),c&&c.d(f),f&&a(t)}}}function $t(l,e,r){let t,n;ae(l,_t,o=>r(1,t=o)),ae(l,bt,o=>r(2,n=o));let{links:i}=e;return l.$$set=o=>{"links"in o&&r(0,i=o.links)},[i,t,n]}class Et extends H{constructor(e){super();Q(this,e,$t,wt,G,{links:0})}}function yt(l){let e,r;return{c(){e=O("svg"),r=O("path"),this.h()},l(t){e=R(t,"svg",{class:!0,xmlns:!0,viewBox:!0,fill:!0});var n=v(e);r=R(n,"path",{"fill-rule":!0,d:!0,"clip-rule":!0}),v(r).forEach(a),n.forEach(a),this.h()},h(){s(r,"fill-rule","evenodd"),s(r,"d","M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"),s(r,"clip-rule","evenodd"),s(e,"class","h-5 w-5 text-red-400"),s(e,"xmlns","http://www.w3.org/2000/svg"),s(e,"viewBox","0 0 20 20"),s(e,"fill","currentColor")},m(t,n){k(t,e,n),p(e,r)},d(t){t&&a(e)}}}function xt(l){let e,r;return{c(){e=O("svg"),r=O("path"),this.h()},l(t){e=R(t,"svg",{class:!0,xmlns:!0,fill:!0,viewBox:!0,stroke:!0});var n=v(e);r=R(n,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),v(r).forEach(a),n.forEach(a),this.h()},h(){s(r,"stroke-linecap","round"),s(r,"stroke-linejoin","round"),s(r,"stroke-width","2"),s(r,"d","M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"),s(e,"class","h-6 w-6 text-green-400"),s(e,"xmlns","http://www.w3.org/2000/svg"),s(e,"fill","none"),s(e,"viewBox","0 0 24 24"),s(e,"stroke","currentColor")},m(t,n){k(t,e,n),p(e,r)},d(t){t&&a(e)}}}function At(l){let e,r,t,n,i,o,d,c,f,g,_,V,L,M,D,B,w,z,W;function P(x,j){return x[2]!=="error"?xt:yt}let E=P(l),$=E(l);return{c(){e=m("div"),r=m("div"),t=m("div"),n=m("div"),i=m("div"),$.c(),o=S(),d=m("div"),c=m("p"),f=te(l[0]),g=S(),_=m("p"),V=te(l[1]),L=S(),M=m("div"),D=m("button"),B=O("svg"),w=O("path"),this.h()},l(x){e=h(x,"DIV",{class:!0});var j=v(e);r=h(j,"DIV",{class:!0});var A=v(r);t=h(A,"DIV",{class:!0});var N=v(t);n=h(N,"DIV",{class:!0});var U=v(n);i=h(U,"DIV",{class:!0});var I=v(i);$.l(I),I.forEach(a),o=C(U),d=h(U,"DIV",{class:!0});var u=v(d);c=h(u,"P",{class:!0});var b=v(c);f=re(b,l[0]),b.forEach(a),g=C(u),_=h(u,"P",{class:!0});var Y=v(_);V=re(Y,l[1]),Y.forEach(a),u.forEach(a),L=C(U),M=h(U,"DIV",{class:!0});var oe=v(M);D=h(oe,"BUTTON",{class:!0});var F=v(D);B=R(F,"svg",{class:!0,xmlns:!0,viewBox:!0,fill:!0});var ie=v(B);w=R(ie,"path",{"fill-rule":!0,d:!0,"clip-rule":!0}),v(w).forEach(a),ie.forEach(a),F.forEach(a),oe.forEach(a),U.forEach(a),N.forEach(a),A.forEach(a),j.forEach(a),this.h()},h(){s(i,"class","flex-shrink-0"),s(c,"class","text-sm leading-5 font-medium text-gray-900 dark:text-gray-300"),s(_,"class","mt-1 text-sm leading-5 text-gray-500"),s(d,"class","ml-3 w-0 flex-1 pt-0.5"),s(w,"fill-rule","evenodd"),s(w,"d","M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"),s(w,"clip-rule","evenodd"),s(B,"class","h-5 w-5"),s(B,"xmlns","http://www.w3.org/2000/svg"),s(B,"viewBox","0 0 20 20"),s(B,"fill","currentColor"),s(D,"class","inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"),s(M,"class","ml-4 flex-shrink-0 flex"),s(n,"class","flex items-start"),s(t,"class","p-4"),s(r,"class","rounded-lg shadow-xs overflow-hidden dark:border-pink-500 dark:border-2"),s(e,"class","max-w-sm w-full dark:bg-black bg-white shadow-lg rounded-lg pointer-events-auto")},m(x,j){k(x,e,j),p(e,r),p(r,t),p(t,n),p(n,i),$.m(i,null),p(n,o),p(n,d),p(d,c),p(c,f),p(d,g),p(d,_),p(_,V),p(n,L),p(n,M),p(M,D),p(D,B),p(B,w),z||(W=ne(D,"click",l[3]),z=!0)},p(x,[j]){E!==(E=P(x))&&($.d(1),$=E(x),$&&($.c(),$.m(i,null))),j&1&&be(f,x[0]),j&2&&be(V,x[1])},i:q,o:q,d(x){x&&a(e),$.d(),z=!1,W()}}}function Mt(l,e,r){let{title:t}=e,{text:n}=e,{type:i="info"}=e;const o=tt(),d=()=>o("close");return l.$$set=c=>{"title"in c&&r(0,t=c.title),"text"in c&&r(1,n=c.text),"type"in c&&r(2,i=c.type)},[t,n,i,d]}class Lt extends H{constructor(e){super();Q(this,e,Mt,At,G,{title:0,text:1,type:2})}}function Fe(l){let e,r;return e=new Lt({props:{title:l[0].current.title,text:l[0].current.text,type:l[0].current.type}}),e.$on("close",l[1]),{c(){J(e.$$.fragment)},l(t){X(e.$$.fragment,t)},m(t,n){Z(e,t,n),r=!0},p(t,n){const i={};n&1&&(i.title=t[0].current.title),n&1&&(i.text=t[0].current.text),n&1&&(i.type=t[0].current.type),e.$set(i)},i(t){r||(y(e.$$.fragment,t),r=!0)},o(t){T(e.$$.fragment,t),r=!1},d(t){ee(e,t)}}}function Dt(l){let e,r,t=l[0].current&&Fe(l);return{c(){e=m("div"),t&&t.c(),this.h()},l(n){e=h(n,"DIV",{class:!0});var i=v(e);t&&t.l(i),i.forEach(a),this.h()},h(){s(e,"class","z-50 fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end")},m(n,i){k(n,e,i),t&&t.m(e,null),r=!0},p(n,[i]){n[0].current?t?(t.p(n,i),i&1&&y(t,1)):(t=Fe(n),t.c(),y(t,1),t.m(e,null)):t&&(pe(),T(t,1,1,()=>{t=null}),me())},i(n){r||(y(t),r=!0)},o(n){T(t),r=!1},d(n){n&&a(e),t&&t.d()}}}function It(l,e,r){let t;return ae(l,Ue,i=>r(0,t=i)),[t,()=>Ue.acknowledge()]}class Tt extends H{constructor(e){super();Q(this,e,It,Dt,G,{})}}function Vt(l){l.preventDefault()}function Bt(l){return rt(()=>{window.addEventListener("beforeinstallprompt",Vt)}),[]}class Nt extends H{constructor(e){super();Q(this,e,Bt,null,G,{})}}function He(l){let e,r,t,n,i,o,d,c,f,g,_,V,L,M,D,B,w,z,W,P,E,$,x,j,A,N,U,I;return{c(){e=m("div"),r=m("div"),t=m("div"),n=m("div"),i=m("div"),o=m("img"),c=S(),f=m("div"),g=m("p"),_=te("A new version is available. Reload to get the update."),V=S(),L=m("div"),M=m("button"),D=te("Reload"),B=S(),w=m("button"),z=te("Skip"),W=S(),P=m("div"),E=m("button"),$=m("span"),x=te("Close"),j=S(),A=O("svg"),N=O("path"),this.h()},l(u){e=h(u,"DIV",{class:!0});var b=v(e);r=h(b,"DIV",{class:!0});var Y=v(r);t=h(Y,"DIV",{class:!0});var oe=v(t);n=h(oe,"DIV",{class:!0});var F=v(n);i=h(F,"DIV",{class:!0});var ie=v(i);o=h(ie,"IMG",{class:!0,src:!0,alt:!0}),ie.forEach(a),c=C(F),f=h(F,"DIV",{class:!0});var ue=v(f);g=h(ue,"P",{class:!0});var xe=v(g);_=re(xe,"A new version is available. Reload to get the update."),xe.forEach(a),V=C(ue),L=h(ue,"DIV",{class:!0});var fe=v(L);M=h(fe,"BUTTON",{type:!0,class:!0});var Ae=v(M);D=re(Ae,"Reload"),Ae.forEach(a),B=C(fe),w=h(fe,"BUTTON",{type:!0,class:!0});var Me=v(w);z=re(Me,"Skip"),Me.forEach(a),fe.forEach(a),ue.forEach(a),W=C(F),P=h(F,"DIV",{class:!0});var Le=v(P);E=h(Le,"BUTTON",{class:!0});var de=v(E);$=h(de,"SPAN",{class:!0});var De=v($);x=re(De,"Close"),De.forEach(a),j=C(de),A=R(de,"svg",{class:!0,xmlns:!0,viewBox:!0,fill:!0,"aria-hidden":!0});var Ie=v(A);N=R(Ie,"path",{"fill-rule":!0,d:!0,"clip-rule":!0}),v(N).forEach(a),Ie.forEach(a),de.forEach(a),Le.forEach(a),F.forEach(a),oe.forEach(a),Y.forEach(a),b.forEach(a),this.h()},h(){s(o,"class","h-10 w-10 rounded-full"),lt(o.src,d=`${Ce}/maskable_icon_512x512.png`)||s(o,"src",d),s(o,"alt","Union Quest"),s(i,"class","flex-shrink-0 pt-0.5"),s(g,"class","text-sm font-medium dark:text-gray-100 text-black"),s(M,"type","button"),s(M,"class","inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"),s(w,"type","button"),s(w,"class","ml-3 inline-flex items-center px-3 py-2 border border-red-800 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-200 bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300"),s(L,"class","mt-4 flex"),s(f,"class","ml-3 w-0 flex-1"),s($,"class","sr-only"),s(N,"fill-rule","evenodd"),s(N,"d","M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"),s(N,"clip-rule","evenodd"),s(A,"class","h-5 w-5"),s(A,"xmlns","http://www.w3.org/2000/svg"),s(A,"viewBox","0 0 20 20"),s(A,"fill","currentColor"),s(A,"aria-hidden","true"),s(E,"class","dark:bg-gray-900 bg-white rounded-md inline-flex text-red-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"),s(P,"class","ml-4 flex-shrink-0 flex"),s(n,"class","flex items-start"),s(t,"class","p-4"),s(r,"class","max-w-sm w-full dark:bg-gray-800 bg-white shadow-lg rounded-lg pointer-events-auto"),s(e,"class","z-50 fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end")},m(u,b){k(u,e,b),p(e,r),p(r,t),p(t,n),p(n,i),p(i,o),p(n,c),p(n,f),p(f,g),p(g,_),p(f,V),p(f,L),p(L,M),p(M,D),p(L,B),p(L,w),p(w,z),p(n,W),p(n,P),p(P,E),p(E,$),p($,x),p(E,j),p(E,A),p(A,N),U||(I=[ne(M,"click",l[2]),ne(w,"click",l[1]),ne(E,"click",l[1]),ne(e,"click",St)],U=!0)},p:q,d(u){u&&a(e),U=!1,nt(I)}}}function jt(l){let e,r=l[0].updateAvailable&&l[0].registration&&He(l);return{c(){r&&r.c(),e=le()},l(t){r&&r.l(t),e=le()},m(t,n){r&&r.m(t,n),k(t,e,n)},p(t,[n]){t[0].updateAvailable&&t[0].registration?r?r.p(t,n):(r=He(t),r.c(),r.m(e.parentNode,e)):r&&(r.d(1),r=null)},i:q,o:q,d(t){r&&r.d(t),t&&a(e)}}}const St=l=>{l.preventDefault(),l.stopPropagation()};function Ct(l,e,r){let t;ae(l,se,o=>r(0,t=o));function n(){ke(se,t.updateAvailable=!1,t)}function i(){t.updateAvailable&&t.registration&&(t.registration.waiting?t.registration.waiting.postMessage("skipWaiting"):console.error("not waiting..., todo reload?"),ke(se,t.updateAvailable=!1,t))}return[t,n,i]}class Wt extends H{constructor(e){super();Q(this,e,Ct,jt,G,{})}}const Pt=typeof document!="undefined"&&document.documentElement.classList.contains("dark"),Ee=Se(Pt);typeof localStorage!="undefined"&&Ee.subscribe(l=>{localStorage.setItem("theme",l?"dark":"light"),l?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")});function Ut(l){let e,r;return{c(){e=O("svg"),r=O("path"),this.h()},l(t){e=R(t,"svg",{class:!0,xmlns:!0,fill:!0,viewBox:!0,stroke:!0});var n=v(e);r=R(n,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),v(r).forEach(a),n.forEach(a),this.h()},h(){s(r,"stroke-linecap","round"),s(r,"stroke-linejoin","round"),s(r,"stroke-width",2),s(r,"d","M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"),s(e,"class","w-8 h-8"),s(e,"xmlns","http://www.w3.org/2000/svg"),s(e,"fill","none"),s(e,"viewBox","0 0 24 24"),s(e,"stroke","currentColor")},m(t,n){k(t,e,n),p(e,r)},d(t){t&&a(e)}}}function zt(l){let e,r;return{c(){e=O("svg"),r=O("path"),this.h()},l(t){e=R(t,"svg",{class:!0,xmlns:!0,fill:!0,viewBox:!0,stroke:!0});var n=v(e);r=R(n,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),v(r).forEach(a),n.forEach(a),this.h()},h(){s(r,"stroke-linecap","round"),s(r,"stroke-linejoin","round"),s(r,"stroke-width",2),s(r,"d","M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"),s(e,"class","w-8 h-8"),s(e,"xmlns","http://www.w3.org/2000/svg"),s(e,"fill","none"),s(e,"viewBox","0 0 24 24"),s(e,"stroke","currentColor")},m(t,n){k(t,e,n),p(e,r)},d(t){t&&a(e)}}}function Ot(l){let e,r,t,n;function i(c,f){return c[0]?zt:Ut}let o=i(l),d=o(l);return{c(){e=m("div"),r=m("button"),d.c(),this.h()},l(c){e=h(c,"DIV",{class:!0});var f=v(e);r=h(f,"BUTTON",{});var g=v(r);d.l(g),g.forEach(a),f.forEach(a),this.h()},h(){s(e,"class","dark:text-white")},m(c,f){k(c,e,f),p(e,r),d.m(r,null),t||(n=ne(r,"click",l[1]),t=!0)},p(c,[f]){o!==(o=i(c))&&(d.d(1),d=o(c),d&&(d.c(),d.m(r,null)))},i:q,o:q,d(c){c&&a(e),d.d(),t=!1,n()}}}function Rt(l,e,r){let t;return ae(l,Ee,i=>r(0,t=i)),[t,()=>ke(Ee,t=!t,t)]}class qt extends H{constructor(e){super();Q(this,e,Rt,Ot,G,{})}}const Ft="A Production Ready Template for Decentralised Applications.",ye="https://union-quest.eth.limo";function Ht(l){let e,r,t,n,i,o,d,c,f,g,_,V,L,M,D,B,w,z,W,P,E,$,x,j,A,N;document.title=e=ce,D=new Nt({}),w=new Wt({}),W=new Et({props:{links:[{href:Pe(""),title:"Home"},{href:Pe("map/"),title:"Map"}]}}),$=new qt({});const U=l[4].default,I=he(U,l,l[3],null);return A=new Tt({}),{c(){r=m("meta"),t=m("meta"),n=m("meta"),i=m("meta"),o=m("meta"),d=m("meta"),c=m("meta"),f=m("meta"),g=m("meta"),_=m("meta"),V=m("meta"),L=m("meta"),M=S(),J(D.$$.fragment),B=S(),J(w.$$.fragment),z=S(),J(W.$$.fragment),P=S(),E=m("div"),J($.$$.fragment),x=S(),I&&I.c(),j=S(),J(A.$$.fragment),this.h()},l(u){const b=st('[data-svelte="svelte-mell9j"]',document.head);r=h(b,"META",{name:!0,content:!0}),t=h(b,"META",{name:!0,content:!0}),n=h(b,"META",{property:!0,content:!0}),i=h(b,"META",{property:!0,content:!0}),o=h(b,"META",{property:!0,content:!0}),d=h(b,"META",{property:!0,content:!0}),c=h(b,"META",{property:!0,content:!0}),f=h(b,"META",{property:!0,content:!0}),g=h(b,"META",{property:!0,content:!0}),_=h(b,"META",{property:!0,content:!0}),V=h(b,"META",{property:!0,content:!0}),L=h(b,"META",{property:!0,content:!0}),b.forEach(a),M=C(u),X(D.$$.fragment,u),B=C(u),X(w.$$.fragment,u),z=C(u),X(W.$$.fragment,u),P=C(u),E=h(u,"DIV",{class:!0});var Y=v(E);X($.$$.fragment,Y),Y.forEach(a),x=C(u),I&&I.l(u),j=C(u),X(A.$$.fragment,u),this.h()},h(){s(r,"name","title"),s(r,"content",ce),s(t,"name","description"),s(t,"content",l[0]),s(n,"property","og:type"),s(n,"content","website"),s(i,"property","og:url"),s(i,"content",l[1]),s(o,"property","og:title"),s(o,"content",ce),s(d,"property","og:description"),s(d,"content",l[0]),s(c,"property","og:image"),s(c,"content",l[2]),s(f,"property","twitter:card"),s(f,"content","summary_large_image"),s(g,"property","twitter:url"),s(g,"content",l[1]),s(_,"property","twitter:title"),s(_,"content",ce),s(V,"property","twitter:description"),s(V,"content",l[0]),s(L,"property","twitter:image"),s(L,"content",l[2]),s(E,"class","absolute top-0 right-0 m-2")},m(u,b){p(document.head,r),p(document.head,t),p(document.head,n),p(document.head,i),p(document.head,o),p(document.head,d),p(document.head,c),p(document.head,f),p(document.head,g),p(document.head,_),p(document.head,V),p(document.head,L),k(u,M,b),Z(D,u,b),k(u,B,b),Z(w,u,b),k(u,z,b),Z(W,u,b),k(u,P,b),k(u,E,b),Z($,E,null),k(u,x,b),I&&I.m(u,b),k(u,j,b),Z(A,u,b),N=!0},p(u,[b]){(!N||b&0)&&e!==(e=ce)&&(document.title=e),I&&I.p&&(!N||b&8)&&ve(I,U,u,u[3],N?_e(U,u[3],b,null):ge(u[3]),null)},i(u){N||(y(D.$$.fragment,u),y(w.$$.fragment,u),y(W.$$.fragment,u),y($.$$.fragment,u),y(I,u),y(A.$$.fragment,u),N=!0)},o(u){T(D.$$.fragment,u),T(w.$$.fragment,u),T(W.$$.fragment,u),T($.$$.fragment,u),T(I,u),T(A.$$.fragment,u),N=!1},d(u){a(r),a(t),a(n),a(i),a(o),a(d),a(c),a(f),a(g),a(_),a(V),a(L),u&&a(M),ee(D,u),u&&a(B),ee(w,u),u&&a(z),ee(W,u),u&&a(P),u&&a(E),ee($),u&&a(x),I&&I.d(u),u&&a(j),ee(A,u)}}}const ce="Union Quest, Template for Decentralised Applications.";function Qt(l,e,r){let{$$slots:t={},$$scope:n}=e;const i=Ft,o=ye.endsWith("/")?ye:ye+"/",d=o+"preview.png";return l.$$set=c=>{"$$scope"in c&&r(3,n=c.$$scope)},[i,o,d,n,t]}class Zt extends H{constructor(e){super();Q(this,e,Qt,Ht,G,{})}}export{Zt as default};
//# sourceMappingURL=__layout.svelte-e8c4f6e2.js.map
