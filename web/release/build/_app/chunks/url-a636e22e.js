import{b as s}from"./paths-28a87002.js";import{q as f,g as l,a as n,p as i}from"./wallet-675ff59e.js";function u(t,r){const{params:a,pathname:o}=l(t);for(const e of n)typeof i[e]!="undefined"&&typeof a[e]=="undefined"&&(a[e]=i[e]);return`${s}/${o}${f(a)}${r?`#${r}`:""}`}function p(t,r){return r.startsWith("//prerender")?r=r.slice(11):r.startsWith(s)&&(r=r.slice(s.length)),t.split("?")[0].split("#")[0].replace(s,"").replace(/^\/+|\/+$/g,"")===r.replace(/^\/+|\/+$/g,"")}export{u as a,p as u};
//# sourceMappingURL=url-a636e22e.js.map