import{S as z,i as F,s as H,e as h,j as k,t as I,v as Q,c as d,a as x,l as j,g as A,d as u,w as U,b as c,T as J,X as B,f as T,G as n,x as P,Q as K,p as R,n as S,A as L,N as Y}from"../chunks/vendor-ce3c3463.js";import{N as W,w as Z,f as X}from"../chunks/NavButton-7688252c.js";import{a as tt}from"../chunks/url-74349e09.js";import"../chunks/notifications-998beaef.js";import"../chunks/paths-28a87002.js";function et(m){let e;return{c(){e=I("View the world map")},l(t){e=A(t,"View the world map")},m(t,s){T(t,e,s)},d(t){t&&u(e)}}}function st(m){let e;return{c(){e=I("Check out the Github")},l(t){e=A(t,"Check out the Github")},m(t,s){T(t,e,s)},d(t){t&&u(e)}}}function at(m){let e,t,s,w,o,_,D,E,$,r,p,M,f,C,g,G,y,N,V;return p=new W({props:{class:"big secondary",href:tt("map/"),label:"World map",$$slots:{default:[et]},$$scope:{ctx:m}}}),f=new W({props:{blank:!0,class:"big secondary",href:"https://github.com/union-quest/union-quest",label:"Check it out on github!",$$slots:{default:[st]},$$scope:{ctx:m}}}),{c(){e=h("section"),t=h("div"),s=h("img"),o=k(),_=h("p"),D=I("A fully on-chain MMORPG."),E=k(),$=h("div"),r=h("div"),Q(p.$$.fragment),M=k(),Q(f.$$.fragment),C=k(),g=h("button"),G=I("Mint 100 free DAI"),this.h()},l(a){e=d(a,"SECTION",{class:!0});var l=x(e);t=d(l,"DIV",{class:!0});var i=x(t);s=d(i,"IMG",{class:!0,src:!0,alt:!0,style:!0,width:!0,height:!0}),o=j(i),_=d(i,"P",{class:!0});var b=x(_);D=A(b,"A fully on-chain MMORPG."),b.forEach(u),E=j(i),$=d(i,"DIV",{class:!0});var q=x($);r=d(q,"DIV",{class:!0});var v=x(r);U(p.$$.fragment,v),M=j(v),U(f.$$.fragment,v),C=j(v),g=d(v,"BUTTON",{});var O=x(g);G=A(O,"Mint 100 free DAI"),O.forEach(u),v.forEach(u),q.forEach(u),i.forEach(u),l.forEach(u),this.h()},h(){c(s,"class","mb-8 mx-auto"),J(s.src,w="images/Logo/Union Quest Long.svg")||c(s,"src",w),c(s,"alt",nt),B(s,"width","800px"),B(s,"height","256px"),c(s,"width","800px"),c(s,"height","500px"),c(_,"class","m-6 text-gray-800 dark:text-gray-300 text-2xl"),c(r,"class","space-y-5 sm:flex sm:justify-center sm:space-y-0 sm:space-x-3"),c($,"class","max-w-md mx-auto pt-1 mt-5 space-y-3 md:mt-8 md:space-y-5"),c(t,"class","max-w-auto md:max-w-lg mx-auto"),c(e,"class","py-2 px-4 text-center")},m(a,l){T(a,e,l),n(e,t),n(t,s),n(t,o),n(t,_),n(_,D),n(t,E),n(t,$),n($,r),P(p,r,null),n(r,M),P(f,r,null),n(r,C),n(r,g),n(g,G),y=!0,N||(V=K(g,"click",m[0]),N=!0)},p(a,[l]){const i={};l&4&&(i.$$scope={dirty:l,ctx:a}),p.$set(i);const b={};l&4&&(b.$$scope={dirty:l,ctx:a}),f.$set(b)},i(a){y||(R(p.$$.fragment,a),R(f.$$.fragment,a),y=!0)},o(a){S(p.$$.fragment,a),S(f.$$.fragment,a),y=!1},d(a){a&&u(e),L(p),L(f),N=!1,V()}}}const nt="Union Quest";function ot(m,e,t){let s;Y(m,Z,o=>t(1,s=o));async function w(){await X.execute(o=>o.DAI.approve(o.UnionQuestCore.address,"100000000000000000000")),await X.execute(o=>o.DAI.mint(s.address,"100000000000000000000"))}return[w]}class mt extends z{constructor(e){super();F(this,e,ot,at,H,{})}}export{mt as default};
//# sourceMappingURL=index.svelte-c108fc4d.js.map
