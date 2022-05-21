var Rt = Object.defineProperty;
var it = Object.getOwnPropertySymbols;
var Ht = Object.prototype.hasOwnProperty,
  qt = Object.prototype.propertyIsEnumerable;
var ot = (s, e, t) => (e in s ? Rt(s, e, {enumerable: !0, configurable: !0, writable: !0, value: t}) : (s[e] = t)),
  Se = (s, e) => {
    for (var t in e || (e = {})) Ht.call(e, t) && ot(s, t, e[t]);
    if (it) for (var t of it(e)) qt.call(e, t) && ot(s, t, e[t]);
    return s;
  };
import {
  S as ge,
  i as we,
  s as $e,
  e as E,
  c as y,
  a as g,
  d as h,
  b,
  $ as at,
  f as S,
  J as O,
  r as zt,
  a0 as Ue,
  F as pe,
  j as N,
  t as $,
  G as me,
  l as Y,
  g as I,
  H as u,
  I as oe,
  h as W,
  P as He,
  R as qe,
  T as ze,
  U as We,
  p as R,
  n as H,
  N as Qe,
  K as Wt,
  a1 as Qt,
  a2 as Ft,
  k as re,
  m as fe,
  o as ue,
  L as Ie,
  Z as ct,
  v as x,
  w as ee,
  x as te,
  A as le,
  M as Fe,
  a3 as De,
  a4 as Gt,
  a5 as Kt,
  a6 as Ge,
  a7 as Zt,
  a8 as ft,
  a9 as Jt,
  aa as xt,
  ab as el,
  C as tl,
  E as ll,
  ac as Ke,
  ad as rl,
  ae as Ze,
  af as sl,
  u as je,
  ag as nl,
  ah as il,
  ai as ol,
} from '../chunks/vendor-ec6c92af.js';
import {
  b as al,
  w as Be,
  f as be,
  c as Ne,
  d as cl,
  e as fl,
  h as Ye,
  i as ul,
  t as Je,
  j as xe,
} from '../chunks/wallet-f19ba47f.js';
import {N as Pe, u as dl} from '../chunks/url-6a45ccd3.js';
import {b as et} from '../chunks/paths-28a87002.js';
/* empty css                                                            */ function hl(s) {
  let e, t, l;
  return {
    c() {
      (e = E('canvas')), this.h();
    },
    l(r) {
      (e = y(r, 'CANVAS', {class: !0, id: !0})), g(e).forEach(h), this.h();
    },
    h() {
      b(e, 'class', (t = '' + (at(s[0]) + ' svelte-1ac911f'))), b(e, 'id', (l = s[1].toLowerCase()));
    },
    m(r, i) {
      S(r, e, i), s[4](e);
    },
    p(r, [i]) {
      i & 1 && t !== (t = '' + (at(r[0]) + ' svelte-1ac911f')) && b(e, 'class', t),
        i & 2 && l !== (l = r[1].toLowerCase()) && b(e, 'id', l);
    },
    i: O,
    o: O,
    d(r) {
      r && h(e), s[4](null);
    },
  };
}
function _l(s, e, t, l, r, i) {
  const n = Math.sqrt(e.length),
    a = n * l;
  (s.width = a), (s.height = a);
  const o = s.getContext('2d');
  if (o) {
    (o.fillStyle = r), o.fillRect(0, 0, s.width, s.height), (o.fillStyle = t);
    for (let f = 0; f < e.length; f++)
      if (((o.fillStyle = e[f] === 1 ? t : i), e[f])) {
        const c = Math.floor(f / n),
          d = f % n;
        o.fillRect(d * l, c * l, l, l);
      }
  } else console.error('could not create 2d context for Blockie canvas');
}
function vl(s, e, t) {
  let {class: l = ''} = e,
    {address: r} = e,
    {scale: i = 4} = e,
    n,
    a;
  const o = new Array(4);
  function f(_) {
    for (let m = 0; m < o.length; m++) o[m] = 0;
    for (let m = 0; m < _.length; m++) o[m % 4] = (o[m % 4] << 5) - o[m % 4] + _.charCodeAt(m);
  }
  function c() {
    const _ = o[0] ^ (o[0] << 11);
    return (
      (o[0] = o[1]),
      (o[1] = o[2]),
      (o[2] = o[3]),
      (o[3] = o[3] ^ (o[3] >> 19) ^ _ ^ (_ >> 8)),
      (o[3] >>> 0) / ((1 << 31) >>> 0)
    );
  }
  function d() {
    const _ = Math.floor(c() * 360),
      m = c() * 60 + 40 + '%',
      w = (c() + c() + c() + c()) * 25 + '%';
    return 'hsl(' + _ + ',' + m + ',' + w + ')';
  }
  function v(_) {
    const m = _,
      w = _,
      V = Math.ceil(m / 2),
      D = m - V,
      U = [];
    for (let L = 0; L < w; L++) {
      let C = [];
      for (let B = 0; B < V; B++) C[B] = Math.floor(c() * 2.3);
      const P = C.slice(0, D);
      P.reverse(), (C = C.concat(P));
      for (let B = 0; B < C.length; B++) U.push(C[B]);
    }
    return U;
  }
  function p() {
    if (n && n.address === r && n.scale === i) return;
    (n = {address: r, scale: i}), f((r && r.toLowerCase()) || '0x0000000000000000000000000000000000000000');
    const _ = d(),
      m = d(),
      w = d(),
      V = v(8);
    _l(a, V, _, i, m, w);
  }
  zt(p);
  function k(_) {
    Ue[_ ? 'unshift' : 'push'](() => {
      (a = _), t(2, a);
    });
  }
  return (
    (s.$$set = (_) => {
      'class' in _ && t(0, (l = _.class)), 'address' in _ && t(1, (r = _.address)), 'scale' in _ && t(3, (i = _.scale));
    }),
    [l, r, a, i, k]
  );
}
class tt extends ge {
  constructor(e) {
    super();
    we(this, e, vl, hl, $e, {class: 0, address: 1, scale: 3});
  }
}
const {window: pl} = Ft,
  ml = (s) => ({}),
  ut = (s) => ({});
