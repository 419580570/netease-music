import { defineComponent as B, computed as C, openBlock as m, createElementBlock as b, normalizeClass as k, normalizeStyle as D, toRefs as V, ref as x, onMounted as S, watch as H, nextTick as G, onBeforeUnmount as J, Fragment as P, renderSlot as F, withDirectives as Q, withModifiers as R, vShow as Z, createCommentVNode as z, renderList as X, toDisplayString as A, createElementVNode as y, createBlock as K, Teleport as ee, h as d, Transition as te, withCtx as Y, isVNode as ne, createVNode as N, render as T, resolveComponent as I, unref as oe, reactive as le } from "vue";
const M = Symbol("INSTALLED_KEY"), ae = (e = []) => ({
  install: (o) => {
    o[M] || (o[M] = !0, e.forEach((t) => o.use(t)));
  }
}), se = {
  size: {
    type: Number
  },
  color: {
    type: String
  },
  type: {
    type: String
  }
}, ie = B({
  name: "Icon",
  props: se,
  setup(e) {
    return {
      style: C(() => {
        const { size: o, color: t } = e;
        return !o && !t ? {} : {
          fontSize: o ? o + "px" : void 0,
          color: t
        };
      })
    };
  }
}), E = (e, n) => {
  const o = e.__vccOpts || e;
  for (const [t, c] of n)
    o[t] = c;
  return o;
};
function ue(e, n, o, t, c, i) {
  return m(), b("i", {
    class: k(["n-icon", e.type]),
    style: D(e.style)
  }, null, 6);
}
const re = /* @__PURE__ */ E(ie, [["render", ue]]), $ = (e) => (e.install = function(n) {
  n.component(e.name, e);
}, e), ce = (e, n) => (e.install = (o) => {
  e._context = o._context, o.config.globalProperties[n] = e;
}, e), L = $(re), de = {
  trigger: {
    type: String,
    validator(e) {
      return ["click", "mouseover"].includes(e);
    },
    default: () => "click"
  },
  keepShow: {
    type: Boolean,
    default: !1
  },
  disable: {
    type: Boolean,
    default: !1
  },
  width: {
    type: String,
    default: "100%"
  },
  height: {
    type: String,
    default: "100%"
  }
}, fe = B({
  name: "Popover",
  props: de,
  setup(e) {
    const {
      width: n,
      height: o,
      keepShow: t,
      trigger: c,
      disable: i
    } = V(e), a = x(null), l = x(null), s = c.value, u = x(!1), r = x("0px"), f = (h) => {
      p.contains(h.target) || (u.value = !1);
    }, _ = () => {
      (!t.value || !u.value) && (u.value = !u.value), u.value ? document.addEventListener(s, f) : document.removeEventListener(s, f);
    };
    let p;
    return S(() => {
      if (!i.value)
        try {
          p = l.value.parentElement, r.value = `-${(Number(n.value.slice(0, -2)) || 0) / 2 - p.offsetWidth / 2}px`, p.addEventListener(s, _);
        } catch {
          console.warn("popover\u4F7F\u7528\u65B9\u5F0F\u9519\u8BEF");
        }
    }), H(i, (h) => {
      if (console.log(h), !h)
        try {
          G(() => {
            p = l.value.parentElement, r.value = `-${(Number(n.value.slice(0, -2)) || 0) / 2 - p.offsetWidth / 2}px`, p.addEventListener(s, _);
          });
        } catch {
          console.warn("popover\u4F7F\u7528\u65B9\u5F0F\u9519\u8BEF");
        }
    }), J(() => {
      i.value || p.removeEventListener(s, _);
    }), {
      wrapperWidth: n,
      wrapperHeight: o,
      reference: a,
      defaults: l,
      showPopover: u,
      move: r
    };
  }
});
function ve(e, n, o, t, c, i) {
  return m(), b(P, null, [
    F(e.$slots, "reference"),
    e.disable ? z("", !0) : Q((m(), b("div", {
      key: 0,
      ref: "defaults",
      class: k(["n-popover", e.$attrs.class]),
      onClick: n[0] || (n[0] = R(() => {
      }, ["stop"])),
      onMouseover: n[1] || (n[1] = R(() => {
      }, ["stop"])),
      style: D({
        width: e.wrapperWidth,
        height: e.wrapperHeight,
        left: e.move,
        ...e.$attrs.style
      })
    }, [
      F(e.$slots, "default")
    ], 38)), [
      [Z, e.showPopover]
    ])
  ], 64);
}
const q = /* @__PURE__ */ E(fe, [["render", ve]]), pe = $(q), he = ["onClick"], me = B({
  name: "Navbar"
}), _e = /* @__PURE__ */ B({
  ...me,
  props: {
    list: null,
    size: null,
    enlargeActive: null
  },
  emits: ["NavbarClick"],
  setup(e, { emit: n }) {
    const t = x(e.list[0]), c = (i, a) => {
      t.value = i, n("NavbarClick", a);
    };
    return (i, a) => (m(), b("ul", {
      class: "n-navbar",
      style: D({ fontSize: e.size + "px" })
    }, [
      (m(!0), b(P, null, X(e.list, (l, s) => (m(), b("li", {
        key: s,
        class: k({
          currentRoute: t.value === l,
          enlargeActive: e.enlargeActive
        }),
        onClick: (u) => c(l, s)
      }, A(l), 11, he))), 128))
    ], 4));
  }
}), ge = $(_e), ye = {
  name: "Button",
  props: {
    disabled: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: "14px"
    },
    theme: {
      type: String,
      default: "default"
    }
  },
  setup(e, { emit: n }) {
    return {
      handleClick: () => {
        !e.disabled && n("handleClick");
      }
    };
  }
}, be = { class: "n-button__content" };
function xe(e, n, o, t, c, i) {
  return m(), b("span", {
    class: k(["n-button", { disabled: o.disabled, "red-theme": o.theme === "ofRed" }]),
    style: D({ fontSize: o.size }),
    onClick: n[0] || (n[0] = (...a) => t.handleClick && t.handleClick(...a))
  }, [
    y("span", be, [
      F(e.$slots, "default")
    ])
  ], 6);
}
const $e = /* @__PURE__ */ E(ye, [["render", xe]]), Ce = $($e), ke = {
  key: 0,
  class: "n-dialog"
}, we = /* @__PURE__ */ y("span", { style: { "--r": "-45deg" } }, null, -1), Ne = /* @__PURE__ */ y("span", { style: { "--r": "45deg" } }, null, -1), Ee = [
  we,
  Ne
], Be = {
  name: "Dialog"
}, De = /* @__PURE__ */ B({
  ...Be,
  props: {
    width: { default: "500px" },
    height: { default: "250px" },
    show: { type: Boolean, default: !1 }
  },
  emits: ["update:show"],
  setup(e, { emit: n }) {
    const o = e, t = x(null), c = () => {
      n("update:show", !1);
    }, i = (a) => {
      const l = a.clientX, s = a.clientY, u = Number(t.value.style.left.slice(0, -2)), r = Number(t.value.style.top.slice(0, -2));
      document.onmousemove = (f) => {
        let _, p;
        f.clientX <= a.offsetX ? _ = a.offsetX - l : document.body.clientWidth - f.clientX <= Number(o.width.slice(0, -2)) - a.offsetX ? _ = document.body.clientWidth - Number(o.width.slice(0, -2)) + a.offsetX - l : _ = f.clientX - l, f.clientY <= a.offsetY + 60 ? p = a.offsetY + 60 - s : document.body.clientHeight - f.clientY <= Number(o.height.slice(0, -2)) - a.offsetY ? p = document.body.clientHeight - Number(o.height.slice(0, -2)) + a.offsetY - s : p = f.clientY - s, t.value.style.left = `${u + _}px`, t.value.style.top = `${r + p}px`;
      }, document.onmouseup = () => {
        document.onmousemove = null, document.onmouseup = null;
      };
    };
    return (a, l) => (m(), K(ee, { to: "body" }, [
      o.show ? (m(), b("div", ke, [
        y("div", {
          class: "n-dialog-content",
          style: D({
            width: o.width,
            height: o.height
          }),
          ref_key: "dialog",
          ref: t
        }, [
          y("span", {
            onClick: c,
            class: "closeButton",
            title: "\u5173\u95ED\u7A97\u4F53"
          }, Ee),
          F(a.$slots, "default"),
          y("div", {
            class: "move",
            onMousedown: i
          }, null, 32)
        ], 4)
      ])) : z("", !0)
    ]));
  }
}), Fe = $(De), Ie = {
  data: {
    type: Array,
    require: !0
  },
  height: {
    type: String,
    default: "200px"
  }
}, Le = {
  name: "Droppdown",
  props: Ie,
  setup(e, { slots: n, emit: o }) {
    if (!n.default || !n.dropDownItem)
      return console.warn("\u672A\u4F20\u5165default\u6216dropDownItem\u63D2\u69FD"), () => null;
    const t = x(null), c = (i) => {
      t.value.showPopover = !1, o("dropdownClick", i);
    };
    return () => d(
      q,
      {
        height: e.height,
        class: "n-dropdown",
        ref: t
      },
      {
        reference: () => n.default(),
        default: () => d(
          "ul",
          { class: "dropdown-wrapper" },
          e.data && e.data.map(
            (i) => d(
              "li",
              {
                class: "dropdown-item",
                onClick: () => c(i)
              },
              n.dropDownItem(i)
            )
          )
        )
      }
    );
  }
}, Se = $(Le), Pe = (e) => typeof Element > "u" ? !1 : e instanceof Element;
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const ze = (e) => typeof e == "string", Ae = {
  duration: { type: Number, default: 2e3 },
  position: { type: String, default: "center" },
  size: { type: Number, default: 16 },
  offsetX: { type: Number },
  offsetY: { type: Number },
  appendTo: { type: String },
  style: { type: Object, default: {} }
}, Te = {
  name: "Notify",
  props: Ae,
  setup(e) {
    const n = x(!0), o = x();
    function t() {
      var s;
      (s = o.value) != null || clearTimeout(o.value), e.duration > 0 && (o.value = setTimeout(() => {
        n.value && c();
      }, e.duration));
    }
    function c() {
      n.value = !1;
    }
    const i = C(
      () => e.position.endsWith("right") ? "right" : "left"
    ), a = C(
      () => e.position.startsWith("top") ? "top" : "bottom"
    ), l = C(() => {
      let s = {};
      if (e.appendTo && (s = {
        top: `${e.offsetY}px`,
        left: `${e.offsetX}px`
      }), e.position.indexOf("-") === -1)
        switch (e.position) {
          case "center":
            s = {
              top: `calc(50% + ${e.offsetY}px)`,
              left: `calc(50% + ${e.offsetX}px)`,
              transform: "translateX(-50%) translateY(-50%)"
            };
            break;
          case "top":
          case "bottom":
            s = {
              [e.position]: `${e.offsetY}px`,
              left: `calc(50% + ${e.offsetX}px)`,
              transform: "translateX(-50%)"
            };
            break;
          case "left":
          case "right":
            s = {
              [e.position]: `${e.offsetX}px`,
              top: `calc(50% + ${e.offsetY}px)`,
              transform: "translateY(-50%)"
            };
            break;
          default:
            s = {};
        }
      else
        s = {
          [a.value]: `${e.offsetY}px`,
          [i.value]: `${e.offsetX}px`
        };
      return { ...s, fontSize: e.size + "px", ...e.style };
    });
    return S(() => {
      t();
    }), {
      visible: n,
      close: c,
      positionStyle: l
    };
  }
};
function Ye(e, n, o, t, c, i) {
  return m(), K(te, {
    onAfterLeave: n[0] || (n[0] = (a) => e.$emit("destroy"))
  }, {
    default: Y(() => [
      t.visible ? (m(), b("div", {
        key: 0,
        class: "n-notify",
        style: D(t.positionStyle)
      }, [
        F(e.$slots, "default", {}, void 0, !0)
      ], 4)) : z("", !0)
    ]),
    _: 3
  });
}
const Xe = /* @__PURE__ */ E(Te, [["render", Ye], ["__scopeId", "data-v-e65b6506"]]), O = {
  top: [],
  left: [],
  right: [],
  bottom: [],
  center: [],
  "top-left": [],
  "top-right": [],
  "bottom-left": [],
  "bottom-right": []
}, j = function(e = {}, n = null) {
  (typeof e == "string" || ne(e)) && (e = { message: e });
  const o = e.position || "center";
  let t = e.offsetX || 0, c = e.offsetY || 0;
  O[o].forEach(({ vm: u }) => {
    u.props.onDestroy();
  });
  const i = {
    ...e,
    position: o,
    offsetY: c,
    offsetX: t
  };
  let a = document.body;
  Pe(e.appendTo) ? a = e.appendTo : ze(e.appendTo) && (a = document.querySelector(e.appendTo));
  const l = document.createElement("div"), s = N(
    Xe,
    i,
    i.message ? {
      default: () => i.message
    } : null
  );
  return s.appContext = n != null ? n : j._context, s.props.onDestroy = () => {
    T(null, l);
  }, O[o].push({ vm: s }), T(s, l), a.appendChild(l.firstElementChild), {
    close: () => {
      T(null, l);
    }
  };
};
j._context = null;
const je = ce(j, "$notify"), We = {
  name: "Loading",
  props: { isLoading: { type: Boolean, default: !1 } },
  inheritAttrs: !1,
  setup(e, { slots: n }) {
    return n.default ? () => e.isLoading ? d("div", { class: "n-loading" }, [
      d(
        "svg",
        { width: "20", height: "20" },
        [0, 1, 2, 3, 4, 5, 6, 7].map(
          (o, t) => d("line", {
            class: "loadingLine",
            key: t,
            x1: "10",
            y1: "1",
            x2: "10",
            y2: "6",
            rx: "2",
            ry: "2",
            "stroke-width": "2px",
            style: `--i: ${o}`
          })
        )
      ),
      d("div", null, "\u52A0\u8F7D\u4E2D")
    ]) : n.default() : () => null;
  }
}, Re = $(We), Me = {
  carouselData: Array,
  interval: {
    type: Number,
    default: 5e3
  }
}, Oe = {
  name: "List",
  props: {
    data: Array,
    minWidth: {
      type: Number,
      default: 200
    },
    gaph: {
      type: Number,
      default: 18
    },
    gapv: {
      type: Number,
      default: 30
    },
    fixed: {
      type: Number,
      validator(e) {
        return e >= 0;
      },
      default: 0
    },
    maxLine: {
      type: Number,
      default: 0
    },
    fall: {
      type: String,
      default: ""
    }
  },
  setup(e, { slots: n }) {
    if (!e.data || !e.data.length || !n.listItem)
      return () => null;
    const o = x(null), t = x(e.fixed), c = () => {
      var a;
      t.value = Math.floor(
        (((a = o.value) == null ? void 0 : a.clientWidth) + e.gaph) / (e.minWidth + e.gaph)
      );
    };
    S(() => {
      if (e.fixed)
        return;
      c();
      let a = document.body.offsetWidth;
      window.onresize = (l) => {
        document.body.offsetWidth !== a && (a = document.body.offsetWidth, c());
      };
    });
    const i = C(() => {
      const a = [];
      if (!t.value)
        return [];
      const l = e.data;
      for (var s = 0; s < l.length && !(e.maxLine && s >= e.maxLine * t.value); s += t.value) {
        const u = l.slice(s, s + t.value);
        let r;
        if (r = t.value - u.length)
          for (let f = 0; f < r; f++)
            u.push({ hide: !0 });
        a.push(u);
      }
      return a;
    });
    return () => d(
      "div",
      { class: "n-list", ref: o },
      i.value.map(
        (a) => d(
          "div",
          { class: "n-list-line", style: { "--gapv": `${e.gapv}px` } },
          a.map(
            (l) => d(
              "div",
              {
                class: "n-list-item",
                style: {
                  "--gaph": `${e.gaph}px`,
                  visibility: l.hide ? "hidden" : "visible"
                }
              },
              [
                n.listItem && d(
                  "div",
                  {
                    class: `n-list-item__content${l.copywriter ? " fall" : ""}`,
                    "data-fall": l.copywriter
                  },
                  n.listItem(l)
                ),
                n.title && d(
                  "div",
                  { class: "n-list-item__title" },
                  n.title(l)
                ),
                n.other && d(
                  "div",
                  { class: "n-list-item__other" },
                  n.other(l)
                )
              ]
            )
          )
        )
      )
    );
  }
}, He = $(Oe), Ke = {
  name: "Table",
  emits: ["dbclick"],
  props: {
    data: Array,
    format: Array,
    lineIndex: {
      type: Boolean,
      default: () => !1
    },
    showTitle: {
      type: Boolean,
      default: () => !1
    },
    currentPlay: {
      type: Number,
      default: 0
    }
  },
  setup(e, { slots: n, emit: o }) {
    if (!e.data || !n)
      return () => null;
    const t = x(0), c = (s) => {
      t.value = s;
    }, i = (s) => {
      o("dbclick", s);
    }, a = (s, u) => {
      if (!s)
        return;
      const r = {};
      return s.forEach((f) => {
        r[f] = u[f];
      }), r;
    }, l = (s) => {
      if (e.currentPlay === s.id)
        return d(L, { type: "laba", size: 15 });
      const u = s.index + 1;
      return u < 10 ? `0${u}` : `${u}`;
    };
    return () => {
      var s, u;
      return d("div", { class: "n-table" }, [
        e.showTitle && d("div", { class: "n-table-head" }, [
          e.lineIndex && d("span", { class: "index" }),
          ...(s = e.format) == null ? void 0 : s.map(
            (r) => d(
              "span",
              {
                class: "n-table-head__item",
                style: { width: r.width }
              },
              r.title
            )
          )
        ]),
        d(
          "div",
          { class: "n-table-content" },
          (u = e.data) == null ? void 0 : u.map(
            (r, f) => {
              var _;
              return d(
                "div",
                {
                  class: `n-table-content__line${r.id === t.value ? " active" : ""}${e.currentPlay === r.id ? " playing" : ""}`,
                  onClick: () => c(r.id),
                  onDblclick: () => i(r),
                  key: f
                },
                [
                  e.lineIndex && d("span", { class: "index" }, l(r)),
                  ...(_ = e.format) == null ? void 0 : _.map(
                    (p) => d(
                      "div",
                      {
                        class: "n-table-content__line__item",
                        style: { width: p.width }
                      },
                      n[p.slotName] && n[p.slotName](
                        a(p.key, r)
                      )
                    )
                  )
                ]
              );
            }
          )
        )
      ]);
    };
  }
}, qe = $(Ke), Ue = {
  name: "Checkbox",
  props: {
    label: String,
    modelValue: {
      type: Boolean,
      default: !1
    }
  },
  setup(e, { emit: n }) {
    return {
      handleChange: (t) => {
        n("update:modelValue", t.target.checked);
      }
    };
  }
}, Ve = { class: "n-checkbox" }, Ge = { class: "n-checkbox__input" }, Je = ["checked"], Qe = { class: "n-checkbox__label" };
function Ze(e, n, o, t, c, i) {
  return m(), b("div", Ve, [
    y("label", null, [
      y("span", Ge, [
        y("input", {
          class: "n-checkbox__original",
          onChange: n[0] || (n[0] = (...a) => t.handleChange && t.handleChange(...a)),
          type: "checkbox",
          checked: o.modelValue
        }, null, 40, Je),
        y("span", {
          class: k(["n-checkbox__inner", { "is-checked": o.modelValue }])
        }, null, 2)
      ]),
      y("span", Qe, A(o.label), 1)
    ])
  ]);
}
const et = /* @__PURE__ */ E(Ue, [["render", Ze]]), tt = $(et), nt = {
  name: "Radio"
};
function ot(e, n, o, t, c, i) {
  return m(), b("div", null, "Radio");
}
const lt = /* @__PURE__ */ E(nt, [["render", ot]]), at = $(lt), st = {
  name: "Pagination",
  props: {
    total: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 0
    }
  },
  emits: ["handlePagination"],
  setup(e, { emit: n }) {
    const o = x(0), t = () => n("handlePagination", o.value), c = (u) => {
      o.value = u, t();
    }, i = () => {
      o.value > 0 && o.value--, t();
    }, a = () => {
      o.value < l.value - 1 && o.value++, t();
    }, l = C(() => Math.ceil(e.total / e.max));
    return {
      paginationList: C(() => {
        let u = [];
        if (l.value <= 10)
          for (let r = 0; r < l.value; r++)
            u.push(r);
        else {
          if (u[0] = 0, o.value < 5) {
            for (let r = 1; r < 8; r++)
              u.push(r);
            u.push("...");
          } else if (o.value > l.value - 5) {
            u.push("...");
            for (let r = l.value - 8; r < l.value - 1; r++)
              u.push(r);
          } else {
            u.push("...");
            for (let r = o.value - 3; r <= o.value + 3; r++)
              u.push(r);
            u.push("...");
          }
          u.push(l.value - 1);
        }
        return u;
      }),
      active: o,
      pageNum: l,
      handleClick: c,
      handlePrev: i,
      handleNext: a
    };
  }
}, it = {
  key: 0,
  class: "n-pagination"
}, ut = ["onClick"];
function rt(e, n, o, t, c, i) {
  const a = I("Icon");
  return o.max && o.total > o.max ? (m(), b("div", it, [
    y("div", {
      class: k(["n-pagination__item prev", { disabled: t.active === 0 }]),
      onClick: n[0] || (n[0] = (...l) => t.handlePrev && t.handlePrev(...l))
    }, [
      N(a, {
        type: "forward",
        size: 12
      })
    ], 2),
    (m(!0), b(P, null, X(t.paginationList, (l) => (m(), b("div", {
      class: k(["n-pagination__item", { active: t.active === l, ellipsis: l === "..." }]),
      onClick: (s) => t.handleClick(l)
    }, A(l === "..." ? l : l + 1), 11, ut))), 256)),
    y("div", {
      class: k(["n-pagination__item next", { disabled: t.active === t.pageNum - 1 }]),
      onClick: n[1] || (n[1] = (...l) => t.handleNext && t.handleNext(...l))
    }, [
      N(a, {
        type: "prev",
        size: 12
      })
    ], 2)
  ])) : z("", !0);
}
const ct = /* @__PURE__ */ E(st, [["render", rt]]), dt = $(ct), ft = {
  \u4EB2: "362",
  \u4EB2\u4EB2: "363",
  \u4FBF\u4FBF: "89",
  \u5154\u5B50: "459",
  \u516C\u9E21: "461",
  \u53D1\u6012: "115",
  \u53E3\u7F69: "351",
  \u53EF\u7231: "85",
  \u5410\u820C: "348",
  \u5446: "352",
  \u5472\u7259: "343",
  \u54C0\u4F24: "342",
  \u5634\u5507: "367",
  \u5927\u54ED: "357",
  \u5927\u7B11: "86",
  \u5978\u7B11: "341",
  \u5C0F\u9E21: "450",
  \u5E7D\u7075: "116",
  \u5F00\u5FC3: "360",
  \u5F31: "372",
  \u5F3A: "13",
  \u5FC3\u788E: "34",
  \u6012: "361",
  \u60CA\u6050: "96",
  \u60F6\u6050: "354",
  \u61A8\u7B11: "359",
  \u62DC: "14",
  \u6487\u5634: "353",
  \u661F\u661F: "309",
  \u6655: "355",
  \u6C57: "97",
  \u6D41\u611F: "358",
  \u6D41\u6CEA: "356",
  \u7231\u5FC3: "33",
  \u7231\u610F: "106",
  \u7275\u624B: "379",
  \u72D7: "81",
  \u732A: "100",
  \u732B: "78",
  \u751F\u6C14: "314",
  \u751F\u75C5: "350",
  \u75DB\u82E6: "346",
  \u76B1\u7709: "87",
  \u793A\u7231: "376",
  \u7981\u6B62: "374",
  \u8272: "95",
  \u8DF3\u821E: "380",
  \u8FD9\u8FB9: "262",
  \u949F\u60C5: "303",
  \u9B3C\u8138: "94",
  \u5723\u8BDE: "411",
  \u5916\u661F: "101",
  \u94BB\u77F3: "52",
  \u793C\u7269: "107",
  \u7537\u5B69: "0",
  \u5973\u5B69: "1",
  \u86CB\u7CD5: "337",
  18: "186",
  \u5708: "312",
  \u53C9: "313"
}, vt = { class: "emojiList" }, pt = { class: "emojiItem" }, ht = ["src", "onClick", "title"], mt = /* @__PURE__ */ B({
  __name: "emoji",
  emits: ["handleChoose"],
  setup(e, { emit: n }) {
    const o = (t) => {
      n("handleChoose", t);
    };
    return (t, c) => (m(), b("div", vt, [
      (m(!0), b(P, null, X(oe(ft), (i, a) => (m(), b("div", pt, [
        y("img", {
          class: "emoji",
          src: `http://s1.music.126.net/style/web2/emt/emoji_${i}.png`,
          onClick: (l) => o(a),
          title: a
        }, null, 8, ht)
      ]))), 256))
    ]));
  }
});
const _t = {
  name: "Textarea",
  props: {
    maxLength: {
      type: Number,
      default: () => 140
    }
  },
  emits: ["handleInput"],
  components: { EmojiList: mt },
  setup(e, { emit: n }) {
    const o = x(0), t = x(null), c = (r) => {
      if (n("handleInput", r.target.value), !r.target.value) {
        o.value = 0;
        return;
      }
      o.value = Number(r.target.value.length);
    }, i = C(() => e.maxLength - o.value), a = () => {
      !t.value || u(t.value, "#\u8F93\u5165\u60F3\u8BF4\u7684\u8BDD\u9898#", 8, 1);
    }, l = () => {
      !t.value || u(t.value, "@");
    }, s = (r) => {
      !t.value || u(t.value, `[${r}]`);
    }, u = (r, f, _ = 0, p = 0) => {
      const h = r;
      let w = 0, v = 0;
      if (h.selectionStart && h.selectionEnd) {
        w = h.selectionStart, v = h.selectionEnd;
        var g = h.value.substring(0, w), U = h.value.substring(v);
        h.value = g + f + U;
        var W = f.length;
        w += W, v += W;
      } else
        h.value += f, w = v = f.length, h.setSelectionRange(f.length, f.length);
      return h.focus(), h.setSelectionRange && h.setSelectionRange(w - _, v - p), n("handleInput", h.value), !0;
    };
    return {
      surplusLength: i,
      textarea: t,
      handleInput: c,
      addEite: l,
      addPound: a,
      addEmoji: s
    };
  }
}, gt = { class: "n-textarea" }, yt = { class: "special-word" };
function bt(e, n, o, t, c, i) {
  const a = I("Icon"), l = I("EmojiList"), s = I("Popover");
  return m(), b("div", gt, [
    y("textarea", {
      spellcheck: "false",
      placeholder: "\u5FEB\u6765\u8BF4\u70B9\u4EC0\u4E48\u5427",
      onInput: n[0] || (n[0] = (...u) => t.handleInput && t.handleInput(...u)),
      ref: "textarea"
    }, null, 544),
    y("div", {
      class: k(["bottom", { overstep: t.surplusLength < 0 }])
    }, A(t.surplusLength), 3),
    y("div", yt, [
      N(a, {
        type: "jinhao",
        size: 19,
        onClick: n[1] || (n[1] = (u) => t.addPound())
      }),
      N(a, {
        type: "aite",
        size: 19,
        onClick: n[2] || (n[2] = (u) => t.addEite())
      }),
      y("span", null, [
        N(s, {
          width: "370px",
          style: { left: "70px", borderRadius: "5px" }
        }, {
          reference: Y(() => [
            N(a, {
              type: "xiaolian",
              size: 16
            })
          ]),
          default: Y(() => [
            N(l, { onHandleChoose: t.addEmoji }, null, 8, ["onHandleChoose"])
          ]),
          _: 1
        })
      ])
    ])
  ]);
}
const xt = /* @__PURE__ */ E(_t, [["render", bt]]), $t = $(xt), Ct = B({
  name: "Carousel",
  props: Me,
  setup(e, { slots: n }) {
    if (!e.carouselData || !e.carouselData.length)
      return null;
    const o = e.carouselData, t = x(0), c = o.length - 1, i = new Array(c + 1).fill(void 0).map(() => ({ item: void 0, prev: void 0, next: void 0 }));
    o.forEach((v, g) => {
      i[g].item = v, i[g].prev = g === 0 ? i[c] : i[g - 1], i[g].next = g === c ? i[0] : i[g + 1];
    });
    const a = C(() => [
      i[t.value].prev.prev.item,
      i[t.value].prev.item,
      i[t.value].item,
      i[t.value].next.item,
      i[t.value].next.next.item
    ]), l = le([0, 1, 2, 3, 4]), s = () => {
      for (let v = 0; v < 5; v++)
        l[v]++;
    }, u = () => {
      for (let v = 0; v < 5; v++)
        l[v]--;
    };
    H(
      () => t.value,
      (v, g) => {
        v == 0 && g == c ? s() : v == c && g == 0 || v < g ? u() : s();
      }
    );
    const r = () => {
      t.value > 0 ? t.value-- : t.value = c;
    }, f = () => {
      t.value < c ? t.value++ : t.value = 0;
    };
    let _;
    const p = () => {
      _ || (_ = setInterval(() => {
        f();
      }, e.interval));
    }, h = () => {
      _ && clearInterval(_), _ = null;
    }, w = (v) => {
      t.value = v;
    };
    return S(() => {
      p();
    }), () => d(
      "div",
      {
        class: "n-carousel",
        onMouseout: () => p(),
        onMouseover: () => h()
      },
      d("div", { class: "n-carousel-wrapper" }, [
        d(
          "div",
          { class: "prev-button", onClick: () => r() },
          d(L, { type: "forward", size: 12 })
        ),
        d(
          "div",
          { class: "next-button", onClick: () => f() },
          d(L, { type: "prev", size: 12 })
        ),
        d(
          "div",
          { class: "carousel-container" },
          n.carouselItem && a.value.map(
            (v, g) => d(
              "li",
              {
                class: `carousel-item${g === 2 ? " active" : ""}`,
                key: l[g]
              },
              n.carouselItem(v)
            )
          )
        ),
        d(
          "div",
          { class: "button-group" },
          o.map(
            (v, g) => d("div", {
              class: `button-group-item${g === t.value ? " active" : ""}`,
              onMouseover: () => w(g)
            })
          )
        )
      ])
    );
  }
}), kt = $(Ct), wt = [
  L,
  pe,
  ge,
  Ce,
  Fe,
  Se,
  je,
  Re,
  kt,
  He,
  qe,
  tt,
  at,
  dt,
  $t
], Et = ae(wt);
export {
  Ce as NButton,
  kt as NCarousel,
  tt as NCheckbox,
  Fe as NDialog,
  Se as NDropdown,
  L as NIcon,
  He as NList,
  Re as NLoading,
  je as NNotify,
  dt as NPagination,
  pe as NPopover,
  at as NRadio,
  qe as NTable,
  $t as NTextarea,
  ge as Nnavbar,
  Et as default
};
