var Ge=Object.defineProperty,Ke=Object.defineProperties;var Ye=Object.getOwnPropertyDescriptors;var Te=Object.getOwnPropertySymbols;var Je=Object.prototype.hasOwnProperty,Xe=Object.prototype.propertyIsEnumerable;var Be=(l,e,r)=>e in l?Ge(l,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):l[e]=r,Ve=(l,e)=>{for(var r in e||(e={}))Je.call(e,r)&&Be(l,r,e[r]);if(Te)for(var r of Te(e))Xe.call(e,r)&&Be(l,r,e[r]);return l},je=(l,e)=>Ke(l,Ye(e));import{D as Ne,C as Ce,E as Ze,S as G,i as K,s as Y,k as ne,f as E,m as ce,n as A,o as ue,p as w,d as a,F as he,e as p,c as h,a as v,b as s,G as m,H as ve,I as ge,J as _e,K as Q,L as et,v as J,w as X,x as Z,A as ee,j as W,l as P,M as tt,N as se,t as re,g as le,h as be,O as F,P as H,Q as ie,R as rt,u as lt,T as nt,U as st,V as ke,W as it}from"../chunks/vendor-986b52e5.js";import{b as Se}from"../chunks/paths-28a87002.js";import{u as We,a as Pe}from"../chunks/url-f7426fdb.js";import{n as Ue,w as ot}from"../chunks/wallet-a0e0bbbf.js";import{C as at}from"../chunks/CanvasBlockie-26496520.js";const we=Ce({registration:void 0,updateAvailable:!1}),oe=je(Ve({},we),{get registration(){return Ne(we).registration},get updateAvailable(){return Ne(we).updateAvailable}});typeof window!="undefined"&&(window.serviceWorker=oe);const te=Ze("service-worker");function $e(l){l&&(te.enabled?te.debug(`enabling logging for service worker, level: ${te.level}`):te.debug(`disabling logging for service worker, level: ${te.level}`),l.postMessage({type:"debug",level:te.level,enabled:te.enabled}))}const ct=3*60*1e3,ut=30*60*1e3;function ft(l){let e=performance.now();function r(){const t=performance.now();t-e>ct&&l.update(),e=t}["focus","pointerdown"].forEach(t=>window.addEventListener(t,r)),setInterval(()=>l.update(),ut)}function dt(l,e){function r(){l.installing.addEventListener("statechange",function(){this.state==="installed"&&e(l)})}if(!!l){if(l.waiting)return e(l);l.installing?r():l.addEventListener("updatefound",r)}}if(typeof navigator!="undefined"&&"serviceWorker"in navigator){let l=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{l||(l=!0,window.location.reload())}),window.addEventListener("load",function(){const e=`${Se}/service-worker.js`;navigator.serviceWorker.register(e).then(r=>{try{ft(r)}catch{}oe.set({registration:r,updateAvailable:!1}),$e(r.installing),$e(r.waiting),$e(r.active),dt(r,()=>{te.log("[Service Worker] Update found"),oe.set({registration:r,updateAvailable:!0})})}).catch(r=>{te.log(r)})})}function mt(l){let e,r,t;const n=l[3].default,i=he(n,l,l[2],null);return{c(){e=p("li"),r=p("a"),i&&i.c(),this.h()},l(o){e=h(o,"LI",{class:!0});var d=v(e);r=h(d,"A",{class:!0,href:!0});var c=v(r);i&&i.l(c),c.forEach(a),d.forEach(a),this.h()},h(){s(r,"class","bg-white dark:bg-black inline-block py-2 px-4 border-yellow-800 text-yellow-800 font-semibold"),s(r,"href",l[1]),s(e,"class","-mb-px mr-1")},m(o,d){E(o,e,d),m(e,r),i&&i.m(r,null),t=!0},p(o,d){i&&i.p&&(!t||d&4)&&ve(i,n,o,o[2],t?_e(n,o[2],d,null):ge(o[2]),null),(!t||d&2)&&s(r,"href",o[1])},i(o){t||(w(i,o),t=!0)},o(o){A(i,o),t=!1},d(o){o&&a(e),i&&i.d(o)}}}function pt(l){let e,r,t;const n=l[3].default,i=he(n,l,l[2],null);return{c(){e=p("li"),r=p("span"),i&&i.c(),this.h()},l(o){e=h(o,"LI",{class:!0});var d=v(e);r=h(d,"SPAN",{class:!0,href:!0});var c=v(r);i&&i.l(c),c.forEach(a),d.forEach(a),this.h()},h(){s(r,"class","bg-white dark:bg-black inline-block border-l border-t border-r rounded-t py-2 px-4 border-yellow-600 text-yellow-600 font-semibold"),s(r,"href",l[1]),s(e,"class","-mb-px mr-1")},m(o,d){E(o,e,d),m(e,r),i&&i.m(r,null),t=!0},p(o,d){i&&i.p&&(!t||d&4)&&ve(i,n,o,o[2],t?_e(n,o[2],d,null):ge(o[2]),null),(!t||d&2)&&s(r,"href",o[1])},i(o){t||(w(i,o),t=!0)},o(o){A(i,o),t=!1},d(o){o&&a(e),i&&i.d(o)}}}function ht(l){let e,r,t,n;const i=[pt,mt],o=[];function d(c,u){return c[0]?0:1}return e=d(l),r=o[e]=i[e](l),{c(){r.c(),t=ne()},l(c){r.l(c),t=ne()},m(c,u){o[e].m(c,u),E(c,t,u),n=!0},p(c,[u]){let g=e;e=d(c),e===g?o[e].p(c,u):(ce(),A(o[g],1,1,()=>{o[g]=null}),ue(),r=o[e],r?r.p(c,u):(r=o[e]=i[e](c),r.c()),w(r,1),r.m(t.parentNode,t))},i(c){n||(w(r),n=!0)},o(c){A(r),n=!1},d(c){o[e].d(c),c&&a(t)}}}function vt(l,e,r){let{$$slots:t={},$$scope:n}=e,{active:i=!1}=e,{href:o}=e;return l.$$set=d=>{"active"in d&&r(0,i=d.active),"href"in d&&r(1,o=d.href),"$$scope"in d&&r(2,n=d.$$scope)},[i,o,n,t]}class gt extends G{constructor(e){super();K(this,e,vt,ht,Y,{active:0,href:1})}}function _t(l){let e;return{c(){e=p("div"),this.h()},l(r){e=h(r,"DIV",{class:!0}),v(e).forEach(a),this.h()},h(){s(e,"class","page-loading svelte-1qhgcoi")},m(r,t){E(r,e,t)},p:Q,i:Q,o:Q,d(r){r&&a(e)}}}function bt(l,e,r){let{cancel:t=()=>{}}=e;return l.$$set=n=>{"cancel"in n&&r(0,t=n.cancel)},[t]}class kt extends G{constructor(e){super();K(this,e,bt,_t,Y,{cancel:0})}}const ze=()=>{const l=et("__svelte__");return{page:{subscribe:l.page.subscribe},navigating:{subscribe:l.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:l.navigating.subscribe}},session:l.session}},wt={subscribe(l){return ze().page.subscribe(l)}},$t={subscribe(l){return ze().navigating.subscribe(l)}};function Oe(l,e,r){const t=l.slice();return t[3]=e[r],t}function Et(l){let e=l[3].title+"",r,t;return{c(){r=re(e),t=W()},l(n){r=le(n,e),t=P(n)},m(n,i){E(n,r,i),E(n,t,i)},p(n,i){i&1&&e!==(e=n[3].title+"")&&be(r,e)},d(n){n&&a(r),n&&a(t)}}}function Re(l){let e,r;return e=new gt({props:{href:l[3].href,active:We(l[3].href,l[1].url.pathname),$$slots:{default:[Et]},$$scope:{ctx:l}}}),{c(){J(e.$$.fragment)},l(t){X(e.$$.fragment,t)},m(t,n){Z(e,t,n),r=!0},p(t,n){const i={};n&1&&(i.href=t[3].href),n&3&&(i.active=We(t[3].href,t[1].url.pathname)),n&65&&(i.$$scope={dirty:n,ctx:t}),e.$set(i)},i(t){r||(w(e.$$.fragment,t),r=!0)},o(t){A(e.$$.fragment,t),r=!1},d(t){ee(e,t)}}}function qe(l){let e,r;return e=new kt({}),{c(){J(e.$$.fragment)},l(t){X(e.$$.fragment,t)},m(t,n){Z(e,t,n),r=!0},i(t){r||(w(e.$$.fragment,t),r=!0)},o(t){A(e.$$.fragment,t),r=!1},d(t){ee(e,t)}}}function yt(l){let e,r,t,n,i=l[0],o=[];for(let u=0;u<i.length;u+=1)o[u]=Re(Oe(l,i,u));const d=u=>A(o[u],1,1,()=>{o[u]=null});let c=l[2]&&qe();return{c(){e=p("ul");for(let u=0;u<o.length;u+=1)o[u].c();r=W(),c&&c.c(),t=ne(),this.h()},l(u){e=h(u,"UL",{class:!0});var g=v(e);for(let _=0;_<o.length;_+=1)o[_].l(g);g.forEach(a),r=P(u),c&&c.l(u),t=ne(),this.h()},h(){s(e,"class","flex m-1 border-b border-yellow-600")},m(u,g){E(u,e,g);for(let _=0;_<o.length;_+=1)o[_].m(e,null);E(u,r,g),c&&c.m(u,g),E(u,t,g),n=!0},p(u,[g]){if(g&3){i=u[0];let _;for(_=0;_<i.length;_+=1){const B=Oe(u,i,_);o[_]?(o[_].p(B,g),w(o[_],1)):(o[_]=Re(B),o[_].c(),w(o[_],1),o[_].m(e,null))}for(ce(),_=i.length;_<o.length;_+=1)d(_);ue()}u[2]?c?g&4&&w(c,1):(c=qe(),c.c(),w(c,1),c.m(t.parentNode,t)):c&&(ce(),A(c,1,1,()=>{c=null}),ue())},i(u){if(!n){for(let g=0;g<i.length;g+=1)w(o[g]);w(c),n=!0}},o(u){o=o.filter(Boolean);for(let g=0;g<o.length;g+=1)A(o[g]);A(c),n=!1},d(u){u&&a(e),tt(o,u),u&&a(r),c&&c.d(u),u&&a(t)}}}function xt(l,e,r){let t,n;se(l,wt,o=>r(1,t=o)),se(l,$t,o=>r(2,n=o));let{links:i}=e;return l.$$set=o=>{"links"in o&&r(0,i=o.links)},[i,t,n]}class At extends G{constructor(e){super();K(this,e,xt,yt,Y,{links:0})}}function Mt(l){let e,r;return{c(){e=F("svg"),r=F("path"),this.h()},l(t){e=H(t,"svg",{class:!0,xmlns:!0,viewBox:!0,fill:!0});var n=v(e);r=H(n,"path",{"fill-rule":!0,d:!0,"clip-rule":!0}),v(r).forEach(a),n.forEach(a),this.h()},h(){s(r,"fill-rule","evenodd"),s(r,"d","M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"),s(r,"clip-rule","evenodd"),s(e,"class","h-5 w-5 text-red-400"),s(e,"xmlns","http://www.w3.org/2000/svg"),s(e,"viewBox","0 0 20 20"),s(e,"fill","currentColor")},m(t,n){E(t,e,n),m(e,r)},d(t){t&&a(e)}}}function Lt(l){let e,r;return{c(){e=F("svg"),r=F("path"),this.h()},l(t){e=H(t,"svg",{class:!0,xmlns:!0,fill:!0,viewBox:!0,stroke:!0});var n=v(e);r=H(n,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),v(r).forEach(a),n.forEach(a),this.h()},h(){s(r,"stroke-linecap","round"),s(r,"stroke-linejoin","round"),s(r,"stroke-width","2"),s(r,"d","M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"),s(e,"class","h-6 w-6 text-green-400"),s(e,"xmlns","http://www.w3.org/2000/svg"),s(e,"fill","none"),s(e,"viewBox","0 0 24 24"),s(e,"stroke","currentColor")},m(t,n){E(t,e,n),m(e,r)},d(t){t&&a(e)}}}function Dt(l){let e,r,t,n,i,o,d,c,u,g,_,B,I,D,T,V,y,q,U;function z(x,S){return x[2]!=="error"?Lt:Mt}let $=z(l),M=$(l);return{c(){e=p("div"),r=p("div"),t=p("div"),n=p("div"),i=p("div"),M.c(),o=W(),d=p("div"),c=p("p"),u=re(l[0]),g=W(),_=p("p"),B=re(l[1]),I=W(),D=p("div"),T=p("button"),V=F("svg"),y=F("path"),this.h()},l(x){e=h(x,"DIV",{class:!0});var S=v(e);r=h(S,"DIV",{class:!0});var j=v(r);t=h(j,"DIV",{class:!0});var N=v(t);n=h(N,"DIV",{class:!0});var C=v(n);i=h(C,"DIV",{class:!0});var k=v(i);M.l(k),k.forEach(a),o=P(C),d=h(C,"DIV",{class:!0});var O=v(d);c=h(O,"P",{class:!0});var L=v(c);u=le(L,l[0]),L.forEach(a),g=P(O),_=h(O,"P",{class:!0});var f=v(_);B=le(f,l[1]),f.forEach(a),O.forEach(a),I=P(C),D=h(C,"DIV",{class:!0});var b=v(D);T=h(b,"BUTTON",{class:!0});var R=v(T);V=H(R,"svg",{class:!0,xmlns:!0,viewBox:!0,fill:!0});var ae=v(V);y=H(ae,"path",{"fill-rule":!0,d:!0,"clip-rule":!0}),v(y).forEach(a),ae.forEach(a),R.forEach(a),b.forEach(a),C.forEach(a),N.forEach(a),j.forEach(a),S.forEach(a),this.h()},h(){s(i,"class","flex-shrink-0"),s(c,"class","text-sm leading-5 font-medium text-gray-900 dark:text-gray-300"),s(_,"class","mt-1 text-sm leading-5 text-gray-500"),s(d,"class","ml-3 w-0 flex-1 pt-0.5"),s(y,"fill-rule","evenodd"),s(y,"d","M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"),s(y,"clip-rule","evenodd"),s(V,"class","h-5 w-5"),s(V,"xmlns","http://www.w3.org/2000/svg"),s(V,"viewBox","0 0 20 20"),s(V,"fill","currentColor"),s(T,"class","inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"),s(D,"class","ml-4 flex-shrink-0 flex"),s(n,"class","flex items-start"),s(t,"class","p-4"),s(r,"class","rounded-lg shadow-xs overflow-hidden dark:border-pink-500 dark:border-2"),s(e,"class","max-w-sm w-full dark:bg-black bg-white shadow-lg rounded-lg pointer-events-auto")},m(x,S){E(x,e,S),m(e,r),m(r,t),m(t,n),m(n,i),M.m(i,null),m(n,o),m(n,d),m(d,c),m(c,u),m(d,g),m(d,_),m(_,B),m(n,I),m(n,D),m(D,T),m(T,V),m(V,y),q||(U=ie(T,"click",l[3]),q=!0)},p(x,[S]){$!==($=z(x))&&(M.d(1),M=$(x),M&&(M.c(),M.m(i,null))),S&1&&be(u,x[0]),S&2&&be(B,x[1])},i:Q,o:Q,d(x){x&&a(e),M.d(),q=!1,U()}}}function It(l,e,r){let{title:t}=e,{text:n}=e,{type:i="info"}=e;const o=rt(),d=()=>o("close");return l.$$set=c=>{"title"in c&&r(0,t=c.title),"text"in c&&r(1,n=c.text),"type"in c&&r(2,i=c.type)},[t,n,i,d]}class Tt extends G{constructor(e){super();K(this,e,It,Dt,Y,{title:0,text:1,type:2})}}function Fe(l){let e,r;return e=new Tt({props:{title:l[0].current.title,text:l[0].current.text,type:l[0].current.type}}),e.$on("close",l[1]),{c(){J(e.$$.fragment)},l(t){X(e.$$.fragment,t)},m(t,n){Z(e,t,n),r=!0},p(t,n){const i={};n&1&&(i.title=t[0].current.title),n&1&&(i.text=t[0].current.text),n&1&&(i.type=t[0].current.type),e.$set(i)},i(t){r||(w(e.$$.fragment,t),r=!0)},o(t){A(e.$$.fragment,t),r=!1},d(t){ee(e,t)}}}function Bt(l){let e,r,t=l[0].current&&Fe(l);return{c(){e=p("div"),t&&t.c(),this.h()},l(n){e=h(n,"DIV",{class:!0});var i=v(e);t&&t.l(i),i.forEach(a),this.h()},h(){s(e,"class","z-50 fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end")},m(n,i){E(n,e,i),t&&t.m(e,null),r=!0},p(n,[i]){n[0].current?t?(t.p(n,i),i&1&&w(t,1)):(t=Fe(n),t.c(),w(t,1),t.m(e,null)):t&&(ce(),A(t,1,1,()=>{t=null}),ue())},i(n){r||(w(t),r=!0)},o(n){A(t),r=!1},d(n){n&&a(e),t&&t.d()}}}function Vt(l,e,r){let t;return se(l,Ue,i=>r(0,t=i)),[t,()=>Ue.acknowledge()]}class jt extends G{constructor(e){super();K(this,e,Vt,Bt,Y,{})}}function Nt(l){l.preventDefault()}function Ct(l){return lt(()=>{window.addEventListener("beforeinstallprompt",Nt)}),[]}class St extends G{constructor(e){super();K(this,e,Ct,null,Y,{})}}function He(l){let e,r,t,n,i,o,d,c,u,g,_,B,I,D,T,V,y,q,U,z,$,M,x,S,j,N,C,k;return{c(){e=p("div"),r=p("div"),t=p("div"),n=p("div"),i=p("div"),o=p("img"),c=W(),u=p("div"),g=p("p"),_=re("A new version is available. Reload to get the update."),B=W(),I=p("div"),D=p("button"),T=re("Reload"),V=W(),y=p("button"),q=re("Skip"),U=W(),z=p("div"),$=p("button"),M=p("span"),x=re("Close"),S=W(),j=F("svg"),N=F("path"),this.h()},l(O){e=h(O,"DIV",{class:!0});var L=v(e);r=h(L,"DIV",{class:!0});var f=v(r);t=h(f,"DIV",{class:!0});var b=v(t);n=h(b,"DIV",{class:!0});var R=v(n);i=h(R,"DIV",{class:!0});var ae=v(i);o=h(ae,"IMG",{class:!0,src:!0,alt:!0}),ae.forEach(a),c=P(R),u=h(R,"DIV",{class:!0});var de=v(u);g=h(de,"P",{class:!0});var xe=v(g);_=le(xe,"A new version is available. Reload to get the update."),xe.forEach(a),B=P(de),I=h(de,"DIV",{class:!0});var me=v(I);D=h(me,"BUTTON",{type:!0,class:!0});var Ae=v(D);T=le(Ae,"Reload"),Ae.forEach(a),V=P(me),y=h(me,"BUTTON",{type:!0,class:!0});var Me=v(y);q=le(Me,"Skip"),Me.forEach(a),me.forEach(a),de.forEach(a),U=P(R),z=h(R,"DIV",{class:!0});var Le=v(z);$=h(Le,"BUTTON",{class:!0});var pe=v($);M=h(pe,"SPAN",{class:!0});var De=v(M);x=le(De,"Close"),De.forEach(a),S=P(pe),j=H(pe,"svg",{class:!0,xmlns:!0,viewBox:!0,fill:!0,"aria-hidden":!0});var Ie=v(j);N=H(Ie,"path",{"fill-rule":!0,d:!0,"clip-rule":!0}),v(N).forEach(a),Ie.forEach(a),pe.forEach(a),Le.forEach(a),R.forEach(a),b.forEach(a),f.forEach(a),L.forEach(a),this.h()},h(){s(o,"class","h-10 w-10 rounded-full"),nt(o.src,d=`${Se}/maskable_icon_512x512.png`)||s(o,"src",d),s(o,"alt","Union Quest"),s(i,"class","flex-shrink-0 pt-0.5"),s(g,"class","text-sm font-medium dark:text-gray-100 text-black"),s(D,"type","button"),s(D,"class","inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"),s(y,"type","button"),s(y,"class","ml-3 inline-flex items-center px-3 py-2 border border-red-800 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-200 bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300"),s(I,"class","mt-4 flex"),s(u,"class","ml-3 w-0 flex-1"),s(M,"class","sr-only"),s(N,"fill-rule","evenodd"),s(N,"d","M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"),s(N,"clip-rule","evenodd"),s(j,"class","h-5 w-5"),s(j,"xmlns","http://www.w3.org/2000/svg"),s(j,"viewBox","0 0 20 20"),s(j,"fill","currentColor"),s(j,"aria-hidden","true"),s($,"class","dark:bg-gray-900 bg-white rounded-md inline-flex text-red-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"),s(z,"class","ml-4 flex-shrink-0 flex"),s(n,"class","flex items-start"),s(t,"class","p-4"),s(r,"class","max-w-sm w-full dark:bg-gray-800 bg-white shadow-lg rounded-lg pointer-events-auto"),s(e,"class","z-50 fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end")},m(O,L){E(O,e,L),m(e,r),m(r,t),m(t,n),m(n,i),m(i,o),m(n,c),m(n,u),m(u,g),m(g,_),m(u,B),m(u,I),m(I,D),m(D,T),m(I,V),m(I,y),m(y,q),m(n,U),m(n,z),m(z,$),m($,M),m(M,x),m($,S),m($,j),m(j,N),C||(k=[ie(D,"click",l[2]),ie(y,"click",l[1]),ie($,"click",l[1]),ie(e,"click",Pt)],C=!0)},p:Q,d(O){O&&a(e),C=!1,st(k)}}}function Wt(l){let e,r=l[0].updateAvailable&&l[0].registration&&He(l);return{c(){r&&r.c(),e=ne()},l(t){r&&r.l(t),e=ne()},m(t,n){r&&r.m(t,n),E(t,e,n)},p(t,[n]){t[0].updateAvailable&&t[0].registration?r?r.p(t,n):(r=He(t),r.c(),r.m(e.parentNode,e)):r&&(r.d(1),r=null)},i:Q,o:Q,d(t){r&&r.d(t),t&&a(e)}}}const Pt=l=>{l.preventDefault(),l.stopPropagation()};function Ut(l,e,r){let t;se(l,oe,o=>r(0,t=o));function n(){ke(oe,t.updateAvailable=!1,t)}function i(){t.updateAvailable&&t.registration&&(t.registration.waiting?t.registration.waiting.postMessage("skipWaiting"):console.error("not waiting..., todo reload?"),ke(oe,t.updateAvailable=!1,t))}return[t,n,i]}class zt extends G{constructor(e){super();K(this,e,Ut,Wt,Y,{})}}const Ot=typeof document!="undefined"&&document.documentElement.classList.contains("dark"),Ee=Ce(Ot);typeof localStorage!="undefined"&&Ee.subscribe(l=>{localStorage.setItem("theme",l?"dark":"light"),l?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")});function Rt(l){let e,r;return{c(){e=F("svg"),r=F("path"),this.h()},l(t){e=H(t,"svg",{class:!0,xmlns:!0,fill:!0,viewBox:!0,stroke:!0});var n=v(e);r=H(n,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),v(r).forEach(a),n.forEach(a),this.h()},h(){s(r,"stroke-linecap","round"),s(r,"stroke-linejoin","round"),s(r,"stroke-width",2),s(r,"d","M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"),s(e,"class","w-8 h-8"),s(e,"xmlns","http://www.w3.org/2000/svg"),s(e,"fill","none"),s(e,"viewBox","0 0 24 24"),s(e,"stroke","currentColor")},m(t,n){E(t,e,n),m(e,r)},d(t){t&&a(e)}}}function qt(l){let e,r;return{c(){e=F("svg"),r=F("path"),this.h()},l(t){e=H(t,"svg",{class:!0,xmlns:!0,fill:!0,viewBox:!0,stroke:!0});var n=v(e);r=H(n,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),v(r).forEach(a),n.forEach(a),this.h()},h(){s(r,"stroke-linecap","round"),s(r,"stroke-linejoin","round"),s(r,"stroke-width",2),s(r,"d","M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"),s(e,"class","w-8 h-8"),s(e,"xmlns","http://www.w3.org/2000/svg"),s(e,"fill","none"),s(e,"viewBox","0 0 24 24"),s(e,"stroke","currentColor")},m(t,n){E(t,e,n),m(e,r)},d(t){t&&a(e)}}}function Ft(l){let e,r,t,n;function i(c,u){return c[0]?qt:Rt}let o=i(l),d=o(l);return{c(){e=p("div"),r=p("button"),d.c(),this.h()},l(c){e=h(c,"DIV",{class:!0});var u=v(e);r=h(u,"BUTTON",{});var g=v(r);d.l(g),g.forEach(a),u.forEach(a),this.h()},h(){s(e,"class","dark:text-white")},m(c,u){E(c,e,u),m(e,r),d.m(r,null),t||(n=ie(r,"click",l[1]),t=!0)},p(c,[u]){o!==(o=i(c))&&(d.d(1),d=o(c),d&&(d.c(),d.m(r,null)))},i:Q,o:Q,d(c){c&&a(e),d.d(),t=!1,n()}}}function Ht(l,e,r){let t;return se(l,Ee,i=>r(0,t=i)),[t,()=>ke(Ee,t=!t,t)]}class Qt extends G{constructor(e){super();K(this,e,Ht,Ft,Y,{})}}const Gt="A Production Ready Template for Decentralised Applications.",ye="https://union-quest.eth.limo";function Qe(l){let e,r;return e=new at({props:{address:l[0].address,class:"mr-2 h-8 w-8"}}),{c(){J(e.$$.fragment)},l(t){X(e.$$.fragment,t)},m(t,n){Z(e,t,n),r=!0},p(t,n){const i={};n&1&&(i.address=t[0].address),e.$set(i)},i(t){r||(w(e.$$.fragment,t),r=!0)},o(t){A(e.$$.fragment,t),r=!1},d(t){ee(e,t)}}}function Kt(l){let e,r,t,n,i,o,d,c,u,g,_,B,I,D,T,V,y,q,U,z,$,M,x,S,j,N,C;document.title=e=fe,T=new St({}),y=new zt({}),U=new At({props:{links:[{href:Pe(""),title:"Home"},{href:Pe("map/"),title:"Map"}]}});let k=l[0].address&&Qe(l);x=new Qt({});const O=l[5].default,L=he(O,l,l[4],null);return N=new jt({}),{c(){r=p("meta"),t=p("meta"),n=p("meta"),i=p("meta"),o=p("meta"),d=p("meta"),c=p("meta"),u=p("meta"),g=p("meta"),_=p("meta"),B=p("meta"),I=p("meta"),D=W(),J(T.$$.fragment),V=W(),J(y.$$.fragment),q=W(),J(U.$$.fragment),z=W(),$=p("div"),k&&k.c(),M=W(),J(x.$$.fragment),S=W(),L&&L.c(),j=W(),J(N.$$.fragment),this.h()},l(f){const b=it('[data-svelte="svelte-mell9j"]',document.head);r=h(b,"META",{name:!0,content:!0}),t=h(b,"META",{name:!0,content:!0}),n=h(b,"META",{property:!0,content:!0}),i=h(b,"META",{property:!0,content:!0}),o=h(b,"META",{property:!0,content:!0}),d=h(b,"META",{property:!0,content:!0}),c=h(b,"META",{property:!0,content:!0}),u=h(b,"META",{property:!0,content:!0}),g=h(b,"META",{property:!0,content:!0}),_=h(b,"META",{property:!0,content:!0}),B=h(b,"META",{property:!0,content:!0}),I=h(b,"META",{property:!0,content:!0}),b.forEach(a),D=P(f),X(T.$$.fragment,f),V=P(f),X(y.$$.fragment,f),q=P(f),X(U.$$.fragment,f),z=P(f),$=h(f,"DIV",{class:!0});var R=v($);k&&k.l(R),M=P(R),X(x.$$.fragment,R),R.forEach(a),S=P(f),L&&L.l(f),j=P(f),X(N.$$.fragment,f),this.h()},h(){s(r,"name","title"),s(r,"content",fe),s(t,"name","description"),s(t,"content",l[1]),s(n,"property","og:type"),s(n,"content","website"),s(i,"property","og:url"),s(i,"content",l[2]),s(o,"property","og:title"),s(o,"content",fe),s(d,"property","og:description"),s(d,"content",l[1]),s(c,"property","og:image"),s(c,"content",l[3]),s(u,"property","twitter:card"),s(u,"content","summary_large_image"),s(g,"property","twitter:url"),s(g,"content",l[2]),s(_,"property","twitter:title"),s(_,"content",fe),s(B,"property","twitter:description"),s(B,"content",l[1]),s(I,"property","twitter:image"),s(I,"content",l[3]),s($,"class","absolute top-0 right-0 m-2 flex")},m(f,b){m(document.head,r),m(document.head,t),m(document.head,n),m(document.head,i),m(document.head,o),m(document.head,d),m(document.head,c),m(document.head,u),m(document.head,g),m(document.head,_),m(document.head,B),m(document.head,I),E(f,D,b),Z(T,f,b),E(f,V,b),Z(y,f,b),E(f,q,b),Z(U,f,b),E(f,z,b),E(f,$,b),k&&k.m($,null),m($,M),Z(x,$,null),E(f,S,b),L&&L.m(f,b),E(f,j,b),Z(N,f,b),C=!0},p(f,[b]){(!C||b&0)&&e!==(e=fe)&&(document.title=e),f[0].address?k?(k.p(f,b),b&1&&w(k,1)):(k=Qe(f),k.c(),w(k,1),k.m($,M)):k&&(ce(),A(k,1,1,()=>{k=null}),ue()),L&&L.p&&(!C||b&16)&&ve(L,O,f,f[4],C?_e(O,f[4],b,null):ge(f[4]),null)},i(f){C||(w(T.$$.fragment,f),w(y.$$.fragment,f),w(U.$$.fragment,f),w(k),w(x.$$.fragment,f),w(L,f),w(N.$$.fragment,f),C=!0)},o(f){A(T.$$.fragment,f),A(y.$$.fragment,f),A(U.$$.fragment,f),A(k),A(x.$$.fragment,f),A(L,f),A(N.$$.fragment,f),C=!1},d(f){a(r),a(t),a(n),a(i),a(o),a(d),a(c),a(u),a(g),a(_),a(B),a(I),f&&a(D),ee(T,f),f&&a(V),ee(y,f),f&&a(q),ee(U,f),f&&a(z),f&&a($),k&&k.d(),ee(x),f&&a(S),L&&L.d(f),f&&a(j),ee(N,f)}}}const fe="Union Quest, Template for Decentralised Applications.";function Yt(l,e,r){let t;se(l,ot,u=>r(0,t=u));let{$$slots:n={},$$scope:i}=e;const o=Gt,d=ye.endsWith("/")?ye:ye+"/",c=d+"preview.png";return l.$$set=u=>{"$$scope"in u&&r(4,i=u.$$scope)},[t,o,d,c,i,n]}class lr extends G{constructor(e){super();K(this,e,Yt,Kt,Y,{})}}export{lr as default};
//# sourceMappingURL=__layout.svelte-fb2bee25.js.map