function dt(s) {
  let e, t, l, r, i, n, a, o;
  return {
    c() {
      (e = E('div')), (t = pe('svg')), (l = pe('path')), (r = N()), (i = E('span')), (n = $('(Esc)')), this.h();
    },
    l(f) {
      e = y(f, 'DIV', {class: !0});
      var c = g(e);
      t = me(c, 'svg', {class: !0, xmlns: !0, width: !0, height: !0, viewBox: !0});
      var d = g(t);
      (l = me(d, 'path', {d: !0})), g(l).forEach(h), d.forEach(h), (r = Y(c)), (i = y(c, 'SPAN', {class: !0}));
      var v = g(i);
      (n = I(v, '(Esc)')), v.forEach(h), c.forEach(h), this.h();
    },
    h() {
      b(
        l,
        'd',
        'M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z'
      ),
        b(t, 'class', 'fill-current text-white'),
        b(t, 'xmlns', 'http://www.w3.org/2000/svg'),
        b(t, 'width', '18'),
        b(t, 'height', '18'),
        b(t, 'viewBox', '0 0 18 18'),
        b(i, 'class', 'text-sm'),
        b(e, 'class', 'modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-sm');
    },
    m(f, c) {
      S(f, e, c), u(e, t), u(t, l), u(e, r), u(e, i), u(i, n), a || ((o = oe(e, 'click', s[4])), (a = !0));
    },
    p: O,
    d(f) {
      f && h(e), (a = !1), o();
    },
  };
}
function ht(s) {
  let e, t;
  return {
    c() {
      (e = E('p')), (t = $(s[2])), this.h();
    },
    l(l) {
      e = y(l, 'P', {class: !0});
      var r = g(e);
      (t = I(r, s[2])), r.forEach(h), this.h();
    },
    h() {
      b(e, 'class', 'text-2xl font-bold');
    },
    m(l, r) {
      S(l, e, r), u(e, t);
    },
    p(l, r) {
      r & 4 && W(t, l[2]);
    },
    d(l) {
      l && h(e);
    },
  };
}
function _t(s) {
  let e, t, l, r, i;
  return {
    c() {
      (e = E('div')), (t = pe('svg')), (l = pe('path')), this.h();
    },
    l(n) {
      e = y(n, 'DIV', {class: !0});
      var a = g(e);
      t = me(a, 'svg', {class: !0, xmlns: !0, width: !0, height: !0, viewBox: !0});
      var o = g(t);
      (l = me(o, 'path', {d: !0})), g(l).forEach(h), o.forEach(h), a.forEach(h), this.h();
    },
    h() {
      b(
        l,
        'd',
        'M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z'
      ),
        b(t, 'class', 'fill-current text-black'),
        b(t, 'xmlns', 'http://www.w3.org/2000/svg'),
        b(t, 'width', '18'),
        b(t, 'height', '18'),
        b(t, 'viewBox', '0 0 18 18'),
        b(e, 'class', 'modal-close cursor-pointer z-50');
    },
    m(n, a) {
      S(n, e, a), u(e, t), u(t, l), r || ((i = oe(e, 'click', s[4])), (r = !0));
    },
    p: O,
    d(n) {
      n && h(e), (r = !1), i();
    },
  };
}
function bl(s) {
  let e,
    t,
    l,
    r,
    i,
    n,
    a,
    o,
    f,
    c,
    d,
    v,
    p,
    k,
    _ = s[0] && dt(s),
    m = s[2] && ht(s),
    w = s[1] && _t(s);
  const V = s[8].default,
    D = He(V, s, s[7], null),
    U = s[8].footer,
    L = He(U, s, s[7], ut);
  return {
    c() {
      (e = E('div')),
        (t = E('div')),
        (l = N()),
        (r = E('div')),
        _ && _.c(),
        (i = N()),
        (n = E('div')),
        (a = E('div')),
        m && m.c(),
        (o = N()),
        w && w.c(),
        (f = N()),
        D && D.c(),
        (c = N()),
        (d = E('div')),
        L && L.c(),
        this.h();
    },
    l(C) {
      e = y(C, 'DIV', {class: !0});
      var P = g(e);
      (t = y(P, 'DIV', {class: !0})), g(t).forEach(h), (l = Y(P)), (r = y(P, 'DIV', {class: !0}));
      var B = g(r);
      _ && _.l(B), (i = Y(B)), (n = y(B, 'DIV', {class: !0}));
      var j = g(n);
      a = y(j, 'DIV', {class: !0});
      var X = g(a);
      m && m.l(X),
        (o = Y(X)),
        w && w.l(X),
        X.forEach(h),
        (f = Y(j)),
        D && D.l(j),
        (c = Y(j)),
        (d = y(j, 'DIV', {class: !0}));
      var M = g(d);
      L && L.l(M), M.forEach(h), j.forEach(h), B.forEach(h), P.forEach(h), this.h();
    },
    h() {
      b(t, 'class', 'absolute w-full h-full bg-gray-900 opacity-80'),
        b(a, 'class', 'flex justify-between items-center'),
        b(d, 'class', 'flex justify-end pt-2'),
        b(n, 'class', 'modal-content py-4 text-left px-6'),
        b(
          r,
          'class',
          'absolute border-2 w-11/12 md:max-w-md mx-auto overflow-y-auto max-h-screen dark:bg-black dark:border-2 dark:border-gray-800 bg-white'
        ),
        b(
          e,
          'class',
          'z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center text-black dark:text-white'
        );
    },
    m(C, P) {
      S(C, e, P),
        u(e, t),
        u(e, l),
        u(e, r),
        _ && _.m(r, null),
        u(r, i),
        u(r, n),
        u(n, a),
        m && m.m(a, null),
        u(a, o),
        w && w.m(a, null),
        u(n, f),
        D && D.m(n, null),
        u(n, c),
        u(n, d),
        L && L.m(d, null),
        s[9](n),
        (v = !0),
        p || ((k = [oe(pl, 'keydown', s[5]), oe(t, 'click', s[4])]), (p = !0));
    },
    p(C, [P]) {
      C[0] ? (_ ? _.p(C, P) : ((_ = dt(C)), _.c(), _.m(r, i))) : _ && (_.d(1), (_ = null)),
        C[2] ? (m ? m.p(C, P) : ((m = ht(C)), m.c(), m.m(a, o))) : m && (m.d(1), (m = null)),
        C[1] ? (w ? w.p(C, P) : ((w = _t(C)), w.c(), w.m(a, null))) : w && (w.d(1), (w = null)),
        D && D.p && (!v || P & 128) && qe(D, V, C, C[7], v ? We(V, C[7], P, null) : ze(C[7]), null),
        L && L.p && (!v || P & 128) && qe(L, U, C, C[7], v ? We(U, C[7], P, ml) : ze(C[7]), ut);
    },
    i(C) {
      v || (R(D, C), R(L, C), (v = !0));
    },
    o(C) {
      H(D, C), H(L, C), (v = !1);
    },
    d(C) {
      C && h(e), _ && _.d(), m && m.d(), w && w.d(), D && D.d(C), L && L.d(C), s[9](null), (p = !1), Qe(k);
    },
  };
}
function kl(s, e, t) {
  let {$$slots: l = {}, $$scope: r} = e,
    {globalCloseButton: i = !1} = e,
    {closeButton: n = !1} = e,
    {title: a = ''} = e,
    {cancelable: o = !0} = e;
  const f = Wt(),
    c = () => o && f('close');
  let d;
  function v(_) {
    _ = _ || window.event;
    var m = !1;
    if (('key' in _ ? (m = _.key === 'Escape' || _.key === 'Esc') : (m = _.keyCode === 27), m)) {
      c();
      return;
    }
    if (_.key === 'Tab') {
      const w = d.querySelectorAll('*'),
        V = Array.from(w).filter((U) => U.tabIndex >= 0);
      let D = -1;
      document.activeElement && (D = V.indexOf(document.activeElement)),
        D === -1 && _.shiftKey && (D = 0),
        (D += V.length + (_.shiftKey ? -1 : 1)),
        (D %= V.length),
        V[D].focus && V[D].focus(),
        _.preventDefault();
    }
  }
  const p = typeof document != 'undefined' && document.activeElement;
  p &&
    Qt(() => {
      const _ = p;
      _.focus && _.focus();
    });
  function k(_) {
    Ue[_ ? 'unshift' : 'push'](() => {
      (d = _), t(3, d);
    });
  }
  return (
    (s.$$set = (_) => {
      'globalCloseButton' in _ && t(0, (i = _.globalCloseButton)),
        'closeButton' in _ && t(1, (n = _.closeButton)),
        'title' in _ && t(2, (a = _.title)),
        'cancelable' in _ && t(6, (o = _.cancelable)),
        '$$scope' in _ && t(7, (r = _.$$scope));
    }),
    [i, n, a, d, c, v, o, r, l, k]
  );
}
class Ce extends ge {
  constructor(e) {
    super();
    we(this, e, kl, bl, $e, {globalCloseButton: 0, closeButton: 1, title: 2, cancelable: 6});
  }
}
function vt(s, e, t) {
  const l = s.slice();
  return (l[21] = e[t]), l;
}
function gl(s) {
  let e, t, l, r, i, n, a;
  return {
    c() {
      (e = E('div')),
        (t = E('p')),
        (l = $('chain reset detected! Metamask need to have its account reset! ')),
        (r = E('button')),
        (i = $('OK')),
        this.h();
    },
    l(o) {
      e = y(o, 'DIV', {class: !0, style: !0});
      var f = g(e);
      t = y(f, 'P', {class: !0});
      var c = g(t);
      (l = I(c, 'chain reset detected! Metamask need to have its account reset! ')), (r = y(c, 'BUTTON', {class: !0}));
      var d = g(r);
      (i = I(d, 'OK')), d.forEach(h), c.forEach(h), f.forEach(h), this.h();
    },
    h() {
      b(r, 'class', 'border-2 border-white p-2'),
        b(t, 'class', 'w-64 text-center rounded-bl-xl rounded-br-xl text-gray-200 bg-red-500 p-1'),
        b(e, 'class', 'w-full flex items-center justify-center fixed top-0'),
        ct(e, 'z-index', '5');
    },
    m(o, f) {
      S(o, e, f), u(e, t), u(t, l), u(t, r), u(r, i), n || ((a = oe(r, 'click', s[8])), (n = !0));
    },
    p: O,
    d(o) {
      o && h(e), (n = !1), a();
    },
  };
}
function wl(s) {
  let e, t, l, r, i, n, a, o, f;
  return {
    c() {
      (e = E('div')),
        (t = E('p')),
        (l = $(`Wrong network, switch to
      `)),
        (r = $(Ye)),
        (i = N()),
        (n = E('button')),
        (a = $('OK')),
        this.h();
    },
    l(c) {
      e = y(c, 'DIV', {class: !0, style: !0});
      var d = g(e);
      t = y(d, 'P', {class: !0});
      var v = g(t);
      (l = I(
        v,
        `Wrong network, switch to
      `
      )),
        (r = I(v, Ye)),
        (i = Y(v)),
        (n = y(v, 'BUTTON', {class: !0}));
      var p = g(n);
      (a = I(p, 'OK')), p.forEach(h), v.forEach(h), d.forEach(h), this.h();
    },
    h() {
      b(n, 'class', 'border-2 border-white p-2'),
        b(t, 'class', 'w-64 text-center rounded-bl-xl rounded-br-xl text-gray-200 bg-pink-600 p-1'),
        b(e, 'class', 'w-full flex items-center justify-center fixed top-0'),
        ct(e, 'z-index', '5');
    },
    m(c, d) {
      S(c, e, d), u(e, t), u(t, l), u(t, r), u(t, i), u(t, n), u(n, a), o || ((f = oe(n, 'click', s[9])), (o = !0));
    },
    p: O,
    d(c) {
      c && h(e), (o = !1), f();
    },
  };
}
function $l(s) {
  return {c: O, l: O, m: O, p: O, d: O};
}
function Il(s) {
  return {c: O, l: O, m: O, p: O, d: O};
}
function El(s) {
  let e, t;
  return (
    (e = new Ce({
      props: {title: s[0], cancelable: !s[1].connecting, closeButton: !1, $$slots: {default: [lr]}, $$scope: {ctx: s}},
    })),
    e.$on('close', s[19]),
    {
      c() {
        x(e.$$.fragment);
      },
      l(l) {
        ee(e.$$.fragment, l);
      },
      m(l, r) {
        te(e, l, r), (t = !0);
      },
      p(l, r) {
        const i = {};
        r & 1 && (i.title = l[0]),
          r & 2 && (i.cancelable = !l[1].connecting),
          r & 1048698 && (i.$$scope = {dirty: r, ctx: l}),
          e.$set(i);
      },
      i(l) {
        t || (R(e.$$.fragment, l), (t = !0));
      },
      o(l) {
        H(e.$$.fragment, l), (t = !1);
      },
      d(l) {
        le(e, l);
      },
    }
  );
}
function yl(s) {
  let e, t;
  return (
    (e = new Ce({props: {title: 'An Error Happened', $$slots: {default: [rr]}, $$scope: {ctx: s}}})),
    e.$on('close', s[13]),
    {
      c() {
        x(e.$$.fragment);
      },
      l(l) {
        ee(e.$$.fragment, l);
      },
      m(l, r) {
        te(e, l, r), (t = !0);
      },
      p(l, r) {
        const i = {};
        r & 1048640 && (i.$$scope = {dirty: r, ctx: l}), e.$set(i);
      },
      i(l) {
        t || (R(e.$$.fragment, l), (t = !0));
      },
      o(l) {
        H(e.$$.fragment, l), (t = !1);
      },
      d(l) {
        le(e, l);
      },
    }
  );
}
function Dl(s) {
  let e, t;
  return (
    (e = new Ce({props: {title: 'An Error Happened', $$slots: {default: [sr]}, $$scope: {ctx: s}}})),
    e.$on('close', s[12]),
    {
      c() {
        x(e.$$.fragment);
      },
      l(l) {
        ee(e.$$.fragment, l);
      },
      m(l, r) {
        te(e, l, r), (t = !0);
      },
      p(l, r) {
        const i = {};
        r & 1048578 && (i.$$scope = {dirty: r, ctx: l}), e.$set(i);
      },
      i(l) {
        t || (R(e.$$.fragment, l), (t = !0));
      },
      o(l) {
        H(e.$$.fragment, l), (t = !1);
      },
      d(l) {
        le(e, l);
      },
    }
  );
}
function Vl(s) {
  let e,
    t,
    l,
    r = s[1].state + '',
    i,
    n,
    a,
    o;
  return (
    (a = new Pe({props: {class: 'mt-4', label: 'Cancel', $$slots: {default: [Yl]}, $$scope: {ctx: s}}})),
    a.$on('click', s[18]),
    {
      c() {
        (e = E('div')), (t = E('p')), (l = $('Flow aborted ')), (i = $(r)), (n = N()), x(a.$$.fragment), this.h();
      },
      l(f) {
        e = y(f, 'DIV', {class: !0});
        var c = g(e);
        t = y(c, 'P', {});
        var d = g(t);
        (l = I(d, 'Flow aborted ')),
          (i = I(d, r)),
          d.forEach(h),
          (n = Y(c)),
          ee(a.$$.fragment, c),
          c.forEach(h),
          this.h();
      },
      h() {
        b(e, 'class', 'text-center');
      },
      m(f, c) {
        S(f, e, c), u(e, t), u(t, l), u(t, i), u(e, n), te(a, e, null), (o = !0);
      },
      p(f, c) {
        (!o || c & 2) && r !== (r = f[1].state + '') && W(i, r);
        const d = {};
        c & 1048576 && (d.$$scope = {dirty: c, ctx: f}), a.$set(d);
      },
      i(f) {
        o || (R(a.$$.fragment, f), (o = !0));
      },
      o(f) {
        H(a.$$.fragment, f), (o = !1);
      },
      d(f) {
        f && h(e), le(a);
      },
    }
  );
}
function Ml(s) {
  let e;
  return {
    c() {
      e = $('Please wait...');
    },
    l(t) {
      e = I(t, 'Please wait...');
    },
    m(t, l) {
      S(t, e, l);
    },
    p: O,
    i: O,
    o: O,
    d(t) {
      t && h(e);
    },
  };
}
function Sl(s) {
  let e;
  function t(i, n) {
    return i[1].pendingUserConfirmation[0] === 'transaction'
      ? Ol
      : i[1].pendingUserConfirmation[0] === 'signature'
      ? Al
      : Ll;
  }
  let l = t(s),
    r = l(s);
  return {
    c() {
      r.c(), (e = re());
    },
    l(i) {
      r.l(i), (e = re());
    },
    m(i, n) {
      r.m(i, n), S(i, e, n);
    },
    p(i, n) {
      l !== (l = t(i)) && (r.d(1), (r = l(i)), r && (r.c(), r.m(e.parentNode, e)));
    },
    i: O,
    o: O,
    d(i) {
      r.d(i), i && h(e);
    },
  };
}
function Pl(s) {
  let e, t, l, r, i;
  function n(f, c) {
    return f[5].code === 4001 ? Xl : f[5].message ? jl : Ul;
  }
  let a = n(s),
    o = a(s);
  return (
    (r = new Pe({props: {class: 'mt-4', label: 'Retry', $$slots: {default: [Rl]}, $$scope: {ctx: s}}})),
    r.$on('click', s[17]),
    {
      c() {
        (e = E('div')), (t = E('p')), o.c(), (l = N()), x(r.$$.fragment), this.h();
      },
      l(f) {
        e = y(f, 'DIV', {class: !0});
        var c = g(e);
        t = y(c, 'P', {});
        var d = g(t);
        o.l(d), d.forEach(h), (l = Y(c)), ee(r.$$.fragment, c), c.forEach(h), this.h();
      },
      h() {
        b(e, 'class', 'text-center');
      },
      m(f, c) {
        S(f, e, c), u(e, t), o.m(t, null), u(e, l), te(r, e, null), (i = !0);
      },
      p(f, c) {
        a === (a = n(f)) && o ? o.p(f, c) : (o.d(1), (o = a(f)), o && (o.c(), o.m(t, null)));
        const d = {};
        c & 1048576 && (d.$$scope = {dirty: c, ctx: f}), r.$set(d);
      },
      i(f) {
        i || (R(r.$$.fragment, f), (i = !0));
      },
      o(f) {
        H(r.$$.fragment, f), (i = !1);
      },
      d(f) {
        f && h(e), o.d(), le(r);
      },
    }
  );
}
function Cl(s) {
  let e, t, l, r;
  const i = [ql, Hl],
    n = [];
  function a(o, f) {
    return o[6].loadingData ? 0 : o[6].notSupported ? 1 : -1;
  }
  return (
    ~(e = a(s)) && (t = n[e] = i[e](s)),
    {
      c() {
        t && t.c(), (l = re());
      },
      l(o) {
        t && t.l(o), (l = re());
      },
      m(o, f) {
        ~e && n[e].m(o, f), S(o, l, f), (r = !0);
      },
      p(o, f) {
        let c = e;
        (e = a(o)),
          e === c
            ? ~e && n[e].p(o, f)
            : (t &&
                (fe(),
                H(n[c], 1, 1, () => {
                  n[c] = null;
                }),
                ue()),
              ~e
                ? ((t = n[e]), t ? t.p(o, f) : ((t = n[e] = i[e](o)), t.c()), R(t, 1), t.m(l.parentNode, l))
                : (t = null));
      },
      i(o) {
        r || (R(t), (r = !0));
      },
      o(o) {
        H(t), (r = !1);
      },
      d(o) {
        ~e && n[e].d(o), o && h(l);
      },
    }
  );
}
function Tl(s) {
  let e, t, l, r;
  const i = [Ql, Wl],
    n = [];
  function a(o, f) {
    return o[6].connecting ? 0 : o[6].error ? 1 : -1;
  }
  return (
    ~(e = a(s)) && (t = n[e] = i[e](s)),
    {
      c() {
        t && t.c(), (l = re());
      },
      l(o) {
        t && t.l(o), (l = re());
      },
      m(o, f) {
        ~e && n[e].m(o, f), S(o, l, f), (r = !0);
      },
      p(o, f) {
        let c = e;
        (e = a(o)),
          e === c
            ? ~e && n[e].p(o, f)
            : (t &&
                (fe(),
                H(n[c], 1, 1, () => {
                  n[c] = null;
                }),
                ue()),
              ~e
                ? ((t = n[e]), t ? t.p(o, f) : ((t = n[e] = i[e](o)), t.c()), R(t, 1), t.m(l.parentNode, l))
                : (t = null));
      },
      i(o) {
        r || (R(t), (r = !0));
      },
      o(o) {
        H(t), (r = !1);
      },
      d(o) {
        ~e && n[e].d(o), o && h(l);
      },
    }
  );
}
function Bl(s) {
  let e, t, l, r;
  const i = [Kl, Gl],
    n = [];
  function a(o, f) {
    return o[1].unlocking ? 0 : 1;
  }
  return (
    (e = a(s)),
    (t = n[e] = i[e](s)),
    {
      c() {
        t.c(), (l = re());
      },
      l(o) {
        t.l(o), (l = re());
      },
      m(o, f) {
        n[e].m(o, f), S(o, l, f), (r = !0);
      },
      p(o, f) {
        let c = e;
        (e = a(o)),
          e === c
            ? n[e].p(o, f)
            : (fe(),
              H(n[c], 1, 1, () => {
                n[c] = null;
              }),
              ue(),
              (t = n[e]),
              t ? t.p(o, f) : ((t = n[e] = i[e](o)), t.c()),
              R(t, 1),
              t.m(l.parentNode, l));
      },
      i(o) {
        r || (R(t), (r = !0));
      },
      o(o) {
        H(t), (r = !1);
      },
      d(o) {
        n[e].d(o), o && h(l);
      },
    }
  );
}
function Nl(s) {
  let e, t, l, r;
  const i = [er, xl, Jl],
    n = [];
  function a(o, f) {
    return o[1].loadingModule ? 0 : o[1].connecting ? 1 : 2;
  }
  return (
    (e = a(s)),
    (t = n[e] = i[e](s)),
    {
      c() {
        t.c(), (l = re());
      },
      l(o) {
        t.l(o), (l = re());
      },
      m(o, f) {
        n[e].m(o, f), S(o, l, f), (r = !0);
      },
      p(o, f) {
        let c = e;
        (e = a(o)),
          e === c
            ? n[e].p(o, f)
            : (fe(),
              H(n[c], 1, 1, () => {
                n[c] = null;
              }),
              ue(),
              (t = n[e]),
              t ? t.p(o, f) : ((t = n[e] = i[e](o)), t.c()),
              R(t, 1),
              t.m(l.parentNode, l));
      },
      i(o) {
        r || (R(t), (r = !0));
      },
      o(o) {
        H(t), (r = !1);
      },
      d(o) {
        n[e].d(o), o && h(l);
      },
    }
  );
}
function Yl(s) {
  let e;
  return {
    c() {
      e = $('OK');
    },
    l(t) {
      e = I(t, 'OK');
    },
    m(t, l) {
      S(t, e, l);
    },
    d(t) {
      t && h(e);
    },
  };
}
function Ll(s) {
  let e;
  return {
    c() {
      e = $('Please accept request...');
    },
    l(t) {
      e = I(t, 'Please accept request...');
    },
    m(t, l) {
      S(t, e, l);
    },
    d(t) {
      t && h(e);
    },
  };
}
function Al(s) {
  let e;
  return {
    c() {
      e = $('Please accept signature...');
    },
    l(t) {
      e = I(t, 'Please accept signature...');
    },
    m(t, l) {
      S(t, e, l);
    },
    d(t) {
      t && h(e);
    },
  };
}
function Ol(s) {
  let e;
  return {
    c() {
      e = $('Please accept transaction...');
    },
    l(t) {
      e = I(t, 'Please accept transaction...');
    },
    m(t, l) {
      S(t, e, l);
    },
    d(t) {
      t && h(e);
    },
  };
}
function Ul(s) {
  let e, t;
  return {
    c() {
      (e = $('Error: ')), (t = $(s[5]));
    },
    l(l) {
      (e = I(l, 'Error: ')), (t = I(l, s[5]));
    },
    m(l, r) {
      S(l, e, r), S(l, t, r);
    },
    p(l, r) {
      r & 32 && W(t, l[5]);
    },
    d(l) {
      l && h(e), l && h(t);
    },
  };
}
function jl(s) {
  let e = s[5].message + '',
    t;
  return {
    c() {
      t = $(e);
    },
    l(l) {
      t = I(l, e);
    },
    m(l, r) {
      S(l, t, r);
    },
    p(l, r) {
      r & 32 && e !== (e = l[5].message + '') && W(t, e);
    },
    d(l) {
      l && h(t);
    },
  };
}
function Xl(s) {
  let e;
  return {
    c() {
      e = $('You rejected the request');
    },
    l(t) {
      e = I(t, 'You rejected the request');
    },
    m(t, l) {
      S(t, e, l);
    },
    p: O,
    d(t) {
      t && h(e);
    },
  };
}
function Rl(s) {
  let e;
  return {
    c() {
      e = $('Retry');
    },
    l(t) {
      e = I(t, 'Retry');
    },
    m(t, l) {
      S(t, e, l);
    },
    d(t) {
      t && h(e);
    },
  };
}
function Hl(s) {
  let e, t, l, r, i;
  return (
    (r = new Pe({props: {label: 'Unlock Wallet', $$slots: {default: [zl]}, $$scope: {ctx: s}}})),
    r.$on('click', s[9]),
    {
      c() {
        (e = $(`Please switch to
        `)),
          (t = $(Ye)),
          (l = N()),
          x(r.$$.fragment);
      },
      l(n) {
        (e = I(
          n,
          `Please switch to
        `
        )),
          (t = I(n, Ye)),
          (l = Y(n)),
          ee(r.$$.fragment, n);
      },
      m(n, a) {
        S(n, e, a), S(n, t, a), S(n, l, a), te(r, n, a), (i = !0);
      },
      p(n, a) {
        const o = {};
        a & 1048576 && (o.$$scope = {dirty: a, ctx: n}), r.$set(o);
      },
      i(n) {
        i || (R(r.$$.fragment, n), (i = !0));
      },
      o(n) {
        H(r.$$.fragment, n), (i = !1);
      },
      d(n) {
        n && h(e), n && h(t), n && h(l), le(r, n);
      },
    }
  );
}
function ql(s) {
  let e;
  return {
    c() {
      e = $('Loading contracts...');
    },
    l(t) {
      e = I(t, 'Loading contracts...');
    },
    m(t, l) {
      S(t, e, l);
    },
    p: O,
    i: O,
    o: O,
    d(t) {
      t && h(e);
    },
  };
}
function zl(s) {
  let e;
  return {
    c() {
      e = $('Switch');
    },
    l(t) {
      e = I(t, 'Switch');
    },
    m(t, l) {
      S(t, e, l);
    },
    d(t) {
      t && h(e);
    },
  };
}
function Wl(s) {
  var o;
  let e,
    t,
    l = (((o = s[6].error) == null ? void 0 : o.message) || '' + s[6].error) + '',
    r,
    i,
    n,
    a;
  return (
    (n = new Pe({props: {class: 'mt-4', label: 'OK', $$slots: {default: [Fl]}, $$scope: {ctx: s}}})),
    n.$on('click', s[16]),
    {
      c() {
        (e = E('div')), (t = E('p')), (r = $(l)), (i = N()), x(n.$$.fragment), this.h();
      },
      l(f) {
        e = y(f, 'DIV', {class: !0});
        var c = g(e);
        t = y(c, 'P', {});
        var d = g(t);
        (r = I(d, l)), d.forEach(h), (i = Y(c)), ee(n.$$.fragment, c), c.forEach(h), this.h();
      },
      h() {
        b(e, 'class', 'text-center');
      },
      m(f, c) {
        S(f, e, c), u(e, t), u(t, r), u(e, i), te(n, e, null), (a = !0);
      },
      p(f, c) {
        var v;
        (!a || c & 64) &&
          l !== (l = (((v = f[6].error) == null ? void 0 : v.message) || '' + f[6].error) + '') &&
          W(r, l);
        const d = {};
        c & 1048576 && (d.$$scope = {dirty: c, ctx: f}), n.$set(d);
      },
      i(f) {
        a || (R(n.$$.fragment, f), (a = !0));
      },
      o(f) {
        H(n.$$.fragment, f), (a = !1);
      },
      d(f) {
        f && h(e), le(n);
      },
    }
  );
}
function Ql(s) {
  let e;
  return {
    c() {
      e = $('Connecting...');
    },
    l(t) {
      e = I(t, 'Connecting...');
    },
    m(t, l) {
      S(t, e, l);
    },
    p: O,
    i: O,
    o: O,
    d(t) {
      t && h(e);
    },
  };
}
function Fl(s) {
  let e;
  return {
    c() {
      e = $('OK');
    },
    l(t) {
      e = I(t, 'OK');
    },
    m(t, l) {
      S(t, e, l);
    },
    d(t) {
      t && h(e);
    },
  };
}
function Gl(s) {
  let e, t;
  return (
    (e = new Pe({props: {label: 'Unlock Wallet', $$slots: {default: [Zl]}, $$scope: {ctx: s}}})),
    e.$on('click', s[15]),
    {
      c() {
        x(e.$$.fragment);
      },
      l(l) {
        ee(e.$$.fragment, l);
      },
      m(l, r) {
        te(e, l, r), (t = !0);
      },
      p(l, r) {
        const i = {};
        r & 1048576 && (i.$$scope = {dirty: r, ctx: l}), e.$set(i);
      },
      i(l) {
        t || (R(e.$$.fragment, l), (t = !0));
      },
      o(l) {
        H(e.$$.fragment, l), (t = !1);
      },
      d(l) {
        le(e, l);
      },
    }
  );
}
function Kl(s) {
  let e;
  return {
    c() {
      e = $('Please accept the application to access your wallet.');
    },
    l(t) {
      e = I(t, 'Please accept the application to access your wallet.');
    },
    m(t, l) {
      S(t, e, l);
    },
    p: O,
    i: O,
    o: O,
    d(t) {
      t && h(e);
    },
  };
}
function Zl(s) {
  let e;
  return {
    c() {
      e = $('Unlock');
    },
    l(t) {
      e = I(t, 'Unlock');
    },
    m(t, l) {
      S(t, e, l);
    },
    d(t) {
      t && h(e);
    },
  };
}
function Jl(s) {
  let e,
    t,
    l,
    r,
    i,
    n,
    a,
    o,
    f = s[3],
    c = [];
  for (let v = 0; v < f.length; v += 1) c[v] = pt(vt(s, f, v));
  let d = s[4] && mt(s);
  return {
    c() {
      (e = E('div')), (t = E('p')), (l = $('You need to connect your wallet.')), (r = N()), (i = E('div'));
      for (let v = 0; v < c.length; v += 1) c[v].c();
      (n = N()), d && d.c(), (a = re()), this.h();
    },
    l(v) {
      e = y(v, 'DIV', {class: !0});
      var p = g(e);
      t = y(p, 'P', {});
      var k = g(t);
      (l = I(k, 'You need to connect your wallet.')),
        k.forEach(h),
        p.forEach(h),
        (r = Y(v)),
        (i = y(v, 'DIV', {class: !0}));
      var _ = g(i);
      for (let m = 0; m < c.length; m += 1) c[m].l(_);
      _.forEach(h), (n = Y(v)), d && d.l(v), (a = re()), this.h();
    },
    h() {
      b(e, 'class', 'text-center'), b(i, 'class', 'flex flex-wrap justify-center pb-3');
    },
    m(v, p) {
      S(v, e, p), u(e, t), u(t, l), S(v, r, p), S(v, i, p);
      for (let k = 0; k < c.length; k += 1) c[k].m(i, null);
      S(v, n, p), d && d.m(v, p), S(v, a, p), (o = !0);
    },
    p(v, p) {
      if (p & 8) {
        f = v[3];
        let k;
        for (k = 0; k < f.length; k += 1) {
          const _ = vt(v, f, k);
          c[k] ? c[k].p(_, p) : ((c[k] = pt(_)), c[k].c(), c[k].m(i, null));
        }
        for (; k < c.length; k += 1) c[k].d(1);
        c.length = f.length;
      }
      v[4]
        ? d
          ? (d.p(v, p), p & 16 && R(d, 1))
          : ((d = mt(v)), d.c(), R(d, 1), d.m(a.parentNode, a))
        : d &&
          (fe(),
          H(d, 1, 1, () => {
            d = null;
          }),
          ue());
    },
    i(v) {
      o || (R(d), (o = !0));
    },
    o(v) {
      H(d), (o = !1);
    },
    d(v) {
      v && h(e), v && h(r), v && h(i), De(c, v), v && h(n), d && d.d(v), v && h(a);
    },
  };
}
function xl(s) {
  let e;
  return {
    c() {
      e = $('Connecting to wallet...');
    },
    l(t) {
      e = I(t, 'Connecting to wallet...');
    },
    m(t, l) {
      S(t, e, l);
    },
    p: O,
    i: O,
    o: O,
    d(t) {
      t && h(e);
    },
  };
}
function er(s) {
  let e,
    t = s[1].selected + '',
    l;
  return {
    c() {
      (e = $(`Loading module:
        `)),
        (l = $(t));
    },
    l(r) {
      (e = I(
        r,
        `Loading module:
        `
      )),
        (l = I(r, t));
    },
    m(r, i) {
      S(r, e, i), S(r, l, i);
    },
    p(r, i) {
      i & 2 && t !== (t = r[1].selected + '') && W(l, t);
    },
    i: O,
    o: O,
    d(r) {
      r && h(e), r && h(l);
    },
  };
}
function pt(s) {
  let e, t, l, r, i;
  function n() {
    return s[14](s[21]);
  }
  return {
    c() {
      (e = E('img')), this.h();
    },
    l(a) {
      (e = y(a, 'IMG', {class: !0, alt: !0, src: !0})), this.h();
    },
    h() {
      b(e, 'class', 'cursor-pointer p-2 m-2 border-2 h-12 w-12 object-contain'),
        b(e, 'alt', (t = `Login with ${s[21].name}`)),
        Fe(e.src, (l = `${et}/${s[21].img}`)) || b(e, 'src', l);
    },
    m(a, o) {
      S(a, e, o), r || ((i = oe(e, 'click', n)), (r = !0));
    },
    p(a, o) {
      (s = a),
        o & 8 && t !== (t = `Login with ${s[21].name}`) && b(e, 'alt', t),
        o & 8 && !Fe(e.src, (l = `${et}/${s[21].img}`)) && b(e, 'src', l);
    },
    d(a) {
      a && h(e), (r = !1), i();
    },
  };
}
function mt(s) {
  let e, t, l, r, i, n;
  return (
    (i = new Pe({
      props: {
        label: 'Download Metamask',
        blank: !0,
        href: 'https://metamask.io/download.html',
        class: 'm-4 w-max-content',
        $$slots: {default: [tr]},
        $$scope: {ctx: s},
      },
    })),
    {
      c() {
        (e = E('div')), (t = $('OR')), (l = N()), (r = E('div')), x(i.$$.fragment), this.h();
      },
      l(a) {
        e = y(a, 'DIV', {class: !0});
        var o = g(e);
        (t = I(o, 'OR')), o.forEach(h), (l = Y(a)), (r = y(a, 'DIV', {class: !0}));
        var f = g(r);
        ee(i.$$.fragment, f), f.forEach(h), this.h();
      },
      h() {
        b(e, 'class', 'text-center'), b(r, 'class', 'flex justify-center');
      },
      m(a, o) {
        S(a, e, o), u(e, t), S(a, l, o), S(a, r, o), te(i, r, null), (n = !0);
      },
      p(a, o) {
        const f = {};
        o & 1048576 && (f.$$scope = {dirty: o, ctx: a}), i.$set(f);
      },
      i(a) {
        n || (R(i.$$.fragment, a), (n = !0));
      },
      o(a) {
        H(i.$$.fragment, a), (n = !1);
      },
      d(a) {
        a && h(e), a && h(l), a && h(r), le(i);
      },
    }
  );
}
function tr(s) {
  let e, t, l;
  return {
    c() {
      (e = E('img')),
        (l = $(`
              Download metamask`)),
        this.h();
    },
    l(r) {
      (e = y(r, 'IMG', {class: !0, alt: !0, src: !0})),
        (l = I(
          r,
          `
              Download metamask`
        )),
        this.h();
    },
    h() {
      b(e, 'class', 'cursor-pointer p-0 mx-2 h-10 w-10 object-contain'),
        b(e, 'alt', 'Download Metamask}'),
        Fe(e.src, (t = `${et}/images/metamask.svg`)) || b(e, 'src', t);
    },
    m(r, i) {
      S(r, e, i), S(r, l, i);
    },
    p: O,
    d(r) {
      r && h(e), r && h(l);
    },
  };
}
function lr(s) {
  let e, t, l, r;
  const i = [Nl, Bl, Tl, Cl, Pl, Sl, Ml, Vl],
    n = [];
  function a(o, f) {
    return o[1].state === 'Idle'
      ? 0
      : o[1].state === 'Locked'
      ? 1
      : o[6].state === 'Idle'
      ? 2
      : o[6].state === 'Connected'
      ? 3
      : o[5]
      ? 4
      : o[1].pendingUserConfirmation
      ? 5
      : o[1].state === 'Ready'
      ? 6
      : 7;
  }
  return (
    (e = a(s)),
    (t = n[e] = i[e](s)),
    {
      c() {
        t.c(), (l = re());
      },
      l(o) {
        t.l(o), (l = re());
      },
      m(o, f) {
        n[e].m(o, f), S(o, l, f), (r = !0);
      },
      p(o, f) {
        let c = e;
        (e = a(o)),
          e === c
            ? n[e].p(o, f)
            : (fe(),
              H(n[c], 1, 1, () => {
                n[c] = null;
              }),
              ue(),
              (t = n[e]),
              t ? t.p(o, f) : ((t = n[e] = i[e](o)), t.c()),
              R(t, 1),
              t.m(l.parentNode, l));
      },
      i(o) {
        r || (R(t), (r = !0));
      },
      o(o) {
        H(t), (r = !1);
      },
      d(o) {
        n[e].d(o), o && h(l);
      },
    }
  );
}
function rr(s) {
  let e,
    t = s[6].error.message + '',
    l;
  return {
    c() {
      (e = E('p')), (l = $(t)), this.h();
    },
    l(r) {
      e = y(r, 'P', {class: !0});
      var i = g(e);
      (l = I(i, t)), i.forEach(h), this.h();
    },
    h() {
      b(e, 'class', 'w-64 text-center text-red-500 p-1');
    },
    m(r, i) {
      S(r, e, i), u(e, l);
    },
    p(r, i) {
      i & 64 && t !== (t = r[6].error.message + '') && W(l, t);
    },
    d(r) {
      r && h(e);
    },
  };
}
function sr(s) {
  let e,
    t = s[1].error.message + '',
    l;
  return {
    c() {
      (e = E('p')), (l = $(t)), this.h();
    },
    l(r) {
      e = y(r, 'P', {class: !0});
      var i = g(e);
      (l = I(i, t)), i.forEach(h), this.h();
    },
    h() {
      b(e, 'class', 'w-64 text-center text-red-500 p-1');
    },
    m(r, i) {
      S(r, e, i), u(e, l);
    },
    p(r, i) {
      i & 2 && t !== (t = r[1].error.message + '') && W(l, t);
    },
    d(r) {
      r && h(e);
    },
  };
}
function nr(s) {
  let e, t, l, r, i, n;
  const a = s[11].default,
    o = He(a, s, s[20], null);
  function f(_, m) {
    if (_[6].state === 'Idle' && !_[6].connecting && _[7].state === 'Idle' && !_[7].connecting) return Il;
    if (_[6].state === 'Idle' && !_[6].connecting && _[7].error) return $l;
    if (_[6].notSupported) return wl;
    if (_[6].genesisChanged) return gl;
  }
  let c = f(s),
    d = c && c(s);
  const v = [Dl, yl, El],
    p = [];
  function k(_, m) {
    return _[1].error ? 0 : _[6].error ? 1 : _[2].inProgress ? 2 : -1;
  }
  return (
    ~(l = k(s)) && (r = p[l] = v[l](s)),
    {
      c() {
        o && o.c(), (e = N()), d && d.c(), (t = N()), r && r.c(), (i = re());
      },
      l(_) {
        o && o.l(_), (e = Y(_)), d && d.l(_), (t = Y(_)), r && r.l(_), (i = re());
      },
      m(_, m) {
        o && o.m(_, m), S(_, e, m), d && d.m(_, m), S(_, t, m), ~l && p[l].m(_, m), S(_, i, m), (n = !0);
      },
      p(_, [m]) {
        o && o.p && (!n || m & 1048576) && qe(o, a, _, _[20], n ? We(a, _[20], m, null) : ze(_[20]), null),
          c === (c = f(_)) && d ? d.p(_, m) : (d && d.d(1), (d = c && c(_)), d && (d.c(), d.m(t.parentNode, t)));
        let w = l;
        (l = k(_)),
          l === w
            ? ~l && p[l].p(_, m)
            : (r &&
                (fe(),
                H(p[w], 1, 1, () => {
                  p[w] = null;
                }),
                ue()),
              ~l
                ? ((r = p[l]), r ? r.p(_, m) : ((r = p[l] = v[l](_)), r.c()), R(r, 1), r.m(i.parentNode, i))
                : (r = null));
      },
      i(_) {
        n || (R(o, _), R(r), (n = !0));
      },
      o(_) {
        H(o, _), H(r), (n = !1);
      },
      d(_) {
        o && o.d(_), _ && h(e), d && d.d(_), _ && h(t), ~l && p[l].d(_), _ && h(i);
      },
    }
  );
}
function ir(s, e, t) {
  let l, r, i, n, a, o, f;
  Ie(s, al, (B) => t(10, (i = B))),
    Ie(s, Be, (B) => t(1, (n = B))),
    Ie(s, be, (B) => t(2, (a = B))),
    Ie(s, Ne, (B) => t(6, (o = B))),
    Ie(s, cl, (B) => t(7, (f = B)));
  let {$$slots: c = {}, $$scope: d} = e,
    {title: v = ''} = e,
    p = [];
  function k() {
    Ne.acknowledgeNewGenesisHash();
  }
  async function _() {
    let B;
    const j = [];
    await Ne.switchChain(fl, {chainName: Ye, rpcUrls: j, blockExplorerUrls: B});
  }
  const m = () => Be.acknowledgeError(),
    w = () => Ne.acknowledgeError(),
    V = (B) => Be.connect(B.id),
    D = () => Be.unlock(),
    U = () => be.cancel(),
    L = () => be.retry(),
    C = () => be.cancel(),
    P = () => be.cancel();
  return (
    (s.$$set = (B) => {
      'title' in B && t(0, (v = B.title)), '$$scope' in B && t(20, (d = B.$$scope));
    }),
    (s.$$.update = () => {
      s.$$.dirty & 4 && t(5, (l = a.executionError)),
        s.$$.dirty & 1026 && t(4, (r = n.options.filter((B) => B === 'builtin' && !i.available).length > 0)),
        s.$$.dirty & 1026 &&
          t(
            3,
            (p = n.options
              .filter((B) => B !== 'builtin' || i.available)
              .map((B) => ({
                img: ((j) => {
                  if (j === 'builtin') {
                    if (i.state === 'Ready') {
                      if (i.vendor === 'Metamask') return 'images/metamask.svg';
                      if (i.vendor === 'Opera') return 'images/opera.svg';
                    }
                    return 'images/web3-default.png';
                  } else return j.startsWith('torus-') ? `images/torus/${j.slice(6)}.svg` : `images/${j}.svg`;
                })(B),
                id: B,
                name: B,
              })))
          );
    }),
    [v, n, a, p, r, l, o, f, k, _, i, c, m, w, V, D, U, L, C, P, d]
  );
}
class or extends ge {
  constructor(e) {
    super();
    we(this, e, ir, nr, $e, {title: 0});
  }
}
const ar = {fetching: !1, stale: !1, error: void 0, data: void 0, extensions: void 0},
  cr = Gt.concat();
