/* eslint-disable no-restricted-globals */

import { clientsClaim } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";

declare let self: ServiceWorkerGlobalScope;

clientsClaim();

// Workboxがbuild時にキャッシュリストを挿入
precacheAndRoute(self.__WB_MANIFEST);