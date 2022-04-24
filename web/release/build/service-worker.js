const timestamp = 1650781656916;
const build = [
  "/_app/start-c05cf064.js",
  "/_app/assets/start-f6bd5930.css",
  "/_app/pages/__layout.svelte-597e1eee.js",
  "/_app/assets/pages/__layout.svelte-bcb56387.css",
  "/_app/error.svelte-07631379.js",
  "/_app/pages/index.svelte-ac655769.js",
  "/_app/pages/map.svelte-f53e7dd9.js",
  "/_app/assets/pages/map.svelte-9c32b72f.css",
  "/_app/chunks/vendor-986b52e5.js",
  "/_app/chunks/paths-28a87002.js",
  "/_app/chunks/url-6ebb25d8.js",
  "/_app/chunks/CanvasBlockie-26496520.js",
  "/_app/assets/CanvasBlockie-021ba57e.css",
  "/_app/chunks/wallet-aaa67539.js",
  "/_app/chunks/NavButton-db9aa491.js"
];
const URLS_TO_PRE_CACHE = build.concat(["/","/map/"]);
const CACHE_NAME = "cache-name" + timestamp;
let _logEnabled = true;
function log(...args) {
  if (_logEnabled) {
    console.debug(...args);
  }
}
self.addEventListener("message", function(event) {
  if (event.data && event.data.type === "debug") {
    _logEnabled = event.data.enabled && event.data.level >= 5;
  } else if (event.data === "skipWaiting") {
    log(`skipWaiting received`);
    self.skipWaiting();
  }
});
const pathname = self.location.pathname;
const base = pathname.substr(0, pathname.length - 18);
const urlsToPreCache = URLS_TO_PRE_CACHE.map((v) => base + v);
const regexesOnlineFirst = [];
{
  regexesOnlineFirst.push("localhost");
}
const regexesOnlineOnly = [];
const regexesCacheFirst = [self.location.origin, "https://rsms.me/inter/", "cdn", ".*\\.png$", ".*\\.svg$"];
const regexesCacheOnly = [];
log(`[Service Worker] Origin: ${self.location.origin}`);
self.addEventListener("install", (event) => {
  log("[Service Worker] Install");
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
    log(`[Service Worker] Creating cache: ${CACHE_NAME}`);
    return cache.addAll(urlsToPreCache);
  }).then(() => {
    log(`cache fully fetched!`);
  }));
});
self.addEventListener("activate", (event) => {
  log("[Service Worker] Activate");
  event.waitUntil(caches.keys().then((cacheNames) => {
    return Promise.all(cacheNames.map((thisCacheName) => {
      if (thisCacheName !== CACHE_NAME) {
        log(`[Service Worker] Deleting: ${thisCacheName}`);
        return caches.delete(thisCacheName);
      }
    })).then(() => self.clients.claim());
  }));
});
const update = (request, cache) => {
  return fetch(request).then((response) => {
    return caches.open(CACHE_NAME).then((cache2) => {
      if (request.method === "GET" && request.url.startsWith("http")) {
        cache2.put(request, response.clone());
      }
      return response;
    });
  }).catch(() => {
    return cache;
  });
};
const cacheFirst = {
  method: (request, cache) => {
    log(`[Service Worker] Cache first: ${request.url}`);
    const fun = update(request, cache);
    return cache || fun;
  },
  regexes: regexesCacheFirst
};
const cacheOnly = {
  method: (request, cache) => {
    log(`[Service Worker] Cache only: ${request.url}`);
    return cache || update(request, cache);
  },
  regexes: regexesCacheOnly
};
const onlineFirst = {
  method: (request, cache) => {
    log(`[Service Worker] Online first: ${request.url}`);
    return update(request, cache);
  },
  regexes: regexesOnlineFirst
};
const onlineOnly = {
  method: (request) => {
    log(`[Service Worker] Online only: ${request.url}`);
    return fetch(request);
  },
  regexes: regexesOnlineOnly
};
async function getResponse(event) {
  const request = event.request;
  const registration = self.registration;
  if (event.request.mode === "navigate" && event.request.method === "GET" && registration.waiting && (await self.clients.matchAll()).length < 2) {
    log("only one client, skipWaiting as we navigate the page");
    registration.waiting.postMessage("skipWaiting");
    const response2 = new Response("", { headers: { Refresh: "0" } });
    return response2;
  }
  const response = await caches.match(request).then((cache) => {
    const patterns = [onlineFirst, onlineOnly, cacheFirst, cacheOnly];
    for (const pattern of patterns) {
      for (const regex of pattern.regexes) {
        if (RegExp(regex).test(request.url)) {
          return pattern.method(request, cache);
        }
      }
    }
    return onlineFirst.method(request, cache);
  });
  return response;
}
self.addEventListener("fetch", (event) => {
  event.respondWith(getResponse(event));
});
//# sourceMappingURL=service-worker.js.map