class fr {
  constructor(e) {
    e ? (this.client = new Kt({url: e, exchanges: cr})) : console.error('need an url for graphql queries');
  }
  mutate(e, t) {
    return this.client.mutation(e, t == null ? void 0 : t.variables, t == null ? void 0 : t.context).toPromise();
  }
  query(e, t) {
    return this.client.query(e, t == null ? void 0 : t.variables, t == null ? void 0 : t.context).toPromise();
  }
  async queryList(e, t) {
    const l = t.path.split('.'),
      r = 100;
    let i = '0x0',
      n = r,
      a = [];
    for (; n === r; ) {
      const o = await this.client
        .query(e, Se({first: r, lastId: i}, t == null ? void 0 : t.variables), t == null ? void 0 : t.context)
        .toPromise();
      if (o.error) throw new Error(o.error.message);
      const f = o.data;
      let c = [];
      if (f && t.path) {
        let d = f;
        for (const v of l) d = d[v];
        c = d;
      }
      if (((n = c.length), n > 0)) {
        const d = (t == null ? void 0 : t.getLastId) !== void 0 ? (t == null ? void 0 : t.getLastId(a)) : c[n - 1].id;
        if (i === d) {
          console.log('same query, stop');
          break;
        }
        i = d;
      }
      a = a.concat(c);
    }
    return a;
  }
  subscribeToQuery(e, t) {
    const l = Ge(
      Zt([
        ft({fetching: !0, stale: !1}),
        Ge(
          this.client.query(e, t == null ? void 0 : t.variables, t == null ? void 0 : t.context),
          Jt(({stale: r, data: i, error: n, extensions: a}) => ({
            fetching: !1,
            stale: !!r,
            data: i,
            error: n,
            extensions: a,
          }))
        ),
        ft({fetching: !1, stale: !1}),
      ]),
      xt((r, i) => Se(Se({}, r), i), ar)
    );
    return {
      subscribe(r) {
        return Ge(l, el(r)).unsubscribe;
      },
    };
  }
}
const lt = new fr(ul);
function bt(s, e) {
  for (const t of Object.keys(e))
    s[t] && typeof s[t] == 'object' && typeof e[t] == 'object' ? bt(s[t], e[t]) : (s[t] = e[t]);
}
class ur {
  constructor(e) {
    (this.$store = e), (this.store = tl(this.$store));
  }
  subscribe(e, t) {
    return this.store.subscribe(e, t);
  }
  setPartial(e) {
    this.$store || (this.$store = {});
    for (const t of Object.keys(e)) this.$store[t] = e[t];
    return this.store.set(this.$store), this.$store;
  }
  set(e) {
    if ((this.$store || (this.$store = {}), e || (this.$store = e), e !== this.$store)) {
      for (const t of Object.keys(this.$store)) e[t] === void 0 && (this.$store[t] = void 0);
      for (const t of Object.keys(e)) this.$store[t] = e[t];
    }
    return this.store.set(this.$store), this.$store;
  }
}
class dr extends ur {
  constructor(e) {
    super(e);
  }
  setData(e, t) {
    return (
      (this.$store.data = this.$store.data || {}),
      bt(this.$store.data, e),
      t && this.setPartial(t),
      this.store.set(this.$store),
      this.$store
    );
  }
}
const Le = ll('graphql');
class hr extends dr {
  constructor(e, t, l) {
    super({step: 'IDLE'});
    (this.endpoint = e), (this.query = t), (this.options = l), (this.runtimeVariables = {});
  }
  acknowledgeError() {
    this.setPartial({error: void 0});
  }
  async fetch(e) {
    var a, o, f, c, d, v, p;
    Le.info('fetching....');
    const t =
      typeof ((o = (a = this.options) == null ? void 0 : a.variables) == null ? void 0 : o.first) == 'number'
        ? (c = (f = this.options) == null ? void 0 : f.variables) == null
          ? void 0
          : c.first
        : 1e3;
    let l = t,
      r = '0x0',
      i,
      n;
    for (; l === t; )
      try {
        const k = Se(
            Se(Se({first: t, lastId: r}, (d = this.options) == null ? void 0 : d.variables), this.runtimeVariables),
            e
          ),
          _ = this.query.split('?');
        let m = '';
        for (let D = 0; D < _.length; D++) {
          const U = _[D];
          U.startsWith('$') ? k[U.substr(1)] || D++ : (m += U);
        }
        const w = await this.endpoint.query(m, {variables: k, context: {requestPolicy: 'cache-and-network'}});
        if (!w.data)
          throw (
            (this.setPartial({error: 'cannot fetch from thegraph node'}), new Error('cannot fetch from thegraph node'))
          );
        const V = ((v = this.options) == null ? void 0 : v.path) ? w.data[this.options.path] : w.data;
        if ((i || (i = V), (p = this.options) == null ? void 0 : p.list)) {
          let D = V;
          if (
            (typeof this.options.list != 'boolean' && this.options.list.path && (D = V[this.options.list.path]),
            (l = D.length),
            l > 0)
          ) {
            const U =
              typeof this.options.list != 'boolean' && this.options.list.getLastId !== void 0
                ? this.options.list.getLastId(D)
                : D[l - 1].id;
            if (r === U) {
              Le.log('same query, stop');
              break;
            }
            r = U;
          }
          n ? n.push(...D) : (n = D);
        } else l = 0;
      } catch (k) {
        (l = 0), Le.error(k);
      }
    this.setPartial({data: i, step: 'READY'});
  }
}
class rt extends hr {
  constructor(e, t, l, r) {
    super(e, t, r);
    (this.listenerCount = 0), (this.hook = l);
  }
  acknowledgeError() {
    this.setPartial({error: void 0});
  }
  subscribe(e, t) {
    this.listenerCount++,
      this.listenerCount === 1 &&
        (Le.info('start fetching'),
        (this.stopUpdates = this.hook.subscribe((r) => this.fetch({blockNumber: r.lastBlockNumber}))));
    const l = this.store.subscribe(e, t);
    return () => {
      this.listenerCount--,
        this.listenerCount === 0 &&
          (Le.info('stop fetching'), this.stopUpdates && (this.stopUpdates(), (this.stopUpdates = void 0))),
        l();
    };
  }
}
class _r {
  constructor(e, t) {
    (this.transactions = t),
      (this.queryStore = new rt(
        e,
        `
    query {
      players {
        id
        startTimestamp
        woodSkill
        stoneSkill
        vouch
        startX
        startY
        endTile.x
        endTile.y
        balances {
          id
          value
          item {
            id
            name
            symbol
          }
        }
      }
    }`,
        xe,
        {path: 'players'}
      )),
      (this.store = Ke([this.queryStore, this.transactions], (l) => this.update(l)));
  }
  update([e]) {
    if (e.data) {
      let t = e.data;
      return {step: e.step, error: e.error, data: t};
    } else return e;
  }
  acknowledgeError() {
    return this.queryStore.acknowledgeError();
  }
  subscribe(e, t) {
    return this.store.subscribe(e, t);
  }
}
const vr = new _r(lt, Je),
  Xe = 10,
  kt = 10,
  ye = (s, e, t, l) => {
    const r = t - s,
      i = l - e;
    return Math.sqrt(r * r + i * i);
  },
  ne = (s, e) => {
    if ((s == 0 && e == 0) || s > 10 || s < -9 || e > 10 || e < -9) return 0;
    const t = new rl(),
      l = Ze.from(sl(t.encode(['int256', 'int256'], [s, e])))
        .mod(Ze.from(5))
        .toNumber();
    return l < 2 ? 0 : l < 4 ? 1 : 2;
  },
  Ee = (s, e) => {
    const t = (e - parseInt(s.startTimestamp)) / 10,
      l = ye(parseInt(s.startX), parseInt(s.startY), parseInt(s.endTile.x), parseInt(s.endTile.y));
    if (t < l) {
      const r = parseInt(s.endTile.x) - parseInt(s.startX),
        i = parseInt(s.endTile.y) - parseInt(s.startY);
      return [parseInt(s.startX) + (r * t) / l, parseInt(s.startY) + (i * t) / l];
    }
    return [parseInt(s.endTile.x), parseInt(s.endTile.y)];
  },
  ie = (s, e, t) => {
    const l = (e - parseInt(s.startTimestamp)) / Xe,
      r = ye(parseInt(s.startX), parseInt(s.startY), parseInt(s.endTile.x), parseInt(s.endTile.y)),
      i = parseInt(t === 1 ? s.woodSkill : s.stoneSkill),
      n = ne(parseInt(s.endTile.x), parseInt(s.endTile.y));
    return l >= r && t.toString() === n.toString() ? i + (e - (parseInt(s.startTimestamp) + r * Xe)) / kt : i;
  },
  ve = (s, e, t) => {
    const l = s.balances.find((f) => f.item.id === t.toString()),
      r = l ? parseInt(l.value) : 0,
      i = parseInt(t === '1' ? s.woodSkill : s.stoneSkill),
      n = (e - parseInt(s.startTimestamp)) / Xe,
      a = ye(parseInt(s.startX), parseInt(s.startY), parseInt(s.endTile.x), parseInt(s.endTile.y)),
      o = ne(parseInt(s.endTile.x), parseInt(s.endTile.y));
    if (n >= a && t.toString() === o.toString()) {
      const f = (e - (parseInt(s.startTimestamp) + a * Xe)) / kt;
      return r + f * i + (f * f) / 2;
    }
    return r;
  };
