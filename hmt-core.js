/**
 * HMT12856 Core helpers (browser)
 * Lightweight utilities for radar / portfolio meta / layout.
 * Safe to load after the main SPA; does not replace embedded app logic.
 * Protocol: HMT12856 · Canonical: https://bipod.pages.dev/
 */
(function (global) {
  "use strict";

  var HMT = global.HMT || {};

  HMT.VERSION = "2026-10-31";
  HMT.CANONICAL = "https://bipod.pages.dev/";
  HMT.PROTOCOL = "HMT12856";

  HMT.storage = {
    get: function (key, fallback) {
      try {
        var v = localStorage.getItem(key);
        return v === null || v === undefined ? fallback : v;
      } catch (e) {
        return fallback;
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem(key, String(value));
        return true;
      } catch (e) {
        return false;
      }
    }
  };

  HMT.portfolio = {
    DEFAULT_COUNT: "464",
    DEFAULT_LABEL: "SEJAM",
    keys: {
      count: "hmt-pf-count",
      label: "hmt-pf-label",
      story: "hmt-pf-story",
      linkedin: "hmt-pf-linkedin"
    },
    load: function () {
      return {
        count: HMT.storage.get(this.keys.count, this.DEFAULT_COUNT),
        label: HMT.storage.get(this.keys.label, this.DEFAULT_LABEL),
        story: HMT.storage.get(this.keys.story, ""),
        linkedin: HMT.storage.get(this.keys.linkedin, "")
      };
    },
    save: function (data) {
      if (!data) return false;
      if (data.count !== undefined) HMT.storage.set(this.keys.count, data.count);
      if (data.label !== undefined) HMT.storage.set(this.keys.label, data.label);
      if (data.story !== undefined) HMT.storage.set(this.keys.story, data.story);
      if (data.linkedin !== undefined) HMT.storage.set(this.keys.linkedin, data.linkedin);
      return true;
    }
  };

  HMT.ticker = {
    DEFAULT_SEC: 90,
    MIN_SEC: 30,
    MAX_SEC: 300,
    key: "hmt-ticker-speed",
    getSpeed: function () {
      var n = parseInt(HMT.storage.get(this.key, this.DEFAULT_SEC), 10);
      if (isNaN(n) || n < this.MIN_SEC) n = this.MIN_SEC;
      if (n > this.MAX_SEC) n = this.MAX_SEC;
      return n;
    },
    apply: function (sec) {
      sec = parseInt(sec, 10);
      if (isNaN(sec) || sec < this.MIN_SEC) sec = this.MIN_SEC;
      if (sec > this.MAX_SEC) sec = this.MAX_SEC;
      HMT.storage.set(this.key, sec);
      var el = document.getElementById("ticker");
      if (el) {
        el.style.animation = "none";
        void el.offsetWidth;
        el.style.animation = "tickerMove " + sec + "s linear infinite";
      }
      return sec;
    }
  };

  HMT.layout = {
    key: "hmt-layout-mode",
    apply: function (mode) {
      mode = mode || HMT.storage.get(this.key, "auto");
      HMT.storage.set(this.key, mode);
      var root = document.documentElement;
      if (mode === "mobile") {
        root.setAttribute("data-layout", "mobile");
      } else if (mode === "desktop") {
        root.setAttribute("data-layout", "desktop");
      } else {
        root.removeAttribute("data-layout");
        if (window.matchMedia && window.matchMedia("(min-width:900px)").matches) {
          root.setAttribute("data-layout", "desktop");
        } else {
          root.setAttribute("data-layout", "mobile");
        }
      }
      return mode;
    }
  };

  HMT.clock = {
    tick: function () {
      try {
        var now = new Date();
        var tstr = now.toLocaleTimeString("en-GB", {
          timeZone: "Asia/Tehran",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        });
        var dstr = now.toLocaleDateString("fa-IR", {
          timeZone: "Asia/Tehran",
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long"
        });
        var cb = document.getElementById("clockBox");
        var db = document.getElementById("dateBox");
        if (cb) cb.textContent = tstr + " Tehran";
        if (db) db.textContent = dstr;
      } catch (e) {}
    },
    start: function () {
      this.tick();
      setInterval(this.tick.bind(this), 1000);
    }
  };

  HMT.ready = function (fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  };

  global.HMT = HMT;
})(typeof window !== "undefined" ? window : this);
