var _a, _b;
import { resolveComponent, unref, withCtx, createVNode, useSSRContext, ref, reactive, onMounted, mergeProps, computed, watchEffect, resolveDirective, toDisplayString, createTextVNode, onUpdated, defineComponent, watch, withDirectives, onBeforeMount, onUnmounted, onBeforeUnmount, openBlock, createBlock, Fragment, renderList, createApp, h } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderClass, ssrRenderSlot, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderDynamicModel } from "vue/server-renderer";
import { usePage, Head, router, Link, useForm, createInertiaApp } from "@inertiajs/vue3";
import SimpleBar from "simplebar";
import Toastify from "toastify-js";
import feather from "feather-icons";
import { computePosition, flip, shift, offset, hide, autoUpdate } from "@floating-ui/dom";
import "@fortawesome/fontawesome-free/js/all.js";
import ResizeObserver from "resize-observer-polyfill";
import moment from "moment";
import Multiselect from "@vueform/multiselect";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import VueApexCharts from "vue3-apexcharts";
import "mosha-vue-toastify";
import draggable from "vuedraggable";
import { defineStore, createPinia } from "pinia";
import axios$1 from "axios";
import VueLazyLoad from "vue3-lazyload";
const _sfc_main$2F = {
  __name: "PageHeader",
  __ssrInlineRender: true,
  props: ["title", "buttons", "segments"],
  setup(__props) {
    const props = __props;
    const pageHeader = usePage().props.pageHeader ?? {};
    const title = props.title ?? pageHeader.title ?? "";
    const buttons = props.buttons ?? pageHeader.buttons ?? [];
    const segments = props.segments ?? pageHeader.segments ?? [];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: unref(title) }, null, _parent));
      _push(`<div class="flex flex-col justify-between mb-4 gap-y-1 sm:flex-row sm:gap-y-0"><ol class="breadcrumb">`);
      if (unref(segments).length) {
        _push(`<!--[-->`);
        ssrRenderList(unref(segments), (segment) => {
          _push(`<li class="capitalize breadcrumb-item">${ssrInterpolate(segment)}</li>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</ol>`);
      if (unref(segments).length) {
        _push(`<div class="text-right"><!--[-->`);
        ssrRenderList(unref(buttons), (button) => {
          _push(`<!--[-->`);
          if (button.url != "#") {
            _push(ssrRenderComponent(_component_Link, {
              href: button.url || "#",
              class: "mx-2 btn btn-sm btn-primary"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div${_scopeId}>${button.name}</div>`);
                } else {
                  return [
                    createVNode("div", {
                      innerHTML: button.name
                    }, null, 8, ["innerHTML"])
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<button data-toggle="drawer"${ssrRenderAttr("data-target", button.target)} class="mx-2 text-center btn btn-sm btn-primary"><div>${button.name}</div></button>`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup$2F = _sfc_main$2F.setup;
_sfc_main$2F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Admin/PageHeader.vue");
  return _sfc_setup$2F ? _sfc_setup$2F(props, ctx) : void 0;
};
const file = ref(null);
if (!file.value) {
  const data = (_a = document.querySelector('meta[name="app-translations"]')) == null ? void 0 : _a.content;
  file.value = JSON.parse(data ?? "{}");
}
function trans(key) {
  if (file.value.hasOwnProperty(key)) {
    return file.value[key];
  }
  return key;
}
const toast = reactive({
  position: "position-top-right",
  items: [],
  set({ type, message }, position) {
    if (!this.position) {
      this.position = "position-top-right";
    }
    if (position) {
      this.position = position;
    }
    this.items.unshift({
      key: Symbol(),
      type,
      message
    });
  },
  setSessionToast(toast2) {
    if (toast2 && Object.keys(toast2).length > 0) {
      for (const [key, value] of Object.entries({ ...toast2 })) {
        if (Array.isArray(value)) {
          value.forEach((msg) => setTimeout(() => this.set({ type: key, message: msg })), 0);
        } else {
          setTimeout(() => this.set({ type: key, message: value }), 0);
        }
      }
    }
  },
  success(message, position) {
    this.set({ type: "success", message }, position);
  },
  danger(message, position) {
    this.set({ type: "danger", message }, position);
  },
  warning(message, position) {
    this.set({ type: "warning", message }, position);
  },
  info(message, position) {
    this.set({ type: "info", message }, position);
  },
  remove(index) {
    this.items.splice(index, 1);
  }
});
const _sfc_main$2E = {
  __name: "Toastr",
  __ssrInlineRender: true,
  props: {
    item: [Object],
    index: [String, Number],
    duration: {
      type: Number,
      default: 5e3
    }
  },
  setup(__props) {
    const props = __props;
    onMounted(() => setTimeout(() => toast.remove(props.index), props.duration));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["toastr", `toastr-${__props.item.type}`]
      }, _attrs))}><div class="toast-message-container"><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"></path></svg><span class="toast-message">${ssrInterpolate(__props.item.message)}</span></div><button type="button" class="close"><svg width="16" height="16" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button></div>`);
    };
  }
};
const _sfc_setup$2E = _sfc_main$2E.setup;
_sfc_main$2E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Toastr.vue");
  return _sfc_setup$2E ? _sfc_setup$2E(props, ctx) : void 0;
};
const _sfc_main$2D = {
  __name: "ToastrContainer",
  __ssrInlineRender: true,
  setup(__props) {
    const hasToast = computed(() => usePage().props.toast);
    watchEffect(() => toast.setSessionToast(hasToast.value));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        name: "right",
        class: ["toastr-container", unref(toast).position]
      }, _attrs))}>`);
      ssrRenderList(unref(toast).items, (item, index) => {
        _push(ssrRenderComponent(_sfc_main$2E, {
          key: item.key,
          item,
          index
        }, null, _parent));
      });
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2D = _sfc_main$2D.setup;
_sfc_main$2D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ToastrContainer.vue");
  return _sfc_setup$2D ? _sfc_setup$2D(props, ctx) : void 0;
};
const notify = (() => {
  const toast2 = (text, options = {}) => {
    return Toastify({
      text: `<div>${text}</div>`,
      escapeMarkup: false,
      ...options
    }).showToast();
  };
  toast2.success = (text, options = {}) => {
    return Toastify({
      text: `
        <div class="flex items-center gap-2">
          ${options.icon || feather.icons["check"].toSvg({ width: "16", height: "16" })}
          <div>${text}</div>
        </div>
      `,
      escapeMarkup: false,
      className: localStorage.getItem("theme") === "dark" ? "" : "toastify-success",
      ...options
    }).showToast();
  };
  toast2.danger = (text, options = {}) => {
    return Toastify({
      text: `
        <div class="flex items-center gap-2">
          ${options.icon || feather.icons["x"].toSvg({ width: "16", height: "16" })}
          <div>${text}</div>
        </div>
      `,
      escapeMarkup: false,
      className: "toastify-danger",
      ...options
    }).showToast();
  };
  toast2.warning = (text, options = {}) => {
    return Toastify({
      text: `
        <div class="flex items-center gap-2">
          ${options.icon || feather.icons["alert-triangle"].toSvg({
        width: "16",
        height: "16"
      })}
          <div>${text}</div>
        </div>
      `,
      escapeMarkup: false,
      className: "toastify-warning",
      ...options
    }).showToast();
  };
  toast2.info = (text, options = {}) => {
    return Toastify({
      text: `
        <div class="flex items-center gap-2">
          ${options.icon || feather.icons["info"].toSvg({ width: "16", height: "16" })}
          <div>${text}</div>
        </div>
      `,
      escapeMarkup: false,
      className: "toastify-info",
      ...options
    }).showToast();
  };
  return toast2;
})();
const modal = reactive({
  state: false,
  link: null,
  method: "delete",
  data: null,
  confirm_text: trans("Are you sure?"),
  message: "",
  accept_btn_text: "Yes, Confirm!",
  reject_btn_text: "No, Cancel!",
  callback: null,
  success_message: trans("Submitted Successfully"),
  init(link = null, { method, data = {}, options = {}, callback }) {
    this.link = link;
    this.message = (options == null ? void 0 : options.message) || this.message;
    this.confirm_text = (options == null ? void 0 : options.confirm_text) || this.confirm_text;
    this.accept_btn_text = (options == null ? void 0 : options.accept_btn_text) || this.accept_btn_text;
    this.reject_btn_text = (options == null ? void 0 : options.reject_btn_text) || this.reject_btn_text;
    this.success_message = (options == null ? void 0 : options.success_message) ?? this.success_message;
    if (callback instanceof Function) {
      this.callback = callback;
    }
    if (method && data) {
      this.method = method;
      this.data = data;
    }
    this.state = true;
  },
  initCallback(callFn, options = {}) {
    this.init(null, { callback: callFn, options });
  },
  async accept() {
    const validMethods = ["post", "put", "patch", "delete"];
    const { method, link, data, callback, success_message } = this;
    if (link && validMethods.includes(method)) {
      await router[method](link, data, {
        onSuccess: () => notify.success(success_message)
      });
    }
    if (link && !validMethods.includes(method)) {
      router.delete(link, {
        onSuccess: () => notify.success(success_message)
      });
    }
    if (callback instanceof Function) {
      callback();
    }
    this.state = false;
  },
  reset() {
    Object.assign(this, {
      link: null,
      state: false,
      method: "delete",
      data: null,
      message: "You want to delete this?",
      confirm_text: trans("Are you sure?"),
      accept_btn_text: "Yes, delete it!",
      reject_btn_text: "No, Cancel!"
    });
  }
});
const sharedComposable = () => {
  const textExcerpt = (text, length) => {
    return (text == null ? void 0 : text.length) > length ? (text == null ? void 0 : text.substring(0, length)) + "..." : text;
  };
  const currentRoute = (route2) => {
    return usePage().component === route2;
  };
  const currentRouteGroup = (route2) => {
    return usePage().component.startsWith(route2);
  };
  const authUser = computed(() => {
    return usePage().props.user;
  });
  const logout = () => {
    router.post("/logout");
  };
  const formatNumber = (num, precision = 1) => {
    const map = [
      { suffix: "T", threshold: 1e12 },
      { suffix: "B", threshold: 1e9 },
      { suffix: "M", threshold: 1e6 },
      { suffix: "K", threshold: 1e3 },
      { suffix: "", threshold: 1 }
    ];
    const found = map.find((x) => Math.abs(num) >= x.threshold);
    if (found) {
      const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
      return formatted;
    }
    return num;
  };
  const deleteRow = (actionUrl, alertMessage = "Deleted successfully") => {
    modal.init(actionUrl, {
      options: {
        message: trans("You would not be revert it back!"),
        confirm_text: trans("Are you sure?"),
        accept_btn_text: trans("Yes, Delete"),
        reject_btn_text: trans("No, Cancel")
      },
      callback: () => {
      }
    });
  };
  const formatCurrency = (amount = 0, iconType = "name") => {
    let formattedCurrency = "";
    if (!(typeof amount === "number")) {
      return "";
    }
    const currency = usePage().props.currency;
    if (iconType === "name") {
      formattedCurrency = currency.position === "right" ? currency.name + " " + amount.toFixed(2) : currency.icon + " " + amount.toFixed(2);
    } else if (iconType === "both") {
      formattedCurrency = currency.icon + amount.toFixed(2) + " " + currency.name;
    } else {
      formattedCurrency = currency.position === "right" ? amount.toFixed(2) + currency.icon : currency.icon + amount.toFixed(2);
    }
    return formattedCurrency;
  };
  const pickBy = (obj) => {
    const result = {};
    for (const key in obj) {
      const value = obj[key];
      if (value !== void 0 && value !== null && value !== "") {
        if (Array.isArray(value) && value.length === 0) {
          continue;
        } else if (typeof value === "object" && Object.keys(value).length === 0) {
          continue;
        }
        result[key] = value;
      }
    }
    return result;
  };
  const getQueryParams = () => {
    const obj = {};
    const para = new URLSearchParams(window.location.search);
    for (const [key, value] of para) {
      if (obj.hasOwnProperty(key)) {
        if (Array.isArray(obj[key])) {
          obj[key].push(value);
        } else {
          obj[key] = [obj[key], value];
        }
      } else {
        obj[key] = value;
      }
    }
    return obj;
  };
  function copyToClipboard(content) {
    const unsecuredCopyToClipboard = (text) => {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        notify.success("Copied to clipboard");
      } catch (err) {
        console.error("Unable to copy to clipboard", err);
      }
      document.body.removeChild(textArea);
    };
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(content);
      notify.success("Copied to clipboard");
    } else {
      unsecuredCopyToClipboard(content);
    }
  }
  function socialShare(media, url = null) {
    let shareableLinks = {
      facebook: "https://www.facebook.com/sharer/sharer.php?u=",
      twitter: "https://twitter.com/intent/tweet?url=",
      pinterest: "https://pinterest.com/pin/create/button/?url=",
      instagram: "https://www.instagram.com/?url=",
      linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=",
      tumblr: "http://www.tumblr.com/share/link?url=",
      email: "mailto:?subject=Join and enjoy;body=",
      whatsapp: "whatsapp://send?text=Join and enjoy. ",
      telegram: "https://telegram.me/share/url?text=Join and enjoy.&amp;url="
    };
    if (shareableLinks.hasOwnProperty(media)) {
      return shareableLinks[media] + (url ?? window.location.href);
    }
    return "invalidMediaError";
  }
  return {
    authUser,
    textExcerpt,
    currentRoute,
    currentRouteGroup,
    deleteRow,
    logout,
    formatCurrency,
    pickBy,
    formatNumber,
    getQueryParams,
    copyToClipboard,
    socialShare
  };
};
const menuType$1 = {
  item: "item",
  heading: "heading",
  dropdown: "dropdown"
};
var navMenuItems$1 = [
  {
    icon: "home",
    text: "Dashboard",
    uri: route("admin.dashboard")
  },
  {
    permission: "order",
    icon: "shopping-cart",
    text: "Orders",
    uri: route("admin.order.index")
  },
  {
    type: menuType$1.heading,
    text: "Projects"
  },
  {
    icon: "award",
    text: "Projects",
    uri: route("admin.projects.index")
  },
  {
    icon: "columns",
    text: "Project Category",
    uri: route("admin.project-categories.index")
  },
  {
    icon: "dollar-sign",
    text: "Return Transactions",
    uri: route("admin.return-transaction")
  },
  {
    icon: "shopping-bag",
    text: "Invests",
    uri: route("admin.invest.index")
  },
  {
    type: menuType$1.heading,
    text: "Others"
  },
  {
    permission: "gateways",
    icon: "calendar",
    text: "Payment Gateways",
    uri: route("admin.gateways.index")
  },
  {
    permission: "payouts",
    icon: "briefcase",
    text: "Payout Methods",
    uri: route("admin.payout-methods.index")
  },
  {
    permission: "payouts",
    icon: "credit-card",
    text: "Payouts",
    uri: route("admin.payouts.index")
  },
  {
    permission: "cron-job",
    icon: "code",
    text: "Cron Jobs",
    uri: "/admin/cron-job"
  },
  {
    permission: "support",
    icon: "message-square",
    text: "Help & Support",
    uri: route("admin.support.index")
  },
  {
    type: menuType$1.heading,
    text: "USER LOGS"
  },
  {
    permission: "customers",
    icon: "users",
    text: "Customers",
    uri: route("admin.customers.index")
  },
  {
    permission: "notification",
    icon: "bell",
    text: "Notifications",
    uri: route("admin.notification.index")
  },
  {
    permission: "deposit-logs",
    icon: "file",
    text: "Deposit Logs",
    uri: route("admin.deposit-logs.index")
  },
  {
    type: menuType$1.heading,
    text: "APPEARANCE"
  },
  {
    type: menuType$1.dropdown,
    icon: "book",
    text: "Blogs",
    subs: [
      {
        permission: "blog-posts",
        text: "Posts",
        uri: route("admin.blog-posts.index")
      },
      {
        permission: "blog-categories",
        text: "Categories",
        uri: route("admin.blog-categories.index")
      },
      {
        permission: "blog-tags",
        text: "Tags",
        uri: route("admin.blog-tags.index")
      }
    ]
  },
  {
    permission: "faq",
    icon: "columns",
    text: "Faq's",
    uri: route("admin.faq.index")
  },
  {
    permission: "testimonials",
    icon: "calendar",
    text: "Testimonials",
    uri: route("admin.testimonials.index")
  },
  {
    permission: "partners",
    icon: "box",
    text: "Partners",
    uri: route("admin.partner.index")
  },
  {
    permission: "investors",
    icon: "users",
    text: "Investors",
    uri: route("admin.investors.index")
  },
  {
    permission: "events",
    icon: "file",
    text: "Events",
    uri: route("admin.events.index")
  },
  {
    permission: "event-orders",
    icon: "shopping-cart",
    text: "Event Bookings",
    uri: route("admin.event-orders.index")
  },
  {
    permission: "refer-history",
    icon: "users",
    text: "Referral History",
    uri: route("admin.refer-histories")
  },
  {
    permission: "commission-history",
    icon: "dollar-sign",
    text: "Commission History",
    uri: route("admin.commission-histories")
  },
  {
    permission: "team",
    icon: "user",
    text: "Team",
    uri: route("admin.team.index")
  },
  {
    permission: "language",
    icon: "grid",
    text: "Language",
    uri: route("admin.language.index")
  },
  {
    permission: "menu",
    icon: "menu",
    text: "Menu",
    uri: route("admin.menu.index")
  },
  {
    permission: "custom-page",
    icon: "box",
    text: "Custom Pages",
    uri: route("admin.page.index")
  },
  {
    permission: "seo",
    icon: "tool",
    text: "Seo Settings",
    uri: route("admin.seo.index")
  },
  {
    type: menuType$1.heading,
    text: "SITE SETTINGS"
  },
  {
    // permission: ['kyc-methods', 'kyc-requests'],
    type: menuType$1.dropdown,
    disable: false,
    // here we need to get env variable status
    icon: "file-text",
    text: "KYC",
    subs: [
      {
        permission: "kyc-methods",
        text: "Create Method",
        uri: route("admin.kyc-methods.create")
      },
      {
        permission: "kyc-methods",
        text: "All Methods",
        uri: route("admin.kyc-methods.index")
      },
      {
        permission: "kyc-requests",
        text: "KYC Requests",
        uri: route("admin.kyc-requests.index")
      }
    ]
  },
  {
    permission: "page-settings",
    icon: "sliders",
    text: "Page Settings",
    uri: route("admin.page-settings.index")
  },
  {
    type: menuType$1.dropdown,
    icon: "lock",
    text: "Admin and Role",
    subs: [
      {
        permission: "admin",
        text: "Admin",
        uri: route("admin.admin.index")
      },
      {
        permission: "roles",
        text: "Roles",
        uri: route("admin.role.index")
      }
    ]
  },
  {
    permission: "developer-settings",
    type: menuType$1.dropdown,
    icon: "settings",
    text: "Developer Settings",
    subs: [
      {
        text: "App Setting",
        uri: route("admin.developer-settings.show", "app-settings")
      },
      {
        text: "Features Settings",
        uri: route("admin.developer-settings.show", "features-settings")
      },
      {
        text: "Newsletter Settings",
        uri: route("admin.developer-settings.show", "newsletter-settings")
      },
      {
        text: "Social Login Settings",
        uri: route("admin.developer-settings.show", "social-login-settings")
      },
      {
        text: "SMTP Setting",
        uri: route("admin.developer-settings.show", "mail-settings")
      },
      {
        text: "Storage Setting",
        uri: route("admin.developer-settings.show", "storage-settings")
      }
    ]
  },
  {
    type: menuType$1.heading,
    text: "MY SETTINGS"
  },
  {
    icon: "user",
    text: "Profile Settings",
    uri: route("admin.profile.setting")
  }
];
const updateActiveMenu$1 = (uri) => {
  navMenuItems$1 = navMenuItems$1.map((item) => {
    var _a2;
    if (item.type != menuType$1.heading) {
      item.is_active = uri == item.uri;
      if ((_a2 = item.subs) == null ? void 0 : _a2.length) {
        item.subs = item.subs.map((sub) => {
          if (uri === sub.uri) {
            sub.is_active = true;
            item.is_active = true;
          } else {
            sub.is_active = false;
          }
          return sub;
        });
      }
    }
    return item;
  });
};
const _sfc_main$2C = {
  __name: "Sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const { authUser, logout } = sharedComposable();
    onMounted(() => {
      updateActiveMenu$1(window.location.href);
      window.addEventListener("load", () => {
        const wrapper = document.querySelector(".wrapper");
        const sidebar = document.querySelector(".sidebar");
        const sidebarToggle = document.querySelector(".sidebar-toggle");
        const content = document.querySelector(".sidebar-content");
        const menuItems = document.querySelectorAll(".sidebar-menu");
        const init = () => {
          initMenuItems();
          initSidebarToggle();
          initWrapper();
          initOverlay();
          handleWindowResize();
          initSidebarHover();
          initScrollBar();
        };
        const initMenuItems = () => {
          if (menuItems.length) {
            menuItems.forEach((menuItem) => {
              const parent = menuItem.parentElement;
              const submenu = parent.querySelector(".sidebar-submenu");
              const arrow = menuItem.querySelector(".sidebar-menu-arrow");
              if (submenu) {
                menuItem.addEventListener("click", (e) => {
                  e.preventDefault();
                  toggleHeight(submenu, submenu.scrollHeight);
                  arrow.classList.toggle("rotate");
                });
              }
              if (submenu && menuItem.classList.contains("active")) {
                toggleHeight(submenu, submenu.scrollHeight);
                arrow.classList.toggle("rotate");
              }
            });
          }
        };
        const toggleHeight = (element, height) => {
          if (element.style.height === "0px" || element.style.height === "") {
            element.style.height = `${height}px`;
          } else {
            element.style.height = "0px";
          }
        };
        const initSidebarToggle = () => {
          if (sidebarToggle) {
            sidebarToggle.addEventListener("click", () => toggleSidebar());
          }
        };
        const toggleSidebar = () => {
          const windowWidth = window.innerWidth;
          if (windowWidth < 1024) {
            sidebar.classList.toggle("expanded");
            document.querySelector(".sidebar-overlay").classList.toggle("active");
          } else {
            sidebar.classList.toggle("collapsed");
            wrapper.classList.toggle("expanded");
          }
        };
        const initWrapper = () => {
          if (sidebar) {
            if (sidebar.classList.contains("collapsed")) {
              wrapper.classList.add("expanded");
            } else {
              wrapper.classList.remove("expanded");
            }
          }
        };
        const initOverlay = () => {
          const overlay = document.createElement("div");
          overlay.classList.add("sidebar-overlay");
          document.body.appendChild(overlay);
          overlay.addEventListener("click", () => {
            sidebar.classList.remove("expanded");
            overlay.classList.remove("active");
          });
        };
        const handleWindowResize = () => {
          if (sidebar) {
            window.addEventListener("resize", () => {
              if (window.innerWidth < 1024) {
                sidebar.classList.remove("collapsed");
                wrapper.classList.remove("expanded");
              } else {
                sidebar.classList.remove("expanded");
              }
            });
          }
        };
        const initSidebarHover = () => {
          if (sidebar) {
            sidebar.addEventListener("mouseenter", () => {
              if (window.innerWidth > 1024) {
                sidebar.classList.add("hovered");
              }
            });
            sidebar.addEventListener("mouseleave", () => {
              if (window.innerWidth > 1024) {
                sidebar.classList.remove("hovered");
              }
            });
          }
        };
        const initScrollBar = () => {
          if (sidebar) {
            new SimpleBar(content);
            const activeMenu = document.querySelector(".sidebar-menu.active");
            const activeSubmenu = document.querySelector(".sidebar-submenu-item.active");
            if (activeSubmenu) {
              activeSubmenu.scrollIntoView({ block: "center", behavior: "smooth" });
            } else if (activeMenu) {
              activeMenu.scrollIntoView({ block: "center", behavior: "smooth" });
            }
          }
        };
        init();
      });
    });
    const page = usePage();
    const authUserPermissions = page.props.permissions ?? [];
    const canAccess = ({ permission }) => {
      let isSuperAdmin = authUser.role == "admin";
      return permission == void 0 || isSuperAdmin || authUserPermissions.includes(permission);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2;
      const _directive_lazy = resolveDirective("lazy");
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "sidebar" }, _attrs))}><a href="/"><div class="sidebar-header flex pb-3 shadow"><div class="sidebar-logo-icon"><img${ssrRenderAttrs(mergeProps({
        alt: "logo",
        class: "block h-[20px] dark:hidden"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, (_a2 = _ctx.$page.props.primaryData) == null ? void 0 : _a2.deep_logo)))}><img${ssrRenderAttrs(mergeProps({
        alt: "logo",
        class: "hidden h-[20px] dark:block"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, (_b2 = _ctx.$page.props.primaryData) == null ? void 0 : _b2.logo)))}></div></div></a><ul class="sidebar-content"><!--[-->`);
      ssrRenderList(unref(navMenuItems$1), (menu2, parentMenuKey) => {
        _push(`<!--[-->`);
        if (canAccess(menu2)) {
          _push(`<!--[-->`);
          if (menu2.type == unref(menuType$1).heading) {
            _push(`<div class="sidebar-menu-header">${ssrInterpolate(unref(trans)(menu2.text))}</div>`);
          } else {
            _push(`<!---->`);
          }
          if ((menu2.type == unref(menuType$1).item || menu2.type == void 0) && !menu2.disable) {
            _push(`<li>`);
            _push(ssrRenderComponent(unref(Link), {
              onClick: ($event) => unref(updateActiveMenu$1)(menu2.uri),
              href: menu2.uri ?? "#",
              class: ["sidebar-menu", { active: menu2.is_active }]
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="sidebar-menu-icon"${_scopeId}><i${ssrRenderAttr("data-feather", menu2.icon ?? "home")}${_scopeId}></i></span><span class="sidebar-menu-text"${_scopeId}>${ssrInterpolate(unref(trans)((menu2 == null ? void 0 : menu2.text) ?? ""))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "sidebar-menu-icon" }, [
                      createVNode("i", {
                        "data-feather": menu2.icon ?? "home"
                      }, null, 8, ["data-feather"])
                    ]),
                    createVNode("span", { class: "sidebar-menu-text" }, toDisplayString(unref(trans)((menu2 == null ? void 0 : menu2.text) ?? "")), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</li>`);
          } else {
            _push(`<!---->`);
          }
          if (menu2.type == unref(menuType$1).dropdown) {
            _push(`<li><a href="javascript:void(0);" class="${ssrRenderClass([{ active: menu2.is_active }, "sidebar-menu"])}"><span class="sidebar-menu-icon"><i${ssrRenderAttr("data-feather", menu2.icon ?? "home")}></i></span><span class="sidebar-menu-text">${ssrInterpolate(menu2.text ?? "")}</span><span class="sidebar-menu-arrow"><i data-feather="chevron-right"></i></span></a><ul class="sidebar-submenu"><!--[-->`);
            ssrRenderList(menu2.subs, (subItem) => {
              _push(`<!--[-->`);
              if (canAccess(subItem)) {
                _push(`<li>`);
                _push(ssrRenderComponent(unref(Link), {
                  onClick: ($event) => unref(updateActiveMenu$1)(subItem.uri ?? "/"),
                  href: subItem.uri,
                  class: ["sidebar-submenu-item", { active: subItem.is_active }]
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`${ssrInterpolate(unref(trans)(subItem.text))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(unref(trans)(subItem.text)), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
                _push(`</li>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<!--]-->`);
            });
            _push(`<!--]--></ul></li>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--><li><button type="button" class="sidebar-menu"><span class="sidebar-menu-icon"><i data-feather="log-out"></i></span><span class="sidebar-menu-text">${ssrInterpolate(unref(trans)("Logout"))}</span></button></li></ul></aside>`);
    };
  }
};
const _sfc_setup$2C = _sfc_main$2C.setup;
_sfc_main$2C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Admin/Sidebar.vue");
  return _sfc_setup$2C ? _sfc_setup$2C(props, ctx) : void 0;
};
class ThemeSwitcher {
  constructor(target) {
    this.dropdown = null;
    this.dropdownBtns = null;
    if (typeof target === "string") {
      this.dropdown = document.querySelector(target);
    }
    if (target instanceof HTMLElement) {
      this.dropdown = target;
    }
    if (!target) {
      throw new Error("No target element found");
    }
    if (this.dropdown) {
      this.dropdownBtns = this.dropdown.querySelectorAll("[data-theme-mode]");
    }
    if (this.dropdownBtns && this.dropdownBtns.length) {
      this.updateActiveClass();
      [...this.dropdownBtns].forEach((btn) => {
        btn.addEventListener("click", () => this.toggle(btn));
      });
    }
  }
  toggle(btn) {
    const themeMode = btn.dataset.themeMode;
    if (themeMode === "light") {
      localStorage.setItem("theme", "light");
    }
    if (themeMode === "dark") {
      localStorage.setItem("theme", "dark");
    }
    if (themeMode === "system") {
      localStorage.removeItem("theme");
    }
    window.location.reload();
  }
  updateActiveClass() {
    [...this.dropdownBtns].forEach((btn) => {
      if (btn.classList.contains("active")) {
        btn.classList.remove("active");
      }
      if (!localStorage.theme && btn.dataset.themeMode === "system") {
        btn.classList.add("active");
      }
      if (localStorage.theme === btn.dataset.themeMode) {
        btn.classList.add("active");
      }
    });
  }
}
const themeSwitcher = {
  init() {
    const dropdownThemeSwitcher = document.querySelector("#theme-switcher-dropdown");
    if (dropdownThemeSwitcher) {
      new ThemeSwitcher(dropdownThemeSwitcher);
    }
  }
};
const _sfc_main$2B = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const { authUser, logout } = sharedComposable();
    onMounted(() => {
      themeSwitcher.init();
      modal2.value = createModal(document.getElementById("search-modal"));
    });
    const notifications = usePage().props.notifications ?? [];
    const unreadNotifications = computed(() => {
      return notifications.filter((item) => item.seen == 0).length ?? 0;
    });
    const modal2 = ref({});
    const search = ref("");
    const menuGroups = [
      {
        title: "General",
        pages: [
          {
            text: "Dashboard",
            uri: route("admin.dashboard")
          },
          {
            text: "Orders",
            uri: route("admin.order.index")
          },
          {
            text: "Projects",
            uri: route("admin.projects.index")
          },
          {
            text: "Project Category",
            uri: route("admin.project-categories.index")
          },
          {
            text: "Return Transactions",
            uri: route("admin.return-transaction")
          },
          {
            text: "Invests",
            uri: route("admin.invest.index")
          },
          {
            text: "Payment Gateways",
            uri: route("admin.gateways.index")
          },
          {
            text: "Payout Methods",
            uri: route("admin.payout-methods.index")
          },
          {
            text: "Payouts",
            uri: route("admin.payouts.index")
          },
          {
            text: "Cron Jobs",
            uri: "/admin/cron-job"
          },
          {
            text: "Help & Support",
            uri: route("admin.support.index")
          },
          {
            text: "Notifications",
            uri: route("admin.notification.index")
          },
          {
            text: "Deposit Logs",
            uri: route("admin.deposit-logs.index")
          },
          {
            text: "Posts",
            uri: route("admin.blog-posts.index")
          },
          {
            text: "Categories",
            uri: route("admin.blog-categories.index")
          },
          {
            text: "Tags",
            uri: route("admin.blog-tags.index")
          },
          {
            text: "Faq's",
            uri: route("admin.faq.index")
          },
          {
            text: "Features",
            uri: route("admin.features.index")
          },
          {
            text: "Testimonials",
            uri: route("admin.testimonials.index")
          },
          {
            text: "Partners",
            uri: route("admin.partner.index")
          },
          {
            text: "Investors",
            uri: route("admin.investors.index")
          },
          {
            text: "Events",
            uri: route("admin.events.index")
          },
          {
            text: "Event Orders",
            uri: route("admin.event-orders.index")
          },
          {
            text: "Referral History",
            uri: route("admin.refer-histories")
          },
          {
            text: "Commission History",
            uri: route("admin.commission-histories")
          },
          {
            text: "Team",
            uri: route("admin.team.index")
          },
          {
            text: "Language",
            uri: route("admin.language.index")
          },
          {
            text: "Menu",
            uri: route("admin.menu.index")
          },
          {
            text: "Custom Pages",
            uri: route("admin.page.index")
          },
          {
            text: "Seo Settings",
            uri: route("admin.seo.index")
          },
          {
            text: "Create Method",
            uri: route("admin.kyc-methods.create")
          },
          {
            text: "All Methods",
            uri: route("admin.kyc-methods.index")
          },
          {
            text: "KYC Requests",
            uri: route("admin.kyc-requests.index")
          },
          {
            text: "Page Settings",
            uri: route("admin.page-settings.index")
          },
          {
            text: "Admin",
            uri: route("admin.admin.index")
          },
          {
            text: "Roles",
            uri: route("admin.role.index")
          },
          {
            text: "App Setting",
            uri: route("admin.developer-settings.show", "app-settings")
          },
          {
            text: "SMTP Setting",
            uri: route("admin.developer-settings.show", "mail-settings")
          },
          {
            text: "Storage Setting",
            uri: route("admin.developer-settings.show", "storage-settings")
          },
          {
            text: "Profile Settings",
            uri: route("admin.profile.setting")
          }
        ]
      }
    ];
    const filteredMenuItems = computed(() => {
      return menuGroups.map((item) => {
        return {
          ...item,
          // Search the pages array for pages that start with the search string
          pages: item.pages.filter(
            (page) => {
              var _a2, _b2;
              return (_b2 = page.text) == null ? void 0 : _b2.toLowerCase().startsWith((_a2 = search.value) == null ? void 0 : _a2.toLowerCase());
            }
          ).map((item2) => {
            item2.text = trans(item2.text);
            return item2;
          })
        };
      }).filter((item) => item.pages.length > 0);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c, _d;
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[--><header class="header"><div class="flex items-center justify-between container-fluid"><div class="flex items-center space-x-6"><button class="sidebar-toggle"><span class="flex space-x-4"><svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="22" width="22" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"></path></svg></span></button><div class="sm:hidden"><button type="button" class="flex items-center justify-center transition-colors duration-150 rounded-full text-slate-500 hover:text-primary-500 focus:text-primary-500 dark:text-slate-400 dark:hover:text-slate-300"><i width="22" height="22" data-feather="search"></i></button></div><button type="button" class="items-center hidden h-10 px-3 overflow-hidden shadow-sm group w-72 rounded-primary bg-slate-100 dark:border-transparent dark:bg-slate-700 sm:flex"><i class="text-slate-400" width="1em" height="1em" data-feather="search"></i><span class="ml-2 text-sm text-slate-400">Search</span></button></div><div class="flex items-center"><div class="dropdown" data-strategy="absolute"><div class="px-3 dropdown-toggle"><button type="button" class="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-700 focus:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:text-slate-300"><span class="hidden font-medium md:block">${ssrInterpolate((_b2 = _ctx.$page.props) == null ? void 0 : _b2.languages[(_a2 = _ctx.$page.props) == null ? void 0 : _a2.locale])}</span><span class="inline-block font-medium md:hidden">${ssrInterpolate((_d = (_c = _ctx.$page.props) == null ? void 0 : _c.locale) == null ? void 0 : _d.toUpperCase())}</span></button></div><div class="w-40 mt-3 dropdown-content"><ul class="dropdown-list"><!--[-->`);
      ssrRenderList(_ctx.$page.props.languages, (language, key) => {
        _push(`<li class="dropdown-list-item">`);
        _push(ssrRenderComponent(_component_Link, {
          as: "button",
          href: _ctx.route("set-locale", key),
          method: "patch",
          class: "dropdown-btn"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class=""${_scopeId}>${ssrInterpolate(language)}</span>`);
            } else {
              return [
                createVNode("span", { class: "" }, toDisplayString(language), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div><div class="dropdown" data-strategy="absolute" id="theme-switcher-dropdown"><button class="px-3 dropdown-toggle text-slate-500 hover:text-slate-700 focus:text-primary-500 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:text-primary-500" type="button"><i class="hidden dark:block" width="24" height="24" data-feather="moon">Dark</i><i class="block dark:hidden" width="24" height="24" data-feather="sun">Light</i></button><div class="mt-3 dropdown-content w-36"><ul class="dropdown-list"><li class="dropdown-list-item"><button type="buttton" class="dropdown-btn" data-theme-mode="light"><i width="16" height="16" data-feather="sun"></i><span>Light</span></button></li><li class="dropdown-list-item"><button type="buttton" class="dropdown-btn" data-theme-mode="dark"><i width="16" height="16" data-feather="moon"></i><span>Dark</span></button></li><li class="dropdown-list-item"><button type="buttton" class="dropdown-btn" data-theme-mode="system"><i width="16" height="16" data-feather="monitor"></i><span>System</span></button></li></ul></div></div><div class="dropdown -mt-0.5" data-strategy="absolute"><div class="px-3 dropdown-toggle"><button class="relative flex items-center justify-center mt-1 transition-colors duration-150 rounded-full text-slate-500 hover:text-slate-700 focus:text-primary-500 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:text-primary-500"><i width="24" height="24" data-feather="bell"></i>`);
      if (unreadNotifications.value) {
        _push(`<span class="absolute -right-1 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger-500 text-[11px] text-slate-200">${ssrInterpolate(unreadNotifications.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div><div class="dropdown-content mt-3 w-[17.5rem] divide-y dark:divide-slate-700 sm:w-80"><div class="flex items-center justify-between px-4 py-4"><h6 class="text-slate-800 dark:text-slate-300">${ssrInterpolate(unref(trans)("Notifications"))}</h6>`);
      if (unref(notifications).length) {
        _push(`<button class="text-xs font-medium text-slate-600 hover:text-primary-500 dark:text-slate-300">${ssrInterpolate(unref(trans)("Clear All"))}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="w-full h-80" data-simplebar><ul>`);
      if (unref(notifications).length) {
        _push(`<!--[-->`);
        ssrRenderList(unref(notifications), (item, index) => {
          _push(`<li class="flex gap-4 px-4 py-3 transition-colors duration-150 cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-700"><div class="flex items-center justify-center flex-shrink-0 w-10 h-10 text-blue-500 bg-blue-100 rounded-full"><i class="bx bx-user-voice" width="20" height="20"></i></div><a${ssrRenderAttr("href", item.url ?? "#")}><h6 class="text-sm font-normal">${ssrInterpolate(item.title)}</h6><p class="text-xs text-slate-400"${ssrRenderAttr("title", item.comment)}>${ssrInterpolate(item.comment_short)}</p><p class="flex items-center gap-1 mt-1 text-xs text-slate-400"><i data-feather="clock" width="1em" height="1em"></i><span>${ssrInterpolate(item.created_at_human_date)}</span></p></a></li>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<li class="mt-5 text-center">${ssrInterpolate(unref(trans)("no notifications"))}</li>`);
      }
      _push(`</ul></div>`);
      if (unref(notifications).length > 5) {
        _push(`<div class="px-4 py-2">`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("admin.notification.index"),
          class: "w-full btn btn-primary-plain btn-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>${ssrInterpolate(unref(trans)("View More"))}</span><i data-feather="arrow-right" width="1rem" height="1rem"${_scopeId}></i>`);
            } else {
              return [
                createVNode("span", null, toDisplayString(unref(trans)("View More")), 1),
                createVNode("i", {
                  "data-feather": "arrow-right",
                  width: "1rem",
                  height: "1rem"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="dropdown" data-strategy="absolute"><div class="pl-3 dropdown-toggle"><button class="group relative flex items-center gap-x-1.5" type="button"><div class="avatar avatar-circle avatar-indicator avatar-indicator-online"><img${ssrRenderAttrs(mergeProps({
        class: "avatar-img group-focus-within:ring group-focus-within:ring-primary-500",
        alt: unref(authUser).name
      }, ssrGetDirectiveProps(
        _ctx,
        _directive_lazy,
        unref(authUser).avatar == null ? `https://ui-avatars.com/api/?name=${unref(authUser).name}` : `${unref(authUser).avatar}`
      )))}></div></button></div><div class="w-56 mt-1 divide-y dropdown-content dark:divide-slate-600"><div class="px-4 py-3"><p class="text-sm"> Welcome <strong>${ssrInterpolate(unref(authUser).name)}</strong>! </p><p class="text-sm font-medium truncate">(${ssrInterpolate(unref(authUser).email)})</p></div><div class="py-1">`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("admin.profile.setting"),
        class: "dropdown-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i width="18" height="18" data-feather="user" class="text-slate-500"${_scopeId}></i><span${_scopeId}>Profile</span>`);
          } else {
            return [
              createVNode("i", {
                width: "18",
                height: "18",
                "data-feather": "user",
                class: "text-slate-500"
              }),
              createVNode("span", null, "Profile")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("admin.support.index"),
        class: "dropdown-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i width="18" height="18" data-feather="help-circle" class="text-slate-500"${_scopeId}></i><span${_scopeId}>Support</span>`);
          } else {
            return [
              createVNode("i", {
                width: "18",
                height: "18",
                "data-feather": "help-circle",
                class: "text-slate-500"
              }),
              createVNode("span", null, "Support")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("clear-cache"),
        class: "dropdown-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i width="18" height="18" data-feather="database" class="text-slate-500"${_scopeId}></i><span${_scopeId}>Clear Cache</span>`);
          } else {
            return [
              createVNode("i", {
                width: "18",
                height: "18",
                "data-feather": "database",
                class: "text-slate-500"
              }),
              createVNode("span", null, "Clear Cache")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="py-1"><form method="POST" action="#"><button type="button" class="dropdown-btn"><i width="18" height="18" data-feather="log-out" class="text-slate-500"></i><span>${ssrInterpolate(unref(trans)("Sign out"))}</span></button></form></div></div></div></div></div></header><div class="modal" id="search-modal"><div class="modal-dialog"><div class="modal-content"><div class="px-4 modal-header sm:px-6"><div class="flex items-center group"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search text-slate-500 group-focus-within:text-slate-600 dark:text-slate-400 dark:group-focus-within:text-slate-300"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg><input type="text"${ssrRenderAttr("value", search.value)} class="w-full text-sm bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 focus:ring-0 dark:text-slate-200" placeholder="Search"><button class="rounded-primary bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600" data-dismiss="modal">${ssrInterpolate(unref(trans)("ESC"))}</button></div></div><div class="modal-body max-h-[600px] px-4 py-6 sm:px-6" data-simplebar="init"><div class="-mt-[12px] space-y-4"><!--[-->`);
      ssrRenderList(filteredMenuItems.value, (group, index) => {
        _push(`<div class=""><h6>${ssrInterpolate(group.title)}</h6><ul class="mt-2 space-y-2"><!--[-->`);
        ssrRenderList(group.pages, (page, index2) => {
          _push(`<li class="">`);
          _push(ssrRenderComponent(_component_Link, {
            onClick: ($event) => modal2.value.hide(),
            href: page.uri || "#",
            class: "flex items-center gap-2 px-4 py-2 text-sm shadow-sm rounded-primary bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span${_scopeId}>${ssrInterpolate(page.text)}</span><i class="ml-auto ti ti-chevron-right text-slate-500"${_scopeId}></i>`);
              } else {
                return [
                  createVNode("span", null, toDisplayString(page.text), 1),
                  createVNode("i", { class: "ml-auto ti ti-chevron-right text-slate-500" })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--></div></div></div></div><div class="modal-backdrop"></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$2B = _sfc_main$2B.setup;
_sfc_main$2B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Admin/Header.vue");
  return _sfc_setup$2B ? _sfc_setup$2B(props, ctx) : void 0;
};
const ValidationErrors_vue_vue_type_style_index_0_scoped_5f297af4_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$2A = {
  __name: "ValidationErrors",
  __ssrInlineRender: true,
  setup(__props) {
    const errors = computed(() => usePage().props.errors);
    const hasErrors = computed(() => Object.keys(errors.value).length > 0);
    return (_ctx, _push, _parent, _attrs) => {
      if (hasErrors.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "validation-errors" }, _attrs))} data-v-5f297af4><div class="flex justify-end" data-v-5f297af4><button class="flex h-7 w-7 items-center justify-center rounded border border-danger-400 text-red-600 hover:bg-red-50" type="button" data-v-5f297af4> x </button></div><div class="flex flex-col" data-v-5f297af4><!--[-->`);
        ssrRenderList(errors.value, (error, key) => {
          _push(`<p data-v-5f297af4>* ${ssrInterpolate(error.replace(/[.,]/g, " "))}</p>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$2A = _sfc_main$2A.setup;
_sfc_main$2A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Admin/ValidationErrors.vue");
  return _sfc_setup$2A ? _sfc_setup$2A(props, ctx) : void 0;
};
const ValidationErrors = /* @__PURE__ */ _export_sfc(_sfc_main$2A, [["__scopeId", "data-v-5f297af4"]]);
class Dropdown {
  constructor(target, options = {}) {
    if (typeof target === "string") {
      this.target = document.querySelector(target);
    }
    if (target instanceof HTMLElement) {
      this.target = target;
    }
    if (!this.target) {
      throw new Error("No target element found");
    }
    this.toggle = this.target.querySelector(".dropdown-toggle");
    this.content = this.target.querySelector(".dropdown-content");
    if (!this.toggle) {
      throw new Error("No toggle element found");
    }
    if (!this.content) {
      throw new Error("No content element found");
    }
    this.options = options;
    this.init();
  }
  init() {
    const outsideClickListener = (e) => {
      if (!this.target.contains(e.target)) {
        this.content.classList.remove("show");
        this.content.classList.remove("animate-fade-in-up");
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      this.cleanup();
      document.removeEventListener("click", outsideClickListener);
    };
    this.toggle.addEventListener("click", () => {
      this.updatePosition();
      this.content.classList.toggle("show");
      this.content.classList.toggle("animate-fade-in-up");
      document.addEventListener("click", outsideClickListener);
    });
  }
  computePosition() {
    if (this.options.strategy === "absolute") {
      this.content.style.position = "absolute";
    }
    computePosition(this.target, this.content, {
      placement: this.options.placement || "bottom-start",
      strategy: this.options.strategy || "fixed",
      middleware: [flip(), shift(), offset(6), hide()]
    }).then((position) => {
      const { referenceHidden } = position.middlewareData.hide;
      Object.assign(this.content.style, {
        visibility: referenceHidden ? "hidden" : "visible",
        left: `${position.x}px`,
        top: `${position.y}px`
      });
    });
  }
  updatePosition() {
    const cleanup = autoUpdate(
      this.target,
      this.content,
      this.computePosition.bind(this)
    );
    this.cleanup = cleanup;
  }
}
const dropdown = {
  init() {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown2) => {
      if (!dropdown2.classList.contains("initiated")) {
        new Dropdown(dropdown2, dropdown2.dataset);
        dropdown2.classList.add("initiated");
      }
    });
  }
};
const _sfc_main$2z = {
  __name: "Modal",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(modal).state) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "c-modal-container" }, _attrs))}><div class="c-modal-content rounded bg-white p-5 dark:bg-dark-800"><div class="exclamation"><span>!</span></div><h6 class="mt-4 text-center">${ssrInterpolate(unref(modal).confirm_text)}</h6><p class="mb-4 mt-4 text-center">${ssrInterpolate(unref(modal).message)}</p><div class="c-model-btn-container"><button class="btn btn-primary">${ssrInterpolate(unref(modal).accept_btn_text)}</button><button class="btn btn-danger">${ssrInterpolate(unref(modal).reject_btn_text)}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$2z = _sfc_main$2z.setup;
_sfc_main$2z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Admin/Modal.vue");
  return _sfc_setup$2z ? _sfc_setup$2z(props, ctx) : void 0;
};
const _sfc_main$2y = {
  __name: "Admin",
  __ssrInlineRender: true,
  setup(__props) {
    onMounted(() => {
      dropdown.init();
      feather.replace();
      window.ResizeObserver = ResizeObserver;
    });
    onUpdated(() => {
      dropdown.init();
      feather.replace();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "app" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2D, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2z, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2C, null, null, _parent));
      _push(`<div class="wrapper">`);
      _push(ssrRenderComponent(_sfc_main$2B, null, null, _parent));
      _push(ssrRenderComponent(ValidationErrors, null, null, _parent));
      _push(`<div class="content">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$2y = _sfc_main$2y.setup;
_sfc_main$2y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Admin.vue");
  return _sfc_setup$2y ? _sfc_setup$2y(props, ctx) : void 0;
};
const __default__$20 = {
  layout: _sfc_main$2y
};
const _sfc_main$2x = /* @__PURE__ */ Object.assign(__default__$20, {
  __name: "Create",
  __ssrInlineRender: true,
  props: ["segments", "buttons", "roles"],
  setup(__props) {
    const form = useForm({
      name: null,
      email: null,
      password: null,
      password_confirmation: null,
      roles: null
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Dashboard"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><form><div class="grid grid-cols-12"><div class="lg:col-span-5"><strong>${ssrInterpolate(unref(trans)("Create Admin"))}</strong><p>${ssrInterpolate(unref(trans)("add admin profile information"))}</p></div><div class="card-wrapper lg:col-span-7"><div class="card"><div class="card-body"><div class="mb-2"><label for="name">${ssrInterpolate(unref(trans)("Name"))}</label><input type="text" placeholder="Enter Name"${ssrRenderAttr("value", unref(form).name)} class="input" id="name" required="" autocomplete="off">`);
      if (unref(form).errors.name) {
        _push(`<div class="invalid-feedback text-danger d-block">${ssrInterpolate(unref(form).errors.name)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-2"><label for="email">${ssrInterpolate(unref(trans)("Email"))}</label><input type="email" placeholder="Enter Email"${ssrRenderAttr("value", unref(form).email)} name="email" class="input" id="email" required="" autocomplete="off">`);
      if (unref(form).errors.email) {
        _push(`<div class="invalid-feedback text-danger d-block">${ssrInterpolate(unref(form).errors.email)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-2"><label for="password">${ssrInterpolate(unref(trans)("Password"))}</label><input type="password" placeholder="Enter password"${ssrRenderAttr("value", unref(form).password)} name="password" class="input" id="password" required="" autocomplete="off">`);
      if (unref(form).errors.password) {
        _push(`<div class="invalid-feedback text-danger d-block">${ssrInterpolate(unref(form).errors.password)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-2"><label for="password_confirmation">${ssrInterpolate(unref(trans)("Password"))}</label><input type="password" placeholder="Confirm Password"${ssrRenderAttr("value", unref(form).password_confirmation)} name="password_confirmation" class="input" id="password_confirmation" required="" autocomplete="off">`);
      if (unref(form).errors.password_confirmation) {
        _push(`<div class="invalid-feedback text-danger d-block">${ssrInterpolate(unref(form).errors.password_confirmation)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Assign Roles"))}</label><select required id="roles" class="select"><!--[-->`);
      ssrRenderList(__props.roles, (role) => {
        _push(`<option${ssrRenderAttr("value", role.name)}>${ssrInterpolate(role.name)}</option>`);
      });
      _push(`<!--]--></select>`);
      if (unref(form).errors.roles) {
        _push(`<div class="invalid-feedback text-danger d-block">${ssrInterpolate(unref(form).errors.roles)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="from-group row mt-3"><div class="col-lg-12"><button class="btn btn-primary">${ssrInterpolate(unref(trans)("Create"))}</button></div></div></div></div></div></div></form></div></main>`);
    };
  }
});
const _sfc_setup$2x = _sfc_main$2x.setup;
_sfc_main$2x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Admin/Create.vue");
  return _sfc_setup$2x ? _sfc_setup$2x(props, ctx) : void 0;
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2x
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2w = {
  __name: "SpinnerBtn",
  __ssrInlineRender: true,
  props: {
    processing: Boolean,
    btnText: {
      type: String,
      default: "Save"
    },
    classes: {
      type: String,
      // default: "btn btn-primary btn-one align-items-center d-flex flex items-center mt-5"
      default: ""
      // for adminend default btn
    },
    size: {
      type: Number,
      default: 20
    }
  },
  setup(__props) {
    const props = __props;
    const defaultClasses = computed(() => {
      return "btn btn-primary flex items-center";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "submit",
        class: __props.classes == "" ? defaultClasses.value : __props.classes,
        disabled: props.processing
      }, _attrs))}><img style="${ssrRenderStyle([
        props.processing ?? false ? null : { display: "none" },
        { height: props.size }
      ])}" src="/assets/images/ajax_loading_white.svg"><span>${props.btnText}</span></button>`);
    };
  }
};
const _sfc_setup$2w = _sfc_main$2w.setup;
_sfc_main$2w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Admin/SpinnerBtn.vue");
  return _sfc_setup$2w ? _sfc_setup$2w(props, ctx) : void 0;
};
const __default__$1$ = {
  layout: _sfc_main$2y
};
const _sfc_main$2v = /* @__PURE__ */ Object.assign(__default__$1$, {
  __name: "Edit",
  __ssrInlineRender: true,
  props: ["segments", "buttons", "roles", "user"],
  setup(__props) {
    const props = __props;
    const form = useForm({
      name: props.user.name,
      email: props.user.email,
      password: null,
      password_confirmation: null,
      status: props.user.status,
      roles: props.user.roles[0].name
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Edit Admin"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><form><div class="grid grid-cols-12"><div class="col-span-5"><strong>${ssrInterpolate(unref(trans)("Edit Admin"))}</strong><p>${ssrInterpolate(unref(trans)("Edit admin profile information"))}</p></div><div class="col-span-7"><div class="card"><div class="card-body"><div class="mb-2"><label for="name">${ssrInterpolate(unref(trans)("Name"))}</label><input type="text" placeholder="Enter Name"${ssrRenderAttr("value", unref(form).name)} class="input" id="name" required="" autocomplete="off">`);
      if (unref(form).errors.name) {
        _push(`<div class="invalid-feedback text-danger d-block">${ssrInterpolate(unref(form).errors.name)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-2"><label for="email">${ssrInterpolate(unref(trans)("Email"))}</label><input type="email" placeholder="Enter Email"${ssrRenderAttr("value", unref(form).email)} name="email" class="input" id="email" required="" autocomplete="off">`);
      if (unref(form).errors.email) {
        _push(`<div class="invalid-feedback text-danger d-block">${ssrInterpolate(unref(form).errors.email)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-2"><label for="password">${ssrInterpolate(unref(trans)("Password"))}</label><input type="password" placeholder="Enter password"${ssrRenderAttr("value", unref(form).password)} name="password" class="input" id="password" autocomplete="off">`);
      if (unref(form).errors.password) {
        _push(`<div class="invalid-feedback text-danger d-block">${ssrInterpolate(unref(form).errors.password)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-2"><label for="password_confirmation">${ssrInterpolate(unref(trans)("Password"))}</label><input type="password" placeholder="Confirm Password"${ssrRenderAttr("value", unref(form).password_confirmation)} name="password_confirmation" class="input" id="password_confirmation" autocomplete="off">`);
      if (unref(form).errors.password_confirmation) {
        _push(`<div class="invalid-feedback text-danger d-block">${ssrInterpolate(unref(form).errors.password_confirmation)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Assign Roles"))}</label><select required id="roles" class="select"><!--[-->`);
      ssrRenderList(__props.roles, (role) => {
        _push(`<option${ssrRenderAttr("value", role.name)}>${ssrInterpolate(role.name)}</option>`);
      });
      _push(`<!--]--></select>`);
      if (unref(form).errors.roles) {
        _push(`<div class="invalid-feedback text-danger d-block">${ssrInterpolate(unref(form).errors.roles)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Status"))}</label><select name="status" class="select"><option value="1">${ssrInterpolate(unref(trans)("Active"))}</option><option value="0">${ssrInterpolate(unref(trans)("Deactive"))}</option></select></div><div class="mb-2 mt-3"><div class="col-lg-12">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        processing: unref(form).processing,
        "btn-text": unref(trans)("Update Profile")
      }, null, _parent));
      _push(`</div></div></div></div></div></div></form></div></main>`);
    };
  }
});
const _sfc_setup$2v = _sfc_main$2v.setup;
_sfc_main$2v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Admin/Edit.vue");
  return _sfc_setup$2v ? _sfc_setup$2v(props, ctx) : void 0;
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2v
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2u = {
  __name: "Alert",
  __ssrInlineRender: true,
  props: ["type", "text"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["alert alert-info m-2", `alert-${__props.type ?? "success"}`],
        role: "alert"
      }, _attrs))}><i width="1rem" height="1rem" data-feather="alert-circle"></i><span>${ssrInterpolate(__props.text ?? "")}</span></div>`);
    };
  }
};
const _sfc_setup$2u = _sfc_main$2u.setup;
_sfc_main$2u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Admin/Alert.vue");
  return _sfc_setup$2u ? _sfc_setup$2u(props, ctx) : void 0;
};
const __default__$1_ = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$2t = /* @__PURE__ */ Object.assign(__default__$1_, {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["segments", "buttons", "users"],
  setup(__props) {
    sharedComposable();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Head), { title: "Sub Admins" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Sub Admins"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Name"))}</th><th>${ssrInterpolate(unref(trans)("Email"))}</th><th>${ssrInterpolate(unref(trans)("Status"))}</th><th>${ssrInterpolate(unref(trans)("Role"))}</th><th class="text-right">${ssrInterpolate(unref(trans)("Action"))}</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.users, (row) => {
        _push(`<tr><td>${ssrInterpolate(row.name)}</td><td>${ssrInterpolate(row.email)}</td><td><span class="${ssrRenderClass(row.status == 1 ? "badge badge-success" : "badge badge-danger")}">${ssrInterpolate(row.status == 1 ? unref(trans)("Active") : unref(trans)("Deactive"))}</span></td><td><!--[-->`);
        ssrRenderList(row.roles, (r) => {
          _push(`<span class="badge badge-primary">${ssrInterpolate(r.name)}</span>`);
        });
        _push(`<!--]--></td><td class="flex gap-3">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("admin.admin.edit", row.id),
          class: "btn btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(trans)("Edit"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(trans)("Edit")), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<a href="javascript:void(0)" class="btn btn-danger delete-confirm">${ssrInterpolate(unref(trans)("Delete"))}</a></td></tr>`);
      });
      _push(`<!--]--></tbody></table>`);
      if (__props.users.length == 0) {
        _push(ssrRenderComponent(_sfc_main$2u, {
          type: "info",
          text: unref(trans)("Opps you have not created any plan....")
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></main>`);
    };
  }
});
const _sfc_setup$2t = _sfc_main$2t.setup;
_sfc_main$2t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Admin/Index.vue");
  return _sfc_setup$2t ? _sfc_setup$2t(props, ctx) : void 0;
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2t
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2s = {
  __name: "OverviewGrid",
  __ssrInlineRender: true,
  props: ["items", "grid"],
  setup(__props) {
    const props = __props;
    const gridClass = `lg:grid-cols-${props.grid ?? 4}`;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: ["grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3", gridClass]
      }, _attrs))}><!--[-->`);
      ssrRenderList(props.items, (item) => {
        _push(`<div class="card"><div class="card-body flex items-center gap-4"><div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 bg-opacity-20 text-primary-500"><i class="${ssrRenderClass([item.iconClass ?? "bx bx-box", "bx text-3xl"])}"></i></div><div class="flex flex-1 flex-col gap-1"><p class="text-sm tracking-wide text-slate-500">${ssrInterpolate(item.title)}</p><div class="flex flex-wrap items-baseline justify-between gap-2"><h4>${ssrInterpolate(item.value)}</h4></div></div></div></div>`);
      });
      _push(`<!--]--></section>`);
    };
  }
};
const _sfc_setup$2s = _sfc_main$2s.setup;
_sfc_main$2s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Admin/OverviewGrid.vue");
  return _sfc_setup$2s ? _sfc_setup$2s(props, ctx) : void 0;
};
class Drawer {
  constructor(target, options = {}) {
    this.target = null;
    this.drawer = null;
    this.toggle = null;
    this.transition = 500;
    this.dismisses = null;
    this.options = {
      keyboard: true,
      //Boolean. Default is true
      backdrop: true,
      //Boolean | 'static'. Default is true
      ...options
    };
    this.documentOnKeydown = (e) => this.hideOnKeydown({ e, drawer: this });
    if (typeof target === "string") {
      this.target = document.querySelector(target);
    } else if (target instanceof HTMLElement) {
      this.target = target;
    } else {
      throw new Error("No target element found");
    }
    if (this.target.classList.contains("drawer")) {
      this.drawer = this.target;
    } else {
      this.toggle = this.target;
      this.drawer = document.querySelector(this.toggle.dataset.target);
      this.toggle.addEventListener("click", () => {
        const openDrawers = document.querySelectorAll(".drawer.show");
        if (openDrawers.length) {
          [...openDrawers].forEach((drawer2) => this.hide(drawer2));
        } else {
          this.show();
        }
      });
    }
    this.dismisses = this.drawer.querySelectorAll('[data-dismiss="drawer"]');
    if (this.dismisses.length) {
      [...this.dismisses].forEach((dismiss) => {
        dismiss.addEventListener("click", () => this.hide());
      });
    }
  }
  show(element = null) {
    const drawer2 = element ? element : this.drawer;
    if (!drawer2.classList.contains("showing")) {
      drawer2.classList.add("showing");
      if (this.options.backdrop) {
        document.body.appendChild(this.createBackdrop());
      }
      setTimeout(() => {
        const drawerBackdrop = document.querySelector(".drawer-backdrop");
        drawer2.classList.replace("showing", "show");
        if (drawerBackdrop) {
          drawerBackdrop.classList.add("show");
          drawerBackdrop.addEventListener("click", () => {
            if (this.options.backdrop !== "static") {
              this.hide();
            }
          });
        }
        if (this.options.keyboard) {
          document.addEventListener("keydown", this.documentOnKeydown);
        }
      }, 15);
    }
  }
  hide(element = null) {
    const drawer2 = element ? element : this.drawer;
    if (drawer2.classList.contains("show") && !drawer2.classList.contains("hiding")) {
      const drawerBackdrop = document.querySelector(".drawer-backdrop");
      drawer2.classList.add("hiding");
      if (drawerBackdrop) {
        drawerBackdrop.classList.remove("show");
      }
      setTimeout(() => {
        drawer2.classList.remove("show");
        drawer2.classList.remove("hiding");
        if (drawerBackdrop) {
          drawerBackdrop.remove();
        }
        if (this.options.keyboard) {
          document.removeEventListener(
            "keydown",
            this.documentOnKeydown
          );
        }
      }, this.transition);
    }
  }
  hideOnKeydown(args) {
    const { e, drawer: drawer2 } = args;
    if (e.key === "Escape" && drawer2.options.keyboard) {
      drawer2.hide();
    }
  }
  createBackdrop() {
    if (document.querySelector(".drawer-backdrop")) {
      document.querySelector(".drawer-backdrop").remove();
    }
    const backdrop = document.createElement("div");
    backdrop.setAttribute("class", "drawer-backdrop");
    return backdrop;
  }
}
const drawer = {
  init() {
    const toggles = this.querySelectors('[data-toggle="drawer"]');
    if (toggles.length) {
      toggles.forEach((toggle) => {
        const targetId = toggle.dataset.target;
        if (targetId) {
          const target = document.querySelector(targetId);
          const options = {
            keyboard: target.dataset.keyboard === "false" ? false : true,
            backdrop: (() => {
              let output = true;
              if (target.dataset.backdrop === "static") {
                output = "static";
              }
              if (target.dataset.backdrop === "false") {
                output = false;
              }
              return output;
            })()
          };
          new Drawer(toggle, options);
        }
      });
    }
  },
  querySelectors(selectors) {
    let output = [];
    if (selectors) {
      output = [...document.querySelectorAll(selectors)].filter(
        (selectorElement) => {
          return !selectorElement.parentElement.classList.contains(
            "code-viewer-source"
          );
        }
      );
    }
    return output;
  },
  of(target, options = {}) {
    return new Drawer(target, options);
  }
};
const _sfc_main$2r = {
  __name: "NoDataFound",
  __ssrInlineRender: true,
  props: {
    forTable: {
      type: [String, Boolean],
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.forTable) {
        _push(`<tbody${ssrRenderAttrs(_attrs)}><tr><td colspan="10"><div class="flex flex-col items-center justify-center mt-5 mb-8"><img src="/assets/images/no-data.svg" class="h-16 my-3" alt=""><p class="text-gray-500">${ssrInterpolate(_ctx.trans("No data found"))}</p></div></td></tr></tbody>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center mt-5 mb-8" }, _attrs))}><img src="/assets/images/no-data.svg" class="h-16 my-3" alt=""><p class="text-gray-500">${ssrInterpolate(_ctx.trans("No data found"))}</p></div>`);
      }
    };
  }
};
const _sfc_setup$2r = _sfc_main$2r.setup;
_sfc_main$2r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Admin/NoDataFound.vue");
  return _sfc_setup$2r ? _sfc_setup$2r(props, ctx) : void 0;
};
const __default__$1Z = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$2q = /* @__PURE__ */ Object.assign(__default__$1Z, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "categories",
    "totalCategories",
    "activeCategories",
    "inActiveCategories",
    "languages",
    "buttons",
    "segments"
  ],
  setup(__props) {
    const props = __props;
    const { deleteRow } = sharedComposable();
    onMounted(() => {
      drawer.init();
    });
    const stats = [
      {
        value: props.totalCategories,
        title: trans("Total Categories"),
        iconClass: "bx bx-box"
      },
      {
        value: props.activeCategories,
        title: trans("Active Categories"),
        iconClass: "bx bx-dollar-circle"
      },
      {
        value: props.inActiveCategories,
        title: trans("Inactive Categories"),
        iconClass: "ti ti-thumb-up"
      }
    ];
    const categoryForm = useForm({
      title: "",
      status: "1",
      language: "en"
    });
    const editForm = useForm({
      title: "",
      status: "",
      lang: "",
      _method: "put"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><main class="container p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Categories",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: stats,
        grid: "3"
      }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th class="">${ssrInterpolate(unref(trans)("Name"))}</th><th class="">${ssrInterpolate(unref(trans)("Slug"))}</th><th class="text-center">${ssrInterpolate(unref(trans)("Language"))}</th><th class="">${ssrInterpolate(unref(trans)("Status"))}</th><th class="">${ssrInterpolate(unref(trans)("Created At"))}</th><th class="flex justify-end">${ssrInterpolate(unref(trans)("Action"))}</th></tr></thead>`);
      if (__props.categories.total) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.categories.data, (category) => {
          _push(`<tr><td class="text-left">${ssrInterpolate(category.title)}</td><td class="text-left">${ssrInterpolate(category.slug)}</td><td class="text-center">${ssrInterpolate(category.lang)}</td><td class="text-left"><span class="${ssrRenderClass([category.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(category.status == 1 ? unref(trans)("Active") : unref(trans)("Draft"))}</span></td><td>${ssrInterpolate(unref(moment)(category.created_at).format("D-MMM-Y"))}</td><td><div class="flex justify-end"><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item"><button class="dropdown-link"><i class="h-5 text-slate-400" data-feather="edit"></i><span>${ssrInterpolate(unref(trans)("Edit"))}</span></button></li><li class="dropdown-list-item">`);
          _push(ssrRenderComponent(unref(Link), {
            as: "button",
            class: "dropdown-link",
            onClick: ($event) => unref(deleteRow)(_ctx.route("admin.blog-categories.destroy", category.id))
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="h-5 text-slate-400" data-feather="trash-2"${_scopeId}>${ssrInterpolate(unref(trans)("Remove"))}&gt;</i><span${_scopeId}>${ssrInterpolate(unref(trans)("Delete"))}</span>`);
              } else {
                return [
                  createVNode("i", {
                    class: "h-5 text-slate-400",
                    "data-feather": "trash-2"
                  }, toDisplayString(unref(trans)("Remove")) + ">", 1),
                  createVNode("span", null, toDisplayString(unref(trans)("Delete")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li></ul></div></div></div></td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table></div></div></main><div id="addNewCategoryDrawer" class="drawer drawer-right"><form><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Add New Category"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Title"))}</label><input${ssrRenderAttr("value", unref(categoryForm).title)} type="text" name="title" class="input" placeholder="enter category title" required></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Status"))}</label><select required class="select" name="status"><option value="1">${ssrInterpolate(unref(trans)("Active"))}</option><option value="0">${ssrInterpolate(unref(trans)("InActive"))}</option></select></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Language"))}</label><select required class="select" name="language"><!--[-->`);
      ssrRenderList(__props.languages, (language, key) => {
        _push(`<option${ssrRenderAttr("value", key)}>${ssrInterpolate(language)}</option>`);
      });
      _push(`<!--]--></select></div></div><div class="drawer-footer"><div class="flex justify-end gap-2"><button type="button" class="btn btn-secondary" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(categoryForm).processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></form></div><div id="editCategoryDrawer" class="drawer drawer-right"><form><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Edit Category"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Title"))}</label><input${ssrRenderAttr("value", unref(editForm).title)} type="text" name="title" class="input" required></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Status"))}</label><select class="select" name="status"><option value="1">${ssrInterpolate(unref(trans)("Active"))}</option><option value="0">${ssrInterpolate(unref(trans)("InActive"))}</option></select></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Language"))}</label><select class="select" name="language"><!--[-->`);
      ssrRenderList(__props.languages, (language, key) => {
        _push(`<option${ssrRenderAttr("value", key)}>${ssrInterpolate(language)}</option>`);
      });
      _push(`<!--]--></select></div></div><div class="drawer-footer"><div class="flex justify-end gap-2"><button type="button" class="btn btn-secondary" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(editForm).processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></form></div><!--]-->`);
    };
  }
});
const _sfc_setup$2q = _sfc_main$2q.setup;
_sfc_main$2q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Blogs/Categories/Index.vue");
  return _sfc_setup$2q ? _sfc_setup$2q(props, ctx) : void 0;
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2q
}, Symbol.toStringTag, { value: "Module" }));
const ckeEditor = () => {
  const cke = CKEditor.component;
  ClassicEditor.defaultConfig = {
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "|",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "insertTable",
        "|",
        "mediaEmbed",
        "|",
        "undo",
        "redo"
      ]
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
    },
    language: "en"
  };
  return { cke, ClassicEditor };
};
const __default__$1Y = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$2p = /* @__PURE__ */ Object.assign(__default__$1Y, {
  __name: "Create",
  __ssrInlineRender: true,
  props: ["segments", "buttons", "categories", "languages", "tags"],
  setup(__props) {
    const { cke, ClassicEditor: ClassicEditor2 } = ckeEditor();
    const form = useForm({
      title: "",
      short_description: "",
      main_description: "",
      categories: [],
      tags: [],
      language: "",
      featured: false,
      status: false,
      meta_title: "",
      meta_description: "",
      meta_tags: "",
      meta_image: "",
      preview: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Create a blog",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="flex"><div class="card mx-auto max-w-[800px]"><div class="card-body"><form><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Blog Title"))}</label><input${ssrRenderAttr("value", unref(form).title)} type="text" name="title" required="" class="input"></div><div class="mb-2 mt-2"><label>${ssrInterpolate(_ctx.trans("Blog Image (Preview)"))}</label><input type="file" class="input" required name="preview" accept="image/*"></div><div class="mb-2 mt-2"><label>${ssrInterpolate(_ctx.trans("Short Description"))}</label><textarea name="short_description" required class="textarea" maxlength="500">${ssrInterpolate(unref(form).short_description)}</textarea></div><div class="mb-2 mt-3"><label>${ssrInterpolate(_ctx.trans("Main Description"))}</label>`);
      _push(ssrRenderComponent(unref(cke), {
        "tag-name": "textarea",
        editor: unref(ClassicEditor2),
        modelValue: unref(form).main_description,
        "onUpdate:modelValue": ($event) => unref(form).main_description = $event
      }, null, _parent));
      _push(`</div><div class="mb-2 ma-top-3"><label>${ssrInterpolate(_ctx.trans("Select Category"))}</label>`);
      _push(ssrRenderComponent(unref(Multiselect), {
        class: "multiselect-dark",
        modelValue: unref(form).categories,
        "onUpdate:modelValue": ($event) => unref(form).categories = $event,
        mode: "tags",
        options: __props.categories,
        searchable: true,
        placeholder: "Select Main Category"
      }, null, _parent));
      _push(`</div><div class="mb-2 mt-2"><label>${ssrInterpolate(_ctx.trans("Select Tags"))}</label>`);
      _push(ssrRenderComponent(unref(Multiselect), {
        class: "multiselect-dark",
        modelValue: unref(form).tags,
        "onUpdate:modelValue": ($event) => unref(form).tags = $event,
        mode: "tags",
        options: __props.tags,
        searchable: true,
        placeholder: "Select Tags"
      }, null, _parent));
      _push(`</div><div class="mb-2 mt-2"><label>${ssrInterpolate(_ctx.trans("Select Language"))}</label><select name="language" class="select"><!--[-->`);
      ssrRenderList(__props.languages, (language, key) => {
        _push(`<option${ssrRenderAttr("value", key)}>${ssrInterpolate(language)}</option>`);
      });
      _push(`<!--]--></select></div><hr><div class="mb-2 mt-3"><label>${ssrInterpolate(_ctx.trans("SEO Meta Title"))}</label><input${ssrRenderAttr("value", unref(form).meta_title)} type="text" name="meta_title" required class="input"></div><div class="mb-2 mt-2"><label>${ssrInterpolate(_ctx.trans("SEO Meta Image"))}</label><input type="file" class="input" name="meta_image" required accept="image/*"></div><div class="mb-2 mt-2"><label>${ssrInterpolate(_ctx.trans("SEO Meta Description"))}</label><textarea name="meta_description" required class="input h-100">${ssrInterpolate(unref(form).meta_description)}</textarea></div><div class="mb-2 mt-2"><label>${ssrInterpolate(_ctx.trans("SEO Meta Tags"))}</label><input${ssrRenderAttr("value", unref(form).meta_tags)} type="text" name="meta_tags" required class="input"></div><div class="mb-2 mt-3"><div><label for="toggle-status" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, null) : unref(form).status) ? " checked" : ""} class="toggle-input peer sr-only" id="toggle-status" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(_ctx.trans("Make it publish?"))}</span></label></div></div><div class="mb-2 mt-3"><div>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(form).processing,
        "btn-text": _ctx.trans("Create")
      }, null, _parent));
      _push(`</div></div></form></div></div></div></div></main>`);
    };
  }
});
const _sfc_setup$2p = _sfc_main$2p.setup;
_sfc_main$2p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Blogs/Create.vue");
  return _sfc_setup$2p ? _sfc_setup$2p(props, ctx) : void 0;
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2p
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1X = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$2o = /* @__PURE__ */ Object.assign(__default__$1X, {
  __name: "Edit",
  __ssrInlineRender: true,
  props: [
    "info",
    "tags",
    "categories",
    "cats",
    "seo",
    "languages",
    "buttons",
    "segments",
    "tagsArr"
  ],
  setup(__props) {
    var _a2, _b2, _c, _d, _e, _f, _g, _h;
    const props = __props;
    const cke = CKEditor.component;
    ClassicEditor.defaultConfig = {
      toolbar: {
        items: [
          "heading",
          "|",
          "bold",
          "italic",
          "|",
          "link",
          "bulletedList",
          "numberedList",
          "|",
          "insertTable",
          "|",
          "mediaEmbed",
          "|",
          "undo",
          "redo"
        ]
      },
      table: {
        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
      },
      language: "en"
    };
    const editForm = ref({
      title: props.info.title,
      short_description: (_a2 = props.info.short_description) == null ? void 0 : _a2.value,
      main_description: (_b2 = props.info.long_description) == null ? void 0 : _b2.value,
      categories: props.cats,
      tags: props.tagsArr,
      preview: "",
      meta_title: (_c = props.seo) == null ? void 0 : _c.title,
      meta_description: (_d = props.seo) == null ? void 0 : _d.description,
      meta_tags: (_e = props.seo) == null ? void 0 : _e.tags,
      language: (_f = props.info) == null ? void 0 : _f.lang,
      featured: (_g = props.info) == null ? void 0 : _g.featured,
      status: (_h = props.info) == null ? void 0 : _h.status
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Edit a blog",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="max-w-6xl mx-auto"><div class="card"><div class="card-body"><form><div class="mb-2"><label class="label">${ssrInterpolate(_ctx.trans("Blog Title"))}</label><input type="text" name="title" required${ssrRenderAttr("value", editForm.value.title)} class="input"></div><div class="mt-2 mb-2"><label class="label">${ssrInterpolate(_ctx.trans("Blog Image (Preview)"))}</label><input type="file" class="input" name="preview" accept="image/*"></div><div class="mt-3 mb-2"><label class="label">${ssrInterpolate(_ctx.trans("Short Description"))}</label><textarea name="short_description" required class="textarea" maxlength="500">${ssrInterpolate(editForm.value.short_description)}</textarea></div><div class="mt-3 mb-2"><label class="label">${ssrInterpolate(_ctx.trans("Main Description"))}</label><div class="">`);
      _push(ssrRenderComponent(unref(cke), {
        "tag-name": "textarea",
        editor: unref(ClassicEditor),
        modelValue: editForm.value.main_description,
        "onUpdate:modelValue": ($event) => editForm.value.main_description = $event
      }, null, _parent));
      _push(`</div></div><div class="mb-2 ma-top-3"><label class="label">${ssrInterpolate(_ctx.trans("Select Language"))}</label><select name="language" class="select"><!--[-->`);
      ssrRenderList(__props.languages, (language, languagesKey) => {
        _push(`<option${ssrRenderAttr("value", languagesKey)}${ssrIncludeBooleanAttr(languagesKey == __props.info.lang) ? " selected" : ""}>${ssrInterpolate(language)}</option>`);
      });
      _push(`<!--]--></select></div><div class="mt-2 mb-2"><label class="label">${ssrInterpolate(_ctx.trans("Select Category"))}</label>`);
      _push(ssrRenderComponent(unref(Multiselect), {
        class: "multiselect-dark",
        modelValue: editForm.value.categories,
        "onUpdate:modelValue": ($event) => editForm.value.categories = $event,
        label: "title",
        valueProp: "id",
        mode: "tags",
        options: __props.categories,
        searchable: true,
        placeholder: "Select Category"
      }, null, _parent));
      _push(`</div><div class="mt-2 mb-2"><label class="label">${ssrInterpolate(_ctx.trans("Select Tags"))}</label><div class="">`);
      _push(ssrRenderComponent(unref(Multiselect), {
        class: "multiselect-dark",
        modelValue: editForm.value.tags,
        "onUpdate:modelValue": ($event) => editForm.value.tags = $event,
        label: "title",
        valueProp: "id",
        mode: "tags",
        options: __props.tags,
        searchable: true,
        placeholder: "Select Tags"
      }, null, _parent));
      _push(`</div></div><hr><div class="mt-3 mb-2"><label class="label">${ssrInterpolate(_ctx.trans("SEO Meta Title"))}</label><input type="text" name="meta_title" required${ssrRenderAttr("value", editForm.value.meta_title)} class="input"></div><div class="mt-2 mb-2"><label class="label">${ssrInterpolate(_ctx.trans("SEO Meta Image"))}</label><input type="file" class="input" name="meta_image" accept="image/*"></div><div class="mt-2 mb-2"><label class="label">${ssrInterpolate(_ctx.trans("SEO Meta Description"))}</label><textarea name="meta_description" required class="textarea">${ssrInterpolate(editForm.value.meta_description)}</textarea></div><div class="mt-2 mb-2"><label class="label">${ssrInterpolate(_ctx.trans("SEO Meta Tags"))}</label><input type="text" name="meta_tags" required class="input"${ssrRenderAttr("value", editForm.value.meta_tags)}></div><div class="mt-3 mb-2"><div><label for="toggle-status" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(Array.isArray(editForm.value.status) ? ssrLooseContain(editForm.value.status, null) : editForm.value.status) ? " checked" : ""} class="sr-only toggle-input peer" id="toggle-status" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(_ctx.trans("Make it publish?"))}</span></label></div></div><div class="mt-3 mb-2"><div class="">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: editForm.value.processing,
        "btn-text": _ctx.trans("Save Changes")
      }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(ValidationErrors, null, null, _parent));
      _push(`</form></div></div></div></div></main>`);
    };
  }
});
const _sfc_setup$2o = _sfc_main$2o.setup;
_sfc_main$2o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Blogs/Edit.vue");
  return _sfc_setup$2o ? _sfc_setup$2o(props, ctx) : void 0;
};
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2o
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2n = {
  __name: "Paginate",
  __ssrInlineRender: true,
  props: ["links"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      if (__props.links.length > 3) {
        _push(`<div${ssrRenderAttrs(_attrs)}><div class="mt-3 paginate-container"><!--[-->`);
        ssrRenderList(__props.links, (link, key) => {
          _push(`<!--[-->`);
          if (link.url === null) {
            _push(`<div class="border border-gray-200 paginate-link paginate-link-null dark:border-gray-600">${link.label}</div>`);
          } else {
            _push(ssrRenderComponent(_component_Link, {
              key: `link-${key}`,
              class: ["border border-gray-300 paginate-link paginate-link-active dark:border-gray-700", { "paginate-link-active-bg": link.active }],
              href: link.url
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span${_scopeId}>${link.label}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      innerHTML: link.label
                    }, null, 8, ["innerHTML"])
                  ];
                }
              }),
              _: 2
            }, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$2n = _sfc_main$2n.setup;
_sfc_main$2n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Paginate.vue");
  return _sfc_setup$2n ? _sfc_setup$2n(props, ctx) : void 0;
};
const _sfc_main$2m = /* @__PURE__ */ defineComponent({
  __name: "FilterForm",
  __ssrInlineRender: true,
  props: {
    action: {
      type: String,
      required: false,
      default: ""
    },
    options: {
      type: [Array, Object],
      required: false,
      default: [
        {
          value: "id",
          label: "id",
          selected: true
        }
      ]
    }
  },
  setup(__props) {
    var _a2, _b2, _c, _d, _e, _f;
    const props = __props;
    const getQueryParams = () => {
      const obj = {};
      const para = new URLSearchParams(window.location.search);
      for (const [key, value] of para) {
        if (obj.hasOwnProperty(key)) {
          if (Array.isArray(obj[key])) {
            obj[key].push(value);
          } else {
            obj[key] = [obj[key], value];
          }
        } else {
          obj[key] = value;
        }
      }
      return obj;
    };
    const filterForm = useForm({
      search: ((_a2 = getQueryParams()) == null ? void 0 : _a2.search) ?? "",
      type: ((_b2 = getQueryParams()) == null ? void 0 : _b2.type) ?? ((_d = (_c = props.options) == null ? void 0 : _c.find((item) => item.selected)) == null ? void 0 : _d.value) ?? ((_f = (_e = props.options) == null ? void 0 : _e[0]) == null ? void 0 : _f.value) ?? ""
    });
    const selectableOptions = ref([]);
    const handleOnSelect = () => {
      var _a3, _b3, _c2, _d2;
      filterForm.search = "";
      if (props.options && filterForm.type) {
        let getOptions = ((_a3 = props.options) == null ? void 0 : _a3.find((item) => item.value == filterForm.type)) ?? [];
        selectableOptions.value = getOptions.options ?? [];
        filterForm.search = ((_c2 = (_b3 = getOptions.options) == null ? void 0 : _b3.find((item) => item.selected == true)) == null ? void 0 : _c2.value) ?? ((_d2 = selectableOptions.value[0]) == null ? void 0 : _d2.value) ?? "";
      } else {
        selectableOptions.value = [];
      }
    };
    watch(() => filterForm.type, handleOnSelect);
    onMounted(() => {
      var _a3, _b3;
      let selectedItem = ((_a3 = props.options) == null ? void 0 : _a3.find((item) => item.value == filterForm.type)) ?? {};
      let isDropdown = selectedItem.hasOwnProperty("options") && Array.isArray(selectedItem.options);
      if (isDropdown) {
        selectableOptions.value = selectedItem.options;
        if (!filterForm.search) {
          filterForm.search = ((_b3 = selectableOptions.value[0]) == null ? void 0 : _b3.value) ?? "";
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-stretch justify-end gap-x-2" }, _attrs))}><div class="dropdown" data-placement="bottom-end"><div class="dropdown-toggle"><button type="button" class="font-medium bg-white shadow-sm btn dark:bg-slate-800 hover:dark:bg-slate-700 border border-slate-700"><i class="w-4" data-feather="filter"></i><span>${ssrInterpolate(_ctx.trans("Filter"))}</span><i class="w-4" data-feather="chevron-down"></i></button></div><div class="dropdown-content w-72 !overflow-visible">${ssrInterpolate(props.action ?? "nai")} <form><ul class="p-4 space-y-4 dropdown-list">`);
      if (selectableOptions.value.length) {
        _push(`<li class="dropdown-list-item"><label class="mb-1 capitalize">${ssrInterpolate(unref(filterForm).type)}</label><select class="select"><!--[-->`);
        ssrRenderList(selectableOptions.value, (option) => {
          _push(`<option${ssrRenderAttr("value", option.value)}>${ssrInterpolate(option.label)}</option>`);
        });
        _push(`<!--]--></select></li>`);
      } else {
        _push(`<li class="dropdown-list-item"><label class="mb-1">${ssrInterpolate(_ctx.trans("Search Keyword"))}</label><input type="text"${ssrRenderAttr("value", unref(filterForm).search)} class="input" placeholder="enter search keyword"></li>`);
      }
      _push(`<li class="dropdown-list-item"><label class="mb-1">${ssrInterpolate(_ctx.trans("Search Type"))}</label><select class="select"><!--[-->`);
      ssrRenderList(__props.options, (option) => {
        _push(`<option${ssrRenderAttr("value", option.value)}${ssrIncludeBooleanAttr(option.selected) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
      });
      _push(`<!--]--></select></li><li class="dropdown-list-item">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        type: "submit",
        processing: unref(filterForm).processing,
        "btn-text": _ctx.trans("Search"),
        class: "w-full btn btn-primary"
      }, null, _parent));
      _push(`</li></ul></form></div></div><button style="${ssrRenderStyle(getQueryParams().search ? null : { display: "none" })}" class="flex items-center bg-gray-300 border dark:bg-gray-700 btn hover:dark:bg-slate-800 hover:dark:border-slate-700 dark:border-gray-600" title="clear filter"><i class="bx bx-x"></i></button></div>`);
    };
  }
});
const _sfc_setup$2m = _sfc_main$2m.setup;
_sfc_main$2m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Admin/FilterForm.vue");
  return _sfc_setup$2m ? _sfc_setup$2m(props, ctx) : void 0;
};
const __default__$1W = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$2l = /* @__PURE__ */ Object.assign(__default__$1W, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "posts",
    "totalPosts",
    "totalActivePosts",
    "totalInActivePosts",
    "buttons",
    "segments",
    "type",
    "request"
  ],
  setup(__props) {
    const props = __props;
    const blogsStats = [
      {
        value: props.totalPosts,
        title: trans("Total Posts"),
        iconClass: "bx bx-box"
      },
      {
        value: props.totalActivePosts,
        title: trans("Total Active Posts"),
        iconClass: "bx bx-dollar-circle"
      },
      {
        value: props.totalInActivePosts,
        title: trans("Total Inactive Posts"),
        iconClass: "ti ti-thumb-up"
      }
    ];
    const { textExcerpt, deleteRow } = sharedComposable();
    const filterOptions = [
      {
        label: "Title",
        value: "title"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Create a blog post",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: blogsStats,
        grid: "3"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2m, { options: filterOptions }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th class="col-3">${ssrInterpolate(unref(trans)("Title"))}</th><th class="col-1">${ssrInterpolate(unref(trans)("Status"))}</th><th class="col-2">${ssrInterpolate(unref(trans)("Created At"))}</th><th class="col-1"><div class="text-right">${ssrInterpolate(unref(trans)("Action"))}</div></th></tr></thead>`);
      if (__props.posts.data != 0) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.posts.data, (blog) => {
          _push(`<tr><td class="flex"><img${ssrRenderAttrs(mergeProps({ class: "avatar rounded-square mr-3" }, ssrGetDirectiveProps(_ctx, _directive_lazy, blog.preview.value)))}><p>${ssrInterpolate(unref(textExcerpt)(blog.title, 80))}</p></td><td class="text-left"><span class="${ssrRenderClass([blog.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(blog.status == 1 ? unref(trans)("Active") : unref(trans)("Draft"))}</span></td><td>${ssrInterpolate(unref(moment)(blog.created_at).format("D-MMM-Y"))}</td><td><div class="flex justify-end"><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item">`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("admin.blog-posts.edit", blog.id),
            class: "dropdown-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="h-5 text-slate-400" data-feather="edit"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(unref(trans)("Edit"))}</span>`);
              } else {
                return [
                  createVNode("i", {
                    class: "h-5 text-slate-400",
                    "data-feather": "edit"
                  }),
                  createVNode("span", null, toDisplayString(unref(trans)("Edit")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li><li class="dropdown-list-item"><button class="dropdown-link"><i class="h-5 text-slate-400" data-feather="trash-2">${ssrInterpolate(unref(trans)("Remove"))}&gt;</i><span>${ssrInterpolate(unref(trans)("Delete"))}</span></button></li></ul></div></div></div></td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table>`);
      if (__props.posts.data.length != 0) {
        _push(ssrRenderComponent(_sfc_main$2n, {
          links: __props.posts.links
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></main>`);
    };
  }
});
const _sfc_setup$2l = _sfc_main$2l.setup;
_sfc_main$2l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Blogs/Index.vue");
  return _sfc_setup$2l ? _sfc_setup$2l(props, ctx) : void 0;
};
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2l
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1V = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$2k = /* @__PURE__ */ Object.assign(__default__$1V, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "tags",
    "totalTags",
    "activeTags",
    "inActiveTags",
    "languages",
    "buttons",
    "segments"
  ],
  setup(__props) {
    const props = __props;
    const { deleteRow } = sharedComposable();
    onMounted(() => {
      drawer.init();
    });
    const tagsStats = [
      { value: props.totalTags, title: trans("Total Tags"), iconClass: "bx bx-box" },
      { value: props.activeTags, title: trans("Active Tags"), iconClass: "bx bx-dollar-circle" },
      { value: props.inActiveTags, title: trans("Inactive Tags"), iconClass: "ti ti-thumb-up" }
    ];
    const tagForm = useForm({
      title: "",
      status: "1",
      language: "en"
    });
    const editForm = ref({});
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><main class="container p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Tags",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: tagsStats,
        grid: "3"
      }, null, _parent));
      _push(`<div class="card"><div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th class="w-2/12">${ssrInterpolate(unref(trans)("Name"))}</th><th class="w-2/12">${ssrInterpolate(unref(trans)("Slug"))}</th><th class="w-2/12"><p class="text-center">${ssrInterpolate(unref(trans)("Uses for blog"))}</p></th><th class="w-2/12">${ssrInterpolate(unref(trans)("Status"))}</th><th class="w-2/12">${ssrInterpolate(unref(trans)("Created At"))}</th><th class="mr-auto w-2/12"><p class="text-end">${ssrInterpolate(unref(trans)("Action"))}</p></th></tr></thead>`);
      if (__props.tags.total) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.tags.data, (tag) => {
          _push(`<tr><td class="text-left">${ssrInterpolate(tag.title)}</td><td class="text-left">${ssrInterpolate(tag.slug)}</td><td><p class="text-center">${ssrInterpolate(tag.post_categories_count)}</p></td><td class="text-left"><span class="badge badge-{{ tag.status == 1 ? &#39;success&#39; : &#39;danger&#39; }}">${ssrInterpolate(tag.status == 1 ? unref(trans)("Active") : unref(trans)("Draft"))}</span></td><td>${ssrInterpolate(unref(moment)(tag.created_at).format("D-MMM-Y"))}</td><td><div class="flex justify-end"><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item"><button class="dropdown-link"><i class="h-5 text-slate-400" data-feather="edit"></i><span>${ssrInterpolate(unref(trans)("Edit"))}</span></button></li><li class="dropdown-list-item">`);
          _push(ssrRenderComponent(unref(Link), {
            as: "button",
            class: "dropdown-link",
            onClick: ($event) => unref(deleteRow)(_ctx.route("admin.blog-tags.destroy", tag.id))
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="h-5 text-slate-400" data-feather="trash-2"${_scopeId}>${ssrInterpolate(unref(trans)("Remove"))}&gt;</i><span${_scopeId}>${ssrInterpolate(unref(trans)("Delete"))}</span>`);
              } else {
                return [
                  createVNode("i", {
                    class: "h-5 text-slate-400",
                    "data-feather": "trash-2"
                  }, toDisplayString(unref(trans)("Remove")) + ">", 1),
                  createVNode("span", null, toDisplayString(unref(trans)("Delete")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li></ul></div></div></div></td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table></div></div></div></main><div id="addNewTagDrawer" class="drawer drawer-right"><form><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Add New Tag"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Title"))}</label><input${ssrRenderAttr("value", unref(tagForm).title)} type="text" name="title" class="input" required=""></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Status"))}</label><select class="select" name="status"><option value="1">${ssrInterpolate(unref(trans)("Active"))}</option><option value="0">${ssrInterpolate(unref(trans)("InActive"))}</option></select></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Status"))}</label><select class="select" name="language"><!--[-->`);
      ssrRenderList(__props.languages, (language, key) => {
        _push(`<option${ssrRenderAttr("value", key)}>${ssrInterpolate(language)}</option>`);
      });
      _push(`<!--]--></select></div></div><div class="drawer-footer"><div class="flex justify-end gap-2"><button type="button" class="btn btn-secondary" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(tagForm).processing,
        "btn-text": unref(trans)("Save Tag")
      }, null, _parent));
      _push(`</div></div></form></div><div id="editTagDrawer" class="drawer drawer-right"><form><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Edit Tag"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Title"))}</label><input${ssrRenderAttr("value", editForm.value.title)} type="text" name="title" id="title" class="input" required></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Status"))}</label><select class="select" name="status" id="status"><option value="1">${ssrInterpolate(unref(trans)("Active"))}</option><option value="0">${ssrInterpolate(unref(trans)("InActive"))}</option></select></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Language"))}</label><select class="select" name="language" id="language"><!--[-->`);
      ssrRenderList(__props.languages, (language, key) => {
        _push(`<option${ssrRenderAttr("value", key)}>${ssrInterpolate(language)}</option>`);
      });
      _push(`<!--]--></select></div></div><div class="drawer-footer"><div class="flex justify-end gap-2"><button type="button" class="btn btn-secondary" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: editForm.value.processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></form></div><!--]-->`);
    };
  }
});
const _sfc_setup$2k = _sfc_main$2k.setup;
_sfc_main$2k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Blogs/Tags/Index.vue");
  return _sfc_setup$2k ? _sfc_setup$2k(props, ctx) : void 0;
};
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2k
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1U = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$2j = /* @__PURE__ */ Object.assign(__default__$1U, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "brands",
    "totalBrands",
    "activeBrands",
    "inActiveBrands",
    "buttons",
    "segments"
  ],
  setup(__props) {
    const props = __props;
    sharedComposable();
    onMounted(() => {
      drawer.init();
    });
    const brandsOverviews = [
      {
        value: props.totalBrands,
        title: trans("Total Partners"),
        iconClass: "bx bx-box"
      },
      {
        value: props.activeBrands,
        title: trans("Active Partners"),
        iconClass: "bx bx-dollar-circle"
      },
      {
        value: props.inActiveBrands,
        title: trans("Inactive Partners"),
        iconClass: "ti ti-thumb-up"
      }
    ];
    const form = useForm({
      url: "",
      status: "1",
      type: "partner",
      image: ""
    });
    const isProcessing = ref(false);
    const editPartnerForm = ref({});
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[--><main class="container flex-grow p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Partners",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: brandsOverviews,
        grid: "3"
      }, null, _parent));
      _push(`<div class="row"><div class="col"><div class="card"><div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Image"))}</th><th>${ssrInterpolate(unref(trans)("Url"))}</th><th>${ssrInterpolate(unref(trans)("Type"))}</th><th>${ssrInterpolate(unref(trans)("Status"))}</th><th>${ssrInterpolate(unref(trans)("Created At"))}</th><th class="!text-right">${ssrInterpolate(unref(trans)("Action"))}</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.brands.data, (row) => {
        _push(`<tr><td class="text-left"><img${ssrRenderAttrs(mergeProps({ class: "avatar rounded-square w-70-per" }, ssrGetDirectiveProps(_ctx, _directive_lazy, row.slug)))}></td><td class="text-left">${ssrInterpolate(row.title)}</td><td class="text-left">${ssrInterpolate(row.lang == "en" ? "Partner" : row.lang)}</td><td class="text-left"><span class="${ssrRenderClass([row.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(row.status == 1 ? unref(trans)("Active") : unref(trans)("Draft"))}</span></td><td>${ssrInterpolate(unref(moment)(row.created_at).format("D-MMM-Y"))}</td><td><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item"><button class="dropdown-link"><i class="h-5 text-slate-400" data-feather="edit"></i><span>${ssrInterpolate(unref(trans)("Edit"))}</span></button></li><li class="dropdown-list-item"><button class="dropdown-link"><i class="h-5 text-slate-400" data-feather="trash-2">${ssrInterpolate(unref(trans)("Remove"))}&gt;</i><span>${ssrInterpolate(unref(trans)("Delete"))}</span></button></li></ul></div></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table>`);
      if (__props.brands.total == 0) {
        _push(ssrRenderComponent(_sfc_main$2u, {
          type: "info",
          text: unref(trans)("Opps you have not created any plan....")
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></div></main><div id="addNewPartnerDrawer" class="drawer drawer-right"><form><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Add New Partner"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Brand Url"))}</label><input type="text" name="url"${ssrRenderAttr("value", unref(form).url)} class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Brand image"))}</label><input type="file" accept="image/*" name="image" required class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Type"))}</label><select class="select" name="type"><option value="partner">${ssrInterpolate(unref(trans)("Partner / Brand"))}</option><option value="integration">${ssrInterpolate(unref(trans)("Integration Partner"))}</option></select></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Status"))}</label><select class="select" name="status"><option value="1">${ssrInterpolate(unref(trans)("Active"))}</option><option value="0">${ssrInterpolate(unref(trans)("InActive"))}</option></select></div></div><div class="drawer-footer"><div class="flex justify-end gap-2"><button type="button" class="btn btn-secondary" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(form).processing,
        "btn-text": unref(trans)("Create")
      }, null, _parent));
      _push(`</div></div></form></div><div id="editPartnerDrawer" class="drawer drawer-right"><form><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Edit Partner"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Brand Url"))}</label><input type="text" name="url"${ssrRenderAttr("value", editPartnerForm.value.title)} class="input" id="url"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Brand image"))}</label><input type="file" name="image" accept="image/*" class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Type"))}</label><select class="select" name="type" id="type" required><option value="partner">${ssrInterpolate(unref(trans)("Partner / Brand"))}</option><option value="integration">${ssrInterpolate(unref(trans)("Integration Partner"))}</option></select></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Status"))}</label><select class="select" name="status" id="status"><option value="1">${ssrInterpolate(unref(trans)("Active"))}</option><option value="0">${ssrInterpolate(unref(trans)("InActive"))}</option></select></div></div><div class="drawer-footer"><div class="flex justify-end gap-2"><button type="button" class="btn btn-secondary" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: isProcessing.value,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></form></div><!--]-->`);
    };
  }
});
const _sfc_setup$2j = _sfc_main$2j.setup;
_sfc_main$2j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Brand/Index.vue");
  return _sfc_setup$2j ? _sfc_setup$2j(props, ctx) : void 0;
};
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2j
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1T = {
  layout: _sfc_main$2y
};
const _sfc_main$2i = /* @__PURE__ */ Object.assign(__default__$1T, {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["segments", "buttons", "jobs"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Cron Jobs" }, null, _parent));
      _push(`<main class="container flex-grow p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Cron Jobs"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><!--[-->`);
      ssrRenderList(__props.jobs, (job) => {
        _push(`<div class="row"><div class="col-12"><div class="card"><div class="card-body"><div class="flex items-center space-x-5"><h6 class="card-title">${ssrInterpolate(job.title)}</h6><p class="text-green-900 dark:text-primary-50">(${ssrInterpolate(job.time)})</p></div><div class="code-viewer mt-4 rounded-lg p-4"><code>${ssrInterpolate(job.url)}</code></div></div></div></div></div>`);
      });
      _push(`<!--]--></div></main><!--]-->`);
    };
  }
});
const _sfc_setup$2i = _sfc_main$2i.setup;
_sfc_main$2i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Cron/Index.vue");
  return _sfc_setup$2i ? _sfc_setup$2i(props, ctx) : void 0;
};
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2i
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1S = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$2h = /* @__PURE__ */ Object.assign(__default__$1S, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "customers",
    "totalCustomer",
    "totalActiveCustomer",
    "totalInActiveCustomer"
  ],
  setup(__props) {
    const props = __props;
    sharedComposable();
    onMounted(() => {
      drawer.init();
    });
    const investorStats = [
      { value: props.totalCustomer, title: trans("Total Customer"), iconClass: "ti ti-list" },
      {
        value: props.totalActiveCustomer,
        title: trans("Active Customer"),
        iconClass: "ti ti-thumb-up"
      },
      {
        value: props.totalInActiveCustomer,
        title: trans("InActive Customer"),
        iconClass: "ti ti-thumb-down"
      }
    ];
    const editForm = ref({
      processing: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[--><main class="flex-grow p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, null, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: investorStats,
        grid: "3"
      }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Customer"))}</th><th>${ssrInterpolate(unref(trans)("Email"))}</th><th>${ssrInterpolate(unref(trans)("Email Verified"))}</th><th>${ssrInterpolate(unref(trans)("KYC Verified"))}</th><th class="text-right">${ssrInterpolate(unref(trans)("Status"))}</th><th class="flex justify-end">${ssrInterpolate(unref(trans)("Action"))}</th></tr></thead>`);
      if (__props.customers.data.length) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.customers.data, (customer) => {
          _push(`<tr><td>`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("admin.customers.show", customer.id),
            class: "flex items-center gap-1"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img${ssrRenderAttrs(mergeProps({ class: "avatar mr-3 rounded-full" }, ssrGetDirectiveProps(
                  _ctx,
                  _directive_lazy,
                  customer.preview == null ? `https://ui-avatars.com/api/?name=${customer.name}` : `${customer.preview}`
                )))}${_scopeId}> ${ssrInterpolate(customer.name)}`);
              } else {
                return [
                  withDirectives(createVNode("img", { class: "avatar mr-3 rounded-full" }, null, 512), [
                    [
                      _directive_lazy,
                      customer.preview == null ? `https://ui-avatars.com/api/?name=${customer.name}` : `${customer.preview}`
                    ]
                  ]),
                  createTextVNode(" " + toDisplayString(customer.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td>${ssrInterpolate(customer.email)}</td><td>`);
          if (customer.email_verified_at) {
            _push(`<span class="badge badge-success">${ssrInterpolate(unref(trans)("Verified"))}</span>`);
          } else {
            _push(`<span class="badge badge-danger">${ssrInterpolate(unref(trans)("Unverified"))}</span>`);
          }
          _push(`</td><td>`);
          if (customer.kyc_verified_at) {
            _push(`<span class="badge badge-success">${ssrInterpolate(unref(trans)("Verified"))}</span>`);
          } else {
            _push(`<span class="badge badge-danger">${ssrInterpolate(unref(trans)("Unverified"))}</span>`);
          }
          _push(`</td><td class="text-right"><span class="${ssrRenderClass([customer.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(customer.status == 1 ? unref(trans)("Active") : unref(trans)("Inactive"))}</span></td><td><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item">`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("admin.customers.show", customer.id),
            class: "dropdown-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="h-5 text-slate-400" data-feather="eye"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(unref(trans)("View"))}</span>`);
              } else {
                return [
                  createVNode("i", {
                    class: "h-5 text-slate-400",
                    "data-feather": "eye"
                  }),
                  createVNode("span", null, toDisplayString(unref(trans)("View")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li><li class="dropdown-list-item"><button class="dropdown-link"><i class="h-5 text-slate-400" data-feather="edit"></i><span>${ssrInterpolate(unref(trans)("Edit"))}</span></button></li><li class="dropdown-list-item"><button type="button" class="dropdown-link"><i class="h-5 text-slate-400" data-feather="trash-2">${ssrInterpolate(unref(trans)("Remove"))}&gt;</i><span>${ssrInterpolate(unref(trans)("Delete"))}</span></button></li></ul></div></div></td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table></div>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.customers.links
      }, null, _parent));
      _push(`</div></main><div id="editCustomerDrawer" class="drawer drawer-right"><form><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Edit Customer"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Full Name"))}</label><input${ssrRenderAttr("value", editForm.value.name)} type="text" class="input" required></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Email"))}</label><input${ssrRenderAttr("value", editForm.value.email)} type="email" class="input" required></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Phone"))}</label><input${ssrRenderAttr("value", editForm.value.phone)} type="text" class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Address"))}</label><input${ssrRenderAttr("value", editForm.value.address)} type="text" class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Wallet balance"))}</label><input${ssrRenderAttr("value", editForm.value.wallet)} type="number" class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Password"))}</label><input${ssrRenderAttr("value", editForm.value.password)} type="text" class="input"></div><div class="my-2"><div><label for="email_verified_at" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(Array.isArray(editForm.value.email_verified_at) ? ssrLooseContain(editForm.value.email_verified_at, null) : editForm.value.email_verified_at) ? " checked" : ""} class="toggle-input peer sr-only" id="email_verified_at" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(unref(trans)("Email Verified?"))}</span></label></div></div><div class="my-2"><div><label for="kyc_verified_at" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(Array.isArray(editForm.value.kyc_verified_at) ? ssrLooseContain(editForm.value.kyc_verified_at, null) : editForm.value.kyc_verified_at) ? " checked" : ""} class="toggle-input peer sr-only" id="kyc_verified_at" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(unref(trans)("KYC Verified?"))}</span></label></div></div><div class="my-2"><div><label for="is_active" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(Array.isArray(editForm.value.status) ? ssrLooseContain(editForm.value.status, null) : editForm.value.status) ? " checked" : ""} class="toggle-input peer sr-only" id="is_active" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(unref(trans)("Active?"))}</span></label></div></div></div><div class="drawer-footer"><div class="flex justify-between gap-2"><button type="button" class="btn btn-secondary w-full" data-dismiss="drawer">${ssrInterpolate(unref(trans)("Close"))}</button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary w-full",
        processing: editForm.value.processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></form></div><!--]-->`);
    };
  }
});
const _sfc_setup$2h = _sfc_main$2h.setup;
_sfc_main$2h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Customers/Index.vue");
  return _sfc_setup$2h ? _sfc_setup$2h(props, ctx) : void 0;
};
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2h
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1R = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$2g = /* @__PURE__ */ Object.assign(__default__$1R, {
  __name: "Show",
  __ssrInlineRender: true,
  props: ["customer", "orders", "eventOrders"],
  setup(__props) {
    const props = __props;
    const { formatCurrency } = sharedComposable();
    const stats = [
      {
        value: props.orders.total + props.eventOrders.total,
        title: trans("Total Orders"),
        iconClass: "bx bx-cart"
      },
      {
        value: props.eventOrders.total,
        title: trans(" Total Event Booked"),
        iconClass: "bx bx-book"
      },
      {
        value: 0,
        title: trans("Total Invest Amount"),
        iconClass: "bx bx-dollar"
      },
      {
        value: formatCurrency(props.customer.wallet),
        title: trans("Wallet Balance"),
        iconClass: "bx bx-dollar"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: stats,
        grid: "4"
      }, null, _parent));
      _push(`<br><div class="card"><div class="card-body"><div class="grid grid-cols-4"><div class="col-span-1 h-full"><div class="flex h-full items-center justify-center"><img${ssrRenderAttrs(mergeProps({ class: "mr-3 h-32 rounded-full" }, ssrGetDirectiveProps(
        _ctx,
        _directive_lazy,
        __props.customer.preview == null ? `https://ui-avatars.com/api/?name=${__props.customer.name}` : `${__props.customer.preview}`
      )))}></div></div><div class="col-span-3"><div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><tbody><tr><th>${ssrInterpolate(unref(trans)("ID"))}</th><td>${ssrInterpolate(__props.customer.name)}</td><th>${ssrInterpolate(unref(trans)("Name"))}</th><td>${ssrInterpolate(__props.customer.name)}</td></tr><tr><th>${ssrInterpolate(unref(trans)("Username"))}</th><td>${ssrInterpolate(__props.customer.username)}</td><th>${ssrInterpolate(unref(trans)("Email"))}</th><td>${ssrInterpolate(__props.customer.email)}</td></tr><tr><th>${ssrInterpolate(unref(trans)("Phone"))}</th><td>${ssrInterpolate(__props.customer.phone ?? "NA")}</td><th>${ssrInterpolate(unref(trans)("Uplink"))}</th><td>`);
      if (__props.customer.uplink_id) {
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("admin.customers.show", __props.customer.uplink_id)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.customer.uplink.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.customer.uplink.name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<span>NA</span>`);
      }
      _push(`</td></tr><tr><th>${ssrInterpolate(unref(trans)("Status"))}</th><td><span class="${ssrRenderClass([__props.customer.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(__props.customer.status == 1 ? unref(trans)("Active") : unref(trans)("Inactive"))}</span></td><th>${ssrInterpolate(unref(trans)("Email verified at"))}</th><td>${ssrInterpolate(__props.customer.email_verified_at ? unref(moment)(__props.customer.email_verified_at).format("ddd DD, MMM, Y | hh:mm A") : "NA")}</td></tr><tr><th>${ssrInterpolate(unref(trans)("KYC verified at"))}</th><td>${ssrInterpolate(__props.customer.kyc_verified_at ? unref(moment)(__props.customer.kyc_verified_at).format("ddd DD, MMM, Y | hh:mm A") : "NA")}</td><th>${ssrInterpolate(unref(trans)("Registered At"))}</th><td>${ssrInterpolate(__props.customer.created_at ? unref(moment)(__props.customer.created_at).format("ddd DD, MMM, Y | hh:mm A") : "NA")}</td></tr></tbody></table></div></div></div></div></div><div class="my-5"><h4 class="m-2">${ssrInterpolate(unref(trans)("Orders"))}</h4><div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th class="w-[5%] uppercase">${ssrInterpolate(unref(trans)("Order No"))}</th><th class="w-[15%] uppercase">${ssrInterpolate(unref(trans)("Project Name"))}</th><th class="w-[10%] uppercase">${ssrInterpolate(unref(trans)("Payment Mode"))}</th><th class="w-[10%] uppercase">${ssrInterpolate(unref(trans)("Amount"))}</th><th class="w-[10%] uppercase">${ssrInterpolate(unref(trans)("Status"))}</th><th class="w-[10%] uppercase">${ssrInterpolate(unref(trans)("Created At"))}</th></tr></thead>`);
      if (__props.orders.total) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.orders.data, (order) => {
          var _a2;
          _push(`<tr><td>`);
          _push(ssrRenderComponent(_component_Link, {
            href: "/admin/order/" + order.id,
            class: "text-sm font-medium text-primary-500 transition duration-150 ease-in-out hover:underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(order.invoice_no)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(order.invoice_no), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td>${ssrInterpolate(order.project.title)}</td><td>${ssrInterpolate(((_a2 = order.gateway) == null ? void 0 : _a2.name) ?? "NA")}</td><td>${ssrInterpolate(unref(formatCurrency)(order.amount))}</td><td><div class="badge badge-soft-primary capitalize">${ssrInterpolate(unref(trans)(
            order.status == 2 ? "pending" : order.status == 1 ? "approved" : "declined"
          ))}</div></td><td class="text-center">${ssrInterpolate(order.created_at_diff)}</td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table></div>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.orders.links
      }, null, _parent));
      _push(`</div><div class="my-5"><h4 class="m-2">${ssrInterpolate(unref(trans)("Event Orders"))}</h4><div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th class="w-[5%] uppercase">${ssrInterpolate(unref(trans)("Order No"))}</th><th class="w-[15%] uppercase">${ssrInterpolate(unref(trans)("Event"))}</th><th class="w-[10%] uppercase">${ssrInterpolate(unref(trans)("Payment Mode"))}</th><th class="w-[10%] uppercase">${ssrInterpolate(unref(trans)("Amount"))}</th><th class="w-[10%] uppercase">${ssrInterpolate(unref(trans)("Status"))}</th><th class="w-[10%] uppercase">${ssrInterpolate(unref(trans)("Created At"))}</th></tr></thead>`);
      if (__props.eventOrders.total) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.eventOrders.data, (order) => {
          var _a2;
          _push(`<tr><td>`);
          _push(ssrRenderComponent(_component_Link, {
            href: "/admin/event-orders/" + order.id,
            class: "text-sm font-medium text-primary-500 transition duration-150 ease-in-out hover:underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(order.invoice_no)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(order.invoice_no), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td><a target="_blank"${ssrRenderAttr("href", _ctx.route("events.show", order.event.slug))}>${ssrInterpolate(order.event.title)}</a></td><td>${ssrInterpolate(((_a2 = order.gateway) == null ? void 0 : _a2.name) ?? "Free")}</td><td>${ssrInterpolate(unref(formatCurrency)(order.amount))}</td><td><div class="badge badge-soft-primary capitalize">${ssrInterpolate(unref(trans)(
            order.status == 2 ? "pending" : order.status == 1 ? "approved" : "declined"
          ))}</div></td><td class="text-center">${ssrInterpolate(order.created_at_diff)}</td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table></div>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.eventOrders.links
      }, null, _parent));
      _push(`</div></main>`);
    };
  }
});
const _sfc_setup$2g = _sfc_main$2g.setup;
_sfc_main$2g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Customers/Show.vue");
  return _sfc_setup$2g ? _sfc_setup$2g(props, ctx) : void 0;
};
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2g
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1Q = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$2f = /* @__PURE__ */ Object.assign(__default__$1Q, {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: [
    "totalInvest",
    "totalProfit",
    "totalDeposits",
    "totalRefers",
    "profitOverview",
    "recentDeposits",
    "recentInvests",
    "depositOverview",
    "totalUsers",
    "totalProjects",
    "totalCommissions",
    "totalLosses",
    "recentEvents",
    "pieChartData",
    "request"
  ],
  setup(__props) {
    var _a2, _b2, _c;
    const props = __props;
    const { formatCurrency, textExcerpt, pickBy } = sharedComposable();
    const primaryOverview = computed(() => {
      return [
        {
          title: "Total Project",
          value: props.totalProjects,
          icon: "bx bx-memory-card",
          classes: "bg-yellow-500 text-yellow-500"
        },
        {
          title: "Total Invest",
          value: props.totalInvest,
          icon: "bx bx-box",
          classes: "bg-primary-500 text-primary-500"
        },
        {
          title: "Total Profit",
          value: props.totalProfit,
          icon: "bx bx-dollar-circle",
          classes: "text-success-500 bg-success-500"
        },
        {
          title: "Total Deposits",
          value: props.totalDeposits,
          icon: "bx bxs-receipt",
          classes: "text-warning-500 bg-warning-500"
        },
        {
          title: "Total Refers",
          value: props.totalRefers,
          icon: "bx bx-group",
          classes: "text-info-500 bg-info-500"
        },
        {
          title: "Total Loss",
          value: props.totalLosses,
          icon: "bx bx-dollar",
          classes: "text-red-500 bg-red-500"
        },
        {
          title: "Total Users",
          value: props.totalUsers,
          icon: "bx bx-user",
          classes: "text-info-500 bg-info-500"
        },
        {
          title: "Total Commissions",
          value: props.totalCommissions,
          icon: "bx bx-money-withdraw",
          classes: "text-blue-500 bg-blue-500"
        }
      ];
    });
    const filterForm = ref({
      returns: ((_a2 = props.request) == null ? void 0 : _a2.returns) || "",
      deposit: ((_b2 = props.request) == null ? void 0 : _b2.deposit) || "",
      pie: ((_c = props.request) == null ? void 0 : _c.deposit) || ""
    });
    const profitChart = computed(() => {
      return {
        series: [
          {
            name: "Profits",
            data: props.profitOverview.map((item) => item.profits.toFixed(2))
          },
          {
            name: "Losses",
            data: props.profitOverview.map((item) => item.losses.toFixed(2))
          }
        ],
        chartOptions: {
          colors: ["#69ae84", "#E32A3A"],
          chart: {
            height: 350,
            type: "area",
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "smooth"
          },
          xaxis: {
            type: "string",
            categories: props.profitOverview.map((item) => item.date)
          }
        }
      };
    });
    const depositChart = computed(() => {
      return {
        series: [
          {
            name: "Deposits",
            data: props.depositOverview.map((item) => item.deposit.toFixed(2))
          }
        ],
        chartOptions: {
          colors: ["#69ae84"],
          chart: {
            height: 360,
            type: "area",
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "smooth"
          },
          xaxis: {
            type: "string",
            categories: props.depositOverview.map((item) => item.date)
          }
        }
      };
    });
    const detailsChart = computed(() => {
      return {
        series: [
          props.pieChartData["invest"],
          props.pieChartData["deposits"],
          props.pieChartData["commissions"]
        ],
        chartOptions: {
          chart: {
            type: "donut"
          },
          height: 160,
          labels: ["Invest", "Deposits", "Commissions"],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        }
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a3, _b3, _c2;
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: _ctx.trans("Dashboard")
      }, null, _parent));
      _push(`<div class="space-y-6"><section class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"><!--[-->`);
      ssrRenderList(primaryOverview.value, (item, index) => {
        _push(`<div class="card"><div class="card-body flex items-center gap-4"><div class="${ssrRenderClass([item.classes, "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-opacity-20"])}"><i class="${ssrRenderClass([item.icon, "text-3xl"])}"></i></div><div class="flex flex-1 flex-col gap-1"><p class="text-sm tracking-wide text-slate-500">${ssrInterpolate(item.title)}</p><div class="flex flex-wrap items-baseline justify-between gap-2"><h4>${ssrInterpolate(item.value)}</h4></div></div></div></div>`);
      });
      _push(`<!--]--></section><section class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"><div class="card order-2 col-span-1 md:col-span-2 xl:order-3"><div class="card-body gap-4"><div class="flex flex-wrap justify-between gap-2"><h6>${ssrInterpolate(_ctx.trans("Overview Of Investment Returns"))}</h6><select class="select select-xl w-full md:w-40"><option value="" selected>${ssrInterpolate(_ctx.trans("Filter By"))}</option><!--[-->`);
      ssrRenderList(["day", "week", "month", "year"], (item) => {
        _push(`<option class="capitalize"${ssrRenderAttr("value", item)}${ssrIncludeBooleanAttr(filterForm.value.returns === item) ? " selected" : ""}>${ssrInterpolate(item)}</option>`);
      });
      _push(`<!--]--></select></div><div class="min-h-min">`);
      _push(ssrRenderComponent(unref(VueApexCharts), {
        type: "area",
        height: "350",
        options: profitChart.value.chartOptions,
        series: profitChart.value.series
      }, null, _parent));
      _push(`</div></div></div><div class="order-4 col-span-full space-y-6 xl:col-span-1"><div class="card"><div class="card-body gap-4"><div class="flex flex-wrap justify-between gap-2"><h6>${ssrInterpolate(_ctx.trans("User Deposits"))}</h6><select class="select select-xl w-full md:w-40"><option value="" selected>${ssrInterpolate(_ctx.trans("Filter By"))}</option><!--[-->`);
      ssrRenderList(["day", "week", "month", "year"], (item) => {
        _push(`<option class="capitalize"${ssrRenderAttr("value", item)}${ssrIncludeBooleanAttr(filterForm.value.deposit === item) ? " selected" : ""}>${ssrInterpolate(item)}</option>`);
      });
      _push(`<!--]--></select></div><div class="min-h-min">`);
      _push(ssrRenderComponent(unref(VueApexCharts), {
        type: "area",
        height: "360",
        options: depositChart.value.chartOptions,
        series: depositChart.value.series
      }, null, _parent));
      _push(`</div></div></div></div></section><section class="grid grid-cols-1 place-items-start gap-6 md:grid-cols-2 xl:grid-cols-3"><div class="card col-span-1 md:col-span-2"><div class="card-body space-y-2"><h6>${ssrInterpolate(_ctx.trans("Recent Events"))}</h6>`);
      if (((_a3 = __props.recentEvents) == null ? void 0 : _a3.length) > 0) {
        _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(_ctx.trans("Name"))}</th><th>${ssrInterpolate(_ctx.trans("Date"))}</th><th>${ssrInterpolate(_ctx.trans("Location"))}</th><th>${ssrInterpolate(_ctx.trans("Total Seat"))}</th><th>${ssrInterpolate(_ctx.trans("Status"))}</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(__props.recentEvents, (event) => {
          _push(`<tr><td class="flex items-center"><a target="_blank"${ssrRenderAttr("href", _ctx.route("events.show", event.slug))} class="flex items-center gap-2"><img${ssrRenderAttrs(mergeProps({ class: "avatar mr-1 rounded" }, ssrGetDirectiveProps(_ctx, _directive_lazy, event.preview)))}> ${ssrInterpolate(unref(textExcerpt)(event.title, 20))} `);
          if (event.is_free) {
            _push(`<span class="badge badge-success"> ( ${ssrInterpolate(_ctx.trans("Free"))}) </span>`);
          } else {
            _push(`<span class="badge badge-primary"> (${ssrInterpolate(_ctx.trans("Fee:"))} ${ssrInterpolate(unref(formatCurrency)(event.fee_amount))}) </span>`);
          }
          _push(`</a></td><td>${ssrInterpolate(unref(moment)(event.start_at).format("DD MMM, Y"))}</td><td>${ssrInterpolate(unref(textExcerpt)(event.location, 20))}</td><td>${ssrInterpolate(event.total_seat)}</td><td class="text-right"><span class="${ssrRenderClass([event.is_active == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(event.is_active == 1 ? _ctx.trans("Active") : _ctx.trans("Draft"))}</span></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2u, { text: "Nothing found..." }, null, _parent));
      }
      _push(`</div></div><div class="card col-span-full xl:col-span-1"><div class="card-body space-y-2"><div class="flex flex-wrap justify-between gap-2"><h6>${ssrInterpolate(_ctx.trans("Invest"))}, ${ssrInterpolate(_ctx.trans("Deposits"))}, ${ssrInterpolate(_ctx.trans("Commissions"))}</h6><select class="select select-xl w-full md:w-40"><option value="" selected>${ssrInterpolate(_ctx.trans("Filter By"))}</option><!--[-->`);
      ssrRenderList(["week", "month", "year"], (item) => {
        _push(`<option class="capitalize"${ssrRenderAttr("value", item)}${ssrIncludeBooleanAttr(filterForm.value.pie === item) ? " selected" : ""}>${ssrInterpolate(item)}</option>`);
      });
      _push(`<!--]--></select></div>`);
      _push(ssrRenderComponent(unref(VueApexCharts), {
        height: "160",
        type: "donut",
        options: detailsChart.value.chartOptions,
        series: detailsChart.value.series
      }, null, _parent));
      _push(`</div></div></section><section class="grid grid-cols-1 place-items-start gap-6 md:grid-cols-2 xl:grid-cols-3"><div class="card col-span-1 md:col-span-2"><div class="card-body space-y-2"><h6>${ssrInterpolate(_ctx.trans("Recent Invests"))}</h6>`);
      if (((_b3 = __props.recentInvests) == null ? void 0 : _b3.length) > 0) {
        _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(_ctx.trans("Invoice"))}</th><th>${ssrInterpolate(_ctx.trans("Project"))}</th><th>${ssrInterpolate(_ctx.trans("Duration"))}</th><th>${ssrInterpolate(_ctx.trans("Amount"))}</th><th>${ssrInterpolate(_ctx.trans("QTY"))}</th><th>${ssrInterpolate(_ctx.trans("Status"))}</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(__props.recentInvests, (investment) => {
          var _a4, _b4;
          _push(`<tr><td>${ssrInterpolate(investment == null ? void 0 : investment.invoice_no)}</td><td class="flex items-center"><img${ssrRenderAttrs(mergeProps({ class: "avatar mr-2 rounded" }, ssrGetDirectiveProps(_ctx, _directive_lazy, (_a4 = investment == null ? void 0 : investment.project_duration) == null ? void 0 : _a4.project.preview)))}><p>${ssrInterpolate((_b4 = investment == null ? void 0 : investment.project_duration) == null ? void 0 : _b4.project.title)}</p></td><td>${ssrInterpolate(investment == null ? void 0 : investment.project_duration.duration)}/${ssrInterpolate(investment == null ? void 0 : investment.project_duration.duration_type)}</td><td>${ssrInterpolate(unref(formatCurrency)(investment.amount))}</td><td>${ssrInterpolate(investment.qty)}</td><td class="text-left"><span class="${ssrRenderClass([investment.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(investment.status == 0 ? _ctx.trans("Declined") : investment.status == 1 ? _ctx.trans("Active") : _ctx.trans("Pending"))}</span></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2u, { text: "Nothing found..." }, null, _parent));
      }
      _push(`</div></div><div class="card col-span-1"><div class="card-body space-y-2"><h6>${ssrInterpolate(_ctx.trans("Recent Deposits"))}</h6>`);
      if (((_c2 = __props.recentDeposits) == null ? void 0 : _c2.length) > 0) {
        _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(_ctx.trans("Invoice No"))}</th><th>${ssrInterpolate(_ctx.trans("Trx"))}</th><th>${ssrInterpolate(_ctx.trans("Amount"))}</th><th>${ssrInterpolate(_ctx.trans("Status"))}</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(__props.recentDeposits, (history) => {
          _push(`<tr><td>${ssrInterpolate(history.invoice_no)}</td><td>${ssrInterpolate(history.payment_id)}</td><td>${ssrInterpolate(unref(formatCurrency)(history.amount))}</td><td class="text-left"><span class="${ssrRenderClass([history.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(history.status == 1 ? _ctx.trans("Active") : _ctx.trans("Draft"))}</span></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2u, { text: "Nothing found..." }, null, _parent));
      }
      _push(`</div></div></section></div></main>`);
    };
  }
});
const _sfc_setup$2f = _sfc_main$2f.setup;
_sfc_main$2f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard.vue");
  return _sfc_setup$2f ? _sfc_setup$2f(props, ctx) : void 0;
};
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2f
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1P = {
  layout: _sfc_main$2y
};
const _sfc_main$2e = /* @__PURE__ */ Object.assign(__default__$1P, {
  __name: "App",
  __ssrInlineRender: true,
  props: [
    "segments",
    "buttons",
    "id",
    "tzlist",
    "languages",
    "appName",
    "appDebug",
    "timeZone",
    "default_lang"
  ],
  setup(__props) {
    const props = __props;
    const form = useForm({
      APP_NAME: props.appName,
      APP_DEBUG: props.appDebug,
      TIME_ZONE: props.timeZone,
      DEFAULT_LANG: props.default_lang
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Dashboard"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="grid grid-cols-1 lg:grid-cols-12"><div class="lg:col-span-5"><strong>${ssrInterpolate(unref(trans)("Application Settings"))}</strong><p>${ssrInterpolate(unref(trans)("Edit you application global settings"))}</p></div><div class="lg:col-span-7"><form><div class="card"><div class="card-body"><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Application Name"))}</label><input type="text" name="name"${ssrRenderAttr("value", unref(form).APP_NAME)} required="" class="input"></div><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Visibility Of Site Error"))}</label><select class="select" name="app_debug"><option value="true">${ssrInterpolate(unref(trans)("Enable"))}</option><option value="false">${ssrInterpolate(unref(trans)("Disable"))}</option></select></div><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Application Time Zone"))}</label><select class="select" name="timezone"><!--[-->`);
      ssrRenderList(__props.tzlist, (timezone, index) => {
        _push(`<option${ssrRenderAttr("value", timezone)}>${ssrInterpolate(timezone)}</option>`);
      });
      _push(`<!--]--></select></div><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Application Default Language"))}</label><select class="select" name="default_lang"><!--[-->`);
      ssrRenderList(__props.languages, (langauge, langKey) => {
        _push(`<option${ssrRenderAttr("value", langKey)}>${ssrInterpolate(langauge)}</option>`);
      });
      _push(`<!--]--></select></div><div class="mt-3">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        processing: unref(form).processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></div></form></div></div></div></main>`);
    };
  }
});
const _sfc_setup$2e = _sfc_main$2e.setup;
_sfc_main$2e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Developer/App.vue");
  return _sfc_setup$2e ? _sfc_setup$2e(props, ctx) : void 0;
};
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2e
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2d = {
  __name: "SpinnerBtn",
  __ssrInlineRender: true,
  props: {
    processing: Boolean,
    btnText: {
      type: String,
      default: "Save"
    },
    classes: {
      type: String,
      default: "btn btn-primary flex items-center"
      // for admin end default btn
    },
    size: {
      type: Number,
      default: 30
    }
  },
  setup(__props) {
    const props = __props;
    const defaultClasses = computed(() => {
      return location.pathname.startsWith("/admin") ? "btn btn-primary flex items-center" : "tp-btn d-flex align-items-center justify-content-center";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "submit",
        class: __props.classes == "" ? defaultClasses.value : __props.classes,
        disabled: props.processing
      }, _attrs))}>`);
      if (props.processing || false) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="rotate(0 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fff"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9285714285714286s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(25.714285714285715 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fff"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8571428571428571s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(51.42857142857143 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fff"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.7857142857142857s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(77.14285714285714 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fff"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.7142857142857143s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(102.85714285714286 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fff"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6428571428571429s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(128.57142857142858 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fff"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5714285714285714s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(154.28571428571428 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fff"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(180 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fff"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.42857142857142855s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(205.71428571428572 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fff"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.35714285714285715s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(231.42857142857142 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fff"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.2857142857142857s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(257.14285714285717 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fff"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.21428571428571427s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(282.85714285714283 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fff"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.14285714285714285s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(308.57142857142856 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fff"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.07142857142857142s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(334.2857142857143 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fff"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate></rect></g></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span>${props.btnText}</span></button>`);
    };
  }
};
const _sfc_setup$2d = _sfc_main$2d.setup;
_sfc_main$2d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/SpinnerBtn.vue");
  return _sfc_setup$2d ? _sfc_setup$2d(props, ctx) : void 0;
};
const __default__$1O = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$2c = /* @__PURE__ */ Object.assign(__default__$1O, {
  __name: "Cookie",
  __ssrInlineRender: true,
  props: ["segments", "id", "COOKIE_CONSENT", "cookieData"],
  setup(__props) {
    const props = __props;
    const form = useForm({
      COOKIE_CONSENT: props.COOKIE_CONSENT,
      cookieData: props.cookieData
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: _ctx.trans("Cookie Settings")
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="grid grid-cols-1 lg:grid-cols-12"><div class="lg:col-span-5"><strong>${ssrInterpolate(_ctx.trans("Cookie Settings"))}</strong><p>${ssrInterpolate(_ctx.trans("Edit cookie settings"))}</p></div><div class="lg:col-span-7"><form><div class="card"><div class="card-body"><div class="mb-2"><label class="label mb-1">${ssrInterpolate(_ctx.trans("Cookie Permission"))}</label><select class="select"><option${ssrRenderAttr("value", true)}>${ssrInterpolate(_ctx.trans("Enable"))}</option><option${ssrRenderAttr("value", false)}>${ssrInterpolate(_ctx.trans("Disable"))}</option></select></div><div class="mb-2"><label class="label mb-1">${ssrInterpolate(_ctx.trans("Title"))}</label><input type="text"${ssrRenderAttr("value", unref(form).cookieData.title)} required class="input"></div><div class="mb-2"><label class="label mb-1">${ssrInterpolate(_ctx.trans("Intro"))}</label><textarea required class="textarea">${ssrInterpolate(unref(form).cookieData.intro)}</textarea></div><div class="mb-2"><label class="label mb-1">${ssrInterpolate(_ctx.trans("Essentials btn text"))}</label><input type="text"${ssrRenderAttr("value", unref(form).cookieData.essentials)} required class="input"></div><div class="mb-2"><label class="label mb-1">${ssrInterpolate(_ctx.trans("Accept all btn text"))}</label><input type="text"${ssrRenderAttr("value", unref(form).cookieData.all)} required class="input"></div><div class="mt-3">`);
      _push(ssrRenderComponent(_sfc_main$2d, {
        processing: unref(form).processing,
        "btn-text": _ctx.trans("Save Changes")
      }, null, _parent));
      _push(`</div></div></div></form></div></div></div></main>`);
    };
  }
});
const _sfc_setup$2c = _sfc_main$2c.setup;
_sfc_main$2c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Developer/Cookie.vue");
  return _sfc_setup$2c ? _sfc_setup$2c(props, ctx) : void 0;
};
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2c
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1N = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$2b = /* @__PURE__ */ Object.assign(__default__$1N, {
  __name: "Features",
  __ssrInlineRender: true,
  props: [
    "id",
    "EMAIL_VERIFICATION",
    "KYC_VERIFICATION"
  ],
  setup(__props) {
    const props = __props;
    const form = useForm({
      EMAIL_VERIFICATION: props.EMAIL_VERIFICATION,
      PHONE_VERIFICATION: props.PHONE_VERIFICATION,
      KYC_VERIFICATION: props.KYC_VERIFICATION
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: _ctx.trans("Features Settings")
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="grid grid-cols-1 lg:grid-cols-12"><div class="lg:col-span-5"><strong>${ssrInterpolate(_ctx.trans("Features Settings"))}</strong><p>${ssrInterpolate(_ctx.trans("Edit Features settings"))}</p></div><div class="lg:col-span-7"><form><div class="card"><div class="card-body"><div class="mb-2"><label class="label mb-1">${ssrInterpolate(_ctx.trans("EMAIL VERIFICATION"))}</label><select class="select"><option${ssrRenderAttr("value", true)}>${ssrInterpolate(_ctx.trans("Enable"))}</option><option${ssrRenderAttr("value", false)}>${ssrInterpolate(_ctx.trans("Disable"))}</option></select></div><div class="mb-2"><label class="label mb-1">${ssrInterpolate(_ctx.trans("KYC VERIFICATION"))}</label><select class="select"><option${ssrRenderAttr("value", true)}>${ssrInterpolate(_ctx.trans("Enable"))}</option><option${ssrRenderAttr("value", false)}>${ssrInterpolate(_ctx.trans("Disable"))}</option></select></div><div class="mt-3">`);
      _push(ssrRenderComponent(_sfc_main$2d, {
        processing: unref(form).processing,
        "btn-text": _ctx.trans("Save Changes")
      }, null, _parent));
      _push(`</div></div></div></form></div></div></div></main>`);
    };
  }
});
const _sfc_setup$2b = _sfc_main$2b.setup;
_sfc_main$2b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Developer/Features.vue");
  return _sfc_setup$2b ? _sfc_setup$2b(props, ctx) : void 0;
};
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2b
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1M = {
  layout: _sfc_main$2y
};
const _sfc_main$2a = /* @__PURE__ */ Object.assign(__default__$1M, {
  __name: "Newsletter",
  __ssrInlineRender: true,
  props: [
    "segments",
    "buttons",
    "id",
    "NEWSLETTER_API_KEY",
    "NEWSLETTER_LIST_ID"
  ],
  setup(__props) {
    const props = __props;
    const form = useForm({
      NEWSLETTER_API_KEY: props.NEWSLETTER_API_KEY,
      NEWSLETTER_LIST_ID: props.NEWSLETTER_LIST_ID
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Head), { title: "Newsletter Settings" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: _ctx.trans("Newsletter Settings"),
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="grid grid-cols-1 lg:grid-cols-12"><div class="lg:col-span-5"><strong>${ssrInterpolate(_ctx.trans("Newsletter Developer Settings (mailchimp)"))}</strong><p>${ssrInterpolate(_ctx.trans("Edit you application Newsletter Api settings"))}</p></div><div class="lg:col-span-7"><form><div class="card"><div class="card-body"><div class="mb-2"><label class="label">${ssrInterpolate(_ctx.trans("Newsletter Api Key"))}</label><input type="text"${ssrRenderAttr("value", unref(form).NEWSLETTER_API_KEY)} class="input"></div><div class="mb-2"><label class="label">${ssrInterpolate(_ctx.trans("Newsletter List ID"))}</label><input type="text"${ssrRenderAttr("value", unref(form).NEWSLETTER_LIST_ID)} class="input"></div><div class="mt-3">`);
      _push(ssrRenderComponent(_sfc_main$2d, {
        processing: unref(form).processing,
        "btn-text": _ctx.trans("Save Changes")
      }, null, _parent));
      _push(`</div></div></div></form></div></div></div></main>`);
    };
  }
});
const _sfc_setup$2a = _sfc_main$2a.setup;
_sfc_main$2a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Developer/Newsletter.vue");
  return _sfc_setup$2a ? _sfc_setup$2a(props, ctx) : void 0;
};
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2a
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1L = {
  layout: _sfc_main$2y
};
const _sfc_main$29 = /* @__PURE__ */ Object.assign(__default__$1L, {
  __name: "Smtp",
  __ssrInlineRender: true,
  props: [
    "id",
    "mailDriver",
    "segments",
    "buttons",
    "QUEUE_MAIL",
    "MAIL_DRIVER_TYPE",
    "MAIL_HOST",
    "MAIL_PORT",
    "MAIL_USERNAME",
    "MAIL_PASSWORD",
    "MAIL_ENCRYPTION",
    "MAIL_FROM_ADDRESS",
    "MAIL_FROM_NAME",
    "MAIL_TO"
  ],
  setup(__props) {
    const props = __props;
    const form = useForm({
      QUEUE_MAIL: props.QUEUE_MAIL,
      MAIL_DRIVER_TYPE: props.MAIL_DRIVER_TYPE,
      MAIL_DRIVER: props.mailDriver,
      MAIL_HOST: props.MAIL_HOST,
      MAIL_PORT: props.MAIL_PORT,
      MAIL_USERNAME: props.MAIL_USERNAME,
      MAIL_PASSWORD: props.MAIL_PASSWORD,
      MAIL_ENCRYPTION: props.MAIL_ENCRYPTION,
      MAIL_FROM_ADDRESS: props.MAIL_FROM_ADDRESS,
      MAIL_FROM_NAME: props.MAIL_FROM_NAME,
      MAIL_TO: props.MAIL_TO
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Head), { title: "SMTP Settings" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("SMTP MAIL Settings"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="grid grid-cols-1 lg:grid-cols-12"><div class="lg:col-span-5"><strong>${ssrInterpolate(unref(trans)("SMTP mail Settings"))}</strong><p>${ssrInterpolate(unref(trans)("Edit you smtp settings for mail transaction"))}</p></div><div class="lg:col-span-7"><form><div class="card"><div class="card-body"><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Use Queue Job For Mail Transaction?"))}</label><select name="QUEUE_MAIL" class="select"><option value="true">${ssrInterpolate(unref(trans)("Enable"))}</option><option value="false">${ssrInterpolate(unref(trans)("Disable"))}</option></select></div><div class="from-group row"><label class="label">${ssrInterpolate(unref(trans)("Mail driver type"))}</label><select name="MAIL_DRIVER_TYPE" class="select"><option value="MAIL_MAILER">${ssrInterpolate(unref(trans)("MAIL MAILER"))}</option><option value="MAIL_DRIVER">${ssrInterpolate(unref(trans)("MAIL DRIVER"))}</option></select></div><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Mail Driver"))}</label><select name="MAIL_DRIVER" class="select"><option value="sendmail">${ssrInterpolate(unref(trans)("sendmail"))}</option><option value="smtp">${ssrInterpolate(unref(trans)("smtp"))}</option></select></div><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Mail Host"))}</label><input type="text" name="MAIL_HOST"${ssrRenderAttr("value", unref(form).MAIL_HOST)} class="input" required=""></div><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Mail Port"))}</label><input type="text"${ssrRenderAttr("value", unref(form).MAIL_PORT)} name="MAIL_PORT" class="input" required=""></div><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Mail Username"))}</label><input type="text"${ssrRenderAttr("value", unref(form).MAIL_USERNAME)} name="MAIL_USERNAME" class="input" required=""></div><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Mail Password"))}</label><input type="text"${ssrRenderAttr("value", unref(form).MAIL_PASSWORD)} name="MAIL_PASSWORD" class="input" required=""></div><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Mail Encryption"))}</label><select name="MAIL_ENCRYPTION" class="select"><option value="ssl">${ssrInterpolate(unref(trans)("SSL"))}</option><option value="tls">${ssrInterpolate(unref(trans)("TLS"))}</option></select></div><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Mail From Address"))}</label><input type="email"${ssrRenderAttr("value", unref(form).MAIL_FROM_ADDRESS)} name="MAIL_FROM_ADDRESS" class="input" placeholder="email" required=""></div><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Mail From Name"))}</label><input type="text"${ssrRenderAttr("value", unref(form).MAIL_FROM_NAME)} name="MAIL_FROM_NAME" class="input" placeholder="Website Name" required=""></div><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Incoming Mail"))}</label><input type="email"${ssrRenderAttr("value", unref(form).MAIL_TO)} name="MAIL_TO" class="input" placeholder="email" required=""></div><div class="mb-2">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        processing: unref(form).processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></div></form></div></div></div></main>`);
    };
  }
});
const _sfc_setup$29 = _sfc_main$29.setup;
_sfc_main$29.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Developer/Smtp.vue");
  return _sfc_setup$29 ? _sfc_setup$29(props, ctx) : void 0;
};
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$29
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1K = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$28 = /* @__PURE__ */ Object.assign(__default__$1K, {
  __name: "SocialLogin",
  __ssrInlineRender: true,
  props: [
    "segments",
    "buttons",
    "id",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_REDIRECT_URL",
    "FACEBOOK_CLIENT_ID",
    "FACEBOOK_CLIENT_SECRET",
    "FACEBOOK_REDIRECT_URL"
  ],
  setup(__props) {
    const props = __props;
    const form = useForm({
      GOOGLE_CLIENT_ID: props.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: props.GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URL: props.GOOGLE_REDIRECT_URL,
      FACEBOOK_CLIENT_ID: props.FACEBOOK_CLIENT_ID,
      FACEBOOK_CLIENT_SECRET: props.FACEBOOK_CLIENT_SECRET,
      FACEBOOK_REDIRECT_URL: props.FACEBOOK_REDIRECT_URL
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Social Login Developer Settings"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="grid grid-cols-1 lg:grid-cols-12"><div class="lg:col-span-5"><strong>${ssrInterpolate(unref(trans)("Social Login Developer Settings"))}</strong><p>${ssrInterpolate(unref(trans)("Edit you application Social Login Api settings"))}</p></div><div class="lg:col-span-7"><form><div class="card"><div class="card-body"><h6>Google Api</h6><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Google Client ID"))}</label><input type="text"${ssrRenderAttr("value", unref(form).GOOGLE_CLIENT_ID)} class="input"></div><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Google Client Secret"))}</label><input type="text"${ssrRenderAttr("value", unref(form).GOOGLE_CLIENT_SECRET)} class="input"></div><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Google Redirect Url"))}</label><input type="text"${ssrRenderAttr("value", __props.GOOGLE_REDIRECT_URL)} disabled class="input"></div><div class="mt-3">`);
      _push(ssrRenderComponent(_sfc_main$2d, {
        processing: unref(form).processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></div><div class="mt-5 card"><div class="card-body"><h6>Facebook Graph Api</h6><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Facebook Client Id"))}</label><input type="text"${ssrRenderAttr("value", unref(form).FACEBOOK_CLIENT_ID)} class="input"></div><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Facebook Client Secret"))}</label><input type="text"${ssrRenderAttr("value", unref(form).FACEBOOK_CLIENT_SECRET)} class="input"></div><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Facebook Redirect Url"))}</label><input type="text"${ssrRenderAttr("value", __props.FACEBOOK_REDIRECT_URL)} disabled class="input"></div><div class="mt-3">`);
      _push(ssrRenderComponent(_sfc_main$2d, {
        processing: unref(form).processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></div></form></div></div></div></main>`);
    };
  }
});
const _sfc_setup$28 = _sfc_main$28.setup;
_sfc_main$28.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Developer/SocialLogin.vue");
  return _sfc_setup$28 ? _sfc_setup$28(props, ctx) : void 0;
};
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$28
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1J = {
  layout: _sfc_main$2y
};
const _sfc_main$27 = /* @__PURE__ */ Object.assign(__default__$1J, {
  __name: "Storage",
  __ssrInlineRender: true,
  props: [
    "id",
    "FILESYSTEM_DISK",
    "WAS_ACCESS_KEY_ID",
    "SECRET_ACCESS_KEY",
    "WAS_DEFAULT_REGION",
    "WAS_BUCKET",
    "WAS_ENDPOINT",
    "segments",
    "buttons"
  ],
  setup(__props) {
    const props = __props;
    const form = useForm({
      FILESYSTEM_DISK: props.FILESYSTEM_DISK,
      WAS_ACCESS_KEY_ID: props.WAS_ACCESS_KEY_ID,
      SECRET_ACCESS_KEY: props.SECRET_ACCESS_KEY,
      WAS_DEFAULT_REGION: props.WAS_DEFAULT_REGION,
      WAS_BUCKET: props.WAS_BUCKET,
      WAS_ENDPOINT: props.WAS_ENDPOINT
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Head), { title: "Storage" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Storage Settings"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="grid grid-cols-1 lg:grid-cols-12"><div class="lg:col-span-5"><strong>${ssrInterpolate(unref(trans)("Application Storage Settings"))}</strong><p>${ssrInterpolate(unref(trans)("Edit you storage settings for store uploaded files"))}</p></div><div class="lg:col-span-7"><form><div class="card"><div class="card-body"><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Storage Upload Mode"))}</label><select class="select" name="FILESYSTEM_DISK" id="disk-method"><option value="public">${ssrInterpolate(unref(trans)("Own server (Uploads folder)"))}</option><option value="wasabi">${ssrInterpolate(unref(trans)("Wasabi"))}</option></select></div>`);
      if (unref(form).FILESYSTEM_DISK != "public") {
        _push(`<div><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Wasabi Access Key Id"))}</label><input type="text" name="WAS_ACCESS_KEY_ID" class="input"${ssrRenderAttr("value", unref(form).WAS_ACCESS_KEY_ID)}></div><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Wasabi Secret Access Key"))}</label><input type="text" name="SECRET_ACCESS_KEY" class="input"${ssrRenderAttr("value", unref(form).SECRET_ACCESS_KEY)}></div><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Wasabi Default Region"))}</label><input type="text" name="WAS_DEFAULT_REGION" class="input"${ssrRenderAttr("value", unref(form).WAS_DEFAULT_REGION)}></div><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Wasabi Bucket Name"))}</label><input type="text" name="WAS_BUCKET" class="input"${ssrRenderAttr("value", unref(form).WAS_BUCKET)}></div><div class="mb-2"><label class="label">${ssrInterpolate(unref(trans)("Wasabi Endpoint"))}</label><input type="text" name="WAS_ENDPOINT" class="input"${ssrRenderAttr("value", unref(form).WAS_ENDPOINT)}></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-2"><div class="">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        processing: unref(form).processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></div></div></form></div></div></div></main>`);
    };
  }
});
const _sfc_setup$27 = _sfc_main$27.setup;
_sfc_main$27.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Developer/Storage.vue");
  return _sfc_setup$27 ? _sfc_setup$27(props, ctx) : void 0;
};
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$27
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1I = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$26 = /* @__PURE__ */ Object.assign(__default__$1I, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "segments",
    "buttons",
    "orders",
    "request",
    "totalOrders",
    "totalPendingOrders",
    "totalCompleteOrders",
    "totalDeclinedOrders",
    "type",
    "invoice",
    "currency",
    "affiliate_commission_percent"
  ],
  setup(__props) {
    const props = __props;
    const { formatCurrency } = sharedComposable();
    const orderOverviews = [
      { value: props.totalOrders, title: trans("Total Orders"), iconClass: "bx bx-box" },
      {
        value: props.totalPendingOrders,
        title: trans("Pending Orders"),
        iconClass: "bx bx-dollar-circle"
      },
      {
        value: props.totalCompleteOrders,
        title: trans("Completed Orders"),
        iconClass: "ti ti-thumb-up"
      },
      {
        value: props.totalDeclinedOrders,
        title: trans("Declined Orders"),
        iconClass: "ti ti-message-2-cog"
      }
    ];
    const filterData = useForm({
      search: props.request.search,
      type: props.type
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Event Order List"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-4">`);
      _push(ssrRenderComponent(_sfc_main$2s, { items: orderOverviews }, null, _parent));
      _push(`<div class="flex items-center justify-end gap-x-2"><div class="dropdown" data-placement="bottom-end"><div class="dropdown-toggle"><button type="button" class="btn bg-white font-medium shadow-sm dark:bg-slate-800"><i class="w-4" data-feather="filter"></i><span>${ssrInterpolate(unref(trans)("Filter"))}</span><i class="w-4" data-feather="chevron-down"></i></button></div><div class="dropdown-content w-72 !overflow-visible"><form><ul class="dropdown-list space-y-4 p-4"><li class="dropdown-list-item"><h2 class="my-1 text-sm font-medium">${ssrInterpolate(unref(trans)("Status"))}</h2><div class="mb-2"><input type="text" name="search"${ssrRenderAttr("value", unref(filterData).search)} class="input" placeholder="Search......"></div></li><li class="dropdown-list-item"><div class="mb-2"><select class="select" name="type"><option value="email">${ssrInterpolate(unref(trans)("User Email"))}</option><option value="invoice_no">${ssrInterpolate(unref(trans)("Invoice No"))}</option></select></div></li><li class="dropdown-list-item"><button type="submit" class="btn btn-primary w-full">${ssrInterpolate(unref(trans)("Filter"))}</button></li></ul></form></div></div></div><div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Order No"))}</th><th>${ssrInterpolate(unref(trans)("Event"))}</th><th>${ssrInterpolate(unref(trans)("User"))}</th><th>${ssrInterpolate(unref(trans)("Payment Mode"))}</th><th>${ssrInterpolate(unref(trans)("Amount"))}</th><th>${ssrInterpolate(unref(trans)("Status"))}</th><th>${ssrInterpolate(unref(trans)("Created At"))}</th><th class="!text-right">${ssrInterpolate(unref(trans)("Actions"))}</th></tr></thead>`);
      if (__props.orders.total) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.orders.data, (order) => {
          var _a2, _b2, _c, _d;
          _push(`<tr><td>`);
          _push(ssrRenderComponent(_component_Link, {
            href: "/admin/event-orders/" + order.id,
            class: "text-sm font-medium text-primary-500 transition duration-150 ease-in-out hover:underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(order.invoice_no)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(order.invoice_no), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td><a target="_blank"${ssrRenderAttr("href", _ctx.route("events.show", order.event))}>${ssrInterpolate(order.event.title)}</a></td><td>`);
          if (order.user) {
            _push(`<a${ssrRenderAttr("href", `/admin/users/${(_a2 = order.user) == null ? void 0 : _a2.id}`)}><strong>${ssrInterpolate((_b2 = order.user) == null ? void 0 : _b2.name)}</strong><br> ${ssrInterpolate((_c = order.user) == null ? void 0 : _c.email)}</a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</td><td>${ssrInterpolate(((_d = order.gateway) == null ? void 0 : _d.name) ?? "Free")}</td><td>${ssrInterpolate(unref(formatCurrency)(order.amount))}</td><td><div class="badge badge-soft-primary capitalize">${ssrInterpolate(unref(trans)(
            order.status == 2 ? "pending" : order.status == 1 ? "approved" : "declined"
          ))}</div></td><td class="text-center">${ssrInterpolate(order.created_at_diff)}</td><td><div class="flex justify-center"><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item">`);
          _push(ssrRenderComponent(_component_Link, {
            href: "/admin/event-orders/" + order.id,
            class: "dropdown-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="h-5 text-slate-400" data-feather="external-link"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(unref(trans)("View"))}</span>`);
              } else {
                return [
                  createVNode("i", {
                    class: "h-5 text-slate-400",
                    "data-feather": "external-link"
                  }),
                  createVNode("span", null, toDisplayString(unref(trans)("View")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li><li class="dropdown-list-item"><a${ssrRenderAttr("href", _ctx.route("admin.event-orders.ticket-download", order.id))} class="dropdown-link"><i class="h-5 text-slate-400" data-feather="download"></i> ${ssrInterpolate(unref(trans)("Download Ticket"))}</a></li></ul></div></div></div></td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table></div>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.orders.links
      }, null, _parent));
      _push(`</div></main>`);
    };
  }
});
const _sfc_setup$26 = _sfc_main$26.setup;
_sfc_main$26.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/EventOrder/Index.vue");
  return _sfc_setup$26 ? _sfc_setup$26(props, ctx) : void 0;
};
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$26
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1H = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$25 = /* @__PURE__ */ Object.assign(__default__$1H, {
  __name: "Show",
  __ssrInlineRender: true,
  props: [
    "order",
    "event",
    "invoice_data",
    "segments",
    "buttons",
    "meta"
  ],
  setup(__props) {
    const props = __props;
    const { formatCurrency } = sharedComposable();
    const form = useForm({
      status: props.order.status,
      assign_order: "no"
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2;
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Invoice details",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="card"><div class="space-y-6 card-body"><div class="flex flex-col justify-between p-1 space-y-4 md:flex-row"><div class="flex items-center justify-center md:justify-start"><div class="flex items-center w-full h-16 gap-4 pr-4"><img${ssrRenderAttrs(mergeProps({
        alt: "logo",
        class: "block h-[45px] dark:hidden"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, _ctx.$page.props.primaryData.deep_logo)))}><img${ssrRenderAttrs(mergeProps({
        alt: "logo",
        class: "hidden h-[45px] dark:block"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, _ctx.$page.props.primaryData.logo)))}></div></div><div class="flex flex-col items-start justify-center md:items-end"><h4>Invoice #${ssrInterpolate(__props.order.invoice_no)}</h4><p class="py-0 my-0 text-sm font-medium text-slate-700 dark:text-slate-300">${ssrInterpolate(_ctx.trans("Order Date"))}: <span class="font-normal text-slate-600 dark:text-slate-300">${ssrInterpolate(unref(moment)(__props.order.created_at).format("DD-MM-YYYY"))}</span></p><p class="py-0 my-0 text-sm font-medium text-slate-700 dark:text-slate-300">${ssrInterpolate(_ctx.trans("Expire Date"))}: <span class="font-normal text-slate-600 dark:text-slate-300">${ssrInterpolate(unref(moment)(__props.order.will_expire).format("DD-MM-YYYY"))}</span></p><p class="py-0 my-0 text-sm font-medium text-slate-700 dark:text-slate-300">${ssrInterpolate(_ctx.trans("Status"))}: <span class="font-normal text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.order.status == 2 ? "pending" : __props.order.status == 1 ? "approved" : "declined")}</span></p></div></div><div class="flex flex-col justify-between p-1 space-y-6 md:flex-row md:space-y-0"><div class="flex flex-col items-start justify-center w-full md:mb-0 md:w-2/3 md:justify-center"><p class="text-xs font-medium uppercase text-slate-400">BILLED FROM</p><h6 class="my-1">${ssrInterpolate(__props.invoice_data.company_name)}</h6><p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.invoice_data.address)}</p><p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.invoice_data.city)}</p><p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.invoice_data.post_code)}</p><p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.invoice_data.country)}</p></div><div class="flex flex-col items-start justify-center w-full md:w-1/3 md:items-end"><p class="text-xs font-medium uppercase text-slate-400">BILLED TO</p><h6 class="my-1">${ssrInterpolate(__props.order.user.name)}</h6><p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.order.user.address)}</p><p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.order.user.email)}</p><p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.order.user.phone)}</p></div></div><div class="w-full p-1 overflow-auto"><div class="min-w-[38rem]"><div class="border table-responsive whitespace-nowrap rounded-primary border-slate-200 dark:border-slate-600"><table class="table table-striped table-hover table-md"><tbody><tr><td class="col-9">${ssrInterpolate(_ctx.trans("Event Name"))}</td><td class="col-3"><p class="text-right">${ssrInterpolate(_ctx.trans("Price"))}</p></td></tr><tr><td><img${ssrRenderAttrs(mergeProps({
        class: "inline w-12 mr-2 rounded",
        alt: "preview"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, __props.order.event.preview)))}> ${ssrInterpolate(__props.order.event.title)}</td><td><p class="text-right">${ssrInterpolate(unref(formatCurrency)(__props.order.event.fee_amount))}</p></td></tr></tbody></table></div><h5 class="my-3">${ssrInterpolate(_ctx.trans("Booking Details"))}</h5><div class="border table-responsive whitespace-nowrap rounded-primary border-slate-200 dark:border-slate-600"><table class="table table-striped table-hover table-md"><tbody><tr><td>${ssrInterpolate(_ctx.trans("Total Seat"))}</td><td>${ssrInterpolate(_ctx.trans("Fee Per Seat"))}</td><td><p class="text-right">${ssrInterpolate(_ctx.trans("Subtotal"))}</p></td></tr><tr><td class="text-center">${ssrInterpolate(__props.order.qty)}</td><td class="text-center">${ssrInterpolate(unref(formatCurrency)(__props.event.fee_amount))}</td><td class="text-end"><p class="text-right">${ssrInterpolate(unref(formatCurrency)(__props.event.fee_amount * __props.order.qty))}</p></td></tr></tbody></table></div><div class="flex items-stretch justify-between mt-4"><div class="w-2/5"><p class="py-0 my-2 text-sm font-semibold">${ssrInterpolate(_ctx.trans("Payment Method"))}: <span class="font-normal">${ssrInterpolate(((_a2 = __props.order.gateway) == null ? void 0 : _a2.name) ?? "Free")}</span></p>`);
      if ((_b2 = __props.order.gateway) == null ? void 0 : _b2.name) {
        _push(`<p class="py-0 my-2 text-sm font-semibold">${ssrInterpolate(_ctx.trans("Payment Id"))}: <span class="font-normal">${ssrInterpolate(__props.order.payment_id)}</span></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="">`);
      if (__props.meta != null && __props.order.status == "pending") {
        _push(`<!--[--><div class="font-semibold">${ssrInterpolate(_ctx.trans("Payment Info:"))}</div><br><p class="section-lead">${ssrInterpolate(__props.meta.comment)}</p><p class="section-lead"><a target="_blank"${ssrRenderAttr("href", __props.meta.screenshot)}>${ssrInterpolate(_ctx.trans("Attachment"))}</a></p><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="space-y-3 text-end px-6"><div class="flex items-center gap-x-2"><p class="w-1/2 text-sm text-slate-400 dark:text-slate-300">${ssrInterpolate(_ctx.trans("Subtotal"))}: </p><p class="w-1/2 text-sm font-semibold text-slate-700 dark:text-slate-300">${ssrInterpolate(unref(formatCurrency)(__props.order.amount))}</p></div><hr class="mt-5 mb-1 border-slate-200 dark:border-slate-600"><div class="flex items-center gap-x-2 min-w-[272px]"><p class="w-1/2 text-sm text-slate-400">${ssrInterpolate(_ctx.trans("Total"))}:</p><p class="w-1/2 text-sm font-semibold text-slate-700 dark:text-slate-300">${ssrInterpolate(unref(formatCurrency)(__props.order.amount + __props.order.tax || 0))}</p></div></div></div></div></div><p class="py-2 text-sm text-center">${ssrInterpolate(_ctx.trans("Thanks for your Business"))}</p></div></div><div class="mt-4 card"><form><div class="flex space-x-2 card-body"><div class="col-span-3 mb-2"><label class="float-left">${ssrInterpolate(_ctx.trans("Order Status"))}</label><select class="select" name="status"><option value="1">${ssrInterpolate(_ctx.trans("Approved"))}</option><option value="2">${ssrInterpolate(_ctx.trans("Pending"))}</option><option value="0">${ssrInterpolate(_ctx.trans("Rejected"))}</option></select></div><div class="col-auto mb-2"><br><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}>${ssrInterpolate(_ctx.trans("Update"))}</button></div></div></form></div></main>`);
    };
  }
});
const _sfc_setup$25 = _sfc_main$25.setup;
_sfc_main$25.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/EventOrder/Show.vue");
  return _sfc_setup$25 ? _sfc_setup$25(props, ctx) : void 0;
};
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$25
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$24 = {
  __name: "InputFieldError",
  __ssrInlineRender: true,
  props: {
    message: {
      type: String,
      default: ""
    },
    classes: String,
    size: {
      type: Number,
      default: 30
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      _push(`<p${ssrRenderAttrs(mergeProps({
        style: ((_a2 = __props.message) == null ? void 0 : _a2.length) ? null : { display: "none" },
        class: ["text-danger mb-0 mt-1 text-sm text-red-500 lh-14", __props.classes]
      }, _attrs))}>${ssrInterpolate(__props.message.replace(/[.,]/g, " "))}</p>`);
    };
  }
};
const _sfc_setup$24 = _sfc_main$24.setup;
_sfc_main$24.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/InputFieldError.vue");
  return _sfc_setup$24 ? _sfc_setup$24(props, ctx) : void 0;
};
const __default__$1G = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$23 = /* @__PURE__ */ Object.assign(__default__$1G, {
  __name: "Create",
  __ssrInlineRender: true,
  props: ["buttons", "segments"],
  setup(__props) {
    const sampleGuest = {
      name: "",
      designation: "",
      preview: ""
    };
    const form = useForm({
      title: "",
      body: "",
      preview: null,
      start_at: "",
      location: "",
      email: "",
      phone: "",
      total_seat: "",
      seat_prefix: "seat-",
      seat_limit: 1,
      is_free: 1,
      is_active: true,
      fee_amount: 0,
      guests: [{ ...sampleGuest }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Create an Event",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="card mx-auto w-8/12"><div class="card-body"><form class="grid grid-cols-2 gap-2"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Title"))}</label><input${ssrRenderAttr("value", unref(form).title)} type="text" class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.title
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Preview"))}</label><input type="file" accept="image/*" class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.preview
      }, null, _parent));
      _push(`</div><div class="col-span-full mb-2"><label>${ssrInterpolate(unref(trans)("Body"))}</label><textarea class="input h-200" maxlength="1000">${ssrInterpolate(unref(form).body)}</textarea>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.body
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Event Start"))}</label><input type="datetime-local"${ssrRenderAttr("value", unref(form).start_at)} class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.start_at
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Location"))}</label><input type="text"${ssrRenderAttr("value", unref(form).location)} class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.location
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Email"))}</label><input type="email"${ssrRenderAttr("value", unref(form).email)} class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.email
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Phone"))}</label><input type="text"${ssrRenderAttr("value", unref(form).phone)} class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.phone
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Total Seat"))}</label><input type="number"${ssrRenderAttr("value", unref(form).total_seat)} class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.total_seat
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Seat Prefix"))}</label><input type="text"${ssrRenderAttr("value", unref(form).seat_prefix)} class="input" maxlength="5">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.seat_prefix
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Seat Book Limit(Per user)"))}</label><input type="number"${ssrRenderAttr("value", unref(form).seat_limit)} class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.seat_limit
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Event Type"))}</label><select class="select"><option value="1">${ssrInterpolate(unref(trans)("Free"))}</option><option value="0">${ssrInterpolate(unref(trans)("Premium"))}</option></select>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.is_free
      }, null, _parent));
      _push(`</div>`);
      if (unref(form).is_free == 0) {
        _push(`<div class="mb-2"><label>${ssrInterpolate(unref(trans)("Fee Amount"))}</label><input type="number"${ssrRenderAttr("value", unref(form).fee_amount)} class="input">`);
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors.fee_amount
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="col-span-full mb-2"><div class="mb-2 flex items-center justify-between"><label for="">${ssrInterpolate(unref(trans)("Guests"))}</label><button class="btn btn-primary" type="button">${ssrInterpolate(unref(trans)("Add"))}</button></div><!--[-->`);
      ssrRenderList(unref(form).guests, (guest, index) => {
        _push(`<div><div class="mb-2 flex gap-2"><input type="text"${ssrRenderAttr("value", guest.name)} class="input" placeholder="name"><input type="text"${ssrRenderAttr("value", guest.designation)} class="input" placeholder="designation"><input type="file" accept="image/*" class="input"><button type="button" class="btn btn-outline-danger"> X </button></div><div class="mb-3">`);
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["guests." + index + ".title"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["guests." + index + ".designation"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["guests." + index + ".preview"]
        }, null, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div><div class="col-sapn-full mb-2"><label for="toggle-status" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} class="toggle-input peer sr-only" id="toggle-status" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(unref(trans)("Make it publish?"))}</span></label></div><div class="col-span-full text-end">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        processing: unref(form).processing,
        "btn-text": unref(trans)("Create Event")
      }, null, _parent));
      _push(`</div></form></div></div></div></main>`);
    };
  }
});
const _sfc_setup$23 = _sfc_main$23.setup;
_sfc_main$23.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Events/Create.vue");
  return _sfc_setup$23 ? _sfc_setup$23(props, ctx) : void 0;
};
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$23
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1F = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$22 = /* @__PURE__ */ Object.assign(__default__$1F, {
  __name: "Edit",
  __ssrInlineRender: true,
  props: ["buttons", "segments", "eventData"],
  setup(__props) {
    var _a2, _b2;
    const props = __props;
    const form = useForm({
      title: props.eventData.title,
      body: props.eventData.body,
      preview: null,
      start_at: (_b2 = (_a2 = props.eventData) == null ? void 0 : _a2.start_at_time) == null ? void 0 : _b2.datetime,
      location: props.eventData.location,
      email: props.eventData.email,
      phone: props.eventData.phone,
      total_seat: props.eventData.total_seat,
      seat_prefix: props.eventData.seat_prefix,
      seat_limit: props.eventData.seat_limit,
      is_free: props.eventData.is_free,
      is_active: props.eventData.is_active ? "true" : "false",
      fee_amount: props.eventData.fee_amount,
      guests: props.eventData.guests,
      _method: "put"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Create an Event",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="card mx-auto w-8/12"><div class="card-body"><form class="grid grid-cols-2 gap-2"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Title"))}</label><input${ssrRenderAttr("value", unref(form).title)} type="text" class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.title
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Preview"))}</label><input type="file" accept="image/*" class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.preview
      }, null, _parent));
      _push(`</div><div class="col-span-full mb-2"><label>${ssrInterpolate(unref(trans)("Body"))}</label><textarea class="input h-200" maxlength="1000">${ssrInterpolate(unref(form).body)}</textarea>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.body
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Event Start"))}</label><input type="datetime-local"${ssrRenderAttr("value", unref(form).start_at)} class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.start_at
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Location"))}</label><input type="text"${ssrRenderAttr("value", unref(form).location)} class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.location
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Email"))}</label><input type="email"${ssrRenderAttr("value", unref(form).email)} class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.email
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Phone"))}</label><input type="text"${ssrRenderAttr("value", unref(form).phone)} class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.phone
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Total Seat"))}</label><input type="number"${ssrRenderAttr("value", unref(form).total_seat)} class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.total_seat
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Seat Prefix"))}</label><input type="text"${ssrRenderAttr("value", unref(form).seat_prefix)} class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.seat_prefix
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Seat Book Limit(Per user)"))}</label><input type="number"${ssrRenderAttr("value", unref(form).seat_limit)} class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.seat_limit
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Event Type"))}</label><select class="select"><option value="1">${ssrInterpolate(unref(trans)("Free"))}</option><option value="0">${ssrInterpolate(unref(trans)("Premium"))}</option></select>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.is_free
      }, null, _parent));
      _push(`</div>`);
      if (unref(form).is_free == 0) {
        _push(`<div class="mb-2"><label>${ssrInterpolate(unref(trans)("Fee Amount"))}</label><input type="number"${ssrRenderAttr("value", unref(form).fee_amount)} class="input">`);
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors.fee_amount
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="col-span-full mb-2"><div class="mb-2 flex items-center justify-between"><label for="">${ssrInterpolate(unref(trans)("Guests"))}</label><button class="btn btn-primary" type="button">${ssrInterpolate(unref(trans)("Add"))}</button></div><!--[-->`);
      ssrRenderList(unref(form).guests, (guest, index) => {
        _push(`<div><div class="mb-2 flex gap-2"><input type="text"${ssrRenderAttr("value", guest.name)} class="input" placeholder="name"><input type="text"${ssrRenderAttr("value", guest.designation)} class="input" placeholder="designation"><input type="file" accept="image/*" class="input"><button type="button" class="btn btn-outline-danger"> X </button></div><div class="mb-3">`);
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["guests." + index + ".title"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["guests." + index + ".designation"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["guests." + index + ".preview"]
        }, null, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div><div class="col-span-full mb-2"><label for="toggle-status" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} class="toggle-input peer sr-only" id="toggle-status" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(unref(trans)("Make it publish?"))}</span></label></div><div class="col-span-full text-end">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        processing: unref(form).processing,
        "btn-text": unref(trans)("Update Event")
      }, null, _parent));
      _push(`</div></form></div></div></div></main>`);
    };
  }
});
const _sfc_setup$22 = _sfc_main$22.setup;
_sfc_main$22.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Events/Edit.vue");
  return _sfc_setup$22 ? _sfc_setup$22(props, ctx) : void 0;
};
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$22
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1E = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$21 = /* @__PURE__ */ Object.assign(__default__$1E, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "buttons",
    "segments",
    "events",
    "totalEvents",
    "totalActiveEvents",
    "totalInActiveEvents"
  ],
  setup(__props) {
    const props = __props;
    const { formatCurrency } = sharedComposable();
    const { textExcerpt, deleteRow } = sharedComposable();
    const stats = [
      { value: props.totalEvents, title: trans("Total Events"), iconClass: "bx bx-box" },
      {
        value: props.totalActiveEvents,
        title: trans("Active Events"),
        iconClass: "bx bx-dollar-circle"
      },
      {
        value: props.totalInActiveEvents,
        title: trans("Expired Events"),
        iconClass: "ti ti-thumb-up"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Events",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: stats,
        grid: "3"
      }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Name"))}</th><th>${ssrInterpolate(unref(trans)("Start Time"))}</th><th>${ssrInterpolate(unref(trans)("Location"))}</th><th>${ssrInterpolate(unref(trans)("Total Seat"))}</th><th>${ssrInterpolate(unref(trans)("Booked Seat"))}</th><th>${ssrInterpolate(unref(trans)("Available Seat"))}</th><th>${ssrInterpolate(unref(trans)("Status"))}</th><th class="flex justify-end">${ssrInterpolate(unref(trans)("Action"))}</th></tr></thead>`);
      if (__props.events.total) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.events.data, (event) => {
          _push(`<tr><td class="flex items-center gap-1"><a target="_blank"${ssrRenderAttr("href", _ctx.route("events.show", event.slug))} class="flex items-center gap-1"><img${ssrRenderAttrs(mergeProps({ class: "avatar rounded-square mr-3" }, ssrGetDirectiveProps(_ctx, _directive_lazy, event.preview)))}> ${ssrInterpolate(unref(textExcerpt)(event.title, 50))} `);
          if (event.is_free) {
            _push(`<span class="badge badge-success"> ( ${ssrInterpolate(unref(trans)("Free"))}) </span>`);
          } else {
            _push(`<span class="badge badge-primary"> (${ssrInterpolate(unref(trans)("Fee:"))} ${ssrInterpolate(unref(formatCurrency)(event.fee_amount))}) </span>`);
          }
          _push(`</a></td><td>${ssrInterpolate(event.start_at_time.formatted)}</td><td>${ssrInterpolate(unref(textExcerpt)(event.location, 50))}</td><td>${ssrInterpolate(event.total_seat)}</td><td>${ssrInterpolate(event.users_count)}</td><td>${ssrInterpolate(event.total_seat - event.users_count)}</td><td class="text-right"><span class="${ssrRenderClass([event.is_active == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(event.is_active == 1 ? unref(trans)("Active") : unref(trans)("Draft"))}</span></td><td><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item">`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("admin.events.edit", event),
            class: "dropdown-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="h-5 text-slate-400" data-feather="edit"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(unref(trans)("Edit"))}</span>`);
              } else {
                return [
                  createVNode("i", {
                    class: "h-5 text-slate-400",
                    "data-feather": "edit"
                  }),
                  createVNode("span", null, toDisplayString(unref(trans)("Edit")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li><li class="dropdown-list-item"><button type="button" class="dropdown-link"><i class="h-5 text-slate-400" data-feather="trash-2">${ssrInterpolate(unref(trans)("Remove"))}&gt;</i><span>${ssrInterpolate(unref(trans)("Delete"))}</span></button></li><li class="dropdown-list-item">`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("admin.participants.index", event),
            class: "dropdown-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="h-5 text-slate-400" data-feather="users"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(unref(trans)("Participants"))}</span>`);
              } else {
                return [
                  createVNode("i", {
                    class: "h-5 text-slate-400",
                    "data-feather": "users"
                  }),
                  createVNode("span", null, toDisplayString(unref(trans)("Participants")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li></ul></div></div></td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table></div>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.events.links
      }, null, _parent));
      _push(`</div></main>`);
    };
  }
});
const _sfc_setup$21 = _sfc_main$21.setup;
_sfc_main$21.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Events/Index.vue");
  return _sfc_setup$21 ? _sfc_setup$21(props, ctx) : void 0;
};
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$21
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1D = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$20 = /* @__PURE__ */ Object.assign(__default__$1D, {
  __name: "Participants",
  __ssrInlineRender: true,
  props: ["buttons", "segments", "event", "participants"],
  setup(__props) {
    sharedComposable();
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Events",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("User"))}</th><th>${ssrInterpolate(unref(trans)("Seat No"))}</th><th class="flex justify-end">${ssrInterpolate(unref(trans)("Action"))}</th></tr></thead>`);
      if (__props.participants.total) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.participants.data, (participant) => {
          _push(`<tr><td class="flex items-center gap-1"><img${ssrRenderAttrs(mergeProps({ class: "avatar rounded-square mr-3" }, ssrGetDirectiveProps(
            _ctx,
            _directive_lazy,
            (participant == null ? void 0 : participant.avatar) == null ? `https://ui-avatars.com/api/?name=${participant == null ? void 0 : participant.name}` : `${participant == null ? void 0 : participant.avatar}`
          )))}> ${ssrInterpolate(participant.name)}</td><td>${ssrInterpolate(participant.pivot.seat_no)}</td><td><div class="flex justify-end gap-2"><button type="button" class="btn btn-danger">${ssrInterpolate(unref(trans)("Delete"))}</button></div></td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table></div>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.participants.links
      }, null, _parent));
      _push(`</div></main>`);
    };
  }
});
const _sfc_setup$20 = _sfc_main$20.setup;
_sfc_main$20.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Events/Participants.vue");
  return _sfc_setup$20 ? _sfc_setup$20(props, ctx) : void 0;
};
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$20
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1C = {
  layout: _sfc_main$2y
};
const _sfc_main$1$ = /* @__PURE__ */ Object.assign(__default__$1C, {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["segments", "buttons", "faqs", "languages", "categories"],
  setup(__props) {
    onMounted(() => {
      drawer.init();
    });
    const { textExcerpt, deleteRow } = sharedComposable();
    const createFrom = useForm({
      question: null,
      answer: null,
      categories: null,
      language: null
    });
    const editForm = useForm({
      question: null,
      answer: null,
      categories: null,
      language: null,
      id: null
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><main class="container flex-grow p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Frequently asked questions"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Question"))}</th><th>${ssrInterpolate(unref(trans)("Answer"))}</th><th class="text-right">${ssrInterpolate(unref(trans)("Language"))}</th><th class="flex justify-end">${ssrInterpolate(unref(trans)("Action"))}</th></tr></thead>`);
      if (__props.faqs.total) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.faqs.data, (faq) => {
          _push(`<tr><td class="text-left">${ssrInterpolate(unref(textExcerpt)(faq.title, 20))}</td><td class="text-left">${ssrInterpolate(unref(textExcerpt)(faq.excerpt.value, 70))}</td><td class="text-right">${ssrInterpolate(faq.lang)}</td><td class="flex justify-end"><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item"><button type="button" class="dropdown-link"><i class="h-5 text-slate-400" data-feather="edit"></i><span>${ssrInterpolate(unref(trans)("Edit"))}</span></button></li><li class="dropdown-list-item"><button class="dropdown-link"><i class="h-5 text-slate-400" data-feather="trash-2">${ssrInterpolate(unref(trans)("Remove"))}&gt;</i><span>${ssrInterpolate(unref(trans)("Delete"))}</span></button></li></ul></div></div></td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table></div>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.faqs.links
      }, null, _parent));
      _push(`</div></main><div id="addNewFaqDrawer" class="drawer drawer-right"><form><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Add New Faq"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Question"))}</label><input type="text"${ssrRenderAttr("value", unref(createFrom).question)} maxlength="150" class="input" required=""></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Answer"))}</label><textarea class="textarea h-100" maxlength="500" required="">${ssrInterpolate(unref(createFrom).answer)}</textarea></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Select Language"))}</label><select class="select" name="language" required=""><!--[-->`);
      ssrRenderList(__props.languages, (language, languageKey) => {
        _push(`<option${ssrRenderAttr("value", languageKey)}>${ssrInterpolate(language)}</option>`);
      });
      _push(`<!--]--></select></div></div><div class="drawer-footer"><div class="flex justify-end gap-2"><button type="button" class="btn btn-secondary" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(createFrom).processing,
        "btn-text": unref(trans)("Create")
      }, null, _parent));
      _push(`</div></div></form></div><div id="editFaqDrawer" class="drawer drawer-right"><form><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Edit Faq"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Question"))}</label><input type="text" name="question"${ssrRenderAttr("value", unref(editForm).question)} maxlength="150" class="input" id="question" required=""></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Answer"))}</label><textarea class="textarea h-100" maxlength="500" name="answer" required="" id="answer">${ssrInterpolate(unref(editForm).answer)}</textarea></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Select Language"))}</label><select class="select" name="language" required=""><!--[-->`);
      ssrRenderList(__props.languages, (language, languageKey) => {
        _push(`<option${ssrRenderAttr("value", languageKey)}>${ssrInterpolate(language)}</option>`);
      });
      _push(`<!--]--></select></div></div><div class="drawer-footer"><div class="flex justify-end gap-2"><button type="button" class="btn btn-secondary" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(editForm).processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></form></div><!--]-->`);
    };
  }
});
const _sfc_setup$1$ = _sfc_main$1$.setup;
_sfc_main$1$.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Faq/Index.vue");
  return _sfc_setup$1$ ? _sfc_setup$1$(props, ctx) : void 0;
};
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1$
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1B = {
  layout: _sfc_main$2y
};
const _sfc_main$1_ = /* @__PURE__ */ Object.assign(__default__$1B, {
  __name: "Create",
  __ssrInlineRender: true,
  props: ["languages", "segments", "buttons"],
  setup(__props) {
    const form = useForm({
      title: "",
      preview_image: "",
      banner_image: "",
      description: "",
      main_description: "",
      language: "",
      featured: false,
      status: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Create Feature"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><form class="ajaxform_instant_reload" enctype="multipart/form-data"><div class="grid grid-cols-5"><div class="col-span-2"><strong>${ssrInterpolate(unref(trans)("Create a features post"))}</strong><p>${ssrInterpolate(unref(trans)("Add your features details and necessary information from here"))}</p></div><div class="col-span-3"><div class="card"><div class="card-body"><div class="mb-2"><label class="">${ssrInterpolate(unref(trans)("Features Title"))}</label><div class=""><input type="text"${ssrRenderAttr("value", unref(form).title)} name="title" required="" class="input">`);
      if (unref(form).errors.title) {
        _push(`<div class="invalid-feedback text-red-600">${ssrInterpolate(unref(form).errors.title)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mt-2"><label class="">${ssrInterpolate(unref(trans)("Preview Image"))}</label><div class=""><input type="file" class="input" required="" name="preview_image" accept="image/*">`);
      if (unref(form).errors.preview_image) {
        _push(`<div class="invalid-feedback text-red-600">${ssrInterpolate(unref(form).errors.preview_image)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mt-2"><label class="">${ssrInterpolate(unref(trans)("Banner Image"))}</label><div class=""><input type="file" class="input" required="" name="banner_image" accept="image/*">`);
      if (unref(form).errors.banner_image) {
        _push(`<div class="invalid-feedback text-red-600">${ssrInterpolate(unref(form).errors.banner_image)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mt-2"><label class="">${ssrInterpolate(unref(trans)("Short Description"))}</label><div class=""><textarea name="description" required="" class="textarea h-100" maxlength="500">${ssrInterpolate(unref(form).description)}</textarea>`);
      if (unref(form).errors.description) {
        _push(`<div class="invalid-feedback text-red-600">${ssrInterpolate(unref(form).errors.description)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mt-3"><label class="">${ssrInterpolate(unref(trans)("Main Description"))}</label><div class=""><textarea name="main_description" required="" class="h-200 textarea">${ssrInterpolate(unref(form).main_description)}</textarea>`);
      if (unref(form).errors.main_description) {
        _push(`<div class="invalid-feedback text-red-600">${ssrInterpolate(unref(form).errors.main_description)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mt-2"><label class="">${ssrInterpolate(unref(trans)("Select Langauge"))}</label><div class=""><select name="language" class="select"><!--[-->`);
      ssrRenderList(__props.languages, (language, key) => {
        _push(`<option${ssrRenderAttr("value", key)}>${ssrInterpolate(language)}</option>`);
      });
      _push(`<!--]--></select>`);
      if (unref(form).errors.language) {
        _push(`<div class="invalid-feedback text-red-600">${ssrInterpolate(unref(form).errors.language)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mt-2"><div><label for="toggle-featured" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).featured) ? ssrLooseContain(unref(form).featured, null) : unref(form).featured) ? " checked" : ""} class="toggle-input peer sr-only" id="toggle-featured" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(unref(trans)("Make it featured?"))}</span></label></div><div><label for="toggle-status" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, null) : unref(form).status) ? " checked" : ""} class="toggle-input peer sr-only" id="toggle-status" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(unref(trans)("Make it publish?"))}</span></label></div></div><div class="mt-5"><button class="btn btn-primary">${ssrInterpolate(unref(trans)("Submit"))}</button></div></div></div></div></div></form></div></main>`);
    };
  }
});
const _sfc_setup$1_ = _sfc_main$1_.setup;
_sfc_main$1_.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Feature/Create.vue");
  return _sfc_setup$1_ ? _sfc_setup$1_(props, ctx) : void 0;
};
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1_
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1A = {
  layout: _sfc_main$2y
};
const _sfc_main$1Z = /* @__PURE__ */ Object.assign(__default__$1A, {
  __name: "Edit",
  __ssrInlineRender: true,
  props: ["languages", "segments", "buttons", "info"],
  setup(__props) {
    const props = __props;
    const form = useForm({
      title: props.info.title,
      preview_image: "",
      banner_image: "",
      description: props.info.excerpt.value,
      main_description: props.info.long_description.value,
      language: props.info.lang,
      featured: props.info.featured == 1 ? true : false,
      status: props.info.status == 1 ? true : false,
      _method: "put"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Edit Feature"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><form class="ajaxform_instant_reload" enctype="multipart/form-data"><div class="grid lg:grid-cols-5"><div class="lg:col-span-2"><strong>${ssrInterpolate(unref(trans)("Edit a features post"))}</strong><p>${ssrInterpolate(unref(trans)("Add your features details and necessary information from here"))}</p></div><div class="lg:col-span-3"><div class="card"><div class="card-body"><div class="mb-2"><label class="">${ssrInterpolate(unref(trans)("Features Title"))}</label><div class=""><input type="text"${ssrRenderAttr("value", unref(form).title)} name="title" required="" class="input">`);
      if (unref(form).errors.title) {
        _push(`<div class="invalid-feedback text-danger d-block">${ssrInterpolate(unref(form).errors.title)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mb-2 mt-2"><label class="">${ssrInterpolate(unref(trans)("Preview Image"))}</label><div class=""><input type="file" class="input" name="preview_image" accept="image/*">`);
      if (unref(form).errors.preview_image) {
        _push(`<div class="invalid-feedback text-danger d-block">${ssrInterpolate(unref(form).errors.preview_image)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mb-2 mt-2"><label class="">${ssrInterpolate(unref(trans)("Banner Image"))}</label><div class=""><input type="file" class="input" name="banner_image" accept="image/*">`);
      if (unref(form).errors.banner_image) {
        _push(`<div class="invalid-feedback text-danger d-block">${ssrInterpolate(unref(form).errors.banner_image)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mb-2 mt-2"><label class="">${ssrInterpolate(unref(trans)("Short Description"))}</label><div class=""><textarea name="description" required="" class="textarea h-100" maxlength="500">${ssrInterpolate(unref(form).description)}</textarea>`);
      if (unref(form).errors.description) {
        _push(`<div class="invalid-feedback text-danger d-block">${ssrInterpolate(unref(form).errors.description)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mb-2 mt-3"><label class="">${ssrInterpolate(unref(trans)("Main Description"))}</label><div class=""><textarea name="main_description" required="" class="h-200 textarea">${ssrInterpolate(unref(form).main_description)}</textarea>`);
      if (unref(form).errors.main_description) {
        _push(`<div class="invalid-feedback text-danger d-block">${ssrInterpolate(unref(form).errors.main_description)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mb-2 mt-2"><label class="">${ssrInterpolate(unref(trans)("Select Langauge"))}</label><div class=""><select name="language" class="select"><!--[-->`);
      ssrRenderList(__props.languages, (language, key) => {
        _push(`<option${ssrRenderAttr("value", key)}>${ssrInterpolate(language)}</option>`);
      });
      _push(`<!--]--></select>`);
      if (unref(form).errors.language) {
        _push(`<div class="invalid-feedback text-danger d-block">${ssrInterpolate(unref(form).errors.language)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mb-2 mt-2"><div><label for="toggle-featured" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).featured) ? ssrLooseContain(unref(form).featured, null) : unref(form).featured) ? " checked" : ""} class="toggle-input peer sr-only" id="toggle-featured" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(unref(trans)("Make it featured?"))}</span></label></div><div><label for="toggle-status" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, null) : unref(form).status) ? " checked" : ""} class="toggle-input peer sr-only" id="toggle-status" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(unref(trans)("Make it publish?"))}</span></label></div><div class="mb-2 mt-3"><button class="btn btn-primary">${ssrInterpolate(unref(trans)("Submit"))}</button></div></div></div></div></div></div></form></div></main>`);
    };
  }
});
const _sfc_setup$1Z = _sfc_main$1Z.setup;
_sfc_main$1Z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Feature/Edit.vue");
  return _sfc_setup$1Z ? _sfc_setup$1Z(props, ctx) : void 0;
};
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1Z
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1z = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1Y = /* @__PURE__ */ Object.assign(__default__$1z, {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["posts", "segments", "buttons"],
  setup(__props) {
    const { textExcerpt, deleteRow } = sharedComposable();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      const _component_Paginate = resolveComponent("Paginate");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Features"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="table-responsive whitespace-normal rounded-primary"><table class="table"><thead><tr><th class="">${ssrInterpolate(unref(trans)("Title"))}</th><th class="">${ssrInterpolate(unref(trans)("Description"))}</th><th class="text-right">${ssrInterpolate(unref(trans)("Language"))}</th><th class="!text-right">${ssrInterpolate(unref(trans)("Action"))}</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.posts.data, (post) => {
        _push(`<tr><td class="flex"><img${ssrRenderAttrs(mergeProps({ class: "avatar rounded-circle mr-3" }, ssrGetDirectiveProps(_ctx, _directive_lazy, post.preview.value)))}><span>${ssrInterpolate(unref(textExcerpt)(post.title, 30))}</span></td><td class="text-left">${ssrInterpolate(unref(textExcerpt)(post.excerpt.value, 50))}</td><td class="text-right">${ssrInterpolate(post.lang)}</td><td><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item">`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("admin.features.edit", post.id),
          class: "dropdown-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="h-5 text-slate-400" data-feather="edit"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(unref(trans)("Edit"))}</span>`);
            } else {
              return [
                createVNode("i", {
                  class: "h-5 text-slate-400",
                  "data-feather": "edit"
                }),
                createVNode("span", null, toDisplayString(unref(trans)("Edit")), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li><li class="dropdown-list-item">`);
        _push(ssrRenderComponent(_component_Link, {
          as: "button",
          class: "dropdown-link",
          onClick: ($event) => unref(deleteRow)("/admin/features/" + post.id)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="h-5 text-slate-400" data-feather="trash-2"${_scopeId}>${ssrInterpolate(unref(trans)("Remove"))}&gt;</i><span${_scopeId}>${ssrInterpolate(unref(trans)("Delete"))}</span>`);
            } else {
              return [
                createVNode("i", {
                  class: "h-5 text-slate-400",
                  "data-feather": "trash-2"
                }, toDisplayString(unref(trans)("Remove")) + ">", 1),
                createVNode("span", null, toDisplayString(unref(trans)("Delete")), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li></ul></div></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table><div class="card-footer py-4">`);
      _push(ssrRenderComponent(_component_Paginate, {
        links: __props.posts.links,
        currentPage: __props.posts.current_page,
        from: __props.posts.from,
        lastPage: __props.posts.last_page,
        lastPageUrl: __props.posts.last_page_url,
        nextpageurl: __props.posts.next_page_url,
        perPage: __props.posts.per_page,
        prevPageUrl: __props.posts.prev_page_url,
        to: __props.posts.to,
        total: __props.posts.total
      }, null, _parent));
      _push(`</div></div></div></main>`);
    };
  }
});
const _sfc_setup$1Y = _sfc_main$1Y.setup;
_sfc_main$1Y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Feature/Index.vue");
  return _sfc_setup$1Y ? _sfc_setup$1Y(props, ctx) : void 0;
};
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1Y
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1y = {
  layout: _sfc_main$2y
};
const _sfc_main$1X = /* @__PURE__ */ Object.assign(__default__$1y, {
  __name: "Create",
  __ssrInlineRender: true,
  props: ["segments", "buttons"],
  setup(__props) {
    const form = useForm({
      name: null,
      logo: null,
      currency: null,
      min_amount: 1,
      max_amount: 10,
      charge: 0,
      multiply: 1,
      comment: null,
      status: 1
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Create Payment Gateway"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-2"><div class="mt-5"><strong>${ssrInterpolate(unref(trans)("Create Payment Gateway"))}</strong><p>${ssrInterpolate(unref(trans)("Create manual payment gateway for accepting payment"))}</p></div><div class="mt-5"><form enctype="multipart/form-data"><div class="card"><div class="card-body"><div class="mb-4"><label class="required" for="name">${ssrInterpolate(unref(trans)("Gateway Name"))}</label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="input" name="name" id="name">`);
      if (unref(form).errors.name) {
        _push(`<div class="invalid-feedback">${ssrInterpolate(unref(form).errors.name)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label class="required" for="logo">${ssrInterpolate(unref(trans)("Logo"))}</label><input type="file" id="logo" class="input" name="logo" accept="image/*">`);
      if (unref(form).errors.logo) {
        _push(`<div class="invalid-feedback">${ssrInterpolate(unref(form).errors.logo)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label class="required" for="currency">${ssrInterpolate(unref(trans)("Currency"))}</label><input${ssrRenderAttr("value", unref(form).currency)} type="text" class="input" name="currency" id="currency" required>`);
      if (unref(form).errors.currency) {
        _push(`<div class="invalid-feedback">${ssrInterpolate(unref(form).errors.currency)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label class="required" for="min_amount">${ssrInterpolate(unref(trans)("Minimum Amount"))}</label><input${ssrRenderAttr("value", unref(form).min_amount)} type="number" name="min_amount" id="min_amount" step="any" class="input" required>`);
      if (unref(form).errors.min_amount) {
        _push(`<div class="invalid-feedback">${ssrInterpolate(unref(form).errors.min_amount)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label class="required" for="max_amount">${ssrInterpolate(unref(trans)("Maximum Amount"))}</label><input${ssrRenderAttr("value", unref(form).max_amount)} type="number" name="max_amount" id="max_amount" step="any" class="input" required>`);
      if (unref(form).errors.max_amount) {
        _push(`<div class="invalid-feedback">${ssrInterpolate(unref(form).errors.max_amount)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label class="required" for="charge">${ssrInterpolate(unref(trans)("Gateway Charge"))}</label><input type="number" step="any"${ssrRenderAttr("value", unref(form).charge)} class="input" name="charge" id="charge" required>`);
      if (unref(form).errors.charge) {
        _push(`<div class="invalid-feedback">${ssrInterpolate(unref(form).errors.charge)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label class="required" for="multiply">${ssrInterpolate(unref(trans)("Multiply from base currency"))}</label><input type="number" step="any"${ssrRenderAttr("value", unref(form).multiply)} class="input" name="multiply" id="multiply" required>`);
      if (unref(form).errors.multiply) {
        _push(`<div class="invalid-feedback">${ssrInterpolate(unref(form).errors.multiply)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label class="required" for="status">${ssrInterpolate(unref(trans)("Payment Instruction"))}</label><textarea class="input" maxlength="1000" name="comment">${ssrInterpolate(unref(form).comment)}</textarea>`);
      if (unref(form).errors.comment) {
        _push(`<div class="invalid-feedback">${ssrInterpolate(unref(form).errors.comment)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label class="required" for="status">${ssrInterpolate(unref(trans)("Status"))}</label><select class="input selectric" name="status" id="status"><option value="1">${ssrInterpolate(unref(trans)("Active"))}</option><option value="0">${ssrInterpolate(unref(trans)("Deactivate"))}</option></select>`);
      if (unref(form).errors.status) {
        _push(`<div class="invalid-feedback">${ssrInterpolate(unref(form).errors.status)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        processing: unref(form).processing
      }, null, _parent));
      _push(`</div></div></div></form></div></div></div></main>`);
    };
  }
});
const _sfc_setup$1X = _sfc_main$1X.setup;
_sfc_main$1X.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Gateway/Create.vue");
  return _sfc_setup$1X ? _sfc_setup$1X(props, ctx) : void 0;
};
const __vite_glob_0_30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1X
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1x = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1W = /* @__PURE__ */ Object.assign(__default__$1x, {
  __name: "Edit",
  __ssrInlineRender: true,
  props: ["segments", "buttons", "gateway", "credentials"],
  setup(__props) {
    const props = __props;
    const form = useForm({
      _method: "Patch",
      name: props.gateway.name,
      logo: "",
      currency: props.gateway.currency,
      test_mode: props.gateway.test_mode,
      min_amount: props.gateway.min_amount,
      max_amount: props.gateway.max_amount,
      charge: props.gateway.charge,
      multiply: props.gateway.multiply,
      credentials: props.credentials ?? [],
      comment: props.gateway.comment,
      status: props.gateway.status
    });
    function ucwords(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    function str_replace(search, replace, subject) {
      return subject.replace(search, replace);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Edit Payment Gateway"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-2"><div class="mt-5"><strong>${ssrInterpolate(unref(trans)("Edit Payment Gateway"))}</strong><p>${ssrInterpolate(unref(trans)("Edit gateway information for accepting payment"))}</p></div><div class="mt-5"><form><div class="card"><div class="card-body"><div class="mb-4"><label class="" for="name">${ssrInterpolate(unref(trans)("Gateway Name"))}</label><input type="text" class="input" name="name" id="name"${ssrRenderAttr("value", unref(form).name)} required></div><div class="mb-4"><label class="" for="logo">${ssrInterpolate(unref(trans)("Logo"))}</label><div class="flex-1"><input type="file" id="logo" class="input mb-3" name="logo"><div class="flex justify-start">`);
      if (__props.gateway.logo != "") {
        _push(`<img${ssrRenderAttrs(mergeProps({
          height: "10",
          width: "30",
          alt: ""
        }, ssrGetDirectiveProps(_ctx, _directive_lazy, __props.gateway.logo)))}>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="mb-4"><label class="" for="currency">${ssrInterpolate(unref(trans)("Currency"))}</label><input type="text" class="input" name="currency" id="currency"${ssrRenderAttr("value", unref(form).currency)} required></div>`);
      if (__props.gateway.is_auto == 1) {
        _push(`<div class="mb-4"><label class="" for="sandbox">${ssrInterpolate(unref(trans)("Sandbox Mode"))}</label><select class="select flex-1" name="test_mode" id="sandbox"><option value="1">${ssrInterpolate(unref(trans)("Enable"))}</option><option value="0">${ssrInterpolate(unref(trans)("Disable"))}</option></select></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-4"><label class="" for="min_amount">${ssrInterpolate(unref(trans)("Minimum Amount"))}</label><input type="number" name="min_amount" id="min_amount" step="any"${ssrRenderAttr("value", unref(form).min_amount)} class="input" required></div><div class="mb-4"><label class="" for="max_amount">${ssrInterpolate(unref(trans)("Maximum Amount"))}</label><input type="number" name="max_amount" id="max_amount" step="any"${ssrRenderAttr("value", unref(form).max_amount)} class="input" required></div><div class="mb-4"><label class="" for="charge">${ssrInterpolate(unref(trans)("Charge"))}</label><input type="text" class="input" name="charge" id="charge"${ssrRenderAttr("value", unref(form).charge)} required></div><div class="mb-4"><label class="" for="multiply">${ssrInterpolate(unref(trans)("Multiply from base currency"))}</label><input type="number" step="any" class="input"${ssrRenderAttr("value", unref(form).multiply)} required></div>`);
      if (__props.gateway.is_auto == 1) {
        _push(`<!--[-->`);
        ssrRenderList(unref(form).credentials, (credential, key) => {
          _push(`<div class="mb-4"><label class="" for="status">${ssrInterpolate(ucwords(str_replace("_", " ", key)))}</label><input type="text" class="input"${ssrRenderAttr("value", unref(form).credentials[key])}></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-4"><label class="required block" for="status">${ssrInterpolate(unref(trans)("Payment Instruction"))}</label><textarea class="textarea" maxlength="1000" name="comment">${ssrInterpolate(unref(form).comment)}</textarea></div><div class="mb-4"><label class="" for="status">${ssrInterpolate(unref(trans)("Status"))}</label><select class="select flex-1" name="status" id="status"><option value="1">${ssrInterpolate(unref(trans)("Active"))}</option><option value="0">${ssrInterpolate(unref(trans)("Deactivate"))}</option></select></div><div class="mb-4">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        processing: unref(form).processing
      }, null, _parent));
      _push(`</div></div></div></form></div></div></div></main>`);
    };
  }
});
const _sfc_setup$1W = _sfc_main$1W.setup;
_sfc_main$1W.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Gateway/Edit.vue");
  return _sfc_setup$1W ? _sfc_setup$1W(props, ctx) : void 0;
};
const __vite_glob_0_31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1W
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1w = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1V = /* @__PURE__ */ Object.assign(__default__$1w, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "gateways",
    "active_gateway",
    "totalGateways",
    "inactive_gateway",
    "segments",
    "buttons"
  ],
  setup(__props) {
    const props = __props;
    const gatewayStats = [
      { value: props.totalGateways, title: trans("Total Gateways") },
      { value: props.active_gateway, title: trans("Active Gateways") },
      { value: props.inactive_gateway, title: trans("Inactive Gateways") }
    ];
    function number_format(number, decimals, dec_point, thousands_point) {
      if (number == null || !isFinite(number)) {
        throw new TypeError("number is not valid");
      }
      if (!decimals) {
        var len = number.toString().split(".").length;
        decimals = len > 1 ? len : 0;
      }
      if (!dec_point) {
        dec_point = ".";
      }
      if (!thousands_point) {
        thousands_point = ",";
      }
      number = parseFloat(number).toFixed(decimals);
      number = number.replace(".", dec_point);
      var splitNum = number.split(dec_point);
      splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);
      number = splitNum.join(dec_point);
      return number;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Payment Gateways"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: gatewayStats,
        grid: "3"
      }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th scope="col" class="w-[30%]">${ssrInterpolate(unref(trans)("Name"))}</th><th scope="col" class="w-[10%]">${ssrInterpolate(unref(trans)("Charge"))}</th><th scope="col" class="w-[10%]">${ssrInterpolate(unref(trans)("Currency"))}</th><th scope="col" class="w-[10%]">${ssrInterpolate(unref(trans)("Gateway Status"))}</th><th scope="col" class="w-[20%]">${ssrInterpolate(unref(trans)("Payment Mode"))}</th><th scope="col" class="w-[20%]"><div class="text-right">${ssrInterpolate(unref(trans)("Action"))}</div></th></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.gateways, (gateway) => {
        _push(`<tr><th><div class="flex gap-2"><div class="avatar avatar-squire"><img${ssrRenderAttrs(mergeProps({
          class: "avatar-img",
          alt: ""
        }, ssrGetDirectiveProps(_ctx, _directive_lazy, gateway.logo)))}></div><div>`);
        if (gateway.logo != null) {
          _push(ssrRenderComponent(unref(Link), {
            href: "/admin/gateways/" + gateway.id + "/edit"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<h6 class="whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-100"${_scopeId}>${ssrInterpolate(gateway.name)}</h6>`);
              } else {
                return [
                  createVNode("h6", { class: "whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-100" }, toDisplayString(gateway.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="truncate text-xs text-slate-500 dark:text-slate-400">${ssrInterpolate(unref(trans)("Limit : "))} ${ssrInterpolate(number_format(gateway.min_amount, 2))} - ${ssrInterpolate(number_format(gateway.max_amount, 2))}</p></div></div></th><td class="text-right">${ssrInterpolate(gateway.charge)} ${ssrInterpolate(gateway.currency != null ? gateway.currency : "")}</td><td class="text-center">${ssrInterpolate(gateway.currency)}</td><td class="text-center"><div class="${ssrRenderClass([gateway.status == 1 ? "badge-soft-success" : "badge-soft-danger", "badge"])}"><span class="status">${ssrInterpolate(gateway.status == 1 ? "Active" : "Disabled")}</span></div></td><td class="text-right"><span class="${ssrRenderClass([gateway.test_mode == 1 ? "badge-soft-primary" : "badge-soft-success", "badge"])}"><span class="status">${ssrInterpolate(gateway.test_mode == 1 ? "Sandbox" : "Production")}</span></span></td><td><div class="text-right">`);
        _push(ssrRenderComponent(unref(Link), {
          class: "btn btn-sm btn-primary",
          href: "/admin/gateways/" + gateway.id + "/edit"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fas fa-edit"${_scopeId}></i> ${ssrInterpolate(unref(trans)("Edit"))}`);
            } else {
              return [
                createVNode("i", { class: "fas fa-edit" }),
                createTextVNode(" " + toDisplayString(unref(trans)("Edit")), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></main>`);
    };
  }
});
const _sfc_setup$1V = _sfc_main$1V.setup;
_sfc_main$1V.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Gateway/Index.vue");
  return _sfc_setup$1V ? _sfc_setup$1V(props, ctx) : void 0;
};
const __vite_glob_0_32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1V
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1v = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1U = /* @__PURE__ */ Object.assign(__default__$1v, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "investments",
    "total",
    "totalInvested",
    "totalQty",
    "buttons",
    "segments",
    "type",
    "request"
  ],
  setup(__props) {
    const props = __props;
    const { formatCurrency } = sharedComposable();
    const stats = [
      {
        value: props.total,
        title: trans("Total"),
        iconClass: "bx bx-box"
      },
      {
        value: formatCurrency(props.totalInvested || 0),
        title: trans("Total Invested"),
        iconClass: "bx bx-dollar-circle"
      },
      {
        value: props.totalQty,
        title: trans("Total QTY"),
        iconClass: "ti ti-thumb-up"
      }
    ];
    const filterOptions = [
      {
        label: "ID",
        value: "id"
      },
      {
        label: "Name",
        value: "name"
      },
      {
        label: "Amount",
        value: "amount"
      }
    ];
    const editForm = useForm({
      id: "",
      status: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[--><main class="container flex-grow p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Investment Projects",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: stats,
        grid: "3"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2m, { options: filterOptions }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Invoice"))}</th><th>${ssrInterpolate(unref(trans)("Project"))}</th><th>${ssrInterpolate(unref(trans)("Duration"))}</th><th>${ssrInterpolate(unref(trans)("User"))}</th><th>${ssrInterpolate(unref(trans)("Amount"))}</th><th>${ssrInterpolate(unref(trans)("QTY"))}</th><th>${ssrInterpolate(unref(trans)("Status"))}</th><th>${ssrInterpolate(unref(trans)("Created At"))}</th><th><p class="text-end">${ssrInterpolate(unref(trans)("Action"))}</p></th></tr></thead>`);
      if (__props.investments.data != 0) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.investments.data, (investment) => {
          var _a2, _b2;
          _push(`<tr><td>`);
          _push(ssrRenderComponent(unref(Link), {
            href: "/admin/order/" + investment.order_id,
            class: "text-sm font-medium text-primary-500 transition duration-150 ease-in-out hover:underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(investment == null ? void 0 : investment.invoice_no)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(investment == null ? void 0 : investment.invoice_no), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td class="flex items-center"><img${ssrRenderAttrs(mergeProps({ class: "avatar mr-2 rounded" }, ssrGetDirectiveProps(_ctx, _directive_lazy, (_a2 = investment == null ? void 0 : investment.project_duration) == null ? void 0 : _a2.project.preview)))}><p>${ssrInterpolate((_b2 = investment == null ? void 0 : investment.project_duration) == null ? void 0 : _b2.project.title)}</p></td><td>${ssrInterpolate(investment == null ? void 0 : investment.project_duration.duration)}/${ssrInterpolate(investment == null ? void 0 : investment.project_duration.duration_type)}</td><td>`);
          _push(ssrRenderComponent(unref(Link), {
            href: `/admin/customers/${__props.investments.user_id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              var _a3, _b3;
              if (_push2) {
                _push2(`${ssrInterpolate((_a3 = investment.user) == null ? void 0 : _a3.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString((_b3 = investment.user) == null ? void 0 : _b3.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td>${ssrInterpolate(unref(formatCurrency)(investment.amount))}</td><td>${ssrInterpolate(investment.qty)}</td><td class="text-left"><span class="${ssrRenderClass([investment.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(investment.status == 0 ? unref(trans)("Declined") : investment.status == 1 ? unref(trans)("Active") : unref(trans)("Pending"))}</span></td><td>${ssrInterpolate(unref(moment)(investment.created_at).format("D-MMM-Y"))}</td><td><div class="flex justify-end"><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item"><button class="dropdown-link"><i class="h-5 text-slate-400" data-feather="edit"></i><span>${ssrInterpolate(unref(trans)("Edit"))}</span></button></li></ul></div></div></div></td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table></div>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.investments.links
      }, null, _parent));
      _push(`</div></main><div id="editInvestDrawer" class="drawer drawer-right"><form><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Edit Invest"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Status"))}</label><select class="select" name="status"><option value="0">${ssrInterpolate(unref(trans)("Declined"))}</option><option value="1">${ssrInterpolate(unref(trans)("Active"))}</option><option value="2">${ssrInterpolate(unref(trans)("Pending"))}</option></select></div></div><div class="drawer-footer"><div class="flex justify-end gap-2"><button type="button" class="btn btn-secondary" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(editForm).processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></form></div><!--]-->`);
    };
  }
});
const _sfc_setup$1U = _sfc_main$1U.setup;
_sfc_main$1U.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Invest/Index.vue");
  return _sfc_setup$1U ? _sfc_setup$1U(props, ctx) : void 0;
};
const __vite_glob_0_33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1U
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1u = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1T = /* @__PURE__ */ Object.assign(__default__$1u, {
  __name: "Create",
  __ssrInlineRender: true,
  props: ["buttons", "segments"],
  setup(__props) {
    const form = useForm({
      name: "",
      position: "",
      profile_picture: "",
      description: "",
      status: false,
      socials: {
        facebook: null,
        twitter: null,
        linkedin: null,
        instagram: null
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Create Investor Investor",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><form method="post" enctype="multipart/form-data"><div class="grid grid-cols-12"><div class="col-span-5"><strong>${ssrInterpolate(unref(trans)("Create a investor investor"))}</strong><p>${ssrInterpolate(unref(trans)("Add your investor investor details and necessary information from here"))}</p></div><div class="card-wrapper col-span-7"><div class="card"><div class="card-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Name"))}</label><input${ssrRenderAttr("value", unref(form).name)} type="text" name="name" required class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Position"))}</label><input${ssrRenderAttr("value", unref(form).position)} type="text" name="position" required class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Profile Picture"))}</label><input type="file" accept="image/*" name="profile_picture" required class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Profile Description"))}</label><textarea class="input h-200" name="about" maxlength="1000" required>${ssrInterpolate(unref(form).description)}</textarea></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Facebook profile link"))}</label><input${ssrRenderAttr("value", unref(form).socials.facebook)} type="url" name="socials[facebook]" class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Twitter profile link"))}</label><input${ssrRenderAttr("value", unref(form).socials.twitter)} type="url" name="socials[twitter]" class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Linkedin profile link"))}</label><input${ssrRenderAttr("value", unref(form).socials.linkedin)} type="url" name="socials[linkedin]" class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Instagram profile link"))}</label><input${ssrRenderAttr("value", unref(form).socials.instagram)} type="url" name="socials[instagram]" class="input"></div><div class="mb-2"><label for="toggle-status" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, null) : unref(form).status) ? " checked" : ""} class="toggle-input peer sr-only" id="toggle-status" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(unref(trans)("Make it publish?"))}</span></label></div><div class="from-group row mt-3"><div class="col-lg-12">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        processing: unref(form).processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></div></div></div></div></form></div></main>`);
    };
  }
});
const _sfc_setup$1T = _sfc_main$1T.setup;
_sfc_main$1T.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Investors/Create.vue");
  return _sfc_setup$1T ? _sfc_setup$1T(props, ctx) : void 0;
};
const __vite_glob_0_34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1T
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1t = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1S = /* @__PURE__ */ Object.assign(__default__$1t, {
  __name: "Edit",
  __ssrInlineRender: true,
  props: ["buttons", "segments", "info", "socials"],
  setup(__props) {
    var _a2, _b2;
    const props = __props;
    const form = useForm({
      name: props.info.title ?? "",
      position: props.info.slug ?? "",
      profile_picture: "",
      description: ((_b2 = (_a2 = props.info) == null ? void 0 : _a2.description) == null ? void 0 : _b2.value) ?? "",
      status: props.info.status ? true : false,
      socials: props.socials ?? {
        facebook: null,
        twitter: null,
        linkedin: null,
        instagram: null
      },
      _method: "patch"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Edit Investor Investor",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><form method="post" enctype="multipart/form-data"><div class="grid grid-cols-12"><div class="col-span-5"><strong>${ssrInterpolate(unref(trans)("Edit investor member"))}</strong><p>${ssrInterpolate(unref(trans)("Edit your investor details and necessary information from here"))}</p></div><div class="col-span-7"><div class="card"><div class="card-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Name"))}</label><input type="text"${ssrRenderAttr("value", unref(form).name)} required class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Position"))}</label><input type="text"${ssrRenderAttr("value", unref(form).position)} required class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Profile Picture"))}</label><input type="file" accept="image/*" class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Profile Description"))}</label><textarea class="textarea h-200" maxlength="1000" required>${ssrInterpolate(unref(form).description)}</textarea></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Facebook profile link"))}</label><input type="url"${ssrRenderAttr("value", unref(form).socials.facebook)} class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Twitter profile link"))}</label><input type="url"${ssrRenderAttr("value", unref(form).socials.twitter)} class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Linkedin profile link"))}</label><input type="url"${ssrRenderAttr("value", unref(form).socials.linkedin)} class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Instagram profile link"))}</label><input type="url"${ssrRenderAttr("value", unref(form).socials.instagram)} class="input"></div><div class="mb-2"><label for="toggle-status" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, null) : unref(form).status) ? " checked" : ""} class="toggle-input peer sr-only" id="toggle-status" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(unref(trans)("Make it publish?"))}</span></label></div><div class="mt-2">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        "btn-text": unref(trans)("Save Changes"),
        processing: unref(form).processing
      }, null, _parent));
      _push(`</div></div></div></div></div></form></div></main>`);
    };
  }
});
const _sfc_setup$1S = _sfc_main$1S.setup;
_sfc_main$1S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Investors/Edit.vue");
  return _sfc_setup$1S ? _sfc_setup$1S(props, ctx) : void 0;
};
const __vite_glob_0_35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1S
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1s = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1R = /* @__PURE__ */ Object.assign(__default__$1s, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "posts",
    "buttons",
    "segments",
    "totalInvestors",
    "totalActiveInvestors",
    "totalInActiveInvestors"
  ],
  setup(__props) {
    const props = __props;
    const { textExcerpt, deleteRow } = sharedComposable();
    const investorStats = [
      {
        value: props.totalInvestors,
        title: trans("Total Investors"),
        iconClass: "bx bx-box"
      },
      {
        value: props.totalActiveInvestors,
        title: trans("Active Investors"),
        iconClass: "bx bx-dollar-circle"
      },
      {
        value: props.totalInActiveInvestors,
        title: trans("Expired Investors"),
        iconClass: "ti ti-thumb-up"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Investors",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: investorStats,
        grid: "3"
      }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Name"))}</th><th>${ssrInterpolate(unref(trans)("Position"))}</th><th class="text-right">${ssrInterpolate(unref(trans)("Status"))}</th><th class="flex justify-end">${ssrInterpolate(unref(trans)("Action"))}</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.posts.data, (post) => {
        _push(`<tr><td class="flex items-center gap-1"><img${ssrRenderAttrs(mergeProps({ class: "avatar rounded-square mr-3" }, ssrGetDirectiveProps(_ctx, _directive_lazy, post.preview.value)))}> ${ssrInterpolate(unref(textExcerpt)(post.title, 50))}</td><td class="text-left">${ssrInterpolate(unref(textExcerpt)(post.slug, 50))}</td><td class="text-right"><span class="${ssrRenderClass([post.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(post.status == 1 ? unref(trans)("Active") : unref(trans)("Draft"))}</span></td><td><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("admin.investors.edit", post.id),
          class: "dropdown-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="h-5 text-slate-400" data-feather="edit"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(unref(trans)("Edit"))}</span>`);
            } else {
              return [
                createVNode("i", {
                  class: "h-5 text-slate-400",
                  "data-feather": "edit"
                }),
                createVNode("span", null, toDisplayString(unref(trans)("Edit")), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li><li class="dropdown-list-item"><button type="button" class="dropdown-link"><i class="h-5 text-slate-400" data-feather="trash-2">${ssrInterpolate(unref(trans)("Remove"))}&gt;</i><span>${ssrInterpolate(unref(trans)("Delete"))}</span></button></li></ul></div></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table>`);
      if (__props.posts.data.length == 0) {
        _push(ssrRenderComponent(_sfc_main$2u, {
          type: "info",
          text: unref(trans)("Opps you have not created any plan....")
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.posts.links
      }, null, _parent));
      _push(`</div></main>`);
    };
  }
});
const _sfc_setup$1R = _sfc_main$1R.setup;
_sfc_main$1R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Investors/Index.vue");
  return _sfc_setup$1R ? _sfc_setup$1R(props, ctx) : void 0;
};
const __vite_glob_0_36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1R
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1r = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1Q = /* @__PURE__ */ Object.assign(__default__$1r, {
  __name: "Create",
  __ssrInlineRender: true,
  props: ["types", "segments", "buttons"],
  setup(__props) {
    const form = useForm({
      image: "",
      title: "",
      status: 1,
      image_accept: 1,
      fields: [
        {
          label: "",
          type: "text"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: _ctx.trans("KYC Methods Create"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<form><div class="grid grid-cols-1 lg:grid-cols-2 space-x-5"><div class="col-1"><div class="card"><div class="card-body"><div class="mb-2"><label for="image" class="required">${ssrInterpolate(_ctx.trans("Image"))}</label><input type="file" class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.image
      }, null, _parent));
      _push(`</div><div class="mb-2"><label for="title" class="required">${ssrInterpolate(_ctx.trans("Title"))}</label><input type="text"${ssrRenderAttr("value", unref(form).title)} id="title" class="input"${ssrRenderAttr("placeholder", _ctx.trans("Enter Title"))}>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.title
      }, null, _parent));
      _push(`</div><div class="mb-2"><label for="image_accept" class="required">${ssrInterpolate(_ctx.trans("Accept Attachments"))}</label><select id="image_accept" class="select" data-control="select2" required><option value="1">${ssrInterpolate(_ctx.trans("Yes"))}</option><option value="0">${ssrInterpolate(_ctx.trans("No"))}</option></select></div><div class="mb-2"><label for="status" class="required">${ssrInterpolate(_ctx.trans("Status:"))}</label><select id="status" class="select" data-control="select2" required><option value="1">${ssrInterpolate(_ctx.trans("Active"))}</option><option value="0">${ssrInterpolate(_ctx.trans("Inactive"))}</option></select></div>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(form).processing,
        "btn-text": "Save Method"
      }, null, _parent));
      _push(`</div></div></div><div class="col-1"><div class="card"><div class="card-header"><div class="flex justify-between"><h4>${ssrInterpolate(_ctx.trans("Document Fields"))}</h4><button type="button" class="btn btn-primary"><i class="fas fa-plus-circle"></i></button></div></div><div class="card-body"><div class="mb-2"><!--[-->`);
      ssrRenderList(unref(form).fields, (field, index) => {
        _push(`<div class="input-group mb-5"><input type="text"${ssrRenderAttr("value", field.label)} class="input"${ssrRenderAttr("placeholder", _ctx.trans("Enter input label"))} aria-label="" required><select class="input" required><!--[-->`);
        ssrRenderList(__props.types, (item) => {
          _push(`<option${ssrRenderAttr("value", item)}>${ssrInterpolate(item)}</option>`);
        });
        _push(`<!--]--></select><button type="button" class="btn btn-danger"><i class="fas fa-times-circle"></i></button></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></form></main>`);
    };
  }
});
const _sfc_setup$1Q = _sfc_main$1Q.setup;
_sfc_main$1Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/KYC/Methods/Create.vue");
  return _sfc_setup$1Q ? _sfc_setup$1Q(props, ctx) : void 0;
};
const __vite_glob_0_37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1Q
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1q = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1P = /* @__PURE__ */ Object.assign(__default__$1q, {
  __name: "Edit",
  __ssrInlineRender: true,
  props: ["types", "kycMethod", "segments", "buttons"],
  setup(__props) {
    const { kycMethod, types, segments, buttons } = __props;
    const form = useForm({ ...kycMethod });
    form.image = null;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: _ctx.trans("KYC Methods Create"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<form><div class="grid grid-cols-1 lg:grid-cols-2 space-x-5"><div class="col-1"><div class="card"><div class="card-body"><div class="mb-2"><label for="image" class="required">${ssrInterpolate(_ctx.trans("Image"))}</label><input type="file" class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.image
      }, null, _parent));
      _push(`</div><div class="mb-2"><label for="title" class="required">${ssrInterpolate(_ctx.trans("Title"))}</label><input type="text"${ssrRenderAttr("value", unref(form).title)} id="title" class="input"${ssrRenderAttr("placeholder", _ctx.trans("Enter Title"))}>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.title
      }, null, _parent));
      _push(`</div><div class="mb-2"><label for="image_accept" class="required">${ssrInterpolate(_ctx.trans("Accept Attachments"))}</label><select id="image_accept" class="select" data-control="select2" required><option value="1">${ssrInterpolate(_ctx.trans("Yes"))}</option><option value="0">${ssrInterpolate(_ctx.trans("No"))}</option></select></div><div class="mb-2"><label for="status" class="required">${ssrInterpolate(_ctx.trans("Status:"))}</label><select id="status" class="select" data-control="select2" required><option value="1">${ssrInterpolate(_ctx.trans("Active"))}</option><option value="0">${ssrInterpolate(_ctx.trans("Inactive"))}</option></select></div>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(form).processing,
        "btn-text": "Save Changes"
      }, null, _parent));
      _push(`</div></div></div><div class="col-1"><div class="card"><div class="card-header"><div class="flex justify-between"><h4>${ssrInterpolate(_ctx.trans("Document Fields"))}</h4><button type="button" class="btn btn-primary"><i class="fas fa-plus-circle"></i></button></div></div><div class="card-body"><div class="mb-2"><!--[-->`);
      ssrRenderList(unref(form).fields, (field, index) => {
        _push(`<div class="input-group mb-5"><input type="text"${ssrRenderAttr("value", field.label)} class="input"${ssrRenderAttr("placeholder", _ctx.trans("Enter input label"))} aria-label="" required><select class="input" required><!--[-->`);
        ssrRenderList(__props.types, (item) => {
          _push(`<option${ssrRenderAttr("value", item)}>${ssrInterpolate(item)}</option>`);
        });
        _push(`<!--]--></select><button type="button" class="btn btn-danger"><i class="fas fa-times-circle"></i></button></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></form></main>`);
    };
  }
});
const _sfc_setup$1P = _sfc_main$1P.setup;
_sfc_main$1P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/KYC/Methods/Edit.vue");
  return _sfc_setup$1P ? _sfc_setup$1P(props, ctx) : void 0;
};
const __vite_glob_0_38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1P
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1p = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1O = /* @__PURE__ */ Object.assign(__default__$1p, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "kycMethods",
    "all",
    "active",
    "inactive",
    "segments",
    "buttons",
    "KYC_VERIFICATION"
  ],
  setup(__props) {
    const props = __props;
    const overviewItems = [
      { value: props.all, title: trans("All"), iconClass: "bx bx-box" },
      { value: props.active, title: trans("Active"), iconClass: "bx bx-dollar-circle" },
      { value: props.inactive, title: trans("Inactive"), iconClass: "bx bx-dollar-circle" }
    ];
    const form = useForm({
      method: "",
      ids: []
    });
    ref([props.kycMethods]);
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("KYC Methods"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-4">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: overviewItems,
        grid: "3"
      }, null, _parent));
      _push(`<form><div class="mb-3 w-72"><div class="input-group"><select class="select"><option value="">${ssrInterpolate(unref(trans)("Select Action"))}</option><option value="delete">${ssrInterpolate(unref(trans)("Delete Permanently"))}</option></select><button class="btn btn-primary" type="submit"${ssrIncludeBooleanAttr(!unref(form).ids.length) ? " disabled" : ""}>${ssrInterpolate(unref(trans)("Submit"))}</button></div></div><div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th><input type="checkbox" class="checkbox"></th><th>${ssrInterpolate(unref(trans)("Sl"))}</th><th>${ssrInterpolate(unref(trans)("Title"))}</th><th><i class="fa fa-image"></i></th><th>${ssrInterpolate(unref(trans)("Accept Attach."))}</th><th>${ssrInterpolate(unref(trans)("Created At"))}</th><th>${ssrInterpolate(unref(trans)("Status"))}</th><th>${ssrInterpolate(unref(trans)("Action"))}</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.kycMethods.data, (item, index) => {
        _push(`<tr><td><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).ids) ? ssrLooseContain(unref(form).ids, item.id) : unref(form).ids) ? " checked" : ""} class="checkbox"${ssrRenderAttr("value", item.id)}></td><td>${ssrInterpolate(index + 1)}</td><td>${ssrInterpolate(item.title)}</td><td><img${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_lazy, item.image))}></td><td>`);
        if (item.image_accept) {
          _push(`<span class="badge badge-success">${ssrInterpolate(unref(trans)("Yes"))}</span>`);
        } else {
          _push(`<span class="badge badge-danger">${ssrInterpolate(unref(trans)("No"))}</span>`);
        }
        _push(`</td><td>${ssrInterpolate(unref(moment)(item.created_at).format("DD MMM, YYYY"))}</td><td>`);
        if (item.status) {
          _push(`<span class="badge badge-success">${ssrInterpolate(unref(trans)("Active"))}</span>`);
        } else {
          _push(`<span class="badge badge-danger">${ssrInterpolate(unref(trans)("Inactive"))}</span>`);
        }
        _push(`</td><td>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("admin.kyc-methods.edit", item),
          class: "btn btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fa fa-edit"${_scopeId}></i>`);
            } else {
              return [
                createVNode("i", { class: "fa fa-edit" })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></form></div></main>`);
    };
  }
});
const _sfc_setup$1O = _sfc_main$1O.setup;
_sfc_main$1O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/KYC/Methods/Index.vue");
  return _sfc_setup$1O ? _sfc_setup$1O(props, ctx) : void 0;
};
const __vite_glob_0_39 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1O
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1o = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1N = /* @__PURE__ */ Object.assign(__default__$1o, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "requests",
    "all",
    "approved",
    "pending",
    "rejected",
    "reSubmitted",
    "segments",
    "buttons"
  ],
  setup(__props) {
    const props = __props;
    const orderOverviews = [
      { value: props.all, title: trans("All"), iconClass: "bx bx-box" },
      { value: props.pending, title: trans("Pending"), iconClass: "bx bx-dollar-circle" },
      { value: props.approved, title: trans("Approved"), iconClass: "bx bx-dollar-circle" },
      { value: props.rejected, title: trans("Rejected"), iconClass: "ti ti-thumb-up" },
      { value: props.reSubmitted, title: trans("reSubmitted"), iconClass: "ti ti-message-2-cog" }
    ];
    useForm({});
    useForm({});
    ref({
      request: "",
      ids: []
    });
    ref(props.requests);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("KYC Requests"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-4">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: orderOverviews,
        class: "grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      }, null, _parent));
      _push(`<div class="card"><div class="card-header"><form><div class="flex justify-between"><h4>${ssrInterpolate(unref(trans)("KYC Requests"))}</h4><div class="input-group w-72"><input type="text" name="src" class="input"${ssrRenderAttr("placeholder", unref(trans)("Search by invoice or user"))}><button type="submit" class="btn btn-primary btn-icon"><i class="fas fa-search"></i></button></div></div></form></div><div class="card-body">`);
      if (__props.requests.data) {
        _push(`<div><div class="table-responsive"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Method"))}</th><th>${ssrInterpolate(unref(trans)("User Name"))}</th><th>${ssrInterpolate(unref(trans)("Status"))}</th><th>${ssrInterpolate(unref(trans)("Note"))}</th><th>${ssrInterpolate(unref(trans)("Documents"))}</th><th class="text-right">${ssrInterpolate(unref(trans)("Action"))}</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(__props.requests.data, (item) => {
          var _a2, _b2;
          _push(`<tr><td>${ssrInterpolate((_a2 = item.method) == null ? void 0 : _a2.title)}</td><td>${ssrInterpolate((_b2 = item.user) == null ? void 0 : _b2.name)}</td><td>`);
          if (item.status == 0) {
            _push(`<span class="badge badge-warning">${ssrInterpolate(unref(trans)("Pending"))}</span>`);
          } else if (item.status == 1) {
            _push(`<span class="badge badge-primary">${ssrInterpolate(unref(trans)("Approved"))}</span>`);
          } else if (item.status == 2) {
            _push(`<span class="badge badge-danger">${ssrInterpolate(unref(trans)("Rejected"))}</span>`);
          } else if (item.status == 3) {
            _push(`<span class="badge badge-dark">${ssrInterpolate(unref(trans)("Re-Submitted"))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</td><td>${ssrInterpolate(item.note)}</td><td>${ssrInterpolate(item.data.length)}</td><td class="flex gap-x-2">`);
          _push(ssrRenderComponent(unref(Link), {
            class: "btn btn-primary",
            href: _ctx.route("admin.kyc-requests.show", item.id)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="fas fa-eye"${_scopeId}></i> ${ssrInterpolate(unref(trans)("View"))}`);
              } else {
                return [
                  createVNode("i", { class: "fas fa-eye" }),
                  createTextVNode(" " + toDisplayString(unref(trans)("View")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
        _push(ssrRenderComponent(_sfc_main$2n, {
          links: __props.requests.links
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<p class="text-center font-bold">${ssrInterpolate(unref(trans)("No requests available yet"))}</p>`);
      }
      _push(`</div></div></div></main>`);
    };
  }
});
const _sfc_setup$1N = _sfc_main$1N.setup;
_sfc_main$1N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/KYC/Requests/Index.vue");
  return _sfc_setup$1N ? _sfc_setup$1N(props, ctx) : void 0;
};
const __vite_glob_0_40 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1N
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1n = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1M = /* @__PURE__ */ Object.assign(__default__$1n, {
  __name: "Show",
  __ssrInlineRender: true,
  props: ["kycRequest", "segments", "buttons"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c, _d, _e;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("KYC Requests details"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-4"><div class="card"><div class="card-body"><div class="row"><div class="col-md-4"></div><div class="col-md-8"><table class="table-striped table"><tbody><tr><th>${ssrInterpolate(unref(trans)("Name"))}</th><td>${ssrInterpolate((_a2 = __props.kycRequest.user) == null ? void 0 : _a2.name)}</td></tr><tr><th>${ssrInterpolate(unref(trans)("Email"))}</th><td>${ssrInterpolate((_b2 = __props.kycRequest.user) == null ? void 0 : _b2.email)}</td></tr><tr><th>${ssrInterpolate(unref(trans)("Phone"))}</th><td>${ssrInterpolate((_c = __props.kycRequest.user) == null ? void 0 : _c.phone)}</td></tr><tr><th>${ssrInterpolate(unref(trans)("KYC Verified At"))}</th><td>`);
      if ((_d = __props.kycRequest.user) == null ? void 0 : _d.kyc_verified_at) {
        _push(`<div>${ssrInterpolate((_e = __props.kycRequest.user) == null ? void 0 : _e.kyc_verified_at)}</div>`);
      } else {
        _push(`<div><div class="badge badge-danger mb-4">${ssrInterpolate(unref(trans)("Not yet verified!"))}</div><br>`);
        if (__props.kycRequest.status == 0) {
          _push(`<button class="btn btn-secondary">${ssrInterpolate(unref(trans)("Approve with profile"))}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</td></tr><tr><th>${ssrInterpolate(unref(trans)("Current Status"))}</th><td>`);
      if (__props.kycRequest.status == 0) {
        _push(`<span class="badge badge-warning">${ssrInterpolate(unref(trans)("Pending"))}</span>`);
      } else if (__props.kycRequest.status == 1) {
        _push(`<span class="badge badge-primary">${ssrInterpolate(unref(trans)("Approved"))}</span>`);
      } else if (__props.kycRequest.status == 2) {
        _push(`<span class="badge badge-danger">${ssrInterpolate(unref(trans)("Rejected"))}</span>`);
      } else if (__props.kycRequest.status == 3) {
        _push(`<span class="badge badge-dark">${ssrInterpolate(unref(trans)("Re-Submitted"))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</td></tr><tr><th>${ssrInterpolate(unref(trans)("Submitted At"))}</th><td>${ssrInterpolate(__props.kycRequest.created_at_date)}</td></tr>`);
      if (__props.kycRequest.status == 2) {
        _push(`<tr><th>${ssrInterpolate(unref(trans)("Rejected At"))}</th><td>${ssrInterpolate(__props.kycRequest.rejected_at)}</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></div></div><hr class="mb-10"><table class="mt-3 table"><thead><tr><td colspan="2"><h4 class="rounded-md bg-gray-300 py-2 text-center dark:bg-gray-700">${ssrInterpolate(unref(trans)("Submissions"))}</h4></td></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.kycRequest.data, (item) => {
        _push(`<tr><th>${ssrInterpolate(item.label)}</th><td>`);
        if (item.type == "file") {
          _push(`<a target="_blank" class="btn btn-success"${ssrRenderAttr("href", item.value)}>${ssrInterpolate(unref(trans)("View"))}</a>`);
        } else {
          _push(`<p>${ssrInterpolate(item.value)}</p>`);
        }
        _push(`</td></tr>`);
      });
      _push(`<!--]--></tbody></table><div class="mt-5 flex justify-start gap-3">`);
      if (__props.kycRequest.status !== 1) {
        _push(`<!--[--><button class="btn btn-primary"><i class="fas fa-check-circle"></i> ${ssrInterpolate(unref(trans)("Approve documents"))}</button><button class="btn btn-secondary"><i class="fas fa-check-circle"></i> ${ssrInterpolate(unref(trans)("Approve with profile"))}</button><button class="btn btn-danger"><i class="fas fa-times-circle"></i> ${ssrInterpolate(unref(trans)("Reject"))}</button><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></main>`);
    };
  }
});
const _sfc_setup$1M = _sfc_main$1M.setup;
_sfc_main$1M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/KYC/Requests/Show.vue");
  return _sfc_setup$1M ? _sfc_setup$1M(props, ctx) : void 0;
};
const __vite_glob_0_41 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1M
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1m = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1L = /* @__PURE__ */ Object.assign(__default__$1m, {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["languages", "countries", "buttons", "segments"],
  setup(__props) {
    sharedComposable();
    onMounted(() => {
      drawer.init();
    });
    const form = useForm({
      name: "",
      language_code: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><main class="container flex-grow p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Create a language",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th class="col-2">${ssrInterpolate(unref(trans)("Language Name"))}</th><th class="col-2">${ssrInterpolate(unref(trans)("Language Key"))}</th><th class="col-8"><div class="text-right">${ssrInterpolate(unref(trans)("Action"))}</div></th></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.languages, (language, key) => {
        _push(`<tr><td class="text-left">${ssrInterpolate(language)}</td><td class="text-left">${ssrInterpolate(key)}</td><td class="flex justify-end gap-3">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("admin.language.show", key),
          class: "btn btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fas fa-edit"${_scopeId}></i>`);
            } else {
              return [
                createVNode("i", { class: "fas fa-edit" })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<a href="javascript:void(0)" class="delete-confirm btn btn-primary"><i class="fas fa-trash"></i></a></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></main><div id="addNewLanguageDrawer" class="drawer drawer-right"><form><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Add New Language"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Language Name"))}</label><input${ssrRenderAttr("value", unref(form).name)} type="text" name="name" class="input" required placeholder="English"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Select Language"))}</label><select class="select" name="language_code"><!--[-->`);
      ssrRenderList(__props.countries, (country) => {
        _push(`<option${ssrRenderAttr("value", country.code)}>${ssrInterpolate(country.name)}</option>`);
      });
      _push(`<!--]--></select></div></div><div class="drawer-footer"><div class="flex justify-end gap-2"><button type="button" class="btn btn-secondary" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(form).processing,
        "btn-text": unref(trans)("Create")
      }, null, _parent));
      _push(`</div></div></form></div><!--]-->`);
    };
  }
});
const _sfc_setup$1L = _sfc_main$1L.setup;
_sfc_main$1L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Language/Index.vue");
  return _sfc_setup$1L ? _sfc_setup$1L(props, ctx) : void 0;
};
const __vite_glob_0_42 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1L
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1l = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1K = /* @__PURE__ */ Object.assign(__default__$1l, {
  __name: "Show",
  __ssrInlineRender: true,
  props: ["posts", "id", "buttons", "segments"],
  setup(__props) {
    const props = __props;
    onMounted(() => {
      drawer.init();
    });
    const form = useForm({
      key: "",
      value: "",
      id: props.id
    });
    const isProccessing = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><main class="sm:p6 container flex-grow p-4">`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Edit Language",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><form method="post"><div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th class="col-6">${ssrInterpolate(unref(trans)("Translation Key"))}</th><th class="col-6">${ssrInterpolate(unref(trans)("Translated Value"))}</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.posts, (value, key) => {
        _push(`<tr><td>${ssrInterpolate(key)}</td><td><input type="text" class="input"${ssrRenderAttr("value", __props.posts[key])}></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="card-footer">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        "btn-text": unref(trans)("Save Changes"),
        processing: isProccessing.value
      }, null, _parent));
      _push(`</div></form></div></main><div id="addNewLanguageKeyDrawer" class="drawer drawer-right"><form><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Add New Language"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Key"))}</label><input type="text" name="key"${ssrRenderAttr("value", unref(form).key)} class="input" required></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Value"))}</label><input type="text" name="value"${ssrRenderAttr("value", unref(form).value)} class="input" required></div></div><div class="drawer-footer"><div class="flex justify-end gap-2"><button type="button" class="btn btn-secondary" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(form).processing,
        "btn-text": unref(trans)("Create")
      }, null, _parent));
      _push(`</div></div></form></div><!--]-->`);
    };
  }
});
const _sfc_setup$1K = _sfc_main$1K.setup;
_sfc_main$1K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Language/Show.vue");
  return _sfc_setup$1K ? _sfc_setup$1K(props, ctx) : void 0;
};
const __vite_glob_0_43 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1K
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1k = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1J = /* @__PURE__ */ Object.assign(__default__$1k, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "segments",
    "buttons",
    "request",
    "allNotifications",
    "totalNotifications",
    "readNotifications",
    "unreadNotifications",
    "type"
  ],
  setup(__props) {
    const props = __props;
    const { textExcerpt, deleteRow } = sharedComposable();
    onMounted(() => {
      drawer.init();
    });
    const stats = [
      {
        value: props.totalNotifications,
        title: trans("Total Notifications"),
        iconClass: "bx bx-box"
      },
      {
        value: props.readNotifications,
        title: trans("Read Notifications"),
        iconClass: "bx bx-dollar-circle"
      },
      {
        value: props.unreadNotifications,
        title: trans("Unread Notifications"),
        iconClass: "ti ti-thumb-up"
      }
    ];
    const form = useForm({
      email: "",
      title: "",
      description: "",
      url: ""
    });
    const filterOptions = [
      {
        label: "Title",
        value: "notification"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><main class="container flex-grow p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Notifications",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: stats,
        grid: "3"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2m, { options: filterOptions }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Title"))}</th><th>${ssrInterpolate(unref(trans)("Comment"))}</th><th>${ssrInterpolate(unref(trans)("User"))}</th><th>${ssrInterpolate(unref(trans)("Seen"))}</th><th>${ssrInterpolate(unref(trans)("Created At"))}</th><th class="!text-right">${ssrInterpolate(unref(trans)("Actions"))}</th></tr></thead>`);
      if (__props.allNotifications.total) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.allNotifications.data, (notification) => {
          _push(`<tr><td class="text-left">${ssrInterpolate(unref(textExcerpt)(notification.title, 80))}</td><td>${ssrInterpolate(unref(textExcerpt)(notification.comment, 50))}</td><td>${ssrInterpolate(unref(textExcerpt)(notification.user.name, 15))}</td><td><span class="${ssrRenderClass([notification.seen == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(notification.seen == 1 ? "Read" : "Unread")}</span></td><td class="text-center">${ssrInterpolate(unref(moment)(notification.created_at).format("DD-MMM-YYYY"))}</td><td><div class="flex justify-end"><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item"><a class="dropdown-link delete-confirm" href="javascript:void(0)"><i class="h-5 text-slate-400" data-feather="trash-2"></i><span>${ssrInterpolate(unref(trans)("Delete"))}</span></a></li></ul></div></div></div></td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table></div>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.allNotifications.links
      }, null, _parent));
      _push(`</div></main><div id="addNewNotificationDrawer" class="drawer drawer-right"><form><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Send Notification"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="form-group"><label>${ssrInterpolate(unref(trans)("Receive Email"))}</label><input${ssrRenderAttr("value", unref(form).email)} type="email" name="email" class="input" required></div><div class="form-group"><label>${ssrInterpolate(unref(trans)("Title"))}</label><input${ssrRenderAttr("value", unref(form).title)} type="text" name="title" class="input" required maxlength="100"></div><div class="form-group"><label>${ssrInterpolate(unref(trans)("Description"))}</label><textarea class="textarea" required name="description" maxlength="200">${ssrInterpolate(unref(form).description)}</textarea></div><div class="form-group"><label>${ssrInterpolate(unref(trans)("Action Link"))}</label><input${ssrRenderAttr("value", unref(form).url)} type="url" name="url" class="input" required maxlength="100"></div></div><div class="drawer-footer"><div class="flex justify-end gap-2"><button type="button" class="btn btn-secondary" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(form).processing,
        "btn-text": unref(trans)("Create Notification")
      }, null, _parent));
      _push(`</div></div></form></div><!--]-->`);
    };
  }
});
const _sfc_setup$1J = _sfc_main$1J.setup;
_sfc_main$1J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Logs/Notification/Index.vue");
  return _sfc_setup$1J ? _sfc_setup$1J(props, ctx) : void 0;
};
const __vite_glob_0_44 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1J
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1j = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1I = /* @__PURE__ */ Object.assign(__default__$1j, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "histories",
    "totalTransactions",
    "totalActiveTransactions",
    "inActiveTransactions",
    "buttons",
    "segments",
    "request"
  ],
  setup(__props) {
    const props = __props;
    const { formatCurrency } = sharedComposable();
    [
      {
        value: props.totalTransactions,
        title: trans("Total Transactions"),
        iconClass: "bx bx-box"
      },
      {
        value: props.totalActiveTransactions,
        title: trans("Active Transactions"),
        iconClass: "bx bx-dollar-circle"
      },
      {
        value: props.totalInActiveTransactions,
        title: trans("Inactive Transactions"),
        iconClass: "ti ti-thumb-up"
      }
    ];
    const filterableItems = ["tnx"];
    const filterForm = useForm({
      keyword: "",
      search_in: filterableItems[0]
    });
    useForm({
      amount: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Transaction Histories" }, null, _parent));
      _push(`<main class="container flex-grow p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Deposit Histories",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: _ctx.gatewayStats,
        grid: "3"
      }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><div class="mb-3 flex items-center justify-end gap-x-2"><div class="dropdown" data-placement="bottom-end"><div class="dropdown-toggle"><button type="button" class="btn bg-white font-medium shadow-sm dark:bg-slate-800"><i class="w-4" data-feather="filter"></i><span>${ssrInterpolate(unref(trans)("Filter"))}</span><i class="w-4" data-feather="chevron-down"></i></button></div><div class="dropdown-content w-72 !overflow-visible"><form><ul class="dropdown-list space-y-4 p-4"><li class="dropdown-list-item"><h2 class="my-1 text-sm font-medium">${ssrInterpolate(unref(trans)("Status"))}</h2><div class="mb-2"><input type="text"${ssrRenderAttr("value", unref(filterForm).keyword)} class="input" placeholder="keyword"></div></li><li><select class="input"><!--[-->`);
      ssrRenderList(filterableItems, (opt) => {
        _push(`<option${ssrRenderAttr("value", opt)}>${ssrInterpolate(opt)}</option>`);
      });
      _push(`<!--]--></select></li><li class="dropdown-list-item"><button type="submit" class="btn btn-primary w-full">${ssrInterpolate(unref(trans)("Search"))}</button></li></ul></form></div></div></div><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Invoice No"))}</th><th>${ssrInterpolate(unref(trans)("User"))}</th><th>${ssrInterpolate(unref(trans)("Gateway"))}</th><th>${ssrInterpolate(unref(trans)("Trx"))}</th><th>${ssrInterpolate(unref(trans)("Amount"))}</th><th>${ssrInterpolate(unref(trans)("Status"))}</th><th>${ssrInterpolate(unref(trans)("Created At"))}</th><th><div class="text-end">${ssrInterpolate(unref(trans)("Action"))}</div></th></tr></thead>`);
      if (__props.histories.total) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.histories.data, (history) => {
          var _a2, _b2;
          _push(`<tr><td>`);
          _push(ssrRenderComponent(_component_Link, { href: "route('admin.deposit-logs.show', history.id)" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(history.invoice_no)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(history.invoice_no), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td>`);
          _push(ssrRenderComponent(_component_Link, {
            href: `users/${(_a2 = history.user) == null ? void 0 : _a2.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              var _a3, _b3;
              if (_push2) {
                _push2(`${ssrInterpolate((_a3 = history.user) == null ? void 0 : _a3.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString((_b3 = history.user) == null ? void 0 : _b3.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td><img${ssrRenderAttrs(mergeProps({
            alt: "",
            class: "h-4"
          }, ssrGetDirectiveProps(_ctx, _directive_lazy, (_b2 = history.gateway) == null ? void 0 : _b2.logo)))}></td><td>${ssrInterpolate(history.payment_id)}</td><td>${ssrInterpolate(unref(formatCurrency)(history.amount))}</td><td class="text-left"><span class="${ssrRenderClass([history.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(history.status == 0 ? unref(trans)("Declined") : "")} ${ssrInterpolate(history.status == 1 ? unref(trans)("Active") : "")} ${ssrInterpolate(history.status == 2 ? unref(trans)("Pending") : "")}</span></td><td>${ssrInterpolate(unref(moment)(history.created_at).format("D-MMM-Y"))}</td><td><div class="text-end">`);
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("admin.deposit-logs.show", history.id),
            class: "btn btn-sm btn-primary"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(trans)("Details"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(trans)("Details")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.histories.links
      }, null, _parent));
      _push(`</div></main><!--]-->`);
    };
  }
});
const _sfc_setup$1I = _sfc_main$1I.setup;
_sfc_main$1I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Logs/WalletTransactions/Index.vue");
  return _sfc_setup$1I ? _sfc_setup$1I(props, ctx) : void 0;
};
const __vite_glob_0_45 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1I
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1i = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1H = /* @__PURE__ */ Object.assign(__default__$1i, {
  __name: "Show",
  __ssrInlineRender: true,
  props: ["history", "segments", "buttons", "request"],
  setup(__props) {
    const { formatCurrency } = sharedComposable();
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2;
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Transaction Histories" }, null, _parent));
      _push(`<main class="container flex-grow p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Deposit History Details",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="card card-body mx-auto w-[600px]"><table class="table"><tbody><tr><th>${ssrInterpolate(unref(trans)("Invoice No"))}</th><td>${ssrInterpolate(__props.history.invoice_no)}</td></tr><tr><th>${ssrInterpolate(unref(trans)("User"))}</th><td>`);
      _push(ssrRenderComponent(_component_Link, {
        href: `users/${(_a2 = __props.history.user) == null ? void 0 : _a2.id}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a3, _b3;
          if (_push2) {
            _push2(`${ssrInterpolate((_a3 = __props.history.user) == null ? void 0 : _a3.name)}`);
          } else {
            return [
              createTextVNode(toDisplayString((_b3 = __props.history.user) == null ? void 0 : _b3.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</td></tr><tr><th>${ssrInterpolate(unref(trans)("Gateway"))}</th><td><img${ssrRenderAttrs(mergeProps({
        alt: "",
        class: "h-4"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, (_b2 = __props.history.gateway) == null ? void 0 : _b2.logo)))}></td></tr><tr><th>${ssrInterpolate(unref(trans)("Tnx"))}</th><td>${ssrInterpolate(__props.history.payment_id)}</td></tr><tr><th>${ssrInterpolate(unref(trans)("Amount"))}</th><td>${ssrInterpolate(unref(formatCurrency)(__props.history.amount))}</td></tr><tr><th>${ssrInterpolate(unref(trans)("Status"))}</th><td><span class="${ssrRenderClass([__props.history.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(__props.history.status == 0 ? unref(trans)("Declined") : "")} ${ssrInterpolate(__props.history.status == 1 ? unref(trans)("Active") : "")} ${ssrInterpolate(__props.history.status == 2 ? unref(trans)("Pending") : "")}</span></td></tr><tr><th>${ssrInterpolate(unref(trans)("Created At"))}</th><td>${ssrInterpolate(unref(moment)(__props.history.created_at).format("DD MMM, Y"))}</td></tr>`);
      if (__props.history.meta) {
        _push(`<!--[--><tr><th>${ssrInterpolate(unref(trans)("Attachment"))}</th><td><a target="_blank" class="btn btn-primary btn-sm"${ssrRenderAttr("href", __props.history.meta.screenshot)}>View</a></td></tr><tr><th>${ssrInterpolate(unref(trans)("Comment"))}</th><td>${ssrInterpolate(__props.history.meta.comment)}</td></tr><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table>`);
      if (__props.history.status == 2) {
        _push(`<div class="mt-4 flex justify-center gap-3"><button class="btn btn-success">${ssrInterpolate(unref(trans)("Approve"))}</button><button class="btn btn-danger">${ssrInterpolate(unref(trans)("Reject"))}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></main><!--]-->`);
    };
  }
});
const _sfc_setup$1H = _sfc_main$1H.setup;
_sfc_main$1H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Logs/WalletTransactions/Show.vue");
  return _sfc_setup$1H ? _sfc_setup$1H(props, ctx) : void 0;
};
const __vite_glob_0_46 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1H
}, Symbol.toStringTag, { value: "Module" }));
class Modal {
  constructor(target, options = {}) {
    this.target = null;
    this.modal = null;
    this.toggle = null;
    this.dismisses = null;
    this.transition = 500;
    this.options = {
      keyboard: true,
      //Boolean. Default is true
      backdrop: true,
      //Boolean | 'static'. Default is true
      autofucus: true,
      //Boolean. Default is true (focus the first input)
      ...options
    };
    this.documentOnKeydown = (e) => this.hideOnKeydown({ e, modal: this });
    if (typeof target === "string") {
      this.target = document.querySelector(target);
    } else if (target instanceof HTMLElement) {
      this.target = target;
    } else {
      throw new Error("No target element found");
    }
    if (this.target.classList.contains("modal")) {
      this.modal = this.target;
    } else {
      this.toggle = this.target;
      this.modal = document.querySelector(this.toggle.dataset.target);
      this.toggle.addEventListener("click", () => this.show());
    }
    this.dismisses = this.modal.querySelectorAll('[data-dismiss="modal"]');
    if (this.dismisses.length) {
      [...this.dismisses].forEach((dismiss) => {
        dismiss.addEventListener("click", () => this.hide());
      });
    }
  }
  show() {
    const modal2 = this.modal;
    if (!modal2.classList.contains("show")) {
      modal2.style.display = "flex";
      modal2.appendChild(this.createBackdrop());
      if (this.options.autofucus) {
        const input = modal2.querySelector("input");
        input && input.focus();
      }
      setTimeout(() => {
        const modalBackdrop = modal2.querySelector(".modal-backdrop");
        modal2.classList.add("show");
        if (modalBackdrop) {
          modalBackdrop.classList.add("show");
          modalBackdrop.addEventListener("click", () => {
            if (this.options.backdrop && this.options.backdrop !== "static") {
              this.hide();
            }
          });
        }
        if (this.options.keyboard) {
          document.addEventListener("keydown", this.documentOnKeydown);
        }
      }, 15);
    }
  }
  hide() {
    const modal2 = this.modal;
    if (modal2.classList.contains("show")) {
      const modalBackdrop = modal2.querySelector(".modal-backdrop");
      modal2.classList.remove("show");
      if (modalBackdrop) {
        modalBackdrop.classList.remove("show");
      }
      setTimeout(() => {
        modal2.removeAttribute("style");
        modalBackdrop.remove();
        document.removeEventListener("keydown", this.documentOnKeydown);
      }, this.transition);
    }
  }
  hideOnKeydown(args) {
    const { e, modal: modal2 } = args;
    if (e.key === "Escape" && modal2.options.keyboard) {
      modal2.hide();
    }
  }
  createBackdrop() {
    const backdrop = document.createElement("div");
    backdrop.classList.add("modal-backdrop");
    if (this.options.backdrop === "static") {
      backdrop.addEventListener("click", (event) => event.stopPropagation());
    } else if (this.options.backdrop) {
      backdrop.addEventListener("click", () => this.hide());
    }
    return backdrop;
  }
}
window.createModal = function(target, options = {}) {
  return new Modal(target, options);
};
const __default__$1h = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1G = /* @__PURE__ */ Object.assign(__default__$1h, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "menus",
    "languages",
    "totalMenus",
    "totalActiveMenus",
    "totalDraftMenus",
    "segments",
    "buttons"
  ],
  setup(__props) {
    const props = __props;
    onMounted(() => {
      drawer.init();
    });
    sharedComposable();
    const form = useForm({
      name: null,
      position: null,
      language: "en",
      status: 0
    });
    const menuStats = [
      {
        value: props.totalMenus,
        title: trans("Total Menus"),
        iconClass: "bx bx-box"
      },
      {
        value: props.totalActiveMenus,
        title: trans("Active Menus"),
        iconClass: "bx bx-dollar-circle"
      },
      {
        value: props.totalDraftMenus,
        title: trans("Inactive Menus"),
        iconClass: "ti ti-thumb-up"
      }
    ];
    const edit = useForm({
      name: null,
      position: null,
      language: "en",
      status: null,
      id: null
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[--><main class="container flex-grow p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Menu"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: menuStats,
        grid: "3"
      }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Menu Name"))}</th><th>${ssrInterpolate(unref(trans)("Position"))}</th><th class="text-center">${ssrInterpolate(unref(trans)("Language"))}</th><th>${ssrInterpolate(unref(trans)("Status"))}</th><th>${ssrInterpolate(unref(trans)("Last Update"))}</th><th class="!text-right">${ssrInterpolate(unref(trans)("Action"))}</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.menus, (menu2) => {
        _push(`<tr><td class="text-left">`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("admin.menu.show", menu2.id)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(menu2.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(menu2.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</td><td class="text-left">${ssrInterpolate(menu2.position)}</td><td class="text-center">${ssrInterpolate(menu2.lang)}</td><td class="text-left"><span class="${ssrRenderClass([menu2.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(menu2.status == 1 ? unref(trans)("Active") : unref(trans)("Draft"))}</span></td><td>${ssrInterpolate(menu2.created_at_diff)}</td><td><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item">`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("admin.menu.show", menu2.id),
          class: "dropdown-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="h-5 text-slate-400" data-feather="list"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(unref(trans)("Manage"))}</span>`);
            } else {
              return [
                createVNode("i", {
                  class: "h-5 text-slate-400",
                  "data-feather": "list"
                }),
                createVNode("span", null, toDisplayString(unref(trans)("Manage")), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li><li class="dropdown-list-item"><button class="dropdown-link"><i class="h-5 text-slate-400" data-feather="edit"></i><span>${ssrInterpolate(unref(trans)("Edit"))}</span></button></li><li class="dropdown-list-item"><button class="dropdown-link"><i class="h-5 text-slate-400" data-feather="trash-2">${ssrInterpolate(unref(trans)("Remove"))}&gt;</i><span>${ssrInterpolate(unref(trans)("Delete"))}</span></button></li></ul></div></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></main><div id="addNewMenuDrawer" class="drawer drawer-right"><form><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Add New Menu"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div><label class="label label-required mb-1">${ssrInterpolate(unref(trans)("Menu Name"))}</label><input type="text"${ssrRenderAttr("value", unref(form).name)} name="name" class="input" required placeholder="Example"></div><div><label class="label label-required mb-1">${ssrInterpolate(unref(trans)("Select Menu Position"))}</label><select class="input" name="position"><option value="main-menu">${ssrInterpolate(unref(trans)("Main Menu"))}</option><option value="footer-left">${ssrInterpolate(unref(trans)("Footer Left"))}</option><option value="footer-right">${ssrInterpolate(unref(trans)("Footer right"))}</option></select></div><div><label class="label label-required mb-1">${ssrInterpolate(unref(trans)("Select Language"))}</label><select class="input" name="language"><!--[-->`);
      ssrRenderList(__props.languages, (language, languageKey) => {
        _push(`<option${ssrRenderAttr("value", languageKey)}>${ssrInterpolate(language)}</option>`);
      });
      _push(`<!--]--></select></div><div><label class="label label-required mb-1">${ssrInterpolate(unref(trans)("Menu Status"))}</label><select class="input" name="status"><option value="1">${ssrInterpolate(unref(trans)("Active"))}</option><option value="0">${ssrInterpolate(unref(trans)("Draft"))}</option></select></div></div><div class="drawer-footer"><div class="flex justify-end gap-2"><button type="button" class="btn btn-secondary" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(form).processing,
        "btn-text": unref(trans)("Create")
      }, null, _parent));
      _push(`</div></div></form></div><div id="editMenuDrawer" class="drawer drawer-right"><form><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Edit Menu"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div><label class="label label-required">${ssrInterpolate(unref(trans)("Menu Name"))}</label><input${ssrRenderAttr("value", unref(edit).name)} type="text" name="name" class="input" required placeholder="Name"></div><div><label class="label label-required">${ssrInterpolate(unref(trans)("Select Menu Position"))}</label><select class="input" name="position"><option value="main-menu">${ssrInterpolate(unref(trans)("Main Menu"))}</option><option value="footer-left">${ssrInterpolate(unref(trans)("Footer Left"))}</option><option value="footer-right">${ssrInterpolate(unref(trans)("Footer right"))}</option></select></div><div><label class="label label-required">${ssrInterpolate(unref(trans)("Select Language"))}</label><select name="language" class="input" required><!--[-->`);
      ssrRenderList(__props.languages, (language, languageKey) => {
        _push(`<option${ssrRenderAttr("value", languageKey)}>${ssrInterpolate(language)}</option>`);
      });
      _push(`<!--]--></select></div><div c><label class="label label-required">${ssrInterpolate(unref(trans)("Menu Status"))}</label><select class="input" name="status"><option value="1">${ssrInterpolate(unref(trans)("Active"))}</option><option value="0">${ssrInterpolate(unref(trans)("Draft"))}</option></select></div></div><div class="drawer-footer"><div class="flex justify-end gap-2"><button type="button" class="btn btn-secondary" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(edit).processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></form></div><!--]-->`);
    };
  }
});
const _sfc_setup$1G = _sfc_main$1G.setup;
_sfc_main$1G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Menu/Index.vue");
  return _sfc_setup$1G ? _sfc_setup$1G(props, ctx) : void 0;
};
const __vite_glob_0_47 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1G
}, Symbol.toStringTag, { value: "Module" }));
const menu = reactive({
  contents: [],
  contentId: null,
  isEdit: false,
  newItem: reactive({
    id: null,
    text: "",
    icon: "",
    href: "",
    target: "_self",
    title: "",
    children: []
  }),
  addNewItem() {
    if (this.newItem.text) {
      this.newItem.id = Math.floor(Math.random() * Date.now()).toString(36);
      const newItemCopy = JSON.parse(JSON.stringify(this.newItem));
      this.contents.push(newItemCopy);
      this.resetItem();
    }
  },
  editItem() {
    this.isEdit = true;
    const item = this.findItemById(this.contents, this.contentId);
    if (item) {
      this.newItem = { ...item };
    }
  },
  updateItem() {
    const item = this.findItemById(this.contents, this.newItem.id);
    if (item && this.newItem.text) {
      Object.assign(item, this.newItem);
      this.resetItem();
      this.isEdit = false;
    }
  },
  removeItemById(arr, id) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        arr.splice(i, 1);
        return;
      }
      if (arr[i].children && arr[i].children.length > 0) {
        this.removeItemById(arr[i].children, id);
      }
    }
  },
  removeItem() {
    this.removeItemById(this.contents, this.contentId);
  },
  resetItem() {
    setTimeout(() => {
      this.newItem = {
        id: null,
        text: "",
        icon: "",
        href: "",
        target: "_self",
        title: "",
        children: []
      };
    }, 500);
  },
  findItemById(arr, id) {
    for (const item of arr) {
      if (item.id === id) {
        return item;
      }
      if (item.children && item.children.length > 0) {
        const found = this.findItemById(item.children, id);
        if (found)
          return found;
      }
    }
    return null;
  }
});
const NestedDraggable_vue_vue_type_style_index_0_scoped_dd242e89_lang = "";
const _sfc_main$1F = {
  __name: "NestedDraggable",
  __ssrInlineRender: true,
  props: {
    tasks: {
      required: true
    }
  },
  setup(__props) {
    const dragging = ref(false);
    const remove = (id) => {
      menu.contentId = id;
      menu.removeItem();
    };
    const edit = (id) => {
      menu.contentId = id;
      menu.editItem();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nested_draggable = resolveComponent("nested-draggable", true);
      _push(ssrRenderComponent(unref(draggable), mergeProps({
        class: "dragArea",
        tag: "ul",
        list: __props.tasks,
        group: { name: "g" },
        "item-key": "text",
        onStart: ($event) => dragging.value = true,
        onEnd: ($event) => dragging.value = false
      }, _attrs), {
        item: withCtx(({ element }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<li data-v-dd242e89${_scopeId}><div class="flex items-center justify-between rounded border p-2" data-v-dd242e89${_scopeId}><p data-v-dd242e89${_scopeId}><i class="fa fa-arrows-alt" aria-hidden="true" data-v-dd242e89${_scopeId}></i> ${ssrInterpolate(element.text)}</p><div data-v-dd242e89${_scopeId}><button class="btn" data-v-dd242e89${_scopeId}><i class="fas fa-pen" data-v-dd242e89${_scopeId}></i></button><button class="btn" data-v-dd242e89${_scopeId}><i class="fas fa-trash" data-v-dd242e89${_scopeId}></i></button></div></div>`);
            _push2(ssrRenderComponent(_component_nested_draggable, {
              tasks: element.children
            }, null, _parent2, _scopeId));
            _push2(`</li>`);
          } else {
            return [
              createVNode("li", null, [
                createVNode("div", { class: "flex items-center justify-between rounded border p-2" }, [
                  createVNode("p", null, [
                    createVNode("i", {
                      class: "fa fa-arrows-alt",
                      "aria-hidden": "true"
                    }),
                    createTextVNode(" " + toDisplayString(element.text), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("button", {
                      class: "btn",
                      onClick: ($event) => edit(element.id)
                    }, [
                      createVNode("i", { class: "fas fa-pen" })
                    ], 8, ["onClick"]),
                    createVNode("button", {
                      class: "btn",
                      onClick: ($event) => remove(element.id)
                    }, [
                      createVNode("i", { class: "fas fa-trash" })
                    ], 8, ["onClick"])
                  ])
                ]),
                createVNode(_component_nested_draggable, {
                  tasks: element.children
                }, null, 8, ["tasks"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1F = _sfc_main$1F.setup;
_sfc_main$1F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/NestedDraggable.vue");
  return _sfc_setup$1F ? _sfc_setup$1F(props, ctx) : void 0;
};
const NestedDraggable = /* @__PURE__ */ _export_sfc(_sfc_main$1F, [["__scopeId", "data-v-dd242e89"]]);
const __default__$1g = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1E = /* @__PURE__ */ Object.assign(__default__$1g, {
  __name: "Show",
  __ssrInlineRender: true,
  props: ["info", "contents", "segments", "buttons"],
  setup(__props) {
    const props = __props;
    onMounted(() => {
      menu.contents = props.contents;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Manage Menu"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="grid grid-cols-3 items-start gap-2"><div class="card col-span-2"><div class="card-body"><div class="mb-8 flex items-center justify-between"><h4>${ssrInterpolate(unref(trans)("Menu Items"))}</h4><button type="button" id="form-button" class="btn btn-success">${ssrInterpolate(unref(trans)("Save"))}</button></div><div>`);
      if (props.contents) {
        _push(ssrRenderComponent(NestedDraggable, {
          tasks: unref(menu).contents
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="col-span-1"><div class="card"><div class="card-body w-full"><h4 class="mb-5">${ssrInterpolate(unref(trans)("Create Menu Items"))}</h4><form class="space-y-6"><div><label for="text" class="label label-required">${ssrInterpolate(unref(trans)("Text"))}</label><input type="text" class="input" name="text" id="text" placeholder="Text" autocomplete="off"${ssrRenderAttr("value", unref(menu).newItem.text)}></div><div><label for="href" class="label label-required">${ssrInterpolate(unref(trans)("URL"))}</label><input type="text" class="input" id="href" name="href" placeholder="URL" required autocomplete="off"${ssrRenderAttr("value", unref(menu).newItem.href)}></div><div><label for="target" class="label label-required">${ssrInterpolate(unref(trans)("Target"))}</label><select name="target" class="input"><option value="_self">${ssrInterpolate(unref(trans)("Self"))}</option><option value="_blank">${ssrInterpolate(unref(trans)("Blank"))}</option><option value="_top">${ssrInterpolate(unref(trans)("Top"))}</option></select></div></form><div class="menu-add-update mt-6 flex"><button type="button" id="btnUpdate" class="btn btn-update btn-warning mr-2 flex-1 text-white"${ssrIncludeBooleanAttr(!unref(menu).isEdit) ? " disabled" : ""}><i class="w-4" data-feather="refresh-cw"></i> ${ssrInterpolate(unref(trans)("Update"))}</button><button type="button" id="btnAdd" class="btn btn-success flex-1"${ssrIncludeBooleanAttr(unref(menu).isEdit) ? " disabled" : ""}><i class="w-5" data-feather="plus"></i> ${ssrInterpolate(unref(trans)("Add"))}</button></div></div></div></div></div></main>`);
    };
  }
});
const _sfc_setup$1E = _sfc_main$1E.setup;
_sfc_main$1E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Menu/Show.vue");
  return _sfc_setup$1E ? _sfc_setup$1E(props, ctx) : void 0;
};
const __vite_glob_0_48 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1E
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1f = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1D = /* @__PURE__ */ Object.assign(__default__$1f, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "segments",
    "buttons",
    "orders",
    "request",
    "totalOrders",
    "totalPendingOrders",
    "totalCompleteOrders",
    "totalDeclinedOrders",
    "type",
    "invoice",
    "currency",
    "tax"
  ],
  setup(__props) {
    const props = __props;
    onMounted(() => {
      drawer.init();
    });
    const { formatCurrency } = sharedComposable();
    const orderOverviews = [
      { value: props.totalOrders, title: trans("Total Orders"), iconClass: "bx bx-box" },
      {
        value: props.totalPendingOrders,
        title: trans("Pending Orders"),
        iconClass: "bx bx-dollar-circle"
      },
      {
        value: props.totalCompleteOrders,
        title: trans("Completed Orders"),
        iconClass: "ti ti-thumb-up"
      },
      {
        value: props.totalDeclinedOrders,
        title: trans("Declined Orders"),
        iconClass: "ti ti-message-2-cog"
      }
    ];
    const invoiceFrom = useForm({
      company_name: props.invoice.company_name,
      address: props.invoice.address,
      city: props.invoice.city,
      post_code: props.invoice.post_code,
      country: props.invoice.country
    });
    const currencyFrom = useForm({
      name: props.currency.name,
      icon: props.currency.icon,
      position: props.currency.position
    });
    const taxFrom = useForm({
      tax: props.tax
    });
    const filterOptions = [
      {
        label: "Order no",
        value: "invoice_no"
      },
      {
        label: "Project Title",
        value: "project_title"
      },
      {
        label: "Status",
        value: "status",
        options: [
          {
            label: "Approved",
            value: 1
          },
          {
            label: "Pending",
            value: 2
          }
        ]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[--><main class="container flex-grow p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Order List"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-4">`);
      _push(ssrRenderComponent(_sfc_main$2s, { items: orderOverviews }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2m, { options: filterOptions }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Order No"))}</th><th>${ssrInterpolate(unref(trans)("Project Name"))}</th><th>${ssrInterpolate(unref(trans)("Payment Mode"))}</th><th>${ssrInterpolate(unref(trans)("Amount"))}</th><th>${ssrInterpolate(unref(trans)("Status"))}</th><th>${ssrInterpolate(unref(trans)("Created At"))}</th><th class="!text-right">${ssrInterpolate(unref(trans)("Actions"))}</th></tr></thead>`);
      if (__props.orders.total) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.orders.data, (order) => {
          var _a2;
          _push(`<tr><td>`);
          _push(ssrRenderComponent(_component_Link, {
            href: "/admin/order/" + order.id,
            class: "text-sm font-medium text-primary-500 transition duration-150 ease-in-out hover:underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(order.invoice_no)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(order.invoice_no), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td>${ssrInterpolate(order.project.title)}</td><td>${ssrInterpolate(((_a2 = order.gateway) == null ? void 0 : _a2.name) ?? "NA")}</td><td>${ssrInterpolate(unref(formatCurrency)(order.amount))}</td><td><div class="badge badge-soft-primary capitalize">${ssrInterpolate(unref(trans)(
            order.status == 2 ? "pending" : order.status == 1 ? "approved" : "declined"
          ))}</div></td><td class="text-center">${ssrInterpolate(order.created_at_diff)}</td><td><div class="flex justify-center"><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item">`);
          _push(ssrRenderComponent(_component_Link, {
            href: "/admin/order/" + order.id,
            class: "dropdown-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="h-5 text-slate-400" data-feather="external-link"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(unref(trans)("View"))}</span>`);
              } else {
                return [
                  createVNode("i", {
                    class: "h-5 text-slate-400",
                    "data-feather": "external-link"
                  }),
                  createVNode("span", null, toDisplayString(unref(trans)("View")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li></ul></div></div></div></td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table></div>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.orders.links
      }, null, _parent));
      _push(`</div></main><div id="invoiceSettingDrawer" class="drawer drawer-right"><form method="POST"><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Edit Invoice Information"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Company Name"))}</label><input type="text"${ssrRenderAttr("value", unref(invoiceFrom).company_name)} class="input" required=""></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Company Address"))}</label><input type="text" name="data[address]"${ssrRenderAttr("value", unref(invoiceFrom).address)} class="input" required=""></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Company City"))}</label><input type="text" name="data[city]"${ssrRenderAttr("value", unref(invoiceFrom).city)} class="input" required=""></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Post Code"))}</label><input type="text" name="data[post_code]"${ssrRenderAttr("value", unref(invoiceFrom).post_code)} class="input" required=""></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Country"))}</label><input type="text" name="data[country]"${ssrRenderAttr("value", unref(invoiceFrom).country)} class="input" required=""></div></div><div class="drawer-footer"><div class="flex justify-end gap-2"><button type="button" class="btn btn-secondary" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(invoiceFrom).processing,
        "btn-text": "Update"
      }, null, _parent));
      _push(`</div></div></form></div><div id="currencySettingDrawer" class="drawer drawer-right"><form method="POST"><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Currency Settings"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Currency Name"))}</label><input type="text" name="data[name]"${ssrRenderAttr("value", unref(currencyFrom).name)} class="input" required=""></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Currency Icon"))}</label><input type="text" name="data[icon]"${ssrRenderAttr("value", unref(currencyFrom).icon)} class="input" required=""></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Currency Icon"))}</label><select class="select" name="data[position]"><option value="left">${ssrInterpolate(unref(trans)("Left"))}</option><option value="right">${ssrInterpolate(unref(trans)("Right"))}</option></select></div></div><div class="drawer-footer"><div class="flex justify-end gap-2"><button type="button" class="btn btn-secondary" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(currencyFrom).processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></form></div><div id="taxSettingDrawer" class="drawer drawer-right"><form method="POST"><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Tax Settings"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Tax Amount"))}</label><input type="number" step="any" name="data"${ssrRenderAttr("value", unref(taxFrom).tax)} class="input" required></div></div><div class="drawer-footer"><div class="flex justify-end gap-2"><button type="button" class="btn btn-secondary" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(taxFrom).processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></form><div class="drawer-backdrop"></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$1D = _sfc_main$1D.setup;
_sfc_main$1D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Order/Index.vue");
  return _sfc_setup$1D ? _sfc_setup$1D(props, ctx) : void 0;
};
const __vite_glob_0_49 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1D
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1e = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1C = /* @__PURE__ */ Object.assign(__default__$1e, {
  __name: "Show",
  __ssrInlineRender: true,
  props: [
    "order",
    "invoice_data",
    "segments",
    "buttons",
    "meta",
    "project_durations"
  ],
  setup(__props) {
    const props = __props;
    const { formatCurrency } = sharedComposable();
    const form = useForm({
      status: props.order.status,
      assign_order: "no"
    });
    const calculateProfitReturn = (percentage, qty) => {
      return formatCurrency(props.order.project.invest_amount / 100 * percentage * qty);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Invoice details",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="card"><div class="space-y-6 card-body"><div class="flex flex-col justify-between p-1 space-y-4 md:flex-row"><div class="flex items-center justify-center md:justify-start"><div class="flex items-center w-full h-16 gap-4 pr-4"><img${ssrRenderAttrs(mergeProps({
        alt: "logo",
        class: "block h-[45px] dark:hidden"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, _ctx.$page.props.primaryData.deep_logo)))}><img${ssrRenderAttrs(mergeProps({
        alt: "logo",
        class: "hidden h-[45px] dark:block"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, _ctx.$page.props.primaryData.logo)))}></div></div><div class="flex flex-col items-start justify-center md:items-end"><h4>Invoice #${ssrInterpolate(__props.order.invoice_no)}</h4><p class="py-0 my-0 text-sm font-medium text-slate-700 dark:text-slate-300">${ssrInterpolate(_ctx.trans("Order Date"))}: <span class="font-normal text-slate-600 dark:text-slate-300">${ssrInterpolate(unref(moment)(__props.order.created_at).format("DD-MM-YYYY"))}</span></p><p class="py-0 my-0 text-sm font-medium text-slate-700 dark:text-slate-300">${ssrInterpolate(_ctx.trans("Status"))}: <span class="font-normal text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.order.status == 2 ? "pending" : __props.order.status == 1 ? "approved" : "declined")}</span></p></div></div><div class="flex flex-col justify-between p-1 space-y-6 md:flex-row md:space-y-0"><div class="flex flex-col items-start justify-center w-full md:mb-0 md:w-2/3 md:justify-center"><p class="text-xs font-medium uppercase text-slate-400">BILLED FROM</p><h6 class="my-1">${ssrInterpolate(__props.invoice_data.company_name)}</h6><p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.invoice_data.address)}</p><p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.invoice_data.city)}</p><p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.invoice_data.post_code)}</p><p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.invoice_data.country)}</p></div><div class="flex flex-col items-start justify-center w-full md:w-1/3 md:items-end"><p class="text-xs font-medium uppercase text-slate-400">BILLED TO</p><h6 class="my-1">${ssrInterpolate(__props.order.user.name)}</h6><p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.order.user.address)}</p><p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.order.user.email)}</p><p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.order.user.phone)}</p></div></div><div class="w-full p-1 overflow-auto"><div class="min-w-[38rem]"><div class="border table-responsive whitespace-nowrap rounded-primary border-slate-200 dark:border-slate-600"><table class="table table-striped table-hover table-md"><tbody><tr><td class="col-9">${ssrInterpolate(_ctx.trans("Project Name"))}</td><td class="text-right col-3"><p class="text-right">${ssrInterpolate(_ctx.trans("Unit Price"))}</p></td></tr><tr><td><img${ssrRenderAttrs(mergeProps({
        class: "inline w-12 mr-2 rounded",
        alt: "preview"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, __props.order.project.preview)))}> ${ssrInterpolate(__props.order.project.title)}</td><td class="text-right"><p class="text-right">${ssrInterpolate(unref(formatCurrency)(__props.order.project.invest_amount))}</p></td></tr></tbody></table></div><h5 class="my-3">Invest Details</h5><div class="border table-responsive whitespace-nowrap rounded-primary border-slate-200 dark:border-slate-600"><table class="table table-striped table-hover table-md"><tbody><tr><td>${ssrInterpolate(_ctx.trans("Duration"))}</td><td>${ssrInterpolate(_ctx.trans("ROI"))}</td><td>${ssrInterpolate(_ctx.trans("Net Profit"))}</td><td>${ssrInterpolate(_ctx.trans("QTY"))}</td><td><p class="text-right">${ssrInterpolate(_ctx.trans("Subtotal"))}</p></td></tr><!--[-->`);
      ssrRenderList(__props.project_durations, (duration) => {
        _push(`<tr><td class="text-center">${ssrInterpolate(duration.duration)}/${ssrInterpolate(duration.duration_type)}</td><td class="text-center">${ssrInterpolate(`${duration.return_type == "fixed" ? unref(formatCurrency)(duration.min_profit_return) : duration.min_profit_return + "%"}`)} - ${ssrInterpolate(`${duration.return_type == "fixed" ? unref(formatCurrency)(duration.max_profit_return) : duration.max_profit_return + "%"}`)}</td><td class="text-center">${ssrInterpolate(calculateProfitReturn(duration.min_profit_return, duration.qty))} - ${ssrInterpolate(calculateProfitReturn(duration.max_profit_return, duration.qty))}</td><td class="text-center">${ssrInterpolate(duration.qty)}</td><td class="text-center"><p class="text-right">${ssrInterpolate(unref(formatCurrency)(__props.order.project.invest_amount * duration.qty))}</p></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="flex items-stretch justify-between mt-4"><div class="w-2/5"><p class="py-0 my-2 text-sm font-semibold">${ssrInterpolate(_ctx.trans("Payment Method"))}: <span class="font-normal">${ssrInterpolate(((_a2 = __props.order.gateway) == null ? void 0 : _a2.name) ?? "NA")}</span></p><p class="py-0 my-2 text-sm font-semibold">${ssrInterpolate(_ctx.trans("Payment Id"))}: <span class="font-normal">${ssrInterpolate(__props.order.payment_id)}</span></p><div class="">`);
      if (__props.meta != null) {
        _push(`<!--[--><div class="font-semibold">${ssrInterpolate(_ctx.trans("Payment Info:"))}</div><br><p class="section-lead">${ssrInterpolate(__props.meta.comment)}</p><p class="section-lead"><a target="_blank"${ssrRenderAttr("href", __props.meta.screenshot)}>${ssrInterpolate(_ctx.trans("Attachment"))}</a></p><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="space-y-3"><div class="flex items-center justify-between gap-x-2"><p class="text-sm text-slate-400 dark:text-slate-300">${ssrInterpolate(_ctx.trans("Subtotal"))}: </p><p class="text-sm font-semibold text-slate-700 dark:text-slate-300">${ssrInterpolate(unref(formatCurrency)(__props.order.amount))}</p></div><div class="flex items-center justify-between gap-x-2"><p class="text-sm text-slate-400 dark:text-slate-300">${ssrInterpolate(_ctx.trans("Tax"))}: </p><p class="text-sm font-semibold text-right text-slate-700 dark:text-slate-300">${ssrInterpolate(unref(formatCurrency)(__props.order.tax || 0))}</p></div><hr class="mt-5 mb-1 border-slate-200 dark:border-slate-600"><div class="flex items-center justify-between gap-x-2"><p class="text-sm text-slate-400">${ssrInterpolate(_ctx.trans("Total"))}:</p><p class="text-sm font-semibold text-slate-700 dark:text-slate-300">${ssrInterpolate(unref(formatCurrency)(__props.order.amount + __props.order.tax || 0))}</p></div></div></div></div></div><p class="py-2 text-sm text-center">${ssrInterpolate(_ctx.trans("Thanks for your Business"))}</p></div></div><div class="mt-4 card"><form><div class="flex space-x-2 card-body"><div class="col-span-3 mb-2"><label class="float-left">${ssrInterpolate(_ctx.trans("Order Status"))}</label><select class="select" name="status"><option value="1">${ssrInterpolate(_ctx.trans("Approved"))}</option><option value="2">${ssrInterpolate(_ctx.trans("Pending"))}</option><option value="0">${ssrInterpolate(_ctx.trans("Rejected"))}</option></select></div><div class="col-auto mb-2"><br><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}>${ssrInterpolate(_ctx.trans("Update"))}</button></div></div></form></div></main>`);
    };
  }
});
const _sfc_setup$1C = _sfc_main$1C.setup;
_sfc_main$1C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Order/Show.vue");
  return _sfc_setup$1C ? _sfc_setup$1C(props, ctx) : void 0;
};
const __vite_glob_0_50 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1C
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1d = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1B = /* @__PURE__ */ Object.assign(__default__$1d, {
  __name: "Create",
  __ssrInlineRender: true,
  props: ["buttons", "segments"],
  setup(__props) {
    const { cke, ClassicEditor: ClassicEditor2 } = ckeEditor();
    const form = useForm({
      title: "",
      description: "",
      meta_title: "",
      meta_description: "",
      meta_tags: "",
      status: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Create Page",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<form method="post"><div class="card"><div class="card-body space-y-5"><div class="mb-2"><label class="label label-required mb-1">${ssrInterpolate(unref(trans)("Page Title"))}</label><input type="text" name="title"${ssrRenderAttr("value", unref(form).title)} required class="input"></div><div class="mb-2"><label class="label label-required mb-1">${ssrInterpolate(unref(trans)("Page Description"))}</label>`);
      _push(ssrRenderComponent(unref(cke), {
        "tag-name": "textarea",
        editor: unref(ClassicEditor2),
        modelValue: unref(form).description,
        "onUpdate:modelValue": ($event) => unref(form).description = $event
      }, null, _parent));
      _push(`</div><div class="mb-2"><label class="label label-required mb-1">${ssrInterpolate(unref(trans)("SEO Meta Title"))}</label><div class="col-lg-12"><input${ssrRenderAttr("value", unref(form).meta_title)} type="text" name="meta_title" required class="input"></div></div><div class="mb-2 mt-2"><label class="label label-required mb-1">${ssrInterpolate(unref(trans)("SEO Meta Description"))}</label><div class="col-lg-12"><textarea name="meta_description" required class="textarea">${ssrInterpolate(unref(form).meta_description)}</textarea></div></div><div class="mb-2 mt-3"><label class="label label-required mb-1">${ssrInterpolate(unref(trans)("SEO Meta Tags"))}</label><div class="col-lg-12"><input${ssrRenderAttr("value", unref(form).meta_tags)} type="text" name="meta_tags" required class="input"></div></div><div class="flex items-center gap-1.5"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, null) : unref(form).status) ? " checked" : ""} class="checkbox" type="checkbox" name="basic-checkbox"><label for="checked" class="label text-lg font-semibold">${ssrInterpolate(unref(trans)("Make it publish?"))}</label></div>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        processing: unref(form).processing,
        btnText: unref(trans)("Create")
      }, null, _parent));
      _push(`</div></div></form></main>`);
    };
  }
});
const _sfc_setup$1B = _sfc_main$1B.setup;
_sfc_main$1B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Page/Create.vue");
  return _sfc_setup$1B ? _sfc_setup$1B(props, ctx) : void 0;
};
const __vite_glob_0_51 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1B
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1c = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1A = /* @__PURE__ */ Object.assign(__default__$1c, {
  __name: "Edit",
  __ssrInlineRender: true,
  props: ["buttons", "segments", "info", "seo"],
  setup(__props) {
    const props = __props;
    const { cke, ClassicEditor: ClassicEditor2 } = ckeEditor();
    const isPoroccessing = ref(false);
    const seoMeta = ref({
      meta_title: "",
      meta_description: "",
      meta_tags: ""
    });
    onMounted(() => {
      seoMeta.value.meta_title = props.seo.title;
      seoMeta.value.meta_description = props.seo.description;
      seoMeta.value.meta_tags = props.seo.tags;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Edit Page",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<form method="post"><div class="card"><div class="card-body space-y-5"><div><label class="label label-required mb-1">${ssrInterpolate(unref(trans)("Page Title"))}</label><input type="text" name="title"${ssrRenderAttr("value", __props.info.title)} required class="input"></div><div><label class="label label-required mb-1">${ssrInterpolate(unref(trans)("Page Description"))}</label>`);
      _push(ssrRenderComponent(unref(cke), {
        "tag-name": "textarea",
        editor: unref(ClassicEditor2),
        modelValue: __props.info.description.value,
        "onUpdate:modelValue": ($event) => __props.info.description.value = $event
      }, null, _parent));
      _push(`</div><div class="mb-2"><label class="label label-required mb-1">${ssrInterpolate(unref(trans)("SEO Meta Title"))}</label><input${ssrRenderAttr("value", seoMeta.value.meta_title)} type="text" name="meta_title" required class="input"></div><div class="mb-2 mt-2"><label class="label label-required mb-1">${ssrInterpolate(unref(trans)("SEO Meta Description"))}</label><textarea name="meta_description" required class="textarea">${ssrInterpolate(seoMeta.value.meta_description)}</textarea></div><div class="mb-2 mt-3"><label class="label label-required mb-1">${ssrInterpolate(unref(trans)("SEO Meta Tags"))}</label><input${ssrRenderAttr("value", seoMeta.value.meta_tags)} type="text" name="meta_tags" required class="input"></div><div class="flex items-center gap-1.5"><input${ssrIncludeBooleanAttr(Array.isArray(__props.info.status) ? ssrLooseContain(__props.info.status, null) : __props.info.status) ? " checked" : ""} class="checkbox" type="checkbox" name="basic-checkbox"><label for="checked" class="label text-lg font-semibold">${ssrInterpolate(unref(trans)("Make it publish?"))}</label></div>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        processing: isPoroccessing.value,
        btnText: unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></form></main>`);
    };
  }
});
const _sfc_setup$1A = _sfc_main$1A.setup;
_sfc_main$1A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Page/Edit.vue");
  return _sfc_setup$1A ? _sfc_setup$1A(props, ctx) : void 0;
};
const __vite_glob_0_52 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1A
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1b = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1z = /* @__PURE__ */ Object.assign(__default__$1b, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "pages",
    "totalActivePosts",
    "totalInActivePosts",
    "totalPosts",
    "buttons",
    "segments"
  ],
  setup(__props) {
    const props = __props;
    const { textExcerpt, deleteRow } = sharedComposable();
    const pageStats = [
      {
        value: props.totalPosts,
        title: trans("Total Page"),
        iconClass: "bx bx-box"
      },
      {
        value: props.totalActivePosts,
        title: trans("Active Page"),
        iconClass: "bx bx-dollar-circle"
      },
      {
        value: props.totalInActivePosts,
        title: trans("Inactive Page"),
        iconClass: "ti ti-thumb-up"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Custom Page",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: pageStats,
        grid: "3"
      }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th class="col-2">${ssrInterpolate(unref(trans)("Title"))}</th><th class="col-4">${ssrInterpolate(unref(trans)("Url"))}</th><th class="col-1">${ssrInterpolate(unref(trans)("Status"))}</th><th class="col-2">${ssrInterpolate(unref(trans)("Created At"))}</th><th class="col-1 text-right">${ssrInterpolate(unref(trans)("Action"))}</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.pages.data, (page) => {
        _push(`<tr><td class="text-left">${ssrInterpolate(unref(textExcerpt)(page.title, 50))}</td><td class="text-left"><a${ssrRenderAttr("href", page.posturl)} target="_blank">${ssrInterpolate(unref(textExcerpt)(page.posturl, 100))}</a></td><td class="text-left"><span class="${ssrRenderClass([page.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(page.status == 1 ? unref(trans)("Active") : unref(trans)("Draft"))}</span></td><td>${ssrInterpolate(page.created_at_diff)}</td><td><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item">`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("admin.page.edit", page.id),
          class: "dropdown-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="h-5 text-slate-400" data-feather="edit"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(unref(trans)("Edit"))}</span>`);
            } else {
              return [
                createVNode("i", {
                  class: "h-5 text-slate-400",
                  "data-feather": "edit"
                }),
                createVNode("span", null, toDisplayString(unref(trans)("Edit")), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li><li class="dropdown-list-item"><button as="button" class="dropdown-link"><i class="h-5 text-slate-400" data-feather="trash-2">${ssrInterpolate(unref(trans)("Remove"))}&gt;</i><span>${ssrInterpolate(unref(trans)("Delete"))}</span></button></li></ul></div></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table>`);
      if (__props.pages.data.length == 0) {
        _push(`<div class="mt-2 text-center"><div class="alert bg-gradient-primary text-white"><span class="text-left">${ssrInterpolate(unref(trans)("!Opps no records found"))}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.pages.links
      }, null, _parent));
      _push(`</div></div></main>`);
    };
  }
});
const _sfc_setup$1z = _sfc_main$1z.setup;
_sfc_main$1z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Page/Index.vue");
  return _sfc_setup$1z ? _sfc_setup$1z(props, ctx) : void 0;
};
const __vite_glob_0_53 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1z
}, Symbol.toStringTag, { value: "Module" }));
const useOptionUpdateStore = defineStore("optionUpdate", () => {
  const processing = ref(false);
  function submit(key, fData, files = []) {
    processing.value = true;
    files == null ? void 0 : files.forEach((property) => {
      if (!(fData[property] instanceof File)) {
        fData[property] = null;
      }
    });
    router.post(route("admin.page-settings.update", key), fData, {
      onFinish: () => processing.value = false
    });
  }
  return { processing, submit };
});
const __default__$1a = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1y = /* @__PURE__ */ Object.assign(__default__$1a, {
  __name: "About",
  __ssrInlineRender: true,
  props: ["data"],
  setup(__props) {
    const props = __props;
    const form = useOptionUpdateStore();
    onBeforeMount(() => {
      let properties = ["testimonial", "faq"];
      properties.forEach((key) => props.data[key] = props.data[key] || {});
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(_attrs)}><h6>${ssrInterpolate(unref(trans)("About Section"))}</h6><div class="mb-10 mt-2 rounded border bg-slate-50 bg-opacity-50 p-3 dark:border-slate-500 dark:bg-slate-800"><button class="tabs-btn" data-panel-id="#primary" type="button">${ssrInterpolate(unref(trans)("See in primary settings"))}</button></div><h6>${ssrInterpolate(unref(trans)("Why Choose Section"))}</h6><div class="mb-10 mt-2 rounded border bg-slate-50 bg-opacity-50 p-3 dark:border-slate-500 dark:bg-slate-800"><button class="tabs-btn" data-panel-id="#primary" type="button">${ssrInterpolate(unref(trans)("See in primary settings"))}</button></div><h6>${ssrInterpolate(unref(trans)("Achievement Section"))}</h6><div class="mb-10 mt-2 rounded border bg-slate-50 bg-opacity-50 p-3 dark:border-slate-500 dark:bg-slate-800"><button class="tabs-btn" data-panel-id="#primary" type="button">${ssrInterpolate(unref(trans)("See in primary settings"))}</button></div><h6>${ssrInterpolate(unref(trans)("Testimonial Section"))}</h6><div class="mb-10 mt-2 rounded border bg-slate-50 bg-opacity-50 p-3 dark:border-slate-500 dark:bg-slate-800"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Top title"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.testimonial.top_title)}></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Title"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.testimonial.title)}><i>${ssrInterpolate(unref(trans)("use {text} to highlight"))}</i></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Text Content"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.testimonial.text)}></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Button Text"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.testimonial.btn_text)}></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Button Link"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.testimonial.btn_link)}></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Left image"))}</label><input type="file" accept="image/*" class="input"></div></div><h6>${ssrInterpolate(unref(trans)("Faq Section"))}</h6><div class="mb-10 mt-2 rounded border bg-slate-50 bg-opacity-50 p-3 dark:border-slate-500 dark:bg-slate-800"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Top title"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.faq.top_title)}></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Title"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.faq.title)}><i>${ssrInterpolate(unref(trans)("use {text} to highlight"))}</i></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Right image"))}</label><input type="file" accept="image/*" class="input"></div></div><div class="mt-4">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        processing: unref(form).processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></form>`);
    };
  }
});
const _sfc_setup$1y = _sfc_main$1y.setup;
_sfc_main$1y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/PageSetting/About.vue");
  return _sfc_setup$1y ? _sfc_setup$1y(props, ctx) : void 0;
};
const __vite_glob_0_54 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1y
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1x = {
  __name: "Home",
  __ssrInlineRender: true,
  props: ["data"],
  setup(__props) {
    const props = __props;
    const form = useOptionUpdateStore();
    onBeforeMount(() => {
      let properties = ["hero"];
      properties.forEach((key) => props.data[key] = props.data[key] || {});
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(_attrs)}><h6>${ssrInterpolate(_ctx.trans("Hero Banner Section"))}</h6><div class="p-3 mt-2 mb-10 bg-opacity-50 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-500"><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Title"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.hero.title)}><i>${ssrInterpolate(_ctx.trans("use {text} to highlight"))}</i></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Sub title"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.hero.subtitle)}></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Button One"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.hero.btn_text)}></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Button One Link"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.hero.btn_link)}></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Button Two"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.hero.btn_text2)}></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Button Two Link"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.hero.btn_link2)}></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Right Image"))}</label><input type="file" accept="image/*" class="input"></div></div><h6>${ssrInterpolate(_ctx.trans("About Section"))}</h6><div class="p-3 mt-2 mb-10 bg-opacity-50 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-500"><button class="tabs-btn" data-panel-id="#primary" type="button">${ssrInterpolate(_ctx.trans("See in primary settings"))}</button></div><h6>${ssrInterpolate(_ctx.trans("Achievement Section"))}</h6><div class="p-3 mt-2 mb-10 bg-opacity-50 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-500"><button class="tabs-btn" data-panel-id="#primary" type="button">${ssrInterpolate(_ctx.trans("See in primary settings"))}</button></div><h6>${ssrInterpolate(_ctx.trans("Why Choose Section"))}</h6><div class="p-3 mt-2 mb-10 bg-opacity-50 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-500"><button class="tabs-btn" data-panel-id="#primary" type="button">${ssrInterpolate(_ctx.trans("See in primary settings"))}</button></div><div class="mt-4">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        processing: unref(form).processing,
        "btn-text": _ctx.trans("Save Changes")
      }, null, _parent));
      _push(`</div></form>`);
    };
  }
};
const _sfc_setup$1x = _sfc_main$1x.setup;
_sfc_main$1x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/PageSetting/Home.vue");
  return _sfc_setup$1x ? _sfc_setup$1x(props, ctx) : void 0;
};
const __vite_glob_0_55 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1x
}, Symbol.toStringTag, { value: "Module" }));
class Tabs {
  constructor(target) {
    this.tabBtns = target.querySelectorAll(".tabs-btn:not(.disabled)");
    this.tabContent = target.querySelector(".tabs-content");
    this.tabPanels = target.querySelectorAll(".tabs-panel");
    this.tabPanel = null;
    this.tabBtn = null;
    this.tabBtns.forEach((tabBtn) => {
      tabBtn.addEventListener("click", () => {
        this.tabBtn = tabBtn;
        this.tabPanel = this.tabContent.querySelector(this.tabBtn.dataset.panelId);
        this.updateActiveClass(this.tabBtn, this.tabBtns);
        this.updateActiveClass(this.tabPanel, this.tabPanels);
      });
    });
  }
  updateActiveClass(element, elements) {
    if (!element.classList.contains("active")) {
      elements.forEach((ele) => {
        if (ele.classList.contains("active")) {
          ele.classList.remove("active");
        }
      });
      element.classList.add("active");
    }
  }
}
const tabs = {
  init() {
    const elements = document.querySelectorAll(".tabs");
    if (elements.length) {
      [...elements].forEach((element) => new Tabs(element));
    }
  }
};
const _sfc_main$1w = {
  __name: "Primary",
  __ssrInlineRender: true,
  props: ["data"],
  setup(__props) {
    const props = __props;
    const form = useOptionUpdateStore();
    onBeforeMount(() => {
      var _a2, _b2, _c, _d, _e, _f;
      let properties = ["about_section", "why_choose", "achievement"];
      properties.forEach((key) => props.data[key] = props.data[key] || {});
      if (!((_b2 = (_a2 = props.data.about_section) == null ? void 0 : _a2.features) == null ? void 0 : _b2.length)) {
        props.data.about_section.features = [
          {
            text: "",
            percent: ""
          }
        ];
      }
      if (!((_d = (_c = props.data.why_choose) == null ? void 0 : _c.features) == null ? void 0 : _d.length)) {
        props.data.why_choose.features = [
          {
            icon: "",
            title: "",
            text: ""
          }
        ];
      }
      if (!((_f = (_e = props.data.achievement) == null ? void 0 : _e.counters) == null ? void 0 : _f.length)) {
        props.data.achievement.counters = [
          {
            icon: "",
            counter: "",
            text: "test"
          }
        ];
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(_attrs)}><h6>${ssrInterpolate(_ctx.trans("Primary Settings"))}</h6><div class="p-3 mt-2 mb-10 bg-opacity-50 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-500"><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Site Logo (Deep)"))}</label><input type="file" accept="image/*" class="input"></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Site Logo (light)"))}</label><input type="file" accept="image/*" class="input"></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Favicon"))}</label><input type="file" accept="image/*" class="input"></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Copyright text"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.copyright_text)}></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Contact Email"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.contact_email)}></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Contact Phone"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.contact_phone)}></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Address"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.address)}></div></div><h6>${ssrInterpolate(_ctx.trans("About Section Card"))}</h6><div class="p-3 mt-2 mb-10 bg-opacity-50 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-500"><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Top title"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.about_section.top_title)}></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Title"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.about_section.title)}><i>${ssrInterpolate(_ctx.trans("use {text} to highlight"))}</i></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Text content"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.about_section.text)}></div><div class="mb-2"><label class="mr-2">${ssrInterpolate(_ctx.trans("Category list"))}</label><!--[-->`);
      ssrRenderList(__props.data.about_section.features, (item, index) => {
        _push(`<div class="flex items-center p-2 mb-2 border gap-x-2"><span class="p-2 py-1 text-center text-white bg-indigo-600 rounded-full">${ssrInterpolate(index + 1)}</span><div class="flex items-center flex-grow gap-1"><input type="color"${ssrRenderAttr("value", item.color)} class="mx-2"><input type="text" class="input" placeholder="title"${ssrRenderAttr("value", item.text)}><input type="text" class="input" placeholder="percentage"${ssrRenderAttr("value", item.percent)}></div><button type="button" class="btn btn-danger"> X </button></div>`);
      });
      _push(`<!--]--><button type="button" class="btn btn-primary"> + </button></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Left image"))}</label><input type="file" accept="image/*" class="input"></div></div><h6>${ssrInterpolate(_ctx.trans("Why Choose Section"))}</h6><div class="p-3 mt-2 mb-10 bg-opacity-50 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-500"><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Top title"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.why_choose.top_title)}></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Title"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.why_choose.title)}><i>${ssrInterpolate(_ctx.trans("use {text} to highlight"))}</i></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Text content"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.why_choose.text)}></div><div class="mb-2"><label class="mr-2">${ssrInterpolate(_ctx.trans("Feature list (Icon, Text)"))}</label><!--[-->`);
      ssrRenderList(__props.data.why_choose.features, (item, index) => {
        _push(`<div class="flex items-center p-2 mb-2 border gap-x-2"><span class="p-2 py-1 text-center text-white bg-indigo-600 rounded-full">${ssrInterpolate(index + 1)}</span><div class="flex items-center flex-grow gap-1"><input type="file" class="input" placeholder="icon"><input type="text" class="input" placeholder="text content"${ssrRenderAttr("value", item.text)}></div><button type="button" class="btn btn-danger"> X </button></div>`);
      });
      _push(`<!--]--><button type="button" class="btn btn-primary"> + </button></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Right image"))}</label><input type="file" accept="image/*" class="input"></div></div><h6>${ssrInterpolate(_ctx.trans("Achievement Section"))}</h6><div class="p-3 mt-2 mb-10 bg-opacity-50 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-500"><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Top title"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.achievement.top_title)}></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Title"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.achievement.title)}><i>${ssrInterpolate(_ctx.trans("use {text} to highlight"))}</i></div><div class="mb-2"><label class="mr-2">${ssrInterpolate(_ctx.trans("Counters (Icon, Counter, Bottom Text)"))}</label><!--[-->`);
      ssrRenderList(__props.data.achievement.counters, (item, index) => {
        _push(`<div class="flex items-center p-2 mb-2 border gap-x-2"><span class="p-2 py-1 text-center text-white bg-indigo-600 rounded-full">${ssrInterpolate(index + 1)}</span><div class="flex items-center flex-grow gap-1"><input type="file" class="input" placeholder="icon"><input type="text" class="input" placeholder="counter"${ssrRenderAttr("value", item.counter)}><input type="text" class="input" placeholder="bottom text"${ssrRenderAttr("value", item.text)}></div><button type="button" class="btn btn-danger"> X </button></div>`);
      });
      _push(`<!--]--><button type="button" class="btn btn-primary"> + </button></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Video Background Image"))}</label><input type="file" accept="image/*" class="input"></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Video Link"))}</label><input type="text" class="input"${ssrRenderAttr("value", __props.data.achievement.video_url)}><i>${ssrInterpolate(_ctx.trans("url must be like"))}: https://www.youtube.com/embed/{VIDEO_ID}</i></div></div><div class="mb-2">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        processing: unref(form).processing,
        "btn-text": _ctx.trans("Save Changes")
      }, null, _parent));
      _push(`</div></form>`);
    };
  }
};
const _sfc_setup$1w = _sfc_main$1w.setup;
_sfc_main$1w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/PageSetting/Primary.vue");
  return _sfc_setup$1w ? _sfc_setup$1w(props, ctx) : void 0;
};
const __vite_glob_0_57 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1w
}, Symbol.toStringTag, { value: "Module" }));
const __default__$19 = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1v = /* @__PURE__ */ Object.assign(__default__$19, {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["primary_data", "home_page", "about_page"],
  setup(__props) {
    onMounted(() => {
      tabs.init();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, null, null, _parent));
      _push(`<div class="space-y-6"><div class="card"><div class="card-body"><div class="tabs tabs-vertical"><ul class="tabs-list w-72"><li class="tabs-item"><button class="tabs-btn active" data-panel-id="#primary" type="button"><span>${ssrInterpolate(_ctx.trans("Primary"))}</span></button></li><li class="tabs-item"><button class="tabs-btn" data-panel-id="#home" type="button"><span>${ssrInterpolate(_ctx.trans("Home Page"))}</span></button></li><li class="tabs-item"><button class="tabs-btn" data-panel-id="#about" type="button"><span>${ssrInterpolate(_ctx.trans("About Page"))}</span></button></li></ul><div class="tabs-content"><div class="tabs-panel active" id="primary">`);
      _push(ssrRenderComponent(_sfc_main$1w, { data: __props.primary_data }, null, _parent));
      _push(`</div><div class="tabs-panel" id="home">`);
      _push(ssrRenderComponent(_sfc_main$1x, { data: __props.home_page }, null, _parent));
      _push(`</div><div class="tabs-panel" id="about">`);
      _push(ssrRenderComponent(_sfc_main$1y, { data: __props.about_page }, null, _parent));
      _push(`</div></div></div></div></div></div></main>`);
    };
  }
});
const _sfc_setup$1v = _sfc_main$1v.setup;
_sfc_main$1v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/PageSetting/Index.vue");
  return _sfc_setup$1v ? _sfc_setup$1v(props, ctx) : void 0;
};
const __vite_glob_0_56 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1v
}, Symbol.toStringTag, { value: "Module" }));
const __default__$18 = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1u = /* @__PURE__ */ Object.assign(__default__$18, {
  __name: "Create",
  __ssrInlineRender: true,
  props: ["segments", "buttons"],
  setup(__props) {
    const { cke, ClassicEditor: ClassicEditor2 } = ckeEditor();
    const inputs = ref([
      {
        type: "",
        label: ""
      }
    ]);
    const form = useForm({
      name: "",
      currency_name: "",
      delay: "",
      min_limit: "",
      max_limit: "",
      fixed_charge: "",
      charge_type: "",
      percent_charge: "",
      image: "",
      instruction: "",
      status: 1,
      inputs: []
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "New Payout Method",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="card mx-auto max-w-3xl"><form class="card-body space-y-3" method="post" enctype="multipart/form-data"><div><label>${ssrInterpolate(_ctx.trans("Method Name"))}</label><input type="text" class="input"${ssrRenderAttr("placeholder", _ctx.trans("Method Name"))} required name="name"${ssrRenderAttr("value", unref(form).name)}></div><div class="grid grid-cols-2 gap-3"><div><label for="currency_id">${ssrInterpolate(_ctx.trans("Enter Currency Name"))}</label><input type="text" class="input" name="currency" required${ssrRenderAttr("value", unref(form).currency_name)}></div><div><label>${ssrInterpolate(_ctx.trans("Delay (Processing Days)"))}</label><input type="number" class="input" name="delay"${ssrRenderAttr("placeholder", _ctx.trans("Delay"))}${ssrRenderAttr("value", unref(form).delay)}></div></div><div class="grid grid-cols-2 gap-3"><div><label>${ssrInterpolate(_ctx.trans("Minimum Amount"))}</label><input${ssrRenderAttr("value", unref(form).min_limit)} type="number" class="input"${ssrRenderAttr("placeholder", _ctx.trans("Minimum Amount"))} required name="min_limit"></div><div><label>${ssrInterpolate(_ctx.trans("Maximum Amount"))}</label><input${ssrRenderAttr("value", unref(form).max_limit)} type="number" class="input"${ssrRenderAttr("placeholder", _ctx.trans("Maximum Amount"))} required name="max_limit"></div></div><div><label>${ssrInterpolate(_ctx.trans("Charge Type"))}</label><select class="select"><option value="" disabled>${ssrInterpolate(_ctx.trans("Select charge type"))}</option><option value="fixed">${ssrInterpolate(_ctx.trans("Fixed"))}</option><option value="percentage">${ssrInterpolate(_ctx.trans("Percentage"))}</option></select></div>`);
      if (unref(form).charge_type === "fixed") {
        _push(`<div><label>${ssrInterpolate(_ctx.trans("Enter Amount For Fixed Charge"))}</label><input${ssrRenderAttr("value", unref(form).fixed_charge)} type="number" class="input" name="fixed_charge" placeholder="Fixed Amount" step="any"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(form).charge_type === "percentage") {
        _push(`<div><label>${ssrInterpolate(_ctx.trans("Enter Percentage Amount"))}</label><input step="any"${ssrRenderAttr("value", unref(form).percent_charge)} type="number" class="input" name="percent_charge"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><label>${ssrInterpolate(_ctx.trans("Gateway Image"))}</label><input type="file" class="input" required name="image"></div><div><label>${ssrInterpolate(_ctx.trans("Instruction"))}</label>`);
      _push(ssrRenderComponent(unref(cke), {
        "tag-name": "textarea",
        editor: unref(ClassicEditor2),
        modelValue: unref(form).instruction,
        "onUpdate:modelValue": ($event) => unref(form).instruction = $event
      }, null, _parent));
      _push(`</div><div class="space-y-3"><div class="grid grid-cols-12"><div class="col-span-5"><label>${ssrInterpolate(_ctx.trans("Label"))}</label></div><div class="col-span-6"><label>${ssrInterpolate(_ctx.trans("Input Type"))}</label></div><button type="button" class="btn btn-primary py-3"><i class="fas fa-plus-circle"></i></button><div class="col-span-1"></div></div><!--[-->`);
      ssrRenderList(inputs.value, (input, i) => {
        _push(`<div class="grid grid-cols-12 gap-3"><div class="col-span-5"><input type="text" data-key="0" class="input" placeholder="Label here"${ssrRenderAttr("value", input.label)}></div><div class="col-span-6"><select class="select"><option value="text">${ssrInterpolate(_ctx.trans("Text"))}</option><option value="number">${ssrInterpolate(_ctx.trans("Number"))}</option><option value="textarea">${ssrInterpolate(_ctx.trans("Textarea"))}</option><option value="email">${ssrInterpolate(_ctx.trans("Email"))}</option></select></div><div class="col-span-1"><button type="button" class="btn btn-danger py-3" title="Remove"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path></svg></button></div></div>`);
      });
      _push(`<!--]--></div><div><label>${ssrInterpolate(_ctx.trans("Status"))}</label><select name="status" class="select"><option value="1">${ssrInterpolate(_ctx.trans("Active"))}</option><option value="0">${ssrInterpolate(_ctx.trans("Inactive"))}</option></select></div>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(form).processing,
        "btn-text": _ctx.trans("Save")
      }, null, _parent));
      _push(`</form></div></main>`);
    };
  }
});
const _sfc_setup$1u = _sfc_main$1u.setup;
_sfc_main$1u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/PayoutMethod/Create.vue");
  return _sfc_setup$1u ? _sfc_setup$1u(props, ctx) : void 0;
};
const __vite_glob_0_58 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1u
}, Symbol.toStringTag, { value: "Module" }));
const __default__$17 = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1t = /* @__PURE__ */ Object.assign(__default__$17, {
  __name: "Edit",
  __ssrInlineRender: true,
  props: ["segments", "buttons", "payoutMethod"],
  setup(__props) {
    const props = __props;
    const { cke, ClassicEditor: ClassicEditor2 } = ckeEditor();
    const inputs = ref([]);
    onMounted(() => {
      inputs.value = JSON.parse(props.payoutMethod.data);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Edit Payout Method",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="card mx-auto max-w-3xl"><form class="card-body space-y-3" enctype="multipart/form-data"><div><label>${ssrInterpolate(_ctx.trans("Method Name"))}</label><input type="text" class="input" placeholder="Method Name"${ssrRenderAttr("value", __props.payoutMethod.name)} required name="name"></div><div class="grid grid-cols-2 gap-3"><div><label for="currency">${ssrInterpolate(_ctx.trans("Enter Currency Name"))}</label><input type="text" class="input" name="currency" required${ssrRenderAttr("value", __props.payoutMethod.currency_name)}></div><div><label>${ssrInterpolate(_ctx.trans("Delay"))}</label><input type="number" class="input" name="delay"${ssrRenderAttr("value", __props.payoutMethod.delay)}${ssrRenderAttr("placeholder", _ctx.trans("Delay"))}></div></div><div class="grid grid-cols-2 gap-3"><div><label>${ssrInterpolate(_ctx.trans("Minimum Amount"))}</label><input type="number" class="input"${ssrRenderAttr("value", __props.payoutMethod.min_limit)} placeholder="Minimum Amount" required name="min_limit"></div><div><label>${ssrInterpolate(_ctx.trans("Maximum Amount"))}</label><input type="number" class="input"${ssrRenderAttr("value", __props.payoutMethod.max_limit)} placeholder="Maximum Amount" required name="max_limit"></div></div><div><label>${ssrInterpolate(_ctx.trans("Charge Type"))}</label><select class="select"><option value="" disabled>${ssrInterpolate(_ctx.trans("Select charge type"))}</option><option value="fixed">${ssrInterpolate(_ctx.trans("Fixed"))}</option><option value="percentage">${ssrInterpolate(_ctx.trans("Percentage"))}</option></select></div>`);
      if (__props.payoutMethod.charge_type == "fixed") {
        _push(`<div><label>${ssrInterpolate(_ctx.trans("Fixed Amount"))}</label><input type="number" step="any" class="input"${ssrRenderAttr("value", __props.payoutMethod.fixed_charge)} name="fixed_charge"${ssrRenderAttr("placeholder", _ctx.trans("Fixed Amount"))}></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.payoutMethod.charge_type == "percentage") {
        _push(`<div><label>${ssrInterpolate(_ctx.trans("Percentage Amount"))}</label><input type="number" step="any" class="input"${ssrRenderAttr("value", __props.payoutMethod.percent_charge)} name="percent_charge"${ssrRenderAttr("placeholder", _ctx.trans("Percentage Amount"))}></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><label>${ssrInterpolate(_ctx.trans("Gateway Image"))}</label><input type="file" class="input" name="image"></div><div><label>${ssrInterpolate(_ctx.trans("Instruction"))}</label>`);
      _push(ssrRenderComponent(unref(cke), {
        "tag-name": "textarea",
        editor: unref(ClassicEditor2),
        modelValue: __props.payoutMethod.instruction,
        "onUpdate:modelValue": ($event) => __props.payoutMethod.instruction = $event
      }, null, _parent));
      _push(`</div><div class="space-y-3"><div class="grid grid-cols-12"><div class="col-span-5"><label>${ssrInterpolate(_ctx.trans("Label"))}</label> <br></div><div class="col-span-6"><label>${ssrInterpolate(_ctx.trans("Input Type"))}</label></div><div class="col-span-1"><button type="button" class="btn btn-primary py-3"><i class="fas fa-plus-circle"></i></button></div></div><!--[-->`);
      ssrRenderList(inputs.value, (input, i) => {
        _push(`<div class="grid grid-cols-12 gap-3"><div class="col-span-5"><input type="text" data-key="0" class="input" placeholder="Label here"${ssrRenderAttr("value", input.label)}></div><div class="col-span-6"><select class="select"><option${ssrIncludeBooleanAttr(input.type == "text") ? " selected" : ""} value="text">${ssrInterpolate(_ctx.trans("Text"))}</option><option${ssrIncludeBooleanAttr(input.type == "number") ? " selected" : ""} value="number">${ssrInterpolate(_ctx.trans("Number"))}</option><option${ssrIncludeBooleanAttr(input.type == "textarea") ? " selected" : ""} value="textarea">${ssrInterpolate(_ctx.trans("Textarea"))}</option><option${ssrIncludeBooleanAttr(input.type == "email") ? " selected" : ""} value="email">${ssrInterpolate(_ctx.trans("Email"))}</option></select></div><div class="col-span-1"><button type="button" class="btn btn-danger py-3" title="Remove"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path></svg></button></div></div>`);
      });
      _push(`<!--]--></div><div><label>${ssrInterpolate(_ctx.trans("Status"))}</label><select name="status" class="select"><option${ssrIncludeBooleanAttr(__props.payoutMethod.status == 1) ? " selected" : ""} value="1">${ssrInterpolate(_ctx.trans("Active"))}</option><option${ssrIncludeBooleanAttr(__props.payoutMethod.status == 0) ? " selected" : ""} value="0">${ssrInterpolate(_ctx.trans("Inactive"))}</option></select></div>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        "btn-text": _ctx.trans("Save")
      }, null, _parent));
      _push(`</form></div></main>`);
    };
  }
});
const _sfc_setup$1t = _sfc_main$1t.setup;
_sfc_main$1t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/PayoutMethod/Edit.vue");
  return _sfc_setup$1t ? _sfc_setup$1t(props, ctx) : void 0;
};
const __vite_glob_0_59 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1t
}, Symbol.toStringTag, { value: "Module" }));
const __default__$16 = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1s = /* @__PURE__ */ Object.assign(__default__$16, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "methods",
    "buttons",
    "segments",
    "totalPayoutMethod",
    "totalActivePayoutMethod",
    "totalInActivePayoutMethod"
  ],
  setup(__props) {
    const props = __props;
    sharedComposable();
    const stats = [
      {
        value: props.totalPayoutMethod,
        title: trans("Total Payout Methods"),
        iconClass: "bx bx-box"
      },
      {
        value: props.totalActivePayoutMethod,
        title: trans("Active Payout Methods"),
        iconClass: "ti ti-thumb-up"
      },
      {
        value: props.totalInActivePayoutMethod,
        title: trans("Inactive Payout Methods"),
        iconClass: "ti ti-thumb-down"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Projects",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: stats,
        grid: "3"
      }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Name"))}</th><th>${ssrInterpolate(unref(trans)("Currency"))}</th><th>${ssrInterpolate(unref(trans)("Limit"))}</th><th class="text-center">${ssrInterpolate(unref(trans)("Charge"))}</th><th>${ssrInterpolate(unref(trans)("Status"))}</th><th>${ssrInterpolate(unref(trans)("Created At"))}</th><th><p class="text-end">${ssrInterpolate(unref(trans)("Action"))}</p></th></tr></thead>`);
      if (__props.methods.data.length != 0) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.methods.data, (method) => {
          _push(`<tr><td><img${ssrRenderAttrs(mergeProps({
            alt: "image",
            class: "avatar mr-1 inline rounded"
          }, ssrGetDirectiveProps(_ctx, _directive_lazy, method.image)))}> ${ssrInterpolate(method.name)}</td><td>${ssrInterpolate(method.currency_name)}</td><td>${ssrInterpolate(method.min_limit + " - " + method.max_limit)} ${ssrInterpolate(method.currency_name)}</td><td class="text-center">${ssrInterpolate(method.charge_type == "percentage" ? method.percent_charge + "%" : method.fixed_charge + " " + method.currency_name)}</td><td class="text-left"><span class="${ssrRenderClass([method.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(method.status == 1 ? unref(trans)("Active") : unref(trans)("Draft"))}</span></td><td>${ssrInterpolate(unref(moment)(method.created_at).format("DD MMM Y"))}</td><td class="text-right"><div class="flex justify-end"><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item">`);
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("admin.payout-methods.edit", method.id),
            class: "dropdown-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="h-5 text-slate-400" data-feather="edit"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(unref(trans)("Edit"))}</span>`);
              } else {
                return [
                  createVNode("i", {
                    class: "h-5 text-slate-400",
                    "data-feather": "edit"
                  }),
                  createVNode("span", null, toDisplayString(unref(trans)("Edit")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li><li class="dropdown-list-item"><button class="dropdown-link"><i class="h-5 text-slate-400" data-feather="trash-2"></i><span>${ssrInterpolate(unref(trans)("Delete"))}</span></button></li></ul></div></div></div></td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table></div>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.methods.links
      }, null, _parent));
      _push(`</div></main>`);
    };
  }
});
const _sfc_setup$1s = _sfc_main$1s.setup;
_sfc_main$1s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/PayoutMethod/Index.vue");
  return _sfc_setup$1s ? _sfc_setup$1s(props, ctx) : void 0;
};
const __vite_glob_0_60 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1s
}, Symbol.toStringTag, { value: "Module" }));
const __default__$15 = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1r = /* @__PURE__ */ Object.assign(__default__$15, {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["segments", "buttons", "data", "orders", "request"],
  setup(__props) {
    const props = __props;
    const filterOptions = [
      {
        label: "Email",
        value: "email"
      }
    ];
    useForm({
      search: props.request.search,
      type: props.type || "email"
    });
    const stats = [
      {
        value: props.data.total_payouts,
        title: trans("Total Payouts"),
        iconClass: "bx bx-box"
      },
      {
        value: props.data.total_pending,
        title: trans("Pending Payouts"),
        iconClass: "bx bx-loader"
      },
      {
        value: props.data.total_approved,
        title: trans("Total Approved"),
        iconClass: "ti ti-thumb-up"
      },
      {
        value: props.data.total_rejected,
        title: trans("Total Rejected"),
        iconClass: "ti ti-thumb-down"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Payout Requests"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: stats,
        grid: "4"
      }, null, _parent));
      _push(`<div class="flex items-center justify-end gap-x-2">`);
      _push(ssrRenderComponent(_sfc_main$2m, { options: filterOptions }, null, _parent));
      _push(`</div><div class="table-responsive"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Invoice No"))}</th><th>${ssrInterpolate(unref(trans)("Amount"))}</th><th>${ssrInterpolate(unref(trans)("Gateway"))}</th><th>${ssrInterpolate(unref(trans)("User"))}</th><th>${ssrInterpolate(unref(trans)("Status"))}</th><th>${ssrInterpolate(unref(trans)("Created At"))}</th><th><p class="text-end">${ssrInterpolate(unref(trans)("View"))}</p></th></tr></thead>`);
      if (__props.data.payouts.data.length != 0) {
        _push(`<tbody class="list"><!--[-->`);
        ssrRenderList(__props.data.payouts.data, (payout) => {
          _push(`<tr><td class="text-center">`);
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("admin.payouts.show", payout.id)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(payout.invoice_no)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(payout.invoice_no), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td class="text-left">${ssrInterpolate(payout.amount_with_currency)}</td><td class="text-left">${ssrInterpolate(payout.method.name || "")}</td><td class="text-left">`);
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("admin.investors.show", payout.user_id)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(payout.user.name || "")}`);
              } else {
                return [
                  createTextVNode(toDisplayString(payout.user.name || ""), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td class="text-left"><span class="${ssrRenderClass([
            payout.status == "pending" ? "badge-warning" : payout.status == "completed" ? "badge-success" : "badge-danger",
            "badge"
          ])}">${ssrInterpolate(payout.status)}</span></td><td class="text-left">${ssrInterpolate(payout.user.created_at_date)}</td><td><div class="flex justify-end">`);
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("admin.payouts.show", payout.id),
            class: "btn btn-primary"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(trans)("View"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(trans)("View")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table></div>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.data.payouts.links
      }, null, _parent));
      _push(`</div></main>`);
    };
  }
});
const _sfc_setup$1r = _sfc_main$1r.setup;
_sfc_main$1r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Payouts/Index.vue");
  return _sfc_setup$1r ? _sfc_setup$1r(props, ctx) : void 0;
};
const __vite_glob_0_61 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1r
}, Symbol.toStringTag, { value: "Module" }));
const __default__$14 = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1q = /* @__PURE__ */ Object.assign(__default__$14, {
  __name: "Show",
  __ssrInlineRender: true,
  props: ["payout", "usermethod", "segments", "buttons"],
  setup(__props) {
    const { formatCurrency } = sharedComposable();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: _ctx.trans("Payout - " + __props.payout.invoice_no),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="card"><div class="card-body space-y-12"><div><h4>${ssrInterpolate(_ctx.trans("Payout method info"))}</h4><div class="table-responsive"><table class="table"><thead><tr><th>${ssrInterpolate(_ctx.trans("Name"))}</th><th>${ssrInterpolate(_ctx.trans("Charge"))}</th><th>${ssrInterpolate(_ctx.trans("Charge Type"))}</th><th>${ssrInterpolate(_ctx.trans("Delay"))}</th></tr></thead><tbody><tr><td>${ssrInterpolate(__props.payout.method.name || "")}</td><td>${ssrInterpolate(__props.payout.method.percent_charge > 0 ? __props.payout.method.percent_charge : __props.payout.method.fixed_charge)}</td><td><span class="${ssrRenderClass([__props.payout.method.percent_charge > 0 ? "badge-primary" : "badge-warning", "badge"])}">${ssrInterpolate(__props.payout.method.percent_charge > 0 ? _ctx.trans("Percentage") : _ctx.trans("Fixed"))}</span></td><td>${ssrInterpolate(__props.payout.method.delay || "")}</td></tr></tbody></table></div></div><div><h4 class="mb-3">${ssrInterpolate(_ctx.trans("Payout info"))}</h4><div class="table-responsive"><table class="table"><thead><tr><th>${ssrInterpolate(_ctx.trans("Amount"))}</th><th>${ssrInterpolate(_ctx.trans("User"))}</th><th>${ssrInterpolate(_ctx.trans("Email"))}</th><th>${ssrInterpolate(_ctx.trans("Charge"))}</th><th>${ssrInterpolate(_ctx.trans("Status"))}</th><th>${ssrInterpolate(_ctx.trans("Created At"))}</th><th><p class="text-end">${ssrInterpolate(_ctx.trans("Action"))}</p></th></tr></thead><tbody><tr><td>${ssrInterpolate(__props.payout.amount + __props.payout.currency)}</td><td>${ssrInterpolate(__props.payout.user.name || "")}</td><td>${ssrInterpolate(__props.payout.user.email || "")}</td><td>${ssrInterpolate(__props.payout.charge + __props.payout.currency)}</td><td><span class="${ssrRenderClass([
        __props.payout.status == "pending" ? "badge-warning" : __props.payout.status == "failed" ? "badge-danger" : "badge-success",
        "badge"
      ])}">${ssrInterpolate(__props.payout.status)}</span></td><td>${ssrInterpolate(__props.payout.created_at_date)}</td><td class="text-right"><div class="flex justify-end"><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content"><ul class="dropdown-list"><li class="dropdown-list-item"><button class="dropdown-link"><i class="h-5 text-slate-400" data-feather="check-circle"></i> ${ssrInterpolate(_ctx.trans("Approve"))}</button></li><li class="dropdown-list-item"><button class="dropdown-link"><i class="h-5 text-slate-400" data-feather="x"></i> ${ssrInterpolate(_ctx.trans("Reject"))}</button></li><li class="dropdown-list-item"><button class="dropdown-link"><i class="h-5 text-slate-400" data-feather="rotate-ccw"></i> ${ssrInterpolate(_ctx.trans("Reject & revert balance"))}</button></li></ul></div></div></div></td></tr></tbody></table></div></div><div class="table-responsive"><table class="table"><thead><tr><th>${ssrInterpolate(_ctx.trans("Current Balance"))}</th><td class="text-end">${ssrInterpolate(unref(formatCurrency)(__props.payout.user.wallet || 0))}</td></tr></thead><tbody><!--[-->`);
      ssrRenderList(JSON.parse(__props.payout.meta), (meta, index) => {
        _push(`<tr><th>${ssrInterpolate(index)} <h4></h4></th><td>${ssrInterpolate(meta)}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div></main>`);
    };
  }
});
const _sfc_setup$1q = _sfc_main$1q.setup;
_sfc_main$1q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Payouts/Show.vue");
  return _sfc_setup$1q ? _sfc_setup$1q(props, ctx) : void 0;
};
const __vite_glob_0_62 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1q
}, Symbol.toStringTag, { value: "Module" }));
const __default__$13 = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1p = /* @__PURE__ */ Object.assign(__default__$13, {
  __name: "Edit",
  __ssrInlineRender: true,
  props: ["user", "buttons", "segments"],
  setup(__props) {
    const form = useForm({
      oldpassword: null,
      password: "",
      password_confirmation: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Edit Profile",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="grid grid-cols-1 gap-6 lg:grid-cols-4"><section class="col-span-1 flex h-min w-full flex-col gap-6 lg:sticky lg:top-20"><div class="card"><div class="card-body flex flex-col items-center"><div class="relative my-2 h-24 w-24 rounded-full"><form><img${ssrRenderAttrs(mergeProps({
        alt: "avatar-img",
        id: "user-image",
        class: "h-full w-full rounded-full"
      }, ssrGetDirectiveProps(
        _ctx,
        _directive_lazy,
        __props.user.avatar == null ? `https://ui-avatars.com/api/?name=${__props.user.name}` : `${__props.user.avatar}`
      )))}><label for="upload-avatar" class="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-50 p-2 dark:bg-slate-900"><span class="text-slate-600 dark:text-slate-300"><i class="w-full" data-feather="camera"></i></span><input type="file" class="hidden" accept="image/jpeg, image/png, image/jpg" id="upload-avatar"></label></form></div><h2 class="text-[16px] font-medium text-slate-700 dark:text-slate-200">${ssrInterpolate(__props.user.name)}</h2><div class="badge badge-soft-success my-3 inline-block px-4">${ssrInterpolate(unref(trans)("Active"))}</div></div></div></section><section class="col-span-1 flex w-full flex-1 flex-col gap-6 lg:col-span-3 lg:w-auto"><div class="card"><div class="card-body"><h2 class="text-[16px] font-semibold text-slate-700 dark:text-slate-300">${ssrInterpolate(unref(trans)("Personal Details"))}</h2><p class="mb-4 text-sm font-normal text-slate-400">${ssrInterpolate(unref(trans)("Manage your personal information"))}</p><form enctype="multipart/form-data" class="flex flex-col gap-5"><div class="grid grid-cols-1 gap-5 md:grid-cols-2"><label class="label" for="first-name"><span class="my-1 block">${ssrInterpolate(unref(trans)("Name"))}</span><input type="text" class="input"${ssrRenderAttr("value", __props.user.name)} id="first-name"></label><label class="label" for="email"><span class="my-1 block">${ssrInterpolate(unref(trans)("Email"))}</span><input type="email" class="input"${ssrRenderAttr("value", __props.user.email)} id="email"></label></div><div class="grid grid-cols-1 gap-5 md:grid-cols-2"><label class="label" for="phone"><span class="my-1 block">${ssrInterpolate(unref(trans)("Phone Number"))}</span><input type="tell" class="input"${ssrRenderAttr("value", __props.user.phone)} id="phone"></label><label class="label" for="street-address"><span class="my-1 block">${ssrInterpolate(unref(trans)("Address (will used for invoice)"))}</span><input type="text" class="input"${ssrRenderAttr("value", __props.user.address)} id="street-address"></label></div><div class="flex items-center justify-end gap-4"><button type="submit" class="btn btn-primary">${ssrInterpolate(unref(trans)("Update Profile"))}</button></div></form></div></div><div class="card"><div class="card-body"><h2 class="text-[16px] font-semibold text-slate-700 dark:text-slate-300"> Change Password </h2><p class="mb-4 text-sm font-normal text-slate-400"> Protect your account with a strong and secure password </p><form class="flex flex-col gap-5"><div class="grid grid-cols-1 gap-5 md:grid-cols-2"><label class="label" for="new-password"><span class="my-1 block">${ssrInterpolate(unref(trans)("Old Password"))}</span><input type="password" class="input"${ssrRenderAttr("value", unref(form).oldpassword)} id="new-password"></label><label class="label" for="new-password"><span class="my-1 block">${ssrInterpolate(unref(trans)("New Password"))}</span><input type="password" class="input"${ssrRenderAttr("value", unref(form).password)} id="new-password"></label><label class="label" for="confirm-password"><span class="my-1 block">${ssrInterpolate(unref(trans)("Confirm Password"))}</span><input type="password" class="input"${ssrRenderAttr("value", unref(form).password_confirmation)} id="confirm-password"></label></div><div class="flex items-center justify-end gap-4"><button type="submit" class="btn btn-primary">${ssrInterpolate(unref(trans)("Update Password"))}</button></div></form></div></div></section></div><div class="modal" id="social-link"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><div class="flex items-center justify-between"><h6>Social Media</h6><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="modal"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div></div><div class="modal-body"><form method="post" class="-mt-1.5 flex w-full flex-col space-y-3"><div><label class="label" for="facebook"> Facebook </label><input type="text" class="input" value="" id="facebook" name="facebook"></div><div><label class="label" for="instagram"> Instragram </label><input type="text" class="input" value="https://www.instagram.com/example" name="instagram" id="instagram"></div><div><label class="label" for="twitter"> Twitter </label><input type="text" class="input" value="https://twitter.com/example" id="twitter" name="twitter"></div><div><label class="label" for="linkedin"> LinkedIn </label><input type="text" class="input" value="https://linkedin.com/example" id="linkedin" name="linkedin"></div></form></div><div class="modal-footer"><div class="flex items-center justify-end gap-4"><button type="cancel" class="btn btn-outline-secondary" data-dismiss="modal"> Cancel </button><button type="submit" class="btn btn-primary">Update</button></div></div></div></div></div></div></main>`);
    };
  }
});
const _sfc_setup$1p = _sfc_main$1p.setup;
_sfc_main$1p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Profile/Edit.vue");
  return _sfc_setup$1p ? _sfc_setup$1p(props, ctx) : void 0;
};
const __vite_glob_0_63 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1p
}, Symbol.toStringTag, { value: "Module" }));
const __default__$12 = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1o = /* @__PURE__ */ Object.assign(__default__$12, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "categories",
    "totalCategories",
    "activeCategories",
    "inActiveCategories",
    "languages",
    "buttons",
    "segments"
  ],
  setup(__props) {
    const props = __props;
    sharedComposable();
    onMounted(() => {
      drawer.init();
    });
    const stats = [
      {
        value: props.totalCategories,
        title: trans("Total Categories"),
        iconClass: "bx bx-box"
      },
      {
        value: props.activeCategories,
        title: trans("Active Categories"),
        iconClass: "bx bx-dollar-circle"
      },
      {
        value: props.inActiveCategories,
        title: trans("Inactive Categories"),
        iconClass: "ti ti-thumb-up"
      }
    ];
    const form = useForm({
      title: "",
      preview: "",
      status: true,
      description: ""
    });
    const editForm = ref({});
    const filterOptions = [
      {
        label: "Category Title",
        value: "title"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[--><main class="container p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Categories",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: stats,
        grid: "3"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2m, { options: filterOptions }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th class="">${ssrInterpolate(unref(trans)("Preview"))}</th><th class="">${ssrInterpolate(unref(trans)("Name"))}</th><th class="">${ssrInterpolate(unref(trans)("Slug"))}</th><th class="">${ssrInterpolate(unref(trans)("Status"))}</th><th class="">${ssrInterpolate(unref(trans)("Created At"))}</th><th class="flex justify-end">${ssrInterpolate(unref(trans)("Action"))}</th></tr></thead>`);
      if (__props.categories.total) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.categories.data, (category) => {
          _push(`<tr><td class="text-left"><a${ssrRenderAttr("href", `/projects/categories/` + category.slug)} target="_blank"><img${ssrRenderAttrs(mergeProps({ class: "w-16" }, ssrGetDirectiveProps(_ctx, _directive_lazy, category.preview)))}></a></td><td class="text-left"><a${ssrRenderAttr("href", `/projects/categories/` + category.slug)} target="_blank">${ssrInterpolate(category.title)}</a></td><td class="text-left">${ssrInterpolate(category.slug)}</td><td class="text-left"><span class="${ssrRenderClass([category.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(category.status == 1 ? unref(trans)("Active") : unref(trans)("Draft"))}</span></td><td>${ssrInterpolate(unref(moment)(category.created_at).format("DD MMM, YYYY"))}</td><td><div class="flex justify-end"><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item"><button class="dropdown-link"><i class="h-5 text-slate-400" data-feather="edit"></i><span>${ssrInterpolate(unref(trans)("Edit"))}</span></button></li><li class="dropdown-list-item"><button class="dropdown-link"><i class="h-5 text-slate-400" data-feather="trash-2">${ssrInterpolate(unref(trans)("Remove"))}&gt;</i><span>${ssrInterpolate(unref(trans)("Delete"))}</span></button></li></ul></div></div></div></td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table></div></div></main><div id="addNewCategoryDrawer" class="drawer drawer-right"><form><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Add New Category"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Title"))}</label><input${ssrRenderAttr("value", unref(form).title)} type="text" name="title" class="input" required></div><div class=""><label>${ssrInterpolate(unref(trans)("Category Preview"))}</label><input type="file" class="input" accept="image/*"></div><div class="mb-2 mt-2"><label>${ssrInterpolate(unref(trans)("Short Description"))}</label><textarea class="textarea" maxlength="500">${ssrInterpolate(unref(form).description)}</textarea></div><div class="mb-2 mt-3"><div><label for="toggle-status" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, null) : unref(form).status) ? " checked" : ""} class="toggle-input peer sr-only" id="toggle-status" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(unref(trans)("Make it publish?"))}</span></label></div></div></div><div class="drawer-footer"><div class="flex items-center space-x-4"><button type="button" class="btn btn-secondary w-full" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "w-full btn btn-primary",
        processing: unref(form).processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></form></div><div id="editCategoryDrawer" class="drawer drawer-right"><form><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Edit Category"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Title"))}</label><input${ssrRenderAttr("value", editForm.value.title)} type="text" name="title" class="input" required></div><div class=""><label>${ssrInterpolate(unref(trans)("Category Preview"))}</label><input type="file" class="input" accept="image/*"></div><div class="mb-2 mt-2"><label>${ssrInterpolate(unref(trans)("Short Description"))}</label><textarea class="textarea" maxlength="500">${ssrInterpolate(editForm.value.description)}</textarea></div><div class="mb-2 mt-3"><div><label for="toggle-update-status" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(Array.isArray(editForm.value.status) ? ssrLooseContain(editForm.value.status, null) : editForm.value.status) ? " checked" : ""} class="toggle-input peer sr-only" id="toggle-update-status" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(unref(trans)("Make it publish?"))}</span></label></div></div></div><div class="drawer-footer"><div class="flex justify-end gap-2"><button type="button" class="btn btn-secondary" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: editForm.value.processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></form></div><!--]-->`);
    };
  }
});
const _sfc_setup$1o = _sfc_main$1o.setup;
_sfc_main$1o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/ProjectCategories/Index.vue");
  return _sfc_setup$1o ? _sfc_setup$1o(props, ctx) : void 0;
};
const __vite_glob_0_64 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1o
}, Symbol.toStringTag, { value: "Module" }));
const __default__$11 = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1n = /* @__PURE__ */ Object.assign(__default__$11, {
  __name: "Create",
  __ssrInlineRender: true,
  props: ["segments", "buttons", "categories"],
  setup(__props) {
    const { cke, ClassicEditor: ClassicEditor2 } = ckeEditor();
    const newDurationItem = {
      duration: "",
      duration_type: "Days",
      max_profit_return: "",
      min_profit_return: "",
      loss_min_range: "",
      loss_max_range: "",
      return_type: "fixed"
    };
    const form = useForm({
      category_id: "",
      title: "",
      preview: "",
      cover_image: "",
      total_units: "",
      min_return: "",
      invest_amount: "",
      expire_date: "",
      address: "",
      durations: [{ ...newDurationItem }],
      // seo
      seo_title: "",
      seo_image: "",
      seo_description: "",
      seo_tags: "",
      // info
      short_description: "",
      main_description: "",
      faqs: [
        {
          qns: "",
          ans: ""
        }
      ],
      accept_new_investor: true,
      status: true
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Add New Project",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="flex"><div class="card mx-auto"><div class="card-body"><form><h4 class="mb-2">${ssrInterpolate(_ctx.trans("Project Information"))}</h4><div class=""><label>${ssrInterpolate(_ctx.trans("Project Title"))}</label><input${ssrRenderAttr("value", unref(form).title)} type="text" class="input" placeholder="enter project title (max 255 character)">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.title
      }, null, _parent));
      _push(`</div><div class="mb-2 mt-2"><label>${ssrInterpolate(_ctx.trans("Short Description"))}</label><textarea class="textarea" maxlength="500">${ssrInterpolate(unref(form).short_description)}</textarea>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors["short_description"]
      }, null, _parent));
      _push(`</div><div class="mb-2 mt-3"><label>${ssrInterpolate(_ctx.trans("Main Description"))}</label>`);
      _push(ssrRenderComponent(unref(cke), {
        "tag-name": "textarea",
        editor: unref(ClassicEditor2),
        modelValue: unref(form).main_description,
        "onUpdate:modelValue": ($event) => unref(form).main_description = $event
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors["short_description"]
      }, null, _parent));
      _push(`</div><div class="mb-2 grid grid-cols-2 space-x-2"><div class=""><label>${ssrInterpolate(_ctx.trans("Preview Image"))}</label><input type="file" class="input" accept="image/*">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.preview
      }, null, _parent));
      _push(`</div><div class=""><label>${ssrInterpolate(_ctx.trans("Cover Image"))}</label><input type="file" class="input" accept="image/*">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.cover_image
      }, null, _parent));
      _push(`</div></div><div class="grid grid-cols-4 space-x-2"><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Project Category"))}</label><select class="select"><option value="">SELECT</option><!--[-->`);
      ssrRenderList(__props.categories, (cat) => {
        _push(`<option${ssrRenderAttr("value", cat.id)}>${ssrInterpolate(cat.title)}</option>`);
      });
      _push(`<!--]--></select>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.category_id
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Total Units"))}</label><input${ssrRenderAttr("value", unref(form).total_units)} type="number" class="input" placeholder="100">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.total_units
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Invest Amount"))}</label><input${ssrRenderAttr("value", unref(form).invest_amount)} type="number" step="any" class="input" placeholder="1000">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.invest_amount
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Expire Date"))}</label><input${ssrRenderAttr("value", unref(form).expire_date)} type="date" class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.expire_date
      }, null, _parent));
      _push(`</div></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Address"))}</label><input${ssrRenderAttr("value", unref(form).address)} type="text" class="input" placeholder="enter address or location here">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.address
      }, null, _parent));
      _push(`</div><div class="mb-2 mt-10 flex items-center justify-between"><h4>${ssrInterpolate(_ctx.trans("Investments Calculations"))}</h4><button type="button" class="btn btn-primary">+</button></div><div class="grid grid-cols-7"><label>${ssrInterpolate(_ctx.trans("Duration"))}</label><label>${ssrInterpolate(_ctx.trans("Duration Type"))}</label><label>${ssrInterpolate(_ctx.trans("Profit return"))}</label><label>${ssrInterpolate(_ctx.trans("Min profit return"))}</label><label>${ssrInterpolate(_ctx.trans("Max profit return"))}</label><label>${ssrInterpolate(_ctx.trans("Min loss range"))}</label><label>${ssrInterpolate(_ctx.trans("Max loss range"))}</label></div><!--[-->`);
      ssrRenderList(unref(form).durations, (item, index) => {
        _push(`<div><div class="mt-2 flex items-center gap-2"><input type="number" step="any"${ssrRenderAttr("value", item.duration)} class="input" placeholder="30"><select class="select"><option value="Days">${ssrInterpolate(_ctx.trans("Days"))}</option><option value="Week">${ssrInterpolate(_ctx.trans("Week"))}</option><option value="Month">${ssrInterpolate(_ctx.trans("Month"))}</option><option value="Years">${ssrInterpolate(_ctx.trans("Years"))}</option></select><select class="select"><option value="fixed">${ssrInterpolate(_ctx.trans("Fixed"))}</option><option value="percent">${ssrInterpolate(_ctx.trans("Percent"))}</option></select><input type="number" step="any"${ssrRenderAttr("value", item.min_profit_return)} class="input" placeholder="100"><input type="number" step="any"${ssrRenderAttr("value", item.max_profit_return)} class="input" placeholder="500"><input type="number" step="any"${ssrRenderAttr("value", item.loss_min_range)} class="input" placeholder="200"><input type="number" step="any"${ssrRenderAttr("value", item.loss_max_range)} class="input" placeholder="300"><button type="button" class="btn btn-danger"> x </button></div>`);
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["durations." + index + ".duration"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["durations." + index + ".duration_type"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["durations." + index + ".return_type"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["durations." + index + ".min_profit_return"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["durations." + index + ".max_profit_return"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["durations." + index + ".loss_min_range"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["durations." + index + ".loss_max_range"]
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--><div class="mt-10 flex items-center justify-between"><h4>${ssrInterpolate(_ctx.trans("Faq's"))}</h4><button type="button" class="btn btn-primary">+</button></div><!--[-->`);
      ssrRenderList(unref(form).faqs, (item, index) => {
        _push(`<div><div class="mt-2 flex items-center gap-2"><input type="text"${ssrRenderAttr("value", item.qns)} class="input" placeholder="question"><input type="text"${ssrRenderAttr("value", item.ans)} class="input" placeholder="answer"><button type="button" class="btn btn-danger">x</button></div>`);
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["faqs." + index + ".qns"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["faqs." + index + ".ans"]
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--><h4 class="mb-2 mt-10">${ssrInterpolate(_ctx.trans("SEO Settings"))}</h4><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("SEO Meta Title"))}</label><input${ssrRenderAttr("value", unref(form).seo_title)} type="text" class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors["seo_title"]
      }, null, _parent));
      _push(`</div><div class="mb-2 mt-2"><label>${ssrInterpolate(_ctx.trans("SEO Meta Image"))}</label><input type="file" class="input" accept="image/*">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors["seo_image"]
      }, null, _parent));
      _push(`</div><div class="mb-2 mt-2"><label>${ssrInterpolate(_ctx.trans("SEO Meta Description"))}</label><textarea class="input h-100">${ssrInterpolate(unref(form).seo_description)}</textarea>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors["seo_description"]
      }, null, _parent));
      _push(`</div><div class="mb-2 mt-2"><label>${ssrInterpolate(_ctx.trans("SEO Meta Tags"))}</label><input${ssrRenderAttr("value", unref(form).seo_tags)} type="text" class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors["seo_tags"]
      }, null, _parent));
      _push(`</div><div class="mb-2 mt-3"><div><label for="toggle-new-investor-status" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).accept_new_investor) ? ssrLooseContain(unref(form).accept_new_investor, null) : unref(form).accept_new_investor) ? " checked" : ""} class="toggle-input peer sr-only" id="toggle-new-investor-status" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(_ctx.trans("Accept New Investors?"))}</span></label></div></div><div class="mb-2 mt-3"><div><label for="toggle-status" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, null) : unref(form).status) ? " checked" : ""} class="toggle-input peer sr-only" id="toggle-status" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(_ctx.trans("Make it publish?"))}</span></label></div></div><div class="mb-2 mt-3"><div>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(form).processing,
        "btn-text": _ctx.trans("Create")
      }, null, _parent));
      _push(`</div></div></form></div></div></div></div></main>`);
    };
  }
});
const _sfc_setup$1n = _sfc_main$1n.setup;
_sfc_main$1n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Projects/Create.vue");
  return _sfc_setup$1n ? _sfc_setup$1n(props, ctx) : void 0;
};
const __vite_glob_0_65 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1n
}, Symbol.toStringTag, { value: "Module" }));
const __default__$10 = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1m = /* @__PURE__ */ Object.assign(__default__$10, {
  __name: "Edit",
  __ssrInlineRender: true,
  props: ["segments", "buttons", "categories", "project", "metas"],
  setup(__props) {
    var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
    const props = __props;
    const { cke, ClassicEditor: ClassicEditor2 } = ckeEditor();
    const newDurationItem = {
      duration: "",
      duration_type: "Days",
      max_profit_return: "",
      min_profit_return: "",
      loss_min_range: "",
      loss_max_range: "",
      return_type: "fixed"
    };
    const newFaqItem = {
      qns: "",
      ans: ""
    };
    const form = useForm({
      category_id: props.project.category_id,
      title: props.project.title,
      preview: "",
      cover_image: "",
      total_units: (_a2 = props.project) == null ? void 0 : _a2.total_units,
      min_return: (_b2 = props.project) == null ? void 0 : _b2.min_return,
      invest_amount: (_c = props.project) == null ? void 0 : _c.invest_amount,
      expire_date: (_d = props.project) == null ? void 0 : _d.expire_date,
      address: (_e = props.project) == null ? void 0 : _e.address,
      durations: ((_f = props.project) == null ? void 0 : _f.durations) ?? [{ ...newDurationItem }],
      main_description: (_g = props.metas) == null ? void 0 : _g.main_description,
      short_description: (_h = props.metas) == null ? void 0 : _h.short_description,
      seo_title: (_i = props.metas) == null ? void 0 : _i.seo_title,
      seo_image: "",
      seo_description: (_j = props.metas) == null ? void 0 : _j.seo_description,
      seo_tags: (_k = props.metas) == null ? void 0 : _k.seo_tags,
      faqs: props.project.faqs ?? [{ ...newFaqItem }],
      accept_new_investor: (_l = props.project) == null ? void 0 : _l.accept_new_investor,
      status: (_m = props.project) == null ? void 0 : _m.status,
      _method: "put"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Edit Project",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="flex"><div class="card mx-auto"><div class="card-body"><form><h4 class="mb-2">${ssrInterpolate(_ctx.trans("Project Information"))}</h4><div class=""><label>${ssrInterpolate(_ctx.trans("Project Title"))}</label><input${ssrRenderAttr("value", unref(form).title)} type="text" class="input" placeholder="enter project title (max 255 character)">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.title
      }, null, _parent));
      _push(`</div><div class="mb-2 mt-2"><label>${ssrInterpolate(_ctx.trans("Short Description"))}</label><textarea class="textarea" maxlength="500">${ssrInterpolate(unref(form).short_description)}</textarea>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors["short_description"]
      }, null, _parent));
      _push(`</div><div class="mb-2 mt-3"><label>${ssrInterpolate(_ctx.trans("Main Description"))}</label>`);
      _push(ssrRenderComponent(unref(cke), {
        "tag-name": "textarea",
        editor: unref(ClassicEditor2),
        modelValue: unref(form).main_description,
        "onUpdate:modelValue": ($event) => unref(form).main_description = $event
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors["short_description"]
      }, null, _parent));
      _push(`</div><div class="mb-2 grid grid-cols-2 space-x-2"><div class=""><label>${ssrInterpolate(_ctx.trans("Preview Image"))}</label><input type="file" class="input" accept="image/*">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.preview
      }, null, _parent));
      _push(`</div><div class=""><label>${ssrInterpolate(_ctx.trans("Cover Image"))}</label><input type="file" class="input" accept="image/*">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.cover_image
      }, null, _parent));
      _push(`</div></div><div class="grid grid-cols-4 space-x-2"><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Project Category"))}</label><select class="select"><option value="">SELECT</option><!--[-->`);
      ssrRenderList(__props.categories, (cat) => {
        _push(`<option${ssrRenderAttr("value", cat.id)}>${ssrInterpolate(cat.title)}</option>`);
      });
      _push(`<!--]--></select>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.category_id
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Total Units"))}</label><input${ssrRenderAttr("value", unref(form).total_units)} type="number" class="input" placeholder="100">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.total_units
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Invest Amount"))}</label><input${ssrRenderAttr("value", unref(form).invest_amount)} type="number" step="any" class="input" placeholder="1000">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.invest_amount
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Expire Date"))}</label><input${ssrRenderAttr("value", unref(form).expire_date)} type="date" class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.expire_date
      }, null, _parent));
      _push(`</div></div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Address"))}</label><input${ssrRenderAttr("value", unref(form).address)} type="text" class="input" placeholder="enter address or location here">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.address
      }, null, _parent));
      _push(`</div><div class="mb-2 mt-10 flex items-center justify-between"><h4>${ssrInterpolate(_ctx.trans("Investments Calculations"))}</h4><button type="button" class="btn btn-primary">+</button></div><div class="grid grid-cols-7"><label>${ssrInterpolate(_ctx.trans("Duration"))}</label><label>${ssrInterpolate(_ctx.trans("Duration Type"))}</label><label>${ssrInterpolate(_ctx.trans("Profit return"))}</label><label>${ssrInterpolate(_ctx.trans("Min profit return"))}</label><label>${ssrInterpolate(_ctx.trans("Max profit return"))}</label><label>${ssrInterpolate(_ctx.trans("Min loss range"))}</label><label>${ssrInterpolate(_ctx.trans("Max loss range"))}</label></div><!--[-->`);
      ssrRenderList(unref(form).durations, (item, index) => {
        _push(`<div><div class="mt-2 flex items-center gap-2"><input type="number" step="any"${ssrRenderAttr("value", item.duration)} class="input" placeholder="30"><select class="select"><option value="Days">${ssrInterpolate(_ctx.trans("Days"))}</option><option value="Week">${ssrInterpolate(_ctx.trans("Week"))}</option><option value="Month">${ssrInterpolate(_ctx.trans("Month"))}</option><option value="Years">${ssrInterpolate(_ctx.trans("Years"))}</option></select><select class="select"><option value="fixed">${ssrInterpolate(_ctx.trans("Fixed"))}</option><option value="percent">${ssrInterpolate(_ctx.trans("Percent"))}</option></select><input type="number" step="any"${ssrRenderAttr("value", item.min_profit_return)} class="input" placeholder="100"><input type="number" step="any"${ssrRenderAttr("value", item.max_profit_return)} class="input" placeholder="500"><input type="number" step="any"${ssrRenderAttr("value", item.loss_min_range)} class="input" placeholder="200"><input type="number" step="any"${ssrRenderAttr("value", item.loss_max_range)} class="input" placeholder="300"><button type="button" class="btn btn-danger"${ssrIncludeBooleanAttr(item.id) ? " disabled" : ""}> x </button></div>`);
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["durations." + index + ".duration"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["durations." + index + ".duration_type"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["durations." + index + ".return_type"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["durations." + index + ".min_profit_return"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["durations." + index + ".max_profit_return"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["durations." + index + ".loss_min_range"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["durations." + index + ".loss_max_range"]
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--><div class="mt-10 flex items-center justify-between"><h4>${ssrInterpolate(_ctx.trans("Faq's"))}</h4><button type="button" class="btn btn-primary">+</button></div><!--[-->`);
      ssrRenderList(unref(form).faqs, (item, index) => {
        _push(`<div><div class="mt-2 flex items-center gap-2"><input type="text"${ssrRenderAttr("value", item.qns)} class="input" placeholder="question"><input type="text"${ssrRenderAttr("value", item.ans)} class="input" placeholder="answer"><button type="button" class="btn btn-danger">x</button></div>`);
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["faqs." + index + ".qns"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors["faqs." + index + ".ans"]
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--><h4 class="mb-2 mt-10">${ssrInterpolate(_ctx.trans("SEO Settings"))}</h4><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("SEO Meta Title"))}</label><input${ssrRenderAttr("value", unref(form).seo_title)} type="text" class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors["seo_title"]
      }, null, _parent));
      _push(`</div><div class="mb-2 mt-2"><label>${ssrInterpolate(_ctx.trans("SEO Meta Image"))}</label><input type="file" class="input" accept="image/*">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors["seo_image"]
      }, null, _parent));
      _push(`</div><div class="mb-2 mt-2"><label>${ssrInterpolate(_ctx.trans("SEO Meta Description"))}</label><textarea class="input h-100">${ssrInterpolate(unref(form).seo_description)}</textarea>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors["seo_description"]
      }, null, _parent));
      _push(`</div><div class="mb-2 mt-2"><label>${ssrInterpolate(_ctx.trans("SEO Meta Tags"))}</label><input${ssrRenderAttr("value", unref(form).seo_tags)} type="text" class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors["seo_tags"]
      }, null, _parent));
      _push(`</div><div class="mb-2 mt-3"><div><label for="toggle-new-investor-status" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).accept_new_investor) ? ssrLooseContain(unref(form).accept_new_investor, null) : unref(form).accept_new_investor) ? " checked" : ""} class="toggle-input peer sr-only" id="toggle-new-investor-status" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(_ctx.trans("Accept New Investors?"))}</span></label></div></div><div class="mb-2 mt-3"><div><label for="toggle-status" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, null) : unref(form).status) ? " checked" : ""} class="toggle-input peer sr-only" id="toggle-status" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(_ctx.trans("Make it publish?"))}</span></label></div></div><div class="mb-2 mt-3"><div>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(form).processing,
        "btn-text": _ctx.trans("Update")
      }, null, _parent));
      _push(`</div></div></form></div></div></div></div></main>`);
    };
  }
});
const _sfc_setup$1m = _sfc_main$1m.setup;
_sfc_main$1m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Projects/Edit.vue");
  return _sfc_setup$1m ? _sfc_setup$1m(props, ctx) : void 0;
};
const __vite_glob_0_66 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1m
}, Symbol.toStringTag, { value: "Module" }));
const __default__$$ = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1l = /* @__PURE__ */ Object.assign(__default__$$, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "projects",
    "totalProjects",
    "activeProjects",
    "inActiveProjects",
    "buttons",
    "segments",
    "type"
  ],
  setup(__props) {
    const props = __props;
    sharedComposable();
    const stats = [
      {
        value: props.totalProjects,
        title: trans("Total Projects"),
        iconClass: "bx bx-box"
      },
      {
        value: props.activeProjects,
        title: trans("Active Projects"),
        iconClass: "bx bx-dollar-circle"
      },
      {
        value: props.inActiveProjects,
        title: trans("Inactive Projects"),
        iconClass: "ti ti-thumb-up"
      }
    ];
    const filterOptions = [
      {
        label: "Project Title",
        value: "title"
      },
      {
        label: "Status",
        value: "status",
        options: [
          {
            label: "Active",
            value: 1
          },
          {
            label: "Inactive",
            value: 0
          }
        ]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, null, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: stats,
        grid: "3"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2m, { options: filterOptions }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Project"))}</th><th>${ssrInterpolate(unref(trans)("Category"))}</th><th>${ssrInterpolate(unref(trans)("Address"))}</th><th>${ssrInterpolate(unref(trans)("Units"))}</th><th>${ssrInterpolate(unref(trans)("Status"))}</th><th>${ssrInterpolate(unref(trans)("Expire"))}</th><th>${ssrInterpolate(unref(trans)("Created At"))}</th><th class="!text-end">${ssrInterpolate(unref(trans)("Action"))}</th></tr></thead>`);
      if (__props.projects.data != 0) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.projects.data, (project) => {
          var _a2;
          _push(`<tr><td><a target="_blank" class="flex items-center"${ssrRenderAttr("href", _ctx.route("projects.show", project.slug))}><img${ssrRenderAttrs(mergeProps({ class: "avatar rounded-square mr-3" }, ssrGetDirectiveProps(_ctx, _directive_lazy, project.preview)))}><p>${ssrInterpolate(project.title)}</p></a></td><td>${ssrInterpolate((_a2 = project.category) == null ? void 0 : _a2.title)}</td><td>${ssrInterpolate(project.address)}</td><td>${ssrInterpolate(project.total_units)}</td><td class="text-left"><span class="${ssrRenderClass([project.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(project.status == 1 ? unref(trans)("Active") : unref(trans)("Draft"))}</span></td><td>${ssrInterpolate(unref(moment)(project.expire_date).format("D-MMM-Y"))}</td><td>${ssrInterpolate(unref(moment)(project.created_at).format("D-MMM-Y"))}</td><td><div class="flex justify-end"><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item">`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("admin.projects.edit", project.id),
            class: "dropdown-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="h-5 text-slate-400" data-feather="edit"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(unref(trans)("Edit"))}</span>`);
              } else {
                return [
                  createVNode("i", {
                    class: "h-5 text-slate-400",
                    "data-feather": "edit"
                  }),
                  createVNode("span", null, toDisplayString(unref(trans)("Edit")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li><li class="dropdown-list-item"><button class="dropdown-link"><i class="h-5 text-slate-400" data-feather="trash-2"></i><span>${ssrInterpolate(unref(trans)("Delete"))}</span></button></li><li class="dropdown-list-item">`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("admin.return-schedules.index", project.id),
            class: "dropdown-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="h-5 text-slate-400" data-feather="arrow-down-right"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(unref(trans)("Schedules"))}</span>`);
              } else {
                return [
                  createVNode("i", {
                    class: "h-5 text-slate-400",
                    "data-feather": "arrow-down-right"
                  }),
                  createVNode("span", null, toDisplayString(unref(trans)("Schedules")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li></ul></div></div></div></td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table></div>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.projects.links
      }, null, _parent));
      _push(`</div></main>`);
    };
  }
});
const _sfc_setup$1l = _sfc_main$1l.setup;
_sfc_main$1l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Projects/Index.vue");
  return _sfc_setup$1l ? _sfc_setup$1l(props, ctx) : void 0;
};
const __vite_glob_0_67 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1l
}, Symbol.toStringTag, { value: "Module" }));
const __default__$_ = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1k = /* @__PURE__ */ Object.assign(__default__$_, {
  __name: "Create",
  __ssrInlineRender: true,
  props: ["segments", "buttons", "project", "durations"],
  setup(__props) {
    var _a2, _b2;
    const props = __props;
    const form = useForm({
      project_id: props.project.id,
      project_duration_id: ((_b2 = (_a2 = props.durations) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.id) ?? "",
      return_type: "fixed",
      profit_type: "profit",
      amount: "",
      attachment: "",
      return_date: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Add New Return Schedule to a project",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="card ml-auto w-[600px]"><div class="card-body"><form><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Project Durations"))}</label><select class="select"><!--[-->`);
      ssrRenderList(__props.durations, (item) => {
        _push(`<option${ssrRenderAttr("value", item.id)}>${ssrInterpolate(`${__props.project.title} (${item.duration} ${item.duration_type})`)}</option>`);
      });
      _push(`<!--]--></select>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.project_duration_id
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Return type"))}</label><select class="select"><option value="fixed">${ssrInterpolate(_ctx.trans("Fixed"))}</option><option value="percent">${ssrInterpolate(_ctx.trans("Percent"))}</option></select>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.return_type
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Profit type"))}</label><select class="select"><option value="profit">${ssrInterpolate(_ctx.trans("Profit"))}</option><option value="loss">${ssrInterpolate(_ctx.trans("Loss"))}</option></select>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.profit_type
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Amount"))}</label><input${ssrRenderAttr("value", unref(form).amount)} type="number" step="any" class="input" placeholder="1500">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.amount
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Return Date"))}</label><input${ssrRenderAttr("value", unref(form).return_date)} type="date" class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.return_date
      }, null, _parent));
      _push(`</div><div class=""><label>${ssrInterpolate(_ctx.trans("Attachment"))}</label><input type="file" class="input" accept="image/*">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.attachment
      }, null, _parent));
      _push(`</div><div class="mt-3 mb-2"><div>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(form).processing,
        "btn-text": _ctx.trans("Create")
      }, null, _parent));
      _push(`</div></div></form></div></div></div></main>`);
    };
  }
});
const _sfc_setup$1k = _sfc_main$1k.setup;
_sfc_main$1k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Projects/ReturnSchedules/Create.vue");
  return _sfc_setup$1k ? _sfc_setup$1k(props, ctx) : void 0;
};
const __vite_glob_0_68 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1k
}, Symbol.toStringTag, { value: "Module" }));
const __default__$Z = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1j = /* @__PURE__ */ Object.assign(__default__$Z, {
  __name: "Edit",
  __ssrInlineRender: true,
  props: [
    "segments",
    "buttons",
    "project",
    "return_schedule",
    "durations"
  ],
  setup(__props) {
    const props = __props;
    const form = useForm({
      project_id: props.project.id,
      project_duration_id: "",
      return_type: props.return_schedule.return_type,
      profit_type: props.return_schedule.profit_type,
      amount: props.return_schedule.amount,
      attachment: "",
      return_date: props.return_schedule.return_date
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Edit Return Schedule",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="card ml-auto w-[600px]"><div class="card-body"><form><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Project Durations"))}</label><select class="select" required><option value="">${ssrInterpolate(_ctx.trans("Select Project Duration"))}</option><!--[-->`);
      ssrRenderList(__props.durations, (item) => {
        _push(`<option${ssrRenderAttr("value", item.id)}>${ssrInterpolate(`${__props.project.title} (${item.duration} ${item.duration_type})`)}</option>`);
      });
      _push(`<!--]--></select>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.project_duration_id
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Return type"))}</label><select class="select"><option value="fixed">${ssrInterpolate(_ctx.trans("Fixed"))}</option><option value="percent">${ssrInterpolate(_ctx.trans("Percent"))}</option></select>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.return_type
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Profit type"))}</label><select class="select"><option value="profit">${ssrInterpolate(_ctx.trans("Profit"))}</option><option value="loss">${ssrInterpolate(_ctx.trans("Loss"))}</option></select>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.profit_type
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Amount"))}</label><input${ssrRenderAttr("value", unref(form).amount)} type="number" step="any" class="input" placeholder="1500">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.amount
      }, null, _parent));
      _push(`</div><div class=""><label>${ssrInterpolate(_ctx.trans("Attachment"))}</label><input type="file" class="input" accept="image/*">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.attachment
      }, null, _parent));
      _push(`</div><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Return Date"))}</label><input${ssrRenderAttr("value", unref(form).return_date)} type="date" class="input">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.return_date
      }, null, _parent));
      _push(`</div><div class="mt-3 mb-2"><div>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(form).processing,
        "btn-text": _ctx.trans("Update")
      }, null, _parent));
      _push(`</div></div></form></div></div></div></main>`);
    };
  }
});
const _sfc_setup$1j = _sfc_main$1j.setup;
_sfc_main$1j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Projects/ReturnSchedules/Edit.vue");
  return _sfc_setup$1j ? _sfc_setup$1j(props, ctx) : void 0;
};
const __vite_glob_0_69 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1j
}, Symbol.toStringTag, { value: "Module" }));
const __default__$Y = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1i = /* @__PURE__ */ Object.assign(__default__$Y, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "project",
    "returnSchedules",
    "total",
    "totalActive",
    "totalInactive",
    "buttons",
    "segments"
  ],
  setup(__props) {
    const props = __props;
    const { deleteRow, formatCurrency } = sharedComposable();
    const stats = [
      {
        value: props.total,
        title: trans("Total Schedule"),
        iconClass: "bx bx-box"
      },
      {
        value: props.totalActive,
        title: trans("Executed Schedule"),
        iconClass: "ti ti-thumb-up"
      },
      {
        value: props.totalInactive,
        title: trans("Pending Schedule"),
        iconClass: "ti ti-thumb-down"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Project Return Schedule",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: stats,
        grid: "3"
      }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Project"))}</th><th>${ssrInterpolate(unref(trans)("Return value"))}</th><th>${ssrInterpolate(unref(trans)("Profit type"))}</th><th>${ssrInterpolate(unref(trans)("Return type"))}</th><th>${ssrInterpolate(unref(trans)("Status"))}</th><th>${ssrInterpolate(unref(trans)("Attachment"))}</th><th>${ssrInterpolate(unref(trans)("Return date"))}</th><th>${ssrInterpolate(unref(trans)("Created At"))}</th><th>${ssrInterpolate(unref(trans)("Action"))}</th></tr></thead>`);
      if (__props.returnSchedules.total) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.returnSchedules.data, (item) => {
          var _a2, _b2;
          _push(`<tr><td class="flex items-center"><img${ssrRenderAttrs(mergeProps({ class: "avatar mr-3 rounded" }, ssrGetDirectiveProps(_ctx, _directive_lazy, (_a2 = __props.project) == null ? void 0 : _a2.preview)))}><p>${ssrInterpolate((_b2 = __props.project) == null ? void 0 : _b2.title)} ${ssrInterpolate(`(${item.project_duration.duration} / ${item.project_duration.duration_type})`)}</p></td><td><div class="text-center">`);
          if (item.return_type == "fixed") {
            _push(`<!--[-->${ssrInterpolate(unref(formatCurrency)(item.amount))}<!--]-->`);
          } else if (item.return_type == "percent") {
            _push(`<!--[-->${ssrInterpolate(item.amount)}% <!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></td><td><span class="${ssrRenderClass([[item.profit_type == "profit" ? "badge-success" : "badge-danger"], "badge"])}">${ssrInterpolate(item.profit_type)}</span></td><td><span class="badge badge-primary">${ssrInterpolate(item.return_type)}</span></td><td class="text-left"><span class="${ssrRenderClass([item.status == 1 ? "badge-success" : "badge-warning", "badge"])}">${ssrInterpolate(item.status == 1 ? unref(trans)("Executed") : unref(trans)("Pending"))}</span></td><td>`);
          if (item.attachment) {
            _push(`<a class="badge badge-primary px-2 py-1"${ssrRenderAttr("href", item.attachment)}>${ssrInterpolate(unref(trans)("View"))}</a>`);
          } else {
            _push(`<!--[-->${ssrInterpolate(unref(trans)("None"))}<!--]-->`);
          }
          _push(`</td><td>${ssrInterpolate(unref(moment)(item.return_date).format("DD-MMM-Y"))}</td><td>${ssrInterpolate(unref(moment)(item.created_at).format("DD-MMM-Y"))}</td><td><div class="flex justify-end"><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item">`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("admin.return-schedules.edit", {
              project: __props.project.id,
              return_schedule: item.id
            }),
            class: "dropdown-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="h-5 text-slate-400" data-feather="edit"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(unref(trans)("Edit"))}</span>`);
              } else {
                return [
                  createVNode("i", {
                    class: "h-5 text-slate-400",
                    "data-feather": "edit"
                  }),
                  createVNode("span", null, toDisplayString(unref(trans)("Edit")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li><li class="dropdown-list-item"><button class="dropdown-link"><i class="h-5 text-slate-400" data-feather="trash-2"></i><span>${ssrInterpolate(unref(trans)("Delete"))}</span></button></li></ul></div></div></div></td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table></div>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.returnSchedules.links
      }, null, _parent));
      _push(`</div></main>`);
    };
  }
});
const _sfc_setup$1i = _sfc_main$1i.setup;
_sfc_main$1i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Projects/ReturnSchedules/Index.vue");
  return _sfc_setup$1i ? _sfc_setup$1i(props, ctx) : void 0;
};
const __vite_glob_0_70 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1i
}, Symbol.toStringTag, { value: "Module" }));
const __default__$X = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1h = /* @__PURE__ */ Object.assign(__default__$X, {
  __name: "Commissions",
  __ssrInlineRender: true,
  props: [
    "commissions",
    "affiliate_commission_percent",
    "buttons",
    "segments",
    "total",
    "totalPending",
    "totalApproved",
    "totalDeclined"
  ],
  setup(__props) {
    const props = __props;
    const { formatCurrency } = sharedComposable();
    onMounted(() => {
      drawer.init();
    });
    const stats = [
      { value: props.total, title: trans("Total "), iconClass: "bx bx-box" },
      {
        value: props.totalPending,
        title: trans("Pending "),
        iconClass: "bx bx-dollar-circle"
      },
      {
        value: props.totalApproved,
        title: trans("Approved"),
        iconClass: "ti ti-thumb-up"
      },
      {
        value: props.totalDeclined,
        title: trans("Declined "),
        iconClass: "ti ti-message-2-cog"
      }
    ];
    const commissionForm = useForm({
      affiliate_commission_percent: props.affiliate_commission_percent
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Referral History"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, { items: stats }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th class="">${ssrInterpolate(unref(trans)("User"))}</th><th class="">${ssrInterpolate(unref(trans)("Order"))}</th><th class="">${ssrInterpolate(unref(trans)("Project"))}</th><th class="">${ssrInterpolate(unref(trans)("Amount"))}</th><th class="">${ssrInterpolate(unref(trans)("Created At"))}</th><th class="">${ssrInterpolate(unref(trans)("Action"))}</th></tr></thead>`);
      if (__props.commissions.total) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.commissions.data, (item) => {
          var _a2, _b2, _c, _d, _e, _f, _g, _h, _i;
          _push(`<tr><td class="flex items-center gap-x-2"><img${ssrRenderAttrs(mergeProps({
            class: "w-10 rounded-full",
            alt: (_a2 = item.user) == null ? void 0 : _a2.name
          }, ssrGetDirectiveProps(
            _ctx,
            _directive_lazy,
            ((_b2 = item.user) == null ? void 0 : _b2.avatar) == null ? `https://ui-avatars.com/api/?name=${(_c = item.user) == null ? void 0 : _c.name}` : `${(_d = item.user) == null ? void 0 : _d.avatar}`
          )))}> ${ssrInterpolate((_e = item.user) == null ? void 0 : _e.name)}</td><td class="text-left">`);
          _push(ssrRenderComponent(unref(Link), {
            href: `/admin/order/${item.order_id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              var _a3, _b3;
              if (_push2) {
                _push2(`${ssrInterpolate((_a3 = item.order) == null ? void 0 : _a3.invoice_no)}`);
              } else {
                return [
                  createTextVNode(toDisplayString((_b3 = item.order) == null ? void 0 : _b3.invoice_no), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td class="text-left"><a target="_blank"${ssrRenderAttr("href", `/projects/${(_g = (_f = item.order) == null ? void 0 : _f.project) == null ? void 0 : _g.slug}`)}>${ssrInterpolate((_i = (_h = item.order) == null ? void 0 : _h.project) == null ? void 0 : _i.title)}</a></td><td>${ssrInterpolate(unref(formatCurrency)(item.commission_amount))}</td><td>${ssrInterpolate(unref(moment)(item.created_at).format("DD MMM, YYYY"))}</td><td>`);
          if (item.status == 0) {
            _push(`<div class="flex gap-1"><button class="btn btn-primary">${ssrInterpolate(unref(trans)("Approve"))}</button><button class="btn btn-danger">${ssrInterpolate(unref(trans)("Reject"))}</button></div>`);
          } else {
            _push(`<!---->`);
          }
          if (item.status != 0) {
            _push(`<div>`);
            if (item.status == 1) {
              _push(`<button class="btn btn-success" disabled>${ssrInterpolate(unref(trans)("Approved"))}</button>`);
            } else {
              _push(`<button class="btn btn-danger" disabled>${ssrInterpolate(unref(trans)("Rejected"))}</button>`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.commissions.links
      }, null, _parent));
      _push(`</div></div><div id="commissionSettingDrawer" class="drawer drawer-right"><form method="POST"><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Tax Settings"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Affiliate Commission For Per Investment (%)"))}</label><input type="number" step="any"${ssrRenderAttr("value", unref(commissionForm).affiliate_commission_percent)} class="input" required></div></div><div class="drawer-footer"><div class="flex justify-end gap-2"><button type="button" class="btn btn-secondary" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(commissionForm).processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></form><div class="drawer-backdrop"></div></div></main>`);
    };
  }
});
const _sfc_setup$1h = _sfc_main$1h.setup;
_sfc_main$1h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Referrals/Commissions.vue");
  return _sfc_setup$1h ? _sfc_setup$1h(props, ctx) : void 0;
};
const __vite_glob_0_71 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1h
}, Symbol.toStringTag, { value: "Module" }));
const __default__$W = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1g = /* @__PURE__ */ Object.assign(__default__$W, {
  __name: "History",
  __ssrInlineRender: true,
  props: ["histories", "buttons", "segments"],
  setup(__props) {
    sharedComposable();
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: _ctx.trans("Referral History"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th class="">${ssrInterpolate(_ctx.trans("Refer User"))}</th><th class="">${ssrInterpolate(_ctx.trans("Referral User"))}</th><th class="">${ssrInterpolate(_ctx.trans("Created At"))}</th></tr></thead>`);
      if (__props.histories.total) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.histories.data, (history) => {
          var _a2, _b2;
          _push(`<tr><td>`);
          _push(ssrRenderComponent(unref(Link), {
            class: "flex items-center gap-x-2",
            href: `/admin/customers/${(_a2 = history.refer_user) == null ? void 0 : _a2.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              var _a3, _b3, _c, _d, _e, _f, _g, _h, _i, _j;
              if (_push2) {
                _push2(`<img${ssrRenderAttrs(mergeProps({
                  class: "w-10 rounded-full",
                  alt: (_a3 = history.refer_user) == null ? void 0 : _a3.name
                }, ssrGetDirectiveProps(
                  _ctx,
                  _directive_lazy,
                  ((_b3 = history.refer_user) == null ? void 0 : _b3.avatar) == null ? `https://ui-avatars.com/api/?name=${(_c = history.refer_user) == null ? void 0 : _c.name}` : `${(_d = history.refer_user) == null ? void 0 : _d.avatar}`
                )))}${_scopeId}> ${ssrInterpolate((_e = history.refer_user) == null ? void 0 : _e.name)}`);
              } else {
                return [
                  withDirectives(createVNode("img", {
                    class: "w-10 rounded-full",
                    alt: (_f = history.refer_user) == null ? void 0 : _f.name
                  }, null, 8, ["alt"]), [
                    [
                      _directive_lazy,
                      ((_g = history.refer_user) == null ? void 0 : _g.avatar) == null ? `https://ui-avatars.com/api/?name=${(_h = history.refer_user) == null ? void 0 : _h.name}` : `${(_i = history.refer_user) == null ? void 0 : _i.avatar}`
                    ]
                  ]),
                  createTextVNode(" " + toDisplayString((_j = history.refer_user) == null ? void 0 : _j.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td>`);
          _push(ssrRenderComponent(unref(Link), {
            class: "flex items-center gap-x-2",
            href: `/admin/customers/${(_b2 = history.referral_user) == null ? void 0 : _b2.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              var _a3, _b3, _c, _d, _e, _f, _g, _h, _i, _j;
              if (_push2) {
                _push2(`<img${ssrRenderAttrs(mergeProps({
                  class: "w-10 rounded-full",
                  alt: (_a3 = history.referral_user) == null ? void 0 : _a3.name
                }, ssrGetDirectiveProps(
                  _ctx,
                  _directive_lazy,
                  ((_b3 = history.referral_user) == null ? void 0 : _b3.avatar) == null ? `https://ui-avatars.com/api/?name=${(_c = history.referral_user) == null ? void 0 : _c.name}` : `${(_d = history.referral_user) == null ? void 0 : _d.avatar}`
                )))}${_scopeId}> ${ssrInterpolate((_e = history.referral_user) == null ? void 0 : _e.name)}`);
              } else {
                return [
                  withDirectives(createVNode("img", {
                    class: "w-10 rounded-full",
                    alt: (_f = history.referral_user) == null ? void 0 : _f.name
                  }, null, 8, ["alt"]), [
                    [
                      _directive_lazy,
                      ((_g = history.referral_user) == null ? void 0 : _g.avatar) == null ? `https://ui-avatars.com/api/?name=${(_h = history.referral_user) == null ? void 0 : _h.name}` : `${(_i = history.referral_user) == null ? void 0 : _i.avatar}`
                    ]
                  ]),
                  createTextVNode(" " + toDisplayString((_j = history.referral_user) == null ? void 0 : _j.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td>${ssrInterpolate(unref(moment)(history.created_at).format("DD MMM, YYYY"))}</td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.histories.links
      }, null, _parent));
      _push(`</div></div></main>`);
    };
  }
});
const _sfc_setup$1g = _sfc_main$1g.setup;
_sfc_main$1g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Referrals/History.vue");
  return _sfc_setup$1g ? _sfc_setup$1g(props, ctx) : void 0;
};
const __vite_glob_0_72 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1g
}, Symbol.toStringTag, { value: "Module" }));
const __default__$V = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1f = /* @__PURE__ */ Object.assign(__default__$V, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "returnTransactions",
    "total",
    "totalProfited",
    "totalLoss",
    "buttons",
    "segments",
    "type",
    "request"
  ],
  setup(__props) {
    const props = __props;
    const { formatCurrency } = sharedComposable();
    const stats = [
      {
        value: props.total,
        title: trans("Total"),
        iconClass: "bx bx-box"
      },
      {
        value: props.totalProfited,
        title: trans("Total Profited"),
        iconClass: "bx bx-dollar-circle"
      },
      {
        value: props.totalLoss,
        title: trans("Total Loss"),
        iconClass: "ti ti-thumb-up"
      }
    ];
    const filterOptions = [
      {
        label: "User name",
        value: "name"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Investment Projects",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: stats,
        grid: "3"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2m, { options: filterOptions }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Project"))}</th><th>${ssrInterpolate(unref(trans)("Duration"))}</th><th>${ssrInterpolate(unref(trans)("User"))}</th><th>${ssrInterpolate(unref(trans)("Amount"))}</th><th>${ssrInterpolate(unref(trans)("Type"))}</th><th>${ssrInterpolate(unref(trans)("Status"))}</th><th>${ssrInterpolate(unref(trans)("Created At"))}</th></tr></thead>`);
      if (__props.returnTransactions.data != 0) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.returnTransactions.data, (returnTransaction) => {
          var _a2, _b2;
          _push(`<tr><td class="flex items-center"><img${ssrRenderAttrs(mergeProps({ class: "avatar mr-2 rounded" }, ssrGetDirectiveProps(_ctx, _directive_lazy, (_a2 = returnTransaction == null ? void 0 : returnTransaction.project_duration) == null ? void 0 : _a2.project.preview)))}><p>${ssrInterpolate((_b2 = returnTransaction == null ? void 0 : returnTransaction.project_duration) == null ? void 0 : _b2.project.title)}</p></td><td>${ssrInterpolate(returnTransaction == null ? void 0 : returnTransaction.project_duration.duration)}/${ssrInterpolate(returnTransaction == null ? void 0 : returnTransaction.project_duration.duration_type)}</td><td>`);
          _push(ssrRenderComponent(unref(Link), { href: "#" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              var _a3, _b3;
              if (_push2) {
                _push2(`${ssrInterpolate((_a3 = returnTransaction.user) == null ? void 0 : _a3.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString((_b3 = returnTransaction.user) == null ? void 0 : _b3.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td>${ssrInterpolate(unref(formatCurrency)(returnTransaction.amount))}</td><td><span class="${ssrRenderClass([returnTransaction.type == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(returnTransaction.type == 1 ? unref(trans)("Profit") : unref(trans)("Loss"))}</span></td><td class="text-left"><span class="${ssrRenderClass([returnTransaction.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(returnTransaction.status == 1 ? unref(trans)("Active") : unref(trans)("Pending"))}</span></td><td>${ssrInterpolate(unref(moment)(returnTransaction.created_at).format("D-MMM-Y"))}</td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table></div>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.returnTransactions.links
      }, null, _parent));
      _push(`</div></main>`);
    };
  }
});
const _sfc_setup$1f = _sfc_main$1f.setup;
_sfc_main$1f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/ReturnTransaction/Index.vue");
  return _sfc_setup$1f ? _sfc_setup$1f(props, ctx) : void 0;
};
const __vite_glob_0_73 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1f
}, Symbol.toStringTag, { value: "Module" }));
const __default__$U = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1e = /* @__PURE__ */ Object.assign(__default__$U, {
  __name: "Create",
  __ssrInlineRender: true,
  props: ["segments", "buttons", "permissions_groups"],
  setup(__props) {
    const props = __props;
    const form = useForm({
      permissions: [],
      name: null
    });
    const selectedGroup = ref([]);
    const isAllSelected = computed(
      () => props.permissions_groups.length === selectedGroup.value.length
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: _ctx.trans("Create Role"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="card"><div class="card-body"><div class="mb-3"><label>${ssrInterpolate(_ctx.trans("Role Name"))}</label><input type="text" class="input" required="" name="name" placeholder="sub admin"${ssrRenderAttr("value", unref(form).name)}></div>`);
      _push(ssrRenderComponent(ValidationErrors, null, null, _parent));
      _push(`<div><label for="customCheck12" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(isAllSelected.value) ? " checked" : ""} class="toggle-input peer sr-only" id="customCheck12" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(_ctx.trans("Check All Permissions"))}</span></label></div><hr><!--[-->`);
      ssrRenderList(__props.permissions_groups, (group, key) => {
        _push(`<div class="mt-3"><div class="grid grid-cols-12"><div class="col-span-3"><div class="flex items-center gap-2"><input${ssrIncludeBooleanAttr(selectedGroup.value.includes(group.group_name)) ? " checked" : ""} type="checkbox" class="checkbox"${ssrRenderAttr("id", key + "Management")}${ssrRenderAttr("value", group.group_name)}${ssrRenderAttr("data-class", `role-${key}-management-checkbox`)}><label class="label"${ssrRenderAttr("for", key + "Management")}>${ssrInterpolate(group.group_name)} name </label></div></div><div class="${ssrRenderClass(`col-span-9 role-${key}-management-checkbox`)}"><!--[-->`);
        ssrRenderList(group.permissions, (permission) => {
          _push(`<div class="flex items-center gap-2"><input${ssrIncludeBooleanAttr(unref(form).permissions.includes(permission.name)) ? " checked" : ""} type="checkbox" class="checkbox" name="permissions[]"${ssrRenderAttr("id", `checkPermission${permission.id}`)}${ssrRenderAttr("value", permission.name)}><label class="label"${ssrRenderAttr("for", `checkPermission${permission.id}`)}>${ssrInterpolate(permission.name)}</label></div>`);
        });
        _push(`<!--]--><br></div></div></div>`);
      });
      _push(`<!--]--></div><div class="card-footer"><button type="submit" class="btn btn-primary"><i class="fa fa-save"></i> ${ssrInterpolate(_ctx.trans("Save"))}</button></div></div></div></main>`);
    };
  }
});
const _sfc_setup$1e = _sfc_main$1e.setup;
_sfc_main$1e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Role/Create.vue");
  return _sfc_setup$1e ? _sfc_setup$1e(props, ctx) : void 0;
};
const __vite_glob_0_74 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1e
}, Symbol.toStringTag, { value: "Module" }));
const __default__$T = {
  layout: _sfc_main$2y
};
const _sfc_main$1d = /* @__PURE__ */ Object.assign(__default__$T, {
  __name: "Edit",
  __ssrInlineRender: true,
  props: ["segments", "buttons"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Head), { title: "Edit Admin Role" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Edit Admin Role"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`</main>`);
    };
  }
});
const _sfc_setup$1d = _sfc_main$1d.setup;
_sfc_main$1d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Role/Edit.vue");
  return _sfc_setup$1d ? _sfc_setup$1d(props, ctx) : void 0;
};
const __vite_glob_0_75 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1d
}, Symbol.toStringTag, { value: "Module" }));
const __default__$S = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$1c = /* @__PURE__ */ Object.assign(__default__$S, {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["segments", "buttons", "roles"],
  setup(__props) {
    sharedComposable();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: _ctx.trans("Admin Roles"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><div class="table-responsive rounded-primary"><table class="table"><thead><tr><th width="10%">${ssrInterpolate(_ctx.trans("Name"))}</th><th width="80%">${ssrInterpolate(_ctx.trans("Permissions"))}</th><th width="10%" class="text-right">${ssrInterpolate(_ctx.trans("Action"))}</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.roles, (role) => {
        _push(`<tr><td>${ssrInterpolate(role.name)}</td><td><!--[-->`);
        ssrRenderList(role.permissions, (perm) => {
          _push(`<span class="badge badge-primary mr-1 mb-2">${ssrInterpolate(perm.name)}</span>`);
        });
        _push(`<!--]--></td><td><div class="hover"><a href="javascript:void(0)" class="btn btn-danger">${ssrInterpolate(_ctx.trans("Delete"))}</a></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table>`);
      if (__props.roles.length == 0) {
        _push(`<div class="text-center mt-2">`);
        if (__props.roles.length == 0) {
          _push(ssrRenderComponent(_sfc_main$2u, {
            type: "info",
            text: _ctx.trans("Opps no records found")
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></main>`);
    };
  }
});
const _sfc_setup$1c = _sfc_main$1c.setup;
_sfc_main$1c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Role/Index.vue");
  return _sfc_setup$1c ? _sfc_setup$1c(props, ctx) : void 0;
};
const __vite_glob_0_76 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1c
}, Symbol.toStringTag, { value: "Module" }));
const __default__$R = {
  layout: _sfc_main$2y
};
const _sfc_main$1b = /* @__PURE__ */ Object.assign(__default__$R, {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["segments", "buttons", "posts"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Head), { title: "SEO Settings" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2F, null, null, _parent));
      _push(`<div class="space-y-6"><div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th class="w-3/12">${ssrInterpolate(unref(trans)("Page"))}</th><th colspan="1">${ssrInterpolate(unref(trans)("Meta Title"))}</th><th><p class="text-right">${ssrInterpolate(unref(trans)("Action"))}</p></th></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.posts, (seo) => {
        _push(`<tr><td>${ssrInterpolate(seo.key)}</td><td>${ssrInterpolate(seo.content.site_name)}</td><td class="flex justify-end">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("admin.seo.edit", seo.id),
          class: "btn btn-primary btn-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fas fa-edit"${_scopeId}></i>`);
            } else {
              return [
                createVNode("i", { class: "fas fa-edit" })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></main>`);
    };
  }
});
const _sfc_setup$1b = _sfc_main$1b.setup;
_sfc_main$1b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Seo/Index.vue");
  return _sfc_setup$1b ? _sfc_setup$1b(props, ctx) : void 0;
};
const __vite_glob_0_77 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1b
}, Symbol.toStringTag, { value: "Module" }));
const __default__$Q = {
  layout: _sfc_main$2y
};
const _sfc_main$1a = /* @__PURE__ */ Object.assign(__default__$Q, {
  __name: "Show",
  __ssrInlineRender: true,
  props: ["id", "seo"],
  setup(__props) {
    var _a2, _b2, _c, _d;
    const props = __props;
    const form = useForm({
      _method: "put",
      site_name: (_a2 = props.seo) == null ? void 0 : _a2.site_name,
      matatag: (_b2 = props.seo) == null ? void 0 : _b2.matatag,
      matadescription: (_c = props.seo) == null ? void 0 : _c.matadescription,
      twitter_site_title: (_d = props.seo) == null ? void 0 : _d.twitter_site_title,
      preview: null
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, null, null, _parent));
      _push(`<div class="space-y-6"><form enctype="multipart/form-data"><div class="grid grid-cols-12"><div class="lg:col-span-5"><strong>${ssrInterpolate(unref(trans)("Edit page seo settings"))}</strong><p>${ssrInterpolate(unref(trans)("Edit page seo and necessary information from here"))}</p></div><div class="lg:col-span-7"><div class="card"><div class="card-header"><h3 class="mb-0">${ssrInterpolate(unref(trans)("Edit Settings"))}</h3></div><div class="card-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Meta Title"))}</label><input type="text"${ssrRenderAttr("value", unref(form).site_name)} required="" class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Meta Description"))}</label><textarea required="" class="summernote input h-200">${ssrInterpolate(unref(form).matadescription)}</textarea></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Meta Tags"))}</label><input type="text"${ssrRenderAttr("value", unref(form).matatag)} required="" class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Twitter Site Title"))}</label><input type="text"${ssrRenderAttr("value", unref(form).twitter_site_title)} required="" class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Meta Image"))}</label><input type="file" accept="image/*" class="input"></div><div class="from-group row mt-3"><div class="col-lg-12">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        processing: unref(form).processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></div></div></div></div></form></div></main>`);
    };
  }
});
const _sfc_setup$1a = _sfc_main$1a.setup;
_sfc_main$1a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Seo/Show.vue");
  return _sfc_setup$1a ? _sfc_setup$1a(props, ctx) : void 0;
};
const __vite_glob_0_78 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1a
}, Symbol.toStringTag, { value: "Module" }));
const __default__$P = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$19 = /* @__PURE__ */ Object.assign(__default__$P, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "segments",
    "buttons",
    "request",
    "supports",
    "pendingSupport",
    "openSupport",
    "closedSupport",
    "totalSupports",
    "type"
  ],
  setup(__props) {
    const props = __props;
    const supportStats = [
      { value: props.totalSupports, title: trans("Total Supports") },
      { value: props.pendingSupport, title: trans("Pending Supports") },
      { value: props.openSupport, title: trans("Open Supports") },
      { value: props.closedSupport, title: trans("Closed Supports") }
    ];
    function imitedString(text, maxLength) {
      if (text.length <= maxLength) {
        return text;
      } else {
        return text.substring(0, maxLength) + "...";
      }
    }
    const filterOptions = [
      {
        label: "User Email",
        value: "email"
      },
      {
        label: "Ticket No",
        value: "ticket_no"
      },
      {
        label: "Subject",
        value: "subject"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Supports",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, { items: supportStats }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2m, { options: filterOptions }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Ticket No"))}</th><th>${ssrInterpolate(unref(trans)("Subject"))}</th><th>${ssrInterpolate(unref(trans)("Conversations"))}</th><th>${ssrInterpolate(unref(trans)("Status"))}</th><th>${ssrInterpolate(unref(trans)("User"))}</th><th>${ssrInterpolate(unref(trans)("Created At"))}</th><th>${ssrInterpolate(unref(trans)("Ticket"))}</th></tr></thead>`);
      if (__props.supports.total) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.supports.data, (support) => {
          var _a2;
          _push(`<tr><td class="text-center">${ssrInterpolate(support.ticket_no)}</td><td><a class="text-dark"${ssrRenderAttr("href", "/admin/support/" + support.id)}>${ssrInterpolate(imitedString(support.subject, 50))}</a></td><td class="text-center">${ssrInterpolate(support.conversations_count)}</td><td><span class="${ssrRenderClass(
            support.status == 2 ? "badge badge-warning" : support.status == 1 ? "badge badge-success" : "badge badge-danger"
          )}">${ssrInterpolate(unref(trans)(support.status == 2 ? "pending" : support.status == 1 ? "Open" : "Closed"))}</span></td><td class="text-center"><a${ssrRenderAttr("href", "/admin/customer/" + support.user_id)} class="text-dark">${ssrInterpolate(((_a2 = support.user) == null ? void 0 : _a2.name) ?? "")}</a></td><td class="text-center">${ssrInterpolate(unref(moment)(support.created_at).format("d MMM y"))}</td><td>`);
          _push(ssrRenderComponent(unref(Link), {
            href: "/admin/support/" + support.id,
            class: "btn btn-primary btn-sm"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(trans)("View Ticket"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(trans)("View Ticket")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table>`);
      if (__props.supports.data.length != 0) {
        _push(ssrRenderComponent(_sfc_main$2n, {
          links: __props.supports.links
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></main>`);
    };
  }
});
const _sfc_setup$19 = _sfc_main$19.setup;
_sfc_main$19.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Support/Index.vue");
  return _sfc_setup$19 ? _sfc_setup$19(props, ctx) : void 0;
};
const __vite_glob_0_79 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$19
}, Symbol.toStringTag, { value: "Module" }));
const __default__$O = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$18 = /* @__PURE__ */ Object.assign(__default__$O, {
  __name: "Show",
  __ssrInlineRender: true,
  props: ["segments", "buttons", "support"],
  setup(__props) {
    const props = __props;
    const form = ref({
      message: "",
      status: props.support.status
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c, _d;
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:pr-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Support",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6 h-fit"><div class="h-full"><div class="relative mx-auto bg-white shadow rounded-primary dark:bg-slate-800 2xl:w-8/12"><div class="flex items-center justify-between p-4 border-b rounded-t-primary border-b-slate-200 dark:border-b-slate-600"><div class="flex items-center justify-start gap-x-3"><button id="chat-btn-show-sidebar" class="text-slate-500 hover:text-slate-700 focus:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:text-slate-300 xl:hidden"><i width="20" height="20" data-feather="menu"></i></button><div class="avatar avatar-circle avatar-indicator avatar-indicator-online"><img${ssrRenderAttrs(mergeProps({
        class: "avatar-img",
        alt: "profile-img"
      }, ssrGetDirectiveProps(
        _ctx,
        _directive_lazy,
        ((_a2 = __props.support.user) == null ? void 0 : _a2.avatar) ? (_b2 = __props.support.user) == null ? void 0 : _b2.avatar : `https://ui-avatars.com/api/?name=${(_c = __props.support.user) == null ? void 0 : _c.name}`
      )))}></div><div><h6 class="text-sm font-medium whitespace-nowrap text-slate-700 dark:text-slate-100">${ssrInterpolate((_d = __props.support.user) == null ? void 0 : _d.name)}</h6><p class="text-sm font-normal whitespace-normal text-slate-500 dark:text-slate-400">${ssrInterpolate(_ctx.trans("Subject :"))} ${ssrInterpolate(__props.support.subject ?? "")}</p></div></div></div><div class="relative max-h-[calc(100vh-18rem)] overflow-auto px-4 pb-28 md:max-h-[calc(100vh-17rem)]" data-simplebar><ul class="space-y-3"><!--[-->`);
      ssrRenderList(__props.support.conversations, (reply) => {
        _push(`<li class="${ssrRenderClass([reply.is_admin != 0 ? "pr" : "", "mt-5 group"])}"><div class="flex gap-x-3 group-[.pr]:flex-row-reverse"><div class="avatar avatar-circle avatar-sm shrink-0"><img${ssrRenderAttrs(mergeProps({
          class: "avatar-img",
          onerror: "this.src = '/images/avatar1.png'",
          alt: "profile-img"
        }, ssrGetDirectiveProps(
          _ctx,
          _directive_lazy,
          reply.user.avatar ? reply.user.avatar : `https://ui-avatars.com/api/?name=${reply.user.name}`
        )))}></div><div class="flex max-w-sm flex-col items-start gap-y-2 group-[.pr]:items-end"><p class="rounded-primary rounded-tl-none bg-slate-100 p-2 text-sm text-slate-600 group-[.pr]:rounded-tl-primary group-[.pr]:rounded-tr-none group-[.pr]:bg-primary-500 group-[.pr]:text-slate-100 dark:bg-slate-700 dark:text-slate-300">${ssrInterpolate(reply.comment)}</p><span class="text-xs font-normal text-slate-400">${ssrInterpolate(unref(moment)(reply.created_at).format("D MMM, YYYY"))}</span></div></div></li>`);
      });
      _push(`<!--]--></ul><div id="chat-scroll-view"></div></div><div class="absolute bottom-[-0.5px] left-0 right-0 z-10 rounded-b-primary bg-white py-4 dark:bg-slate-800"><form class="mx-4 flex h-[4.5rem] items-center rounded-primary border border-slate-200 shadow dark:border-slate-600"><input${ssrRenderAttr("value", form.value.message)} class="w-full h-full px-4 text-sm bg-transparent border-transparent text-slate-700 placeholder:text-slate-500 focus:border-transparent focus:ring-0 dark:text-slate-300 dark:placeholder:text-slate-400" type="text" placeholder="Type your message here"><div class="flex items-center justify-end px-4 gap-x-4"><select class="select w-[120px]" name="status"><option value="1">${ssrInterpolate(_ctx.trans("Open"))}</option><option value="2">${ssrInterpolate(_ctx.trans("Pending"))}</option><option value="0">${ssrInterpolate(_ctx.trans("Closed"))}</option></select><button type="submit"${ssrIncludeBooleanAttr(form.value.processing) ? " disabled" : ""} class="btn btn-sm btn-primary"><i width="18" height="18" data-feather="send"></i><span class="hidden md:inline-block">${ssrInterpolate(_ctx.trans("Send"))}</span></button></div></form></div></div><div id="chat-overlay" class="absolute inset-0 z-10 hidden w-full h-full transition-colors duration-300 ease-in-out bg-black bg-opacity-0 xl:hidden"></div></div></div></main>`);
    };
  }
});
const _sfc_setup$18 = _sfc_main$18.setup;
_sfc_main$18.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Support/Show.vue");
  return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
const __vite_glob_0_80 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$18
}, Symbol.toStringTag, { value: "Module" }));
const __default__$N = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$17 = /* @__PURE__ */ Object.assign(__default__$N, {
  __name: "Create",
  __ssrInlineRender: true,
  props: ["buttons", "segments"],
  setup(__props) {
    const form = useForm({
      member_name: "",
      member_position: "",
      profile_picture: "",
      about: "",
      status: false,
      socials: {
        facebook: null,
        twitter: null,
        linkedin: null,
        instagram: null
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Create Team Member",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><form method="post" enctype="multipart/form-data"><div class="grid grid-cols-12"><div class="col-span-5"><strong>${ssrInterpolate(unref(trans)("Create a team member"))}</strong><p>${ssrInterpolate(unref(trans)("Add your team member details and necessary information from here"))}</p></div><div class="card-wrapper col-span-7"><div class="card"><div class="card-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Member Name"))}</label><input${ssrRenderAttr("value", unref(form).member_name)} type="text" name="member_name" required class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Member Position"))}</label><input${ssrRenderAttr("value", unref(form).member_position)} type="text" name="member_position" required class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Profile Picture"))}</label><input type="file" accept="image/*" name="profile_picture" required class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Profile Description"))}</label><textarea class="input h-200" name="about" maxlength="1000" required>${ssrInterpolate(unref(form).about)}</textarea></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Facebook profile link"))}</label><input${ssrRenderAttr("value", unref(form).socials.facebook)} type="url" name="socials[facebook]" class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Twitter profile link"))}</label><input${ssrRenderAttr("value", unref(form).socials.twitter)} type="url" name="socials[twitter]" class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Linkedin profile link"))}</label><input${ssrRenderAttr("value", unref(form).socials.linkedin)} type="url" name="socials[linkedin]" class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Instagram profile link"))}</label><input${ssrRenderAttr("value", unref(form).socials.instagram)} type="url" name="socials[instagram]" class="input"></div><div class="mb-2"><label for="toggle-status" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, null) : unref(form).status) ? " checked" : ""} class="toggle-input peer sr-only" id="toggle-status" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(unref(trans)("Make it publish?"))}</span></label></div><div class="from-group row mt-3"><div class="col-lg-12">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        processing: unref(form).processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></div></div></div></div></form></div></main>`);
    };
  }
});
const _sfc_setup$17 = _sfc_main$17.setup;
_sfc_main$17.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Team/Create.vue");
  return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
const __vite_glob_0_81 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$17
}, Symbol.toStringTag, { value: "Module" }));
const __default__$M = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$16 = /* @__PURE__ */ Object.assign(__default__$M, {
  __name: "Edit",
  __ssrInlineRender: true,
  props: ["buttons", "segments", "info", "socials"],
  setup(__props) {
    const props = __props;
    onMounted(() => {
      props.info.status = props.info.status == 1 ? true : false;
    });
    const isProcessing = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Edit Team Member",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><form method="post" enctype="multipart/form-data"><div class="grid grid-cols-12"><div class="col-span-5"><strong>${ssrInterpolate(unref(trans)("Edit team member"))}</strong><p>${ssrInterpolate(unref(trans)("Edit your team member details and necessary information from here"))}</p></div><div class="col-span-7"><div class="card"><div class="card-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Member Name"))}</label><input type="text" name="member_name"${ssrRenderAttr("value", __props.info.title)} required class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Member Position"))}</label><input type="text" name="member_position"${ssrRenderAttr("value", __props.info.slug)} required class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Profile Picture"))}</label><input type="file" accept="image/*" name="profile_picture" class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Profile Description"))}</label><textarea class="textarea h-200" name="about" maxlength="1000" required>${ssrInterpolate(__props.info.description.value)}</textarea></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Facebook profile link"))}</label><input type="url" name="socials[facebook]"${ssrRenderAttr("value", __props.socials.facebook)} class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Twitter profile link"))}</label><input type="url" name="socials[twitter]"${ssrRenderAttr("value", __props.socials.twitter)} class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Linkedin profile link"))}</label><input type="url" name="socials[linkedin]"${ssrRenderAttr("value", __props.socials.linkedin)} class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Instagram profile link"))}</label><input type="url" name="socials[instagram]"${ssrRenderAttr("value", __props.socials.instagram)} class="input"></div><div class="mb-2"><label for="toggle-status" class="toggle toggle-sm"><input${ssrIncludeBooleanAttr(Array.isArray(__props.info.status) ? ssrLooseContain(__props.info.status, null) : __props.info.status) ? " checked" : ""} class="toggle-input peer sr-only" id="toggle-status" type="checkbox"><div class="toggle-body"></div><span class="label label-md">${ssrInterpolate(unref(trans)("Make it publish?"))}</span></label></div><div class="mt-2">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        "btn-text": unref(trans)("Save Changes"),
        processing: isProcessing.value
      }, null, _parent));
      _push(`</div></div></div></div></div></form></div></main>`);
    };
  }
});
const _sfc_setup$16 = _sfc_main$16.setup;
_sfc_main$16.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Team/Edit.vue");
  return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
const __vite_glob_0_82 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$16
}, Symbol.toStringTag, { value: "Module" }));
const __default__$L = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$15 = /* @__PURE__ */ Object.assign(__default__$L, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "posts",
    "buttons",
    "segments",
    "totalMembers",
    "totalActiveMembers",
    "totalInActiveMembers"
  ],
  setup(__props) {
    const props = __props;
    const { textExcerpt, deleteRow } = sharedComposable();
    const teamStats = [
      { value: props.totalMembers, title: trans("Total Members"), iconClass: "bx bx-box" },
      {
        value: props.totalActiveMembers,
        title: trans("Active Members"),
        iconClass: "bx bx-dollar-circle"
      },
      {
        value: props.totalInActiveMembers,
        title: trans("Expired Members"),
        iconClass: "ti ti-thumb-up"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Team",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: teamStats,
        grid: "3"
      }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Name"))}</th><th>${ssrInterpolate(unref(trans)("Position"))}</th><th class="text-right">${ssrInterpolate(unref(trans)("Status"))}</th><th class="flex justify-end">${ssrInterpolate(unref(trans)("Action"))}</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.posts.data, (post) => {
        _push(`<tr><td class="flex items-center gap-1"><img${ssrRenderAttrs(mergeProps({ class: "avatar rounded-square mr-3" }, ssrGetDirectiveProps(_ctx, _directive_lazy, post.preview.value)))}> ${ssrInterpolate(unref(textExcerpt)(post.title, 50))}</td><td class="text-left">${ssrInterpolate(unref(textExcerpt)(post.slug, 50))}</td><td class="text-right"><span class="${ssrRenderClass([post.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(post.status == 1 ? unref(trans)("Active") : unref(trans)("Draft"))}</span></td><td><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("admin.team.edit", post.id),
          class: "dropdown-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="h-5 text-slate-400" data-feather="edit"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(unref(trans)("Edit"))}</span>`);
            } else {
              return [
                createVNode("i", {
                  class: "h-5 text-slate-400",
                  "data-feather": "edit"
                }),
                createVNode("span", null, toDisplayString(unref(trans)("Edit")), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li><li class="dropdown-list-item"><button type="button" class="dropdown-link"><i class="h-5 text-slate-400" data-feather="trash-2">${ssrInterpolate(unref(trans)("Remove"))}&gt;</i><span>${ssrInterpolate(unref(trans)("Delete"))}</span></button></li></ul></div></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table>`);
      if (__props.posts.data.length == 0) {
        _push(ssrRenderComponent(_sfc_main$2u, {
          type: "info",
          text: unref(trans)("Opps you have not created any plan....")
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.posts.links
      }, null, _parent));
      _push(`</div></main>`);
    };
  }
});
const _sfc_setup$15 = _sfc_main$15.setup;
_sfc_main$15.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Team/Index.vue");
  return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
const __vite_glob_0_83 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$15
}, Symbol.toStringTag, { value: "Module" }));
const __default__$K = defineComponent({ layout: _sfc_main$2y });
const _sfc_main$14 = /* @__PURE__ */ Object.assign(__default__$K, {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["posts", "buttons", "segments"],
  setup(__props) {
    const { textExcerpt, deleteRow } = sharedComposable();
    onMounted(() => {
      drawer.init();
    });
    const form = useForm({
      reviewer_name: "",
      reviewer_position: "",
      reviewer_avatar: "",
      star: 0,
      comment: ""
    });
    const editTestimonialForm = ref({});
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2;
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[--><main class="container flex-grow p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Testimonial",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Reviewer Name"))}</th><th>${ssrInterpolate(unref(trans)("Reviewer Position"))}</th><th>${ssrInterpolate(unref(trans)("Comment"))}</th><th class="text-right">${ssrInterpolate(unref(trans)("Ratings"))}</th><th class="!text-right">${ssrInterpolate(unref(trans)("Action"))}</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.posts.data, (post) => {
        _push(`<tr><td class="flex"><img${ssrRenderAttrs(mergeProps({ class: "avatar rounded-square mr-3" }, ssrGetDirectiveProps(_ctx, _directive_lazy, post.preview.value)))}><span>${ssrInterpolate(unref(textExcerpt)(post.title, 30))}</span></td><td class="text-left">${ssrInterpolate(unref(textExcerpt)(post.slug, 30))}</td><td class="text-left">${ssrInterpolate(unref(textExcerpt)(post.excerpt.value ?? "", 50))}</td><td class="text-right">${ssrInterpolate(post.lang)} ${ssrInterpolate(unref(trans)("Star"))}</td><td><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item"><button class="dropdown-link"><i class="h-5 text-slate-400" data-feather="edit"></i><span>${ssrInterpolate(unref(trans)("Edit"))}</span></button></li><li class="dropdown-list-item"><button class="dropdown-link"><i class="h-5 text-slate-400" data-feather="trash-2">${ssrInterpolate(unref(trans)("Remove"))}&gt;</i><span>${ssrInterpolate(unref(trans)("Delete"))}</span></button></li></ul></div></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.posts.links,
        currentPage: __props.posts.current_page,
        from: __props.posts.from,
        lastPage: __props.posts.last_page,
        lastPageUrl: __props.posts.last_page_url,
        nextpageurl: __props.posts.next_page_url,
        perPage: __props.posts.per_page,
        prevPageUrl: __props.posts.prev_page_url,
        to: __props.posts.to,
        total: __props.posts.total
      }, null, _parent));
      _push(`</div></main><div id="addNewTestimonialDrawer" class="drawer drawer-right"><form><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Add New Testimonial"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Reviewer Name"))}</label><input${ssrRenderAttr("value", unref(form).reviewer_name)} type="text" name="reviewer_name" maxlength="150" class="input" required></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Reviewer Position"))}</label><input${ssrRenderAttr("value", unref(form).reviewer_position)} type="text" name="reviewer_position" class="input" required placeholder="CEO of Google" maxlength="50"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Reviewer Avatar"))}</label><input type="file" name="reviewer_avatar" accept="image/*" class="input" required=""></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Review Star"))}</label><select class="select" name="star"><option value="5">${ssrInterpolate(unref(trans)("5 Star"))}</option><option value="4">${ssrInterpolate(unref(trans)("4 Star"))}</option><option value="3">${ssrInterpolate(unref(trans)("3 Star"))}</option><option value="2">${ssrInterpolate(unref(trans)("2 Star"))}</option><option value="1">${ssrInterpolate(unref(trans)("1 Star"))}</option></select></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Comment"))}</label><textarea class="textarea h-100" maxlength="500" name="comment" required>${ssrInterpolate(unref(form).comment)}</textarea></div></div><div class="drawer-footer"><div class="flex justify-end gap-2"><button type="button" class="btn btn-secondary" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: unref(form).processing,
        "btn-text": unref(trans)("Create")
      }, null, _parent));
      _push(`</div></div></form></div><div id="editTestimonialDrawer" class="drawer drawer-right"><form><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Edit Testimonial"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Reviewer Name"))}</label><input${ssrRenderAttr("value", editTestimonialForm.value.title)} type="text" name="reviewer_name" id="reviewer_name" maxlength="150" class="input" required></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Reviewer Position"))}</label><input${ssrRenderAttr("value", editTestimonialForm.value.slug)} type="text" name="reviewer_position" id="reviewer_position" class="input" required="" placeholder="CEO of Google" maxlength="50"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Reviewer Avatar"))}</label><input type="file" name="reviewer_avatar" accept="image/*" class="input"></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Review Star"))}</label><select class="select" name="star" id="star"><option value="5">${ssrInterpolate(unref(trans)("5 Star"))}</option><option value="4">${ssrInterpolate(unref(trans)("4 Star"))}</option><option value="3">${ssrInterpolate(unref(trans)("3 Star"))}</option><option value="2">${ssrInterpolate(unref(trans)("2 Star"))}</option><option value="1">${ssrInterpolate(unref(trans)("1 Star"))}</option></select></div><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Comment"))}</label><textarea class="textarea h-100" maxlength="500" name="comment" id="comment" required>${ssrInterpolate(((_b2 = (_a2 = editTestimonialForm.value) == null ? void 0 : _a2.excerpt) == null ? void 0 : _b2.value) ?? "")}</textarea></div></div><div class="drawer-footer"><div class="flex justify-end gap-2"><button type="button" class="btn btn-secondary" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "btn btn-primary",
        processing: editTestimonialForm.value.processing,
        "btn-text": unref(trans)("Save Changes")
      }, null, _parent));
      _push(`</div></div></form></div><!--]-->`);
    };
  }
});
const _sfc_setup$14 = _sfc_main$14.setup;
_sfc_main$14.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Testimonial/Index.vue");
  return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
const __vite_glob_0_84 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$14
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$13 = {
  __name: "Breadcrumbs",
  __ssrInlineRender: true,
  props: {
    PageName: {
      default: "default"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "breadcrumbs section-padding bg-[url('../images/all-img/bred.png')] bg-cover bg-center bg-no-repeat" }, _attrs))}><div class="container text-center"><h2>${ssrInterpolate(_ctx.trans(__props.PageName))}</h2><nav><ol class="flex items-center justify-center space-x-3"><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_Link, { href: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item">-</li><li class="text-primary">${ssrInterpolate(_ctx.trans(__props.PageName))}</li></ol></nav></div></div>`);
    };
  }
};
const _sfc_setup$13 = _sfc_main$13.setup;
_sfc_main$13.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Breadcrumbs.vue");
  return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
const NestedNavMenu_vue_vue_type_style_index_0_lang = "";
const _sfc_main$12 = {
  __name: "NestedNavMenu",
  __ssrInlineRender: true,
  props: {
    children: {
      type: [Array, Object]
    }
  },
  setup(__props) {
    const closeMobileMenu = (hasChild) => {
      if (!hasChild) {
        document.querySelector(".openmobile-menu").classList.remove("active-mobile-menu");
        document.querySelector(".rt-mobile-menu-overlay").classList.remove("active");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "sub-menu" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.children, (child) => {
        var _a2, _b2, _c;
        _push(`<li class="${ssrRenderClass({ "menu-item-has-children": ((_a2 = child.children) == null ? void 0 : _a2.length) > 0 })}">`);
        if (((_b2 = child.children) == null ? void 0 : _b2.length) > 0) {
          _push(`<a>${ssrInterpolate(child.text)}</a>`);
        } else if (child.target == "_top") {
          _push(`<a class="dropdown-item"${ssrRenderAttr("href", child.href ?? "#")}>${ssrInterpolate(child.text)}</a>`);
        } else {
          _push(ssrRenderComponent(_component_Link, {
            href: child.href ?? "#",
            target: child.target,
            onClick: ($event) => {
              var _a3;
              return closeMobileMenu(((_a3 = child.children) == null ? void 0 : _a3.length) > 0);
            }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(child.text)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(child.text), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        }
        if (((_c = child.children) == null ? void 0 : _c.length) > 0) {
          _push(ssrRenderComponent(_sfc_main$12, {
            children: child.children
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
};
const _sfc_setup$12 = _sfc_main$12.setup;
_sfc_main$12.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Default/Common/NestedNavMenu.vue");
  return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
const _sfc_main$11 = {
  __name: "NavMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const mainMenu = computed(() => {
      return usePage().props.menus.filter((item) => item.position === "main-menu") || [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      ssrRenderList(mainMenu.value, (items) => {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(JSON.parse(items.data), (item) => {
          var _a2, _b2, _c;
          _push(`<li class="${ssrRenderClass({ "menu-item-has-children": ((_a2 = item.children) == null ? void 0 : _a2.length) > 0 })}">`);
          if (((_b2 = item.children) == null ? void 0 : _b2.length) > 0) {
            _push(`<a href="#">${ssrInterpolate(item.text)}</a>`);
          } else if (item.href) {
            _push(ssrRenderComponent(_component_Link, {
              href: item.href,
              target: item.target,
              role: "button"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(item.text)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(item.text), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(ssrRenderComponent(_component_Link, { href: "#" }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(item.text)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(item.text), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          }
          if (((_c = item.children) == null ? void 0 : _c.length) > 0) {
            _push(ssrRenderComponent(_sfc_main$12, {
              children: item.children
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--><!--]-->`);
      });
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Default/Common/NavMenu.vue");
  return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
const _sfc_main$10 = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const { authUser, getQueryParams } = sharedComposable();
    const headerFooter = usePage().props.headerFooter;
    const socials = usePage().props.primaryData["socials"];
    const request = getQueryParams();
    const form = useForm({
      s: request.s || ""
    });
    onMounted(() => {
      document.querySelector(".menu-click").addEventListener("click", function(event) {
        document.querySelector(".openmobile-menu").classList.toggle("active-mobile-menu");
        document.querySelector(".rt-mobile-menu-overlay").classList.add("active");
        event.preventDefault();
      });
      document.querySelector(".rt-mobile-menu-close, .rt-mobile-menu-overlay").addEventListener("click", function(event) {
        document.querySelector(".openmobile-menu").classList.remove("active-mobile-menu");
        document.querySelector(".rt-mobile-menu-overlay").classList.remove("active");
        event.preventDefault();
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c, _d;
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[--><header class="site-header"><div class="bg-primary hidden py-3 text-white md:block"><div class="container"><div class="grid grid-cols-1 gap-5 lg:grid-cols-2"><ul class="flex justify-center divide-x divide-white divide-opacity-25 text-base lg:justify-start"><li class="mr-4">${ssrInterpolate((_b2 = (_a2 = unref(headerFooter)) == null ? void 0 : _a2.header) == null ? void 0 : _b2.top_text)}</li><li class="pl-4"><a href="mailto:info@cropconnect.ph">${ssrInterpolate((_d = (_c = unref(headerFooter)) == null ? void 0 : _c.header) == null ? void 0 : _d.top_text2)}</a></li></ul><ul class="flex items-center justify-center divide-x divide-white divide-opacity-25 text-base lg:justify-end"><li class="px-2">${ssrInterpolate(_ctx.trans("Follow Us On"))}:</li><!--[-->`);
      ssrRenderList(unref(socials), (social, key) => {
        _push(`<li>`);
        if (social) {
          _push(`<a${ssrRenderAttr("href", social)} target="_blank" class="px-2 text-lg"><iconify-icon${ssrRenderAttr("icon", `bxl:${key}`)}></iconify-icon></a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div></div><div class="main-header header-normal2 rt-sticky top-0 z-[999] w-full py-8"><div class="container"><div class="flex items-center justify-between">`);
      _push(ssrRenderComponent(_component_Link, {
        href: "/",
        class: "h-16 w-32 flex-none md:w-52"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttrs(mergeProps({
              class: "h-full w-full object-contain",
              alt: ""
            }, ssrGetDirectiveProps(_ctx, _directive_lazy, _ctx.$page.props.primaryData.deep_logo)))}${_scopeId}>`);
          } else {
            return [
              withDirectives(createVNode("img", {
                class: "h-full w-full object-contain",
                alt: ""
              }, null, 512), [
                [_directive_lazy, _ctx.$page.props.primaryData.deep_logo]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex-1 items-center"><div class="main-menu relative flex-1"><ul class="menu-active-classes">`);
      _push(ssrRenderComponent(_sfc_main$11, null, null, _parent));
      _push(`</ul><div class="hidden lg:block"><div class="border-gray modal-search h-[46px] rounded-md border"><input${ssrRenderAttr("value", unref(form).s)} type="text" class="block h-full w-full rounded-md border-none ring-0 focus:outline-none focus:ring-0" placeholder="Search.."></div></div></div><div class="flex flex-none space-x-[18px]"><div><button type="button" class="modal-trigger flex h-10 w-10 flex-col items-center justify-center rounded bg-white md:h-[56px] md:w-[56px]"><img src="/assets/images/svg/search.svg" alt=""></button></div><div class="block lg:hidden"><button type="button" class="menu-click flex h-10 w-10 flex-col items-center justify-center rounded bg-white text-3xl md:h-[56px] md:w-[56px]"><iconify-icon icon="cil:hamburger-menu" rotate="180deg"></iconify-icon></button></div><div class="hidden lg:block">`);
      if (unref(authUser)) {
        _push(`<a${ssrRenderAttr(
          "href",
          unref(authUser).role == "admin" ? _ctx.route("admin.dashboard") : _ctx.route("user.dashboard")
        )} class="btn bg-black px-8 py-[15px] text-white">${ssrInterpolate(_ctx.trans("Dashboard"))}</a>`);
      } else {
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("login"),
          class: "btn bg-black px-8 py-[15px] text-white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(authUser) ? _ctx.trans("Dashboard") : _ctx.trans("Login"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(authUser) ? _ctx.trans("Dashboard") : _ctx.trans("Login")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></div></div></div></div></div></header><div class="container"><div class="block lg:hidden"><div class="border-gray modal-search h-[46px] rounded-md border"><input type="text"${ssrRenderAttr("value", unref(form).s)} class="block h-full w-full rounded-md border-none ring-0 focus:outline-none focus:ring-0" placeholder="Search.."></div></div></div><div class="openmobile-menu shadow-box2 fixed top-0 z-[999] flex h-screen w-[320px] flex-col overflow-y-auto bg-white pb-6 pt-10 lg:hidden"><div class="flex flex-none justify-between px-6">`);
      _push(ssrRenderComponent(_component_Link, {
        href: "/",
        class: "brand-logo mr-10 max-w-[120px] flex-none"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttrs(mergeProps({ alt: "" }, ssrGetDirectiveProps(_ctx, _directive_lazy, _ctx.$page.props.primaryData.deep_logo)))}${_scopeId}>`);
          } else {
            return [
              withDirectives(createVNode("img", { alt: "" }, null, 512), [
                [_directive_lazy, _ctx.$page.props.primaryData.deep_logo]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="rt-mobile-menu-close cursor-pointer text-3xl text-black"><iconify-icon icon="fe:close"></iconify-icon></span></div><div class="mobile-menu mt-6 flex-1"><ul class="menu-active-classes">`);
      _push(ssrRenderComponent(_sfc_main$11, null, null, _parent));
      _push(`</ul></div><div class="flex-none pb-4"><div class="mb-2 text-center font-semibold text-black">${ssrInterpolate(_ctx.trans("Follow Us"))}</div><ul class="flex justify-center space-x-4"><!--[-->`);
      ssrRenderList(unref(socials), (social, key) => {
        _push(`<li>`);
        if (social) {
          _push(`<a${ssrRenderAttr("href", social)} target="_blank" class="px-2 text-lg"><iconify-icon${ssrRenderAttr("icon", `bxl:${key}`)}></iconify-icon></a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Default/Header.vue");
  return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
const _sfc_main$$ = {
  __name: "LanguageSwitch",
  __ssrInlineRender: true,
  setup(__props) {
    const isOpen = ref(false);
    const selectContainer = ref(null);
    const outsideClick = (event) => {
      if (isOpen.value && !selectContainer.value.contains(event.target)) {
        isOpen.value = false;
      }
    };
    onMounted(() => {
      document.addEventListener("click", outsideClick);
    });
    onUnmounted(() => {
      document.removeEventListener("click", outsideClick);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["border nice-select", { open: isOpen.value }]
      }, _attrs))}><div class="current me-2">${ssrInterpolate(_ctx.$page.props.languages[_ctx.$page.props.locale])}</div><ul class="list"><!--[-->`);
      ssrRenderList(_ctx.$page.props.languages, (language, key) => {
        _push(`<li class="${ssrRenderClass([{
          "selected focus": key === _ctx.$page.props.locale
        }, "option"])}">`);
        _push(ssrRenderComponent(_component_Link, {
          as: "button",
          href: _ctx.route("set-locale", key),
          method: "patch",
          class: "w-full dropdown-btn text-start"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.trans(language))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.trans(language)), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
};
const _sfc_setup$$ = _sfc_main$$.setup;
_sfc_main$$.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/LanguageSwitch.vue");
  return _sfc_setup$$ ? _sfc_setup$$(props, ctx) : void 0;
};
const footerComposable = () => {
  const footerCenter = computed(() => {
    return usePage().props.menus.find((item) => item.position.includes("footer-center")) || [];
  });
  const footerRight = computed(() => {
    return usePage().props.menus.find((item) => item.position.includes("footer-right")) || [];
  });
  const footerLeft = computed(() => {
    return usePage().props.menus.find((item) => item.position.includes("footer-left")) || [];
  });
  const year = computed(() => {
    return (/* @__PURE__ */ new Date()).getFullYear();
  });
  const socials = computed(() => {
    return usePage().props.primaryData["socials"];
  });
  const email = ref("");
  const subscribe = () => {
    if (email.value) {
      router.post(
        route("newsletter.subscribe"),
        { email: email.value },
        {
          preserveScroll: true
        }
      );
    }
  };
  const NEWSLETTER_API = computed(() => "123");
  return {
    footerCenter,
    footerRight,
    footerLeft,
    year,
    socials,
    email,
    subscribe,
    NEWSLETTER_API
  };
};
const _sfc_main$_ = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const headerFooter = usePage().props.headerFooter;
    const { footerRight, footerLeft, year, socials, NEWSLETTER_API } = footerComposable();
    const subscribeForm = useForm({
      email: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-black bg-[url('../images/all-img/footer-bg-1.png')] bg-cover bg-center bg-no-repeat" }, _attrs))}><div class="section-padding container"><div class="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"><div class="single-footer"><div class="lg:max-w-[270px]">`);
      _push(ssrRenderComponent(_component_Link, {
        href: "/",
        class: "mb-10 block max-w-[150px]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a3, _b3, _c2, _d2;
          if (_push2) {
            _push2(`<img${ssrRenderAttrs(mergeProps({ alt: "" }, ssrGetDirectiveProps(_ctx, _directive_lazy, (_b3 = (_a3 = _ctx.$page.props) == null ? void 0 : _a3.primaryData) == null ? void 0 : _b3.logo)))}${_scopeId}>`);
          } else {
            return [
              withDirectives(createVNode("img", { alt: "" }, null, 512), [
                [_directive_lazy, (_d2 = (_c2 = _ctx.$page.props) == null ? void 0 : _c2.primaryData) == null ? void 0 : _d2.logo]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p>${ssrInterpolate((_b2 = (_a2 = unref(headerFooter)) == null ? void 0 : _a2.footer) == null ? void 0 : _b2.description)}</p><ul class="flex space-x-4 pt-8"><!--[-->`);
      ssrRenderList(unref(socials), (social, key) => {
        _push(`<li>`);
        if (social) {
          _push(`<a${ssrRenderAttr("href", social)} target="_blank" class="hover:bg-primary flex h-12 w-12 flex-col items-center justify-center rounded bg-white bg-opacity-[0.08] text-2xl text-white transition hover:text-white"><iconify-icon${ssrRenderAttr("icon", `bxl:${key}`)}></iconify-icon></a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div><div class="single-footer"><div class="flex space-x-[80px]"><div class="flex-1 lg:flex-none"><h4 class="mb-8 text-2xl font-bold text-white">${ssrInterpolate(((_c = unref(footerLeft)) == null ? void 0 : _c.name) ? unref(footerLeft).name : _ctx.trans("Links"))}</h4>`);
      if (unref(footerLeft) && ((_d = unref(footerLeft)) == null ? void 0 : _d.data)) {
        _push(`<ul class="list-item space-y-5"><!--[-->`);
        ssrRenderList(JSON.parse((_e = unref(footerLeft)) == null ? void 0 : _e.data), (item) => {
          _push(`<li>`);
          if (item.href) {
            _push(ssrRenderComponent(_component_Link, {
              href: item.href,
              target: item.target
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(item.text)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(item.text), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex-1 lg:flex-none"><h4 class="mb-8 text-2xl font-bold text-white">${ssrInterpolate(((_f = unref(footerRight)) == null ? void 0 : _f.name) ? unref(footerRight).name : "Legal")}</h4>`);
      if (unref(footerRight) && ((_g = unref(footerRight)) == null ? void 0 : _g.data)) {
        _push(`<ul class="list-item space-y-5"><!--[-->`);
        ssrRenderList(JSON.parse((_h = unref(footerRight)) == null ? void 0 : _h.data), (item) => {
          _push(`<li>`);
          if (item.href) {
            _push(ssrRenderComponent(_component_Link, {
              href: item.href,
              target: item.target
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(item.text)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(item.text), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
      if (unref(NEWSLETTER_API) || ((_i = Object.entries(_ctx.$page.props.languages)) == null ? void 0 : _i.length) > 1) {
        _push(`<div class="single-footer col-span lg:col-span-1">`);
        if (unref(NEWSLETTER_API)) {
          _push(`<!--[--><h4 class="mb-8 text-2xl font-bold text-white">${ssrInterpolate(_ctx.trans("Newsletter"))}</h4><div class="mb-8">${ssrInterpolate(_ctx.trans("Subscribe for our newsletter"))}</div><form><div class="shadow-e1 mb-4 flex items-center rounded-md bg-white py-[10px] pl-6 pr-[10px]"><div class="flex-none"><span class=""><img src="assets/images/icon/mail.svg" alt=""></span></div><div class="flex-1"><input type="email"${ssrRenderAttr("value", unref(subscribeForm).email)}${ssrRenderAttr("placeholder", _ctx.trans("Enter your mail"))} class="border-none focus:ring-0" required></div></div><small class="text-red-600">${ssrInterpolate(unref(subscribeForm).errors.email)}</small><button type="submit" class="btn btn-primary block w-full text-center">${ssrInterpolate(_ctx.trans("Subscribe Now"))}</button></form><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (((_j = Object.entries(_ctx.$page.props.languages)) == null ? void 0 : _j.length) > 1) {
          _push(`<!--[--><h4 class="footer-title fs-6 mb-2 mt-2">${ssrInterpolate(_ctx.trans("Language"))}</h4>`);
          _push(ssrRenderComponent(_sfc_main$$, null, null, _parent));
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="container border-t border-white border-opacity-[0.1] py-8 text-center text-base">${(_k = _ctx.$page.props.primaryData) == null ? void 0 : _k.copyright_text}</div></footer>`);
    };
  }
};
const _sfc_setup$_ = _sfc_main$_.setup;
_sfc_main$_.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Default/Footer.vue");
  return _sfc_setup$_ ? _sfc_setup$_(props, ctx) : void 0;
};
const _sfc_main$Z = {
  __name: "Seo",
  __ssrInlineRender: true,
  setup(__props) {
    const meta = computed(() => {
      var _a2;
      const metaData = ((_a2 = usePage().props) == null ? void 0 : _a2.seoMeta) ?? {};
      return {
        site_name: (metaData == null ? void 0 : metaData.title) || (metaData == null ? void 0 : metaData.site_name) || "",
        current_url: (metaData == null ? void 0 : metaData.current_url) ?? window.location.href,
        tags: (metaData == null ? void 0 : metaData.tags) || "",
        description: (metaData == null ? void 0 : metaData.description) || "",
        preview: (metaData == null ? void 0 : metaData.preview) || ""
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Head), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(meta.value.site_name)}</title><meta name="description" itemprop="description"${ssrRenderAttr("content", meta.value.description)}${_scopeId}><meta name="keywords"${ssrRenderAttr("content", meta.value.tags)}${_scopeId}><meta property="og:description"${ssrRenderAttr("content", meta.value.description)}${_scopeId}><meta property="og:title"${ssrRenderAttr("content", meta.value.site_name)}${_scopeId}><meta property="og:url"${ssrRenderAttr("content", meta.value.current_url)}${_scopeId}><meta property="og:site_name"${ssrRenderAttr("content", meta.value.site_name)}${_scopeId}><meta property="og:image"${ssrRenderAttr("content", meta.value.preview)}${_scopeId}><meta property="og:image:url"${ssrRenderAttr("content", meta.value.preview)}${_scopeId}><meta name="twitter:card"${ssrRenderAttr("content", meta.value.description)}${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", meta.value.site_name)}${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(meta.value.site_name), 1),
              createVNode("meta", {
                name: "description",
                itemprop: "description",
                content: meta.value.description
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "keywords",
                content: meta.value.tags
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: meta.value.description
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:title",
                content: meta.value.site_name
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:url",
                content: meta.value.current_url
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:site_name",
                content: meta.value.site_name
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:image",
                content: meta.value.preview
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:image:url",
                content: meta.value.preview
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:card",
                content: meta.value.description
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:title",
                content: meta.value.site_name
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$Z = _sfc_main$Z.setup;
_sfc_main$Z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Seo.vue");
  return _sfc_setup$Z ? _sfc_setup$Z(props, ctx) : void 0;
};
const Default_vue_vue_type_style_index_0_lang = "";
const _sfc_main$Y = {
  __name: "Default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$Z, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$10, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2D, null, null, _parent));
      _push(ssrRenderComponent(ValidationErrors, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<div class="rt-mobile-menu-overlay lg:hidden"></div>`);
      _push(ssrRenderComponent(_sfc_main$_, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$Y = _sfc_main$Y.setup;
_sfc_main$Y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Default.vue");
  return _sfc_setup$Y ? _sfc_setup$Y(props, ctx) : void 0;
};
const __default__$J = defineComponent({ layout: _sfc_main$Y });
const _sfc_main$X = /* @__PURE__ */ Object.assign(__default__$J, {
  __name: "ConfirmPassword",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      password: ""
    });
    onMounted(() => window.scrollTo(0, 300));
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Confirm Password" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$13, { PageName: "Confirm Password" }, null, _parent));
      _push(`<div class="container my-20"><div class="grid grid-cols-12 gap-[30px]"><div class="col-span-12 lg:col-span-6 xl:col-span-5"><div class="mini-title">${ssrInterpolate(_ctx.trans("Confirm Password"))}</div><h4 class="column-title">${ssrInterpolate(_ctx.trans("Confirm"))} <span class="shape-bg">${ssrInterpolate(_ctx.trans("Password"))}</span></h4><div>${ssrInterpolate(_ctx.trans(
        "This is a secure area of the application. Please confirm your password before continuing."
      ))}</div><ul class="list-item space-y-6 pt-8"><li class="flex"><div class="mr-6 flex-none"><div class=""><img src="/assets/images/svg/mail.svg" alt="" class=""></div></div><div class="flex-1"><h4 class="mb-1 text-lg lg:text-xl">${ssrInterpolate(_ctx.trans("Email-Us"))} :</h4><div>${ssrInterpolate((_a2 = _ctx.$page.props.primaryData) == null ? void 0 : _a2.contact_email)}</div></div></li><li class="flex"><div class="mr-6 flex-none"><div class=""><img src="/assets/images/svg/call.svg" alt="" class=""></div></div><div class="flex-1"><h4 class="mb-1 text-lg lg:text-xl">${ssrInterpolate(_ctx.trans("Call Us"))}:</h4><div>${ssrInterpolate((_b2 = _ctx.$page.props.primaryData) == null ? void 0 : _b2.contact_phone)}</div></div></li><li class="flex"><div class="mr-6 flex-none"><div class=""><img src="/assets/images/svg/map.svg" alt="" class=""></div></div><div class="flex-1"><h4 class="mb-1 text-lg lg:text-xl">${ssrInterpolate(_ctx.trans("Office"))} :</h4><div>${ssrInterpolate((_c = _ctx.$page.props.primaryData) == null ? void 0 : _c.address)}</div></div></li></ul></div><div class="col-span-12 lg:col-span-6 xl:col-span-7"><form class="shadow-box7 mt-10 space-y-4 rounded-md border border-gray-100 bg-white p-8"><div><label>${ssrInterpolate(_ctx.trans("Password"))} *</label><input type="password" required${ssrRenderAttr("value", unref(form).password)} class="from-control" placeholder="Enter Password">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.password
      }, null, _parent));
      _push(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn btn-primary mt-8 w-full">${ssrInterpolate(_ctx.trans("Confirm"))}</button></form></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$X = _sfc_main$X.setup;
_sfc_main$X.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ConfirmPassword.vue");
  return _sfc_setup$X ? _sfc_setup$X(props, ctx) : void 0;
};
const __vite_glob_0_85 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$X
}, Symbol.toStringTag, { value: "Module" }));
const __default__$I = defineComponent({ layout: _sfc_main$Y });
const _sfc_main$W = /* @__PURE__ */ Object.assign(__default__$I, {
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  props: {
    status: {
      type: String
    }
  },
  setup(__props) {
    onMounted(() => window.scrollTo(0, 300));
    const form = useForm({
      email: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Forgot Password" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$13, { PageName: "Forgot Password" }, null, _parent));
      _push(`<div class="container my-20"><div class="grid grid-cols-12 gap-[30px]"><div class="col-span-12 lg:col-span-6 xl:col-span-5"><div class="mini-title">${ssrInterpolate(_ctx.trans("Forgot Password"))}</div><h4 class="column-title">${ssrInterpolate(_ctx.trans("Forgot"))} <span class="shape-bg">${ssrInterpolate(_ctx.trans("Password"))}</span></h4><div>${ssrInterpolate(_ctx.trans(
        "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one."
      ))}</div><ul class="list-item space-y-6 pt-8"><li class="flex"><div class="mr-6 flex-none"><div class=""><img src="/assets/images/svg/mail.svg" alt="" class=""></div></div><div class="flex-1"><h4 class="mb-1 text-lg lg:text-xl">${ssrInterpolate(_ctx.trans("Email-Us"))} :</h4><div>${ssrInterpolate((_a2 = _ctx.$page.props.primaryData) == null ? void 0 : _a2.contact_email)}</div></div></li><li class="flex"><div class="mr-6 flex-none"><div class=""><img src="/assets/images/svg/call.svg" alt="" class=""></div></div><div class="flex-1"><h4 class="mb-1 text-lg lg:text-xl">${ssrInterpolate(_ctx.trans("Call Us"))}:</h4><div>${ssrInterpolate((_b2 = _ctx.$page.props.primaryData) == null ? void 0 : _b2.contact_phone)}</div></div></li><li class="flex"><div class="mr-6 flex-none"><div class=""><img src="/assets/images/svg/map.svg" alt="" class=""></div></div><div class="flex-1"><h4 class="mb-1 text-lg lg:text-xl">${ssrInterpolate(_ctx.trans("Office"))} :</h4><div>${ssrInterpolate((_c = _ctx.$page.props.primaryData) == null ? void 0 : _c.address)}</div></div></li></ul></div><div class="col-span-12 lg:col-span-6 xl:col-span-7"><form class="shadow-box7 mt-10 space-y-4 rounded-md border border-gray-100 bg-white p-8">`);
      if (__props.status) {
        _push(`<div class="mb-4 text-sm text-green-600">${ssrInterpolate(__props.status)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><label>${ssrInterpolate(_ctx.trans("Email"))} *</label><input type="email" required${ssrRenderAttr("value", unref(form).email)} class="from-control" placeholder="Enter your email here">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.email
      }, null, _parent));
      _push(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn btn-primary mt-8 w-full">${ssrInterpolate(_ctx.trans("Email Password Reset Link"))}</button></form></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$W = _sfc_main$W.setup;
_sfc_main$W.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ForgotPassword.vue");
  return _sfc_setup$W ? _sfc_setup$W(props, ctx) : void 0;
};
const __vite_glob_0_86 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$W
}, Symbol.toStringTag, { value: "Module" }));
const __default__$H = defineComponent({ layout: _sfc_main$Y });
const _sfc_main$V = /* @__PURE__ */ Object.assign(__default__$H, {
  __name: "Login",
  __ssrInlineRender: true,
  props: ["googleClient", "facebookClient"],
  setup(__props) {
    onMounted(() => window.scrollTo(0, 300));
    const form = useForm({
      email: "",
      password: "",
      remember: 0
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c;
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$13, { PageName: "Login" }, null, _parent));
      _push(`<div class="container my-20"><div class="grid grid-cols-12 gap-[30px]"><div class="col-span-12 lg:col-span-6 xl:col-span-5"><div class="mini-title">${ssrInterpolate(_ctx.trans("Login"))}</div><h4 class="column-title">${ssrInterpolate(_ctx.trans("Hello"))}, <span class="shape-bg">${ssrInterpolate(_ctx.trans("Welcome Back"))}</span></h4><div>${ssrInterpolate(_ctx.trans("Don't have an account yet?"))} `);
      _push(ssrRenderComponent(_component_Link, {
        class: "text-gray-950",
        href: "/register"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Sign up"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Sign up")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><ul class="list-item space-y-6 pt-8"><li class="flex"><div class="mr-6 flex-none"><div class=""><img src="/assets/images/svg/mail.svg" alt="" class=""></div></div><div class="flex-1"><h4 class="mb-1 text-lg lg:text-xl">${ssrInterpolate(_ctx.trans("Email-Us"))} :</h4><div>${ssrInterpolate((_a2 = _ctx.$page.props.primaryData) == null ? void 0 : _a2.contact_email)}</div></div></li><li class="flex"><div class="mr-6 flex-none"><div class=""><img src="/assets/images/svg/call.svg" alt="" class=""></div></div><div class="flex-1"><h4 class="mb-1 text-lg lg:text-xl">${ssrInterpolate(_ctx.trans("Call Us"))}:</h4><div>${ssrInterpolate((_b2 = _ctx.$page.props.primaryData) == null ? void 0 : _b2.contact_phone)}</div></div></li><li class="flex"><div class="mr-6 flex-none"><div class=""><img src="/assets/images/svg/map.svg" alt="" class=""></div></div><div class="flex-1"><h4 class="mb-1 text-lg lg:text-xl">${ssrInterpolate(_ctx.trans("Office"))} :</h4><div>${ssrInterpolate((_c = _ctx.$page.props.primaryData) == null ? void 0 : _c.address)}</div></div></li></ul></div><div class="col-span-12 lg:col-span-6 xl:col-span-7"><form class="shadow-box7 mt-10 w-full space-y-4 rounded-md border border-gray-100 bg-white p-8"><div><label>${ssrInterpolate(_ctx.trans("Email"))} *</label><input type="email" required${ssrRenderAttr("value", unref(form).email)} class="from-control" placeholder="Email">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.email
      }, null, _parent));
      _push(`</div><div><div class="flex items-center justify-between"><label>${ssrInterpolate(_ctx.trans("Password"))} *</label>`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("password.request"),
        class: "text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Forgot Password?"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Forgot Password?")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><input type="password" required${ssrRenderAttr("value", unref(form).password)} class="from-control" placeholder="Password">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.password
      }, null, _parent));
      _push(`</div><div class="flex items-center justify-between">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        processing: unref(form).processing,
        "btn-text": _ctx.trans("Login"),
        classes: "btn btn-primary flex gap-1"
      }, null, _parent));
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("register"),
        class: "text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Register an Account?"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Register an Account?")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-2 gap-1 pt-5">`);
      if (__props.googleClient) {
        _push(`<a href="/auth/google" class="flex items-center justify-center rounded-md border border-gray-100 p-2 shadow hover:bg-gray-100"><img${ssrRenderAttrs(mergeProps({ alt: "image" }, ssrGetDirectiveProps(_ctx, _directive_lazy, "/assets/images/icon/google.png")))}><span class="ps-2">${ssrInterpolate(_ctx.trans("Signup with Google"))}</span></a>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.facebookClient) {
        _push(`<a href="/auth/facebook" class="flex items-center justify-center rounded-md border border-gray-100 p-2 shadow hover:bg-gray-100"><img${ssrRenderAttrs(mergeProps({ alt: "image" }, ssrGetDirectiveProps(_ctx, _directive_lazy, "/assets/images/icon/facebook.png")))}><span class="ps-2">${ssrInterpolate(_ctx.trans("Signup with Facebook"))}</span></a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></form></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$V = _sfc_main$V.setup;
_sfc_main$V.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup$V ? _sfc_setup$V(props, ctx) : void 0;
};
const __vite_glob_0_87 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$V
}, Symbol.toStringTag, { value: "Module" }));
const __default__$G = defineComponent({ layout: _sfc_main$Y });
const _sfc_main$U = /* @__PURE__ */ Object.assign(__default__$G, {
  __name: "Register",
  __ssrInlineRender: true,
  props: ["googleClient", "facebookClient"],
  setup(__props) {
    onMounted(() => window.scrollTo(0, 300));
    const form = useForm({
      plan_id: null,
      role: "user",
      name: "",
      email: "",
      password: "",
      terms: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c;
      const _component_Seo = resolveComponent("Seo");
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Seo, { metaData: _ctx.seo }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$13, { PageName: "Register" }, null, _parent));
      _push(`<div class="container my-20"><div class="grid grid-cols-12 gap-[30px]"><div class="col-span-12 lg:col-span-6 xl:col-span-5"><div class="mini-title">${ssrInterpolate(_ctx.trans("Register"))}</div><h4 class="column-title">${ssrInterpolate(_ctx.trans("Register"))} <span class="shape-bg">${ssrInterpolate(_ctx.trans("Now"))}</span></h4><div>${ssrInterpolate(_ctx.trans("Already have an account?"))} `);
      _push(ssrRenderComponent(_component_Link, {
        class: "text-gray-950",
        href: "/login"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Sign In"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Sign In")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><ul class="pt-8 space-y-6 list-item"><li class="flex"><div class="flex-none mr-6"><div class=""><img src="/assets/images/svg/mail.svg" alt="" class=""></div></div><div class="flex-1"><h4 class="mb-1 text-lg lg:text-xl">${ssrInterpolate(_ctx.trans("Email-Us"))} :</h4><div>${ssrInterpolate((_a2 = _ctx.$page.props.primaryData) == null ? void 0 : _a2.contact_email)}</div></div></li><li class="flex"><div class="flex-none mr-6"><div class=""><img src="/assets/images/svg/call.svg" alt="" class=""></div></div><div class="flex-1"><h4 class="mb-1 text-lg lg:text-xl">${ssrInterpolate(_ctx.trans("Call Us"))}:</h4><div>${ssrInterpolate((_b2 = _ctx.$page.props.primaryData) == null ? void 0 : _b2.contact_phone)}</div></div></li><li class="flex"><div class="flex-none mr-6"><div class=""><img src="/assets/images/svg/map.svg" alt="" class=""></div></div><div class="flex-1"><h4 class="mb-1 text-lg lg:text-xl">${ssrInterpolate(_ctx.trans("Office"))} :</h4><div>${ssrInterpolate((_c = _ctx.$page.props.primaryData) == null ? void 0 : _c.address)}</div></div></li></ul></div><div class="col-span-12 lg:col-span-6 xl:col-span-7"><form class="p-8 mt-10 space-y-4 bg-white border border-gray-100 rounded-md shadow-box7"><div><label>${ssrInterpolate(_ctx.trans("Full Name"))}</label><input type="text" required${ssrRenderAttr("value", unref(form).name)} class="from-control" placeholder="Name">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.name
      }, null, _parent));
      _push(`</div><div><label>${ssrInterpolate(_ctx.trans("Email"))} *</label><input type="email" required${ssrRenderAttr("value", unref(form).email)} class="from-control" placeholder="Email">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.email
      }, null, _parent));
      _push(`</div><div><div class="flex items-center justify-between"><label>${ssrInterpolate(_ctx.trans("Password"))} *</label>`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("password.request"),
        class: "text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Forgot Password?"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Forgot Password?")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><input type="password" required${ssrRenderAttr("value", unref(form).password)} class="from-control" placeholder="Password">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.password
      }, null, _parent));
      _push(`</div><div class="flex items-center justify-between">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        processing: unref(form).processing,
        "btn-text": _ctx.trans("Register"),
        classes: "btn btn-primary flex gap-1"
      }, null, _parent));
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("login"),
        class: "text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Already have Account?"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Already have Account?")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-2 gap-1 pt-5">`);
      if (__props.googleClient) {
        _push(`<a href="/auth/google" class="flex items-center justify-center p-2 border border-gray-100 rounded-md shadow hover:bg-gray-100"><img${ssrRenderAttrs(mergeProps({ alt: "image" }, ssrGetDirectiveProps(_ctx, _directive_lazy, "/assets/images/icon/google.png")))}><span class="ps-2">${ssrInterpolate(_ctx.trans("Signup with Google"))}</span></a>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.facebookClient) {
        _push(`<a href="/auth/facebook" class="flex items-center justify-center p-2 border border-gray-100 rounded-md shadow hover:bg-gray-100"><img${ssrRenderAttrs(mergeProps({ alt: "image" }, ssrGetDirectiveProps(_ctx, _directive_lazy, "/assets/images/icon/facebook.png")))}><span class="ps-2">${ssrInterpolate(_ctx.trans("Signup with Facebook"))}</span></a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></form></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$U = _sfc_main$U.setup;
_sfc_main$U.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup$U ? _sfc_setup$U(props, ctx) : void 0;
};
const __vite_glob_0_88 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$U
}, Symbol.toStringTag, { value: "Module" }));
const __default__$F = defineComponent({ layout: _sfc_main$Y });
const _sfc_main$T = /* @__PURE__ */ Object.assign(__default__$F, {
  __name: "ResetPassword",
  __ssrInlineRender: true,
  props: {
    email: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      token: props.token,
      email: props.email,
      password: "",
      password_confirmation: ""
    });
    onMounted(() => window.scrollTo(0, 300));
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Reset Password" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$13, { PageName: "Reset Password" }, null, _parent));
      _push(`<div class="container my-20"><div class="grid grid-cols-12 gap-[30px]"><div class="col-span-12 lg:col-span-6 xl:col-span-5"><div class="mini-title">${ssrInterpolate(_ctx.trans("Reset Password"))}</div><h4 class="column-title">${ssrInterpolate(_ctx.trans("Reset"))} <span class="shape-bg">${ssrInterpolate(_ctx.trans("Password"))}</span></h4><div>${ssrInterpolate(_ctx.trans("Reset your Password."))}</div><ul class="list-item space-y-6 pt-8"><li class="flex"><div class="mr-6 flex-none"><div class=""><img src="/assets/images/svg/mail.svg" alt="" class=""></div></div><div class="flex-1"><h4 class="mb-1 text-lg lg:text-xl">${ssrInterpolate(_ctx.trans("Email-Us"))} :</h4><div>${ssrInterpolate((_a2 = _ctx.$page.props.primaryData) == null ? void 0 : _a2.contact_email)}</div></div></li><li class="flex"><div class="mr-6 flex-none"><div class=""><img src="/assets/images/svg/call.svg" alt="" class=""></div></div><div class="flex-1"><h4 class="mb-1 text-lg lg:text-xl">${ssrInterpolate(_ctx.trans("Call Us"))}:</h4><div>${ssrInterpolate((_b2 = _ctx.$page.props.primaryData) == null ? void 0 : _b2.contact_phone)}</div></div></li><li class="flex"><div class="mr-6 flex-none"><div class=""><img src="/assets/images/svg/map.svg" alt="" class=""></div></div><div class="flex-1"><h4 class="mb-1 text-lg lg:text-xl">${ssrInterpolate(_ctx.trans("Office"))} :</h4><div>${ssrInterpolate((_c = _ctx.$page.props.primaryData) == null ? void 0 : _c.address)}</div></div></li></ul></div><div class="col-span-12 lg:col-span-6 xl:col-span-7"><form class="shadow-box7 mt-10 space-y-4 rounded-md border border-gray-100 bg-white p-8"><div class="mb-6 text-center"><h4>${ssrInterpolate(_ctx.trans("Reset Password"))}</h4></div><div><label>${ssrInterpolate(_ctx.trans("Email"))} *</label><input readonly type="email" required${ssrRenderAttr("value", unref(form).email)} class="from-control" placeholder="Enter your email here">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.email
      }, null, _parent));
      _push(`</div><div><label>${ssrInterpolate(_ctx.trans("Password"))} *</label><input type="password" required${ssrRenderAttr("value", unref(form).password)} class="from-control" placeholder="Password" autocomplete="new-password">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.password
      }, null, _parent));
      _push(`</div><div><label>${ssrInterpolate(_ctx.trans("Confirm Password"))} *</label><input type="password" required${ssrRenderAttr("value", unref(form).password_confirmation)} class="from-control" placeholder="Confirm Password" autocomplete="new-password">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.password_confirmation
      }, null, _parent));
      _push(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn btn-primary mt-8 w-full">${ssrInterpolate(_ctx.trans("Reset Password"))}</button></form></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$T = _sfc_main$T.setup;
_sfc_main$T.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ResetPassword.vue");
  return _sfc_setup$T ? _sfc_setup$T(props, ctx) : void 0;
};
const __vite_glob_0_89 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$T
}, Symbol.toStringTag, { value: "Module" }));
const __default__$E = defineComponent({ layout: _sfc_main$Y });
const _sfc_main$S = /* @__PURE__ */ Object.assign(__default__$E, {
  __name: "VerifyEmail",
  __ssrInlineRender: true,
  props: {
    status: {
      type: String
    }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({});
    onMounted(() => window.scrollTo(0, 300));
    const verificationLinkSent = computed(() => props.status === "verification-link-sent");
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c;
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Email Verification" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$13, {
        PageName: "Email Verification",
        class: "mb-5"
      }, null, _parent));
      _push(`<div class="container mb-10"><div class="grid grid-cols-12 gap-[30px]"><div class="col-span-12 lg:col-span-6 xl:col-span-5"><div class="mini-title">${ssrInterpolate(_ctx.trans("Email verification"))}</div><h4 class="column-title">${ssrInterpolate(_ctx.trans("Email"))} <span class="shape-bg">${ssrInterpolate(_ctx.trans("verification"))}</span></h4><ul class="list-item space-y-6 pt-8"><li class="flex"><div class="mr-6 flex-none"><div class=""><img src="/assets/images/svg/mail.svg" alt="" class=""></div></div><div class="flex-1"><h4 class="mb-1 text-lg lg:text-xl">${ssrInterpolate(_ctx.trans("Email-Us"))} :</h4><div>${ssrInterpolate((_a2 = _ctx.$page.props.primaryData) == null ? void 0 : _a2.contact_email)}</div></div></li><li class="flex"><div class="mr-6 flex-none"><div class=""><img src="/assets/images/svg/call.svg" alt="" class=""></div></div><div class="flex-1"><h4 class="mb-1 text-lg lg:text-xl">${ssrInterpolate(_ctx.trans("Call Us"))}:</h4><div>${ssrInterpolate((_b2 = _ctx.$page.props.primaryData) == null ? void 0 : _b2.contact_phone)}</div></div></li><li class="flex"><div class="mr-6 flex-none"><div class=""><img src="/assets/images/svg/map.svg" alt="" class=""></div></div><div class="flex-1"><h4 class="mb-1 text-lg lg:text-xl">${ssrInterpolate(_ctx.trans("Office"))} :</h4><div>${ssrInterpolate((_c = _ctx.$page.props.primaryData) == null ? void 0 : _c.address)}</div></div></li></ul></div><div class="col-span-12 lg:col-span-6 xl:col-span-7"><form class="shadow-box7 mt-10 space-y-4 rounded-md border border-gray-100 bg-white p-8">`);
      if (verificationLinkSent.value) {
        _push(`<div class="mb-4 text-center text-green-600">${ssrInterpolate(_ctx.trans(`A new verification link has been sent to the email address you provided during
                registration.`))}</div>`);
      } else {
        _push(`<div class="mb-4 text-center text-green-700">${ssrInterpolate(_ctx.trans(`Thanks for signing up! Before getting started, could you verify your email address by clicking
                on the link we just emailed to you? If you didn't receive the email, we will gladly send you
                another.`))}</div>`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn btn-primary mt-8 flex w-full items-center justify-center text-center">`);
      if (unref(form).processing) {
        _push(`<img src="/assets/images/ajax_loading_white.svg" alt="">`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(_ctx.trans("Resend Verification Email"))}</button>`);
      _push(ssrRenderComponent(_component_Link, {
        class: "w-full rounded-md border p-3 text-red-600 hover:text-red-700",
        href: _ctx.route("logout"),
        method: "post",
        as: "button"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Logout"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Logout")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$S = _sfc_main$S.setup;
_sfc_main$S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/VerifyEmail.vue");
  return _sfc_setup$S ? _sfc_setup$S(props, ctx) : void 0;
};
const __vite_glob_0_90 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$S
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$R = /* @__PURE__ */ defineComponent({
  __name: "ImageInput",
  __ssrInlineRender: true,
  props: ["label", "modelValue"],
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const filePreviewUrl = ref("");
    onMounted(() => {
      if (typeof props.modelValue === "string") {
        filePreviewUrl.value = props.modelValue;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (__props.label.length) {
        _push(`<label class="label mb-1">${ssrInterpolate(__props.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center gap-x-2"><input type="file" accept="image/*" class="input">`);
      if (filePreviewUrl.value && typeof filePreviewUrl.value === "string") {
        _push(`<a${ssrRenderAttr("href", filePreviewUrl.value)} target="_blank"><img${ssrRenderAttrs(mergeProps({ class: "h-8" }, ssrGetDirectiveProps(_ctx, _directive_lazy, filePreviewUrl.value)))}></a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$R = _sfc_main$R.setup;
_sfc_main$R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ImageInput.vue");
  return _sfc_setup$R ? _sfc_setup$R(props, ctx) : void 0;
};
const menuType = {
  item: "item",
  heading: "heading",
  dropdown: "dropdown"
};
var navMenuItems = [
  {
    icon: "home",
    text: "Dashboard",
    uri: route("user.dashboard")
  },
  {
    icon: "folder-minus",
    text: "Deposits",
    uri: route("user.wallet-transactions.index")
  },
  {
    icon: "bar-chart",
    text: "Profit Return",
    uri: route("user.profit-return")
  },
  {
    type: menuType.dropdown,
    icon: "command",
    text: "Investments",
    subs: [
      {
        text: "Investment Plan",
        uri: route("user.projects.index")
      },
      {
        text: "Investments History",
        uri: route("user.investments.index")
      }
    ]
  },
  {
    icon: "phone-call",
    text: "Supports",
    uri: route("user.supports.index")
  },
  {
    icon: "dollar-sign",
    text: "Payouts",
    uri: route("user.payout.index")
  },
  {
    icon: "shopping-cart",
    text: "Event Bookings History",
    uri: route("user.event-orders.index")
  },
  {
    icon: "settings",
    text: "Account Settings",
    uri: route("user.account-settings")
  },
  {
    icon: "activity",
    text: "Affiliate Program",
    uri: route("user.affiliate.index")
  },
  {
    icon: "file",
    text: "KYC Verification",
    uri: route("user.kyc.index")
  }
];
const updateActiveMenu = (uri) => {
  navMenuItems = navMenuItems.map((item) => {
    var _a2;
    if (item.type != menuType.heading) {
      item.is_active = uri == item.uri;
      if ((_a2 = item.subs) == null ? void 0 : _a2.length) {
        item.subs = item.subs.map((sub) => {
          if (uri === sub.uri) {
            sub.is_active = true;
            item.is_active = true;
          } else {
            sub.is_active = false;
          }
          return sub;
        });
      }
    }
    return item;
  });
};
const _sfc_main$Q = {
  __name: "Sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const { authUser, logout } = sharedComposable();
    onMounted(() => {
      updateActiveMenu(window.location.href);
      window.addEventListener("load", () => {
        const wrapper = document.querySelector(".wrapper");
        const sidebar = document.querySelector(".sidebar");
        const sidebarToggle = document.querySelector(".sidebar-toggle");
        const content = document.querySelector(".sidebar-content");
        const menuItems = document.querySelectorAll(".sidebar-menu");
        const init = () => {
          initMenuItems();
          initSidebarToggle();
          initWrapper();
          initOverlay();
          handleWindowResize();
          initSidebarHover();
          initScrollBar();
        };
        const initMenuItems = () => {
          if (menuItems.length) {
            menuItems.forEach((menuItem) => {
              const parent = menuItem.parentElement;
              const submenu = parent.querySelector(".sidebar-submenu");
              const arrow = menuItem.querySelector(".sidebar-menu-arrow");
              if (submenu) {
                menuItem.addEventListener("click", (e) => {
                  e.preventDefault();
                  toggleHeight(submenu, submenu.scrollHeight);
                  arrow.classList.toggle("rotate");
                });
              }
              if (submenu && menuItem.classList.contains("active")) {
                toggleHeight(submenu, submenu.scrollHeight);
                arrow.classList.toggle("rotate");
              }
            });
          }
        };
        const toggleHeight = (element, height) => {
          if (element.style.height === "0px" || element.style.height === "") {
            element.style.height = `${height}px`;
          } else {
            element.style.height = "0px";
          }
        };
        const initSidebarToggle = () => {
          if (sidebarToggle) {
            sidebarToggle.addEventListener("click", () => toggleSidebar());
          }
        };
        const toggleSidebar = () => {
          const windowWidth = window.innerWidth;
          if (windowWidth < 1024) {
            sidebar.classList.toggle("expanded");
            document.querySelector(".sidebar-overlay").classList.toggle("active");
          } else {
            sidebar.classList.toggle("collapsed");
            wrapper.classList.toggle("expanded");
          }
        };
        const initWrapper = () => {
          if (sidebar) {
            if (sidebar.classList.contains("collapsed")) {
              wrapper.classList.add("expanded");
            } else {
              wrapper.classList.remove("expanded");
            }
          }
        };
        const initOverlay = () => {
          const overlay = document.createElement("div");
          overlay.classList.add("sidebar-overlay");
          document.body.appendChild(overlay);
          overlay.addEventListener("click", () => {
            sidebar.classList.remove("expanded");
            overlay.classList.remove("active");
          });
        };
        const handleWindowResize = () => {
          if (sidebar) {
            window.addEventListener("resize", () => {
              if (window.innerWidth < 1024) {
                sidebar.classList.remove("collapsed");
                wrapper.classList.remove("expanded");
              } else {
                sidebar.classList.remove("expanded");
              }
            });
          }
        };
        const initSidebarHover = () => {
          if (sidebar) {
            sidebar.addEventListener("mouseenter", () => {
              if (window.innerWidth > 1024) {
                sidebar.classList.add("hovered");
              }
            });
            sidebar.addEventListener("mouseleave", () => {
              if (window.innerWidth > 1024) {
                sidebar.classList.remove("hovered");
              }
            });
          }
        };
        const initScrollBar = () => {
          if (sidebar) {
            new SimpleBar(content);
            const activeMenu = document.querySelector(".sidebar-menu.active");
            const activeSubmenu = document.querySelector(".sidebar-submenu-item.active");
            if (activeSubmenu) {
              activeSubmenu.scrollIntoView({ block: "center", behavior: "smooth" });
            } else if (activeMenu) {
              activeMenu.scrollIntoView({ block: "center", behavior: "smooth" });
            }
          }
        };
        init();
      });
    });
    const page = usePage();
    const authUserPermissions = page.props.permissions ?? [];
    const canAccess = ({ permission }) => {
      let isSuperAdmin = authUser.role == "admin";
      return permission == void 0 || isSuperAdmin || authUserPermissions.includes(permission);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c, _d;
      const _directive_lazy = resolveDirective("lazy");
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "sidebar" }, _attrs))}><a href="/"><div class="sidebar-header flex pb-3 shadow"><div class="sidebar-logo-icon"><img${ssrRenderAttrs(mergeProps({
        alt: "logo",
        class: "block h-[30px] dark:hidden"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, (_b2 = (_a2 = _ctx.$page.props) == null ? void 0 : _a2.primaryData) == null ? void 0 : _b2.deep_logo)))}><img${ssrRenderAttrs(mergeProps({
        alt: "logo",
        class: "hidden h-[30px] dark:block"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, (_d = (_c = _ctx.$page.props) == null ? void 0 : _c.primaryData) == null ? void 0 : _d.logo)))}></div></div></a><ul class="sidebar-content"><!--[-->`);
      ssrRenderList(unref(navMenuItems), (menu2, parentMenuKey) => {
        _push(`<!--[-->`);
        if (canAccess(menu2)) {
          _push(`<!--[-->`);
          if (menu2.type == unref(menuType).heading) {
            _push(`<div class="sidebar-menu-header">${ssrInterpolate(unref(trans)(menu2.text))}</div>`);
          } else {
            _push(`<!---->`);
          }
          if ((menu2.type == unref(menuType).item || menu2.type == void 0) && !menu2.disable) {
            _push(`<li>`);
            _push(ssrRenderComponent(unref(Link), {
              onClick: ($event) => unref(updateActiveMenu)(menu2.uri),
              href: menu2.uri ?? "#",
              class: ["sidebar-menu", { active: menu2.is_active }]
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="sidebar-menu-icon"${_scopeId}><i${ssrRenderAttr("data-feather", menu2.icon ?? "home")}${_scopeId}></i></span><span class="sidebar-menu-text"${_scopeId}>${ssrInterpolate(unref(trans)(menu2.text))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "sidebar-menu-icon" }, [
                      createVNode("i", {
                        "data-feather": menu2.icon ?? "home"
                      }, null, 8, ["data-feather"])
                    ]),
                    createVNode("span", { class: "sidebar-menu-text" }, toDisplayString(unref(trans)(menu2.text)), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</li>`);
          } else {
            _push(`<!---->`);
          }
          if (menu2.type == unref(menuType).dropdown) {
            _push(`<li><a href="javascript:void(0);" class="${ssrRenderClass([{ active: menu2.is_active }, "sidebar-menu"])}"><span class="sidebar-menu-icon"><i${ssrRenderAttr("data-feather", menu2.icon ?? "home")}></i></span><span class="sidebar-menu-text">${ssrInterpolate(menu2.text ?? "")}</span><span class="sidebar-menu-arrow"><i data-feather="chevron-right"></i></span></a><ul class="sidebar-submenu"><!--[-->`);
            ssrRenderList(menu2.subs, (subItem) => {
              _push(`<!--[-->`);
              if (canAccess(subItem)) {
                _push(`<li>`);
                _push(ssrRenderComponent(unref(Link), {
                  onClick: ($event) => unref(updateActiveMenu)(subItem.uri ?? "/"),
                  href: subItem.uri,
                  class: ["sidebar-submenu-item", { active: subItem.is_active }]
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`${ssrInterpolate(unref(trans)(subItem.text))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(unref(trans)(subItem.text)), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
                _push(`</li>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<!--]-->`);
            });
            _push(`<!--]--></ul></li>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--><li><button type="button" class="sidebar-menu"><span class="sidebar-menu-icon"><i data-feather="log-out"></i></span><span class="sidebar-menu-text">${ssrInterpolate(unref(trans)("Logout"))}</span></button></li></ul></aside>`);
    };
  }
};
const _sfc_setup$Q = _sfc_main$Q.setup;
_sfc_main$Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/User/Sidebar.vue");
  return _sfc_setup$Q ? _sfc_setup$Q(props, ctx) : void 0;
};
const _sfc_main$P = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const { authUser, logout } = sharedComposable();
    onMounted(() => {
      themeSwitcher.init();
      modal2.value = createModal(document.getElementById("search-modal"));
    });
    const notifications = usePage().props.notifications ?? [];
    const unreadNotifications = computed(() => {
      return notifications.filter((item) => item.seen == 0).length ?? 0;
    });
    const modal2 = ref({});
    const search = ref("");
    const menuGroups = [
      {
        title: "General",
        pages: [
          {
            icon: "bx bx-home",
            text: "Dashboard",
            uri: route("user.dashboard")
          },
          {
            icon: "bx bx-folder-minus",
            text: "Deposits",
            uri: route("user.wallet-transactions.index")
          },
          {
            icon: "bx bx-bar-chart",
            text: "Profit Return",
            uri: route("user.profit-return")
          },
          {
            icon: "bx bx-bar-chart",
            text: "Investment Plan",
            uri: route("user.projects.index")
          },
          {
            icon: "bx bx-cart",
            text: "Investments History",
            uri: route("user.investments.index")
          },
          {
            icon: "bx bx-cart-alt",
            text: "Event Orders",
            uri: route("user.event-orders.index")
          },
          {
            icon: "bx bx-phone-call",
            text: "Supports",
            uri: route("user.supports.index")
          },
          {
            icon: "bx bx-dollar",
            text: "Payouts",
            uri: route("user.payout.index")
          },
          {
            icon: "bx bx-cog",
            text: "Account Settings",
            uri: route("user.account-settings")
          },
          {
            icon: "bx bx-user",
            text: "Affiliate Program",
            uri: route("user.affiliate.index")
          },
          {
            icon: "bx bx-file",
            text: "KYC Verification",
            uri: route("user.kyc.index")
          }
        ]
      }
    ];
    const filteredMenuItems = computed(() => {
      return menuGroups.map((item) => {
        return {
          ...item,
          // Search the pages array for pages that start with the search string
          pages: item.pages.filter((page) => {
            var _a2, _b2;
            return (_b2 = page.text) == null ? void 0 : _b2.toLowerCase().startsWith((_a2 = search.value) == null ? void 0 : _a2.toLowerCase());
          }).map((item2) => {
            item2.text = trans(item2.text);
            return item2;
          })
        };
      }).filter((item) => item.pages.length > 0);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c, _d, _e, _f;
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[--><header class="header"><div class="container-fluid flex items-center justify-between"><div class="flex items-center space-x-6"><button class="sidebar-toggle"><span class="flex space-x-4"><svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="22" width="22" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"></path></svg></span></button><div class="sm:hidden"><button type="button" class="flex items-center justify-center rounded-full text-slate-500 transition-colors duration-150 hover:text-primary-500 focus:text-primary-500 dark:text-slate-400 dark:hover:text-slate-300"><i width="22" height="22" data-feather="search"></i></button></div><button type="button" class="group hidden h-10 w-72 items-center overflow-hidden rounded-primary bg-slate-100 px-3 shadow-sm dark:border-transparent dark:bg-slate-700 sm:flex"><i class="text-slate-400" width="1em" height="1em" data-feather="search"></i><span class="ml-2 text-sm text-slate-400">Search</span></button></div><div class="flex items-center">`);
      if ((_b2 = (_a2 = _ctx.$page.props) == null ? void 0 : _a2.languages) == null ? void 0 : _b2.length) {
        _push(`<div class="dropdown" data-strategy="absolute"><div class="dropdown-toggle px-3"><button type="button" class="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-700 focus:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:text-slate-300"><span class="hidden font-medium md:inline-block">${ssrInterpolate((_d = _ctx.$page.props) == null ? void 0 : _d.languages[(_c = _ctx.$page.props) == null ? void 0 : _c.locale])}</span><span class="inline-block font-medium md:hidden">${ssrInterpolate((_f = (_e = _ctx.$page.props) == null ? void 0 : _e.locale) == null ? void 0 : _f.toUpperCase())}</span></button></div><div class="dropdown-content mt-3 w-40"><ul class="dropdown-list"><!--[-->`);
        ssrRenderList(_ctx.$page.props.languages, (language, key) => {
          _push(`<li class="dropdown-list-item">`);
          _push(ssrRenderComponent(_component_Link, {
            as: "button",
            href: _ctx.route("set-locale", key),
            method: "patch",
            class: "dropdown-btn"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class=""${_scopeId}>${ssrInterpolate(language)}</span>`);
              } else {
                return [
                  createVNode("span", { class: "" }, toDisplayString(language), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="dropdown" data-strategy="absolute" id="theme-switcher-dropdown"><button class="dropdown-toggle px-3 text-slate-500 hover:text-slate-700 focus:text-primary-500 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:text-primary-500" type="button"><i class="hidden dark:block" width="24" height="24" data-feather="moon">Dark</i><i class="block dark:hidden" width="24" height="24" data-feather="sun">Light</i></button><div class="dropdown-content mt-3 w-36"><ul class="dropdown-list"><li class="dropdown-list-item"><button type="buttton" class="dropdown-btn" data-theme-mode="light"><i width="16" height="16" data-feather="sun"></i><span>Light</span></button></li><li class="dropdown-list-item"><button type="buttton" class="dropdown-btn" data-theme-mode="dark"><i width="16" height="16" data-feather="moon"></i><span>Dark</span></button></li><li class="dropdown-list-item"><button type="buttton" class="dropdown-btn" data-theme-mode="system"><i width="16" height="16" data-feather="monitor"></i><span>System</span></button></li></ul></div></div><div class="dropdown -mt-0.5" data-strategy="absolute"><div class="dropdown-toggle px-3"><button class="relative mt-1 flex items-center justify-center rounded-full text-slate-500 transition-colors duration-150 hover:text-slate-700 focus:text-primary-500 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:text-primary-500"><i width="24" height="24" data-feather="bell"></i>`);
      if (unreadNotifications.value) {
        _push(`<span class="absolute -right-1 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger-500 text-[11px] text-slate-200">${ssrInterpolate(unreadNotifications.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div><div class="dropdown-content mt-3 w-[17.5rem] divide-y dark:divide-slate-700 sm:w-80"><div class="flex items-center justify-between px-4 py-4"><h6 class="text-slate-800 dark:text-slate-300">${ssrInterpolate(unref(trans)("Notifications"))}</h6>`);
      if (unref(notifications).length) {
        _push(`<button class="text-xs font-medium text-slate-600 hover:text-primary-500 dark:text-slate-300">${ssrInterpolate(unref(trans)("Clear All"))}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="h-80 w-full" data-simplebar><ul>`);
      if (unref(notifications).length) {
        _push(`<!--[-->`);
        ssrRenderList(unref(notifications), (item, index) => {
          _push(`<li class="flex cursor-pointer gap-4 px-4 py-3 transition-colors duration-150 hover:bg-slate-100/70 dark:hover:bg-slate-700"><div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-500"><i class="bx bx-user-voice" width="20" height="20"></i></div><a${ssrRenderAttr("href", item.url ?? "#")}><h6 class="text-sm font-normal">${ssrInterpolate(item.title)}</h6><p class="text-xs text-slate-400"${ssrRenderAttr("title", item.comment)}>${ssrInterpolate(item.comment_short)}</p><p class="mt-1 flex items-center gap-1 text-xs text-slate-400"><i data-feather="clock" width="1em" height="1em"></i><span>${ssrInterpolate(item.created_at_human_date)}</span></p></a></li>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<li class="mt-5 text-center">${ssrInterpolate(unref(trans)("no notifications"))}</li>`);
      }
      _push(`</ul></div>`);
      if (unref(notifications).length > 5) {
        _push(`<div class="px-4 py-2">`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("user.notifications"),
          class: "btn btn-primary-plain btn-sm w-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>${ssrInterpolate(unref(trans)("View More"))}</span><i data-feather="arrow-right" width="1rem" height="1rem"${_scopeId}></i>`);
            } else {
              return [
                createVNode("span", null, toDisplayString(unref(trans)("View More")), 1),
                createVNode("i", {
                  "data-feather": "arrow-right",
                  width: "1rem",
                  height: "1rem"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="dropdown" data-strategy="absolute"><div class="dropdown-toggle pl-3"><button class="group relative flex items-center gap-x-1.5" type="button"><div class="avatar avatar-circle avatar-indicator avatar-indicator-online"><img${ssrRenderAttrs(mergeProps({
        class: "avatar-img group-focus-within:ring group-focus-within:ring-primary-500",
        alt: unref(authUser).name
      }, ssrGetDirectiveProps(
        _ctx,
        _directive_lazy,
        unref(authUser).avatar == null ? `https://ui-avatars.com/api/?name=${unref(authUser).name}` : `${unref(authUser).avatar}`
      )))}></div></button></div><div class="dropdown-content mt-1 w-56 divide-y dark:divide-slate-600"><div class="px-4 py-3"><p class="text-sm"> Welcome <strong>${ssrInterpolate(unref(authUser).name)}</strong>! </p><p class="truncate text-sm font-medium">(${ssrInterpolate(unref(authUser).email)})</p></div><div class="py-1">`);
      _push(ssrRenderComponent(_component_Link, {
        href: "/user/account-settings",
        class: "dropdown-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i width="18" height="18" data-feather="user" class="text-slate-500"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(unref(trans)("Account Settings"))}</span>`);
          } else {
            return [
              createVNode("i", {
                width: "18",
                height: "18",
                "data-feather": "user",
                class: "text-slate-500"
              }),
              createVNode("span", null, toDisplayString(unref(trans)("Account Settings")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="py-1"><form method="POST" action="#"><button type="button" class="dropdown-btn"><i width="18" height="18" data-feather="log-out" class="text-slate-500"></i><span>${ssrInterpolate(unref(trans)("Logout"))}</span></button></form></div></div></div></div></div></header><div class="modal" id="search-modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header px-4 sm:px-6"><div class="group flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search text-slate-500 group-focus-within:text-slate-600 dark:text-slate-400 dark:group-focus-within:text-slate-300"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg><input type="text"${ssrRenderAttr("value", search.value)} class="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:ring-0 dark:text-slate-200" placeholder="Search"><button class="rounded-primary bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600" data-dismiss="modal"> ESC </button></div></div><div class="modal-body max-h-[600px] px-4 py-6 sm:px-6" data-simplebar="init"><div class="-mt-[12px] space-y-4"><!--[-->`);
      ssrRenderList(filteredMenuItems.value, (group, index) => {
        _push(`<div class=""><h6>${ssrInterpolate(group.title)}</h6><ul class="mt-2 space-y-2"><!--[-->`);
        ssrRenderList(group.pages, (page, index2) => {
          _push(`<li class="">`);
          _push(ssrRenderComponent(_component_Link, {
            onClick: ($event) => modal2.value.hide(),
            href: page.uri || "#",
            class: "flex items-center gap-2 rounded-primary bg-slate-50 px-4 py-2 text-sm shadow-sm hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="${ssrRenderClass([page.icon, "text-lg text-slate-500 dark:text-slate-400"])}"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(page.text)}</span><i class="ti ti-chevron-right ml-auto text-slate-500"${_scopeId}></i>`);
              } else {
                return [
                  createVNode("i", {
                    class: ["text-lg text-slate-500 dark:text-slate-400", page.icon]
                  }, null, 2),
                  createVNode("span", null, toDisplayString(page.text), 1),
                  createVNode("i", { class: "ti ti-chevron-right ml-auto text-slate-500" })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--></div></div></div></div><div class="modal-backdrop"></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$P = _sfc_main$P.setup;
_sfc_main$P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/User/Header.vue");
  return _sfc_setup$P ? _sfc_setup$P(props, ctx) : void 0;
};
const _sfc_main$O = {
  __name: "User",
  __ssrInlineRender: true,
  setup(__props) {
    onMounted(() => {
      dropdown.init();
      feather.replace();
      window.ResizeObserver = ResizeObserver;
    });
    onUpdated(() => {
      dropdown.init();
      feather.replace();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "app" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2z, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2D, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$Q, null, null, _parent));
      _push(`<div class="wrapper">`);
      _push(ssrRenderComponent(_sfc_main$P, null, null, _parent));
      _push(ssrRenderComponent(ValidationErrors, null, null, _parent));
      _push(`<div class="content">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$O = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/User.vue");
  return _sfc_setup$O ? _sfc_setup$O(props, ctx) : void 0;
};
const __default__$D = defineComponent({ layout: _sfc_main$O });
const _sfc_main$N = /* @__PURE__ */ Object.assign(__default__$D, {
  __name: "AccountSettings",
  __ssrInlineRender: true,
  props: ["user"],
  setup(__props) {
    const props = __props;
    const { authUser } = sharedComposable();
    const form = useForm({
      name: props.user.name,
      email: props.user.email,
      phone: props.user.phone,
      avatar: props.user.avatar,
      current_password: "",
      _method: "PUT"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: unref(trans)("Account Settings")
      }, null, _parent));
      _push(`<main class="container flex-grow p-4 sm:p-6"><div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, null, null, _parent));
      _push(`<div class="flex justify-center"><div class="card w-[600px] p-5"><h4 class="mb-4">${ssrInterpolate(unref(trans)("Edit Profile"))}</h4><form method="post"><div class="mb-4">`);
      _push(ssrRenderComponent(_sfc_main$R, {
        modelValue: unref(form).avatar,
        "onUpdate:modelValue": ($event) => unref(form).avatar = $event,
        label: "Profile Image"
      }, null, _parent));
      _push(`</div><div class="mb-4"><label>${ssrInterpolate(unref(trans)("Full Name"))}</label><input class="input" type="text"${ssrRenderAttr("value", unref(form).name)} placeholder="Zubayer">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.name
      }, null, _parent));
      _push(`</div>`);
      if (unref(authUser).provider_id == null) {
        _push(`<div class="mb-4"><label>${ssrInterpolate(unref(trans)("Email"))}</label><input class="input" type="email"${ssrRenderAttr("value", unref(form).email)} placeholder="zubayerhasan@gmal.com">`);
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors.email
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-4"><label>${ssrInterpolate(unref(trans)("Phone Number"))}</label><input class="input" type="tel"${ssrRenderAttr("value", unref(form).phone)} placeholder="+810 989 989 989">`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.phone
      }, null, _parent));
      _push(`</div>`);
      if (unref(authUser).provider_id === null) {
        _push(`<div class="mb-4"><label>${ssrInterpolate(unref(trans)("Current Password"))}</label><input class="input" type="password"${ssrRenderAttr("value", unref(form).current_password)} placeholder="enter your current password">`);
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(form).errors.current_password
        }, null, _parent));
        if (unref(authUser).provider_id === null) {
          _push(`<div class="info-text d-sm-flex align-items-center justify-content-between mt-5"><p class="">${ssrInterpolate(unref(trans)("Want to change the password?"))} `);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("user.change-password"),
            class: "font-medium text-blue-800"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(trans)("Click here"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(trans)("Click here")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit" class="btn btn-primary">${ssrInterpolate(unref(trans)("Update Information"))}</button></form></div></div></div></main><!--]-->`);
    };
  }
});
const _sfc_setup$N = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/AccountSettings.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const __vite_glob_0_91 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$N
}, Symbol.toStringTag, { value: "Module" }));
const __default__$C = defineComponent({ layout: _sfc_main$O });
const _sfc_main$M = /* @__PURE__ */ Object.assign(__default__$C, {
  __name: "Affiliate",
  __ssrInlineRender: true,
  props: ["referLink", "totalRefers", "commissions", "totalCommissions"],
  setup(__props) {
    const { formatCurrency, copyToClipboard, socialShare } = sharedComposable();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: unref(trans)("Affiliate Program")
      }, null, _parent));
      _push(`<main class="container flex-grow p-4 sm:p-6"><div class="space-y-6"><div class="grid grid-cols-1 gap-5 md:grid-cols-2"><div class="card p-4"><div class="mb-6 mt-4 grid grid-cols-2 gap-20 p-3"><div class="flex items-center justify-between gap-4"><div><p class="text-sm dark:text-slate-200">${ssrInterpolate(unref(trans)("COMMISSIONS"))}</p><p class="text-sm tracking-wide text-slate-500">${ssrInterpolate(unref(formatCurrency)(__props.totalCommissions))}</p></div><div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 bg-opacity-20 text-primary-500"><i class="bx bx-dollar bx-sm"></i></div></div><div class="flex items-center justify-between gap-4"><div><p class="text-sm dark:text-slate-200">${ssrInterpolate(unref(trans)("SIGNUP"))}</p><p class="text-sm tracking-wide text-slate-500">${ssrInterpolate(__props.totalRefers)}</p></div><div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 bg-opacity-20 text-primary-500"><i class="bx bxs-user-plus bx-sm"></i></div></div></div><div class="mb-6"><h4>${ssrInterpolate(unref(trans)("Want to get more credits?"))}</h4><p class="text-sm opacity-50">${ssrInterpolate(unref(trans)("Refer your friends and earn more rewards"))}</p></div><div class="mb-5"><div class="flex items-center rounded-md border border-gray-500 p-1"><i class="bx bxs-share-alt bx-sm rounded bg-gray-400 px-1 pb-0.5 pt-1 text-white"></i><input type="text"${ssrRenderAttr("value", __props.referLink)} class="input border-0" id="myInput" readonly><button class="btn btn-soft-primary">${ssrInterpolate(unref(trans)("Copy"))}</button></div><i class="text-sm">${ssrInterpolate(unref(trans)("Copy this url and share with others"))}</i></div><div class="grid grid-cols-2 items-center gap-y-1 text-sm text-white"><a class="resp-sharing-button__link"${ssrRenderAttr("href", unref(socialShare)("facebook", __props.referLink))} target="_blank" rel="noopener" aria-label="Share on Facebook"><div class="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--large flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z" fill="currentColor"></path></svg><p class="w-full text-center">${ssrInterpolate(unref(trans)("Share on Facebook"))}</p></div></a><a class="resp-sharing-button__link"${ssrRenderAttr("href", unref(socialShare)("twitter", __props.referLink))} target="_blank" rel="noopener" aria-label="Share on Twitter"><div class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--large flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m12.71 6.33c.48-.4 1.04-.88 1.29-1.41c-.41.21-.9.34-1.44.41c.5-.36.91-.83 1.12-1.47c-.52.28-1.05.52-1.71.64c-1.55-1.87-5.26-.35-4.6 2.45c-2.61-.16-4.2-1.34-5.52-2.79c-.75 1.22-.1 3.07.79 3.58c-.46-.03-.81-.17-1.14-.33c.04 1.54.89 2.28 2.08 2.68c-.36.07-.76.09-1.14.03c.37 1.07 1.14 1.74 2.46 1.88c-.9.76-2.56 1.29-3.9 1.08c1.15.73 2.46 1.31 4.28 1.23c4.41-.2 7.36-3.36 7.43-7.98z" fill="currentColor"></path></svg><p class="w-full text-center">${ssrInterpolate(unref(trans)("Share on Twitter"))}</p></div></a><a class="resp-sharing-button__link"${ssrRenderAttr("href", unref(socialShare)("tumblr", __props.referLink))} target="_blank" rel="noopener" aria-label="Share on Tumblr"><div class="resp-sharing-button resp-sharing-button--tumblr resp-sharing-button--large flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48"><mask id="ipSTumblr0"><g fill="none"><path fill="#fff" stroke="#fff" stroke-width="4" d="M39 6H9a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3Z"></path><path fill="#000" d="M15 22v-5h5v-3l6-2v5h5v5h-5v7s0 1.5 2 2s5-1 5-1l-2 6h-5c-3.5 0-6-3.5-6-6v-8h-5Z"></path></g></mask><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSTumblr0)"></path></svg><p class="w-full text-center">${ssrInterpolate(unref(trans)("Share on Tumblr"))}</p></div></a><a class="resp-sharing-button__link"${ssrRenderAttr("href", unref(socialShare)("email", __props.referLink))} target="_self" rel="noopener" aria-label="Share by E-Mail"><div class="resp-sharing-button resp-sharing-button--email resp-sharing-button--large flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Zm8-7.175q.125 0 .263-.038t.262-.112L19.6 8.25q.2-.125.3-.313t.1-.412q0-.5-.425-.75T18.7 6.8L12 11L5.3 6.8q-.45-.275-.875-.012T4 7.525q0 .25.1.438t.3.287l7.075 4.425q.125.075.263.113t.262.037Z"></path></svg><p class="w-full text-center">${ssrInterpolate(unref(trans)("Share on E"))}-Mail</p></div></a><a class="resp-sharing-button__link"${ssrRenderAttr("href", unref(socialShare)("pinterest", __props.referLink))} target="_blank" rel="noopener" aria-label="Share on Pinterest"><div class="resp-sharing-button resp-sharing-button--pinterest resp-sharing-button--large flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9.29c.4-.67.9-1.62 1.1-2.36l.66-2.3c.31.61 1.23 1.11 2.17 1.11c2.95 0 5-2.67 5-6c0-3.17-2.58-5.56-5.92-5.56c-4.16 0-6.33 2.78-6.33 5.83c0 1.42.72 3.17 1.94 3.73c.17.11.28.05.28-.11l.28-1.06c.03-.14.03-.22-.06-.28c-.44-.55-.72-1.39-.72-2.22c0-2.14 1.61-4.17 4.34-4.17c2.39 0 4.05 1.58 4.05 3.89c0 2.61-1.33 4.45-3.05 4.45c-.98 0-1.64-.84-1.48-1.78c.28-1.14.84-2.34.84-3.17c0-.78-.39-1.39-1.23-1.39c-.94 0-1.77 1-1.77 2.34c0 .88.27 1.44.27 1.44l-1.11 4.78c-.16.83-.08 2.08 0 2.83H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill="currentColor"></path></svg><p class="w-full text-center">${ssrInterpolate(unref(trans)("Share on Pinterest"))}</p></div></a><a class="resp-sharing-button__link"${ssrRenderAttr("href", unref(socialShare)("linkedin", __props.referLink))} target="_blank" rel="noopener" aria-label="Share on LinkedIn"><div class="resp-sharing-button resp-sharing-button--linkedin resp-sharing-button--large flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512"><path fill="currentColor" d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32Zm-273.3 373.43h-64.18V205.88h64.18ZM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43c0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43Zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44c-17.74 0-28.24 12-32.91 23.69c-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44c42.13 0 74 27.77 74 87.64Z"></path></svg><p class="w-full text-center">${ssrInterpolate(unref(trans)("Share on LinkedIn"))}</p></div></a><a class="resp-sharing-button__link"${ssrRenderAttr("href", unref(socialShare)("whatsapp", __props.referLink))} target="_blank" rel="noopener" aria-label="Share on WhatsApp"><div class="resp-sharing-button resp-sharing-button--whatsapp resp-sharing-button--large flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M21.99 6.547a10.59 10.59 0 0 0-.103-1.282a4.312 4.312 0 0 0-.363-1.09A3.853 3.853 0 0 0 19.83 2.48a4.299 4.299 0 0 0-1.083-.362a10.523 10.523 0 0 0-1.292-.105c-.183-.007-.42-.01-.53-.01L7.077 2c-.11 0-.347.003-.53.01a10.565 10.565 0 0 0-1.282.103a4.312 4.312 0 0 0-1.09.363A3.854 3.854 0 0 0 2.48 4.17a4.303 4.303 0 0 0-.362 1.083a10.545 10.545 0 0 0-.106 1.292c-.006.183-.01.42-.01.53L2 16.923c0 .11.003.347.01.53a10.565 10.565 0 0 0 .103 1.282a4.313 4.313 0 0 0 .363 1.09A3.854 3.854 0 0 0 4.17 21.52a4.305 4.305 0 0 0 1.083.362a10.52 10.52 0 0 0 1.292.105c.183.007.42.01.53.01l9.848.002c.11 0 .347-.003.53-.01a10.578 10.578 0 0 0 1.282-.103a4.316 4.316 0 0 0 1.09-.363a3.854 3.854 0 0 0 1.696-1.694a4.301 4.301 0 0 0 .362-1.083a10.533 10.533 0 0 0 .106-1.292c.006-.183.01-.42.01-.53L22 7.077c0-.11-.003-.347-.01-.53Zm-9.773 12.41h-.003a7.126 7.126 0 0 1-3.407-.868l-3.78.991l1.012-3.693a7.13 7.13 0 1 1 6.178 3.57Z"></path><path fill="currentColor" d="M12.22 5.901a5.927 5.927 0 0 0-5.023 9.076l.141.224l-.599 2.186l2.243-.588l.216.128a5.918 5.918 0 0 0 3.016.826h.003A5.926 5.926 0 0 0 12.219 5.9Zm3.484 8.47a1.834 1.834 0 0 1-1.202.847a2.443 2.443 0 0 1-1.122-.07a10.276 10.276 0 0 1-1.015-.376a7.94 7.94 0 0 1-3.043-2.689a3.463 3.463 0 0 1-.728-1.842a1.997 1.997 0 0 1 .624-1.485a.655.655 0 0 1 .475-.223c.118 0 .237 0 .341.006c.11.005.256-.042.4.306c.15.356.506 1.233.55 1.322a.328.328 0 0 1 .015.312a1.216 1.216 0 0 1-.178.297c-.09.104-.187.232-.267.312c-.09.089-.182.185-.079.363a5.366 5.366 0 0 0 .991 1.234a4.863 4.863 0 0 0 1.433.884c.178.09.282.074.386-.045s.445-.52.564-.698s.237-.148.4-.089s1.04.49 1.218.58s.297.133.341.207a1.488 1.488 0 0 1-.104.847Z"></path></svg><p class="w-full text-center">${ssrInterpolate(unref(trans)("Share on WhatsApp"))}</p></div></a><a class="resp-sharing-button__link"${ssrRenderAttr("href", unref(socialShare)("telegram", __props.referLink))} target="_blank" rel="noopener" aria-label="Share on Telegram"><div class="resp-sharing-button resp-sharing-button--telegram resp-sharing-button--large flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16"><path fill="currentColor" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01c-.378.15-.577.298-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294c.26.006.549-.1.868-.32c2.179-1.471 3.304-2.214 3.374-2.23c.05-.012.12-.026.166.016c.047.041.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817c-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088c.327.216.589.393.85.571c.284.194.568.387.936.629c.093.06.183.125.27.187c.331.236.63.448.997.414c.214-.02.435-.22.547-.82c.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315a.337.337 0 0 0-.114-.217a.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"></path></svg><p class="w-full text-center">${ssrInterpolate(unref(trans)("Share on Telegram"))}</p></div></a></div></div><div class="p-5"><div class="mb-4 flex max-w-max items-center gap-1 border-b-2 border-primary-600 px-4 pb-2"><i class="bx bx-award bx-sm text-primary-500"></i><p class="font-semibold">${ssrInterpolate(unref(trans)("Commissions"))}</p></div>`);
      if (__props.commissions.data.length > 0) {
        _push(`<div class="flex flex-col gap-y-5"><!--[-->`);
        ssrRenderList(__props.commissions.data, (commission) => {
          _push(`<div class="card flex items-center justify-between p-4"><div class="flex items-center gap-5"><div class="rounded bg-gray-700/50 p-4"><i class="bx bx-dollar-circle bx-md"></i></div><div class=""><p class="text-xl font-semibold">${ssrInterpolate(unref(formatCurrency)(commission.commission_amount))}</p><p class="text-xs opacity-50">${ssrInterpolate(unref(moment)(commission.created_at).format("DD MMM, YYYY"))}</p></div></div><span class="${ssrRenderClass([commission.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(commission.status == 1 ? unref(trans)("Approved") : unref(trans)("Rejected"))}</span></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, null, null, _parent));
      }
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.commissions.links
      }, null, _parent));
      _push(`</div></div></div></main><!--]-->`);
    };
  }
});
const _sfc_setup$M = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Affiliate.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const __vite_glob_0_92 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$M
}, Symbol.toStringTag, { value: "Module" }));
const __default__$B = defineComponent({ layout: _sfc_main$O });
const _sfc_main$L = /* @__PURE__ */ Object.assign(__default__$B, {
  __name: "ChangePassword",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      current_password: "",
      new_password: "",
      new_password_confirmation: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: unref(trans)("Change Password")
      }, null, _parent));
      _push(`<main class="container flex-grow p-4 sm:p-6"><div class="space-y-6"><div class="card mx-auto w-[600px] p-3"><div class="card-body"><h4 class="mb-4">${ssrInterpolate(unref(trans)("Change Password"))}</h4><form><div class="row"><div class="col-12"><label for="">${ssrInterpolate(unref(trans)("Old Password"))} *</label><input type="password" class="input"${ssrRenderAttr("value", unref(form).current_password)}>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.current_password
      }, null, _parent));
      _push(`</div><div class="col-12"><label for="">${ssrInterpolate(unref(trans)("New Password"))} *</label><input type="password" class="input"${ssrRenderAttr("value", unref(form).new_password)}>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.new_password
      }, null, _parent));
      _push(`</div><div class="col-12"><label for="">${ssrInterpolate(unref(trans)("Confirm Password"))} *</label><input type="password" class="input"${ssrRenderAttr("value", unref(form).new_password_confirmation)}>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.new_password_confirmation
      }, null, _parent));
      _push(`</div></div><div class="mt-5"><button type="submit" class="btn btn-primary">${ssrInterpolate(unref(trans)("Change password"))}</button></div></form><div class="mt-4">`);
      _push(ssrRenderComponent(_component_Link, { href: "/user/account-settings" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(trans)("Back to Account Settings"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(trans)("Back to Account Settings")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></main><!--]-->`);
    };
  }
});
const _sfc_setup$L = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/ChangePassword.vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const __vite_glob_0_93 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$L
}, Symbol.toStringTag, { value: "Module" }));
const __default__$A = defineComponent({ layout: _sfc_main$O });
const _sfc_main$K = /* @__PURE__ */ Object.assign(__default__$A, {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: [
    "pieChartData",
    "totalInvest",
    "totalProfit",
    "totalDeposits",
    "totalRefers",
    "profitOverview",
    "recentDeposits",
    "recentInvests",
    "totalRefers",
    "request"
  ],
  setup(__props) {
    var _a2, _b2;
    const props = __props;
    const { formatCurrency, textExcerpt, pickBy, authUser } = sharedComposable();
    const primaryOverview = computed(() => {
      return [
        {
          title: "Total Invest",
          value: props.totalInvest,
          icon: "bx bx-box",
          classes: "bg-primary-500 text-primary-500"
        },
        {
          title: "Total Profit",
          value: props.totalProfit,
          icon: "bx bx-dollar-circle",
          classes: "text-success-500 bg-success-500"
        },
        {
          title: "Total Deposits",
          value: props.totalDeposits,
          icon: "bx bxs-receipt",
          classes: "text-warning-500 bg-warning-500"
        },
        {
          title: "Wallet",
          value: formatCurrency(authUser.value.wallet),
          icon: "bx bx-dollar",
          classes: "text-info-500 bg-info-500"
        }
      ];
    });
    const filterForm = ref({
      returns: ((_a2 = props.request) == null ? void 0 : _a2.returns) || "",
      pie: ((_b2 = props.request) == null ? void 0 : _b2.pie) || ""
    });
    const profitChart = computed(() => {
      return {
        series: [
          {
            name: "Profits",
            data: props.profitOverview.map((item) => item.profits.toFixed(2))
          },
          {
            name: "Losses",
            data: props.profitOverview.map((item) => item.losses.toFixed(2))
          }
        ],
        chartOptions: {
          colors: ["#69ae84", "#E32A3A"],
          chart: {
            height: 360,
            type: "area",
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "smooth"
          },
          xaxis: {
            type: "string",
            categories: props.profitOverview.map((item) => item.date)
          }
        }
      };
    });
    const detailsChart = computed(() => {
      return {
        series: [
          props.pieChartData["pending"],
          props.pieChartData["approved"],
          props.pieChartData["declined"]
        ],
        chartOptions: {
          chart: {
            type: "donut"
          },
          height: 140,
          labels: ["Pending", "Approved", "Declined"],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        }
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a3, _b3;
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: _ctx.trans("Dashboard")
      }, null, _parent));
      _push(`<div class="space-y-6"><section class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"><!--[-->`);
      ssrRenderList(primaryOverview.value, (item, index) => {
        _push(`<div class="card"><div class="card-body flex items-center gap-4"><div class="${ssrRenderClass([item.classes, "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-opacity-20"])}"><i class="${ssrRenderClass([item.icon, "text-3xl"])}"></i></div><div class="flex flex-1 flex-col gap-1"><p class="text-sm tracking-wide text-slate-500">${ssrInterpolate(item.title)}</p><div class="flex flex-wrap items-baseline justify-between gap-2"><h4>${ssrInterpolate(item.value)}</h4></div></div></div></div>`);
      });
      _push(`<!--]--></section><section class="grid grid-cols-2 place-items-start gap-6 md:grid-cols-2 xl:grid-cols-3"><div class="card order-2 col-span-full w-full md:col-span-2 xl:order-3"><div class="card-body flex h-full flex-col justify-between gap-4"><div class="flex flex-wrap justify-between gap-2"><h6>${ssrInterpolate(_ctx.trans("Overview Of Investment Returns"))}</h6><select class="select select-xl w-full md:w-40"><option value="" selected>${ssrInterpolate(_ctx.trans("Filter By"))}</option><!--[-->`);
      ssrRenderList(["day", "week", "month", "year"], (item) => {
        _push(`<option class="capitalize"${ssrRenderAttr("value", item)}${ssrIncludeBooleanAttr(filterForm.value.returns === item) ? " selected" : ""}>${ssrInterpolate(item)}</option>`);
      });
      _push(`<!--]--></select></div><div class="min-h-min">`);
      _push(ssrRenderComponent(unref(VueApexCharts), {
        type: "area",
        height: "360",
        options: profitChart.value.chartOptions,
        series: profitChart.value.series
      }, null, _parent));
      _push(`</div></div></div><div class="order-4 col-span-full w-full space-y-6 xl:col-span-1"><div class="card"><div class="card-body"><div class="flex flex-wrap justify-between gap-2"><h6>${ssrInterpolate(_ctx.trans("Commissions"))}</h6><select class="select select-xl w-full md:w-40"><option value="" selected>${ssrInterpolate(_ctx.trans("Filter By"))}</option><!--[-->`);
      ssrRenderList(["week", "month", "year"], (item) => {
        _push(`<option class="capitalize"${ssrRenderAttr("value", item)}${ssrIncludeBooleanAttr(filterForm.value.pie === item) ? " selected" : ""}>${ssrInterpolate(item)}</option>`);
      });
      _push(`<!--]--></select></div><div class="min-h-min">`);
      _push(ssrRenderComponent(unref(VueApexCharts), {
        height: "140",
        type: "donut",
        options: detailsChart.value.chartOptions,
        series: detailsChart.value.series
      }, null, _parent));
      _push(`</div></div></div><div class="card"><div class="card-body"><div class="flex w-full justify-between"><h6>${ssrInterpolate(_ctx.trans("Refer Details"))}</h6></div><div class="mt-4 flex w-full gap-1"><div class="h-2 w-[33%] rounded-primary bg-primary-500"></div><div class="h-2 w-[33%] rounded-primary bg-info-500"></div><div class="h-2 w-[33%] rounded-primary bg-success-500"></div></div><br><div class="space-y-5"><div class="flex w-full justify-between"><div class="flex items-center gap-2"><div class="h-[14px] w-[14px] rounded-full border-2 border-primary-500"></div><p class="whitespace-nowrap text-sm font-medium">${ssrInterpolate(_ctx.trans("Signup"))}</p></div><div class="flex items-center justify-center"><p class="whitespace-nowrap text-sm font-medium text-slate-600 dark:text-slate-400">${ssrInterpolate(__props.totalRefers)}</p></div></div><div class="flex w-full justify-between"><div class="flex items-center gap-2"><div class="h-[14px] w-[14px] rounded-full border-2 border-info-500"></div><p class="whitespace-nowrap text-sm font-medium">${ssrInterpolate(_ctx.trans("Pending For Measurement"))}</p></div><div class="flex items-center justify-center"><p class="whitespace-nowrap text-sm font-medium text-slate-600 dark:text-slate-400">${ssrInterpolate(unref(formatCurrency)(props.pieChartData["pending"]))}</p></div></div><div class="flex w-full justify-between"><div class="flex items-center gap-2"><div class="h-[14px] w-[14px] rounded-full border-2 border-success-500"></div><p class="whitespace-nowrap text-sm font-medium">${ssrInterpolate(_ctx.trans("Total Earnings"))}</p></div><div class="flex items-center justify-center"><p class="whitespace-nowrap text-sm font-medium text-slate-600 dark:text-slate-400">${ssrInterpolate(unref(formatCurrency)(props.pieChartData["approved"]))}</p></div></div></div></div></div></div></section><section class="grid place-items-start gap-6 md:grid-cols-12"><div class="card md:col-span-8"><div class="card-body space-y-2"><h6>${ssrInterpolate(_ctx.trans("Recent Invests"))}</h6>`);
      if (((_a3 = __props.recentInvests) == null ? void 0 : _a3.length) > 0) {
        _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table min-w-[43rem]"><thead><tr><th>${ssrInterpolate(_ctx.trans("Invoice No"))}</th><th>${ssrInterpolate(_ctx.trans("Project"))}</th><th>${ssrInterpolate(_ctx.trans("Duration"))}</th><th>${ssrInterpolate(_ctx.trans("Amount"))}</th><th>${ssrInterpolate(_ctx.trans("QTY"))}</th><th>${ssrInterpolate(_ctx.trans("Status"))}</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(__props.recentInvests, (investment) => {
          var _a4, _b4;
          _push(`<tr><td>${ssrInterpolate(investment == null ? void 0 : investment.invoice_no)}</td><td class="flex items-center"><img${ssrRenderAttrs(mergeProps({ class: "avatar mr-2 rounded" }, ssrGetDirectiveProps(_ctx, _directive_lazy, (_a4 = investment == null ? void 0 : investment.project_duration) == null ? void 0 : _a4.project.preview)))}><p>${ssrInterpolate((_b4 = investment == null ? void 0 : investment.project_duration) == null ? void 0 : _b4.project.title)}</p></td><td>${ssrInterpolate(investment == null ? void 0 : investment.project_duration.duration)}/${ssrInterpolate(investment == null ? void 0 : investment.project_duration.duration_type)}</td><td>${ssrInterpolate(unref(formatCurrency)(investment.amount))}</td><td>${ssrInterpolate(investment.qty)}</td><td class="text-left"><span class="${ssrRenderClass([investment.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(investment.status == 0 ? _ctx.trans("Declined") : investment.status == 1 ? _ctx.trans("Active") : _ctx.trans("Pending"))}</span></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2u, { text: "Nothing found..." }, null, _parent));
      }
      _push(`</div></div><div class="card md:col-span-4"><div class="card-body space-y-2"><h6>${ssrInterpolate(_ctx.trans("Recent Deposits"))}</h6>`);
      if (((_b3 = __props.recentDeposits) == null ? void 0 : _b3.length) > 0) {
        _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(_ctx.trans("Invoice No"))}</th><th>${ssrInterpolate(_ctx.trans("Trx"))}</th><th>${ssrInterpolate(_ctx.trans("Amount"))}</th><th>${ssrInterpolate(_ctx.trans("Status"))}</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(__props.recentDeposits, (history) => {
          _push(`<tr><td>${ssrInterpolate(history.invoice_no)}</td><td>${ssrInterpolate(history.payment_id)}</td><td>${ssrInterpolate(unref(formatCurrency)(history.amount))}</td><td class="text-left"><span class="${ssrRenderClass([history.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(history.status == 1 ? _ctx.trans("Active") : _ctx.trans("Draft"))}</span></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2u, { text: "Nothing found..." }, null, _parent));
      }
      _push(`</div></div></section></div></main>`);
    };
  }
});
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Dashboard.vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const __vite_glob_0_94 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$K
}, Symbol.toStringTag, { value: "Module" }));
const __default__$z = defineComponent({ layout: _sfc_main$O });
const _sfc_main$J = /* @__PURE__ */ Object.assign(__default__$z, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "segments",
    "buttons",
    "orders",
    "request",
    "totalOrders",
    "totalPendingOrders",
    "totalCompleteOrders",
    "totalDeclinedOrders",
    "type",
    "invoice",
    "currency",
    "tax"
  ],
  setup(__props) {
    const props = __props;
    const { formatCurrency } = sharedComposable();
    const orderOverviews = [
      { value: props.totalOrders, title: trans("Total Orders"), iconClass: "bx bx-box" },
      {
        value: props.totalPendingOrders,
        title: trans("Pending Orders"),
        iconClass: "bx bx-dollar-circle"
      },
      {
        value: props.totalCompleteOrders,
        title: trans("Completed Orders"),
        iconClass: "ti ti-thumb-up"
      },
      {
        value: props.totalDeclinedOrders,
        title: trans("Declined Orders"),
        iconClass: "ti ti-message-2-cog"
      }
    ];
    const filterData = useForm({
      search: props.request.search,
      type: props.type
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: unref(trans)("Event Order List"),
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-4">`);
      _push(ssrRenderComponent(_sfc_main$2s, { items: orderOverviews }, null, _parent));
      _push(`<div class="flex items-center justify-end gap-x-2"><div class="dropdown" data-placement="bottom-end"><div class="dropdown-toggle"><button type="button" class="btn bg-white font-medium shadow-sm dark:bg-slate-800"><i class="w-4" data-feather="filter"></i><span>${ssrInterpolate(unref(trans)("Filter"))}</span><i class="w-4" data-feather="chevron-down"></i></button></div><div class="dropdown-content w-72 !overflow-visible"><form><ul class="dropdown-list space-y-4 p-4"><li class="dropdown-list-item"><h2 class="my-1 text-sm font-medium">${ssrInterpolate(unref(trans)("Keyword"))}</h2><div class="mb-2"><input type="text" name="search"${ssrRenderAttr("value", unref(filterData).search)} class="input" placeholder="enter search keyword"></div></li><li class="dropdown-list-item"><div class="mb-2"><select class="select" name="type"><option value="email">${ssrInterpolate(unref(trans)("User Email"))}</option><option value="invoice_no">${ssrInterpolate(unref(trans)("Invoice No"))}</option></select></div></li><li class="dropdown-list-item"><button type="submit" class="btn btn-primary w-full">${ssrInterpolate(unref(trans)("Filter"))}</button></li></ul></form></div></div></div><div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Order No"))}</th><th>${ssrInterpolate(unref(trans)("Event Name"))}</th><th>${ssrInterpolate(unref(trans)("Payment Mode"))}</th><th>${ssrInterpolate(unref(trans)("Amount"))}</th><th>${ssrInterpolate(unref(trans)("Status"))}</th><th>${ssrInterpolate(unref(trans)("Created At"))}</th><th class="!text-right">${ssrInterpolate(unref(trans)("Actions"))}</th></tr></thead>`);
      if (__props.orders.total) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.orders.data, (order) => {
          var _a2;
          _push(`<tr><td>`);
          _push(ssrRenderComponent(_component_Link, {
            href: "/user/event-orders/" + order.id,
            class: "text-sm font-medium text-primary-500 transition duration-150 ease-in-out hover:underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(order.invoice_no)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(order.invoice_no), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td><a target="_blank"${ssrRenderAttr("href", _ctx.route("events.show", order.event))}>${ssrInterpolate(order.event.title)}</a></td><td>${ssrInterpolate(((_a2 = order.gateway) == null ? void 0 : _a2.name) ?? "NA")}</td><td>${ssrInterpolate(unref(formatCurrency)(order.amount))}</td><td><div class="badge badge-soft-primary capitalize">${ssrInterpolate(unref(trans)(
            order.status == 2 ? "pending" : order.status == 1 ? "approved" : "declined"
          ))}</div></td><td class="text-center">${ssrInterpolate(order.created_at_diff)}</td><td><div class="flex justify-center"><div class="dropdown" data-placement="bottom-start"><div class="dropdown-toggle"><i class="w-6 text-slate-400" data-feather="more-horizontal"></i></div><div class="dropdown-content w-40"><ul class="dropdown-list"><li class="dropdown-list-item">`);
          _push(ssrRenderComponent(_component_Link, {
            href: "/user/event-orders/" + order.id,
            class: "dropdown-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="h-5 text-slate-400" data-feather="external-link"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(unref(trans)("View"))}</span>`);
              } else {
                return [
                  createVNode("i", {
                    class: "h-5 text-slate-400",
                    "data-feather": "external-link"
                  }),
                  createVNode("span", null, toDisplayString(unref(trans)("View")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li><li class="dropdown-list-item"><a${ssrRenderAttr("href", _ctx.route("user.event-orders.ticket-download", order.id))} class="dropdown-link"><i class="h-5 text-slate-400" data-feather="download"></i> ${ssrInterpolate(unref(trans)("Download Ticket"))}</a></li></ul></div></div></div></td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table></div>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.orders.links
      }, null, _parent));
      _push(`</div></main>`);
    };
  }
});
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/EventOrder/Index.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const __vite_glob_0_95 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$J
}, Symbol.toStringTag, { value: "Module" }));
const __default__$y = defineComponent({ layout: _sfc_main$O });
const _sfc_main$I = /* @__PURE__ */ Object.assign(__default__$y, {
  __name: "Show",
  __ssrInlineRender: true,
  props: [
    "order",
    "event",
    "invoice_data",
    "segments",
    "buttons",
    "meta"
  ],
  setup(__props) {
    const { formatCurrency } = sharedComposable();
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2;
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Invoice details",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="card"><div class="space-y-6 card-body"><div class="flex flex-col justify-between p-1 space-y-4 md:flex-row"><div class="flex items-center justify-center md:justify-start"><div class="flex items-center w-full h-16 gap-4 pr-4"><img${ssrRenderAttrs(mergeProps({
        alt: "logo",
        class: "block h-[45px] dark:hidden"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, _ctx.$page.props.primaryData.deep_logo)))}><img${ssrRenderAttrs(mergeProps({
        alt: "logo",
        class: "hidden h-[45px] dark:block"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, _ctx.$page.props.primaryData.logo)))}></div></div><div class="flex flex-col items-start justify-center md:items-end"><h4>Invoice #${ssrInterpolate(__props.order.invoice_no)}</h4><p class="py-0 my-0 text-sm font-medium text-slate-700 dark:text-slate-300">${ssrInterpolate(_ctx.trans("Order Date"))}: <span class="font-normal text-slate-600 dark:text-slate-300">${ssrInterpolate(unref(moment)(__props.order.created_at).format("DD-MM-YYYY"))}</span></p><p class="py-0 my-0 text-sm font-medium text-slate-700 dark:text-slate-300">${ssrInterpolate(_ctx.trans("Status"))}: <span class="font-normal text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.order.status == 2 ? "pending" : __props.order.status == 1 ? "approved" : "declined")}</span></p></div></div><div class="flex flex-col justify-between p-1 space-y-6 md:flex-row md:space-y-0"><div class="flex flex-col items-start justify-center w-full md:mb-0 md:w-2/3 md:justify-center"><p class="text-xs font-medium uppercase text-slate-400">BILLED FROM</p><h6 class="my-1">${ssrInterpolate(__props.invoice_data.company_name)}</h6><p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.invoice_data.address)}</p><p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.invoice_data.city)}</p><p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.invoice_data.post_code)}</p><p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.invoice_data.country)}</p></div><div class="flex flex-col items-start justify-center w-full md:w-1/3 md:items-end"><p class="text-xs font-medium uppercase text-slate-400">BILLED TO</p><h6 class="my-1">${ssrInterpolate(__props.order.user.name)}</h6><p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.order.user.address)}</p><p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.order.user.email)}</p><p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.order.user.phone)}</p></div></div><div class="w-full p-1 overflow-auto"><div class="min-w-[38rem]"><div class="border table-responsive whitespace-nowrap rounded-primary border-slate-200 dark:border-slate-600"><table class="table table-striped table-hover table-md"><tbody><tr><td class="col-9">${ssrInterpolate(_ctx.trans("Project Name"))}</td><td class="col-3"><div class="text-right">${ssrInterpolate(_ctx.trans("Unit Price"))}</div></td></tr><tr><td><img${ssrRenderAttrs(mergeProps({
        class: "inline w-12 mr-2 rounded",
        alt: "preview"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, __props.order.event.preview)))}> ${ssrInterpolate(__props.order.event.title)}</td><td><div class="text-right">${ssrInterpolate(unref(formatCurrency)(__props.order.event.fee_amount))}</div></td></tr></tbody></table></div><h5 class="my-3">Booking Details</h5><div class="border table-responsive whitespace-nowrap rounded-primary border-slate-200 dark:border-slate-600"><table class="table table-striped table-hover table-md"><tbody><tr><td>${ssrInterpolate(_ctx.trans("Total Seat"))}</td><td>${ssrInterpolate(_ctx.trans("Fee Per Seat"))}</td><td><div class="text-end">${ssrInterpolate(_ctx.trans("Subtotal"))}</div></td></tr><tr><td class="text-center">${ssrInterpolate(__props.order.qty)}</td><td class="text-center">${ssrInterpolate(unref(formatCurrency)(__props.event.fee_amount))}</td><td><div class="text-end">${ssrInterpolate(unref(formatCurrency)(__props.event.fee_amount * __props.order.qty))}</div></td></tr></tbody></table></div><div class="flex items-stretch justify-between mt-4"><div class="w-3/5"><p class="py-0 my-2 text-sm font-semibold">${ssrInterpolate(_ctx.trans("Payment Method"))}: <span class="font-normal">${ssrInterpolate(((_a2 = __props.order.gateway) == null ? void 0 : _a2.name) ?? "Free")}</span></p>`);
      if ((_b2 = __props.order.gateway) == null ? void 0 : _b2.name) {
        _push(`<!--[--><p class="py-0 my-2 text-sm font-semibold">${ssrInterpolate(_ctx.trans("Payment Id"))}: <span class="font-normal">${ssrInterpolate(__props.order.payment_id)}</span></p><div class="">`);
        if (__props.meta != null) {
          _push(`<!--[--><div class="font-semibold">${ssrInterpolate(_ctx.trans("Payment Info:"))}</div><br><p class="section-lead">${ssrInterpolate(__props.meta.comment)}</p><p class="section-lead"><a target="_blank"${ssrRenderAttr("href", __props.meta.screenshot)}>${ssrInterpolate(_ctx.trans("Attachment"))}</a></p><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-3 min-w-[272px]"><div class="flex items-center gap-x-2"><p class="w-full text-sm text-right text-slate-400 dark:text-slate-300">${ssrInterpolate(_ctx.trans("Subtotal"))}: </p><p class="w-full text-sm font-semibold text-right text-slate-700 dark:text-slate-300">${ssrInterpolate(unref(formatCurrency)(__props.order.amount))}</p></div><div class="flex items-center gap-x-2"><p class="w-full text-sm text-right text-slate-400 dark:text-slate-300">${ssrInterpolate(_ctx.trans("Tax"))}: </p><p class="w-full text-sm font-semibold text-right text-slate-700 dark:text-slate-300">${ssrInterpolate(unref(formatCurrency)(__props.order.tax || 0))}</p></div><hr class="mt-5 mb-1 border-slate-200 dark:border-slate-600"><div class="flex items-center justify-end gap-x-2 text-end"><p class="w-1/2 text-sm text-slate-400">${ssrInterpolate(_ctx.trans("Total"))}:</p><p class="w-1/2 text-sm font-semibold text-slate-700 dark:text-slate-300">${ssrInterpolate(unref(formatCurrency)(__props.order.amount + __props.order.tax || 0))}</p></div></div></div></div></div><p class="py-2 text-sm text-center">${ssrInterpolate(_ctx.trans("Thanks for your Business"))}</p></div></div></main>`);
    };
  }
});
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/EventOrder/Show.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const __vite_glob_0_96 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$I
}, Symbol.toStringTag, { value: "Module" }));
const __default__$x = defineComponent({ layout: _sfc_main$O });
const _sfc_main$H = /* @__PURE__ */ Object.assign(__default__$x, {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["investments", "statsCounter"],
  setup(__props) {
    const props = __props;
    const { formatCurrency } = sharedComposable();
    const selectOptions = [
      {
        label: "Invoice No",
        value: "invoice_no"
      },
      {
        label: "Project Title",
        value: "project_title"
      }
    ];
    const stats = [
      {
        value: props.statsCounter.total,
        title: trans("Total"),
        iconClass: "bx bxs-grid"
      },
      {
        value: props.statsCounter.active,
        title: trans("Active"),
        iconClass: "ti ti-thumb-up"
      },
      {
        value: props.statsCounter.pending,
        title: trans("Pending"),
        iconClass: "bx bx-loader-circle"
      },
      {
        value: props.statsCounter.declined,
        title: trans("Declined"),
        iconClass: "bx bx-x"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}><div class="space-y-4">`);
      _push(ssrRenderComponent(_sfc_main$2F, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: stats,
        grid: stats.length
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2m, { options: selectOptions }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><td>${ssrInterpolate(unref(trans)("Invest No"))}</td><th>${ssrInterpolate(unref(trans)("Project Name"))}</th><th>${ssrInterpolate(unref(trans)("Invest Amount"))}</th><th>${ssrInterpolate(unref(trans)("Booking Units"))}</th><th>${ssrInterpolate(unref(trans)("Invest Date"))}</th><th>${ssrInterpolate(unref(trans)("Order Status"))}</th></tr></thead>`);
      if (__props.investments.total) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.investments.data, (invest) => {
          var _a2, _b2, _c, _d;
          _push(`<tr><td>`);
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("user.investments.show", invest)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(invest.invoice_no)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(invest.invoice_no), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td><a${ssrRenderAttr("href", `/projects/${(_a2 = invest.project) == null ? void 0 : _a2.slug}`)} target="_blank">${ssrInterpolate((_b2 = invest.project) == null ? void 0 : _b2.title)} (${ssrInterpolate((_c = invest.project_duration) == null ? void 0 : _c.duration)} ${ssrInterpolate((_d = invest.project_duration) == null ? void 0 : _d.duration_type)}) </a></td><td>${ssrInterpolate(unref(formatCurrency)(invest.amount))}</td><td class="text-center">${ssrInterpolate(invest.qty)}</td><td>${ssrInterpolate(unref(moment)(invest.created_at).format("D-MMM-Y"))}</td><td class="text-left">`);
          if (invest.status == 0) {
            _push(`<span class="badge badge-danger">${ssrInterpolate(unref(trans)("Declined"))}</span>`);
          } else if (invest.status == 1) {
            _push(`<span class="badge badge-success">${ssrInterpolate(unref(trans)("Active"))}</span>`);
          } else if (invest.status == 2) {
            _push(`<span class="badge badge-primary">${ssrInterpolate(unref(trans)("Pending"))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.investments.links
      }, null, _parent));
      _push(`</div></div></main>`);
    };
  }
});
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Investments/Index.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const __vite_glob_0_97 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$H
}, Symbol.toStringTag, { value: "Module" }));
const __default__$w = defineComponent({ layout: _sfc_main$O });
const _sfc_main$G = /* @__PURE__ */ Object.assign(__default__$w, {
  __name: "Show",
  __ssrInlineRender: true,
  props: [
    "order",
    "investment",
    "project",
    "invoice_data",
    "segments",
    "buttons",
    "meta"
  ],
  setup(__props) {
    const { formatCurrency } = sharedComposable();
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c, _d;
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Invoice details",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="card"><div class="card-body space-y-6"><div class="flex flex-col justify-between space-y-4 p-1 md:flex-row"><div class="flex items-center justify-center md:justify-start"><div class="flex h-16 w-full items-center gap-4 pr-4"><img${ssrRenderAttrs(mergeProps({
        alt: "logo",
        class: "block h-[45px] dark:hidden"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, _ctx.$page.props.primaryData.deep_logo)))}><img${ssrRenderAttrs(mergeProps({
        alt: "logo",
        class: "hidden h-[45px] dark:block"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, _ctx.$page.props.primaryData.logo)))}></div></div><div class="flex flex-col items-start justify-center md:items-end"><h4>Invoice #${ssrInterpolate(__props.order.invoice_no)}</h4><p class="my-0 py-0 text-sm font-medium text-slate-700 dark:text-slate-300">${ssrInterpolate(_ctx.trans("Order Date"))}: <span class="font-normal text-slate-600 dark:text-slate-300">${ssrInterpolate(unref(moment)(__props.order.created_at).format("DD-MM-YYYY"))}</span></p><p class="my-0 py-0 text-sm font-medium text-slate-700 dark:text-slate-300">${ssrInterpolate(_ctx.trans("Status"))}: <span class="font-normal text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.order.status == 2 ? "pending" : __props.order.status == 1 ? "approved" : "declined")}</span></p></div></div><div class="flex flex-col justify-between space-y-6 p-1 md:flex-row md:space-y-0"><div class="flex w-full flex-col items-start justify-center md:mb-0 md:w-2/3 md:justify-center"><p class="text-xs font-medium uppercase text-slate-400">BILLED FROM</p><h6 class="my-1">${ssrInterpolate(__props.invoice_data.company_name)}</h6><p class="whitespace-nowrap text-sm font-normal text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.invoice_data.address)}</p><p class="whitespace-nowrap text-sm font-normal text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.invoice_data.city)}</p><p class="whitespace-nowrap text-sm font-normal text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.invoice_data.post_code)}</p><p class="whitespace-nowrap text-sm font-normal text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.invoice_data.country)}</p></div><div class="flex w-full flex-col items-start justify-center md:w-1/3 md:items-end"><p class="text-xs font-medium uppercase text-slate-400">BILLED TO</p><h6 class="my-1">${ssrInterpolate(__props.order.user.name)}</h6><p class="whitespace-nowrap text-sm font-normal text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.order.user.address)}</p><p class="whitespace-nowrap text-sm font-normal text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.order.user.email)}</p><p class="whitespace-nowrap text-sm font-normal text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.order.user.phone)}</p></div></div><div class="w-full overflow-auto p-1"><div class="min-w-[38rem]"><div class="table-responsive whitespace-nowrap rounded-primary border border-slate-200 dark:border-slate-600"><table class="table-striped table-hover table-md table"><tbody><tr><td class="col-9">${ssrInterpolate(_ctx.trans("Project Name"))}</td><td class="col-3 text-right">${ssrInterpolate(_ctx.trans("Unit Price"))}</td></tr><tr><td><a${ssrRenderAttr("href", `/projects/${(_a2 = __props.project) == null ? void 0 : _a2.slug}`)} target="_blank"><img${ssrRenderAttrs(mergeProps({
        class: "mr-2 inline w-12 rounded",
        alt: "preview"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, (_b2 = __props.project) == null ? void 0 : _b2.preview)))}> ${ssrInterpolate((_c = __props.project) == null ? void 0 : _c.title)}</a></td><td class="text-right">${ssrInterpolate(unref(formatCurrency)(__props.project.invest_amount))}</td></tr></tbody></table></div><h5 class="my-3">${ssrInterpolate(_ctx.trans("Booking Details"))}</h5><div class="table-responsive whitespace-nowrap rounded-primary border border-slate-200 dark:border-slate-600"><table class="table-striped table-hover table-md table"><tbody><tr><td>${ssrInterpolate(_ctx.trans("Total Unit"))}</td><td>${ssrInterpolate(_ctx.trans("Per Unit"))}</td><td>${ssrInterpolate(_ctx.trans("Subtotal"))}</td></tr><tr><td class="text-center">${ssrInterpolate(__props.investment.qty)}</td><td class="text-center">${ssrInterpolate(unref(formatCurrency)(__props.project.invest_amount))}</td><td class="text-end">${ssrInterpolate(unref(formatCurrency)(__props.project.invest_amount * __props.investment.qty))}</td></tr></tbody></table></div><div class="mt-4 flex items-stretch justify-between"><div class="w-2/5"><p class="my-2 py-0 text-sm font-semibold">${ssrInterpolate(_ctx.trans("Payment Method"))}: <span class="font-normal">${ssrInterpolate(((_d = __props.order.gateway) == null ? void 0 : _d.name) ?? "NA")}</span></p><p class="my-2 py-0 text-sm font-semibold">${ssrInterpolate(_ctx.trans("Payment Id"))}: <span class="font-normal">${ssrInterpolate(__props.order.payment_id)}</span></p><div class="">`);
      if (__props.meta != null) {
        _push(`<!--[--><div class="font-semibold">${ssrInterpolate(_ctx.trans("Payment Info:"))}</div><br><p class="section-lead">${ssrInterpolate(__props.meta.comment)}</p><p class="section-lead"><a target="_blank"${ssrRenderAttr("href", __props.meta.screenshot)}>${ssrInterpolate(_ctx.trans("Attachment"))}</a></p><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="space-y-3"><div class="flex items-center justify-between gap-x-2"><p class="text-sm text-slate-400 dark:text-slate-300">${ssrInterpolate(_ctx.trans("Subtotal"))}:</p><p class="text-sm font-semibold text-slate-700 dark:text-slate-300">${ssrInterpolate(unref(formatCurrency)(__props.order.amount))}</p></div><div class="flex items-center justify-between gap-x-2"><p class="text-sm text-slate-400 dark:text-slate-300">${ssrInterpolate(_ctx.trans("Tax"))}:</p><p class="text-right text-sm font-semibold text-slate-700 dark:text-slate-300">${ssrInterpolate(unref(formatCurrency)(__props.order.tax || 0))}</p></div><hr class="mb-1 mt-5 border-slate-200 dark:border-slate-600"><div class="flex items-center justify-between gap-x-2"><p class="text-sm text-slate-400">${ssrInterpolate(_ctx.trans("Total"))}:</p><p class="text-sm font-semibold text-slate-700 dark:text-slate-300">${ssrInterpolate(unref(formatCurrency)(__props.order.amount + __props.order.tax || 0))}</p></div></div></div></div></div><p class="py-2 text-center text-sm">${ssrInterpolate(_ctx.trans("Thanks for your Business"))}</p></div></div></main>`);
    };
  }
});
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Investments/Show.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const __vite_glob_0_98 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$G
}, Symbol.toStringTag, { value: "Module" }));
const __default__$v = defineComponent({ layout: _sfc_main$O });
const _sfc_main$F = /* @__PURE__ */ Object.assign(__default__$v, {
  __name: "Create",
  __ssrInlineRender: true,
  props: ["kyc_methods"],
  setup(__props) {
    var _a2, _b2;
    const { kyc_methods } = __props;
    const selectedMethod = ref(kyc_methods[0] ? kyc_methods[0] : {});
    const form = useForm({
      method: (_a2 = selectedMethod.value) == null ? void 0 : _a2.id,
      fields: ((_b2 = selectedMethod.value) == null ? void 0 : _b2.fields) ?? [],
      note: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "KYC verification | User Panel" }, null, _parent));
      _push(`<main class="container flex-grow p-4 sm:p-6"><div class="flex items-center justify-between"><h2 class="main-title">${ssrInterpolate(_ctx.trans("KYC verification"))}</h2>`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("user.kyc.index"),
        class: "btn btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("View my requests"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("View my requests")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="card mx-auto mt-12 xl:w-8/12">`);
      if (__props.kyc_methods.length) {
        _push(`<div class="card-body"><div class="flex gap-2"><!--[-->`);
        ssrRenderList(__props.kyc_methods, (method, index) => {
          _push(`<button type="button" class="${ssrRenderClass([[selectedMethod.value.id == method.id ? "btn-primary" : "border"], "btn"])}">${ssrInterpolate(method.title)}</button>`);
        });
        _push(`<!--]--></div><form class="p-3"><!--[-->`);
        ssrRenderList(unref(form).fields, (field, index) => {
          _push(`<!--[-->`);
          if (field.type == "textarea") {
            _push(`<div class="dash-input-wrapper mb-2"><label>${ssrInterpolate(field.label)}</label><textarea class="textarea">${ssrInterpolate(field.value)}</textarea></div>`);
          } else if (field.type == "file") {
            _push(`<div class="mb-2"><label>${ssrInterpolate(field.label)}</label><input type="file" class="input"></div>`);
          } else {
            _push(`<div class="dash-input-wrapper mb-2"><label${ssrRenderAttr("for", `fields_${index}`)}>${ssrInterpolate(field.label)}</label><input${ssrRenderAttr("type", field.type)}${ssrRenderDynamicModel(field.type, field.value, null)}${ssrRenderAttr("id", `fields_${index}`)} class="input"></div>`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Note"))}</label><textarea rows="4" class="textarea">${ssrInterpolate(unref(form).note)}</textarea></div>`);
        _push(ssrRenderComponent(_sfc_main$2w, {
          processing: unref(form).processing,
          "btn-text": _ctx.trans("Submit")
        }, null, _parent));
        _push(`</form></div>`);
      } else {
        _push(`<div class="py-6 text-center">${ssrInterpolate(_ctx.trans("No remaining items to submit"))}</div>`);
      }
      _push(`</div></main><!--]-->`);
    };
  }
});
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/KYC/Create.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const __vite_glob_0_99 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$F
}, Symbol.toStringTag, { value: "Module" }));
const __default__$u = defineComponent({ layout: _sfc_main$O });
const _sfc_main$E = /* @__PURE__ */ Object.assign(__default__$u, {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["KYCDocuments"],
  setup(__props) {
    const { authUser } = sharedComposable();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "KYC Requests | User Panel" }, null, _parent));
      _push(`<main class="container p-4 sm:p-6">`);
      if (unref(authUser).kyc_verified_at) {
        _push(`<h4 class="text-center"><span class="badge badge-success">${ssrInterpolate(_ctx.trans("Congratulations, You are verified now"))}</span></h4>`);
      } else {
        _push(`<div class="alert alert-info"><p>${ssrInterpolate(_ctx.trans("Profile verification is not completed"))}</p>`);
        _push(ssrRenderComponent(unref(Link), {
          class: "btn btn-primary",
          href: _ctx.route("user.kyc.create")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.trans("Verify KYC"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.trans("Verify KYC")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`<div class="mt-3 card"><div class="card-body"><h2 class="card-title">${ssrInterpolate(_ctx.trans("KYC verification"))}</h2><div class="table-responsive"><table class="table job-alert-table"><thead class="border-0"><tr><th>${ssrInterpolate(_ctx.trans("Method"))}</th><th>${ssrInterpolate(_ctx.trans("Status"))}</th><th>${ssrInterpolate(_ctx.trans("Note"))}</th><th>${ssrInterpolate(_ctx.trans("Documents"))}</th><th>${ssrInterpolate(_ctx.trans("Action"))}</th></tr></thead>`);
      if (__props.KYCDocuments.total) {
        _push(`<tbody class="border-top-0"><!--[-->`);
        ssrRenderList(__props.KYCDocuments.data, (document2, index) => {
          var _a2;
          _push(`<tr><td>${ssrInterpolate(document2.method.title ?? null)}</td><td>`);
          if (document2.status == 0) {
            _push(`<span class="badge badge-warning">${ssrInterpolate(_ctx.trans("Pending"))}</span>`);
          } else if (document2.status == 1) {
            _push(`<span class="badge badge-primary">${ssrInterpolate(_ctx.trans("Approved"))}</span>`);
          } else if (document2.status == 2) {
            _push(`<span class="badge badge-danger">${ssrInterpolate(_ctx.trans("Rejected"))}</span>`);
          } else if (document2.status == 3) {
            _push(`<span class="badge badge-dark">${ssrInterpolate(_ctx.trans("Re-Submitted"))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</td><td>${ssrInterpolate(document2.note)}</td><td>${ssrInterpolate(((_a2 = document2.data) == null ? void 0 : _a2.length) ?? 0)}</td><td class="text-end">`);
          if (document2.status == 2) {
            _push(ssrRenderComponent(unref(Link), {
              class: "py-2 btn btn-dark me-4",
              href: _ctx.route("user.kyc.resubmit", document2.id)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(_ctx.trans("Re Submit"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.trans("Re Submit")), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(ssrRenderComponent(unref(Link), {
            class: "btn btn-primary",
            href: _ctx.route("user.kyc.show", document2.id)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="fas fa-eye"${_scopeId}></i>`);
              } else {
                return [
                  createVNode("i", { class: "fas fa-eye" })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td></tr>`);
        });
        _push(`<!--]--><tr></tr></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table></div></div></div></main><!--]-->`);
    };
  }
});
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/KYC/Index.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const __vite_glob_0_100 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$E
}, Symbol.toStringTag, { value: "Module" }));
const __default__$t = defineComponent({ layout: _sfc_main$O });
const _sfc_main$D = /* @__PURE__ */ Object.assign(__default__$t, {
  __name: "ReSubmit",
  __ssrInlineRender: true,
  props: ["kyc"],
  setup(__props) {
    const { kyc } = __props;
    sharedComposable();
    let form = useForm({
      fields: kyc.fields,
      note: kyc.note
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Re-Submit KYC verification | User Panel" }, null, _parent));
      _push(`<main class="container p-4 sm:p-6"><div class="w-8/12 mx-auto card"><div class="card-body"><h4 class="card-title">${ssrInterpolate(_ctx.trans("Re-Submit KYC"))}</h4><form class="p-3"><!--[-->`);
      ssrRenderList(unref(form).fields, (field, index) => {
        _push(`<!--[-->`);
        if (field.type == "textarea") {
          _push(`<div class="mb-2"><label>${ssrInterpolate(field.label)}</label><textarea class="input">${ssrInterpolate(field.value)}</textarea></div>`);
        } else if (field.type == "file") {
          _push(`<div class="mb-2"><label>${ssrInterpolate(field.label)}</label><input type="file" class="input" required></div>`);
        } else {
          _push(`<div class="mb-2"><label${ssrRenderAttr("for", `fields_${index}`)}>${ssrInterpolate(field.label)}</label><input${ssrRenderAttr("type", field.type)}${ssrRenderDynamicModel(field.type, field.value, null)}${ssrRenderAttr("id", `fields_${index}`)} class="input" required></div>`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--><div class="mb-2"><label>${ssrInterpolate(_ctx.trans("Note"))}</label><textarea rows="4" class="input">${ssrInterpolate(unref(form).note)}</textarea></div>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        type: "submit",
        classes: "btn btn-primary mt-5",
        processing: unref(form).processing,
        "btn-text": _ctx.trans("Submit")
      }, null, _parent));
      _push(`</form></div></div></main><!--]-->`);
    };
  }
});
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/KYC/ReSubmit.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const __vite_glob_0_101 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$D
}, Symbol.toStringTag, { value: "Module" }));
const __default__$s = defineComponent({ layout: _sfc_main$O });
const _sfc_main$C = /* @__PURE__ */ Object.assign(__default__$s, {
  __name: "Show",
  __ssrInlineRender: true,
  props: ["kyc"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "KYC verification | User Panel" }, null, _parent));
      _push(`<main class="container flex-grow p-4 sm:p-6"><div class="card"><div class="card-body"><h2 class="main-title">${ssrInterpolate(_ctx.trans("KYC verification"))}</h2><div class="flex justify-between mt-3 mb-5"><p><strong>${ssrInterpolate(_ctx.trans("Status"))} : </strong>`);
      if (__props.kyc.status == 0) {
        _push(`<span class="badge badge-warning">${ssrInterpolate(_ctx.trans("Pending"))}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.kyc.status == 1) {
        _push(`<span class="badge badge-primary">${ssrInterpolate(_ctx.trans("Approved"))}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.kyc.status == 2) {
        _push(`<span class="badge badge-danger">${ssrInterpolate(_ctx.trans("Rejected"))}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.kyc.status == 3) {
        _push(`<span class="badge badge-dark">${ssrInterpolate(_ctx.trans("Re-Submitted"))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p><p><strong>${ssrInterpolate(_ctx.trans("Submitted At"))}:</strong> ${ssrInterpolate(unref(moment)(__props.kyc.created_at).format("DD MMM, YYYY"))}</p>`);
      if (__props.kyc.status == 2) {
        _push(`<p><strong>${ssrInterpolate(_ctx.trans("Rejected At"))}:</strong> ${ssrInterpolate(unref(moment)(__props.kyc.rejected_at).format("DD MMM, YYYY"))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><table class="table border table-hover"><thead><tr class="bg-light"><th>${ssrInterpolate(_ctx.trans("Requirements"))}</th><th></th></tr></thead><tbody class="border-top"><!--[-->`);
      ssrRenderList(__props.kyc.data, (item) => {
        _push(`<tr><th>${ssrInterpolate(item.label)}</th><td>`);
        if (item.type != "file") {
          _push(`<p>${ssrInterpolate(item.value)}</p>`);
        } else {
          _push(`<a target="_blank"${ssrRenderAttr("href", item.value)} class="btn btn-success">${ssrInterpolate(_ctx.trans("View"))}</a>`);
        }
        _push(`</td></tr>`);
      });
      _push(`<!--]--></tbody></table><div class="mt-5 text-center">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("user.kyc.index", __props.kyc.id),
        class: "btn btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Back to list"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Back to list")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (__props.kyc.status == 2) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("user.kyc.resubmit", __props.kyc.id),
          class: "btn btn-dark"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fas fa-redo"${_scopeId}></i> ${ssrInterpolate(_ctx.trans("Resubmit"))}`);
            } else {
              return [
                createVNode("i", { class: "fas fa-redo" }),
                createTextVNode(" " + toDisplayString(_ctx.trans("Resubmit")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></main><!--]-->`);
    };
  }
});
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/KYC/Show.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const __vite_glob_0_102 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$C
}, Symbol.toStringTag, { value: "Module" }));
const __default__$r = defineComponent({ layout: _sfc_main$O });
const _sfc_main$B = /* @__PURE__ */ Object.assign(__default__$r, {
  __name: "Confirmation",
  __ssrInlineRender: true,
  props: ["method", "wallet", "payout_amount", "userPayoutInfo"],
  setup(__props) {
    const props = __props;
    const { authUser } = sharedComposable();
    const form = useForm({
      otp: null
    });
    const charge = props.method.charge_type == "fixed" ? props.method.fixed_charge : props.method.percent_charge / 100 * props.payout_amount;
    const payout_after_charge = props.payout_amount - charge;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.trans("Payout Confirmation")
      }, null, _parent));
      _push(`<main class="container flex-grow p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        segments: _ctx.segments,
        buttons: _ctx.buttons
      }, null, _parent));
      _push(`<div class="card mx-auto w-8/12"><div class="card-body">`);
      if (__props.wallet > 0) {
        _push(`<div><h5 class="mb-6 flex items-center"><img class="mr-1 w-8" src="/assets/images/money-bag.png" height="30" alt="money"> ${ssrInterpolate(_ctx.trans("Enter Confirmation OTP"))}</h5><form class="mb-5" method="POST"><div class="flex gap-x-2"><input required${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} type="number"${ssrRenderAttr("value", unref(form).otp)}${ssrRenderAttr("placeholder", _ctx.trans("Enter Otp"))} class="input"><button type="submit" class="flex w-10 items-center justify-center rounded-full bg-primary-600"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}><i data-feather="arrow-right"></i></button></div>`);
        if (unref(form).errors.otp) {
          _push(`<small class="text-danger">${ssrInterpolate(unref(form).errors.otp)}</small>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form><div class="alert alert-success"><strong>${ssrInterpolate(_ctx.trans("Hello ") + unref(authUser).name)}</strong>${ssrInterpolate(_ctx.trans(", We have sent you an confirmation OTP code to your email."))}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-5"><h5 class="mb-5 flex items-center gap-x-1"><i data-feather="dollar-sign"></i> ${ssrInterpolate(_ctx.trans("Payment Details"))}</h5><div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><tbody><tr><th>${ssrInterpolate(_ctx.trans("Method name"))}</th><td colspan="4">${ssrInterpolate(__props.method.name)}</td></tr><tr><th>${ssrInterpolate(_ctx.trans("Payout Amount"))}</th><td colspan="4">${ssrInterpolate(__props.payout_amount)}</td></tr><tr><th>${ssrInterpolate(_ctx.trans("Payout Charge"))}</th><td colspan="4">${ssrInterpolate(unref(charge))}</td></tr><tr><th>${ssrInterpolate(_ctx.trans("You Will Receive"))}</th><td colspan="4">${ssrInterpolate(payout_after_charge)}</td></tr><!--[-->`);
      ssrRenderList(__props.userPayoutInfo, (field, index) => {
        _push(`<tr><th>${ssrInterpolate(index)}</th><td colspan="4">${ssrInterpolate(field)}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div></div></main><!--]-->`);
    };
  }
});
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Payout/Confirmation.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const __vite_glob_0_103 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$B
}, Symbol.toStringTag, { value: "Module" }));
const __default__$q = defineComponent({ layout: _sfc_main$O });
const _sfc_main$A = /* @__PURE__ */ Object.assign(__default__$q, {
  __name: "Edit",
  __ssrInlineRender: true,
  props: ["method", "userPayoutInfo", "fields", "segments", "buttons"],
  setup(__props) {
    const props = __props;
    sharedComposable();
    const form = useForm({
      inputs: props.userPayoutInfo.length != 0 ? props.userPayoutInfo : {}
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `${__props.method.name} - Payout Method`
      }, null, _parent));
      _push(`<main class="container flex-grow p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="card mx-auto overflow-x-auto xl:w-7/12"><div class="card-body"><form method="POST"><table class="table"><tbody><tr><th>${ssrInterpolate(_ctx.trans("Method name"))}</th><td>${ssrInterpolate(__props.method.name)}</td><th>${ssrInterpolate(_ctx.trans("Currency"))}</th><td>${ssrInterpolate(__props.method.currency_name)}</td></tr><tr><th>${ssrInterpolate(_ctx.trans("Minimum limit"))}</th><td>${ssrInterpolate(__props.method.min_limit)}</td><th>${ssrInterpolate(_ctx.trans("Maximum limit"))}</th><td>${ssrInterpolate(__props.method.max_limit)}</td></tr><tr><th>${ssrInterpolate(_ctx.trans("Charge type"))}</th><td>${ssrInterpolate(__props.method.charge_type)}</td><th>${ssrInterpolate(_ctx.trans("Charge"))}</th><td>${ssrInterpolate(__props.method.charge_type == "percentage" ? __props.method.percent_charge + "%" : __props.method.fixed_charge + " " + __props.method.currency_name)}</td></tr><tr><th>${ssrInterpolate(_ctx.trans("Maximum Processing Time"))}</th><td>${ssrInterpolate(__props.method.delay)} ${ssrInterpolate(_ctx.trans("Days"))}</td></tr><tr><td colspan="4">${__props.method.instruction}</td></tr></tbody></table><div class="mb-6"><!--[-->`);
      ssrRenderList(__props.fields, (field, index) => {
        _push(`<div class="pt-2"><label>${ssrInterpolate(field.label)} * </label><div class="mt-3">`);
        if (field.type != "textarea") {
          _push(`<input class="input"${ssrRenderDynamicModel(field.type, unref(form).inputs[field.label], null)}${ssrRenderAttr("type", field.type)} required>`);
        } else {
          _push(`<textarea class="textarea" required>${ssrInterpolate(unref(form).inputs[field.label])}</textarea>`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div><button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} type="submit" class="btn btn-primary">${ssrInterpolate(unref(form).processing ? _ctx.trans("Processing...") : _ctx.trans("Save Information"))}</button></form></div></div></main><!--]-->`);
    };
  }
});
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Payout/Edit.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const __vite_glob_0_104 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$A
}, Symbol.toStringTag, { value: "Module" }));
const __default__$p = defineComponent({ layout: _sfc_main$O });
const _sfc_main$z = /* @__PURE__ */ Object.assign(__default__$p, {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["pending_amount", "approved_amount", "methods", "segments", "buttons"],
  setup(__props) {
    const props = __props;
    const { authUser, formatCurrency } = sharedComposable();
    const stats = [
      {
        value: formatCurrency(authUser.value.wallet),
        title: trans("Available Balance"),
        iconClass: "bx bx-dollar"
      },
      {
        value: props.approved_amount,
        title: trans("Pending For Withdraw"),
        iconClass: "bx bx-dollar-circle"
      },
      {
        value: props.approved_amount,
        title: trans("Total Withdrawal Amount"),
        iconClass: "ti ti-thumb-up"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: unref(trans)("Payout Methods")
      }, null, _parent));
      _push(`<main class="container flex-grow p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: stats,
        grid: "3"
      }, null, _parent));
      _push(`<div class="mx-auto mt-10 space-y-4 xl:w-8/12"><!--[-->`);
      ssrRenderList(props.methods, (method) => {
        _push(`<div class="card flex items-center justify-between p-8"><div class="flex items-center gap-x-5"><img${ssrRenderAttrs(mergeProps({
          class: "w-32 rounded",
          alt: ""
        }, ssrGetDirectiveProps(_ctx, _directive_lazy, method.image)))}><div><h4>`);
        if (method.usermethod != null) {
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("user.payout.edit", method.id)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(method.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(method.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<a href="javascript:void(0)">${ssrInterpolate(method.name)}</a>`);
        }
        _push(`</h4><p class="text-sm text-gray-500">${ssrInterpolate(unref(trans)("Payout Limitation: "))} <span class="text-gray-950 dark:text-white">${ssrInterpolate(method.min_limit + " - " + method.max_limit)} ${ssrInterpolate(method.currency_name)}</span></p></div></div><div class="flex gap-x-2">`);
        if (method.usermethod) {
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("user.payout.show", method.id),
            class: "btn btn-success"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="bx bx-plus text-lg"${_scopeId}></i> ${ssrInterpolate(unref(trans)("Make Payout"))}`);
              } else {
                return [
                  createVNode("i", { class: "bx bx-plus text-lg" }),
                  createTextVNode(" " + toDisplayString(unref(trans)("Make Payout")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("user.payout.edit", method.id),
          class: "btn btn-secondary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="bx bx-cog text-lg"${_scopeId}></i> ${ssrInterpolate(unref(trans)("Setup"))}`);
            } else {
              return [
                createVNode("i", { class: "bx bx-cog text-lg" }),
                createTextVNode(" " + toDisplayString(unref(trans)("Setup")), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></main><!--]-->`);
    };
  }
});
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Payout/Index.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const __vite_glob_0_105 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$z
}, Symbol.toStringTag, { value: "Module" }));
const __default__$o = defineComponent({ layout: _sfc_main$O });
const _sfc_main$y = /* @__PURE__ */ Object.assign(__default__$o, {
  __name: "Invoice",
  __ssrInlineRender: true,
  props: ["payout", "userPayoutInfo", "method", "segments", "buttons"],
  setup(__props) {
    sharedComposable();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `${__props.method.name} - Payout Method`
      }, null, _parent));
      _push(`<main class="container flex-grow p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="card mx-auto w-1/2"><div class="card-body"><h5 class="mb-5 flex items-center gap-x-1"><i data-feather="dollar-sign"></i> ${ssrInterpolate(_ctx.trans("Payment Details"))}</h5><div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><tbody><tr><th>${ssrInterpolate(_ctx.trans("Invoice No"))}</th><td colspan="4">${ssrInterpolate(__props.payout.invoice_no)}</td></tr><tr><th>${ssrInterpolate(_ctx.trans("Payout Method"))}</th>`);
      if (__props.method != null) {
        _push(`<td colspan="4">${ssrInterpolate(__props.method.name)}</td>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tr><tr><th>${ssrInterpolate(_ctx.trans("Payout Requested Amount"))}</th><td colspan="4">${ssrInterpolate(__props.payout.amount)}</td></tr><tr><th>${ssrInterpolate(_ctx.trans("Payout Gateway Charge"))}</th><td colspan="4">${ssrInterpolate(__props.payout.charge)}</td></tr><tr><th>${ssrInterpolate(_ctx.trans("Conversion Currency"))}</th><td colspan="4">${ssrInterpolate(__props.payout.currency)}</td></tr><tr><th>${ssrInterpolate(_ctx.trans("Processing Status"))}</th><td colspan="4">${ssrInterpolate(__props.payout.status)}</td></tr><!--[-->`);
      ssrRenderList(__props.userPayoutInfo, (field, index) => {
        _push(`<tr><th>${ssrInterpolate(index)}</th><td colspan="4">${ssrInterpolate(field)}</td></tr>`);
      });
      _push(`<!--]--><tr><th>${ssrInterpolate(_ctx.trans("Requested Date"))}</th><td colspan="4">${ssrInterpolate(__props.payout.created_at_date)}</td></tr></tbody></table></div></div></div></main><!--]-->`);
    };
  }
});
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Payout/Invoice.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const __vite_glob_0_106 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$y
}, Symbol.toStringTag, { value: "Module" }));
const __default__$n = defineComponent({ layout: _sfc_main$O });
const _sfc_main$x = /* @__PURE__ */ Object.assign(__default__$n, {
  __name: "Requests",
  __ssrInlineRender: true,
  props: [
    "payouts",
    "total_approved_requests",
    "total_pending_requests",
    "total_failed_requests",
    "buttons",
    "segments"
  ],
  setup(__props) {
    const props = __props;
    const stats = [
      {
        value: props.total_approved_requests,
        title: trans("Total Complete Requests"),
        iconClass: "bx bx-dollar"
      },
      {
        value: props.total_pending_requests,
        title: trans("Total Pending Requests"),
        iconClass: "bx bx-dollar-circle"
      },
      {
        value: props.total_failed_requests,
        title: trans("Total Cancelled Requests"),
        iconClass: "ti ti-thumb-up"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: unref(trans)("Payout Requests")
      }, null, _parent));
      _push(`<main class="container flex-grow p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Payout Methods",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: stats,
        grid: "3"
      }, null, _parent));
      _push(`<div class="w-12/12 mx-auto mt-10 space-y-5"><!--[-->`);
      ssrRenderList(__props.payouts.data, (payout) => {
        _push(`<div class="card flex items-center justify-between space-y-5 p-6"><div class="flex items-center gap-x-5">`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("user.payout.details", payout.invoice_no)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttrs(mergeProps({
                class: "w-28",
                alt: "image"
              }, ssrGetDirectiveProps(_ctx, _directive_lazy, payout.method != null ? payout.method.image : "")))}${_scopeId}>`);
            } else {
              return [
                withDirectives(createVNode("img", {
                  class: "w-28",
                  alt: "image"
                }, null, 512), [
                  [_directive_lazy, payout.method != null ? payout.method.image : ""]
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div><h6>`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("user.payout.details", payout.invoice_no)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(payout.invoice_no)} - ${ssrInterpolate(payout.method != null ? payout.method.name : "")}`);
            } else {
              return [
                createTextVNode(toDisplayString(payout.invoice_no) + " - " + toDisplayString(payout.method != null ? payout.method.name : ""), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</h6><p class="text-sm">${ssrInterpolate(unref(trans)("Requested at : "))} <span>${ssrInterpolate(payout.created_at_date)}</span></p><div class="capitalize">`);
        if (payout.status == "pending") {
          _push(`<div class="badge badge-warning"><p>${ssrInterpolate(payout.status)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (payout.status == "completed") {
          _push(`<div class="badge badge-success"><p>${ssrInterpolate(payout.status)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (payout.status == "failed") {
          _push(`<div class="badge badge-danger"><p>${ssrInterpolate(payout.status)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("user.payout.details", payout.invoice_no),
          class: "btn btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(trans)("View"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(trans)("View")), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.payouts.links
      }, null, _parent));
      _push(`</main><!--]-->`);
    };
  }
});
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Payout/Requests.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const __vite_glob_0_107 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$x
}, Symbol.toStringTag, { value: "Module" }));
const __default__$m = defineComponent({ layout: _sfc_main$O });
const _sfc_main$w = /* @__PURE__ */ Object.assign(__default__$m, {
  __name: "Show",
  __ssrInlineRender: true,
  props: ["method", "userPayoutInfo", "wallet"],
  setup(__props) {
    const props = __props;
    const { authUser } = sharedComposable();
    const form = useForm({
      amount: props.wallet
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `${__props.method.name} - Payout Method`
      }, null, _parent));
      _push(`<main class="container flex-grow p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, null, null, _parent));
      _push(`<div class="card mx-auto xl:w-9/12"><div class="card-body">`);
      if (__props.wallet > 0) {
        _push(`<div><h5 class="mb-6 flex items-center"><img class="mr-1 w-8" src="/assets/images/money-bag.png" height="30" alt="money"> ${ssrInterpolate(unref(trans)("Enter Amount"))}</h5><form method="POST"><div class="flex gap-x-2"><input class="input"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} type="number"${ssrRenderAttr("value", unref(form).amount)}${ssrRenderAttr("max", unref(authUser).wallet)} step="any"${ssrRenderAttr("placeholder", unref(trans)("Enter Amount"))}><button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} type="submit" class="flex w-10 items-center justify-center rounded-full bg-primary-600"><i data-feather="arrow-right"></i></button></div>`);
        if (unref(form).errors.amount) {
          _push(`<small class="text-danger"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}>${ssrInterpolate(unref(form).errors.amount)}</small>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.wallet < __props.method.min_limit) {
        _push(`<div class="my-8 flex items-center gap-x-4"><img class="w-16" src="/assets/images/sorry.png" alt=""><div><h4>${ssrInterpolate(unref(trans)("I am sorry"))}</h4><p>${ssrInterpolate(unref(trans)("You don't have enough balance for use this payout method."))}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><h3 class="my-8 flex items-start gap-x-4"><img${ssrRenderAttrs(mergeProps({
        class: "w-32",
        height: "30",
        alt: ""
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, __props.method.image)))}> ${ssrInterpolate(unref(trans)("Payout method information"))}</h3><div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><tbody><tr><th>${ssrInterpolate(unref(trans)("Method name"))}</th><td>${ssrInterpolate(__props.method.name)}</td><th>${ssrInterpolate(unref(trans)("Currency"))}</th><td>${ssrInterpolate(__props.method.currency_name)}</td></tr><tr><th>${ssrInterpolate(unref(trans)("Minimum limit"))}</th><td>${ssrInterpolate(__props.method.min_limit)}</td><th>${ssrInterpolate(unref(trans)("Maximum limit"))}</th><td>${ssrInterpolate(__props.method.max_limit)}</td></tr><tr><th>${ssrInterpolate(unref(trans)("Charge type"))}</th><td>${ssrInterpolate(__props.method.charge_type)}</td><th>${ssrInterpolate(unref(trans)("Charge"))}</th><td>${ssrInterpolate(__props.method.charge_type == "percentage" ? __props.method.percent_charge + "%" : __props.method.fixed_charge + " " + __props.method.currency_name)}</td></tr><tr><th>${ssrInterpolate(unref(trans)("Maximum Processing Time"))}</th><td colspan="4">${ssrInterpolate(__props.method.delay)} ${ssrInterpolate(unref(trans)("Days"))}</td></tr></tbody></table></div></div></div></div></main><!--]-->`);
    };
  }
});
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Payout/Show.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const __vite_glob_0_108 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$w
}, Symbol.toStringTag, { value: "Module" }));
const __default__$l = defineComponent({ layout: _sfc_main$O });
const _sfc_main$v = /* @__PURE__ */ Object.assign(__default__$l, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "returnTransactions",
    "total",
    "totalProfited",
    "totalLoss",
    "buttons",
    "segments",
    "type",
    "request"
  ],
  setup(__props) {
    const props = __props;
    const { formatCurrency } = sharedComposable();
    const stats = [
      {
        value: props.total,
        title: trans("Total"),
        iconClass: "bx bxs-grid"
      },
      {
        value: props.totalProfited,
        title: trans("Total Profited"),
        iconClass: "bx bx-bar-chart-alt"
      },
      {
        value: props.totalLoss,
        title: trans("Total Loss"),
        iconClass: "bx bx-line-chart"
      }
    ];
    const selectOptions = [
      {
        label: "Project Title",
        value: "project_title"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, null, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, {
        items: stats,
        grid: "3"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2m, { options: selectOptions }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Project"))}</th><th>${ssrInterpolate(unref(trans)("Duration"))}</th><th>${ssrInterpolate(unref(trans)("Amount"))}</th><th>${ssrInterpolate(unref(trans)("Type"))}</th><th>${ssrInterpolate(unref(trans)("Created At"))}</th></tr></thead>`);
      if (__props.returnTransactions.data != 0) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.returnTransactions.data, (returnTransaction) => {
          var _a2, _b2;
          _push(`<tr><td class="flex items-center"><img${ssrRenderAttrs(mergeProps({ class: "avatar mr-2 rounded" }, ssrGetDirectiveProps(_ctx, _directive_lazy, (_a2 = returnTransaction == null ? void 0 : returnTransaction.project_duration) == null ? void 0 : _a2.project.preview)))}><p>${ssrInterpolate((_b2 = returnTransaction == null ? void 0 : returnTransaction.project_duration) == null ? void 0 : _b2.project.title)}</p></td><td>${ssrInterpolate(returnTransaction == null ? void 0 : returnTransaction.project_duration.duration)}/${ssrInterpolate(returnTransaction == null ? void 0 : returnTransaction.project_duration.duration_type)}</td><td>${ssrInterpolate(unref(formatCurrency)(returnTransaction.amount))}</td><td><span class="${ssrRenderClass([returnTransaction.type == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(returnTransaction.type == 1 ? unref(trans)("Profit") : unref(trans)("Loss"))}</span></td><td>${ssrInterpolate(unref(moment)(returnTransaction.created_at).format("D-MMM-Y"))}</td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table></div>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.returnTransactions.links
      }, null, _parent));
      _push(`</div></main>`);
    };
  }
});
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/ProfitReturn/Index.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const __vite_glob_0_109 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$v
}, Symbol.toStringTag, { value: "Module" }));
const __default__$k = defineComponent({ layout: _sfc_main$O });
const _sfc_main$u = /* @__PURE__ */ Object.assign(__default__$k, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "projects",
    "categories",
    "segments",
    "buttons",
    "request",
    "categories"
  ],
  setup(__props) {
    const props = __props;
    const { pickBy, formatCurrency } = sharedComposable();
    const filterForm = ref({
      category: props.request.search || ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Projects" }, null, _parent));
      _push(`<main class="container flex-grow p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Projects",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="mb-10 grid grid-cols-2 gap-2 sm:grid-cols-5 xl:grid-cols-8"><button class="${ssrRenderClass([{ "outline outline-primary-600": filterForm.value.category == "" }, "card flex h-16 items-center justify-center gap-1 p-2"])}" type="button"><p class="text-sm">${ssrInterpolate(unref(trans)("All"))}</p></button><!--[-->`);
      ssrRenderList(__props.categories, (category) => {
        _push(`<button type="button" class="${ssrRenderClass([{ "outline outline-primary-600": filterForm.value.category == category.slug }, "card flex h-16 items-center justify-center gap-1 p-2"])}"><img${ssrRenderAttrs(mergeProps({
          class: "w-10 rounded",
          alt: "preview"
        }, ssrGetDirectiveProps(_ctx, _directive_lazy, category.preview)))}><p class="text-sm">${ssrInterpolate(category.title)}</p></button>`);
      });
      _push(`<!--]--></div>`);
      if (((_a2 = __props.projects.data) == null ? void 0 : _a2.length) > 0) {
        _push(`<div class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"><!--[-->`);
        ssrRenderList(__props.projects.data, (project, index) => {
          var _a3;
          _push(`<div class="card shadow hover:shadow-lg"><div class="relative h-80 overflow-hidden rounded-t-lg bg-cover bg-center" style="${ssrRenderStyle({
            backgroundImage: `url(${project.cover_image ?? project.preview})`
          })}"><a target="_blank"${ssrRenderAttr("href", `/projects/${project.slug}`)} class="flex h-full w-full flex-col justify-end font-bold"><div class="bg-gradient-to-b from-transparent to-black/80 p-5"><h4 class="text-white">${ssrInterpolate(project.title)}</h4><h6 class="text-white">${ssrInterpolate(project.address)}</h6></div></a></div><div class="p-5"><div class="grid grid-cols-2 gap-8 pb-0"><div><p>${ssrInterpolate(unref(trans)("Profit Range"))}</p><p class="font-bold">${ssrInterpolate(project.min_profit_return)}% - ${ssrInterpolate(project.max_profit_return)}% </p></div><div><p>${ssrInterpolate(unref(trans)("Loss Range"))}</p><p class="font-bold">${ssrInterpolate(project.loss_min_range)}% - ${ssrInterpolate(project.loss_max_range)}%</p></div></div><hr class="my-5 opacity-50"><div class="grid grid-cols-2 gap-8 pt-0"><div><p>${ssrInterpolate(unref(trans)("Invest"))}</p><p class="font-bold">${ssrInterpolate(unref(formatCurrency)(project.invest_amount))}/${ssrInterpolate(unref(trans)("unit"))}</p></div><div><p>${ssrInterpolate(unref(trans)("Units"))}</p><p class="font-bold">${ssrInterpolate(project.total_units)}</p></div><div><p>${ssrInterpolate(unref(trans)("Return For"))}</p><p class="font-bold"><!--[-->`);
          ssrRenderList(project.duration_ranges, (duration, i) => {
            _push(`<!--[-->${ssrInterpolate(duration.duration)} `);
            if (project.duration_ranges.length - 1 !== i) {
              _push(`<!--[-->, <!--]-->`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          });
          _push(`<!--]--></p></div><div><p>${ssrInterpolate(unref(trans)("Category"))}</p><p class="font-bold">${ssrInterpolate((_a3 = project.category) == null ? void 0 : _a3.title)}</p></div></div><div class="mt-6 flex gap-5"><a target="_blank"${ssrRenderAttr("href", `/projects/${project.slug}`)} class="btn btn-primary w-full py-3">${ssrInterpolate(unref(trans)("Invest Now"))}</a></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, null, null, _parent));
      }
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.projects.links
      }, null, _parent));
      _push(`</main><!--]-->`);
    };
  }
});
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Projects/Index.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const __vite_glob_0_110 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$u
}, Symbol.toStringTag, { value: "Module" }));
const __default__$j = defineComponent({ layout: _sfc_main$O });
const _sfc_main$t = /* @__PURE__ */ Object.assign(__default__$j, {
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      subject: "",
      message: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.trans("Create Ticket")
      }, null, _parent));
      _push(`<main class="container flex-grow p-4 sm:p-6"><div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, null, null, _parent));
      _push(`<h2 class="main-title">${ssrInterpolate(_ctx.trans("Create Ticket"))}</h2><div class="flex justify-center"><div class="card card-body w-[700px]"><form><div class="mb-5"><label class="mb-2 label" for="">${ssrInterpolate(_ctx.trans("Subject"))}*</label><input type="text" class="input" placeholder="Subject"${ssrRenderAttr("value", unref(form).subject)}>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.subject
      }, null, _parent));
      _push(`</div><div class="mb-5"><label class="mb-2 label" for="">${ssrInterpolate(_ctx.trans("Message"))}*</label><textarea required class="textarea" placeholder="Write message....">${ssrInterpolate(unref(form).message)}</textarea>`);
      _push(ssrRenderComponent(_sfc_main$24, {
        message: unref(form).errors.message
      }, null, _parent));
      _push(`</div><div class="button-group d-inline-flex align-items-center mt-30">`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        type: "submit",
        classes: "btn btn-primary",
        processing: unref(form).processing,
        "btn-text": "Submit"
      }, null, _parent));
      _push(`</div></form></div></div></div></main><!--]-->`);
    };
  }
});
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Support/Create.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const __vite_glob_0_111 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$t
}, Symbol.toStringTag, { value: "Module" }));
const __default__$i = defineComponent({ layout: _sfc_main$O });
const _sfc_main$s = /* @__PURE__ */ Object.assign(__default__$i, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "segments",
    "buttons",
    "request",
    "supports",
    "pendingSupport",
    "openSupport",
    "closedSupport",
    "totalSupports",
    "type"
  ],
  setup(__props) {
    const props = __props;
    const supportStats = [
      { value: props.totalSupports, title: trans("Total Supports") },
      { value: props.pendingSupport, title: trans("Pending Supports") },
      { value: props.openSupport, title: trans("Open Supports") },
      { value: props.closedSupport, title: trans("Closed Supports") }
    ];
    function limitedString(text, maxLength) {
      if (text.length <= maxLength) {
        return text;
      } else {
        return text.substring(0, maxLength) + "...";
      }
    }
    const filterOptions = [
      {
        label: "User Email",
        value: "email"
      },
      {
        label: "Ticket No",
        value: "ticket"
      },
      {
        label: "Subject",
        value: "subject"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, null, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_sfc_main$2s, { items: supportStats }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2m, { options: filterOptions }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Ticket No"))}</th><th>${ssrInterpolate(unref(trans)("Subject"))}</th><th>${ssrInterpolate(unref(trans)("Conversations"))}</th><th>${ssrInterpolate(unref(trans)("Status"))}</th><th>${ssrInterpolate(unref(trans)("User"))}</th><th>${ssrInterpolate(unref(trans)("Created At"))}</th><th>${ssrInterpolate(unref(trans)("Ticket"))}</th></tr></thead>`);
      if (__props.supports.total) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.supports.data, (support) => {
          var _a2;
          _push(`<tr><td class="text-center">${ssrInterpolate(support.ticket_no)}</td><td><a class="text-dark"${ssrRenderAttr("href", "/user/supports/" + support.id)}>${ssrInterpolate(limitedString(support.subject, 50))}</a></td><td class="text-center">${ssrInterpolate(support.conversations_count)}</td><td><span class="${ssrRenderClass(
            support.status == 2 ? "badge badge-warning" : support.status == 1 ? "badge badge-success" : "badge badge-danger"
          )}">${ssrInterpolate(unref(trans)(support.status == 2 ? "pending" : support.status == 1 ? "Open" : "Closed"))}</span></td><td class="text-center"><a${ssrRenderAttr("href", "/admin/customer/" + support.user_id)} class="text-dark">${ssrInterpolate(((_a2 = support.user) == null ? void 0 : _a2.name) ?? "")}</a></td><td class="text-center">${ssrInterpolate(unref(moment)(support.created_at).format("d MMM y"))}</td><td>`);
          _push(ssrRenderComponent(unref(Link), {
            href: "/user/supports/" + support.id,
            class: "btn btn-primary btn-sm"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(trans)("View Ticket"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(trans)("View Ticket")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table>`);
      if (__props.supports.data.length != 0) {
        _push(ssrRenderComponent(_sfc_main$2n, {
          links: __props.supports.links
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></main>`);
    };
  }
});
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Support/Index.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const __vite_glob_0_112 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$s
}, Symbol.toStringTag, { value: "Module" }));
const __default__$h = defineComponent({ layout: _sfc_main$O });
const _sfc_main$r = /* @__PURE__ */ Object.assign(__default__$h, {
  __name: "Show",
  __ssrInlineRender: true,
  props: ["segments", "buttons", "support"],
  setup(__props) {
    const props = __props;
    const form = ref({
      message: "",
      status: props.support.status
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c, _d;
      const _directive_lazy = resolveDirective("lazy");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container flex-grow p-4 sm:pr-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Support",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-6 h-fit"><div class="h-full"><div class="relative mx-auto bg-white shadow rounded-primary dark:bg-slate-800 2xl:w-8/12"><div class="flex items-center justify-between p-4 border-b rounded-t-primary border-b-slate-200 dark:border-b-slate-600"><div class="flex items-center justify-start gap-x-3"><button id="chat-btn-show-sidebar" class="text-slate-500 hover:text-slate-700 focus:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:text-slate-300 xl:hidden"><i width="20" height="20" data-feather="menu"></i></button><div class="avatar avatar-circle avatar-indicator avatar-indicator-online"><img${ssrRenderAttrs(mergeProps({
        class: "avatar-img",
        alt: "profile-img"
      }, ssrGetDirectiveProps(
        _ctx,
        _directive_lazy,
        ((_a2 = __props.support.user) == null ? void 0 : _a2.avatar) ? (_b2 = __props.support.user) == null ? void 0 : _b2.avatar : `https://ui-avatars.com/api/?name=${(_c = __props.support.user) == null ? void 0 : _c.name}`
      )))}></div><div><h6 class="text-sm font-medium whitespace-nowrap text-slate-700 dark:text-slate-100">${ssrInterpolate((_d = __props.support.user) == null ? void 0 : _d.name)}</h6><p class="text-sm font-normal whitespace-normal text-slate-500 dark:text-slate-400">${ssrInterpolate(_ctx.trans("Subject :"))} ${ssrInterpolate(__props.support.subject ?? "")}</p></div></div></div><div class="relative max-h-[calc(100vh-18rem)] overflow-auto px-4 pb-28 md:max-h-[calc(100vh-17rem)]" data-simplebar><ul class="space-y-3"><!--[-->`);
      ssrRenderList(__props.support.conversations, (reply) => {
        _push(`<li class="${ssrRenderClass([reply.is_admin == 0 ? "pr" : "", "mt-5 group"])}"><div class="flex gap-x-3 group-[.pr]:flex-row-reverse"><div class="avatar avatar-circle avatar-sm shrink-0"><img${ssrRenderAttrs(mergeProps({
          class: "avatar-img",
          onerror: "this.src = '/images/avatar1.png'",
          alt: "profile-img"
        }, ssrGetDirectiveProps(
          _ctx,
          _directive_lazy,
          reply.user.avatar ? reply.user.avatar : `https://ui-avatars.com/api/?name=${reply.user.name}`
        )))}></div><div class="flex max-w-sm flex-col items-start gap-y-2 group-[.pr]:items-end"><p class="rounded-primary rounded-tl-none bg-slate-100 p-2 text-sm text-slate-600 group-[.pr]:rounded-tl-primary group-[.pr]:rounded-tr-none group-[.pr]:bg-primary-500 group-[.pr]:text-slate-100 dark:bg-slate-700 dark:text-slate-300">${ssrInterpolate(reply.comment)}</p><span class="text-xs font-normal text-slate-400">${ssrInterpolate(unref(moment)(reply.created_at).format("D MMM, YYYY"))}</span></div></div></li>`);
      });
      _push(`<!--]--></ul><div id="chat-scroll-view"></div></div><div class="absolute bottom-[-0.5px] left-0 right-0 z-10 rounded-b-primary bg-white py-4 dark:bg-slate-800">`);
      if (__props.support.status === 1) {
        _push(`<form class="mx-4 flex h-[4.5rem] items-center rounded-primary border border-slate-200 shadow dark:border-slate-600"><input${ssrRenderAttr("value", form.value.message)} class="w-full h-full px-4 text-sm bg-transparent border-transparent text-slate-700 placeholder:text-slate-500 focus:border-transparent focus:ring-0 dark:text-slate-300 dark:placeholder:text-slate-400" type="text" placeholder="Type your message here"><div class="flex items-center justify-end px-4 gap-x-4"><button type="submit"${ssrIncludeBooleanAttr(form.value.processing) ? " disabled" : ""} class="btn btn-sm btn-primary"><i width="18" height="18" data-feather="send"></i><span class="hidden md:inline-block">${ssrInterpolate(_ctx.trans("Send"))}</span></button></div></form>`);
      } else {
        _push(`<div class="font-bold text-center text-red-400">${ssrInterpolate(_ctx.trans("You can't not send reply"))}</div>`);
      }
      _push(`</div></div><div id="chat-overlay" class="absolute inset-0 z-10 hidden w-full h-full transition-colors duration-300 ease-in-out bg-black bg-opacity-0 xl:hidden"></div></div></div></main>`);
    };
  }
});
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Support/Show.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const __vite_glob_0_113 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$r
}, Symbol.toStringTag, { value: "Module" }));
const __default__$g = defineComponent({ layout: _sfc_main$O });
const _sfc_main$q = /* @__PURE__ */ Object.assign(__default__$g, {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["histories", "segments", "buttons", "request", "walletBalance"],
  setup(__props) {
    const props = __props;
    const { formatCurrency, getQueryParams } = sharedComposable();
    onMounted(() => {
      drawer.init();
    });
    const form = useForm({
      amount: ""
    });
    const counter = ref(0);
    const targetValue = props.walletBalance;
    const initialIncrement = Math.round(targetValue * 0.0221);
    const regularIncrement = Math.round(targetValue * 0.0341);
    const initialIncrementPercentage = 2e-3;
    const intervalDuration = () => {
      if (targetValue < 500) {
        return 70;
      } else if (targetValue > 500) {
        return 50;
      }
    };
    const updateCounter = () => {
      if (counter.value + regularIncrement > targetValue) {
        return counter.value = targetValue;
      }
      if (counter.value < targetValue * initialIncrementPercentage) {
        counter.value += initialIncrement;
      } else if (counter.value < targetValue) {
        counter.value += regularIncrement;
      }
    };
    const interval = setInterval(updateCounter, intervalDuration());
    onBeforeUnmount(() => {
      clearInterval(interval);
    });
    const filterOptions = [
      {
        label: "Tnx No",
        value: "tnx"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Transaction Histories" }, null, _parent));
      _push(`<main class="container flex-grow p-4 sm:p-6">`);
      _push(ssrRenderComponent(_sfc_main$2F, {
        title: "Deposit Histories",
        segments: __props.segments,
        buttons: __props.buttons
      }, null, _parent));
      _push(`<div class="space-y-2"><div class="card mb-4 flex h-40 items-center justify-center"><h3>${ssrInterpolate(unref(trans)("Wallet Balance"))}: ${ssrInterpolate(unref(formatCurrency)(counter.value))}</h3></div>`);
      _push(ssrRenderComponent(_sfc_main$2m, { options: filterOptions }, null, _parent));
      _push(`<div class="table-responsive whitespace-nowrap rounded-primary"><table class="table"><thead><tr><th>${ssrInterpolate(unref(trans)("Invoice No"))}</th><th>${ssrInterpolate(unref(trans)("Gateway"))}</th><th>${ssrInterpolate(unref(trans)("Trx"))}</th><th>${ssrInterpolate(unref(trans)("Amount"))}</th><th>${ssrInterpolate(unref(trans)("Status"))}</th><th>${ssrInterpolate(unref(trans)("Created At"))}</th></tr></thead>`);
      if (__props.histories.total) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(__props.histories.data, (history) => {
          var _a2;
          _push(`<tr><td>${ssrInterpolate(history.invoice_no ?? "-")}</td><td>${ssrInterpolate((_a2 = history.gateway) == null ? void 0 : _a2.name)}</td><td>${ssrInterpolate(history.payment_id)}</td><td>${ssrInterpolate(unref(formatCurrency)(history.amount))}</td><td class="text-left"><span class="${ssrRenderClass([history.status == 1 ? "badge-success" : "badge-danger", "badge"])}">${ssrInterpolate(history.status == 1 ? unref(trans)("Active") : unref(trans)("Draft"))}</span></td><td>${ssrInterpolate(unref(moment)(history.created_at).format("DD-MMM-YYYY"))}</td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2r, { "for-table": "true" }, null, _parent));
      }
      _push(`</table>`);
      _push(ssrRenderComponent(_sfc_main$2n, {
        links: __props.histories.links
      }, null, _parent));
      _push(`</div></div></main><div id="makeDepositDrawer" class="drawer drawer-right"><form><div class="drawer-header"><h5>${ssrInterpolate(unref(trans)("Make deposit"))}</h5><button type="button" class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700" data-dismiss="drawer"><i data-feather="x" width="1.5rem" height="1.5rem"></i></button></div><div class="drawer-body"><div class="mb-2"><label>${ssrInterpolate(unref(trans)("Deposit Amount"))}</label><input${ssrRenderAttr("value", unref(form).amount)} type="text" class="input" placeholder="enter deposit amount" required></div></div><div class="drawer-footer"><div class="flex items-center space-x-4"><button type="button" class="btn btn-secondary w-full" data-dismiss="drawer"><span>${ssrInterpolate(unref(trans)("Close"))}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        classes: "w-full btn btn-primary",
        processing: unref(form).processing,
        "btn-text": unref(trans)("Continue")
      }, null, _parent));
      _push(`</div></div></form></div><!--]-->`);
    };
  }
});
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Wallet/Index.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const __vite_glob_0_114 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$q
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$p = {
  __name: "Blank",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$Z, null, null, _parent));
      _push(ssrRenderComponent(ValidationErrors, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Blank.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const __default__$f = defineComponent({ layout: _sfc_main$p });
const _sfc_main$o = /* @__PURE__ */ Object.assign(__default__$f, {
  __name: "Payment",
  __ssrInlineRender: true,
  props: [
    "gateways",
    "total",
    "invoice_data",
    "error",
    "minMax",
    "user",
    "logo",
    "minMaxMessage"
  ],
  setup(__props) {
    var _a2;
    const props = __props;
    const { formatCurrency } = sharedComposable();
    const activeGateway = ref(((_a2 = props.gateways[0]) == null ? void 0 : _a2.id) || 0);
    ref(null);
    const manualPayment = ref({
      image: null,
      comment: ""
    });
    const form = useForm({});
    return (_ctx, _push, _parent, _attrs) => {
      var _a3, _b2;
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.trans("Payment")
      }, null, _parent));
      _push(`<div class="payment-container flex h-screen items-center justify-center"><div class="payment-content"><div class="payment-header"><img${ssrRenderAttrs(mergeProps({
        alt: "logo",
        class: "mb-3"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, (_b2 = (_a3 = _ctx.$page.props) == null ? void 0 : _a3.primaryData) == null ? void 0 : _b2.deep_logo)))}><span class="status">${ssrInterpolate(_ctx.trans("Unpaid"))}</span></div>`);
      if (__props.error) {
        _push(`<div class="payment-error-alert"><div><i class="fas fa-sad-tear"></i><strong>${ssrInterpolate(_ctx.trans("!Opps "))}</strong> ${ssrInterpolate(_ctx.trans("Transaction failed if you make payment successfully please contact us."))}</div><button type="button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="28" height="28"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.minMax) {
        _push(`<div class="payment-error-alert"><div><i class="fas fa-sad-tear"></i><strong>${ssrInterpolate(_ctx.trans("!Opps "))}</strong> ${ssrInterpolate(__props.minMaxMessage)}</div><button type="button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="28" height="28"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="gateways"><!--[-->`);
      ssrRenderList(__props.gateways, (gateway) => {
        _push(`<button class="${ssrRenderClass({ "payment-border": activeGateway.value == gateway.id })}"><div style="${ssrRenderStyle(activeGateway.value == gateway.id ? null : { display: "none" })}"><svg class="active-gateway" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd"></path></svg></div><img${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_lazy, gateway.logo))}></button>`);
      });
      _push(`<!--]--></div><!--[-->`);
      ssrRenderList(__props.gateways, (gateway) => {
        _push(`<div style="${ssrRenderStyle(activeGateway.value === gateway.id ? null : { display: "none" })}" class="gateway-form"${ssrRenderAttr("id", "gateway-form" + gateway.id)}><form method="post" enctype="multipart/form-data"><table class="payment-table"><tr><td>${ssrInterpolate(_ctx.trans("Method Name: "))}</td><td class="text-center">${ssrInterpolate(gateway.name)}</td></tr>`);
        if (gateway.currency != null) {
          _push(`<tr><td>${ssrInterpolate(_ctx.trans("Gateway Currency: "))}</td><td class="text-center">${ssrInterpolate(gateway.currency)}</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        if (gateway.charge != 0) {
          _push(`<tr><td>${ssrInterpolate(_ctx.trans("Gateway Charge: "))}</td><td class="text-center">${ssrInterpolate(unref(formatCurrency)(gateway.charge))}</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<tr><td>${ssrInterpolate(_ctx.trans("Payable Amount: "))}</td><td class="text-center">${ssrInterpolate(unref(formatCurrency)(__props.total * gateway.multiply + gateway.charge))}</td></tr></table>`);
        if (gateway.comment != null) {
          _push(`<!--[--><p class="payment-label"><b>${ssrInterpolate(_ctx.trans("Payment Instruction: "))}</b></p><p class="payment-instruction">${ssrInterpolate(gateway.comment)}</p><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (gateway.phone_required == 1) {
          _push(`<div><label class="payment-label"><b>${ssrInterpolate(_ctx.trans("Your phone number"))}</b></label><input type="number" name="phone" placeholder="Your phone number" class="payment-input" required${ssrRenderAttr("value", __props.user.phone)}></div>`);
        } else {
          _push(`<!---->`);
        }
        if (gateway.is_auto == 0) {
          _push(`<!--[--><div class="payment-file-input"><label class="payment-label"><b>${ssrInterpolate(_ctx.trans("Submit your payment proof"))}</b></label><input type="file" name="image" required accept="image/*"></div><div><label class="payment-label"><b>${ssrInterpolate(_ctx.trans("Comment"))}</b></label><textarea class="payment-textarea" required name="comment" placeholder="comment" maxlength="500">${ssrInterpolate(manualPayment.value.comment)}</textarea></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} type="submit" class="payment-pay-btn">${ssrInterpolate(_ctx.trans("Pay Now"))}</button></form></div>`);
      });
      _push(`<!--]--><br><div class="payment-invoice"><div class="payment-border"><b>${ssrInterpolate(_ctx.trans("Invoiced To"))}</b><br> ${ssrInterpolate(__props.user.name)}<br> ${ssrInterpolate(__props.user.address)}</div><div class="payment-border"><b>${ssrInterpolate(_ctx.trans("Pay To"))}</b><br> ${ssrInterpolate(__props.invoice_data.company_name)} <br> ${ssrInterpolate(__props.invoice_data.address)}, ${ssrInterpolate(__props.invoice_data.city)} <br> ${ssrInterpolate(__props.invoice_data.post_code)}, ${ssrInterpolate(__props.invoice_data.country)}</div></div><div class="text-center">`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("user.wallet-transactions.index"),
        class: "payment-cancel-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Cancel Payment"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Cancel Payment")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Wallet/Payment.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const __vite_glob_0_115 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$o
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$n = {
  __name: "AboutSection",
  __ssrInlineRender: true,
  setup(__props) {
    var _a2;
    const about_section = ((_a2 = usePage().props.primaryData) == null ? void 0 : _a2.about_section) ?? {};
    const getParsedText = (text, className = "shape-bg") => {
      if (text && text.length) {
        return text.replace(/{(.*?)}/g, `<span class="${className}">$1</span>`);
      }
      return text;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a3, _b2, _c, _d;
      const _directive_lazy = resolveDirective("lazy");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "about-area section-padding" }, _attrs))}><div class="container"><div class="grid grid-cols-12 gap-[30px]"><div class="col-span-12 lg:col-span-6 xl:col-span-7"><img${ssrRenderAttrs(mergeProps({
        alt: "",
        class: "block w-full"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, unref(about_section).image)))}></div><div class="col-span-12 lg:col-span-6 xl:col-span-5"><div class="mini-title">${ssrInterpolate((_a3 = unref(about_section)) == null ? void 0 : _a3.top_title)}</div><h4 class="column-title"><div>${getParsedText(((_b2 = unref(about_section)) == null ? void 0 : _b2.title) ?? "")}</div></h4><div class="mb-8">${ssrInterpolate((_c = unref(about_section)) == null ? void 0 : _c.text)}</div><div class="space-y-8"><!--[-->`);
      ssrRenderList(((_d = unref(about_section)) == null ? void 0 : _d.features) ?? [], (feature, index) => {
        _push(`<div class="progressbar-group"><div class="flex justify-between"${ssrRenderAttr("data-width", `${feature.percent}%`)}><span class="block mb-2 font-semibold text-black">${ssrInterpolate(feature.text)}</span><span class="block mb-2 font-semibold text-black">${ssrInterpolate(feature.percent)}%</span></div><div class="relative h-[6px] overflow-hidden rounded-[2px] bg-black bg-opacity-10"><div class="ani absolute left-0 top-1/2 block h-[6px] -translate-y-1/2"${ssrRenderAttr("data-progress", feature.percent)} style="${ssrRenderStyle({
          backgroundColor: feature.color ?? "#ff0000"
        })}"></div></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Web/Partials/AboutSection.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const __vite_glob_0_129 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$n
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$m = {
  __name: "AchievementSection",
  __ssrInlineRender: true,
  setup(__props) {
    var _a2;
    const achievement = ((_a2 = usePage().props.primaryData) == null ? void 0 : _a2.achievement) ?? {};
    const getParsedText = (text, className = "shape-bg") => {
      if (text && text.length) {
        return text.replace(/{(.*?)}/g, `<span class="${className}">$1</span>`);
      }
      return text;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "section-padding" }, _attrs))}><div class="container"><div class="text-center"><div class="mini-title">${ssrInterpolate(unref(achievement).top_title)}</div><div class="column-title">${getParsedText(unref(achievement).title)}</div></div><div class="grid grid-cols-1 gap-[30px] pt-10 md:grid-cols-2 xl:grid-cols-4"><!--[-->`);
      ssrRenderList(unref(achievement).counters ?? [], (item) => {
        _push(`<div class="shadow-box7 relative my-4 rounded-[8px] bg-white px-[50px] pb-8 pt-[64px] text-center"><img${ssrRenderAttrs(mergeProps({
          alt: "",
          class: "absolute -translate-x-1/2 -top-10 left-1/2"
        }, ssrGetDirectiveProps(_ctx, _directive_lazy, item.icon ?? "/assets/images/icon/counter-1.svg")))}><h4 class="mb-1 text-[44px] font-bold leading-[66px] text-black"><span class="counter">${ssrInterpolate(item.counter)}</span></h4><p>${ssrInterpolate(item.text)}</p></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Web/Partials/AchievementSection.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const __vite_glob_0_130 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$m
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$l = {
  __name: "WhyChoose",
  __ssrInlineRender: true,
  setup(__props) {
    var _a2;
    const why_choose = ((_a2 = usePage().props.primaryData) == null ? void 0 : _a2.why_choose) ?? {};
    const getParsedText = (text, className = "text-primary") => {
      if (text && text.length) {
        return text.replace(/{(.*?)}/g, `<span class="${className}">$1</span>`);
      }
      return text;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "about-area section-padding bg-[url('../images/all-img/section-bg-8.png')] bg-cover bg-center bg-no-repeat" }, _attrs))}><div class="container"><div class="grid-cols-12 space-y-6 lg:grid lg:gap-10 lg:space-y-0"><div class="col-span-12 lg:col-span-6 xl:col-span-5"><div class="mini-title">${ssrInterpolate(unref(why_choose).top_title)}</div><h4 class="column-title">${getParsedText(unref(why_choose).title, "shape-bg")}</h4><div class="mb-8">${ssrInterpolate(unref(why_choose).text)}</div><div><div class="grid grid-cols-1 gap-[30px] md:block lg:grid-cols-2"><!--[-->`);
      ssrRenderList(unref(why_choose).features, (item) => {
        _push(`<div class="p-6 bg-white rounded shadow-box7"><div><img${ssrRenderAttrs(mergeProps({ alt: "" }, ssrGetDirectiveProps(_ctx, _directive_lazy, item.icon)))}></div><div class="mt-3 font-semibold leading-[27px] text-black">${ssrInterpolate(item.text)}</div></div>`);
      });
      _push(`<!--]--></div></div></div><div class="col-span-12 lg:col-span-6 xl:col-span-7"><img${ssrRenderAttrs(mergeProps({
        alt: "",
        class: "block object-contain w-full"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, unref(why_choose).image)))}></div></div></div></div>`);
    };
  }
};
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Web/Partials/WhyChoose.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const __vite_glob_0_131 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$l
}, Symbol.toStringTag, { value: "Module" }));
const __default__$e = defineComponent({ layout: _sfc_main$Y });
const _sfc_main$k = /* @__PURE__ */ Object.assign(__default__$e, {
  __name: "About",
  __ssrInlineRender: true,
  props: ["about", "primary", "faqs", "teamMembers"],
  setup(__props) {
    onMounted(() => {
      $(document).ready(function() {
        $(".progressbar-group .ani").each(function() {
          $(this).animate(
            {
              width: $(this).attr("data-progress") + "%"
            },
            1e3
          );
        });
        var dataWidth = document.querySelectorAll("[data-width]");
        dataWidth.forEach(function(item) {
          item.style.maxWidth = item.getAttribute("data-width");
        });
        $(".accrodain-button").on("click", function() {
          var element = $(this).parent("li");
          if (element.hasClass("open")) {
            element.removeClass("open");
            element.find("li").removeClass("open");
            element.find(".content").slideUp(200);
          } else {
            element.addClass("open");
            element.children(".content").slideDown(200);
            element.siblings("li").children(".content").slideUp();
            element.siblings("li").removeClass("open");
            element.siblings("li").find("li").removeClass("open");
            element.siblings("li").find(".content").slideUp();
          }
        });
      });
    });
    const getParsedText = (text, className = "shape-bg") => {
      if (text && text.length) {
        return text.replace(/{(.*?)}/g, `<span class="${className}">$1</span>`);
      }
      return text;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j;
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[--><div class="breadcrumbs section-padding bg-[url(&#39;../images/all-img/bred.png&#39;)] bg-cover bg-center bg-no-repeat"><div class="container text-center"><h2>${ssrInterpolate(_ctx.trans("About Us"))}</h2><nav><ol class="flex items-center justify-center space-x-3"><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_Link, { href: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item">-</li><li class="text-primary">${ssrInterpolate(_ctx.trans("About Us"))}</li></ol></nav></div></div>`);
      _push(ssrRenderComponent(_sfc_main$n, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$l, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$m, null, null, _parent));
      _push(`<div class="section-padding bg-[url(&#39;../images/all-img/section-bg-16.png&#39;)] bg-cover bg-no-repeat"><div class="container"><div class="grid grid-cols-12 gap-6 lg:gap-10"><div class="col-span-12 xl:col-span-7 lg:col-span-6"><img${ssrRenderAttrs(mergeProps({
        alt: "",
        draggable: "false"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, (_a2 = __props.about.testimonial) == null ? void 0 : _a2.image)))}></div><div class="flex flex-col justify-center col-span-12 xl:col-span-5 lg:col-span-6"><div class="mini-title">${ssrInterpolate((_b2 = __props.about.testimonial) == null ? void 0 : _b2.top_title)}</div><h4 class="column-title">${ssrInterpolate((_c = __props.about.testimonial) == null ? void 0 : _c.title)}</h4><div>${ssrInterpolate((_d = __props.about.testimonial) == null ? void 0 : _d.text)}</div><div class="mt-12"><a${ssrRenderAttr("href", (_e = __props.about.testimonial) == null ? void 0 : _e.btn_link)} class="btn btn-primary">${ssrInterpolate((_f = __props.about.testimonial) == null ? void 0 : _f.btn_text)}</a></div></div></div></div></div><div class="section-padding"><div class="container"><div class="text-center"><div class="mini-title">${ssrInterpolate(_ctx.trans("Team Member"))}</div><div class="column-title">${ssrInterpolate(_ctx.trans("Our Expert"))} <span class="shape-bg">${ssrInterpolate(_ctx.trans("Team"))}</span></div></div><div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] pt-10"><!--[-->`);
      ssrRenderList(__props.teamMembers, (user) => {
        var _a3, _b3, _c2;
        _push(`<div class="bg-white shadow-box3 rounded-[8px] transition-all duration-100 pt-10 pb-[28px] px-6 text-center hover:shadow-box4 border-t-4 border-transparent hover:border-secondary"><div class="w-[170px] h-[170px] rounded-full relative mx-auto mb-8"><img${ssrRenderAttrs(mergeProps({
          alt: "",
          class: "object-cover w-full h-full rounded-full"
        }, ssrGetDirectiveProps(_ctx, _directive_lazy, user.preview)))}></div><div class="course-content"><h4 class="mb-1 font-bold lg:text-2xl text-1xl">${ssrInterpolate(user.name)}</h4><div>${ssrInterpolate(user.position)}</div><ul class="flex justify-center pt-6 space-x-4"><li><a${ssrRenderAttr("href", (_a3 = user.socials) == null ? void 0 : _a3.facebook)} class="flex flex-col items-center justify-center w-10 h-10 text-2xl transition rounded bg-red-paste text-primary hover:bg-primary hover:text-white"><iconify-icon icon="bxl:facebook"></iconify-icon></a></li><li><a${ssrRenderAttr("href", (_b3 = user.socials) == null ? void 0 : _b3.twitter)} class="flex flex-col items-center justify-center w-10 h-10 text-2xl transition rounded bg-green-paste text-secondary hover:bg-secondary hover:text-white"><iconify-icon icon="bxl:twitter"></iconify-icon></a></li><li><a${ssrRenderAttr("href", (_c2 = user.socials) == null ? void 0 : _c2.linkedin)} class="h-10 w-10 rounded bg-[#EEE8FF] text-#8861DB flex flex-col justify-center items-center text-2xl transition hover:bg-[#8861DB] hover:text-white"><iconify-icon icon="bxl:linkedin"></iconify-icon></a></li></ul></div></div>`);
      });
      _push(`<!--]--></div></div></div><div class="section-padding bg-white bg-[url(&#39;../images/all-img/section-bg-15.png&#39;)] bg-bottom bg-cover bg-no-repeat"><div class="container"><div class="grid lg:grid-cols-2 grid-cols-1 gap-[30px]"><div><div class="mini-title">${ssrInterpolate((_g = __props.about.faq) == null ? void 0 : _g.top_title)}</div><div class="column-title">${getParsedText(((_h = __props.about.faq) == null ? void 0 : _h.top_title) ?? "")}</div><ul class="list accrodains space-y-[30px] lg:max-w-[470px]"><!--[-->`);
      ssrRenderList(__props.faqs, (item) => {
        _push(`<li><button type="button" class="accrodain-button"><span>${ssrInterpolate(item.title)}</span><span class="icon-pm"></span></button><div class="hidden content">${ssrInterpolate(item.text)}</div></li>`);
      });
      _push(`<!--]--></ul></div><div><img${ssrRenderAttrs(mergeProps({
        alt: "",
        class: "mx-auto"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, (_j = (_i = __props.about) == null ? void 0 : _i.faq) == null ? void 0 : _j.image)))}></div></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Web/About.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const __vite_glob_0_116 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$k
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$j = {
  __name: "Sidebar",
  __ssrInlineRender: true,
  props: ["categories", "tags", "recent_blogs", "request", "category"],
  setup(__props) {
    var _a2;
    const props = __props;
    const { textExcerpt } = sharedComposable();
    const form = useForm({
      s: ((_a2 = props.request) == null ? void 0 : _a2.s) ?? ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "col-span-12 lg:col-span-4" }, _attrs))}><div class="sidebarWrapper space-y-[30px]"><div class="wdiget widget_search"><form><div class="bg-[#F8F8F8] flex rounded-md shadow-e1 items-center py-[4px] pl-3 relative"><div class="flex-1"><input type="text"${ssrRenderAttr("value", unref(form).s)} placeholder="Search keyword..." class="bg-transparent border-none focus:ring-0"></div><div class="flex-none"><button class="btn btn-primary"><img src="/assets/images/icon/search.svg" alt=""></button></div></div></form></div><div class="wdiget widget_catagory"><h4 class="widget-title">${ssrInterpolate(_ctx.trans("Categories"))}</h4><ul class="space-y-4 list-item"><!--[-->`);
      ssrRenderList(__props.categories, (cat) => {
        var _a3;
        _push(`<li class="block">`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("blog-categories.show", cat.slug),
          class: ["flex justify-between bg-[#F8F8F8] py-[17px] px-5 rounded hover:bg-primary hover:text-white transition-all duration-150", [((_a3 = __props.category) == null ? void 0 : _a3.id) == cat.id ? "bg-primary text-white" : "bg-[#F8F8F8]"]]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>${ssrInterpolate(cat.title)} (${ssrInterpolate(cat.blogs_count)})</span><span class="text-2xl"${_scopeId}><iconify-icon icon="heroicons:chevron-right-20-solid"${_scopeId}></iconify-icon></span>`);
            } else {
              return [
                createVNode("span", null, toDisplayString(cat.title) + " (" + toDisplayString(cat.blogs_count) + ")", 1),
                createVNode("span", { class: "text-2xl" }, [
                  createVNode("iconify-icon", { icon: "heroicons:chevron-right-20-solid" })
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div><div class="wdiget widget-recent-post"><h4 class="widget-title">${ssrInterpolate(_ctx.trans("Recent Blogs"))}</h4><ul class="list"><!--[-->`);
      ssrRenderList(__props.recent_blogs, (blog) => {
        _push(`<li class="flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b"><div class="flex-none"><div class="w-20 h-20 rounded">`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("blogs.show", blog.slug)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttrs(mergeProps({
                alt: "",
                class: "object-cover w-full h-full rounded"
              }, ssrGetDirectiveProps(_ctx, _directive_lazy, blog.preview.value)))}${_scopeId}>`);
            } else {
              return [
                withDirectives(createVNode("img", {
                  alt: "",
                  class: "object-cover w-full h-full rounded"
                }, null, 512), [
                  [_directive_lazy, blog.preview.value]
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div><div class="flex-1"><div class="mb-1 font-semibold text-black">`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("blogs.show", blog.slug)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(textExcerpt)(blog.title, 35))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(textExcerpt)(blog.title, 35)), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("blogs.show", blog.slug),
          class: "font-semibold text-secondary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.trans("Read More"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.trans("Read More")), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></li>`);
      });
      _push(`<!--]--></ul></div><div class="wdiget"><h4 class="widget-title">${ssrInterpolate(_ctx.trans("Popular Tags"))}</h4><ul class="flex flex-wrap"><!--[-->`);
      ssrRenderList(__props.tags, (tag) => {
        var _a3;
        _push(`<li class="mb-2 mr-2">`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("blog-tags.show", tag.slug),
          class: ["px-3 py-1 text-base transition-all duration-150 rounded hover:bg-primary hover:text-white", [((_a3 = __props.category) == null ? void 0 : _a3.id) == tag.id ? "bg-primary text-white" : "bg-[#F8F8F8]"]]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(tag.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(tag.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div></div>`);
    };
  }
};
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Web/Blogs/Inc/Sidebar.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const __vite_glob_0_117 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$j
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$i = {
  __name: "WebPagination",
  __ssrInlineRender: true,
  props: ["links"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      if (__props.links.links.length > 3) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "pagination mt-14" }, _attrs))}><ul class="flex justify-center space-x-3"><li class="inline-flex">`);
        if (__props.links.prev_page_url) {
          _push(ssrRenderComponent(_component_Link, {
            href: __props.links.prev_page_url ?? "#",
            class: "flex w-12 h-12 flex-col items-center justify-center bg-[#ECECEC] rounded font-semibold hover:bg-primary hover:text-white"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<iconify-icon icon="heroicons:chevron-double-left-20-solid" class="text-2xl"${_scopeId}></iconify-icon>`);
              } else {
                return [
                  createVNode("iconify-icon", {
                    icon: "heroicons:chevron-double-left-20-solid",
                    class: "text-2xl"
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</li><!--[-->`);
        ssrRenderList(__props.links.links.slice(1, -1), (link) => {
          _push(`<li class="inline-flex">`);
          _push(ssrRenderComponent(_component_Link, {
            href: link.url,
            class: ["flex flex-col items-center justify-center w-12 h-12 font-semibold transition-colors border rounded border-primary hover:bg-primary hover:text-white", link.active ? "bg-primary text-white" : "text-primary"]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(link.label)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(link.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--><li class="inline-flex">`);
        if (__props.links.next_page_url) {
          _push(ssrRenderComponent(_component_Link, {
            href: __props.links.next_page_url ?? "#",
            class: "flex w-12 h-12 flex-col items-center justify-center bg-[#ECECEC] rounded font-semibold hover:bg-primary hover:text-white"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<iconify-icon icon="heroicons:chevron-double-right-20-solid" class="text-2xl"${_scopeId}></iconify-icon>`);
              } else {
                return [
                  createVNode("iconify-icon", {
                    icon: "heroicons:chevron-double-right-20-solid",
                    class: "text-2xl"
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</li></ul></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/WebPagination.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const __default__$d = defineComponent({ layout: _sfc_main$Y });
const _sfc_main$h = /* @__PURE__ */ Object.assign(__default__$d, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "blogs",
    "categories",
    "tags",
    "recent_blogs",
    "category",
    "request"
  ],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[--><div class="breadcrumbs section-padding bg-[url(&#39;../images/all-img/bred.png&#39;)] bg-cover bg-center bg-no-repeat"><div class="container text-center"><h2>${ssrInterpolate(_ctx.trans("Blogs"))}</h2><nav><ol class="flex items-center justify-center space-x-3"><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_Link, { href: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item">-</li><li class="text-primary">`);
      _push(ssrRenderComponent(_component_Link, { href: "/blogs" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Blogs"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Blogs")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li>`);
      if (__props.category) {
        _push(`<!--[--><li class="breadcrumb-item">-</li><li class="text-primary">${ssrInterpolate((_a2 = __props.category) == null ? void 0 : _a2.title)}</li><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</ol></nav></div></div><div class="nav-tab-wrapper tabs section-padding"><div class="container"><div class="grid grid-cols-12 gap-[30px]"><div class="col-span-12 lg:col-span-8"><div class="grid md:grid-cols-2 grid-cols-1 gap-[30px]"><!--[-->`);
      ssrRenderList(__props.blogs.data, (post) => {
        _push(`<div class="bg-white shadow-box12 rounded-[8px] transition duration-100 hover:shadow-box13"><div class="course-thumb h-[260px] rounded-t-[8px] relative">`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("blogs.show", post.slug)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttrs(mergeProps({
                alt: "",
                class: "w-full h-full object-cover rounded-t-[8px]"
              }, ssrGetDirectiveProps(_ctx, _directive_lazy, post.image)))}${_scopeId}><span class="absolute px-3 py-1 text-lg font-semibold text-white rounded bg-secondary left-6 top-6"${_scopeId}>${ssrInterpolate(post.category_name)}</span>`);
            } else {
              return [
                withDirectives(createVNode("img", {
                  alt: "",
                  class: "w-full h-full object-cover rounded-t-[8px]"
                }, null, 512), [
                  [_directive_lazy, post.image]
                ]),
                createVNode("span", { class: "absolute px-3 py-1 text-lg font-semibold text-white rounded bg-secondary left-6 top-6" }, toDisplayString(post.category_name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="p-8 course-content"><div class="flex mb-5 space-x-5 lg:space-x-10">`);
        _push(ssrRenderComponent(_component_Link, {
          class: "flex items-center space-x-2",
          href: _ctx.route("blogs.show", post.slug)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img src="/assets/images/svg/calender.svg" alt=""${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(moment)(post.created_at).format("MMM DD, YYYY"))}</span>`);
            } else {
              return [
                createVNode("img", {
                  src: "/assets/images/svg/calender.svg",
                  alt: ""
                }),
                createVNode("span", null, toDisplayString(unref(moment)(post.created_at).format("MMM DD, YYYY")), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><h4 class="mb-5 text-xl font-bold">`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("blogs.show", post.slug),
          class: "transition duration-150 hover:text-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(post.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(post.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</h4>`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("blogs.show", post.slug),
          class: "font-semibold text-black transition duration-150 hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.trans("Read More"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.trans("Read More")), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_sfc_main$i, { links: __props.blogs }, null, _parent));
      if (!__props.blogs.total) {
        _push(`<h3 class="text-center">${ssrInterpolate(_ctx.trans("No blogs found"))}</h3>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$j, {
        categories: __props.categories,
        category: __props.category ?? {},
        tags: __props.tags,
        request: __props.request,
        recent_blogs: __props.recent_blogs
      }, null, _parent));
      _push(`</div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Web/Blogs/Index.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const __vite_glob_0_118 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$h
}, Symbol.toStringTag, { value: "Module" }));
const __default__$c = defineComponent({ layout: _sfc_main$Y });
const _sfc_main$g = /* @__PURE__ */ Object.assign(__default__$c, {
  __name: "Show",
  __ssrInlineRender: true,
  props: [
    "blog",
    "categories",
    "tags",
    "recent_blogs",
    "category",
    "request",
    "prevPost",
    "nextPost"
  ],
  setup(__props) {
    const { textExcerpt, socialShare } = sharedComposable();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[--><div class="breadcrumbs section-padding bg-[url(&#39;../images/all-img/bred.png&#39;)] bg-cover bg-center bg-no-repeat"><div class="container text-center"><h2>${ssrInterpolate(__props.blog.title)}</h2><nav><ol class="flex items-center justify-center space-x-3"><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_Link, { href: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item">-</li><li class="text-primary">${ssrInterpolate(_ctx.trans("Blog"))}</li></ol></nav></div></div><div class="nav-tab-wrapper tabs section-padding"><div class="container"><div class="grid grid-cols-12 gap-[30px]"><div class="col-span-12 lg:col-span-8"><div class="bg-[#F8F8F8] rounded-md"><img${ssrRenderAttrs(mergeProps({
        alt: "",
        class: "mb-10 rounded-t-md"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, __props.blog.image)))}><div class="px-10 pb-10"><div class="flex flex-wrap mt-6 mb-6 space-x-5 xl:space-x-10"><a class="flex items-center space-x-2" href="#"><img src="/assets/images/svg/calender.svg" alt=""><span>${ssrInterpolate(unref(moment)(__props.blog.created_at).format("MMM DD, YYYY"))}</span></a></div><h3>${ssrInterpolate(__props.blog.title)}</h3><div class="text-justify">${__props.blog.content}</div><div class="grid grid-cols-1 gap-5 mt-8 xl:grid-cols-2 md:mt-14"><ul class="flex items-center space-x-3"><li class="font-semibold text-black">${ssrInterpolate(_ctx.trans("Tags"))}:</li><!--[-->`);
      ssrRenderList(__props.blog.tags, (tag) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("blog-tags.show", tag.slug),
          class: "px-3 py-1 bg-white rounded hover:text-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(tag.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(tag.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul><ul class="flex items-center space-x-3 xl:justify-end"><li class="font-semibold text-black">${ssrInterpolate(_ctx.trans("Share On"))}:</li><!--[-->`);
      ssrRenderList(["facebook", "twitter", "pinterest", "instagram"], (media) => {
        _push(`<li><a target="_blank"${ssrRenderAttr("href", unref(socialShare)(media))} class="flex w-10 h-10"><img${ssrRenderAttrs(mergeProps({
          alt: media + " icon"
        }, ssrGetDirectiveProps(_ctx, _directive_lazy, `/assets/images/icon/${media}.svg`)))}></a></li>`);
      });
      _push(`<!--]--></ul></div><div class="grid xl:grid-cols-2 grid-cols-1 gap-[30px] md:mt-14 mt-8">`);
      if (__props.prevPost) {
        _push(ssrRenderComponent(_component_Link, {
          class: "flex p-5 space-x-4 bg-white rounded shadow-box7",
          href: _ctx.route("blogs.show", __props.prevPost.slug)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex-none"${_scopeId}><div class="w-20 h-20 rounded"${_scopeId}><img${ssrRenderAttrs(mergeProps({
                alt: "",
                class: "object-cover w-full h-full rounded"
              }, ssrGetDirectiveProps(_ctx, _directive_lazy, __props.prevPost.image)))}${_scopeId}></div></div><div class="flex-1"${_scopeId}><span class="mb-1 text-base text-primary"${_scopeId}>${ssrInterpolate(_ctx.trans("Prev Post"))}</span><div class="mb-1 font-semibold text-black"${_scopeId}>${ssrInterpolate(unref(textExcerpt)(__props.prevPost.title, 35))}</div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex-none" }, [
                  createVNode("div", { class: "w-20 h-20 rounded" }, [
                    withDirectives(createVNode("img", {
                      alt: "",
                      class: "object-cover w-full h-full rounded"
                    }, null, 512), [
                      [_directive_lazy, __props.prevPost.image]
                    ])
                  ])
                ]),
                createVNode("div", { class: "flex-1" }, [
                  createVNode("span", { class: "mb-1 text-base text-primary" }, toDisplayString(_ctx.trans("Prev Post")), 1),
                  createVNode("div", { class: "mb-1 font-semibold text-black" }, toDisplayString(unref(textExcerpt)(__props.prevPost.title, 35)), 1)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.nextPost) {
        _push(ssrRenderComponent(_component_Link, {
          class: "flex flex-row-reverse p-5 bg-white rounded shadow-box7",
          href: _ctx.route("blogs.show", __props.nextPost.slug)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex-none"${_scopeId}><div class="w-20 h-20 ml-4 rounded"${_scopeId}><img${ssrRenderAttrs(mergeProps({
                alt: "",
                class: "object-cover w-full h-full rounded"
              }, ssrGetDirectiveProps(_ctx, _directive_lazy, __props.nextPost.image)))}${_scopeId}></div></div><div class="flex-1 text-right"${_scopeId}><span class="mb-1 text-base text-primary"${_scopeId}>${ssrInterpolate(_ctx.trans("Next Post"))}</span><div class="mb-1 font-semibold text-black"${_scopeId}>${ssrInterpolate(unref(textExcerpt)(__props.nextPost.title, 25))}</div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex-none" }, [
                  createVNode("div", { class: "w-20 h-20 ml-4 rounded" }, [
                    withDirectives(createVNode("img", {
                      alt: "",
                      class: "object-cover w-full h-full rounded"
                    }, null, 512), [
                      [_directive_lazy, __props.nextPost.image]
                    ])
                  ])
                ]),
                createVNode("div", { class: "flex-1 text-right" }, [
                  createVNode("span", { class: "mb-1 text-base text-primary" }, toDisplayString(_ctx.trans("Next Post")), 1),
                  createVNode("div", { class: "mb-1 font-semibold text-black" }, toDisplayString(unref(textExcerpt)(__props.nextPost.title, 25)), 1)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$j, {
        categories: __props.categories,
        tags: __props.tags,
        request: __props.request,
        recent_blogs: __props.recent_blogs
      }, null, _parent));
      _push(`</div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Web/Blogs/Show.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const __vite_glob_0_119 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$g
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$f = {
  __name: "InputError",
  __ssrInlineRender: true,
  props: {
    message: {
      type: String
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: __props.message ? null : { display: "none" }
      }, _attrs))}><p class="text-sm text-red-600 dark:text-red-400">${ssrInterpolate(__props.message)}</p></div>`);
    };
  }
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/InputError.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const __default__$b = defineComponent({ layout: _sfc_main$Y });
const _sfc_main$e = /* @__PURE__ */ Object.assign(__default__$b, {
  __name: "Contact",
  __ssrInlineRender: true,
  setup(__props) {
    const primaryData = usePage().props.primaryData;
    const form = useForm({
      email: "",
      name: "",
      subject: "",
      message: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[--><div class="breadcrumbs section-padding bg-[url(&#39;../images/all-img/bred.png&#39;)] bg-cover bg-center bg-no-repeat"><div class="container text-center"><h2>${ssrInterpolate(unref(trans)("Contact Us"))}</h2><nav><ol class="flex items-center justify-center space-x-3"><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_Link, { href: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(trans)("Home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(trans)("Home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item">-</li><li class="text-primary">${ssrInterpolate(unref(trans)("Contact Us"))}</li></ol></nav></div></div><div class="nav-tab-wrapper tabs section-padding"><div class="container"><div class="grid grid-cols-12 gap-[30px]"><div class="col-span-12 lg:col-span-6 xl:col-span-5"><div class="mini-title">${ssrInterpolate(unref(trans)("Contact Us"))}</div><h4 class="column-title">${ssrInterpolate(unref(trans)("Get In Touch"))} <span class="shape-bg">${ssrInterpolate(unref(trans)("Today"))}</span></h4><div>${ssrInterpolate(unref(trans)(
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered."
      ))}</div><ul class="list-item space-y-6 pt-8"><li class="flex"><div class="mr-6 flex-none"><div class=""><img src="/assets/images/svg/mail.svg" alt="" class=""></div></div><div class="flex-1"><h4 class="mb-1 text-lg lg:text-xl">${ssrInterpolate(unref(trans)("Email-Us"))} :</h4><div>${ssrInterpolate(unref(primaryData).contact_email)}</div></div></li><li class="flex"><div class="mr-6 flex-none"><div class=""><img src="/assets/images/svg/call.svg" alt="" class=""></div></div><div class="flex-1"><h4 class="mb-1 text-lg lg:text-xl">${ssrInterpolate(unref(trans)("Call Us"))}:</h4><div>${ssrInterpolate(unref(primaryData).contact_phone)}</div></div></li><li class="flex"><div class="mr-6 flex-none"><div class=""><img src="/assets/images/svg/map.svg" alt="" class=""></div></div><div class="flex-1"><h4 class="mb-1 text-lg lg:text-xl">${ssrInterpolate(unref(trans)("Office"))} :</h4><div>${ssrInterpolate(unref(primaryData).address)}</div></div></li></ul></div><div class="col-span-12 lg:col-span-6 xl:col-span-7"><div class="shadow-box7 rounded-md bg-white p-8"><form><div class="mt-6 grid grid-cols-1 gap-[30px] md:grid-cols-2"><div><input type="text"${ssrRenderAttr("value", unref(form).name)} class="from-control" placeholder="Name*">`);
      _push(ssrRenderComponent(_sfc_main$f, {
        message: unref(form).errors.name
      }, null, _parent));
      _push(`</div><div><input type="email"${ssrRenderAttr("value", unref(form).email)} class="from-control" placeholder="Email*">`);
      _push(ssrRenderComponent(_sfc_main$f, {
        message: unref(form).errors.email
      }, null, _parent));
      _push(`</div><div class="col-span-full"><input type="text"${ssrRenderAttr("value", unref(form).subject)} class="from-control" placeholder="Subject">`);
      _push(ssrRenderComponent(_sfc_main$f, {
        message: unref(form).errors.subject
      }, null, _parent));
      _push(`</div><div class="col-span-1 md:col-span-2"><textarea class="from-control" placeholder="Your Message*" rows="5">${ssrInterpolate(unref(form).message)}</textarea>`);
      _push(ssrRenderComponent(_sfc_main$f, {
        message: unref(form).errors.message
      }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_sfc_main$2w, {
        processing: unref(form).processing,
        "btn-text": unref(trans)("Send Message"),
        classes: "btn btn-primary flex gap-1 mt-[30px]"
      }, null, _parent));
      _push(`</form></div></div></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Web/Contact.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const __vite_glob_0_120 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$e
}, Symbol.toStringTag, { value: "Module" }));
const __default__$a = defineComponent({ layout: _sfc_main$Y });
const _sfc_main$d = /* @__PURE__ */ Object.assign(__default__$a, {
  __name: "CustomPage",
  __ssrInlineRender: true,
  props: ["info", "faqs", "about"],
  setup(__props) {
    const getParsedText = (text, className = "shape-bg") => {
      if (text && text.length) {
        return text.replace(/{(.*?)}/g, `<span class="${className}">$1</span>`);
      }
      return text;
    };
    onMounted(() => {
      $(document).ready(function() {
        $(".progressbar-group .ani").each(function() {
          $(this).animate(
            {
              width: $(this).attr("data-progress") + "%"
            },
            1e3
          );
        });
        var dataWidth = document.querySelectorAll("[data-width]");
        dataWidth.forEach(function(item) {
          item.style.maxWidth = item.getAttribute("data-width");
        });
        $(".accrodain-button").on("click", function() {
          var element = $(this).parent("li");
          if (element.hasClass("open")) {
            element.removeClass("open");
            element.find("li").removeClass("open");
            element.find(".content").slideUp(200);
          } else {
            element.addClass("open");
            element.children(".content").slideDown(200);
            element.siblings("li").children(".content").slideUp();
            element.siblings("li").removeClass("open");
            element.siblings("li").find("li").removeClass("open");
            element.siblings("li").find(".content").slideUp();
          }
        });
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c, _d, _e;
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: __props.info.title
      }, null, _parent));
      _push(`<div class="breadcrumbs section-padding bg-[url(&#39;../images/all-img/bred.png&#39;)] bg-cover bg-center bg-no-repeat"><div class="container text-center"><h2>${ssrInterpolate(__props.info.title)}</h2><nav><ol class="flex items-center justify-center space-x-3"><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_Link, { href: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item">-</li><li class="text-primary">${ssrInterpolate(__props.info.title)}</li></ol></nav></div></div><section class="container my-10"><div>${(_a2 = __props.info.description) == null ? void 0 : _a2.value}</div><br></section><div class="section-padding bg-white bg-[url(&#39;../images/all-img/section-bg-15.png&#39;)] bg-bottom bg-cover bg-no-repeat"><div class="container"><div class="grid lg:grid-cols-2 grid-cols-1 gap-[30px]"><div><div class="mini-title">${ssrInterpolate((_b2 = __props.about.faq) == null ? void 0 : _b2.top_title)}</div><div class="column-title">${getParsedText(((_c = __props.about.faq) == null ? void 0 : _c.top_title) ?? "")}</div><ul class="list accrodains space-y-[30px] lg:max-w-[470px]"><!--[-->`);
      ssrRenderList(__props.faqs, (item) => {
        _push(`<li><button type="button" class="accrodain-button"><span>${ssrInterpolate(item.title)}</span><span class="icon-pm"></span></button><div class="hidden content">${ssrInterpolate(item.text)}</div></li>`);
      });
      _push(`<!--]--></ul></div><div><img${ssrRenderAttrs(mergeProps({
        alt: "",
        class: "mx-auto"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, (_e = (_d = __props.about) == null ? void 0 : _d.faq) == null ? void 0 : _e.image)))}></div></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Web/CustomPage.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const __vite_glob_0_121 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$d
}, Symbol.toStringTag, { value: "Module" }));
const __default__$9 = defineComponent({ layout: _sfc_main$Y });
const _sfc_main$c = /* @__PURE__ */ Object.assign(__default__$9, {
  __name: "Book",
  __ssrInlineRender: true,
  props: ["event", "bookings", "authBookings", "isExpired", "isBooked", "status"],
  setup(__props) {
    const props = __props;
    const { formatCurrency, authUser } = sharedComposable();
    const selectedSeat = ref([]);
    props.event.seat_limit ?? 1;
    const isFull = computed(() => {
      return props.bookings.length >= props.event.total_seat;
    });
    const loading = ref(false);
    const book = () => {
      if (selectedSeat.value.length == 0) {
        notify.danger(trans(`Please choose one or more seat!`));
        return;
      }
      loading.value = true;
      router.put(
        route("events.update", props.event),
        { selected_seats: selectedSeat.value, seat_no: selectedSeat.value },
        {
          onSuccess: () => {
            loading.value = false;
            selectedSeat.value = [];
            if (props.event.is_free) {
              notify.success(trans("Your booking request has been submitted successfully"));
            }
          }
        }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: __props.event.title
      }, null, _parent));
      _push(`<section class="container mb-20 mt-5"><h3>${ssrInterpolate(unref(trans)("Booking Seat for"))}: `);
      _push(ssrRenderComponent(_component_Link, {
        class: "text-primary",
        href: _ctx.route("events.show", __props.event)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.event.title)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.event.title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3><div class="mb-5 mt-5 flex flex-wrap justify-center gap-2"><!--[-->`);
      ssrRenderList(__props.event.total_seat, (seat, index) => {
        _push(`<div class="${ssrRenderClass([{
          "bg-black text-white": __props.bookings.includes(seat) && !__props.authBookings.includes(seat),
          "bg-green-500 text-white": __props.authBookings.includes(seat),
          "cursor-pointer hover:border-red-600": !__props.bookings.includes(seat),
          "bg-primary text-white": selectedSeat.value.includes(seat)
        }, "flex h-16 w-20 items-center justify-center rounded border border-gray-300 p-1 text-sm"])}">${ssrInterpolate(`${__props.event.seat_prefix ?? "seat - "} ${seat}`)}</div>`);
      });
      _push(`<!--]--></div>`);
      if (__props.isExpired) {
        _push(`<h4 class="text-danger text-center">${ssrInterpolate(unref(trans)("Opps! No Seat Available"))}</h4>`);
      } else if (isFull.value) {
        _push(`<h4 class="text-danger text-center">${ssrInterpolate(unref(trans)("Opps! No Seat Available"))}</h4>`);
      } else if (!unref(authUser)) {
        _push(`<div class="text-center">`);
        _push(ssrRenderComponent(_component_Link, {
          class: "btn btn-primary",
          href: "/login"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(trans)("Login "))} ${ssrInterpolate(unref(trans)("to book"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(trans)("Login ")) + " " + toDisplayString(unref(trans)("to book")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (__props.isBooked) {
        _push(`<div class="text-center"><p class="mb-3">${ssrInterpolate(unref(trans)("Already booked!"))}</p>`);
        if (__props.status === 1) {
          _push(`<a${ssrRenderAttr("href", _ctx.route("events.book.ticket", __props.event))} class="btn btn-primary rounded-full py-2">${ssrInterpolate(unref(trans)("Download Ticket"))}</a>`);
        } else if (__props.status === 2) {
          _push(`<p class="text-bold">${ssrInterpolate(unref(trans)("Your request is under pending please wait for admin approval"))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else if (!__props.event.is_free) {
        _push(`<div class="text-center"><button class="btn btn-primary"${ssrIncludeBooleanAttr(!selectedSeat.value.length) ? " disabled" : ""}>${ssrInterpolate(unref(trans)("Pay"))} ${ssrInterpolate(unref(formatCurrency)(__props.event.fee_amount * selectedSeat.value.length))} ${ssrInterpolate(unref(trans)("to book"))}</button></div>`);
      } else {
        _push(`<div class="flex justify-center">`);
        _push(ssrRenderComponent(_sfc_main$2w, {
          onClick: book,
          processing: loading.value,
          "btn-text": unref(trans)("Book Now")
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</section><!--]-->`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Web/Events/Book.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __vite_glob_0_122 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$c
}, Symbol.toStringTag, { value: "Module" }));
const __default__$8 = defineComponent({ layout: _sfc_main$Y });
const _sfc_main$b = /* @__PURE__ */ Object.assign(__default__$8, {
  __name: "BookSuccess",
  __ssrInlineRender: true,
  props: ["event", "seat_no", "status"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: __props.event.title
      }, null, _parent));
      _push(`<section class="container mb-20 mt-5"><div class="text-center"><h3 class="text-primary">${ssrInterpolate(unref(trans)("Congratulations !"))}</h3><p>${ssrInterpolate(unref(trans)(`Selected seats has been booked successfully`))}</p><div class="mb-5 mt-8">`);
      if (__props.status === 1) {
        _push(`<a${ssrRenderAttr("href", _ctx.route("events.book.ticket", __props.event))} class="btn : rounded-full bg-[#EEE8FF] py-3 hover:bg-[#9681d2] hover:text-white">${ssrInterpolate(unref(trans)("Download Ticket"))}</a>`);
      } else if (__props.status === 2) {
        _push(`<p class="text-bold">${ssrInterpolate(unref(trans)("Your request is under pending please wait for admin approval"))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mt-6">`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("events.show", __props.event),
        class: "text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(trans)("Back to Event"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(trans)("Back to Event")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><!--]-->`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Web/Events/BookSuccess.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __vite_glob_0_123 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$b
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$a = {
  __name: "NiceSelect",
  __ssrInlineRender: true,
  props: {
    options: [Array, Object],
    modelValue: [String, Number],
    label: String,
    extendedLabel: String,
    valueBy: {
      type: [String, Number]
    },
    placeholder: {
      type: String,
      default: "Select Value"
    }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit }) {
    const props = __props;
    const isOpen = ref(false);
    const selectedOption = ref(null);
    const selectedOptionText = ref(props.placeholder);
    const selectContainer = ref(null);
    const findSelectOptionText = computed(() => {
      var _a2, _b2;
      if (props.valueBy) {
        return (_a2 = props.options) == null ? void 0 : _a2.find((op) => op[props.valueBy] === props.modelValue);
      } else {
        return (_b2 = props.options) == null ? void 0 : _b2.find((op) => op === props.modelValue);
      }
    });
    const displaySelectedOptionText = computed(() => {
      if (findSelectOptionText.value) {
        return findSelectOptionText.value[props.label] || findSelectOptionText.value;
      } else {
        return selectedOptionText.value;
      }
    });
    watch(
      () => props.modelValue,
      (newVal) => {
        if (newVal == "" || newVal == null) {
          selectedOptionText.value = props.placeholder;
        }
      }
    );
    const outsideClick = (event) => {
      if (isOpen.value && !selectContainer.value.contains(event.target)) {
        isOpen.value = false;
      }
    };
    onMounted(() => {
      document.addEventListener("click", outsideClick);
    });
    onUnmounted(() => {
      document.removeEventListener("click", outsideClick);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["nice-select", { open: isOpen.value }]
      }, _attrs))}><div class="current me-2">${ssrInterpolate(displaySelectedOptionText.value)}</div><ul class="list"><!--[-->`);
      ssrRenderList(__props.options, (option, index) => {
        _push(`<li class="${ssrRenderClass([{
          "selected focus": selectedOption.value && (option[__props.valueBy] == selectedOption.value || option === selectedOption.value)
        }, "option"])}">${ssrInterpolate(__props.label ? option[__props.label] : option)} `);
        if (__props.extendedLabel) {
          _push(`<!--[-->${ssrInterpolate(__props.extendedLabel)}<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]-->`);
      if (((_a2 = __props.options) == null ? void 0 : _a2.length) < 1) {
        _push(`<li class="option">${ssrInterpolate(_ctx.trans("empty"))}</li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</ul></div>`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/NiceSelect.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __default__$7 = defineComponent({ layout: _sfc_main$Y });
const _sfc_main$9 = /* @__PURE__ */ Object.assign(__default__$7, {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["events"],
  setup(__props) {
    const filterForm = useForm({
      order_by: "Latest"
    });
    const filter = () => {
      filterForm.get(route("events.index"), {
        preserveScroll: true,
        preserveState: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[--><div class="breadcrumbs section-padding bg-[url(&#39;../images/all-img/bred.png&#39;)] bg-cover bg-center bg-no-repeat"><div class="container text-center"><h2>${ssrInterpolate(_ctx.trans("Events"))}</h2><nav><ol class="flex items-center justify-center space-x-3"><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_Link, { href: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item">-</li><li class="text-primary">${ssrInterpolate(_ctx.trans("Events"))}</li></ol></nav></div></div><div class="nav-tab-wrapper tabs section-padding"><div class="container">`);
      if (__props.events.data.length > 0) {
        _push(`<div class="flex items-center mb-14"><div class="flex items-center flex-1 space-x-6"><span>${ssrInterpolate(_ctx.trans("Showing"))} ${ssrInterpolate(__props.events.to)} ${ssrInterpolate(_ctx.trans("events of"))} ${ssrInterpolate(__props.events.total)}</span></div><div class="flex-0"><div class="min-w-[272px]">`);
        _push(ssrRenderComponent(_sfc_main$a, {
          modelValue: unref(filterForm).order_by,
          "onUpdate:modelValue": ($event) => unref(filterForm).order_by = $event,
          options: ["new", "old"],
          onChange: ($event) => filter(),
          placeholder: "Sort By"
        }, null, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">`);
      if (__props.events.data.length > 0) {
        _push(`<!--[-->`);
        ssrRenderList(__props.events.data, (event) => {
          _push(`<div class="bg-white shadow-box5 rounded-[8px] transition duration-100 hover:shadow-box3"><div class="course-thumb h-[297px] rounded-t-[8px] relative">`);
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("events.show", event.slug)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img${ssrRenderAttrs(mergeProps({
                  alt: "",
                  class: "w-full h-full object-cover rounded-t-[8px]"
                }, ssrGetDirectiveProps(_ctx, _directive_lazy, event.preview)))}${_scopeId}>`);
              } else {
                return [
                  withDirectives(createVNode("img", {
                    alt: "",
                    class: "w-full h-full object-cover rounded-t-[8px]"
                  }, null, 512), [
                    [_directive_lazy, event.preview]
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><div class="p-8 course-content"><h4 class="mb-5 text-xl font-bold">`);
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("events.show", event.slug),
            class: "transition duration-150 hover:text-primary"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(event.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(event.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</h4><ul class="mb-6 space-y-3 list"><li class="flex space-x-2"><span class="text-lg text-secondary"><iconify-icon icon="heroicons:calendar-days"></iconify-icon></span><span>${ssrInterpolate(unref(moment)(event.start_at).format("ddd, MMM D, Y | ") + event.start_at_time.time)}</span></li><li class="flex space-x-2"><span class="text-lg text-secondary"><iconify-icon icon="heroicons:map-pin"></iconify-icon></span><span>${ssrInterpolate(event.location)}</span></li></ul>`);
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("events.show", event.slug),
            class: "btn px-8 py-[11px] bg-black text-white hover:bg-primary"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(_ctx.trans("View Details"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(_ctx.trans("View Details")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="bg-white col-span-3 text-center rounded-[8px] transition duration-100"><div class="p-8 course-content"><h4 class="mb-5 text-xl font-bold">${ssrInterpolate(_ctx.trans("No events found"))}</h4></div></div>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$i, { links: __props.events }, null, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Web/Events/Index.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __vite_glob_0_124 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$9
}, Symbol.toStringTag, { value: "Module" }));
const __default__$6 = defineComponent({ layout: _sfc_main$p });
const _sfc_main$8 = /* @__PURE__ */ Object.assign(__default__$6, {
  __name: "Payment",
  __ssrInlineRender: true,
  props: [
    "seat_no",
    "event",
    "gateways",
    "tax",
    "total",
    "invoice_data",
    "error",
    "minMax",
    "user",
    "logo",
    "minMaxMessage"
  ],
  setup(__props) {
    var _a2;
    const props = __props;
    const { formatCurrency } = sharedComposable();
    const activeGateway = ref(((_a2 = props.gateways[0]) == null ? void 0 : _a2.id) || 0);
    ref(null);
    const manualPayment = ref({
      image: null,
      comment: ""
    });
    const form = useForm({});
    return (_ctx, _push, _parent, _attrs) => {
      var _a3, _b2;
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.trans("Payment")
      }, null, _parent));
      _push(`<div class="payment-container"><div class="payment-content"><div class="payment-header"><img${ssrRenderAttrs(mergeProps({
        alt: "logo",
        class: "mb-3"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, (_b2 = (_a3 = _ctx.$page.props) == null ? void 0 : _a3.primaryData) == null ? void 0 : _b2.deep_logo)))}><span class="status">${ssrInterpolate(_ctx.trans("Unpaid"))}</span></div>`);
      if (__props.error) {
        _push(`<div class="payment-error-alert"><div><i class="fas fa-sad-tear"></i><strong>${ssrInterpolate(_ctx.trans("!Opps "))}</strong> ${ssrInterpolate(_ctx.trans(
          "Transaction failed if you make payment successfully please contact us."
        ))}</div><button type="button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="28" height="28"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.minMax) {
        _push(`<div class="payment-error-alert"><div><i class="fas fa-sad-tear"></i><strong>${ssrInterpolate(_ctx.trans("!Opps "))}</strong> ${ssrInterpolate(__props.minMaxMessage)}</div><button type="button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="28" height="28"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="gateways"><!--[-->`);
      ssrRenderList(__props.gateways, (gateway) => {
        _push(`<button class="${ssrRenderClass({ "payment-border": activeGateway.value == gateway.id })}"><div style="${ssrRenderStyle(activeGateway.value == gateway.id ? null : { display: "none" })}"><svg class="active-gateway" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd"></path></svg></div><img${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_lazy, gateway.logo))}></button>`);
      });
      _push(`<!--]--></div><!--[-->`);
      ssrRenderList(__props.gateways, (gateway) => {
        _push(`<div style="${ssrRenderStyle(activeGateway.value === gateway.id ? null : { display: "none" })}" class="gateway-form"${ssrRenderAttr("id", "gateway-form" + gateway.id)}><form method="post" enctype="multipart/form-data"><table class="payment-table"><tr><td>${ssrInterpolate(_ctx.trans("Method Name: "))}</td><td class="text-center">${ssrInterpolate(gateway.name)}</td></tr>`);
        if (gateway.currency != null) {
          _push(`<tr><td>${ssrInterpolate(_ctx.trans("Gateway Currency: "))}</td><td class="text-center">${ssrInterpolate(gateway.currency)}</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        if (gateway.charge != 0) {
          _push(`<tr><td>${ssrInterpolate(_ctx.trans("Gateway Charge: "))}</td><td class="text-center">${ssrInterpolate(unref(formatCurrency)(gateway.charge))}</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<tr><td>${ssrInterpolate(_ctx.trans("Payable Amount: "))}</td><td class="text-center">${ssrInterpolate(unref(formatCurrency)(__props.total * gateway.multiply + gateway.charge))}</td></tr></table>`);
        if (gateway.comment != null) {
          _push(`<!--[--><p class="payment-label"><b>${ssrInterpolate(_ctx.trans("Payment Instruction: "))}</b></p><p>${ssrInterpolate(gateway.comment)}</p><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (gateway.phone_required == 1) {
          _push(`<div><label class="payment-label"><b>${ssrInterpolate(_ctx.trans("Your phone number"))}</b></label><input type="number" name="phone" placeholder="Your phone number" class="payment-input" required${ssrRenderAttr("value", __props.user.phone)}></div>`);
        } else {
          _push(`<!---->`);
        }
        if (gateway.is_auto == 0) {
          _push(`<!--[--><div class="payment-file-input"><label class="payment-label"><b>${ssrInterpolate(_ctx.trans("Submit your payment proof"))}</b></label><input type="file" name="image" required accept="image/*"></div><div><label class="payment-label"><b>${ssrInterpolate(_ctx.trans("Comment"))}</b></label><textarea class="payment-textarea" required name="comment" placeholder="comment" maxlength="500">${ssrInterpolate(manualPayment.value.comment)}</textarea></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} type="submit" class="payment-pay-btn">${ssrInterpolate(_ctx.trans("Pay Now"))}</button></form></div>`);
      });
      _push(`<!--]--><br><div class="payment-invoice"><div class="payment-border"><strong>${ssrInterpolate(_ctx.trans("Invoiced To"))}</strong><br> ${ssrInterpolate(__props.user.name)}<br> ${ssrInterpolate(__props.user.email ?? __props.user.phone)} ${ssrInterpolate(__props.user.address)}</div><div class="payment-border"><strong>${ssrInterpolate(_ctx.trans("Pay To"))}</strong><br> ${ssrInterpolate(__props.invoice_data.company_name)} <br> ${ssrInterpolate(__props.invoice_data.address)}, ${ssrInterpolate(__props.invoice_data.city)} <br> ${ssrInterpolate(__props.invoice_data.post_code)}, ${ssrInterpolate(__props.invoice_data.country)}</div></div><div class="payment-details"><table class="payment-table"><tr class="text-center"><td><b>${ssrInterpolate(_ctx.trans("Description"))}</b></td><td><b>${ssrInterpolate(_ctx.trans("Details"))}</b></td></tr><tr><td>${ssrInterpolate(_ctx.trans("Seat No"))}</td><td class="text-center">${ssrInterpolate(__props.event.seat_prefix + __props.seat_no.join(", " + __props.event.seat_prefix))}</td></tr><tr><td><strong>${ssrInterpolate(_ctx.trans("Event"))}:</strong> ${ssrInterpolate(__props.event.title)}</td><td class="text-center">${ssrInterpolate(unref(formatCurrency)(props.total))}</td></tr><tr><td>${ssrInterpolate(_ctx.trans("Total"))} :</td><td class="text-center">${ssrInterpolate(unref(formatCurrency)(props.total))}</td></tr></table></div><div class="text-center">`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("events.index"),
        class: "payment-cancel-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Cancel Payment"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Cancel Payment")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Web/Events/Payment.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __vite_glob_0_125 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$8
}, Symbol.toStringTag, { value: "Module" }));
const __default__$5 = defineComponent({ layout: _sfc_main$Y });
const _sfc_main$7 = /* @__PURE__ */ Object.assign(__default__$5, {
  __name: "Show",
  __ssrInlineRender: true,
  props: ["event", "isBooked", "isExpired"],
  setup(__props) {
    const props = __props;
    const { formatCurrency, socialShare } = sharedComposable();
    onMounted(() => {
      if (document.getElementById("timer")) {
        var countDownDate = new Date(props.event.start_at).getTime();
        var x = setInterval(function() {
          var now = (/* @__PURE__ */ new Date()).getTime();
          var distance = countDownDate - now;
          var days = Math.floor(distance / (1e3 * 60 * 60 * 24));
          var hours = Math.floor(distance % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
          var minutes = Math.floor(distance % (1e3 * 60 * 60) / (1e3 * 60));
          var seconds = Math.floor(distance % (1e3 * 60) / 1e3);
          document.getElementById("timer").innerHTML = "<div class='text-[44px] font-bold'>" + days + "<div class='mt-2 text-lg font-medium capitalize '>days</div></div><div class='text-[44px] font-bold'>" + hours + "<div class='mt-2 text-lg font-medium capitalize'>hours</div></div><div class='text-[44px] font-bold'>" + minutes + "<div class='mt-2 text-lg font-medium capitalize'>minutes</div></div><div class='text-[44px] font-bold'>" + seconds + "<div class='mt-2 text-lg font-medium capitalize'>seconds</div></div>";
          if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = trans("This is event was closed");
          }
        }, 1e3);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2;
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[--><div class="breadcrumbs section-padding bg-[url(&#39;../images/all-img/bred.png&#39;)] bg-cover bg-center bg-no-repeat"><div class="container text-center"><h2>${ssrInterpolate(__props.event.title)}</h2><nav><ol class="flex items-center justify-center space-x-3"><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_Link, { href: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(trans)("Home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(trans)("Home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item">-</li><li class="text-primary">${ssrInterpolate(__props.event.title)}</li></ol></nav></div></div><div class="nav-tab-wrapper tabs section-padding"><div class="container"><img${ssrRenderAttrs(mergeProps({
        alt: "",
        class: "mb-6 block w-full lg:mb-10"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, __props.event.preview)))}><div class="grid grid-cols-12 gap-[30px]"><div class="col-span-12 lg:col-span-8"><div class="bg-secondary mb-10 rounded-md p-10 text-white"><div id="timer" class="justify-between space-y-4 text-center md:flex md:space-y-0"></div></div><h3>${ssrInterpolate(__props.event.title)}</h3><div class="my-4 lg:my-6">${__props.event.body}</div><div class="mt-10 flex justify-between border-y border-[#ECECEC] py-4 md:mt-12"><div class="font-semibold text-black">${ssrInterpolate(unref(trans)("Share"))}</div><ul class="flex items-center space-x-3 lg:justify-end"><!--[-->`);
      ssrRenderList(["facebook", "twitter", "instagram", "pinterest"], (media) => {
        _push(`<li><a target="_blank"${ssrRenderAttr("href", unref(socialShare)(media))} class="flex h-10 w-10"><img${ssrRenderAttrs(mergeProps({
          alt: media + " icon"
        }, ssrGetDirectiveProps(_ctx, _directive_lazy, `/assets/images/icon/${media}.svg`)))}></a></li>`);
      });
      _push(`<!--]--></ul></div></div><div class="relative col-span-12 lg:col-span-4 lg:-mt-20"><div class="sidebarWrapper mx-auto max-w-[90%] space-y-[30px]"><div class="wdiget custom-text space-y-5"><h4 class="widget-title">${ssrInterpolate(unref(trans)("Event Details"))}</h4><ul class="list space-y-6"><li class="flex space-x-3"><div class="flex flex-1 space-x-3"><img src="/assets/images/svg/circle-clock.svg" alt=""><div>${ssrInterpolate((_b2 = (_a2 = __props.event) == null ? void 0 : _a2.start_at_time) == null ? void 0 : _b2.time)}</div></div></li><li class="flex space-x-3"><div class="flex flex-1 space-x-3"><img src="/assets/images/svg/circle-c.svg" alt=""><div>${ssrInterpolate(unref(moment)(__props.event.start_at).format("MMM DD, Y"))}</div></div></li><li class="flex space-x-3"><div class="flex flex-1 space-x-3"><span class="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e8f6f4]"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" x="0" y="0" viewBox="0 0 512 512" style="${ssrRenderStyle({ "enable-background": "new 0 0 512 512" })}" xml:space="preserve" class=""><g><path d="M341.476 338.285c54.483-85.493 47.634-74.827 49.204-77.056C410.516 233.251 421 200.322 421 166 421 74.98 347.139 0 256 0 165.158 0 91 74.832 91 166c0 34.3 10.704 68.091 31.19 96.446l48.332 75.84C118.847 346.227 31 369.892 31 422c0 18.995 12.398 46.065 71.462 67.159C143.704 503.888 198.231 512 256 512c108.025 0 225-30.472 225-90 0-52.117-87.744-75.757-139.524-83.715zm-194.227-92.34a15.57 15.57 0 0 0-.517-.758C129.685 221.735 121 193.941 121 166c0-75.018 60.406-136 135-136 74.439 0 135 61.009 135 136 0 27.986-8.521 54.837-24.646 77.671-1.445 1.906 6.094-9.806-110.354 172.918L147.249 245.945zM256 482c-117.994 0-195-34.683-195-60 0-17.016 39.568-44.995 127.248-55.901l55.102 86.463a14.998 14.998 0 0 0 25.298 0l55.101-86.463C411.431 377.005 451 404.984 451 422c0 25.102-76.313 60-195 60z" fill="#30bead" opacity="1" data-original="#000000" class=""></path><path d="M256 91c-41.355 0-75 33.645-75 75s33.645 75 75 75 75-33.645 75-75-33.645-75-75-75zm0 120c-24.813 0-45-20.187-45-45s20.187-45 45-45 45 20.187 45 45-20.187 45-45 45z" fill="#30bead" opacity="1" data-original="#000000" class=""></path></g></svg></span><div>${ssrInterpolate(__props.event.location)}</div></div></li><li class="flex space-x-3"><div class="flex flex-1 space-x-3"><span class="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e8f6f4]"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" x="0" y="0" viewBox="0 0 512 512" style="${ssrRenderStyle({ "enable-background": "new 0 0 512 512" })}" xml:space="preserve" class=""><g><path d="M467 76H45C20.137 76 0 96.262 0 121v270c0 24.885 20.285 45 45 45h422c24.655 0 45-20.03 45-45V121c0-24.694-20.057-45-45-45zm-6.302 30L287.82 277.967c-8.5 8.5-19.8 13.18-31.82 13.18s-23.32-4.681-31.848-13.208L51.302 106h409.396zM30 384.894V127.125L159.638 256.08 30 384.894zM51.321 406l129.587-128.763 22.059 21.943c14.166 14.166 33 21.967 53.033 21.967s38.867-7.801 53.005-21.939l22.087-21.971L460.679 406H51.321zM482 384.894 352.362 256.08 482 127.125v257.769z" fill="#30bead" opacity="1" data-original="#000000" class=""></path></g></svg></span><div>${ssrInterpolate(__props.event.email)}</div></div></li><li class="flex space-x-3"><div class="flex flex-1 space-x-3"><span class="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e8f6f4]"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" x="0" y="0" viewBox="0 0 473.806 473.806" style="${ssrRenderStyle({ "enable-background": "new 0 0 512 512" })}" xml:space="preserve" class=""><g><path d="M374.456 293.506c-9.7-10.1-21.4-15.5-33.8-15.5-12.3 0-24.1 5.3-34.2 15.4l-31.6 31.5c-2.6-1.4-5.2-2.7-7.7-4-3.6-1.8-7-3.5-9.9-5.3-29.6-18.8-56.5-43.3-82.3-75-12.5-15.8-20.9-29.1-27-42.6 8.2-7.5 15.8-15.3 23.2-22.8 2.8-2.8 5.6-5.7 8.4-8.5 21-21 21-48.2 0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.3-9.5-6-6.2-12.3-12.6-18.8-18.6-9.7-9.6-21.3-14.7-33.5-14.7s-24 5.1-34 14.7l-.2.2-34 34.3c-12.8 12.8-20.1 28.4-21.7 46.5-2.4 29.2 6.2 56.4 12.8 74.2 16.2 43.7 40.4 84.2 76.5 127.6 43.8 52.3 96.5 93.6 156.7 122.7 23 10.9 53.7 23.8 88 26 2.1.1 4.3.2 6.3.2 23.1 0 42.5-8.3 57.7-24.8.1-.2.3-.3.4-.5 5.2-6.3 11.2-12 17.5-18.1 4.3-4.1 8.7-8.4 13-12.9 9.9-10.3 15.1-22.3 15.1-34.6 0-12.4-5.3-24.3-15.4-34.3l-54.9-55.1zm35.8 105.3c-.1 0-.1.1 0 0-3.9 4.2-7.9 8-12.2 12.2-6.5 6.2-13.1 12.7-19.3 20-10.1 10.8-22 15.9-37.6 15.9-1.5 0-3.1 0-4.6-.1-29.7-1.9-57.3-13.5-78-23.4-56.6-27.4-106.3-66.3-147.6-115.6-34.1-41.1-56.9-79.1-72-119.9-9.3-24.9-12.7-44.3-11.2-62.6 1-11.7 5.5-21.4 13.8-29.7l34.1-34.1c4.9-4.6 10.1-7.1 15.2-7.1 6.3 0 11.4 3.8 14.6 7l.3.3c6.1 5.7 11.9 11.6 18 17.9 3.1 3.2 6.3 6.4 9.5 9.7l27.3 27.3c10.6 10.6 10.6 20.4 0 31-2.9 2.9-5.7 5.8-8.6 8.6-8.4 8.6-16.4 16.6-25.1 24.4-.2.2-.4.3-.5.5-8.6 8.6-7 17-5.2 22.7l.3.9c7.1 17.2 17.1 33.4 32.3 52.7l.1.1c27.6 34 56.7 60.5 88.8 80.8 4.1 2.6 8.3 4.7 12.3 6.7 3.6 1.8 7 3.5 9.9 5.3.4.2.8.5 1.2.7 3.4 1.7 6.6 2.5 9.9 2.5 8.3 0 13.5-5.2 15.2-6.9l34.2-34.2c3.4-3.4 8.8-7.5 15.1-7.5 6.2 0 11.3 3.9 14.4 7.3l.2.2 55.1 55.1c10.3 10.2 10.3 20.7.1 31.3zM256.056 112.706c26.2 4.4 50 16.8 69 35.8s31.3 42.8 35.8 69c1.1 6.6 6.8 11.2 13.3 11.2.8 0 1.5-.1 2.3-.2 7.4-1.2 12.3-8.2 11.1-15.6-5.4-31.7-20.4-60.6-43.3-83.5s-51.8-37.9-83.5-43.3c-7.4-1.2-14.3 3.7-15.6 11s3.5 14.4 10.9 15.6zM473.256 209.006c-8.9-52.2-33.5-99.7-71.3-137.5s-85.3-62.4-137.5-71.3c-7.3-1.3-14.2 3.7-15.5 11-1.2 7.4 3.7 14.3 11.1 15.6 46.6 7.9 89.1 30 122.9 63.7 33.8 33.8 55.8 76.3 63.7 122.9 1.1 6.6 6.8 11.2 13.3 11.2.8 0 1.5-.1 2.3-.2 7.3-1.1 12.3-8.1 11-15.4z" fill="#30bead" opacity="1" data-original="#000000" class=""></path></g></svg></span><div>${ssrInterpolate(__props.event.phone)}</div></div></li>`);
      if (!__props.event.is_free) {
        _push(`<li class="flex space-x-3"><div class="flex flex-1 space-x-3"><span class="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e8f6f4]"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" x="0" y="0" viewBox="0 0 511.995 511.995" style="${ssrRenderStyle({ "enable-background": "new 0 0 512 512" })}" xml:space="preserve" class=""><g><path d="M278.622 224.006V110.243a151.685 151.685 0 0 1 66.901 29.087 23.943 23.943 0 0 0 13.251 4.201c15.222 0 27.633-12.249 27.794-27.471a24.674 24.674 0 0 0-7.11-17.452 170.544 170.544 0 0 0-101.159-40.722V19.749c0-10.892-8.823-19.715-19.715-19.715-.226-.032-.453-.032-.679-.032-11.053-.162-20.167 8.662-20.329 19.747v36.844c-72.718 5.171-122.166 50.095-122.166 109.885 0 73.364 62.376 93.726 122.166 109.885V405.64c-31.544-4.234-61.277-17.323-85.646-37.813-4.589-3.652-10.278-5.688-16.16-5.817-14.899 1.034-26.372 13.509-26.179 28.441a24.674 24.674 0 0 0 7.11 17.452 190.344 190.344 0 0 0 121.197 48.802v35.551c0 .226.032.453.032.679.517 11.053 9.922 19.585 20.975 19.036 10.892 0 19.715-8.823 19.715-19.715v-36.197c88.231-5.817 123.782-59.467 123.782-116.349.002-76.274-63.989-99.544-123.78-115.704zM237.9 213.664c-35.228-10.342-62.699-21.007-62.699-51.064s24.886-51.711 62.699-54.619v105.683zm40.722 192.622V288.645c36.521 10.342 64.961 24.239 64.638 58.174 0 24.563-16.806 53.65-64.638 59.467z" fill="#30bead" opacity="1" data-original="#000000" class=""></path></g></svg></span><div>${ssrInterpolate(unref(trans)("Fee: "))} <strong>${ssrInterpolate(unref(formatCurrency)(__props.event.fee_amount))}</strong></div></div></li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</ul>`);
      if (__props.isExpired) {
        _push(`<button class="text-lg" disabled></button>`);
      } else {
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("events.book", __props.event.slug),
          class: "btn btn-primary btn-md text-lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(trans)("Book A Seat"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(trans)("Book A Seat")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div><div class="wdiget"><h4 class="widget-title">${ssrInterpolate(unref(trans)("Special Guests"))}</h4><ul class="list space-y-6"><!--[-->`);
      ssrRenderList(__props.event.guests, (guest) => {
        _push(`<li class="flex space-x-4 border-[#ECECEC]"><div class="flex-none"><div class="h-20 w-20 rounded-full"><img${ssrRenderAttrs(mergeProps({
          alt: "",
          class: "h-full w-full rounded-full object-cover"
        }, ssrGetDirectiveProps(_ctx, _directive_lazy, guest.preview)))}></div></div><div class="flex-1"><div class="mb-1 font-bold capitalize text-black">${ssrInterpolate(guest.name)}</div><span class="text-primary font-semibold">${ssrInterpolate(guest.designation)}</span></div></li>`);
      });
      _push(`<!--]--></ul></div></div></div></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Web/Events/Show.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __vite_glob_0_126 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$7
}, Symbol.toStringTag, { value: "Module" }));
const __default__$4 = defineComponent({ layout: _sfc_main$p });
const _sfc_main$6 = /* @__PURE__ */ Object.assign(__default__$4, {
  __name: "Home",
  __ssrInlineRender: true,
  props: ["home", "blogs", "categories", "projects", "brands", "youtube_id"],
  setup(__props) {
    var _a2;
    const props = __props;
    const { formatCurrency } = sharedComposable();
    const achievement = ((_a2 = usePage().props.primaryData) == null ? void 0 : _a2.achievement) ?? {};
    const { hero } = props.home ?? {
      hero: {}
    };
    const getParsedText = (text, className = "text-primary") => {
      if (text && text.length) {
        return text.replace(/{(.*?)}/g, `<span class="${className}">$1</span>`);
      }
      return text;
    };
    ref(false);
    onMounted(() => {
      $(document).ready(function() {
        $(".progressbar-group .ani").each(function() {
          $(this).animate(
            {
              width: $(this).attr("data-progress") + "%"
            },
            1e3
          );
        });
        var dataWidth = document.querySelectorAll("[data-width]");
        dataWidth.forEach(function(item) {
          item.style.maxWidth = item.getAttribute("data-width");
        });
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a3, _b2, _c, _d, _e, _f, _g;
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[--><section class="overflow-hidden bg-[url(&#39;../images/banner/2.png&#39;)] bg-cover bg-center bg-no-repeat xl:min-h-screen xl:pb-[130px]">`);
      _push(ssrRenderComponent(_sfc_main$10, null, null, _parent));
      _push(`<div class="container relative"><div class="space-y-6 py-14 md:py-20 lg:space-y-10 lg:py-28 xl:max-w-[570px] xl:pt-[129px]"><div class="text-5xl font-bold leading-[62px] text-black md:text-6xl md:leading-[72px] lg:text-[77px] lg:leading-[106.4px]"><div>${getParsedText((_a3 = unref(hero)) == null ? void 0 : _a3.title)}</div></div><div class="plain-text text-gray border-primary border-l-2 pl-4 leading-[30px]">${ssrInterpolate((_b2 = unref(hero)) == null ? void 0 : _b2.subtitle)}</div><div class="flex flex-col space-y-3 pt-5 md:flex-row md:space-x-4 md:space-y-0"><a${ssrRenderAttr("href", (_c = unref(hero)) == null ? void 0 : _c.btn_link)} class="btn btn-primary w-1/2 text-center md:w-auto">${ssrInterpolate((_d = unref(hero)) == null ? void 0 : _d.btn_text)}</a><a${ssrRenderAttr("href", (_e = unref(hero)) == null ? void 0 : _e.btn_link2)} class="btn btn-black w-1/2 text-center md:w-auto">${ssrInterpolate((_f = unref(hero)) == null ? void 0 : _f.btn_text2)}</a></div></div><div class="imge-box absolute right-[-60px] top-1/2 mt-[60px] hidden -translate-y-1/2 xl:block"><img${ssrRenderAttrs(mergeProps({ alt: "" }, ssrGetDirectiveProps(_ctx, _directive_lazy, (_g = unref(hero)) == null ? void 0 : _g.image)))}></div></div></section><div class="feature-area section-padding bg-[url(&#39;../images/all-img/section-bg-6.png&#39;)] bg-cover bg-center bg-no-repeat"><div class="container"><div class="text-center"><div class="mini-title">${ssrInterpolate(_ctx.trans("Project Categories"))}</div><div class="column-title">${ssrInterpolate(_ctx.trans("Browse Top"))} <span class="shape-bg">${ssrInterpolate(_ctx.trans("Categories"))}</span></div></div><div class="grid grid-cols-1 gap-[30px] pt-10 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
      ssrRenderList(__props.categories, (item) => {
        _push(ssrRenderComponent(_component_Link, {
          key: item.id,
          class: "hover:shadow-box hover:border-primary flex space-x-5 rounded-[8px] border-l-4 border-white bg-white p-[30px] transition-all duration-300",
          href: _ctx.route("project-categories.show", item.slug)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="relative h-[72px] w-[72px] rounded bg-white group-hover:bg-[#FFE8E8]"${_scopeId}><img${ssrRenderAttrs(mergeProps({
                alt: "",
                class: "h-full w-full rounded object-cover"
              }, ssrGetDirectiveProps(_ctx, _directive_lazy, item.preview ?? "/assets/images/icon/ct1.svg")))}${_scopeId}></div><div class="course-content"${_scopeId}><h4 class="text-1xl mb-2 font-bold lg:text-2xl"${_scopeId}>${ssrInterpolate(item.title)}</h4><p${_scopeId}>${ssrInterpolate(item.projects_count || "no")} ${ssrInterpolate(_ctx.trans("projects"))}</p></div>`);
            } else {
              return [
                createVNode("div", { class: "relative h-[72px] w-[72px] rounded bg-white group-hover:bg-[#FFE8E8]" }, [
                  withDirectives(createVNode("img", {
                    alt: "",
                    class: "h-full w-full rounded object-cover"
                  }, null, 512), [
                    [_directive_lazy, item.preview ?? "/assets/images/icon/ct1.svg"]
                  ])
                ]),
                createVNode("div", { class: "course-content" }, [
                  createVNode("h4", { class: "text-1xl mb-2 font-bold lg:text-2xl" }, toDisplayString(item.title), 1),
                  createVNode("p", null, toDisplayString(item.projects_count || "no") + " " + toDisplayString(_ctx.trans("projects")), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="pt-[70px] text-center">`);
      _push(ssrRenderComponent(_component_Link, {
        href: "/projects",
        class: "btn btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("View Projects"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("View Projects")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$n, null, null, _parent));
      _push(`<div class="section-padding bg-[url(&#39;../images/all-img/section-bg-7.png&#39;)] bg-cover bg-center bg-no-repeat"><div class="container"><div class="text-center"><div class="mini-title">${ssrInterpolate(_ctx.trans("Featured Projects"))}</div><div class="column-title">${ssrInterpolate(_ctx.trans("Choose Unlimited"))} <span class="shape-bg">${ssrInterpolate(_ctx.trans("Projects"))}</span></div></div><div class="grid grid-cols-1 gap-[30px] pt-5 lg:pt-10 xl:grid-cols-2"><!--[-->`);
      ssrRenderList(__props.projects, (project) => {
        _push(ssrRenderComponent(_component_Link, {
          key: project.id,
          class: "hover:border-primary hover:shadow-box6 space-y-6 rounded-[8px] border-b-4 border-transparent bg-white p-8 transition duration-150 sm:flex sm:space-x-6 sm:space-y-0",
          href: _ctx.route("projects.show", project.slug)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex-none"${_scopeId}><div class="relative h-[159px] rounded sm:w-[159px]"${_scopeId}><img${ssrRenderAttrs(mergeProps({
                alt: "",
                class: "h-full w-full rounded object-cover"
              }, ssrGetDirectiveProps(_ctx, _directive_lazy, project.preview)))}${_scopeId}></div></div><div class="course-content flex-1"${_scopeId}><div class="text-primary text-1xl mb-2 flex justify-between font-bold lg:text-2xl"${_scopeId}><span class="inline-block"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(project.invest_amount))}</span></div><h4 class="lg:eading-[36px] text-1xl mb-4 font-bold lg:text-2xl"${_scopeId}>${ssrInterpolate(project.title)}</h4><div class="flex space-x-6"${_scopeId}><span class="flex items-center space-x-2"${_scopeId}><img src="/assets/images/svg/user2.svg" alt=""${_scopeId}><span${_scopeId}>${ssrInterpolate(project.total_units)} ${ssrInterpolate(_ctx.trans("units"))}</span></span><span class="flex items-center space-x-2"${_scopeId}><img src="/assets/images/svg/file2.svg" alt=""${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(moment)(project.expire_date).format("D-M-Y"))}</span></span></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex-none" }, [
                  createVNode("div", { class: "relative h-[159px] rounded sm:w-[159px]" }, [
                    withDirectives(createVNode("img", {
                      alt: "",
                      class: "h-full w-full rounded object-cover"
                    }, null, 512), [
                      [_directive_lazy, project.preview]
                    ])
                  ])
                ]),
                createVNode("div", { class: "course-content flex-1" }, [
                  createVNode("div", { class: "text-primary text-1xl mb-2 flex justify-between font-bold lg:text-2xl" }, [
                    createVNode("span", { class: "inline-block" }, toDisplayString(unref(formatCurrency)(project.invest_amount)), 1)
                  ]),
                  createVNode("h4", { class: "lg:eading-[36px] text-1xl mb-4 font-bold lg:text-2xl" }, toDisplayString(project.title), 1),
                  createVNode("div", { class: "flex space-x-6" }, [
                    createVNode("span", { class: "flex items-center space-x-2" }, [
                      createVNode("img", {
                        src: "/assets/images/svg/user2.svg",
                        alt: ""
                      }),
                      createVNode("span", null, toDisplayString(project.total_units) + " " + toDisplayString(_ctx.trans("units")), 1)
                    ]),
                    createVNode("span", { class: "flex items-center space-x-2" }, [
                      createVNode("img", {
                        src: "/assets/images/svg/file2.svg",
                        alt: ""
                      }),
                      createVNode("span", null, toDisplayString(unref(moment)(project.expire_date).format("D-M-Y")), 1)
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="pt-10 text-center lg:pt-16">`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("projects.index"),
        class: "btn btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("View All Projects"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("View All Projects")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$m, null, null, _parent));
      _push(`<div class="popup-video"><div class="overlay" id="overlay"></div><div class="popup" id="videoPopup"><iframe${ssrRenderAttr("src", `https://www.youtube.com/embed/${__props.youtube_id}`)} frameborder="0" allowfullscreen></iframe></div></div><div class="video-area section-padding-bottom relative z-[1]"><div class="absolute bottom-0 left-0 z-[-1] h-[60%] w-full bg-[url(&#39;../images/all-img/section-bg-7.png&#39;)] bg-cover bg-center bg-no-repeat"></div><div class="container"><div class="video-wrapper mb-20 lg:mb-[150px] xl:mb-[205px]"><div class="shadow-box8 relative mx-auto h-[400px] max-w-[1112px] rounded-lg bg-white p-6 lg:h-[500px] xl:h-[652px]"><img${ssrRenderAttrs(mergeProps({
        alt: "",
        class: "block h-full w-full object-cover"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, unref(achievement).video_bg_img)))}><div class="absolute left-1/2 top-1/2 mx-auto flex h-[80px] w-[80px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center"><div class="absolute inline-flex h-full w-full animate-ping rounded-full ring-2 ring-white"></div><a href="javascript:void(0)" class="text-primary z-10 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-white text-3xl"><iconify-icon icon="bi:play-fill"></iconify-icon></a></div></div></div></div><div class="container"><div class="mb-[50px] text-center text-2xl font-medium text-black"><span class="shape-bg mini">${ssrInterpolate(_ctx.trans("Trusted"))}</span> ${ssrInterpolate(_ctx.trans("By 1000+ Companies"))}</div><ul class="flex flex-wrap items-center justify-center lg:justify-between"><!--[-->`);
      ssrRenderList(__props.brands, (brand) => {
        _push(`<li class="mb-6 mr-6 grayscale-[80] transition duration-150 last:mb-0 last:mr-0 hover:grayscale-0"><div class="cursor-pointer"><img${ssrRenderAttrs(mergeProps({ alt: "" }, ssrGetDirectiveProps(_ctx, _directive_lazy, brand.slug)))}></div></li>`);
      });
      _push(`<!--]--></ul></div></div>`);
      _push(ssrRenderComponent(_sfc_main$l, null, null, _parent));
      _push(`<div class="section-padding"><div class="container"><div class="text-center"><div class="mini-title">${ssrInterpolate(_ctx.trans("Blog & Article"))}</div><div class="column-title">${ssrInterpolate(_ctx.trans("Take A Look At The Latest"))} <span class="shape-bg">${ssrInterpolate(_ctx.trans("Articles"))}</span></div></div><div class="grid grid-cols-1 gap-[30px] pt-5 lg:pt-10 xl:grid-cols-2"><!--[-->`);
      ssrRenderList(__props.blogs, (blog) => {
        _push(`<div class="shadow-box7 hover:ring-primary hover:shadow-box8 group space-y-6 rounded-[8px] bg-white p-4 ring-0 transition duration-150 hover:ring-2 sm:flex sm:space-x-6 sm:space-y-0"><div class="flex-none"><div class="relative h-[182px] rounded sm:w-[200px]"><img${ssrRenderAttrs(mergeProps({
          alt: "",
          class: "h-full w-full rounded object-cover"
        }, ssrGetDirectiveProps(_ctx, _directive_lazy, blog.image)))}></div></div><div class="course-content flex-1"><div class="mb-4"><span class="text-secondary inline-block rounded bg-[#E3F9F6] px-[10px] py-1 text-base font-medium">${ssrInterpolate(blog.category)}</span></div><h4 class="text-1xl mb-4 font-bold lg:text-2xl lg:leading-[36px]">`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("blogs.show", blog.slug),
          class: "group-hover:text-primary transitio duration-150"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(blog.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(blog.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</h4><div class="flex space-x-6"><a class="flex items-center space-x-2" href="#"><img src="/assets/images/svg/calender2.svg" alt=""><span>${ssrInterpolate(blog.created_at_diff)}</span></a></div></div></div>`);
      });
      _push(`<!--]--></div></div></div><div class="rt-mobile-menu-overlay lg:hidden"></div>`);
      _push(ssrRenderComponent(_sfc_main$_, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Web/Home.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __vite_glob_0_127 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$6
}, Symbol.toStringTag, { value: "Module" }));
const __default__$3 = defineComponent({ layout: _sfc_main$Y });
const _sfc_main$5 = /* @__PURE__ */ Object.assign(__default__$3, {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["investors", "testimonials", "brands"],
  setup(__props) {
    onMounted(() => {
      $(document).ready(function() {
        $(".slider-for").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          //arrows: false,
          fade: true,
          asNavFor: ".slider-nav",
          prevArrow: $(".slickprev"),
          nextArrow: $(".slicknext")
        });
        $(".slider-nav").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          asNavFor: ".slider-for",
          dots: false,
          focusOnSelect: true
        });
        $(".slider-range").slider({
          range: true,
          min: 1500,
          max: 1e4,
          step: 100,
          values: [3e3, 6e3],
          slide: function slide(event, ui) {
            $(".amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
          }
        });
        $(".amount").val(
          "$" + $(".slider-range").slider("values", 0) + " - $" + $(".slider-range").slider("values", 1)
        );
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[--><div class="breadcrumbs section-padding bg-[url(&#39;../images/all-img/bred.png&#39;)] bg-cover bg-center bg-no-repeat"><div class="container text-center"><h2>${ssrInterpolate(_ctx.trans("Investors"))}</h2><nav><ol class="flex items-center justify-center space-x-3"><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_Link, { href: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item">-</li><li class="text-primary">${ssrInterpolate(_ctx.trans("Investors"))}</li></ol></nav></div></div><div class="section-padding"><div class="container"><div class="text-center"><div class="mini-title">${ssrInterpolate(_ctx.trans("Team Member"))}</div><div class="column-title">${ssrInterpolate(_ctx.trans("Our Expert"))} <span class="shape-bg">${ssrInterpolate(_ctx.trans("Investors"))}</span></div></div><div class="grid grid-cols-1 pt-10 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-7"><!--[-->`);
      ssrRenderList(__props.investors, (user) => {
        var _a2, _b2, _c;
        _push(`<div class="bg-white shadow-box3 rounded-[8px] transition-all duration-100 pt-10 pb-[28px] px-6 text-center hover:shadow-box4 border-t-4 border-transparent hover:border-secondary"><div class="w-[170px] h-[170px] rounded-full relative mx-auto mb-8"><img${ssrRenderAttrs(mergeProps({
          alt: "",
          class: "object-cover w-full h-full rounded-full"
        }, ssrGetDirectiveProps(_ctx, _directive_lazy, user.preview)))}></div><div class="course-content"><h4 class="mb-1 font-bold lg:text-2xl text-1xl">${ssrInterpolate(user.name)}</h4><div>${ssrInterpolate(user.position)}</div><ul class="flex justify-center pt-6 space-x-4"><li><a${ssrRenderAttr("href", (_a2 = user.socials) == null ? void 0 : _a2.facebook)} class="flex flex-col items-center justify-center w-10 h-10 text-2xl transition rounded bg-red-paste text-primary hover:bg-primary hover:text-white"><iconify-icon icon="bxl:facebook"></iconify-icon></a></li><li><a${ssrRenderAttr("href", (_b2 = user.socials) == null ? void 0 : _b2.twitter)} class="flex flex-col items-center justify-center w-10 h-10 text-2xl transition rounded bg-green-paste text-secondary hover:bg-secondary hover:text-white"><iconify-icon icon="bxl:twitter"></iconify-icon></a></li><li><a${ssrRenderAttr("href", (_c = user.socials) == null ? void 0 : _c.linkedin)} class="h-10 w-10 rounded bg-[#EEE8FF] text-#8861DB flex flex-col justify-center items-center text-2xl transition hover:bg-[#8861DB] hover:text-white"><iconify-icon icon="bxl:linkedin"></iconify-icon></a></li></ul></div></div>`);
      });
      _push(`<!--]--></div></div></div><div class="section-padding bg-[url(&#39;../images/all-img/section-bg-12.png&#39;)] bg-cover bg-no-repeat"><div class="container"><div class="grid lg:grid-cols-2 grid-cols-1 xl:gap-[60px] gap-6"><div><div class="slider-nav"><!--[-->`);
      ssrRenderList(__props.testimonials, (testimonial) => {
        _push(`<div class="single-item"><div class="xl:h-[593px] lg:h-[400px] h-[150px] lg:w-full w-[150px] rounded-md"><img${ssrRenderAttrs(mergeProps({
          alt: "",
          class: "object-cover w-full h-full rounded-md"
        }, ssrGetDirectiveProps(_ctx, _directive_lazy, testimonial.preview)))}></div></div>`);
      });
      _push(`<!--]--></div></div><div><div class="mini-title">${ssrInterpolate(_ctx.trans("Testimonial"))}</div><h4 class="column-title">${ssrInterpolate(_ctx.trans("Our Valuable Investors"))} <span class="text-black shape-bg">${ssrInterpolate(_ctx.trans("Feedback"))}</span></h4><div class="mt-10 slider-for"><!--[-->`);
      ssrRenderList(__props.testimonials, (testimonial) => {
        _push(`<div class="single-item"><div><div class="mb-8">${ssrInterpolate(testimonial.comment)}</div><div><span class="block mb-1 font-semibold text-black">${ssrInterpolate(testimonial.name)}</span><span class="block font-semibold text-primary">${ssrInterpolate(testimonial.position)}</span></div></div></div>`);
      });
      _push(`<!--]--></div><div class="flex mt-8 space-x-5 lg:mt-10"><button class="lg:h-[64px] lg:w-[64px] h-12 w-12 flex flex-col items-center justify-center rounded-md bg-white hover:bg-primary hover:text-white shadow-box slickprev text-3xl text-primary"><iconify-icon icon="heroicons:arrow-left-20-solid"></iconify-icon></button><button class="lg:h-[64px] lg:w-[64px] h-12 w-12 flex flex-col items-center justify-center rounded-md bg-white hover:bg-primary hover:text-white shadow-box slickprev text-3xl text-primary"><iconify-icon icon="heroicons:arrow-right-20-solid"></iconify-icon></button></div></div></div></div><div class="container mt-32"><div class="mb-[50px] text-center text-2xl font-medium text-black"><span class="shape-bg mini">${ssrInterpolate(_ctx.trans("Trusted"))}</span> ${ssrInterpolate(_ctx.trans("By 1000+ Companies"))}</div><ul class="flex flex-wrap items-center justify-center lg:justify-between"><!--[-->`);
      ssrRenderList(__props.brands, (brand) => {
        _push(`<li class="mb-6 mr-6 grayscale-[80] transition duration-150 last:mb-0 last:mr-0 hover:grayscale-0"><div class="cursor-pointer"><img${ssrRenderAttrs(mergeProps({ alt: "" }, ssrGetDirectiveProps(_ctx, _directive_lazy, brand.slug)))}></div></li>`);
      });
      _push(`<!--]--></ul></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Web/Investors/Index.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __vite_glob_0_128 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$5
}, Symbol.toStringTag, { value: "Module" }));
const __default__$2 = defineComponent({ layout: _sfc_main$p });
const _sfc_main$4 = /* @__PURE__ */ Object.assign(__default__$2, {
  __name: "Payment",
  __ssrInlineRender: true,
  props: [
    "project",
    "gateways",
    "tax",
    "total",
    "invoice_data",
    "error",
    "minMax",
    "user",
    "logo",
    "minMaxMessage",
    "invest_data",
    "durations"
  ],
  setup(__props) {
    var _a2;
    const props = __props;
    const { formatCurrency } = sharedComposable();
    const activeGateway = ref(((_a2 = props.gateways[0]) == null ? void 0 : _a2.id) || 0);
    ref(null);
    const manualPayment = ref({
      image: null,
      comment: ""
    });
    const form = useForm({});
    const calculateProfitReturn = (percentage) => {
      return formatCurrency(props.project.invest_amount / 100 * percentage * props.invest_data.qty);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a3, _b2;
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.trans("Payment")
      }, null, _parent));
      _push(`<div class="payment-container"><div class="payment-content"><div class="payment-header"><img${ssrRenderAttrs(mergeProps({
        alt: "logo",
        class: "mb-3"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, (_b2 = (_a3 = _ctx.$page.props) == null ? void 0 : _a3.primaryData) == null ? void 0 : _b2.deep_logo)))}><span class="status">${ssrInterpolate(_ctx.trans("Unpaid"))}</span></div>`);
      if (__props.error) {
        _push(`<div class="payment-error-alert"><div><i class="fas fa-sad-tear"></i><strong>${ssrInterpolate(_ctx.trans("!Opps "))}</strong> ${ssrInterpolate(_ctx.trans("Transaction failed if you make payment successfully please contact us."))}</div><button type="button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="28" height="28"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.minMax) {
        _push(`<div class="payment-error-alert"><div><i class="fas fa-sad-tear"></i><strong>${ssrInterpolate(_ctx.trans("!Opps "))}</strong> ${ssrInterpolate(__props.minMaxMessage)}</div><button type="button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="28" height="28"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="gateways"><!--[-->`);
      ssrRenderList(__props.gateways, (gateway) => {
        _push(`<button class="${ssrRenderClass({ "payment-border": activeGateway.value == gateway.id })}"><div style="${ssrRenderStyle(activeGateway.value == gateway.id ? null : { display: "none" })}"><svg class="active-gateway" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd"></path></svg></div><img${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_lazy, gateway.logo))}></button>`);
      });
      _push(`<!--]--></div><!--[-->`);
      ssrRenderList(__props.gateways, (gateway) => {
        _push(`<div style="${ssrRenderStyle(activeGateway.value === gateway.id ? null : { display: "none" })}" class="gateway-form"${ssrRenderAttr("id", "gateway-form" + gateway.id)}><form method="post" enctype="multipart/form-data"><table class="payment-table"><tr><td>${ssrInterpolate(_ctx.trans("Method Name: "))}</td><td class="text-center">${ssrInterpolate(gateway.name)}</td></tr>`);
        if (gateway.currency != null) {
          _push(`<tr><td>${ssrInterpolate(_ctx.trans("Gateway Currency: "))}</td><td class="text-center">${ssrInterpolate(gateway.currency)}</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        if (gateway.charge != 0) {
          _push(`<tr><td>${ssrInterpolate(_ctx.trans("Gateway Charge: "))}</td><td class="text-center">${ssrInterpolate(unref(formatCurrency)(gateway.charge))}</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<tr><td>${ssrInterpolate(_ctx.trans("Payable Amount: "))}</td><td class="text-center">${ssrInterpolate(unref(formatCurrency)(__props.total * gateway.multiply + gateway.charge))}</td></tr></table>`);
        if (gateway.comment != null) {
          _push(`<!--[--><p class="payment-label"><b>${ssrInterpolate(_ctx.trans("Payment Instruction: "))}</b></p><p>${ssrInterpolate(gateway.comment)}</p><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (gateway.phone_required == 1) {
          _push(`<div><label class="payment-label"><b>${ssrInterpolate(_ctx.trans("Your phone number"))}</b></label><input type="number" name="phone" placeholder="Your phone number" class="payment-input" required${ssrRenderAttr("value", __props.user.phone)}></div>`);
        } else {
          _push(`<!---->`);
        }
        if (gateway.is_auto == 0) {
          _push(`<!--[--><div class="payment-file-input"><label class="payment-label"><b>${ssrInterpolate(_ctx.trans("Submit your payment proof"))}</b></label><input type="file" name="image" required accept="image/*"></div><div><label class="payment-label"><b>${ssrInterpolate(_ctx.trans("Comment"))}</b></label><textarea class="payment-textarea" required name="comment" placeholder="comment" maxlength="500">${ssrInterpolate(manualPayment.value.comment)}</textarea></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} type="submit" class="payment-pay-btn">${ssrInterpolate(_ctx.trans("Pay Now"))}</button></form></div>`);
      });
      _push(`<!--]--><br><div class="payment-invoice"><div class="payment-border"><b>${ssrInterpolate(_ctx.trans("Invoiced To"))}</b><br> ${ssrInterpolate(__props.user.name)}<br> ${ssrInterpolate(__props.user.address)}</div><div class="payment-border"><b>${ssrInterpolate(_ctx.trans("Pay To"))}</b><br> ${ssrInterpolate(__props.invoice_data.company_name)} <br> ${ssrInterpolate(__props.invoice_data.address)}, ${ssrInterpolate(__props.invoice_data.city)} <br> ${ssrInterpolate(__props.invoice_data.post_code)}, ${ssrInterpolate(__props.invoice_data.country)}</div></div><div class="payment-details"><p class="mb-1 font-bold text-black uppercase">${ssrInterpolate(_ctx.trans("Invest Details"))}</p><table class="payment-table"><tr class="text-center"><td><b>${ssrInterpolate(_ctx.trans("Duration"))}</b></td><td><b>${ssrInterpolate(_ctx.trans("ROI"))}</b></td><td><b>${ssrInterpolate(_ctx.trans("Net Profit"))}</b></td><td><b>${ssrInterpolate(_ctx.trans("QTY"))}</b></td></tr><!--[-->`);
      ssrRenderList(__props.durations, (duration) => {
        _push(`<tr><td class="text-center">${ssrInterpolate(duration.duration)}/${ssrInterpolate(duration.duration_type)}</td><td class="text-center">${ssrInterpolate(`${duration.return_type == "fixed" ? unref(formatCurrency)(duration.min_profit_return) : duration.min_profit_return + "%"}`)} - ${ssrInterpolate(`${duration.return_type == "fixed" ? unref(formatCurrency)(duration.max_profit_return) : duration.max_profit_return + "%"}`)}</td><td class="text-center">${ssrInterpolate(calculateProfitReturn(duration.min_profit_return))} - ${ssrInterpolate(calculateProfitReturn(duration.max_profit_return))}</td><td class="text-center">${ssrInterpolate(__props.invest_data.qty)}</td></tr>`);
      });
      _push(`<!--]--></table></div><div class="payment-details"><table class="payment-table"><tr class="text-center"><td><b>${ssrInterpolate(_ctx.trans("Description"))}</b></td><td><b>${ssrInterpolate(_ctx.trans("Amount"))}</b></td></tr><tr><td>${ssrInterpolate(__props.project.title)}</td><td class="text-center">${ssrInterpolate(unref(formatCurrency)(__props.project.invest_amount))}</td></tr><tr><td>${ssrInterpolate(_ctx.trans("Quantity"))}:</td><td class="text-center">${ssrInterpolate(__props.durations.length * __props.invest_data.qty)}</td></tr><tr><td>${ssrInterpolate(_ctx.trans("Tax"))}:</td><td class="text-center">${ssrInterpolate(unref(formatCurrency)(__props.tax))}</td></tr><tr><td>${ssrInterpolate(_ctx.trans("Total"))} :</td><td class="text-center">${ssrInterpolate(unref(formatCurrency)(__props.total))}</td></tr></table></div>`);
      _push(ssrRenderComponent(_component_Link, {
        href: `/projects/${__props.project.slug}`,
        class: "payment-cancel-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Cancel Payment"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Cancel Payment")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Web/Payment.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __vite_glob_0_132 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = {
  __name: "SingleListProject",
  __ssrInlineRender: true,
  props: ["project"],
  setup(__props) {
    const { formatCurrency } = sharedComposable();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(ssrRenderComponent(_component_Link, mergeProps({
        class: "hover:border-primary hover:shadow-box6 space-y-6 rounded-[8px] border-b-4 border-transparent bg-white p-8 transition duration-150 sm:flex sm:space-x-6 sm:space-y-0",
        href: _ctx.route("projects.show", __props.project.slug)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2;
          if (_push2) {
            _push2(`<div class="flex-none"${_scopeId}><div class="relative h-[159px] rounded sm:w-[159px]"${_scopeId}><img${ssrRenderAttrs(mergeProps({
              alt: "",
              class: "object-cover w-full h-full rounded"
            }, ssrGetDirectiveProps(_ctx, _directive_lazy, __props.project.preview)))}${_scopeId}></div></div><div class="flex-1 course-content"${_scopeId}><div class="flex justify-between mb-2 font-bold text-primary text-1xl lg:text-2xl"${_scopeId}><span class="inline-block"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(__props.project.invest_amount))}</span><span class="flex space-x-1"${_scopeId}><!--[-->`);
            ssrRenderList(5, (item) => {
              _push2(`<!--[-->`);
              if (item <= parseInt(__props.project.reviews_avg_star)) {
                _push2(`<iconify-icon icon="heroicons:star-20-solid" class="text-tertiary"${_scopeId}></iconify-icon>`);
              } else {
                _push2(`<iconify-icon icon="heroicons:star-20-solid" class="text-[#E6E6E6]"${_scopeId}></iconify-icon>`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]--></span></div><h4 class="lg:eading-[36px] text-1xl mb-4 font-bold lg:text-2xl"${_scopeId}>${ssrInterpolate(__props.project.title)}</h4><div class="mb-4"${_scopeId}><span class="px-2 py-1 text-white rounded bg-secondary"${_scopeId}>${ssrInterpolate((_a2 = __props.project.category) == null ? void 0 : _a2.title)}</span></div><div class="flex space-x-6"${_scopeId}><span class="flex items-center space-x-2"${_scopeId}><img src="/assets/images/svg/user2.svg" alt=""${_scopeId}><span${_scopeId}>${ssrInterpolate(__props.project.total_units)} ${ssrInterpolate(_ctx.trans("units"))}</span></span><span class="flex items-center space-x-2"${_scopeId}><img src="/assets/images/svg/file2.svg" alt=""${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(moment)(__props.project.expire_date).format("DD-MMM-Y"))}</span></span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex-none" }, [
                createVNode("div", { class: "relative h-[159px] rounded sm:w-[159px]" }, [
                  withDirectives(createVNode("img", {
                    alt: "",
                    class: "object-cover w-full h-full rounded"
                  }, null, 512), [
                    [_directive_lazy, __props.project.preview]
                  ])
                ])
              ]),
              createVNode("div", { class: "flex-1 course-content" }, [
                createVNode("div", { class: "flex justify-between mb-2 font-bold text-primary text-1xl lg:text-2xl" }, [
                  createVNode("span", { class: "inline-block" }, toDisplayString(unref(formatCurrency)(__props.project.invest_amount)), 1),
                  createVNode("span", { class: "flex space-x-1" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(5, (item) => {
                      return openBlock(), createBlock(Fragment, null, [
                        item <= parseInt(__props.project.reviews_avg_star) ? (openBlock(), createBlock("iconify-icon", {
                          key: 0,
                          icon: "heroicons:star-20-solid",
                          class: "text-tertiary"
                        })) : (openBlock(), createBlock("iconify-icon", {
                          key: 1,
                          icon: "heroicons:star-20-solid",
                          class: "text-[#E6E6E6]"
                        }))
                      ], 64);
                    }), 64))
                  ])
                ]),
                createVNode("h4", { class: "lg:eading-[36px] text-1xl mb-4 font-bold lg:text-2xl" }, toDisplayString(__props.project.title), 1),
                createVNode("div", { class: "mb-4" }, [
                  createVNode("span", { class: "px-2 py-1 text-white rounded bg-secondary" }, toDisplayString((_b2 = __props.project.category) == null ? void 0 : _b2.title), 1)
                ]),
                createVNode("div", { class: "flex space-x-6" }, [
                  createVNode("span", { class: "flex items-center space-x-2" }, [
                    createVNode("img", {
                      src: "/assets/images/svg/user2.svg",
                      alt: ""
                    }),
                    createVNode("span", null, toDisplayString(__props.project.total_units) + " " + toDisplayString(_ctx.trans("units")), 1)
                  ]),
                  createVNode("span", { class: "flex items-center space-x-2" }, [
                    createVNode("img", {
                      src: "/assets/images/svg/file2.svg",
                      alt: ""
                    }),
                    createVNode("span", null, toDisplayString(unref(moment)(__props.project.expire_date).format("DD-MMM-Y")), 1)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/SingleListProject.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "SingleGridProject",
  __ssrInlineRender: true,
  props: ["project"],
  setup(__props) {
    const { formatCurrency } = sharedComposable();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(ssrRenderComponent(_component_Link, mergeProps({
        class: "bg-white shadow-box2 rounded-[8px] transition duration-100 hover:shadow-sm",
        href: _ctx.route("projects.show", __props.project.slug)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2;
          if (_push2) {
            _push2(`<div class="course-thumb h-[248px] rounded-t-[8px] relative"${_scopeId}><img${ssrRenderAttrs(mergeProps({
              alt: "",
              class: "w-full h-full object-cover rounded-t-[8px]"
            }, ssrGetDirectiveProps(_ctx, _directive_lazy, __props.project.preview)))}${_scopeId}><span class="absolute px-3 py-1 text-lg font-semibold text-white rounded bg-secondary left-6 top-6"${_scopeId}>${ssrInterpolate((_a2 = __props.project.category) == null ? void 0 : _a2.title)}</span></div><div class="p-8 course-content"${_scopeId}><div class="mb-3 text-2xl font-bold text-secondary"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(__props.project.invest_amount))}</div><h4 class="mb-3 text-xl font-bold"${_scopeId}>${ssrInterpolate(__props.project.title)}</h4><div class="flex flex-wrap justify-between space-y-1 xl:space-y-0"${_scopeId}><span class="flex items-center space-x-2"${_scopeId}><img src="/assets/images/svg/user2.svg" alt=""${_scopeId}><span${_scopeId}>${ssrInterpolate(__props.project.total_units)} ${ssrInterpolate(_ctx.trans("units"))}</span></span><span class="flex items-center space-x-2"${_scopeId}><img src="/assets/images/svg/file2.svg" alt=""${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(moment)(__props.project.expire_date).format("D-M-Y"))}</span></span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "course-thumb h-[248px] rounded-t-[8px] relative" }, [
                withDirectives(createVNode("img", {
                  alt: "",
                  class: "w-full h-full object-cover rounded-t-[8px]"
                }, null, 512), [
                  [_directive_lazy, __props.project.preview]
                ]),
                createVNode("span", { class: "absolute px-3 py-1 text-lg font-semibold text-white rounded bg-secondary left-6 top-6" }, toDisplayString((_b2 = __props.project.category) == null ? void 0 : _b2.title), 1)
              ]),
              createVNode("div", { class: "p-8 course-content" }, [
                createVNode("div", { class: "mb-3 text-2xl font-bold text-secondary" }, toDisplayString(unref(formatCurrency)(__props.project.invest_amount)), 1),
                createVNode("h4", { class: "mb-3 text-xl font-bold" }, toDisplayString(__props.project.title), 1),
                createVNode("div", { class: "flex flex-wrap justify-between space-y-1 xl:space-y-0" }, [
                  createVNode("span", { class: "flex items-center space-x-2" }, [
                    createVNode("img", {
                      src: "/assets/images/svg/user2.svg",
                      alt: ""
                    }),
                    createVNode("span", null, toDisplayString(__props.project.total_units) + " " + toDisplayString(_ctx.trans("units")), 1)
                  ]),
                  createVNode("span", { class: "flex items-center space-x-2" }, [
                    createVNode("img", {
                      src: "/assets/images/svg/file2.svg",
                      alt: ""
                    }),
                    createVNode("span", null, toDisplayString(unref(moment)(__props.project.expire_date).format("D-M-Y")), 1)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/SingleGridProject.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __default__$1 = defineComponent({ layout: _sfc_main$Y });
const _sfc_main$1 = /* @__PURE__ */ Object.assign(__default__$1, {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "projects",
    "categories",
    "category",
    "request",
    "max_invest",
    "min_invest"
  ],
  setup(__props) {
    var _a2, _b2, _c, _d;
    const props = __props;
    const { formatCurrency, pickBy } = sharedComposable();
    const filterForm = reactive({
      s: ((_a2 = props.request) == null ? void 0 : _a2.s) ?? "",
      ratings: [],
      min_invest: ((_b2 = props.request) == null ? void 0 : _b2.min_invest) ?? props.min_invest,
      max_invest: ((_c = props.request) == null ? void 0 : _c.max_invest) ?? props.max_invest,
      orderBy: ((_d = props.request) == null ? void 0 : _d.orderBy) || ""
    });
    const filter = () => {
      if (props.min_invest == filterForm.min_invest && props.max_invest == filterForm.max_invest) {
        filterForm.min_invest = null;
        filterForm.max_invest = null;
      }
      router.get(route("projects.index"), pickBy(filterForm), {
        preserveScroll: true,
        preserveState: true
      });
    };
    onMounted(() => {
      $("select").niceSelect();
      $("#tabs-nav li:first-child").addClass("active");
      $(".tab-content").hide();
      $(".tab-content:first").show();
      $("#tabs-nav li").click(function() {
        $("#tabs-nav li").removeClass("active");
        $(this).addClass("active");
        $(".tab-content").hide();
        var activeTab = $(this).find("a").attr("href");
        $(activeTab).fadeIn();
        return false;
      });
      $("#pricechnage").on("change", function() {
        $("body").toggleClass("price-toggole");
      });
      $(".grids").imagesLoaded(function() {
        $(".grids").isotope({
          itemSelector: ".grid-item",
          percentPosition: true,
          masonry: {
            // use outer width of grid-sizer for columnWidth
            columnWidth: 0
          }
        });
      });
      $(".filter-list").on("click", "li", function() {
        $(".filter-list li").removeClass("active");
        $(this).addClass("active");
        var filterValue = $(this).attr("data-filter");
        $(".grids").isotope({
          filter: filterValue
        });
        $(window).trigger("resize");
      });
      tippy(".tipy-info", {
        content: "Global content",
        trigger: "mouseenter",
        theme: "primary",
        animation: "scale"
      });
      $(".slider-for").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        //arrows: false,
        fade: true,
        asNavFor: ".slider-nav",
        prevArrow: $(".slickprev"),
        nextArrow: $(".slicknext")
      });
      $(".slider-nav").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: ".slider-for",
        dots: false,
        focusOnSelect: true
      });
      $(".slider-range").slider({
        range: true,
        min: props.min_invest,
        max: props.max_invest,
        step: 10,
        values: [filterForm.min_invest, filterForm.max_invest],
        slide: function slide(event, ui) {
          filterForm.min_invest = ui.values[0];
          filterForm.max_invest = ui.values[1];
          let min = formatCurrency(ui.values[0]);
          let max = formatCurrency(ui.values[1]);
          $(".amount").val(`${min} - ${max}`);
        }
      });
      $(".amount").val(
        `${formatCurrency(filterForm.min_invest)} - ${formatCurrency(filterForm.max_invest)}`
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a3;
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[--><div class="breadcrumbs section-padding bg-[url(&#39;../images/all-img/bred.png&#39;)] bg-cover bg-center bg-no-repeat"><div class="container text-center"><h2>${ssrInterpolate(unref(trans)("Projects"))}</h2><nav><ol class="flex items-center justify-center space-x-3"><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_Link, { href: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(trans)("Home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(trans)("Home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item">-</li><li class="text-primary">`);
      _push(ssrRenderComponent(_component_Link, { href: "/projects" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(trans)("Projects"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(trans)("Projects")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li>`);
      if (__props.category) {
        _push(`<!--[--><li class="breadcrumb-item">-</li><li class="text-primary">${ssrInterpolate((_a3 = __props.category) == null ? void 0 : _a3.title)}</li><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</ol></nav></div></div><div class="nav-tab-wrapper tabs section-padding-bottom pt-10"><div class="container"><div class="grid grid-cols-12 gap-[30px]"><div class="col-span-12 lg:col-span-8"><div class="mb-14 flex flex-col items-center space-y-6 md:flex-row md:space-y-0"><div class="flex flex-1 flex-col items-center space-x-6 sm:flex-row"><ul id="tabs-nav" class="cata-Tbas flex space-x-4"><li><a href="#tab1" class="flex h-[60px] w-[60px] flex-col items-center justify-center"><iconify-icon icon="clarity:grid-view-line"></iconify-icon></a></li><li><a href="#tab2" class="flex h-[60px] w-[60px] flex-col items-center justify-center"><iconify-icon icon="ant-design:unordered-list-outlined"></iconify-icon></a></li></ul><span class="mt-4 inline-block md:mt-0">${ssrInterpolate(unref(trans)("Showing"))} ${ssrInterpolate(__props.projects.to ?? 0)} ${ssrInterpolate(unref(trans)("projects of"))} ${ssrInterpolate(__props.projects.total)}</span></div><div class="flex-0"><div class="min-w-[272px]">`);
      _push(ssrRenderComponent(_sfc_main$a, {
        modelValue: filterForm.orderBy,
        "onUpdate:modelValue": ($event) => filterForm.orderBy = $event,
        options: ["Latest", "Oldest"],
        onChange: ($event) => filter(),
        placeholder: "Sort By"
      }, null, _parent));
      _push(`</div></div></div><div id="tabs-content"><div id="tab1" class="tab-content"><div class="grid grid-cols-1 gap-[30px] md:grid-cols-2"><!--[-->`);
      ssrRenderList(__props.projects.data, (project) => {
        _push(ssrRenderComponent(_sfc_main$2, { project }, null, _parent));
      });
      _push(`<!--]--></div>`);
      if (__props.projects.total == 0) {
        _push(`<h5 class="text-center">${ssrInterpolate(unref(trans)("No projects found"))}</h5>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div id="tab2" class="tab-content"><div class="grid grid-cols-1 gap-[30px]"><!--[-->`);
      ssrRenderList(__props.projects.data, (project) => {
        _push(ssrRenderComponent(_sfc_main$3, { project }, null, _parent));
      });
      _push(`<!--]--></div></div>`);
      _push(ssrRenderComponent(_sfc_main$i, { links: __props.projects }, null, _parent));
      _push(`</div></div><div class="col-span-12 lg:col-span-4"><div class="sidebarWrapper space-y-[30px]"><div class="wdiget widget_search"><form><div class="shadow-e1 relative flex items-center rounded-md bg-[#F8F8F8] py-[4px] pl-3"><div class="flex-1"><input${ssrRenderAttr("value", filterForm.s)} type="text" placeholder="Search keyword..." class="border-none bg-transparent focus:ring-0"></div><div class="flex-none"><button class="btn btn-primary"><img src="/assets/images/icon/search.svg" alt=""></button></div></div></form></div><div class="wdiget widget_catagory"><h4 class="widget-title">${ssrInterpolate(unref(trans)("Categories"))}</h4><ul class="list-item space-y-4"><!--[-->`);
      ssrRenderList(__props.categories, (cat) => {
        var _a4;
        _push(`<li class="block">`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("project-categories.show", cat.slug),
          class: ["hover:bg-primary flex justify-between rounded px-5 py-[17px] transition-all duration-150 hover:text-white", [((_a4 = __props.category) == null ? void 0 : _a4.id) == cat.id ? "bg-primary text-white" : "bg-[#F8F8F8]"]]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>${ssrInterpolate(cat.title)} (${ssrInterpolate(cat.projects_count)})</span><span class="text-2xl"${_scopeId}><iconify-icon icon="heroicons:chevron-right-20-solid"${_scopeId}></iconify-icon></span>`);
            } else {
              return [
                createVNode("span", null, toDisplayString(cat.title) + " (" + toDisplayString(cat.projects_count) + ")", 1),
                createVNode("span", { class: "text-2xl" }, [
                  createVNode("iconify-icon", { icon: "heroicons:chevron-right-20-solid" })
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div><div class="wdiget widget_catagory"><h4 class="widget-title">${ssrInterpolate(unref(trans)("Rating By"))}</h4><ul class="list-item space-y-5"><!--[-->`);
      ssrRenderList(5, (item) => {
        _push(`<li class="block"><label class="form-check flex cursor-pointer space-x-3"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(filterForm.ratings) ? ssrLooseContain(filterForm.ratings, item) : filterForm.ratings) ? " checked" : ""} class="form-check-input hidden"${ssrRenderAttr("value", item)}><span class="ck-box flex flex-col items-center justify-center"><img src="/assets/images/icon/white-check.svg" alt="" class="object-contain"></span><span class="form-check-label"><img${ssrRenderAttrs(mergeProps({ alt: "" }, ssrGetDirectiveProps(_ctx, _directive_lazy, `/assets/images/svg/rating-${item}.svg`)))}></span></label></li>`);
      });
      _push(`<!--]--></ul></div><div class="wdiget widget_catagory"><h4 class="widget-title">${ssrInterpolate(unref(trans)("Price Filter"))}</h4><div class="slider-range"></div><div class="price_slider_amount"><div class="mt-6"><div class="flex space-x-2 text-xl font-medium text-black"><span class="flex-none">${ssrInterpolate(unref(trans)("Price"))}:</span><input type="text" name="price" readonly placeholder="Select Range" class="amount flex-1 border-none p-0 text-xl font-medium text-black focus:outline-none focus:ring-0"></div></div></div></div><div><button class="btn btn-primary w-full">${ssrInterpolate(unref(trans)("Filter"))}</button></div></div></div></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Web/Projects/Index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __vite_glob_0_133 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1
}, Symbol.toStringTag, { value: "Module" }));
const __default__ = defineComponent({ layout: _sfc_main$Y });
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "Show",
  __ssrInlineRender: true,
  props: [
    "project",
    "profitReturn",
    "availableUnits",
    "canReview",
    "percentageByStar",
    "relatedProjects"
  ],
  setup(__props) {
    var _a2, _b2;
    const props = __props;
    const { formatCurrency, socialShare, authUser } = sharedComposable();
    const unitQuantity = ref(1);
    const selectedDurations = ref([(_b2 = (_a2 = props.project) == null ? void 0 : _a2.durations[0]) == null ? void 0 : _b2.id]);
    const reviews = ref([]);
    ref(1);
    const loadMoreReviews = ref(true);
    const investByWallet = ref(false);
    const calculatePercentage = (value, percentage) => {
      return percentage / 100 * value;
    };
    const calculateProfitReturn = (id, profit, isFixed = true) => {
      const quantity = selectedDurations.value.includes(id) ? unitQuantity.value : 1;
      return formatCurrency(
        isFixed ? profit : calculatePercentage(props.project.invest_amount, profit) * quantity
      );
    };
    const loading = ref(false);
    const submit = () => {
      if (props.alreadyInvested) {
        return;
      }
      loading.value = true;
      router.post(
        route("payment.store"),
        {
          unit_price: props.project.invest_amount,
          project: props.project.id,
          qty: unitQuantity.value,
          durations: selectedDurations.value,
          by_wallet: investByWallet.value
        },
        {
          preserveScroll: true
        }
      );
      loading.value = false;
    };
    const reviewForm = useForm({
      star: null,
      comment: "",
      project_id: props.project.id
    });
    const getReviews = () => {
      axios.get(
        route("api-project.reviews", {
          id: props.project.id
        })
      ).then((res) => {
        reviews.value = res.data.data;
        if (res.data.current_page === res.data.last_page) {
          return loadMoreReviews.value = false;
        }
      });
    };
    onMounted(() => {
      $("#tabs-nav li:first-child").addClass("active");
      $(".tab-content").hide();
      $(".tab-content:first").show();
      setTimeout(() => {
        getReviews();
      }, 1e3);
      $(".accrodain-button").on("click", function() {
        var element = $(this).parent("li");
        if (element.hasClass("open")) {
          element.removeClass("open");
          element.find("li").removeClass("open");
          element.find(".content").slideUp(200);
        } else {
          element.addClass("open");
          element.children(".content").slideDown(200);
          element.siblings("li").children(".content").slideUp();
          element.siblings("li").removeClass("open");
          element.siblings("li").find("li").removeClass("open");
          element.siblings("li").find(".content").slideUp();
        }
      });
    });
    ref();
    return (_ctx, _push, _parent, _attrs) => {
      var _a3, _b3, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$13, {
        PageName: __props.project.title
      }, null, _parent));
      _push(`<div class="nav-tab-wrapper tabs section-padding"><div class="container"><div class="grid grid-cols-12 gap-[30px]"><div class="col-span-12 lg:col-span-8"><div class="single-course-details"><div class="course-main-thumb mb-10 h-[350px] xl:h-[470px]"><img${ssrRenderAttrs(mergeProps({
        alt: "cover_image",
        class: "block object-cover w-full h-full rounded-md"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, __props.project.cover_image ?? __props.project.preview)))}></div><div class="mb-6"><span class="px-3 py-1 text-lg font-semibold text-white rounded bg-secondary">${ssrInterpolate((_a3 = __props.project.category) == null ? void 0 : _a3.title)}</span></div><h2>${ssrInterpolate(__props.project.title)}</h2><div class="mt-12 nav-tab-wrapper"><ul id="tabs-nav" class="mb-8 course-tab"><li><a href="#tab1">${ssrInterpolate(_ctx.trans("Summary"))}</a></li><li><a href="#tab2">${ssrInterpolate(_ctx.trans("Invest"))}</a></li><li><a href="#tab3">${ssrInterpolate(_ctx.trans("About"))}</a></li><li><a href="#tab4">${ssrInterpolate(_ctx.trans("Review"))}</a></li><li><a href="#tab5">${ssrInterpolate(_ctx.trans("Faq"))}</a></li></ul><div id="tabs-content"><div id="tab1" class="tab-content"><div><h3 class="text-2xl">${ssrInterpolate(_ctx.trans("Summary"))}</h3><div class="grid grid-cols-2 gap-5 p-4 font-semibold rounded shadow-md"><div class=""><p class="text-sm">${ssrInterpolate(_ctx.trans("Return"))}</p><p class="text-red-400">${ssrInterpolate(((_c = (_b3 = __props.profitReturn) == null ? void 0 : _b3.min) == null ? void 0 : _c.is_fixed) ? unref(formatCurrency)(((_e = (_d = __props.profitReturn) == null ? void 0 : _d.min) == null ? void 0 : _e.value) || 0) : `${((_g = (_f = __props.profitReturn) == null ? void 0 : _f.min) == null ? void 0 : _g.value) || 0}%`)} - ${ssrInterpolate(((_i = (_h = __props.profitReturn) == null ? void 0 : _h.max) == null ? void 0 : _i.is_fixed) ? unref(formatCurrency)(((_k = (_j = __props.profitReturn) == null ? void 0 : _j.max) == null ? void 0 : _k.value) || 0) : `${((_m = (_l = __props.profitReturn) == null ? void 0 : _l.max) == null ? void 0 : _m.value) || 0}%`)}</p></div><div class=""><p class="text-sm">${ssrInterpolate(_ctx.trans("Return Type"))}</p><p class="text-red-400">${ssrInterpolate((_n = __props.project.category) == null ? void 0 : _n.title)}</p></div><div class=""><p class="text-sm">${ssrInterpolate(_ctx.trans("Durations"))}</p><p class="text-red-400"><!--[-->`);
      ssrRenderList(__props.project.durations, (duration, i) => {
        _push(`<!--[-->${ssrInterpolate(duration.duration)}/${ssrInterpolate(duration.duration_type)} `);
        if (__props.project.durations.length - 1 !== i) {
          _push(`<!--[-->, <!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></p></div><div class=""><p class="text-sm">${ssrInterpolate(_ctx.trans("Location"))}</p><p class="text-red-400">${ssrInterpolate(__props.project.address)}</p></div><div class=""><p class="text-sm">${ssrInterpolate(_ctx.trans("Total Return"))}</p><p class="text-red-400">${ssrInterpolate(unref(formatCurrency)(
        calculatePercentage(
          __props.project.invest_amount,
          ((_p = (_o = __props.profitReturn) == null ? void 0 : _o.min) == null ? void 0 : _p.value) ?? 0
        )
      ))} - ${ssrInterpolate(unref(formatCurrency)(
        calculatePercentage(
          __props.project.invest_amount,
          ((_r = (_q = __props.profitReturn) == null ? void 0 : _q.max) == null ? void 0 : _r.value) ?? 0
        )
      ))}</p></div></div></div></div><div id="tab2" class="tab-content">`);
      if (__props.availableUnits) {
        _push(`<!--[-->`);
        if (__props.project.accept_new_investor) {
          _push(`<div class="space-y-5"><h3 class="text-2xl">Invest</h3><div class="grid grid-cols-4 text-sm gap-x-3"><label class="font-bold text-black">${ssrInterpolate(_ctx.trans("Duration"))}</label><label class="font-bold text-black">${ssrInterpolate(_ctx.trans("ROI"))}</label><label class="font-bold text-black">${ssrInterpolate(_ctx.trans("Loss Range"))}</label><label class="font-bold text-black">${ssrInterpolate(_ctx.trans("Net Profit"))}</label><div class="my-4 space-y-1 col-span-full"><!--[-->`);
          ssrRenderList(__props.project.durations, (duration) => {
            _push(`<div class="${ssrRenderClass([{
              "bg-red-300 text-white": selectedDurations.value.includes(
                duration.id
              )
            }, "grid grid-cols-4 p-3 bg-gray-100 rounded cursor-pointer gap-x-3 text-start"])}"><div class="flex items-center gap-x-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass(
              selectedDurations.value.includes(duration.id) ? "visible" : "invisible"
            )}" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"></path></svg><span>${ssrInterpolate(duration.duration)}/${ssrInterpolate(duration.duration_type)}</span></div><p>${ssrInterpolate(`${duration.return_type == "fixed" ? unref(formatCurrency)(duration.min_profit_return) : duration.min_profit_return + "%"}`)} - ${ssrInterpolate(`${duration.return_type == "fixed" ? unref(formatCurrency)(duration.max_profit_return) : duration.max_profit_return + "%"}`)}</p><p>${ssrInterpolate(`${duration.return_type == "fixed" ? unref(formatCurrency)(duration.loss_min_range) : duration.loss_min_range + "%"}`)} - ${ssrInterpolate(`${duration.return_type == "fixed" ? unref(formatCurrency)(duration.loss_max_range) : duration.loss_max_range + "%"}`)}</p><p>${ssrInterpolate(calculateProfitReturn(
              duration.id,
              duration.min_profit_return,
              duration.return_type == "fixed"
            ))} - ${ssrInterpolate(calculateProfitReturn(
              duration.id,
              duration.max_profit_return
            ))}</p></div>`);
          });
          _push(`<!--]--></div></div><div class="grid items-center grid-cols-2">`);
          if (unref(authUser)) {
            _push(`<div class="col-span-1"><label for="investByWallet" class="flex items-center gap-2"><input type="checkbox" class="p-2 text-red-600 rounded bg-red-paste border-primary"${ssrIncludeBooleanAttr(Array.isArray(investByWallet.value) ? ssrLooseContain(investByWallet.value, null) : investByWallet.value) ? " checked" : ""} id="investByWallet"> ${ssrInterpolate(_ctx.trans("Invest by wallet"))} (${ssrInterpolate(unref(formatCurrency)(unref(authUser).wallet))}) </label></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex justify-between w-full"><span class="ml-1 text-lg font-semibold">${ssrInterpolate(_ctx.trans("Total"))}:</span><span class="ml-1 text-lg">${ssrInterpolate(selectedDurations.value.length * unitQuantity.value)} ${ssrInterpolate(_ctx.trans("units"))}</span><span class="col-span-3 mr-10 text-end">${ssrInterpolate(unref(formatCurrency)(
            __props.project.invest_amount * unitQuantity.value * selectedDurations.value.length
          ))}</span></div></div>`);
          if (_ctx.$page.props.errors["not_enough_balance"]) {
            _push(`<p class="text-red-500">${ssrInterpolate(_ctx.$page.props.errors["not_enough_balance"])}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex items-center gap-5">`);
          if (__props.availableUnits == 0) {
            _push(`<div class="flex justify-center w-full btn btn-primary disabled:cursor-not-allowed">${ssrInterpolate(_ctx.trans("All units are booked"))}</div>`);
          } else {
            _push(`<!---->`);
          }
          if (__props.availableUnits > 0) {
            _push(`<div class="flex items-center gap-3"><button${ssrIncludeBooleanAttr(selectedDurations.value.length < 1 || unitQuantity.value === 1) ? " disabled" : ""} class="px-4 py-2 text-white bg-red-400 rounded-md disabled:cursor-not-allowed"> - </button><span>${ssrInterpolate(unitQuantity.value)}</span><button${ssrIncludeBooleanAttr(selectedDurations.value.length < 1) ? " disabled" : ""} class="px-4 py-2 text-white bg-red-400 rounded-md disabled:cursor-not-allowed"> + </button></div>`);
          } else {
            _push(`<!---->`);
          }
          if (__props.availableUnits > 0) {
            _push(ssrRenderComponent(_sfc_main$2w, {
              type: "button",
              onClick: submit,
              processing: loading.value,
              disabled: selectedDurations.value.length < 1,
              "btn-text": _ctx.trans("Book Now"),
              classes: "w-full justify-center flex btn btn-primary disabled:cursor-not-allowed"
            }, null, _parent));
          } else {
            _push(`<button type="button" disabled class="w-full text-center bg-opacity-50 btn btn-primary disabled:cursor-not-allowed">${ssrInterpolate(_ctx.trans(" Stook Out"))}</button>`);
          }
          _push(`</div></div>`);
        } else if (__props.availableUnits) {
          _push(`<p class="text-red-600">${ssrInterpolate(_ctx.trans("Currently we are not accept new investments."))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<p class="text-red-600">${ssrInterpolate(_ctx.trans("All the units has been booked"))}</p>`);
      }
      _push(`</div><div id="tab3" class="tab-content"><div class="rounded-md bg-[#F8F8F8] p-8"><div>${__props.project.metas.find((p) => p.key == "main_description").value}</div></div></div><div id="tab4" class="tab-content"><div>`);
      if (__props.canReview) {
        _push(`<form class="w-full p-8 mt-10 space-y-4 bg-white border border-gray-100 rounded-md shadow-box7"><h5 class="text-gray-500">${ssrInterpolate(_ctx.trans("Write a review"))}</h5>`);
        _push(ssrRenderComponent(_sfc_main$a, {
          "extended-label": "Star",
          modelValue: unref(reviewForm).star,
          "onUpdate:modelValue": ($event) => unref(reviewForm).star = $event,
          options: [1, 2, 3, 4, 5],
          placeholder: "Select Star"
        }, null, _parent));
        _push(`<div><label>${ssrInterpolate(_ctx.trans("Review"))}</label><textarea type="text" required class="from-control" placeholder="Type Your Review">${ssrInterpolate(unref(reviewForm).comment)}</textarea>`);
        _push(ssrRenderComponent(_sfc_main$24, {
          message: unref(reviewForm).errors.comment
        }, null, _parent));
        _push(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(reviewForm).processing) ? " disabled" : ""} class="mt-8 btn btn-primary">${ssrInterpolate(_ctx.trans("Submit"))}</button></form>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="grid grid-cols-12 gap-5"><div class="col-span-12 md:col-span-8"><!--[-->`);
      ssrRenderList([5, 4, 3, 2, 1], (item) => {
        _push(`<div class="flex items-center mb-5 space-x-4 last:mb-0"><div class="flex-none"><div class="flex space-x-1 text-xl"><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<iconify-icon icon="heroicons:star-20-solid" class="${ssrRenderClass(
            i < item + 1 ? "text-tertiary" : " text-[#E6E6E6]"
          )}"></iconify-icon>`);
        });
        _push(`<!--]--></div></div><div class="flex-1"><div class="flex items-center space-x-4 progressbar-group"><div class="relative h-[6px] flex-1 overflow-hidden rounded-[2px] bg-black bg-opacity-10"><div class="ani bg-secondary absolute left-0 top-1/2 block h-[6px] -translate-y-1/2" style="${ssrRenderStyle({ width: `${__props.percentageByStar[item]}%` })}"></div></div><div class="flex-none w-8"><span class="block mb-2 font-semibold">${ssrInterpolate(__props.percentageByStar[item])}% </span></div></div></div></div>`);
      });
      _push(`<!--]--></div><div class="col-span-12 md:col-span-4"><div class="shadow-box7 flex min-h-[219px] flex-col items-center justify-center space-y-3 rounded bg-white p-6"><h2>${ssrInterpolate(__props.project.reviews_avg_star ? parseFloat(__props.project.reviews_avg_star).toFixed(1) : 0)}</h2><div class="flex space-x-3"><!--[-->`);
      ssrRenderList(Math.round(__props.project.reviews_avg_star), (star) => {
        _push(`<iconify-icon icon="heroicons:star-20-solid" class="text-tertiary"></iconify-icon>`);
      });
      _push(`<!--]--></div><span class="block">(${ssrInterpolate(__props.project.reviews_count)} ${ssrInterpolate(_ctx.trans("Review"))})</span></div></div></div><div class="mt-8"><h4 class="text-xl font-bold text-black">${ssrInterpolate(_ctx.trans("Reviews"))}</h4>`);
      if (((_s = reviews.value) == null ? void 0 : _s.length) > 0) {
        _push(`<ul class="mt-6 space-y-5 list"><!--[-->`);
        ssrRenderList(reviews.value, (review) => {
          _push(`<li class="flex space-x-5"><div class="flex-none"><div class="w-16 h-16 rounded-full"><img${ssrRenderAttrs(mergeProps({
            alt: "avatar",
            class: "object-cover w-full h-full rounded-full"
          }, ssrGetDirectiveProps(
            _ctx,
            _directive_lazy,
            review.user.avatar == null ? `https://ui-avatars.com/api/?name=${review.user.name}` : `${review.user.avatar}`
          )))}></div></div><div class="flex-1"><div class="flex mb-2 space-x-3"><!--[-->`);
          ssrRenderList(review.star, (i) => {
            _push(`<iconify-icon icon="heroicons:star-20-solid" class="text-tertiary"></iconify-icon>`);
          });
          _push(`<!--]--></div><p>${ssrInterpolate(review.comment)}</p><div class="mt-2 author"><span class="block text-lg font-bold text-black">${ssrInterpolate(review.user.name)}</span><span class="block text-sm">${ssrInterpolate(unref(moment)(review.created_at).format("MMM DD, YYYY"))}</span></div></div></li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<h5 class="mt-5 text-center">${ssrInterpolate(_ctx.trans("No Reviews"))}</h5>`);
      }
      if (loadMoreReviews.value && reviews.value.length > 1) {
        _push(`<div class="text-center pt-14"><button type="button" class="btn btn-primary inline-flex items-center space-x-[10px]"><span>${ssrInterpolate(_ctx.trans("Load More"))}</span><span class="relative top-1"><iconify-icon icon="ion:reload-outline"></iconify-icon></span></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div id="tab5" class="tab-content"><div><ul class="list accrodains"><!--[-->`);
      ssrRenderList(__props.project.faqs, (item) => {
        _push(`<li class="mb-2 border border-gray-200"><button type="button" class="accrodain-button"><span>${ssrInterpolate(item.qns)}</span><span class="icon-pm"></span></button><div class="hidden content">${ssrInterpolate(item.ans)}</div></li>`);
      });
      _push(`<!--]--></ul></div></div></div></div></div></div><div class="col-span-12 lg:col-span-4"><div class="sidebarWrapper space-y-[30px]"><div class="space-y-5 wdiget custom-text"><a class="relative block h-[220px] rounded" href="#"><img${ssrRenderAttrs(mergeProps({
        alt: "",
        class: "block object-cover w-full h-full rounded"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy, __props.project.preview)))}></a><h3>${ssrInterpolate(unref(formatCurrency)(__props.project.invest_amount))}/${ssrInterpolate(_ctx.trans("unit"))}</h3><button class="w-full text-center btn btn-primary">${ssrInterpolate(_ctx.trans(" Book Now"))}</button><ul class="list"><li class="past:mb-0 mb-4 flex space-x-3 border-b border-[#ECECEC] pb-4 last:border-0 last:pb-0"><div class="flex flex-1 space-x-3"><img src="/assets/images/icon/file2.svg" alt=""><div class="font-semibold text-black">${ssrInterpolate(_ctx.trans("Total Unit"))}</div></div><div class="flex-none">${ssrInterpolate(__props.project.total_units)}</div></li><li class="past:mb-0 mb-4 flex space-x-3 border-b border-[#ECECEC] pb-4 last:border-0 last:pb-0"><div class="flex flex-1 space-x-3"><img src="/assets/images/icon/clock.svg" alt=""><div class="font-semibold text-black">${ssrInterpolate(_ctx.trans("Expire Date"))}</div></div><div class="flex-none">${ssrInterpolate(unref(moment)(__props.project.expire_date).format("D MMM, YYYY"))}</div></li><li class="past:mb-0 mb-4 flex space-x-3 border-b border-[#ECECEC] pb-4 last:border-0 last:pb-0"><div class="flex flex-1 space-x-3"><img src="/assets/images/icon/star.svg" alt=""><div class="font-semibold text-black">${ssrInterpolate(_ctx.trans("Available Units"))}</div></div><div class="flex-none">${ssrInterpolate(__props.availableUnits)}</div></li><li class="past:mb-0 mb-4 flex space-x-3 border-b border-[#ECECEC] pb-4 last:border-0 last:pb-0"><div class="flex flex-1 space-x-3"><img src="/assets/images/icon/target.svg" alt=""><div class="font-semibold text-black">${ssrInterpolate(_ctx.trans("Return Type"))}</div></div><div class="flex-none">${ssrInterpolate((_t = __props.project.category) == null ? void 0 : _t.title)}</div></li><li class="past:mb-0 mb-4 flex space-x-3 border-b border-[#ECECEC] pb-4 last:border-0 last:pb-0"><div class="flex flex-1 space-x-3"><img src="/assets/images/icon/web.svg" alt=""><div class="font-semibold text-black">${ssrInterpolate(_ctx.trans("Address"))}</div></div><div class="flex-none">${ssrInterpolate(__props.project.address)}</div></li></ul><ul class="flex items-center pt-3 space-x-4"><li class="font-semibold text-black">${ssrInterpolate(_ctx.trans("Share On"))}:</li><!--[-->`);
      ssrRenderList(["facebook", "twitter", "instagram", "pinterest"], (media) => {
        _push(`<li><a target="_blank"${ssrRenderAttr("href", unref(socialShare)(media))} class="flex w-10 h-10"><img${ssrRenderAttrs(mergeProps({
          alt: media + " icon"
        }, ssrGetDirectiveProps(_ctx, _directive_lazy, `/assets/images/icon/${media}.svg`)))}></a></li>`);
      });
      _push(`<!--]--></ul></div>`);
      if (__props.relatedProjects.length) {
        _push(`<div class="wdiget"><h4 class="widget-title">${ssrInterpolate(_ctx.trans("Related Projects"))}</h4><ul class="list"><!--[-->`);
        ssrRenderList(__props.relatedProjects, (project) => {
          _push(`<li class="mb-6 flex space-x-4 border-b border-[#ECECEC] pb-6 last:mb-0 last:border-0 last:pb-0"><div class="flex-none"><div class="w-20 h-20 rounded"><img${ssrRenderAttrs(mergeProps({
            alt: "",
            class: "object-cover w-full h-full rounded"
          }, ssrGetDirectiveProps(_ctx, _directive_lazy, project.preview)))}></div></div><div class="flex-1"><div class="flex mb-2 space-x-3"><!--[-->`);
          ssrRenderList(5, (item) => {
            _push(`<!--[-->`);
            if (item <= parseInt(project.reviews_avg_star)) {
              _push(`<iconify-icon icon="heroicons:star-20-solid" class="text-tertiary"></iconify-icon>`);
            } else {
              _push(`<iconify-icon icon="heroicons:star-20-solid" class="text-[#E6E6E6]"></iconify-icon>`);
            }
            _push(`<!--]-->`);
          });
          _push(`<!--]--></div><div class="mb-1 font-semibold text-black">${ssrInterpolate(project.title)}</div><span class="font-semibold text-secondary">${ssrInterpolate(unref(formatCurrency)(project.invest_amount))}</span></div></li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Web/Projects/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __vite_glob_0_134 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));
window.axios = axios$1;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
const _default = "";
const payment = "";
const appName = ((_b = document.querySelector('meta[name="app-name"]')) == null ? void 0 : _b.content) || "Laravel";
ref(false);
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    const pages = /* @__PURE__ */ Object.assign({ "./Pages/Admin/Admin/Create.vue": __vite_glob_0_0, "./Pages/Admin/Admin/Edit.vue": __vite_glob_0_1, "./Pages/Admin/Admin/Index.vue": __vite_glob_0_2, "./Pages/Admin/Blogs/Categories/Index.vue": __vite_glob_0_3, "./Pages/Admin/Blogs/Create.vue": __vite_glob_0_4, "./Pages/Admin/Blogs/Edit.vue": __vite_glob_0_5, "./Pages/Admin/Blogs/Index.vue": __vite_glob_0_6, "./Pages/Admin/Blogs/Tags/Index.vue": __vite_glob_0_7, "./Pages/Admin/Brand/Index.vue": __vite_glob_0_8, "./Pages/Admin/Cron/Index.vue": __vite_glob_0_9, "./Pages/Admin/Customers/Index.vue": __vite_glob_0_10, "./Pages/Admin/Customers/Show.vue": __vite_glob_0_11, "./Pages/Admin/Dashboard.vue": __vite_glob_0_12, "./Pages/Admin/Developer/App.vue": __vite_glob_0_13, "./Pages/Admin/Developer/Cookie.vue": __vite_glob_0_14, "./Pages/Admin/Developer/Features.vue": __vite_glob_0_15, "./Pages/Admin/Developer/Newsletter.vue": __vite_glob_0_16, "./Pages/Admin/Developer/Smtp.vue": __vite_glob_0_17, "./Pages/Admin/Developer/SocialLogin.vue": __vite_glob_0_18, "./Pages/Admin/Developer/Storage.vue": __vite_glob_0_19, "./Pages/Admin/EventOrder/Index.vue": __vite_glob_0_20, "./Pages/Admin/EventOrder/Show.vue": __vite_glob_0_21, "./Pages/Admin/Events/Create.vue": __vite_glob_0_22, "./Pages/Admin/Events/Edit.vue": __vite_glob_0_23, "./Pages/Admin/Events/Index.vue": __vite_glob_0_24, "./Pages/Admin/Events/Participants.vue": __vite_glob_0_25, "./Pages/Admin/Faq/Index.vue": __vite_glob_0_26, "./Pages/Admin/Feature/Create.vue": __vite_glob_0_27, "./Pages/Admin/Feature/Edit.vue": __vite_glob_0_28, "./Pages/Admin/Feature/Index.vue": __vite_glob_0_29, "./Pages/Admin/Gateway/Create.vue": __vite_glob_0_30, "./Pages/Admin/Gateway/Edit.vue": __vite_glob_0_31, "./Pages/Admin/Gateway/Index.vue": __vite_glob_0_32, "./Pages/Admin/Invest/Index.vue": __vite_glob_0_33, "./Pages/Admin/Investors/Create.vue": __vite_glob_0_34, "./Pages/Admin/Investors/Edit.vue": __vite_glob_0_35, "./Pages/Admin/Investors/Index.vue": __vite_glob_0_36, "./Pages/Admin/KYC/Methods/Create.vue": __vite_glob_0_37, "./Pages/Admin/KYC/Methods/Edit.vue": __vite_glob_0_38, "./Pages/Admin/KYC/Methods/Index.vue": __vite_glob_0_39, "./Pages/Admin/KYC/Requests/Index.vue": __vite_glob_0_40, "./Pages/Admin/KYC/Requests/Show.vue": __vite_glob_0_41, "./Pages/Admin/Language/Index.vue": __vite_glob_0_42, "./Pages/Admin/Language/Show.vue": __vite_glob_0_43, "./Pages/Admin/Logs/Notification/Index.vue": __vite_glob_0_44, "./Pages/Admin/Logs/WalletTransactions/Index.vue": __vite_glob_0_45, "./Pages/Admin/Logs/WalletTransactions/Show.vue": __vite_glob_0_46, "./Pages/Admin/Menu/Index.vue": __vite_glob_0_47, "./Pages/Admin/Menu/Show.vue": __vite_glob_0_48, "./Pages/Admin/Order/Index.vue": __vite_glob_0_49, "./Pages/Admin/Order/Show.vue": __vite_glob_0_50, "./Pages/Admin/Page/Create.vue": __vite_glob_0_51, "./Pages/Admin/Page/Edit.vue": __vite_glob_0_52, "./Pages/Admin/Page/Index.vue": __vite_glob_0_53, "./Pages/Admin/PageSetting/About.vue": __vite_glob_0_54, "./Pages/Admin/PageSetting/Home.vue": __vite_glob_0_55, "./Pages/Admin/PageSetting/Index.vue": __vite_glob_0_56, "./Pages/Admin/PageSetting/Primary.vue": __vite_glob_0_57, "./Pages/Admin/PayoutMethod/Create.vue": __vite_glob_0_58, "./Pages/Admin/PayoutMethod/Edit.vue": __vite_glob_0_59, "./Pages/Admin/PayoutMethod/Index.vue": __vite_glob_0_60, "./Pages/Admin/Payouts/Index.vue": __vite_glob_0_61, "./Pages/Admin/Payouts/Show.vue": __vite_glob_0_62, "./Pages/Admin/Profile/Edit.vue": __vite_glob_0_63, "./Pages/Admin/ProjectCategories/Index.vue": __vite_glob_0_64, "./Pages/Admin/Projects/Create.vue": __vite_glob_0_65, "./Pages/Admin/Projects/Edit.vue": __vite_glob_0_66, "./Pages/Admin/Projects/Index.vue": __vite_glob_0_67, "./Pages/Admin/Projects/ReturnSchedules/Create.vue": __vite_glob_0_68, "./Pages/Admin/Projects/ReturnSchedules/Edit.vue": __vite_glob_0_69, "./Pages/Admin/Projects/ReturnSchedules/Index.vue": __vite_glob_0_70, "./Pages/Admin/Referrals/Commissions.vue": __vite_glob_0_71, "./Pages/Admin/Referrals/History.vue": __vite_glob_0_72, "./Pages/Admin/ReturnTransaction/Index.vue": __vite_glob_0_73, "./Pages/Admin/Role/Create.vue": __vite_glob_0_74, "./Pages/Admin/Role/Edit.vue": __vite_glob_0_75, "./Pages/Admin/Role/Index.vue": __vite_glob_0_76, "./Pages/Admin/Seo/Index.vue": __vite_glob_0_77, "./Pages/Admin/Seo/Show.vue": __vite_glob_0_78, "./Pages/Admin/Support/Index.vue": __vite_glob_0_79, "./Pages/Admin/Support/Show.vue": __vite_glob_0_80, "./Pages/Admin/Team/Create.vue": __vite_glob_0_81, "./Pages/Admin/Team/Edit.vue": __vite_glob_0_82, "./Pages/Admin/Team/Index.vue": __vite_glob_0_83, "./Pages/Admin/Testimonial/Index.vue": __vite_glob_0_84, "./Pages/Auth/ConfirmPassword.vue": __vite_glob_0_85, "./Pages/Auth/ForgotPassword.vue": __vite_glob_0_86, "./Pages/Auth/Login.vue": __vite_glob_0_87, "./Pages/Auth/Register.vue": __vite_glob_0_88, "./Pages/Auth/ResetPassword.vue": __vite_glob_0_89, "./Pages/Auth/VerifyEmail.vue": __vite_glob_0_90, "./Pages/User/AccountSettings.vue": __vite_glob_0_91, "./Pages/User/Affiliate.vue": __vite_glob_0_92, "./Pages/User/ChangePassword.vue": __vite_glob_0_93, "./Pages/User/Dashboard.vue": __vite_glob_0_94, "./Pages/User/EventOrder/Index.vue": __vite_glob_0_95, "./Pages/User/EventOrder/Show.vue": __vite_glob_0_96, "./Pages/User/Investments/Index.vue": __vite_glob_0_97, "./Pages/User/Investments/Show.vue": __vite_glob_0_98, "./Pages/User/KYC/Create.vue": __vite_glob_0_99, "./Pages/User/KYC/Index.vue": __vite_glob_0_100, "./Pages/User/KYC/ReSubmit.vue": __vite_glob_0_101, "./Pages/User/KYC/Show.vue": __vite_glob_0_102, "./Pages/User/Payout/Confirmation.vue": __vite_glob_0_103, "./Pages/User/Payout/Edit.vue": __vite_glob_0_104, "./Pages/User/Payout/Index.vue": __vite_glob_0_105, "./Pages/User/Payout/Invoice.vue": __vite_glob_0_106, "./Pages/User/Payout/Requests.vue": __vite_glob_0_107, "./Pages/User/Payout/Show.vue": __vite_glob_0_108, "./Pages/User/ProfitReturn/Index.vue": __vite_glob_0_109, "./Pages/User/Projects/Index.vue": __vite_glob_0_110, "./Pages/User/Support/Create.vue": __vite_glob_0_111, "./Pages/User/Support/Index.vue": __vite_glob_0_112, "./Pages/User/Support/Show.vue": __vite_glob_0_113, "./Pages/User/Wallet/Index.vue": __vite_glob_0_114, "./Pages/User/Wallet/Payment.vue": __vite_glob_0_115, "./Pages/Web/About.vue": __vite_glob_0_116, "./Pages/Web/Blogs/Inc/Sidebar.vue": __vite_glob_0_117, "./Pages/Web/Blogs/Index.vue": __vite_glob_0_118, "./Pages/Web/Blogs/Show.vue": __vite_glob_0_119, "./Pages/Web/Contact.vue": __vite_glob_0_120, "./Pages/Web/CustomPage.vue": __vite_glob_0_121, "./Pages/Web/Events/Book.vue": __vite_glob_0_122, "./Pages/Web/Events/BookSuccess.vue": __vite_glob_0_123, "./Pages/Web/Events/Index.vue": __vite_glob_0_124, "./Pages/Web/Events/Payment.vue": __vite_glob_0_125, "./Pages/Web/Events/Show.vue": __vite_glob_0_126, "./Pages/Web/Home.vue": __vite_glob_0_127, "./Pages/Web/Investors/Index.vue": __vite_glob_0_128, "./Pages/Web/Partials/AboutSection.vue": __vite_glob_0_129, "./Pages/Web/Partials/AchievementSection.vue": __vite_glob_0_130, "./Pages/Web/Partials/WhyChoose.vue": __vite_glob_0_131, "./Pages/Web/Payment.vue": __vite_glob_0_132, "./Pages/Web/Projects/Index.vue": __vite_glob_0_133, "./Pages/Web/Projects/Show.vue": __vite_glob_0_134 });
    const page = pages[`./Pages/${name}.vue`];
    page.default.layout = page.default.layout ?? null;
    return page;
  },
  setup({ el, App, props, plugin }) {
    return createApp({ render: () => h(App, props) }).mixin({ methods: { trans, route: window.route } }).use(plugin).component("Link", Link).use(VueLazyLoad, {
      loading: "/assets/images/lazy.svg"
    }).use(createPinia()).mount(el);
  },
  progress: {
    color: "#32bead",
    showSpinner: true
  }
});