function pr(s) {
  let e, t, l, r, i, n, a;
  return {
    c() {
      (e = pe('svg')),
        (t = pe('path')),
        (l = pe('path')),
        (r = pe('defs')),
        (i = pe('linearGradient')),
        (n = pe('stop')),
        (a = pe('stop')),
        this.h();
    },
    l(o) {
      e = me(o, 'svg', {class: !0, width: !0, height: !0, viewBox: !0, fill: !0, xmlns: !0});
      var f = g(e);
      (t = me(f, 'path', {d: !0, fill: !0})),
        g(t).forEach(h),
        (l = me(f, 'path', {d: !0, fill: !0})),
        g(l).forEach(h),
        (r = me(f, 'defs', {}));
      var c = g(r);
      i = me(c, 'linearGradient', {id: !0, x1: !0, y1: !0, x2: !0, y2: !0, gradientUnits: !0});
      var d = g(i);
      (n = me(d, 'stop', {'stop-color': !0})),
        g(n).forEach(h),
        (a = me(d, 'stop', {offset: !0, 'stop-color': !0})),
        g(a).forEach(h),
        d.forEach(h),
        c.forEach(h),
        f.forEach(h),
        this.h();
    },
    h() {
      b(
        t,
        'd',
        'M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z'
      ),
        b(t, 'fill', 'url(#paint0_linear)'),
        b(
          l,
          'd',
          'M12.744 6.67999H11.7947C11.272 5.22932 9.86668 4.23466 8.01334 4.23466H4.96534V6.67999H3.90668V7.55732H4.96534V8.47732H3.90668V9.35466H4.96534V11.7707H8.01334C9.84534 11.7707 11.24 10.784 11.776 9.35466H12.744V8.47732H11.9893C12.008 8.32266 12.0187 8.16266 12.0187 8.00266V7.98132C12.0187 7.83732 12.0107 7.69599 11.9973 7.55732H12.7467V6.67999H12.744ZM5.81868 5.01599H8.01334C9.37334 5.01599 10.384 5.68532 10.8507 6.67732H5.81868V5.01599ZM8.01334 10.9813H5.81868V9.35199H10.8453C10.376 10.328 9.36801 10.9813 8.01334 10.9813ZM11.136 8.02132C11.136 8.17599 11.1253 8.32799 11.104 8.47466H5.81868V7.55466H11.1067C11.1253 7.69866 11.136 7.84799 11.136 7.99999V8.02132Z'
        ),
        b(l, 'fill', 'white'),
        b(n, 'stop-color', '#F9A606'),
        b(a, 'offset', '1'),
        b(a, 'stop-color', '#FBCC5F'),
        b(i, 'id', 'paint0_linear'),
        b(i, 'x1', '8'),
        b(i, 'y1', '-2.26667'),
        b(i, 'x2', '8'),
        b(i, 'y2', '17.68'),
        b(i, 'gradientUnits', 'userSpaceOnUse'),
        b(e, 'class', 'dai'),
        b(e, 'width', '16'),
        b(e, 'height', '16'),
        b(e, 'viewBox', '0 0 16 16'),
        b(e, 'fill', 'none'),
        b(e, 'xmlns', 'http://www.w3.org/2000/svg');
    },
    m(o, f) {
      S(o, e, f), u(e, t), u(e, l), u(e, r), u(r, i), u(i, n), u(i, a);
    },
    p: O,
    i: O,
    o: O,
    d(o) {
      o && h(e);
    },
  };
}
class Ae extends ge {
  constructor(e) {
    super();
    we(this, e, null, pr, $e, {});
  }
}
class mr {
  constructor(e, t) {
    (this.transactions = t),
      (this.queryStore = new rt(
        e,
        `
    query {
      items(where: {id_in: [3, 4]}) {
        id
        name
        symbol
        stake
      }
    }`,
        xe,
        {path: 'items'}
      )),
      (this.store = Ke([this.queryStore, this.transactions], (l) => this.update(l)));
  }
  update([e]) {
    if (e.data) {
      let t = e.data;
      return {step: e.step, error: e.error, data: t};
    } else return e;
  }
  acknowledgeError() {
    return this.queryStore.acknowledgeError();
  }
  subscribe(e, t) {
    return this.store.subscribe(e, t);
  }
}
const br = new mr(lt, Je);
function gt(s, e, t) {
  const l = s.slice();
  return (l[10] = e[t]), l;
}
function wt(s) {
  let e, t;
  return (
    (e = new Ce({props: {title: 'Shop', closeButton: !0, $$slots: {default: [Dr]}, $$scope: {ctx: s}}})),
    e.$on('close', s[8]),
    {
      c() {
        x(e.$$.fragment);
      },
      l(l) {
        ee(e.$$.fragment, l);
      },
      m(l, r) {
        te(e, l, r), (t = !0);
      },
      p(l, r) {
        const i = {};
        r & 8203 && (i.$$scope = {dirty: r, ctx: l}), e.$set(i);
      },
      i(l) {
        t || (R(e.$$.fragment, l), (t = !0));
      },
      o(l) {
        H(e.$$.fragment, l), (t = !1);
      },
      d(l) {
        le(e, l);
      },
    }
  );
}
function kr(s) {
  let e,
    t,
    l = s[3].data,
    r = [];
  for (let n = 0; n < l.length; n += 1) r[n] = It(gt(s, l, n));
  const i = (n) =>
    H(r[n], 1, 1, () => {
      r[n] = null;
    });
  return {
    c() {
      for (let n = 0; n < r.length; n += 1) r[n].c();
      e = re();
    },
    l(n) {
      for (let a = 0; a < r.length; a += 1) r[a].l(n);
      e = re();
    },
    m(n, a) {
      for (let o = 0; o < r.length; o += 1) r[o].m(n, a);
      S(n, e, a), (t = !0);
    },
    p(n, a) {
      if (a & 59) {
        l = n[3].data;
        let o;
        for (o = 0; o < l.length; o += 1) {
          const f = gt(n, l, o);
          r[o] ? (r[o].p(f, a), R(r[o], 1)) : ((r[o] = It(f)), r[o].c(), R(r[o], 1), r[o].m(e.parentNode, e));
        }
        for (fe(), o = l.length; o < r.length; o += 1) i(o);
        ue();
      }
    },
    i(n) {
      if (!t) {
        for (let a = 0; a < l.length; a += 1) R(r[a]);
        t = !0;
      }
    },
    o(n) {
      r = r.filter(Boolean);
      for (let a = 0; a < r.length; a += 1) H(r[a]);
      t = !1;
    },
    d(n) {
      De(r, n), n && h(e);
    },
  };
}
function gr(s) {
  let e, t;
  return {
    c() {
      (e = E('div')), (t = $('Shop items failed to load!'));
    },
    l(l) {
      e = y(l, 'DIV', {});
      var r = g(e);
      (t = I(r, 'Shop items failed to load!')), r.forEach(h);
    },
    m(l, r) {
      S(l, e, r), u(e, t);
    },
    p: O,
    i: O,
    o: O,
    d(l) {
      l && h(e);
    },
  };
}
function wr(s) {
  let e, t;
  return {
    c() {
      (e = E('div')), (t = $('Loading Map...'));
    },
    l(l) {
      e = y(l, 'DIV', {});
      var r = g(e);
      (t = I(r, 'Loading Map...')), r.forEach(h);
    },
    m(l, r) {
      S(l, e, r), u(e, t);
    },
    p: O,
    i: O,
    o: O,
    d(l) {
      l && h(e);
    },
  };
}
function $r(s) {
  let e,
    t,
    l = s[3].error + '',
    r;
  return {
    c() {
      (e = E('div')), (t = $('Error: ')), (r = $(l));
    },
    l(i) {
      e = y(i, 'DIV', {});
      var n = g(e);
      (t = I(n, 'Error: ')), (r = I(n, l)), n.forEach(h);
    },
    m(i, n) {
      S(i, e, n), u(e, t), u(e, r);
    },
    p(i, n) {
      n & 8 && l !== (l = i[3].error + '') && W(r, l);
    },
    i: O,
    o: O,
    d(i) {
      i && h(e);
    },
  };
}
function Ir(s) {
  let e, t;
  return {
    c() {
      (e = E('div')), (t = $('Messages not loaded'));
    },
    l(l) {
      e = y(l, 'DIV', {});
      var r = g(e);
      (t = I(r, 'Messages not loaded')), r.forEach(h);
    },
    m(l, r) {
      S(l, e, r), u(e, t);
    },
    p: O,
    i: O,
    o: O,
    d(l) {
      l && h(e);
    },
  };
}
function $t(s) {
  let e, t, l, r, i, n, a;
  function o(v, p) {
    return (t == null || p & 2) && (t = !!v[1].gt(Ze.from(0))), t ? yr : Er;
  }
  let f = o(s, -1),
    c = f(s);
  function d() {
    return s[7](s[10]);
  }
  return {
    c() {
      (e = E('div')), c.c(), (l = N()), (r = E('div')), (i = $('Sell 1')), this.h();
    },
    l(v) {
      e = y(v, 'DIV', {class: !0});
      var p = g(e);
      c.l(p), (l = Y(p)), (r = y(p, 'DIV', {class: !0}));
      var k = g(r);
      (i = I(k, 'Sell 1')), k.forEach(h), p.forEach(h), this.h();
    },
    h() {
      b(r, 'class', 'border-2 w-full m-1'), b(e, 'class', 'flex');
    },
    m(v, p) {
      S(v, e, p), c.m(e, null), u(e, l), u(e, r), u(r, i), n || ((a = oe(r, 'click', d)), (n = !0));
    },
    p(v, p) {
      (s = v), f === (f = o(s, p)) && c ? c.p(s, p) : (c.d(1), (c = f(s)), c && (c.c(), c.m(e, l)));
    },
    d(v) {
      v && h(e), c.d(), (n = !1), a();
    },
  };
}
function Er(s) {
  let e, t;
  return {
    c() {
      (e = E('div')), (t = $('Buy 1')), this.h();
    },
    l(l) {
      e = y(l, 'DIV', {class: !0});
      var r = g(e);
      (t = I(r, 'Buy 1')), r.forEach(h), this.h();
    },
    h() {
      b(e, 'class', 'border-2 w-full m-1 bg-red-400');
    },
    m(l, r) {
      S(l, e, r), u(e, t);
    },
    p: O,
    d(l) {
      l && h(e);
    },
  };
}
function yr(s) {
  let e, t, l, r;
  function i() {
    return s[6](s[10]);
  }
  return {
    c() {
      (e = E('div')), (t = $('Buy 1')), this.h();
    },
    l(n) {
      e = y(n, 'DIV', {class: !0});
      var a = g(e);
      (t = I(a, 'Buy 1')), a.forEach(h), this.h();
    },
    h() {
      b(e, 'class', 'border-2 w-full m-1');
    },
    m(n, a) {
      S(n, e, a), u(e, t), l || ((r = oe(e, 'click', i)), (l = !0));
    },
    p(n, a) {
      s = n;
    },
    d(n) {
      n && h(e), (l = !1), r();
    },
  };
}
function It(s) {
  let e,
    t,
    l,
    r = s[10].symbol + '',
    i,
    n = s[10].name + '',
    a,
    o,
    f,
    c = s[10].stake + '',
    d,
    v,
    p,
    k,
    _,
    m;
  p = new Ae({});
  let w = s[0] && $t(s);
  return {
    c() {
      (e = E('div')),
        (t = E('div')),
        (l = E('div')),
        (i = $(r)),
        (a = $(n)),
        (o = N()),
        (f = E('div')),
        (d = $(c)),
        (v = N()),
        x(p.$$.fragment),
        (k = N()),
        w && w.c(),
        (_ = N()),
        this.h();
    },
    l(V) {
      e = y(V, 'DIV', {class: !0});
      var D = g(e);
      t = y(D, 'DIV', {class: !0});
      var U = g(t);
      l = y(U, 'DIV', {});
      var L = g(l);
      (i = I(L, r)), (a = I(L, n)), L.forEach(h), (o = Y(U)), (f = y(U, 'DIV', {class: !0}));
      var C = g(f);
      (d = I(C, c)),
        (v = Y(C)),
        ee(p.$$.fragment, C),
        C.forEach(h),
        U.forEach(h),
        (k = Y(D)),
        w && w.l(D),
        (_ = Y(D)),
        D.forEach(h),
        this.h();
    },
    h() {
      b(f, 'class', 'flex'),
        b(t, 'class', 'flex flex-row justify-between'),
        b(e, 'class', 'flex flex-col border-2 border-dotted p-1');
    },
    m(V, D) {
      S(V, e, D),
        u(e, t),
        u(t, l),
        u(l, i),
        u(l, a),
        u(t, o),
        u(t, f),
        u(f, d),
        u(f, v),
        te(p, f, null),
        u(e, k),
        w && w.m(e, null),
        u(e, _),
        (m = !0);
    },
    p(V, D) {
      (!m || D & 8) && r !== (r = V[10].symbol + '') && W(i, r),
        (!m || D & 8) && n !== (n = V[10].name + '') && W(a, n),
        (!m || D & 8) && c !== (c = V[10].stake + '') && W(d, c),
        V[0] ? (w ? w.p(V, D) : ((w = $t(V)), w.c(), w.m(e, _))) : w && (w.d(1), (w = null));
    },
    i(V) {
      m || (R(p.$$.fragment, V), (m = !0));
    },
    o(V) {
      H(p.$$.fragment, V), (m = !1);
    },
    d(V) {
      V && h(e), le(p), w && w.d();
    },
  };
}
function Dr(s) {
  let e,
    t,
    l,
    r = s[1].div('1000000000000000000') + '',
    i,
    n,
    a,
    o,
    f,
    c,
    d,
    v;
  a = new Ae({});
  const p = [Ir, $r, wr, gr, kr],
    k = [];
  function _(m, w) {
    return m[3].step ? (m[3].error ? 1 : m[3].step === 'LOADING' ? 2 : m[3].data ? 4 : 3) : 0;
  }
  return (
    (c = _(s)),
    (d = k[c] = p[c](s)),
    {
      c() {
        (e = E('div')),
          (t = E('div')),
          (l = $(`You own
          `)),
          (i = $(r)),
          (n = N()),
          x(a.$$.fragment),
          (o = N()),
          (f = E('div')),
          d.c(),
          this.h();
      },
      l(m) {
        e = y(m, 'DIV', {class: !0});
        var w = g(e);
        t = y(w, 'DIV', {class: !0});
        var V = g(t);
        (l = I(
          V,
          `You own
          `
        )),
          (i = I(V, r)),
          (n = Y(V)),
          ee(a.$$.fragment, V),
          V.forEach(h),
          (o = Y(w)),
          (f = y(w, 'DIV', {class: !0}));
        var D = g(f);
        d.l(D), D.forEach(h), w.forEach(h), this.h();
      },
      h() {
        b(t, 'class', 'flex border-2 justify-center m-2 w-fit'),
          b(f, 'class', 'border-2 p-2'),
          b(e, 'class', 'flex flex-col');
      },
      m(m, w) {
        S(m, e, w), u(e, t), u(t, l), u(t, i), u(t, n), te(a, t, null), u(e, o), u(e, f), k[c].m(f, null), (v = !0);
      },
      p(m, w) {
        (!v || w & 2) && r !== (r = m[1].div('1000000000000000000') + '') && W(i, r);
        let V = c;
        (c = _(m)),
          c === V
            ? k[c].p(m, w)
            : (fe(),
              H(k[V], 1, 1, () => {
                k[V] = null;
              }),
              ue(),
              (d = k[c]),
              d ? d.p(m, w) : ((d = k[c] = p[c](m)), d.c()),
              R(d, 1),
              d.m(f, null));
      },
      i(m) {
        v || (R(a.$$.fragment, m), R(d), (v = !0));
      },
      o(m) {
        H(a.$$.fragment, m), H(d), (v = !1);
      },
      d(m) {
        m && h(e), le(a), k[c].d();
      },
    }
  );
}
function Vr(s) {
  let e,
    t,
    l,
    r,
    i,
    n,
    a,
    o,
    f,
    c,
    d = s[2] && wt(s);
  return {
    c() {
      (e = E('div')),
        d && d.c(),
        (t = N()),
        (l = E('div')),
        (r = $('Shop')),
        (i = N()),
        (n = E('button')),
        (a = $('Enter the shop')),
        this.h();
    },
    l(v) {
      e = y(v, 'DIV', {class: !0});
      var p = g(e);
      d && d.l(p), (t = Y(p)), (l = y(p, 'DIV', {class: !0}));
      var k = g(l);
      (r = I(k, 'Shop')), k.forEach(h), (i = Y(p)), (n = y(p, 'BUTTON', {class: !0}));
      var _ = g(n);
      (a = I(_, 'Enter the shop')), _.forEach(h), p.forEach(h), this.h();
    },
    h() {
      b(l, 'class', 'text-xl'), b(n, 'class', 'border-2 border-gray-700 p-1'), b(e, 'class', 'h-full');
    },
    m(v, p) {
      S(v, e, p),
        d && d.m(e, null),
        u(e, t),
        u(e, l),
        u(l, r),
        u(e, i),
        u(e, n),
        u(n, a),
        (o = !0),
        f || ((c = oe(n, 'click', s[9])), (f = !0));
    },
    p(v, [p]) {
      v[2]
        ? d
          ? (d.p(v, p), p & 4 && R(d, 1))
          : ((d = wt(v)), d.c(), R(d, 1), d.m(e, t))
        : d &&
          (fe(),
          H(d, 1, 1, () => {
            d = null;
          }),
          ue());
    },
    i(v) {
      o || (R(d), (o = !0));
    },
    o(v) {
      H(d), (o = !1);
    },
    d(v) {
      v && h(e), d && d.d(), (f = !1), c();
    },
  };
}
function Mr(s, e, t) {
  let l;
  Ie(s, br, (p) => t(3, (l = p)));
  let {currentPlayer: r} = e,
    {balance: i} = e;
  async function n(p, k) {
    await be.execute((_) => _.UnionQuest.buy(p, k));
  }
  async function a(p, k) {
    await be.execute((_) => _.UnionQuest.sell(p, k));
  }
  let o = !1;
  const f = (p) => n(p.id, '1'),
    c = (p) => a(p.id, '1'),
    d = () => t(2, (o = !1)),
    v = () => t(2, (o = !0));
  return (
    (s.$$set = (p) => {
      'currentPlayer' in p && t(0, (r = p.currentPlayer)), 'balance' in p && t(1, (i = p.balance));
    }),
    [r, i, o, l, n, a, f, c, d, v]
  );
}
class Sr extends ge {
  constructor(e) {
    super();
    we(this, e, Mr, Vr, $e, {currentPlayer: 0, balance: 1});
  }
}
class Pr {
  constructor(e, t) {
    (this.transactions = t),
      (this.queryStore = new rt(
        e,
        `
    query {
      recipes {
        id
        inputIds {
          id
          name
          symbol
        }
        inputQuantities
        output {
          id
          name
          symbol
        }
      }
    }`,
        xe,
        {path: 'recipes'}
      )),
      (this.store = Ke([this.queryStore, this.transactions], (l) => this.update(l)));
  }
  update([e]) {
    if (e.data) {
      let t = e.data;
      return {step: e.step, error: e.error, data: t};
    } else return e;
  }
  acknowledgeError() {
    return this.queryStore.acknowledgeError();
  }
  subscribe(e, t) {
    return this.store.subscribe(e, t);
  }
}
const Cr = new Pr(lt, Je);
function Et(s, e, t) {
  const l = s.slice();
  return (l[7] = e[t]), l;
}
function yt(s, e, t) {
  const l = s.slice();
  return (l[10] = e[t]), (l[12] = t), l;
}
function Dt(s) {
  let e, t;
  return (
    (e = new Ce({props: {title: 'Crafting', closeButton: !0, $$slots: {default: [Ur]}, $$scope: {ctx: s}}})),
    e.$on('close', s[5]),
    {
      c() {
        x(e.$$.fragment);
      },
      l(l) {
        ee(e.$$.fragment, l);
      },
      m(l, r) {
        te(e, l, r), (t = !0);
      },
      p(l, r) {
        const i = {};
        r & 8203 && (i.$$scope = {dirty: r, ctx: l}), e.$set(i);
      },
      i(l) {
        t || (R(e.$$.fragment, l), (t = !0));
      },
      o(l) {
        H(e.$$.fragment, l), (t = !1);
      },
      d(l) {
        le(e, l);
      },
    }
  );
}
function Tr(s) {
  let e,
    t,
    l,
    r = Math.round(ve(s[0], s[1] / 1e3, '1')) + '',
    i,
    n,
    a,
    o,
    f = Math.round(ve(s[0], s[1] / 1e3, '2')) + '',
    c,
    d,
    v,
    p = s[3].data,
    k = [];
  for (let _ = 0; _ < p.length; _ += 1) k[_] = Mt(Et(s, p, _));
  return {
    c() {
      (e = E('div')),
        (t = E('div')),
        (l = E('div')),
        (i = $(r)),
        (n = $(' \u{1FAB5}')),
        (a = N()),
        (o = E('div')),
        (c = $(f)),
        (d = $(' \u{1FAA8}')),
        (v = N());
      for (let _ = 0; _ < k.length; _ += 1) k[_].c();
      this.h();
    },
    l(_) {
      e = y(_, 'DIV', {class: !0});
      var m = g(e);
      t = y(m, 'DIV', {class: !0});
      var w = g(t);
      l = y(w, 'DIV', {class: !0});
      var V = g(l);
      (i = I(V, r)), (n = I(V, ' \u{1FAB5}')), V.forEach(h), (a = Y(w)), (o = y(w, 'DIV', {class: !0}));
      var D = g(o);
      (c = I(D, f)), (d = I(D, ' \u{1FAA8}')), D.forEach(h), w.forEach(h), (v = Y(m));
      for (let U = 0; U < k.length; U += 1) k[U].l(m);
      m.forEach(h), this.h();
    },
    h() {
      b(l, 'class', 'border-2 w-full border-gray-500'),
        b(o, 'class', 'border-2 w-full border-gray-500'),
        b(t, 'class', 'flex justify-between text-center'),
        b(e, 'class', 'flex flex-col');
    },
    m(_, m) {
      S(_, e, m), u(e, t), u(t, l), u(l, i), u(l, n), u(t, a), u(t, o), u(o, c), u(o, d), u(e, v);
      for (let w = 0; w < k.length; w += 1) k[w].m(e, null);
    },
    p(_, m) {
      if (
        (m & 3 && r !== (r = Math.round(ve(_[0], _[1] / 1e3, '1')) + '') && W(i, r),
        m & 3 && f !== (f = Math.round(ve(_[0], _[1] / 1e3, '2')) + '') && W(c, f),
        m & 27)
      ) {
        p = _[3].data;
        let w;
        for (w = 0; w < p.length; w += 1) {
          const V = Et(_, p, w);
          k[w] ? k[w].p(V, m) : ((k[w] = Mt(V)), k[w].c(), k[w].m(e, null));
        }
        for (; w < k.length; w += 1) k[w].d(1);
        k.length = p.length;
      }
    },
    d(_) {
      _ && h(e), De(k, _);
    },
  };
}
function Br(s) {
  let e, t;
  return {
    c() {
      (e = E('div')), (t = $('Recipes failed to load!'));
    },
    l(l) {
      e = y(l, 'DIV', {});
      var r = g(e);
      (t = I(r, 'Recipes failed to load!')), r.forEach(h);
    },
    m(l, r) {
      S(l, e, r), u(e, t);
    },
    p: O,
    d(l) {
      l && h(e);
    },
  };
}
function Nr(s) {
  let e, t;
  return {
    c() {
      (e = E('div')), (t = $('Loading Map...'));
    },
    l(l) {
      e = y(l, 'DIV', {});
      var r = g(e);
      (t = I(r, 'Loading Map...')), r.forEach(h);
    },
    m(l, r) {
      S(l, e, r), u(e, t);
    },
    p: O,
    d(l) {
      l && h(e);
    },
  };
}
function Yr(s) {
  let e,
    t,
    l = s[3].error + '',
    r;
  return {
    c() {
      (e = E('div')), (t = $('Error: ')), (r = $(l));
    },
    l(i) {
      e = y(i, 'DIV', {});
      var n = g(e);
      (t = I(n, 'Error: ')), (r = I(n, l)), n.forEach(h);
    },
    m(i, n) {
      S(i, e, n), u(e, t), u(e, r);
    },
    p(i, n) {
      n & 8 && l !== (l = i[3].error + '') && W(r, l);
    },
    d(i) {
      i && h(e);
    },
  };
}
function Lr(s) {
  let e, t;
  return {
    c() {
      (e = E('div')), (t = $('Messages not loaded'));
    },
    l(l) {
      e = y(l, 'DIV', {});
      var r = g(e);
      (t = I(r, 'Messages not loaded')), r.forEach(h);
    },
    m(l, r) {
      S(l, e, r), u(e, t);
    },
    p: O,
    d(l) {
      l && h(e);
    },
  };
}
function Vt(s) {
  let e,
    t,
    l = s[7].inputQuantities[s[12]] + '',
    r,
    i,
    n,
    a = s[10].symbol + '',
    o,
    f;
  return {
    c() {
      (e = E('div')), (t = E('div')), (r = $(l)), (i = N()), (n = E('div')), (o = $(a)), (f = N()), this.h();
    },
    l(c) {
      e = y(c, 'DIV', {class: !0});
      var d = g(e);
      t = y(d, 'DIV', {class: !0});
      var v = g(t);
      (r = I(v, l)), v.forEach(h), (i = Y(d)), (n = y(d, 'DIV', {class: !0}));
      var p = g(n);
      (o = I(p, a)), p.forEach(h), (f = Y(d)), d.forEach(h), this.h();
    },
    h() {
      b(t, 'class', 'border-2 bg-gray-300'), b(n, 'class', 'border-2 text-xl'), b(e, 'class', 'border-2');
    },
    m(c, d) {
      S(c, e, d), u(e, t), u(t, r), u(e, i), u(e, n), u(n, o), u(e, f);
    },
    p(c, d) {
      d & 8 && l !== (l = c[7].inputQuantities[c[12]] + '') && W(r, l),
        d & 8 && a !== (a = c[10].symbol + '') && W(o, a);
    },
    d(c) {
      c && h(e);
    },
  };
}
function Ar(s) {
  let e, t;
  return {
    c() {
      (e = E('button')), (t = $('Craft')), this.h();
    },
    l(l) {
      e = y(l, 'BUTTON', {class: !0});
      var r = g(e);
      (t = I(r, 'Craft')), r.forEach(h), this.h();
    },
    h() {
      b(e, 'class', 'border-2 bg-red-400 border-gray-500 p-1 m-2');
    },
    m(l, r) {
      S(l, e, r), u(e, t);
    },
    p: O,
    d(l) {
      l && h(e);
    },
  };
}
function Or(s) {
  let e, t, l, r;
  return {
    c() {
      (e = E('button')), (t = $('Craft')), this.h();
    },
    l(i) {
      e = y(i, 'BUTTON', {class: !0});
      var n = g(e);
      (t = I(n, 'Craft')), n.forEach(h), this.h();
    },
    h() {
      b(e, 'class', 'border-2 bg-green-400 border-gray-500 p-1 m-2');
    },
    m(i, n) {
      S(i, e, n), u(e, t), l || ((r = oe(e, 'click', s[4])), (l = !0));
    },
    p: O,
    d(i) {
      i && h(e), (l = !1), r();
    },
  };
}
function Mt(s) {
  let e,
    t,
    l = s[7].id + '',
    r,
    i,
    n,
    a,
    o,
    f,
    c,
    d,
    v,
    p,
    k,
    _ = s[7].output.symbol + '',
    m,
    w,
    V,
    D = s[7].output.name + '',
    U,
    L,
    C,
    P,
    B = s[7].inputIds,
    j = [];
  for (let T = 0; T < B.length; T += 1) j[T] = Vt(yt(s, B, T));
  function X(T, G) {
    return (
      (C == null || G & 11) &&
        (C =
          ve(T[0], T[1] / 1e3, T[7].inputIds[0].id) > parseInt(T[7].inputQuantities[0]) &&
          ve(T[0], T[1] / 1e3, T[7].inputIds[1].id) > parseInt(T[7].inputQuantities[1])),
      C ? Or : Ar
    );
  }
  let M = X(s, -1),
    A = M(s);
  return {
    c() {
      (e = E('div')), (t = $('Recipe ')), (r = $(l)), (i = N()), (n = E('div')), (a = E('div'));
      for (let T = 0; T < j.length; T += 1) j[T].c();
      (o = N()),
        (f = E('div')),
        (c = $('\u27A1\uFE0F')),
        (d = N()),
        (v = E('div')),
        (p = E('div')),
        (k = E('div')),
        (m = $(_)),
        (w = N()),
        (V = E('div')),
        (U = $(D)),
        (L = N()),
        A.c(),
        (P = N()),
        this.h();
    },
    l(T) {
      e = y(T, 'DIV', {class: !0});
      var G = g(e);
      (t = I(G, 'Recipe ')), (r = I(G, l)), G.forEach(h), (i = Y(T)), (n = y(T, 'DIV', {class: !0}));
      var z = g(n);
      a = y(z, 'DIV', {});
      var q = g(a);
      for (let ae = 0; ae < j.length; ae += 1) j[ae].l(q);
      q.forEach(h), (o = Y(z)), (f = y(z, 'DIV', {class: !0}));
      var Q = g(f);
      (c = I(Q, '\u27A1\uFE0F')), Q.forEach(h), (d = Y(z)), (v = y(z, 'DIV', {class: !0}));
      var J = g(v);
      p = y(J, 'DIV', {class: !0});
      var K = g(p);
      k = y(K, 'DIV', {class: !0});
      var de = g(k);
      (m = I(de, _)), de.forEach(h), (w = Y(K)), (V = y(K, 'DIV', {class: !0}));
      var se = g(V);
      (U = I(se, D)), se.forEach(h), K.forEach(h), (L = Y(J)), A.l(J), J.forEach(h), (P = Y(z)), z.forEach(h), this.h();
    },
    h() {
      b(e, 'class', 'text-xl '),
        b(f, 'class', 'text-2xl'),
        b(k, 'class', 'border-2 text-2xl'),
        b(V, 'class', 'border-2 text-xl bg-gray-300'),
        b(p, 'class', 'border-2 text-center'),
        b(v, 'class', 'flex flex-col'),
        b(n, 'class', 'flex flex-row justify-between m-2 border-2');
    },
    m(T, G) {
      S(T, e, G), u(e, t), u(e, r), S(T, i, G), S(T, n, G), u(n, a);
      for (let z = 0; z < j.length; z += 1) j[z].m(a, null);
      u(n, o),
        u(n, f),
        u(f, c),
        u(n, d),
        u(n, v),
        u(v, p),
        u(p, k),
        u(k, m),
        u(p, w),
        u(p, V),
        u(V, U),
        u(v, L),
        A.m(v, null),
        u(n, P);
    },
    p(T, G) {
      if ((G & 8 && l !== (l = T[7].id + '') && W(r, l), G & 8)) {
        B = T[7].inputIds;
        let z;
        for (z = 0; z < B.length; z += 1) {
          const q = yt(T, B, z);
          j[z] ? j[z].p(q, G) : ((j[z] = Vt(q)), j[z].c(), j[z].m(a, null));
        }
        for (; z < j.length; z += 1) j[z].d(1);
        j.length = B.length;
      }
      G & 8 && _ !== (_ = T[7].output.symbol + '') && W(m, _),
        G & 8 && D !== (D = T[7].output.name + '') && W(U, D),
        M === (M = X(T, G)) && A ? A.p(T, G) : (A.d(1), (A = M(T)), A && (A.c(), A.m(v, null)));
    },
    d(T) {
      T && h(e), T && h(i), T && h(n), De(j, T), A.d();
    },
  };
}
function Ur(s) {
  let e;
  function t(i, n) {
    return i[3].step ? (i[3].error ? Yr : i[3].step === 'LOADING' ? Nr : i[3].data ? Tr : Br) : Lr;
  }
  let l = t(s),
    r = l(s);
  return {
    c() {
      r.c(), (e = re());
    },
    l(i) {
      r.l(i), (e = re());
    },
    m(i, n) {
      r.m(i, n), S(i, e, n);
    },
    p(i, n) {
      l === (l = t(i)) && r ? r.p(i, n) : (r.d(1), (r = l(i)), r && (r.c(), r.m(e.parentNode, e)));
    },
    d(i) {
      r.d(i), i && h(e);
    },
  };
}
function jr(s) {
  let e,
    t,
    l,
    r,
    i,
    n,
    a,
    o,
    f,
    c,
    d = s[2] && Dt(s);
  return {
    c() {
      (e = E('div')),
        d && d.c(),
        (t = N()),
        (l = E('div')),
        (r = $('Crafting')),
        (i = N()),
        (n = E('button')),
        (a = $('View the crafting table')),
        this.h();
    },
    l(v) {
      e = y(v, 'DIV', {});
      var p = g(e);
      d && d.l(p), (t = Y(p)), (l = y(p, 'DIV', {class: !0}));
      var k = g(l);
      (r = I(k, 'Crafting')), k.forEach(h), (i = Y(p)), (n = y(p, 'BUTTON', {class: !0}));
      var _ = g(n);
      (a = I(_, 'View the crafting table')), _.forEach(h), p.forEach(h), this.h();
    },
    h() {
      b(l, 'class', 'text-xl'), b(n, 'class', 'border-2 border-gray-700 p-1');
    },
    m(v, p) {
      S(v, e, p),
        d && d.m(e, null),
        u(e, t),
        u(e, l),
        u(l, r),
        u(e, i),
        u(e, n),
        u(n, a),
        (o = !0),
        f || ((c = oe(n, 'click', s[6])), (f = !0));
    },
    p(v, [p]) {
      v[2]
        ? d
          ? (d.p(v, p), p & 4 && R(d, 1))
          : ((d = Dt(v)), d.c(), R(d, 1), d.m(e, t))
        : d &&
          (fe(),
          H(d, 1, 1, () => {
            d = null;
          }),
          ue());
    },
    i(v) {
      o || (R(d), (o = !0));
    },
    o(v) {
      H(d), (o = !1);
    },
    d(v) {
      v && h(e), d && d.d(), (f = !1), c();
    },
  };
}
function Xr(s, e, t) {
  let l;
  Ie(s, Cr, (c) => t(3, (l = c)));
  let {currentPlayer: r} = e;
  async function i() {
    await be.execute((c) => c.UnionQuest.craft(0));
  }
  let n = Date.now(),
    a = !1;
  je(() => {
    const c = setInterval(() => {
      t(1, (n = Date.now()));
    }, 100);
    return () => {
      clearInterval(c);
    };
  });
  const o = () => t(2, (a = !1)),
    f = () => t(2, (a = !0));
  return (
    (s.$$set = (c) => {
      'currentPlayer' in c && t(0, (r = c.currentPlayer));
    }),
    [r, n, a, l, i, o, f]
  );
}
class Rr extends ge {
  constructor(e) {
    super();
    we(this, e, Xr, jr, $e, {currentPlayer: 0});
  }
}
function St(s, e, t) {
  const l = s.slice();
  return (l[22] = e[t]), l;
}
function Pt(s, e, t) {
  const l = s.slice();
  return (l[8] = e[t]), l;
}
function Ct(s, e, t) {
  const l = s.slice();
  return (l[25] = e[t]), (l[27] = t), l;
}
function Tt(s) {
  let e, t;
  return (
    (e = new Ce({props: {title: 'Info', closeButton: !0, $$slots: {default: [Hr]}, $$scope: {ctx: s}}})),
    e.$on('close', s[16]),
    {
      c() {
        x(e.$$.fragment);
      },
      l(l) {
        ee(e.$$.fragment, l);
      },
      m(l, r) {
        te(e, l, r), (t = !0);
      },
      p(l, r) {
        const i = {};
        r & 268435456 && (i.$$scope = {dirty: r, ctx: l}), e.$set(i);
      },
      i(l) {
        t || (R(e.$$.fragment, l), (t = !0));
      },
      o(l) {
        H(e.$$.fragment, l), (t = !1);
      },
      d(l) {
        le(e, l);
      },
    }
  );
}
function Hr(s) {
  let e, t, l, r, i, n, a, o, f, c, d, v, p, k, _, m, w, V;
  return {
    c() {
      (e = E('div')),
        (t = $(
          'As a reward for improving your skills, you are entitled to a credit line from the Bank of UnionQuest.'
        )),
        (l = N()),
        (r = E('div')),
        (i = $('Your vouch must be manually updated and does ')),
        (n = E('div')),
        (a = $('not')),
        (o = $(`
        automatically increase when you perform an activity. This difference is indicated by the
        `)),
        (f = E('span')),
        (c = $('"Actual Vouch"')),
        (d = $(`
        and `)),
        (v = E('span')),
        (p = $('"Potential Vouch"')),
        (k = $(' amounts.')),
        (_ = N()),
        (m = E('div')),
        (w = E('a')),
        (V = $('View the Bank on union.finance')),
        this.h();
    },
    l(D) {
      e = y(D, 'DIV', {class: !0});
      var U = g(e);
      (t = I(
        U,
        'As a reward for improving your skills, you are entitled to a credit line from the Bank of UnionQuest.'
      )),
        U.forEach(h),
        (l = Y(D)),
        (r = y(D, 'DIV', {class: !0}));
      var L = g(r);
      (i = I(L, 'Your vouch must be manually updated and does ')), (n = y(L, 'DIV', {class: !0}));
      var C = g(n);
      (a = I(C, 'not')),
        C.forEach(h),
        (o = I(
          L,
          `
        automatically increase when you perform an activity. This difference is indicated by the
        `
        )),
        (f = y(L, 'SPAN', {class: !0}));
      var P = g(f);
      (c = I(P, '"Actual Vouch"')),
        P.forEach(h),
        (d = I(
          L,
          `
        and `
        )),
        (v = y(L, 'SPAN', {class: !0}));
      var B = g(v);
      (p = I(B, '"Potential Vouch"')),
        B.forEach(h),
        (k = I(L, ' amounts.')),
        L.forEach(h),
        (_ = Y(D)),
        (m = y(D, 'DIV', {class: !0}));
      var j = g(m);
      w = y(j, 'A', {rel: !0, target: !0, href: !0});
      var X = g(w);
      (V = I(X, 'View the Bank on union.finance')), X.forEach(h), j.forEach(h), this.h();
    },
    h() {
      b(e, 'class', 'p-1'),
        b(n, 'class', 'inline font-bold'),
        b(f, 'class', 'italic'),
        b(v, 'class', 'italic'),
        b(r, 'class', 'p-1'),
        b(w, 'rel', 'noopener'),
        b(w, 'target', '_blank'),
        b(w, 'href', `https://kovan.union.finance/profile/${Ne.contracts.UnionQuest.address}`),
        b(m, 'class', 'border-2 bg-gray-200 border-gray-500 m-1 p-2');
    },
    m(D, U) {
      S(D, e, U),
        u(e, t),
        S(D, l, U),
        S(D, r, U),
        u(r, i),
        u(r, n),
        u(n, a),
        u(r, o),
        u(r, f),
        u(f, c),
        u(r, d),
        u(r, v),
        u(v, p),
        u(r, k),
        S(D, _, U),
        S(D, m, U),
        u(m, w),
        u(w, V);
    },
    p: O,
    d(D) {
      D && h(e), D && h(l), D && h(r), D && h(_), D && h(m);
    },
  };
}
function Bt(s) {
  let e, t, l, r, i, n;
  function a() {
    return s[17](s[27]);
  }
  return {
    c() {
      (e = E('button')), (t = $(s[25])), (l = N()), this.h();
    },
    l(o) {
      e = y(o, 'BUTTON', {class: !0});
      var f = g(e);
      (t = I(f, s[25])), (l = Y(f)), f.forEach(h), this.h();
    },
    h() {
      b(e, 'class', (r = 'w-12 border-2 border-gray-700 ' + (s[2] === s[27] ? 'bg-red-700' : 'bg-neutral-400')));
    },
    m(o, f) {
      S(o, e, f), u(e, t), u(e, l), i || ((n = oe(e, 'click', a)), (i = !0));
    },
    p(o, f) {
      (s = o),
        f & 4 &&
          r !== (r = 'w-12 border-2 border-gray-700 ' + (s[2] === s[27] ? 'bg-red-700' : 'bg-neutral-400')) &&
          b(e, 'class', r);
    },
    d(o) {
      o && h(e), (i = !1), n();
    },
  };
}
function qr(s) {
  let e, t, l, r, i, n, a, o, f, c, d, v, p;
  return {
    c() {
      (e = E('div')),
        (t = E('div')),
        (l = $('Settings')),
        (r = N()),
        (i = E('div')),
        (n = N()),
        (a = E('div')),
        (o = $('Allow DAI transfers for The Shop')),
        (f = N()),
        (c = E('div')),
        (d = $('Allow NFT transfers for The Shop')),
        this.h();
    },
    l(k) {
      e = y(k, 'DIV', {});
      var _ = g(e);
      t = y(_, 'DIV', {class: !0});
      var m = g(t);
      (l = I(m, 'Settings')), m.forEach(h), (r = Y(_)), (i = y(_, 'DIV', {}));
      var w = g(i);
      (n = Y(w)), (a = y(w, 'DIV', {class: !0}));
      var V = g(a);
      (o = I(V, 'Allow DAI transfers for The Shop')), V.forEach(h), (f = Y(w)), (c = y(w, 'DIV', {class: !0}));
      var D = g(c);
      (d = I(D, 'Allow NFT transfers for The Shop')), D.forEach(h), w.forEach(h), _.forEach(h), this.h();
    },
    h() {
      b(t, 'class', 'text-xl'), b(a, 'class', 'border-2'), b(c, 'class', 'border-2');
    },
    m(k, _) {
      S(k, e, _),
        u(e, t),
        u(t, l),
        u(e, r),
        u(e, i),
        u(i, n),
        u(i, a),
        u(a, o),
        u(i, f),
        u(i, c),
        u(c, d),
        v || ((p = [oe(a, 'click', s[10]), oe(c, 'click', s[11])]), (v = !0));
    },
    p(k, _) {},
    i: O,
    o: O,
    d(k) {
      k && h(e), (v = !1), Qe(p);
    },
  };
}
function zr(s) {
  let e,
    t,
    l,
    r,
    i,
    n,
    a = s[0],
    o = [];
  for (let c = 0; c < a.length; c += 1) o[c] = Nt(St(s, a, c));
  const f = (c) =>
    H(o[c], 1, 1, () => {
      o[c] = null;
    });
  return {
    c() {
      (e = E('div')), (t = E('div')), (l = $('Players')), (r = N()), (i = E('div'));
      for (let c = 0; c < o.length; c += 1) o[c].c();
      this.h();
    },
    l(c) {
      e = y(c, 'DIV', {});
      var d = g(e);
      t = y(d, 'DIV', {class: !0});
      var v = g(t);
      (l = I(v, 'Players')), v.forEach(h), (r = Y(d)), (i = y(d, 'DIV', {class: !0}));
      var p = g(i);
      for (let k = 0; k < o.length; k += 1) o[k].l(p);
      p.forEach(h), d.forEach(h), this.h();
    },
    h() {
      b(t, 'class', 'text-xl'), b(i, 'class', 'flex flex-col');
    },
    m(c, d) {
      S(c, e, d), u(e, t), u(t, l), u(e, r), u(e, i);
      for (let v = 0; v < o.length; v += 1) o[v].m(i, null);
      n = !0;
    },
    p(c, d) {
      if (d & 17) {
        a = c[0];
        let v;
        for (v = 0; v < a.length; v += 1) {
          const p = St(c, a, v);
          o[v] ? (o[v].p(p, d), R(o[v], 1)) : ((o[v] = Nt(p)), o[v].c(), R(o[v], 1), o[v].m(i, null));
        }
        for (fe(), v = a.length; v < o.length; v += 1) f(v);
        ue();
      }
    },
    i(c) {
      if (!n) {
        for (let d = 0; d < a.length; d += 1) R(o[d]);
        n = !0;
      }
    },
    o(c) {
      o = o.filter(Boolean);
      for (let d = 0; d < o.length; d += 1) H(o[d]);
      n = !1;
    },
    d(c) {
      c && h(e), De(o, c);
    },
  };
}
function Wr(s) {
  let e,
    t,
    l,
    r,
    i,
    n,
    a,
    o,
    f,
    c,
    d,
    v,
    p = s[14](parseInt(s[1].vouch) / 10 ** 18) + '',
    k,
    _,
    m,
    w,
    V,
    D,
    U,
    L,
    C,
    P = s[14]((ie(s[1], s[4] / 1e3, 1) + ie(s[1], s[4] / 1e3, 2)) / 10 ** 2) + '',
    B,
    j,
    X,
    M,
    A,
    T,
    G,
    z,
    q;
  return (
    (m = new Ae({})),
    (X = new Ae({})),
    {
      c() {
        (e = E('div')),
          (t = E('div')),
          (l = $(`Vouching Rewards
          `)),
          (r = E('button')),
          (i = $('\u2139\uFE0F')),
          (n = N()),
          (a = E('div')),
          (o = E('div')),
          (f = E('div')),
          (c = $('Actual Vouch:')),
          (d = N()),
          (v = E('div')),
          (k = $(p)),
          (_ = N()),
          x(m.$$.fragment),
          (w = N()),
          (V = E('div')),
          (D = E('div')),
          (U = $('Potential Vouch:')),
          (L = N()),
          (C = E('div')),
          (B = $(P)),
          (j = N()),
          x(X.$$.fragment),
          (M = N()),
          (A = E('button')),
          (T = $('Update')),
          this.h();
      },
      l(Q) {
        e = y(Q, 'DIV', {});
        var J = g(e);
        t = y(J, 'DIV', {class: !0});
        var K = g(t);
        (l = I(
          K,
          `Vouching Rewards
          `
        )),
          (r = y(K, 'BUTTON', {class: !0}));
        var de = g(r);
        (i = I(de, '\u2139\uFE0F')), de.forEach(h), K.forEach(h), (n = Y(J)), (a = y(J, 'DIV', {class: !0}));
        var se = g(a);
        o = y(se, 'DIV', {class: !0});
        var ae = g(o);
        f = y(ae, 'DIV', {class: !0});
        var he = g(f);
        (c = I(he, 'Actual Vouch:')), he.forEach(h), (d = Y(ae)), (v = y(ae, 'DIV', {class: !0}));
        var Me = g(v);
        (k = I(Me, p)),
          (_ = Y(Me)),
          ee(m.$$.fragment, Me),
          Me.forEach(h),
          ae.forEach(h),
          (w = Y(se)),
          (V = y(se, 'DIV', {class: !0}));
        var F = g(V);
        D = y(F, 'DIV', {class: !0});
        var Z = g(D);
        (U = I(Z, 'Potential Vouch:')), Z.forEach(h), (L = Y(F)), (C = y(F, 'DIV', {class: !0}));
        var ce = g(C);
        (B = I(ce, P)),
          (j = Y(ce)),
          ee(X.$$.fragment, ce),
          ce.forEach(h),
          F.forEach(h),
          (M = Y(se)),
          (A = y(se, 'BUTTON', {class: !0}));
        var ke = g(A);
        (T = I(ke, 'Update')), ke.forEach(h), se.forEach(h), J.forEach(h), this.h();
      },
      h() {
        b(r, 'class', 'border-2 border-gray-700'),
          b(t, 'class', 'text-xl'),
          b(f, 'class', 'font-bold'),
          b(v, 'class', 'flex'),
          b(o, 'class', 'text-left flex'),
          b(D, 'class', 'font-bold'),
          b(C, 'class', 'flex'),
          b(V, 'class', 'text-left flex'),
          b(A, 'class', 'border-2 bg-yellow-400 border-gray-500 p-1'),
          b(a, 'class', 'p-1');
      },
      m(Q, J) {
        S(Q, e, J),
          u(e, t),
          u(t, l),
          u(t, r),
          u(r, i),
          u(e, n),
          u(e, a),
          u(a, o),
          u(o, f),
          u(f, c),
          u(o, d),
          u(o, v),
          u(v, k),
          u(v, _),
          te(m, v, null),
          u(a, w),
          u(a, V),
          u(V, D),
          u(D, U),
          u(V, L),
          u(V, C),
          u(C, B),
          u(C, j),
          te(X, C, null),
          u(a, M),
          u(a, A),
          u(A, T),
          (G = !0),
          z || ((q = [oe(r, 'click', s[19]), oe(A, 'click', s[12])]), (z = !0));
      },
      p(Q, J) {
        (!G || J & 2) && p !== (p = Q[14](parseInt(Q[1].vouch) / 10 ** 18) + '') && W(k, p),
          (!G || J & 18) &&
            P !== (P = Q[14]((ie(Q[1], Q[4] / 1e3, 1) + ie(Q[1], Q[4] / 1e3, 2)) / 10 ** 2) + '') &&
            W(B, P);
      },
      i(Q) {
        G || (R(m.$$.fragment, Q), R(X.$$.fragment, Q), (G = !0));
      },
      o(Q) {
        H(m.$$.fragment, Q), H(X.$$.fragment, Q), (G = !1);
      },
      d(Q) {
        Q && h(e), le(m), le(X), (z = !1), Qe(q);
      },
    }
  );
}
function Qr(s) {
  let e, t;
  return (
    (e = new Rr({props: {currentPlayer: s[1]}})),
    {
      c() {
        x(e.$$.fragment);
      },
      l(l) {
        ee(e.$$.fragment, l);
      },
      m(l, r) {
        te(e, l, r), (t = !0);
      },
      p(l, r) {
        const i = {};
        r & 2 && (i.currentPlayer = l[1]), e.$set(i);
      },
      i(l) {
        t || (R(e.$$.fragment, l), (t = !0));
      },
      o(l) {
        H(e.$$.fragment, l), (t = !1);
      },
      d(l) {
        le(e, l);
      },
    }
  );
}
function Fr(s) {
  let e, t;
  return (
    (e = new Sr({props: {currentPlayer: s[1], balance: s[8]}})),
    {
      c() {
        x(e.$$.fragment);
      },
      l(l) {
        ee(e.$$.fragment, l);
      },
      m(l, r) {
        te(e, l, r), (t = !0);
      },
      p(l, r) {
        const i = {};
        r & 2 && (i.currentPlayer = l[1]), r & 256 && (i.balance = l[8]), e.$set(i);
      },
      i(l) {
        t || (R(e.$$.fragment, l), (t = !0));
      },
      o(l) {
        H(e.$$.fragment, l), (t = !1);
      },
      d(l) {
        le(e, l);
      },
    }
  );
}
function Gr(s) {
  let e, t, l, r, i;
  function n(f, c) {
    return (i == null || c & 18) && (i = f[1].balances.filter(f[15]).length > 0), i ? xr : Jr;
  }
  let a = n(s, -1),
    o = a(s);
  return {
    c() {
      (e = E('div')), (t = E('div')), (l = $('Equipment')), (r = N()), o.c(), this.h();
    },
    l(f) {
      e = y(f, 'DIV', {});
      var c = g(e);
      t = y(c, 'DIV', {class: !0});
      var d = g(t);
      (l = I(d, 'Equipment')), d.forEach(h), (r = Y(c)), o.l(c), c.forEach(h), this.h();
    },
    h() {
      b(t, 'class', 'text-xl');
    },
    m(f, c) {
      S(f, e, c), u(e, t), u(t, l), u(e, r), o.m(e, null);
    },
    p(f, c) {
      a === (a = n(f, c)) && o ? o.p(f, c) : (o.d(1), (o = a(f)), o && (o.c(), o.m(e, null)));
    },
    i: O,
    o: O,
    d(f) {
      f && h(e), o.d();
    },
  };
}
function Kr(s) {
  let e,
    t,
    l,
    r,
    i,
    n,
    a,
    o,
    f = Math.round(ie(s[1], s[4] / 1e3, 2)) + '',
    c,
    d,
    v,
    p,
    k = Math.round(ie(s[1], s[4] / 1e3, 1)) + '',
    _,
    m,
    w,
    V,
    D,
    U,
    L = Math.round(ie(s[1], s[4] / 1e3, 1) + ie(s[1], s[4] / 1e3, 2)) + '',
    C;
  return {
    c() {
      (e = E('div')),
        (t = E('div')),
        (l = $('Skills')),
        (r = N()),
        (i = E('div')),
        (n = E('div')),
        (a = E('div')),
        (o = $('\u26CF\uFE0F ')),
        (c = $(f)),
        (d = N()),
        (v = E('div')),
        (p = $('\u{1FA93} ')),
        (_ = $(k)),
        (m = N()),
        (w = E('div')),
        (V = E('div')),
        (D = $('Total level:')),
        (U = N()),
        (C = $(L)),
        this.h();
    },
    l(P) {
      e = y(P, 'DIV', {});
      var B = g(e);
      t = y(B, 'DIV', {class: !0});
      var j = g(t);
      (l = I(j, 'Skills')), j.forEach(h), (r = Y(B)), (i = y(B, 'DIV', {class: !0}));
      var X = g(i);
      n = y(X, 'DIV', {class: !0});
      var M = g(n);
      a = y(M, 'DIV', {class: !0});
      var A = g(a);
      (o = I(A, '\u26CF\uFE0F ')), (c = I(A, f)), A.forEach(h), (d = Y(M)), (v = y(M, 'DIV', {class: !0}));
      var T = g(v);
      (p = I(T, '\u{1FA93} ')), (_ = I(T, k)), T.forEach(h), M.forEach(h), (m = Y(X)), (w = y(X, 'DIV', {class: !0}));
      var G = g(w);
      V = y(G, 'DIV', {class: !0});
      var z = g(V);
      (D = I(z, 'Total level:')),
        z.forEach(h),
        (U = Y(G)),
        (C = I(G, L)),
        G.forEach(h),
        X.forEach(h),
        B.forEach(h),
        this.h();
    },
    h() {
      b(t, 'class', 'text-xl'),
        b(a, 'class', 'border-2 rounded-lg border-gray-600 m-1 w-full text-center'),
        b(v, 'class', 'border-2 rounded-lg border-gray-600 m-1 w-full text-center'),
        b(n, 'class', 'flex'),
        b(V, 'class', 'inline font-medium'),
        b(w, 'class', 'border-2 rounded-lg border-gray-600 m-1 text-center'),
        b(i, 'class', 'text-left text-lg');
    },
    m(P, B) {
      S(P, e, B),
        u(e, t),
        u(t, l),
        u(e, r),
        u(e, i),
        u(i, n),
        u(n, a),
        u(a, o),
        u(a, c),
        u(n, d),
        u(n, v),
        u(v, p),
        u(v, _),
        u(i, m),
        u(i, w),
        u(w, V),
        u(V, D),
        u(w, U),
        u(w, C);
    },
    p(P, B) {
      B & 18 && f !== (f = Math.round(ie(P[1], P[4] / 1e3, 2)) + '') && W(c, f),
        B & 18 && k !== (k = Math.round(ie(P[1], P[4] / 1e3, 1)) + '') && W(_, k),
        B & 18 && L !== (L = Math.round(ie(P[1], P[4] / 1e3, 1) + ie(P[1], P[4] / 1e3, 2)) + '') && W(C, L);
    },
    i: O,
    o: O,
    d(P) {
      P && h(e);
    },
  };
}
function Zr(s) {
  let e,
    t,
    l,
    r,
    i,
    n,
    a = Math.round(s[5]) + '',
    o,
    f,
    c = Math.round(s[6]) + '',
    d,
    v,
    p,
    k;
  function _(V, D) {
    return (
      (k == null || D & 98) && (k = V[5] === parseInt(V[1].endTile.x) && V[6] === parseInt(V[1].endTile.y)), k ? ts : es
    );
  }
  let m = _(s, -1),
    w = m(s);
  return {
    c() {
      (e = E('div')),
        (t = E('div')),
        (l = $('Status')),
        (r = N()),
        (i = E('div')),
        (n = $('Location: (')),
        (o = $(a)),
        (f = $(', ')),
        (d = $(c)),
        (v = $(')')),
        (p = N()),
        w.c(),
        this.h();
    },
    l(V) {
      e = y(V, 'DIV', {});
      var D = g(e);
      t = y(D, 'DIV', {class: !0});
      var U = g(t);
      (l = I(U, 'Status')), U.forEach(h), (r = Y(D)), (i = y(D, 'DIV', {}));
      var L = g(i);
      (n = I(L, 'Location: (')),
        (o = I(L, a)),
        (f = I(L, ', ')),
        (d = I(L, c)),
        (v = I(L, ')')),
        L.forEach(h),
        (p = Y(D)),
        w.l(D),
        D.forEach(h),
        this.h();
    },
    h() {
      b(t, 'class', 'text-xl');
    },
    m(V, D) {
      S(V, e, D),
        u(e, t),
        u(t, l),
        u(e, r),
        u(e, i),
        u(i, n),
        u(i, o),
        u(i, f),
        u(i, d),
        u(i, v),
        u(e, p),
        w.m(e, null);
    },
    p(V, D) {
      D & 32 && a !== (a = Math.round(V[5]) + '') && W(o, a),
        D & 64 && c !== (c = Math.round(V[6]) + '') && W(d, c),
        m === (m = _(V, D)) && w ? w.p(V, D) : (w.d(1), (w = m(V)), w && (w.c(), w.m(e, null)));
    },
    i: O,
    o: O,
    d(V) {
      V && h(e), w.d();
    },
  };
}
function Nt(s) {
  let e,
    t,
    l,
    r,
    i,
    n = s[22].id.slice(0, 4) + '',
    a,
    o,
    f = s[22].id.slice(-4) + '',
    c,
    d,
    v,
    p,
    k,
    _,
    m,
    w = Math.round(ie(s[22], s[4] / 1e3, 1) + ie(s[22], s[4] / 1e3, 2)) + '',
    V,
    D,
    U,
    L;
  return (
    (r = new tt({props: {address: s[22].id, class: 'h-6 w-6'}})),
    {
      c() {
        (e = E('div')),
          (t = E('a')),
          (l = E('div')),
          x(r.$$.fragment),
          (i = N()),
          (a = $(n)),
          (o = $('...')),
          (c = $(f)),
          (v = N()),
          (p = E('div')),
          (k = E('div')),
          (_ = $('Total level:')),
          (m = N()),
          (V = $(w)),
          (D = N()),
          (U = E('div')),
          this.h();
      },
      l(C) {
        e = y(C, 'DIV', {class: !0});
        var P = g(e);
        t = y(P, 'A', {rel: !0, target: !0, href: !0});
        var B = g(t);
        l = y(B, 'DIV', {class: !0});
        var j = g(l);
        ee(r.$$.fragment, j),
          (i = Y(j)),
          (a = I(j, n)),
          (o = I(j, '...')),
          (c = I(j, f)),
          j.forEach(h),
          B.forEach(h),
          (v = Y(P)),
          (p = y(P, 'DIV', {}));
        var X = g(p);
        k = y(X, 'DIV', {class: !0});
        var M = g(k);
        (_ = I(M, 'Total level:')),
          M.forEach(h),
          (m = Y(X)),
          (V = I(X, w)),
          X.forEach(h),
          P.forEach(h),
          (D = Y(C)),
          (U = y(C, 'DIV', {})),
          g(U).forEach(h),
          this.h();
      },
      h() {
        b(l, 'class', 'flex'),
          b(t, 'rel', 'noopener'),
          b(t, 'target', '_blank'),
          b(t, 'href', (d = `https://kovan.union.finance/profile/${s[22].id}`)),
          b(k, 'class', 'inline font-medium'),
          b(e, 'class', 'flex justify-between p-1');
      },
      m(C, P) {
        S(C, e, P),
          u(e, t),
          u(t, l),
          te(r, l, null),
          u(l, i),
          u(l, a),
          u(l, o),
          u(l, c),
          u(e, v),
          u(e, p),
          u(p, k),
          u(k, _),
          u(p, m),
          u(p, V),
          S(C, D, P),
          S(C, U, P),
          (L = !0);
      },
      p(C, P) {
        const B = {};
        P & 1 && (B.address = C[22].id),
          r.$set(B),
          (!L || P & 1) && n !== (n = C[22].id.slice(0, 4) + '') && W(a, n),
          (!L || P & 1) && f !== (f = C[22].id.slice(-4) + '') && W(c, f),
          (!L || (P & 1 && d !== (d = `https://kovan.union.finance/profile/${C[22].id}`))) && b(t, 'href', d),
          (!L || P & 17) && w !== (w = Math.round(ie(C[22], C[4] / 1e3, 1) + ie(C[22], C[4] / 1e3, 2)) + '') && W(V, w);
      },
      i(C) {
        L || (R(r.$$.fragment, C), (L = !0));
      },
      o(C) {
        H(r.$$.fragment, C), (L = !1);
      },
      d(C) {
        C && h(e), le(r), C && h(D), C && h(U);
      },
    }
  );
}
function Jr(s) {
  let e;
  return {
    c() {
      e = $("You don't own any equipment.");
    },
    l(t) {
      e = I(t, "You don't own any equipment.");
    },
    m(t, l) {
      S(t, e, l);
    },
    p: O,
    d(t) {
      t && h(e);
    },
  };
}
function xr(s) {
  let e,
    t = s[1].balances.filter(s[18]),
    l = [];
  for (let r = 0; r < t.length; r += 1) l[r] = Yt(Pt(s, t, r));
  return {
    c() {
      for (let r = 0; r < l.length; r += 1) l[r].c();
      e = re();
    },
    l(r) {
      for (let i = 0; i < l.length; i += 1) l[i].l(r);
      e = re();
    },
    m(r, i) {
      for (let n = 0; n < l.length; n += 1) l[n].m(r, i);
      S(r, e, i);
    },
    p(r, i) {
      if (i & 18) {
        t = r[1].balances.filter(r[18]);
        let n;
        for (n = 0; n < t.length; n += 1) {
          const a = Pt(r, t, n);
          l[n] ? l[n].p(a, i) : ((l[n] = Yt(a)), l[n].c(), l[n].m(e.parentNode, e));
        }
        for (; n < l.length; n += 1) l[n].d(1);
        l.length = t.length;
      }
    },
    d(r) {
      De(l, r), r && h(e);
    },
  };
}
function Yt(s) {
  let e,
    t = s[8].item.symbol + '',
    l,
    r = s[8].item.name + '',
    i,
    n,
    a = Math.round(ve(s[1], s[4] / 1e3, s[8].item.id)) + '',
    o,
    f;
  return {
    c() {
      (e = E('div')), (l = $(t)), (i = $(r)), (n = $(': ')), (o = $(a)), (f = N()), this.h();
    },
    l(c) {
      e = y(c, 'DIV', {class: !0});
      var d = g(e);
      (l = I(d, t)), (i = I(d, r)), (n = I(d, ': ')), (o = I(d, a)), (f = Y(d)), d.forEach(h), this.h();
    },
    h() {
      b(e, 'class', 'border-2');
    },
    m(c, d) {
      S(c, e, d), u(e, l), u(e, i), u(e, n), u(e, o), u(e, f);
    },
    p(c, d) {
      d & 18 && t !== (t = c[8].item.symbol + '') && W(l, t),
        d & 18 && r !== (r = c[8].item.name + '') && W(i, r),
        d & 18 && a !== (a = Math.round(ve(c[1], c[4] / 1e3, c[8].item.id)) + '') && W(o, a);
    },
    d(c) {
      c && h(e);
    },
  };
}
function es(s) {
  let e,
    t,
    l,
    r,
    i,
    n,
    a,
    o = s[1].endTile.x + '',
    f,
    c,
    d = s[1].endTile.y + '',
    v,
    p,
    k,
    _,
    m,
    w = s[13](ye(s[5], s[6], parseInt(s[1].endTile.x), parseInt(s[1].endTile.y))) + '',
    V,
    D,
    U,
    L;
  return {
    c() {
      (e = E('div')),
        (t = E('div')),
        (l = $('Walking')),
        (r = N()),
        (i = E('div')),
        (n = E('div')),
        (a = $('Walking to: (')),
        (f = $(o)),
        (c = $(', ')),
        (v = $(d)),
        (p = $(')')),
        (k = N()),
        (_ = E('div')),
        (m = $('Distance: ')),
        (V = $(w)),
        (D = $(` tiles
                `)),
        (U = E('div')),
        (L = $('(-0.1 tiles/s)')),
        this.h();
    },
    l(C) {
      e = y(C, 'DIV', {class: !0});
      var P = g(e);
      t = y(P, 'DIV', {});
      var B = g(t);
      (l = I(B, 'Walking')), B.forEach(h), (r = Y(P)), (i = y(P, 'DIV', {class: !0}));
      var j = g(i);
      n = y(j, 'DIV', {});
      var X = g(n);
      (a = I(X, 'Walking to: (')),
        (f = I(X, o)),
        (c = I(X, ', ')),
        (v = I(X, d)),
        (p = I(X, ')')),
        X.forEach(h),
        (k = Y(j)),
        (_ = y(j, 'DIV', {}));
      var M = g(_);
      (m = I(M, 'Distance: ')),
        (V = I(M, w)),
        (D = I(
          M,
          ` tiles
                `
        )),
        (U = y(M, 'DIV', {class: !0}));
      var A = g(U);
      (L = I(A, '(-0.1 tiles/s)')), A.forEach(h), M.forEach(h), j.forEach(h), P.forEach(h), this.h();
    },
    h() {
      b(U, 'class', 'inline text-sm text-green-700'),
        b(i, 'class', 'text-left'),
        b(e, 'class', 'border-2 border-gray-600');
    },
    m(C, P) {
      S(C, e, P),
        u(e, t),
        u(t, l),
        u(e, r),
        u(e, i),
        u(i, n),
        u(n, a),
        u(n, f),
        u(n, c),
        u(n, v),
        u(n, p),
        u(i, k),
        u(i, _),
        u(_, m),
        u(_, V),
        u(_, D),
        u(_, U),
        u(U, L);
    },
    p(C, P) {
      P & 2 && o !== (o = C[1].endTile.x + '') && W(f, o),
        P & 2 && d !== (d = C[1].endTile.y + '') && W(v, d),
        P & 98 && w !== (w = C[13](ye(C[5], C[6], parseInt(C[1].endTile.x), parseInt(C[1].endTile.y))) + '') && W(V, w);
    },
    d(C) {
      C && h(e);
    },
  };
}
function ts(s) {
  let e, t;
  function l(n, a) {
    return (e == null || a & 2) && (e = ne(parseInt(n[1].endTile.x), parseInt(n[1].endTile.y)) === 0), e ? rs : ls;
  }
  let r = l(s, -1),
    i = r(s);
  return {
    c() {
      i.c(), (t = re());
    },
    l(n) {
      i.l(n), (t = re());
    },
    m(n, a) {
      i.m(n, a), S(n, t, a);
    },
    p(n, a) {
      r === (r = l(n, a)) && i ? i.p(n, a) : (i.d(1), (i = r(n)), i && (i.c(), i.m(t.parentNode, t)));
    },
    d(n) {
      i.d(n), n && h(t);
    },
  };
}
function ls(s) {
  let e,
    t,
    l,
    r,
    i,
    n,
    a,
    o = (ne(parseInt(s[1].endTile.x), parseInt(s[1].endTile.y)) === 1 ? '\u{1FA93}' : '\u26CF\uFE0F') + '',
    f,
    c,
    d = Math.round(ie(s[1], s[4] / 1e3, ne(parseInt(s[1].endTile.x), parseInt(s[1].endTile.y)))) + '',
    v,
    p,
    k,
    _,
    m,
    w,
    V = (ne(parseInt(s[1].endTile.x), parseInt(s[1].endTile.y)) === 1 ? '\u{1FAB5}' : '\u{1FAA8}') + '',
    D,
    U,
    L = Math.round(ve(s[1], s[4] / 1e3, ne(parseInt(s[1].endTile.x), parseInt(s[1].endTile.y)).toString())) + '',
    C,
    P,
    B,
    j,
    X = s[13](ie(s[1], s[4] / 1e3, ne(parseInt(s[1].endTile.x), parseInt(s[1].endTile.y))) / 10) + '',
    M,
    A;
  function T(q, Q) {
    return (r == null || Q & 2) && (r = ne(parseInt(q[1].endTile.x), parseInt(q[1].endTile.y)) === 1), r ? ns : ss;
  }
  let G = T(s, -1),
    z = G(s);
  return {
    c() {
      (e = E('div')),
        (t = E('div')),
        (l = $(`Activity:
                `)),
        z.c(),
        (i = N()),
        (n = E('div')),
        (a = E('div')),
        (f = $(o)),
        (c = N()),
        (v = $(d)),
        (p = N()),
        (k = E('div')),
        (_ = $('(+0.1 point/s)')),
        (m = N()),
        (w = E('div')),
        (D = $(V)),
        (U = N()),
        (C = $(L)),
        (P = N()),
        (B = E('div')),
        (j = $('(+')),
        (M = $(X)),
        (A = $(' units/s)')),
        this.h();
    },
    l(q) {
      e = y(q, 'DIV', {class: !0});
      var Q = g(e);
      t = y(Q, 'DIV', {});
      var J = g(t);
      (l = I(
        J,
        `Activity:
                `
      )),
        z.l(J),
        J.forEach(h),
        (i = Y(Q)),
        (n = y(Q, 'DIV', {class: !0}));
      var K = g(n);
      a = y(K, 'DIV', {});
      var de = g(a);
      (f = I(de, o)), (c = Y(de)), (v = I(de, d)), (p = Y(de)), (k = y(de, 'DIV', {class: !0}));
      var se = g(k);
      (_ = I(se, '(+0.1 point/s)')), se.forEach(h), de.forEach(h), (m = Y(K)), (w = y(K, 'DIV', {}));
      var ae = g(w);
      (D = I(ae, V)), (U = Y(ae)), (C = I(ae, L)), (P = Y(ae)), (B = y(ae, 'DIV', {class: !0}));
      var he = g(B);
      (j = I(he, '(+')),
        (M = I(he, X)),
        (A = I(he, ' units/s)')),
        he.forEach(h),
        ae.forEach(h),
        K.forEach(h),
        Q.forEach(h),
        this.h();
    },
    h() {
      b(k, 'class', 'inline text-sm text-green-700'),
        b(B, 'class', 'inline text-sm text-green-700'),
        b(n, 'class', 'text-left'),
        b(e, 'class', 'border-2 border-gray-600');
    },
    m(q, Q) {
      S(q, e, Q),
        u(e, t),
        u(t, l),
        z.m(t, null),
        u(e, i),
        u(e, n),
        u(n, a),
        u(a, f),
        u(a, c),
        u(a, v),
        u(a, p),
        u(a, k),
        u(k, _),
        u(n, m),
        u(n, w),
        u(w, D),
        u(w, U),
        u(w, C),
        u(w, P),
        u(w, B),
        u(B, j),
        u(B, M),
        u(B, A);
    },
    p(q, Q) {
      G !== (G = T(q, Q)) && (z.d(1), (z = G(q)), z && (z.c(), z.m(t, null))),
        Q & 2 &&
          o !==
            (o = (ne(parseInt(q[1].endTile.x), parseInt(q[1].endTile.y)) === 1 ? '\u{1FA93}' : '\u26CF\uFE0F') + '') &&
          W(f, o),
        Q & 18 &&
          d !== (d = Math.round(ie(q[1], q[4] / 1e3, ne(parseInt(q[1].endTile.x), parseInt(q[1].endTile.y)))) + '') &&
          W(v, d),
        Q & 2 &&
          V !== (V = (ne(parseInt(q[1].endTile.x), parseInt(q[1].endTile.y)) === 1 ? '\u{1FAB5}' : '\u{1FAA8}') + '') &&
          W(D, V),
        Q & 18 &&
          L !==
            (L =
              Math.round(ve(q[1], q[4] / 1e3, ne(parseInt(q[1].endTile.x), parseInt(q[1].endTile.y)).toString())) +
              '') &&
          W(C, L),
        Q & 18 &&
          X !== (X = q[13](ie(q[1], q[4] / 1e3, ne(parseInt(q[1].endTile.x), parseInt(q[1].endTile.y))) / 10) + '') &&
          W(M, X);
    },
    d(q) {
      q && h(e), z.d();
    },
  };
}
function rs(s) {
  let e, t;
  return {
    c() {
      (e = E('div')), (t = $("There's nothing to do here!")), this.h();
    },
    l(l) {
      e = y(l, 'DIV', {class: !0});
      var r = g(e);
      (t = I(r, "There's nothing to do here!")), r.forEach(h), this.h();
    },
    h() {
      b(e, 'class', 'border-2 border-gray-600');
    },
    m(l, r) {
      S(l, e, r), u(e, t);
    },
    p: O,
    d(l) {
      l && h(e);
    },
  };
}
function ss(s) {
  let e;
  return {
    c() {
      e = $('Mining');
    },
    l(t) {
      e = I(t, 'Mining');
    },
    m(t, l) {
      S(t, e, l);
    },
    d(t) {
      t && h(e);
    },
  };
}
function ns(s) {
  let e;
  return {
    c() {
      e = $('Woodcutting');
    },
    l(t) {
      e = I(t, 'Woodcutting');
    },
    m(t, l) {
      S(t, e, l);
    },
    d(t) {
      t && h(e);
    },
  };
}
function is(s) {
  let e,
    t,
    l,
    r = s[7].address.slice(0, 4) + '',
    i,
    n,
    a = s[7].address.slice(-4) + '',
    o,
    f,
    c,
    d,
    v,
    p,
    k = Math.round(ve(s[1], s[4] / 1e3, '1')) + '',
    _,
    m,
    w,
    V,
    D = Math.round(ve(s[1], s[4] / 1e3, '2')) + '',
    U,
    L,
    C,
    P,
    B = s[8].div('1000000000000000000') + '',
    j,
    X,
    M,
    A,
    T,
    G,
    z,
    q,
    Q,
    J,
    K = s[3] && Tt(s);
  (c = new tt({props: {address: s[7].address, class: 'm-1 h-6 w-6'}})), (M = new Ae({}));
  let de = [
      '\u{1F3AE}',
      '\u{1F4CA}',
      '\u{1F392}',
      '\u{1F3EA}',
      '\u{1F6E0}\uFE0F',
      '\u{1F3E6}',
      '\u{1F3C5}',
      '\u2699\uFE0F',
    ],
    se = [];
  for (let F = 0; F < 8; F += 1) se[F] = Bt(Ct(s, de, F));
  const ae = [Zr, Kr, Gr, Fr, Qr, Wr, zr, qr],
    he = [];
  function Me(F, Z) {
    return F[2] === 0
      ? 0
      : F[2] === 1
      ? 1
      : F[2] === 2
      ? 2
      : F[2] === 3
      ? 3
      : F[2] === 4
      ? 4
      : F[2] === 5
      ? 5
      : F[2] === 6
      ? 6
      : 7;
  }
  return (
    (q = Me(s)),
    (Q = he[q] = ae[q](s)),
    {
      c() {
        (e = E('div')),
          K && K.c(),
          (t = N()),
          (l = E('div')),
          (i = $(r)),
          (n = $('...')),
          (o = $(a)),
          (f = N()),
          x(c.$$.fragment),
          (d = N()),
          (v = E('div')),
          (p = E('div')),
          (_ = $(k)),
          (m = $(' \u{1FAB5}')),
          (w = N()),
          (V = E('div')),
          (U = $(D)),
          (L = $(' \u{1FAA8}')),
          (C = N()),
          (P = E('div')),
          (j = $(B)),
          (X = N()),
          x(M.$$.fragment),
          (A = N()),
          (T = E('div'));
        for (let F = 0; F < 8; F += 1) se[F].c();
        (G = N()), (z = E('div')), Q.c(), this.h();
      },
      l(F) {
        e = y(F, 'DIV', {class: !0});
        var Z = g(e);
        K && K.l(Z), (t = Y(Z)), (l = y(Z, 'DIV', {class: !0}));
        var ce = g(l);
        (i = I(ce, r)),
          (n = I(ce, '...')),
          (o = I(ce, a)),
          (f = Y(ce)),
          ee(c.$$.fragment, ce),
          ce.forEach(h),
          (d = Y(Z)),
          (v = y(Z, 'DIV', {class: !0}));
        var ke = g(v);
        p = y(ke, 'DIV', {class: !0});
        var _e = g(p);
        (_ = I(_e, k)), (m = I(_e, ' \u{1FAB5}')), _e.forEach(h), (w = Y(ke)), (V = y(ke, 'DIV', {class: !0}));
        var Te = g(V);
        (U = I(Te, D)), (L = I(Te, ' \u{1FAA8}')), Te.forEach(h), (C = Y(ke)), (P = y(ke, 'DIV', {class: !0}));
        var Oe = g(P);
        (j = I(Oe, B)),
          (X = Y(Oe)),
          ee(M.$$.fragment, Oe),
          Oe.forEach(h),
          ke.forEach(h),
          (A = Y(Z)),
          (T = y(Z, 'DIV', {class: !0}));
        var st = g(T);
        for (let Re = 0; Re < 8; Re += 1) se[Re].l(st);
        st.forEach(h), (G = Y(Z)), (z = y(Z, 'DIV', {class: !0}));
        var nt = g(z);
        Q.l(nt), nt.forEach(h), Z.forEach(h), this.h();
      },
      h() {
        b(l, 'class', 'flex text-2xl justify-center p-2'),
          b(p, 'class', 'border-2 w-full border-gray-500'),
          b(V, 'class', 'border-2 w-full border-gray-500'),
          b(P, 'class', 'flex border-2 border-gray-500 w-full justify-center'),
          b(v, 'class', 'flex text-2xl justify-between text-base'),
          b(T, 'class', 'flex text-2xl justify-start'),
          b(z, 'class', 'border-2 border-gray-700 p-2 h-full'),
          b(e, 'class', 'flex flex-col text-center bg-neutral-300 w-64 h-72');
      },
      m(F, Z) {
        S(F, e, Z),
          K && K.m(e, null),
          u(e, t),
          u(e, l),
          u(l, i),
          u(l, n),
          u(l, o),
          u(l, f),
          te(c, l, null),
          u(e, d),
          u(e, v),
          u(v, p),
          u(p, _),
          u(p, m),
          u(v, w),
          u(v, V),
          u(V, U),
          u(V, L),
          u(v, C),
          u(v, P),
          u(P, j),
          u(P, X),
          te(M, P, null),
          u(e, A),
          u(e, T);
        for (let ce = 0; ce < 8; ce += 1) se[ce].m(T, null);
        u(e, G), u(e, z), he[q].m(z, null), (J = !0);
      },
      p(F, [Z]) {
        F[3]
          ? K
            ? (K.p(F, Z), Z & 8 && R(K, 1))
            : ((K = Tt(F)), K.c(), R(K, 1), K.m(e, t))
          : K &&
            (fe(),
            H(K, 1, 1, () => {
              K = null;
            }),
            ue()),
          (!J || Z & 128) && r !== (r = F[7].address.slice(0, 4) + '') && W(i, r),
          (!J || Z & 128) && a !== (a = F[7].address.slice(-4) + '') && W(o, a);
        const ce = {};
        if (
          (Z & 128 && (ce.address = F[7].address),
          c.$set(ce),
          (!J || Z & 18) && k !== (k = Math.round(ve(F[1], F[4] / 1e3, '1')) + '') && W(_, k),
          (!J || Z & 18) && D !== (D = Math.round(ve(F[1], F[4] / 1e3, '2')) + '') && W(U, D),
          (!J || Z & 256) && B !== (B = F[8].div('1000000000000000000') + '') && W(j, B),
          Z & 4)
        ) {
          de = [
            '\u{1F3AE}',
            '\u{1F4CA}',
            '\u{1F392}',
            '\u{1F3EA}',
            '\u{1F6E0}\uFE0F',
            '\u{1F3E6}',
            '\u{1F3C5}',
            '\u2699\uFE0F',
          ];
          let _e;
          for (_e = 0; _e < 8; _e += 1) {
            const Te = Ct(F, de, _e);
            se[_e] ? se[_e].p(Te, Z) : ((se[_e] = Bt(Te)), se[_e].c(), se[_e].m(T, null));
          }
          for (; _e < 8; _e += 1) se[_e].d(1);
        }
        let ke = q;
        (q = Me(F)),
          q === ke
            ? he[q].p(F, Z)
            : (fe(),
              H(he[ke], 1, 1, () => {
                he[ke] = null;
              }),
              ue(),
              (Q = he[q]),
              Q ? Q.p(F, Z) : ((Q = he[q] = ae[q](F)), Q.c()),
              R(Q, 1),
              Q.m(z, null));
      },
      i(F) {
        J || (R(K), R(c.$$.fragment, F), R(M.$$.fragment, F), R(Q), (J = !0));
      },
      o(F) {
        H(K), H(c.$$.fragment, F), H(M.$$.fragment, F), H(Q), (J = !1);
      },
      d(F) {
        F && h(e), K && K.d(), le(c), le(M), De(se, F), he[q].d();
      },
    }
  );
}
function os(s, e, t) {
  let l;
  Ie(s, Be, (P) => t(7, (l = P)));
  let {players: r} = e,
    {currentPlayer: i} = e;
  async function n() {
    await be.execute((P) => P.DAI.mint(l.address, '100000000000000000000'));
  }
  async function a() {
    await be.execute((P) => P.DAI.approve(P.UnionQuest.address, '100000000000000000000000000000000'));
  }
  async function o() {
    await be.execute((P) => P.UnionQuest.setApprovalForAll(P.UnionQuest.address, !0));
  }
  async function f() {
    await be.execute((P) => P.UnionQuest.updateTrust(l.address));
  }
  let c = 0,
    d = !1,
    v = Date.now(),
    p = 0,
    k = 0,
    _ = nl.from('0');
  const m = (P) => Math.round(P * 10) / 10,
    w = (P) => Math.round(P * 100) / 100;
  je(() => {
    be.execute((B) => B.DAI.balanceOf(l.address).then((j) => t(8, (_ = j))));
    const P = setInterval(() => {
      t(4, (v = Date.now())), i && t(5, ([p, k] = Ee(i, v / 1e3)), p, t(6, k));
    }, 100);
    return () => {
      clearInterval(P);
    };
  });
  const V = (P) => P.item.id !== '1' && P.item.id !== '2' && Math.round(ve(i, v / 1e3, P.item.id)) > 0,
    D = () => t(3, (d = !1)),
    U = (P) => t(2, (c = P)),
    L = (P) => P.item.id !== '1' && P.item.id !== '2' && Math.round(ve(i, v / 1e3, P.item.id)) > 0,
    C = () => t(3, (d = !0));
  return (
    (s.$$set = (P) => {
      'players' in P && t(0, (r = P.players)), 'currentPlayer' in P && t(1, (i = P.currentPlayer));
    }),
    [r, i, c, d, v, p, k, l, _, n, a, o, f, m, w, V, D, U, L, C]
  );
}
class as extends ge {
  constructor(e) {
    super();
    we(this, e, os, is, $e, {players: 0, currentPlayer: 1});
  }
}
function Lt(s) {
  let e, t;
  return (
    (e = new Ce({
      props: {title: `Tile (${s[1]},${s[2]})`, closeButton: !0, $$slots: {default: [hs]}, $$scope: {ctx: s}},
    })),
    e.$on('close', s[8]),
    {
      c() {
        x(e.$$.fragment);
      },
      l(l) {
        ee(e.$$.fragment, l);
      },
      m(l, r) {
        te(e, l, r), (t = !0);
      },
      p(l, r) {
        const i = {};
        r & 6 && (i.title = `Tile (${l[1]},${l[2]})`), r & 542 && (i.$$scope = {dirty: r, ctx: l}), e.$set(i);
      },
      i(l) {
        t || (R(e.$$.fragment, l), (t = !0));
      },
      o(l) {
        H(e.$$.fragment, l), (t = !1);
      },
      d(l) {
        le(e, l);
      },
    }
  );
}
function cs(s) {
  let e, t;
  return {
    c() {
      (e = E('div')), (t = $('You need to join the game first!'));
    },
    l(l) {
      e = y(l, 'DIV', {});
      var r = g(e);
      (t = I(r, 'You need to join the game first!')), r.forEach(h);
    },
    m(l, r) {
      S(l, e, r), u(e, t);
    },
    p: O,
    d(l) {
      l && h(e);
    },
  };
}
function fs(s) {
  let e,
    t,
    l,
    r = s[5](ye(s[1], s[2], Ee(s[3], s[4] / 1e3)[0], Ee(s[3], s[4] / 1e3)[1])) + '',
    i,
    n,
    a,
    o,
    f,
    c,
    d = s[5](Ot * ye(s[1], s[2], Ee(s[3], s[4] / 1e3)[0], Ee(s[3], s[4] / 1e3)[1])) + '',
    v,
    p,
    k,
    _,
    m,
    w,
    V,
    D,
    U,
    L,
    C;
  function P(X, M) {
    return (w == null || M & 6) && (w = ne(X[1], X[2]) !== 0), w ? ds : us;
  }
  let B = P(s, -1),
    j = B(s);
  return {
    c() {
      (e = E('div')),
        (t = E('div')),
        (l = $('This tile is ')),
        (i = $(r)),
        (n = $(' unit(s) from you.')),
        (a = N()),
        (o = E('div')),
        (f = $(`It will take
                `)),
        (c = E('span')),
        (v = $(d)),
        (p = $(' seconds')),
        (k = $(`
                to walk here.`)),
        (_ = N()),
        (m = E('div')),
        j.c(),
        (V = N()),
        (D = E('button')),
        (U = $('MOVE HERE')),
        this.h();
    },
    l(X) {
      e = y(X, 'DIV', {class: !0});
      var M = g(e);
      t = y(M, 'DIV', {});
      var A = g(t);
      (l = I(A, 'This tile is ')),
        (i = I(A, r)),
        (n = I(A, ' unit(s) from you.')),
        A.forEach(h),
        (a = Y(M)),
        (o = y(M, 'DIV', {}));
      var T = g(o);
      (f = I(
        T,
        `It will take
                `
      )),
        (c = y(T, 'SPAN', {class: !0}));
      var G = g(c);
      (v = I(G, d)),
        (p = I(G, ' seconds')),
        G.forEach(h),
        (k = I(
          T,
          `
                to walk here.`
        )),
        T.forEach(h),
        (_ = Y(M)),
        (m = y(M, 'DIV', {}));
      var z = g(m);
      j.l(z), z.forEach(h), (V = Y(M)), (D = y(M, 'BUTTON', {class: !0, type: !0}));
      var q = g(D);
      (U = I(q, 'MOVE HERE')), q.forEach(h), M.forEach(h), this.h();
    },
    h() {
      b(c, 'class', 'font-bold'),
        b(
          D,
          'class',
          'flex-shrink-0 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 text-sm border-4 text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed m-1'
        ),
        b(D, 'type', 'button'),
        b(e, 'class', 'p-1');
    },
    m(X, M) {
      S(X, e, M),
        u(e, t),
        u(t, l),
        u(t, i),
        u(t, n),
        u(e, a),
        u(e, o),
        u(o, f),
        u(o, c),
        u(c, v),
        u(c, p),
        u(o, k),
        u(e, _),
        u(e, m),
        j.m(m, null),
        u(e, V),
        u(e, D),
        u(D, U),
        L || ((C = oe(D, 'click', s[7])), (L = !0));
    },
    p(X, M) {
      M & 30 && r !== (r = X[5](ye(X[1], X[2], Ee(X[3], X[4] / 1e3)[0], Ee(X[3], X[4] / 1e3)[1])) + '') && W(i, r),
        M & 30 &&
          d !== (d = X[5](Ot * ye(X[1], X[2], Ee(X[3], X[4] / 1e3)[0], Ee(X[3], X[4] / 1e3)[1])) + '') &&
          W(v, d),
        B === (B = P(X, M)) && j ? j.p(X, M) : (j.d(1), (j = B(X)), j && (j.c(), j.m(m, null)));
    },
    d(X) {
      X && h(e), j.d(), (L = !1), C();
    },
  };
}
function us(s) {
  let e;
  return {
    c() {
      e = $('There are no resources on this tile.');
    },
    l(t) {
      e = I(t, 'There are no resources on this tile.');
    },
    m(t, l) {
      S(t, e, l);
    },
    p: O,
    d(t) {
      t && h(e);
    },
  };
}
function ds(s) {
  let e,
    t,
    l = (ne(s[1], s[2]) === 1 ? '\u{1FAB5}' : '\u{1FAA8}') + '',
    r,
    i,
    n,
    a = Math.round(ie(s[3], s[4] / 1e3, ne(s[1], s[2]))) + '',
    o,
    f;
  return {
    c() {
      (e = $(`Once you arrive, you will start gathering
                  `)),
        (t = E('span')),
        (r = $(l)),
        (i = $(`
                  at a rate of
                  `)),
        (n = E('div')),
        (o = $(a)),
        (f = $(`
                  units/s.`)),
        this.h();
    },
    l(c) {
      (e = I(
        c,
        `Once you arrive, you will start gathering
                  `
      )),
        (t = y(c, 'SPAN', {class: !0}));
      var d = g(t);
      (r = I(d, l)),
        d.forEach(h),
        (i = I(
          c,
          `
                  at a rate of
                  `
        )),
        (n = y(c, 'DIV', {class: !0}));
      var v = g(n);
      (o = I(v, a)),
        v.forEach(h),
        (f = I(
          c,
          `
                  units/s.`
        )),
        this.h();
    },
    h() {
      b(t, 'class', 'inline font-bold'), b(n, 'class', 'inline font-bold');
    },
    m(c, d) {
      S(c, e, d), S(c, t, d), u(t, r), S(c, i, d), S(c, n, d), u(n, o), S(c, f, d);
    },
    p(c, d) {
      d & 6 && l !== (l = (ne(c[1], c[2]) === 1 ? '\u{1FAB5}' : '\u{1FAA8}') + '') && W(r, l),
        d & 30 && a !== (a = Math.round(ie(c[3], c[4] / 1e3, ne(c[1], c[2]))) + '') && W(o, a);
    },
    d(c) {
      c && h(e), c && h(t), c && h(i), c && h(n), c && h(f);
    },
  };
}
function At(s) {
  let e, t;
  return {
    c() {
      (e = E('div')),
        (t = $('This is the spawn tile. All new players enter the UnionQuest world from here.')),
        this.h();
    },
    l(l) {
      e = y(l, 'DIV', {class: !0});
      var r = g(e);
      (t = I(r, 'This is the spawn tile. All new players enter the UnionQuest world from here.')),
        r.forEach(h),
        this.h();
    },
    h() {
      b(e, 'class', 'italic');
    },
    m(l, r) {
      S(l, e, r), u(e, t);
    },
    d(l) {
      l && h(e);
    },
  };
}
function hs(s) {
  let e, t, l;
  function r(o, f) {
    return o[3] ? fs : cs;
  }
  let i = r(s),
    n = i(s),
    a = s[1] === 0 && s[2] === 0 && At();
  return {
    c() {
      (e = E('div')), (t = E('div')), n.c(), (l = N()), a && a.c(), this.h();
    },
    l(o) {
      e = y(o, 'DIV', {class: !0});
      var f = g(e);
      t = y(f, 'DIV', {class: !0});
      var c = g(t);
      n.l(c), (l = Y(c)), a && a.l(c), c.forEach(h), f.forEach(h), this.h();
    },
    h() {
      b(t, 'class', 'p-2 border-2 border-gray-400 h-full'),
        b(e, 'class', 'flex flex-col border-2 border-gray-400 text-center');
    },
    m(o, f) {
      S(o, e, f), u(e, t), n.m(t, null), u(t, l), a && a.m(t, null);
    },
    p(o, f) {
      i === (i = r(o)) && n ? n.p(o, f) : (n.d(1), (n = i(o)), n && (n.c(), n.m(t, l))),
        o[1] === 0 && o[2] === 0 ? a || ((a = At()), a.c(), a.m(t, null)) : a && (a.d(1), (a = null));
    },
    d(o) {
      o && h(e), n.d(), a && a.d();
    },
  };
}
function _s(s) {
  let e,
    t,
    l = s[0] && Lt(s);
  return {
    c() {
      (e = E('div')), l && l.c();
    },
    l(r) {
      e = y(r, 'DIV', {});
      var i = g(e);
      l && l.l(i), i.forEach(h);
    },
    m(r, i) {
      S(r, e, i), l && l.m(e, null), (t = !0);
    },
    p(r, [i]) {
      r[0]
        ? l
          ? (l.p(r, i), i & 1 && R(l, 1))
          : ((l = Lt(r)), l.c(), R(l, 1), l.m(e, null))
        : l &&
          (fe(),
          H(l, 1, 1, () => {
            l = null;
          }),
          ue());
    },
    i(r) {
      t || (R(l), (t = !0));
    },
    o(r) {
      H(l), (t = !1);
    },
    d(r) {
      r && h(e), l && l.d();
    },
  };
}
const Ot = 10;
function vs(s, e, t) {
  let {x: l} = e,
    {y: r} = e,
    {currentPlayer: i} = e,
    {showModal: n} = e;
  const a = (v) => Math.round(v * 10) / 10;
  async function o(v, p) {
    await be.execute((k) => k.UnionQuest.move(v, p, {gasLimit: '100000'}));
  }
  let f = Date.now();
  je(() => {
    const v = setInterval(() => {
      t(4, (f = Date.now()));
    }, 100);
    return () => {
      clearInterval(v);
    };
  });
  const c = () => o(l, r),
    d = () => t(0, (n = !1));
  return (
    (s.$$set = (v) => {
      'x' in v && t(1, (l = v.x)),
        'y' in v && t(2, (r = v.y)),
        'currentPlayer' in v && t(3, (i = v.currentPlayer)),
        'showModal' in v && t(0, (n = v.showModal));
    }),
    [n, l, r, i, f, a, o, c, d]
  );
}
class ps extends ge {
  constructor(e) {
    super();
    we(this, e, vs, _s, $e, {x: 1, y: 2, currentPlayer: 3, showModal: 0});
  }
}
function Ut(s, e, t) {
  const l = s.slice();
  return (l[24] = e[t]), l;
}
function jt(s) {
  let e, t;
  return (
    (e = new tt({props: {class: 'hidden', address: s[24].id}})),
    {
      c() {
        x(e.$$.fragment);
      },
      l(l) {
        ee(e.$$.fragment, l);
      },
      m(l, r) {
        te(e, l, r), (t = !0);
      },
      p(l, r) {
        const i = {};
        r & 1 && (i.address = l[24].id), e.$set(i);
      },
      i(l) {
        t || (R(e.$$.fragment, l), (t = !0));
      },
      o(l) {
        H(e.$$.fragment, l), (t = !1);
      },
      d(l) {
        le(e, l);
      },
    }
  );
}
function ms(s) {
  let e, t, l, r, i, n, a;
  function o(p) {
    s[6](p);
  }
  let f = {x: s[3] + 0.5, y: s[4] + 0.5, currentPlayer: s[1]};
  s[5] !== void 0 && (f.showModal = s[5]), (t = new ps({props: f})), Ue.push(() => il(t, 'showModal', o));
  let c = s[0],
    d = [];
  for (let p = 0; p < c.length; p += 1) d[p] = jt(Ut(s, c, p));
  const v = (p) =>
    H(d[p], 1, 1, () => {
      d[p] = null;
    });
  return {
    c() {
      (e = E('div')), x(t.$$.fragment), (r = N()), (i = E('canvas')), (n = N());
      for (let p = 0; p < d.length; p += 1) d[p].c();
      this.h();
    },
    l(p) {
      e = y(p, 'DIV', {});
      var k = g(e);
      ee(t.$$.fragment, k), (r = Y(k)), (i = y(k, 'CANVAS', {class: !0})), g(i).forEach(h), (n = Y(k));
      for (let _ = 0; _ < d.length; _ += 1) d[_].l(k);
      k.forEach(h), this.h();
    },
    h() {
      b(i, 'class', 'svelte-1up74zk');
    },
    m(p, k) {
      S(p, e, k), te(t, e, null), u(e, r), u(e, i), s[7](i), u(e, n);
      for (let _ = 0; _ < d.length; _ += 1) d[_].m(e, null);
      a = !0;
    },
    p(p, [k]) {
      const _ = {};
      if (
        (k & 8 && (_.x = p[3] + 0.5),
        k & 16 && (_.y = p[4] + 0.5),
        k & 2 && (_.currentPlayer = p[1]),
        !l && k & 32 && ((l = !0), (_.showModal = p[5]), ol(() => (l = !1))),
        t.$set(_),
        k & 1)
      ) {
        c = p[0];
        let m;
        for (m = 0; m < c.length; m += 1) {
          const w = Ut(p, c, m);
          d[m] ? (d[m].p(w, k), R(d[m], 1)) : ((d[m] = jt(w)), d[m].c(), R(d[m], 1), d[m].m(e, null));
        }
        for (fe(), m = c.length; m < d.length; m += 1) v(m);
        ue();
      }
    },
    i(p) {
      if (!a) {
        R(t.$$.fragment, p);
        for (let k = 0; k < c.length; k += 1) R(d[k]);
        a = !0;
      }
    },
    o(p) {
      H(t.$$.fragment, p), (d = d.filter(Boolean));
      for (let k = 0; k < d.length; k += 1) H(d[k]);
      a = !1;
    },
    d(p) {
      p && h(e), le(t), s[7](null), De(d, p);
    },
  };
}
const bs = 25,
  ks = 100,
  gs = 0.5,
  Xt = 6;
function Ve(s) {
  if (s.touches && s.touches.length == 1) return {x: s.touches[0].clientX, y: s.touches[0].clientY};
  if (s.clientX && s.clientY) return {x: s.clientX, y: s.clientY};
}
function ws(s, e, t) {
  let {players: l} = e,
    {currentPlayer: r} = e,
    i = Date.now(),
    n,
    a = 50,
    o,
    f = !1,
    c = {x: 0, y: 0},
    d = {x: 0, y: 0},
    v,
    p,
    k = !1,
    _ = {};
  const m = () => {
    t(2, (n.width = window.innerWidth), n), t(2, (n.height = window.innerHeight), n);
    let M = n.getContext('2d');
    M.translate(window.innerWidth / 2, window.innerHeight / 2),
      M.scale(a, a),
      M.translate(-window.innerWidth / 2 + o.x, -window.innerHeight / 2 + o.y),
      M.clearRect(0, 0, window.innerWidth, window.innerHeight),
      (M.strokeStyle = '#BBBBBB'),
      (M.lineWidth = 0.01),
      (M.font = '1px Arial');
    for (let A = -50; A < 50; A++)
      for (let T = -50; T < 50; T++)
        (M.fillStyle = '#808080'), M.fillRect(A - 0.5, T - 0.5, 1, 1), M.fillText('\u26F0\uFE0F', A - 0.5, T + 0.5);
    for (let A = -9; A < 11; A++)
      for (let T = -9; T < 11; T++)
        _[A] || (_[A] = {}),
          _[A][T] || (_[A][T] = ne(A, T)),
          A === 0 && T === 0
            ? ((M.fillStyle = '#1CA3EC'), M.fillRect(A - 0.5, T - 0.5, 1, 1), M.fillText('\u{1F3F0}', A - 0.5, T + 0.5))
            : _[A][T] === 1
            ? ((M.fillStyle = '#22c55e'), M.fillRect(A - 0.5, T - 0.5, 1, 1), M.fillText('\u{1F332}', A - 0.5, T + 0.5))
            : _[A][T] === 2
            ? ((M.fillStyle = '#cd9575'), M.fillRect(A - 0.5, T - 0.5, 1, 1), M.fillText('\u{1FAA8}', A - 0.5, T + 0.5))
            : ((M.fillStyle = '#59A608'), M.fillRect(A - 0.5, T - 0.5, 1, 1)),
          M.strokeRect(A - 0.5, T - 0.5, 1, 1);
    (M.lineWidth = 0.04),
      r && ((M.strokeStyle = '#FF0000'), M.strokeRect(parseInt(r.endTile.x) - 0.5, parseInt(r.endTile.y) - 0.5, 1, 1)),
      l.forEach((A) => {
        const T = Ee(A, i / 1e3);
        let G = document.getElementById(A.id);
        M.drawImage(G, T[0] - 0.25, T[1] - 0.25, 0.5, 0.5),
          (M.strokeStyle = '#ffffff'),
          M.strokeRect(T[0] - 0.25, T[1] - 0.25, 0.5, 0.5),
          T[0] === parseInt(A.endTile.x) &&
            T[1] === parseInt(A.endTile.y) &&
            ne(parseInt(A.endTile.x), parseInt(A.endTile.y)) &&
            (ne(parseInt(A.endTile.x), parseInt(A.endTile.y)) === 1
              ? M.fillText('\u{1FA93}', T[0], T[1])
              : M.fillText('\u26CF\uFE0F', T[0], T[1]));
      }),
      (M.strokeStyle = '#0000FF'),
      M.strokeRect(v, p, 1, 1);
  };
  function w(M) {
    (f = !0), (c.x = Ve(M).x / a - o.x), (c.y = Ve(M).y / a - o.y), (d.x = Ve(M).x), (d.y = Ve(M).y);
  }
  function V(M) {
    Math.abs(d.x - Ve(M).x) < Xt && Math.abs(d.y - Ve(M).y) < Xt && t(5, (k = !0)), (f = !1), (L = null), (C = a);
  }
  function D(M) {
    f && ((o.x = Ve(M).x / a - c.x), (o.y = Ve(M).y / a - c.y));
    let A = n.getBoundingClientRect();
    t(
      3,
      (v = Math.floor((M.clientX - A.left - window.innerWidth / 2) / a + (window.innerWidth / 2 - o.x) + 0.5) - 0.5)
    ),
      t(
        4,
        (p = Math.floor((M.clientY - A.left - window.innerHeight / 2) / a + (window.innerHeight / 2 - o.y) - 0.5) + 0.5)
      );
  }
  function U(M, A) {
    M.touches.length == 1 ? A(M) : M.type == 'touchmove' && M.touches.length == 2 && ((f = !1), P(M));
  }
  let L = null,
    C = a;
  function P(M) {
    M.preventDefault();
    let A = {x: M.touches[0].clientX, y: M.touches[0].clientY},
      T = {x: M.touches[1].clientX, y: M.touches[1].clientY},
      G = (A.x - T.x) ** 2 + (A.y - T.y) ** 2;
    L == null ? (L = G) : B(null, G / L);
  }
  function B(M, A) {
    f || (M ? (a += M) : A && (a = A * C), (a = Math.min(a, ks)), (a = Math.max(a, bs)));
  }
  je(() => {
    (o = {x: window.innerWidth / 2, y: window.innerHeight / 2}),
      n.addEventListener('mousedown', w),
      n.addEventListener('touchstart', (T) => U(T, w)),
      n.addEventListener('mouseup', V),
      n.addEventListener('touchend', (T) => U(T, V)),
      n.addEventListener('mousemove', D),
      n.addEventListener('touchmove', (T) => U(T, D)),
      n.addEventListener('wheel', (T) => B(-T.deltaY * gs));
    const M = setInterval(() => {
      i = Date.now();
    }, 10);
    function A() {
      m(), requestAnimationFrame(A);
    }
    return (
      requestAnimationFrame(A),
      () => {
        clearInterval(M);
      }
    );
  });
  function j(M) {
    (k = M), t(5, k);
  }
  function X(M) {
    Ue[M ? 'unshift' : 'push'](() => {
      (n = M), t(2, n);
    });
  }
  return (
    (s.$$set = (M) => {
      'players' in M && t(0, (l = M.players)), 'currentPlayer' in M && t(1, (r = M.currentPlayer));
    }),
    [l, r, n, v, p, k, j, X]
  );
}
class $s extends ge {
  constructor(e) {
    super();
    we(this, e, ws, ms, $e, {players: 0, currentPlayer: 1});
  }
}
function Is(s) {
  let e, t, l, r, i, n, a, o, f, c, d;
  (e = new $s({props: {players: s[0].data, currentPlayer: s[0].data.find(s[4])}})),
    (i = new Pe({props: {href: dl('/'), label: 'Home', $$slots: {default: [Ms]}, $$scope: {ctx: s}}}));
  const v = [Ps, Ss],
    p = [];
  function k(_, m) {
    return (o == null || m & 3) && (o = !!(_[1].address && _[0].data.find(_[3]))), o ? 0 : 1;
  }
  return (
    (f = k(s, -1)),
    (c = p[f] = v[f](s)),
    {
      c() {
        x(e.$$.fragment),
          (t = N()),
          (l = E('div')),
          (r = E('div')),
          x(i.$$.fragment),
          (n = N()),
          (a = E('div')),
          c.c(),
          this.h();
      },
      l(_) {
        ee(e.$$.fragment, _), (t = Y(_)), (l = y(_, 'DIV', {class: !0}));
        var m = g(l);
        r = y(m, 'DIV', {class: !0});
        var w = g(r);
        ee(i.$$.fragment, w), w.forEach(h), (n = Y(m)), (a = y(m, 'DIV', {class: !0}));
        var V = g(a);
        c.l(V), V.forEach(h), m.forEach(h), this.h();
      },
      h() {
        b(r, 'class', 'fixed bottom-0 left-0 m-2 svelte-8b44jz'),
          b(a, 'class', 'fixed bottom-0 right-0 border-8 border-double border-gray-700 bg-gray-300 p-1 svelte-8b44jz'),
          b(l, 'class', 'relative svelte-8b44jz');
      },
      m(_, m) {
        te(e, _, m), S(_, t, m), S(_, l, m), u(l, r), te(i, r, null), u(l, n), u(l, a), p[f].m(a, null), (d = !0);
      },
      p(_, m) {
        const w = {};
        m & 1 && (w.players = _[0].data), m & 3 && (w.currentPlayer = _[0].data.find(_[4])), e.$set(w);
        const V = {};
        m & 128 && (V.$$scope = {dirty: m, ctx: _}), i.$set(V);
        let D = f;
        (f = k(_, m)),
          f === D
            ? p[f].p(_, m)
            : (fe(),
              H(p[D], 1, 1, () => {
                p[D] = null;
              }),
              ue(),
              (c = p[f]),
              c ? c.p(_, m) : ((c = p[f] = v[f](_)), c.c()),
              R(c, 1),
              c.m(a, null));
      },
      i(_) {
        d || (R(e.$$.fragment, _), R(i.$$.fragment, _), R(c), (d = !0));
      },
      o(_) {
        H(e.$$.fragment, _), H(i.$$.fragment, _), H(c), (d = !1);
      },
      d(_) {
        le(e, _), _ && h(t), _ && h(l), le(i), p[f].d();
      },
    }
  );
}
function Es(s) {
  let e, t;
  return {
    c() {
      (e = E('div')), (t = $('Players failed to load!')), this.h();
    },
    l(l) {
      e = y(l, 'DIV', {class: !0});
      var r = g(e);
      (t = I(r, 'Players failed to load!')), r.forEach(h), this.h();
    },
    h() {
      b(e, 'class', 'svelte-8b44jz');
    },
    m(l, r) {
      S(l, e, r), u(e, t);
    },
    p: O,
    i: O,
    o: O,
    d(l) {
      l && h(e);
    },
  };
}
function ys(s) {
  let e, t;
  return {
    c() {
      (e = E('div')), (t = $('Loading Map...')), this.h();
    },
    l(l) {
      e = y(l, 'DIV', {class: !0});
      var r = g(e);
      (t = I(r, 'Loading Map...')), r.forEach(h), this.h();
    },
    h() {
      b(e, 'class', 'svelte-8b44jz');
    },
    m(l, r) {
      S(l, e, r), u(e, t);
    },
    p: O,
    i: O,
    o: O,
    d(l) {
      l && h(e);
    },
  };
}
function Ds(s) {
  let e,
    t,
    l = s[0].error + '',
    r;
  return {
    c() {
      (e = E('div')), (t = $('Error: ')), (r = $(l)), this.h();
    },
    l(i) {
      e = y(i, 'DIV', {class: !0});
      var n = g(e);
      (t = I(n, 'Error: ')), (r = I(n, l)), n.forEach(h), this.h();
    },
    h() {
      b(e, 'class', 'svelte-8b44jz');
    },
    m(i, n) {
      S(i, e, n), u(e, t), u(e, r);
    },
    p(i, n) {
      n & 1 && l !== (l = i[0].error + '') && W(r, l);
    },
    i: O,
    o: O,
    d(i) {
      i && h(e);
    },
  };
}
function Vs(s) {
  let e, t;
  return {
    c() {
      (e = E('div')), (t = $('Messages not loaded')), this.h();
    },
    l(l) {
      e = y(l, 'DIV', {class: !0});
      var r = g(e);
      (t = I(r, 'Messages not loaded')), r.forEach(h), this.h();
    },
    h() {
      b(e, 'class', 'svelte-8b44jz');
    },
    m(l, r) {
      S(l, e, r), u(e, t);
    },
    p: O,
    i: O,
    o: O,
    d(l) {
      l && h(e);
    },
  };
}
function Ms(s) {
  let e, t;
  return {
    c() {
      (e = pe('svg')), (t = pe('path')), this.h();
    },
    l(l) {
      e = me(l, 'svg', {xmlns: !0, class: !0, viewBox: !0, fill: !0});
      var r = g(e);
      (t = me(r, 'path', {d: !0, class: !0})), g(t).forEach(h), r.forEach(h), this.h();
    },
    h() {
      b(
        t,
        'd',
        'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z'
      ),
        b(t, 'class', 'svelte-8b44jz'),
        b(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        b(e, 'class', 'h-5 w-5 svelte-8b44jz'),
        b(e, 'viewBox', '0 0 20 20'),
        b(e, 'fill', 'currentColor');
    },
    m(l, r) {
      S(l, e, r), u(e, t);
    },
    d(l) {
      l && h(e);
    },
  };
}
function Ss(s) {
  let e, t, l, r;
  return {
    c() {
      (e = E('button')), (t = $('Click here to join the game!')), this.h();
    },
    l(i) {
      e = y(i, 'BUTTON', {class: !0, type: !0});
      var n = g(e);
      (t = I(n, 'Click here to join the game!')), n.forEach(h), this.h();
    },
    h() {
      b(
        e,
        'class',
        'flex-shrink-0 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 text-xl border-4 text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed svelte-8b44jz'
      ),
        b(e, 'type', 'button');
    },
    m(i, n) {
      S(i, e, n), u(e, t), l || ((r = oe(e, 'click', s[6])), (l = !0));
    },
    p: O,
    i: O,
    o: O,
    d(i) {
      i && h(e), (l = !1), r();
    },
  };
}
function Ps(s) {
  let e, t;
  return (
    (e = new as({props: {players: s[0].data, currentPlayer: s[0].data.find(s[5])}})),
    {
      c() {
        x(e.$$.fragment);
      },
      l(l) {
        ee(e.$$.fragment, l);
      },
      m(l, r) {
        te(e, l, r), (t = !0);
      },
      p(l, r) {
        const i = {};
        r & 1 && (i.players = l[0].data), r & 3 && (i.currentPlayer = l[0].data.find(l[5])), e.$set(i);
      },
      i(l) {
        t || (R(e.$$.fragment, l), (t = !0));
      },
      o(l) {
        H(e.$$.fragment, l), (t = !1);
      },
      d(l) {
        le(e, l);
      },
    }
  );
}
function Cs(s) {
  let e, t, l, r;
  const i = [Vs, Ds, ys, Es, Is],
    n = [];
  function a(o, f) {
    return o[0].step ? (o[0].error ? 1 : o[0].step === 'LOADING' ? 2 : o[0].data ? 4 : 3) : 0;
  }
  return (
    (e = a(s)),
    (t = n[e] = i[e](s)),
    {
      c() {
        t.c(), (l = re());
      },
      l(o) {
        t.l(o), (l = re());
      },
      m(o, f) {
        n[e].m(o, f), S(o, l, f), (r = !0);
      },
      p(o, f) {
        let c = e;
        (e = a(o)),
          e === c
            ? n[e].p(o, f)
            : (fe(),
              H(n[c], 1, 1, () => {
                n[c] = null;
              }),
              ue(),
              (t = n[e]),
              t ? t.p(o, f) : ((t = n[e] = i[e](o)), t.c()),
              R(t, 1),
              t.m(l.parentNode, l));
      },
      i(o) {
        r || (R(t), (r = !0));
      },
      o(o) {
        H(t), (r = !1);
      },
      d(o) {
        n[e].d(o), o && h(l);
      },
    }
  );
}
function Ts(s) {
  let e, t, l, r, i;
  return (
    (r = new or({props: {$$slots: {default: [Cs]}, $$scope: {ctx: s}}})),
    {
      c() {
        (e = pe('symbol')), (t = pe('path')), (l = N()), x(r.$$.fragment), this.h();
      },
      l(n) {
        e = me(n, 'symbol', {id: !0, viewBox: !0, class: !0});
        var a = g(e);
        (t = me(a, 'path', {d: !0, class: !0})),
          g(t).forEach(h),
          a.forEach(h),
          (l = Y(n)),
          ee(r.$$.fragment, n),
          this.h();
      },
      h() {
        b(
          t,
          'd',
          'M12 4c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4zM24.719 16c0 0 0 0 0 0 0-1.812 1.469-3.281 3.281-3.281s3.281 1.469 3.281 3.281c0 0 0 0 0 0 0 1.812-1.469 3.281-3.281 3.281s-3.281-1.469-3.281-3.281zM21.513 24.485c0-1.641 1.331-2.972 2.972-2.972s2.972 1.331 2.972 2.972c0 1.641-1.331 2.972-2.972 2.972s-2.972-1.331-2.972-2.972zM13.308 28c0-1.487 1.205-2.692 2.692-2.692s2.692 1.205 2.692 2.692c0 1.487-1.205 2.692-2.692 2.692s-2.692-1.205-2.692-2.692zM5.077 24.485c0-1.346 1.092-2.438 2.438-2.438s2.438 1.092 2.438 2.438c0 1.346-1.092 2.438-2.438 2.438s-2.438-1.092-2.438-2.438zM1.792 16c0-1.22 0.989-2.208 2.208-2.208s2.208 0.989 2.208 2.208c0 1.22-0.989 2.208-2.208 2.208s-2.208-0.989-2.208-2.208zM5.515 7.515c0 0 0 0 0 0 0-1.105 0.895-2 2-2s2 0.895 2 2c0 0 0 0 0 0 0 1.105-0.895 2-2 2s-2-0.895-2-2zM28.108 7.515c0 2.001-1.622 3.623-3.623 3.623s-3.623-1.622-3.623-3.623c0-2.001 1.622-3.623 3.623-3.623s3.623 1.622 3.623 3.623z'
        ),
          b(t, 'class', 'svelte-8b44jz'),
          b(e, 'id', 'icon-spinner6'),
          b(e, 'viewBox', '0 0 32 32'),
          b(e, 'class', 'svelte-8b44jz');
      },
      m(n, a) {
        S(n, e, a), u(e, t), S(n, l, a), te(r, n, a), (i = !0);
      },
      p(n, [a]) {
        const o = {};
        a & 131 && (o.$$scope = {dirty: a, ctx: n}), r.$set(o);
      },
      i(n) {
        i || (R(r.$$.fragment, n), (i = !0));
      },
      o(n) {
        H(r.$$.fragment, n), (i = !1);
      },
      d(n) {
        n && h(e), n && h(l), le(r, n);
      },
    }
  );
}
function Bs(s, e, t) {
  let l, r;
  Ie(s, vr, (c) => t(0, (l = c))), Ie(s, Be, (c) => t(1, (r = c)));
  async function i() {
    await be.execute((c) => c.UnionQuest.move(0, 0));
  }
  return [
    l,
    r,
    i,
    (c) => c.id === r.address.toLowerCase(),
    (c) => (r.address ? c.id === r.address.toLowerCase() : !1),
    (c) => (r.address ? c.id === r.address.toLowerCase() : !1),
    () => i(),
  ];
}
class js extends ge {
  constructor(e) {
    super();
    we(this, e, Bs, Ts, $e, {});
  }
}
export {js as default};
//# sourceMappingURL=map.svelte-c5a09c13.js.map
