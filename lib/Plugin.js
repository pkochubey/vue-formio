"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Provide a plugin by default that will register all components.
var Plugin = /** @class */ (function () {
    function Plugin() {
    }
    // Vue Plugin
    Plugin.install = function (Vue, _a) {
        // Vue.$formio = formiojs;
        var providers = _a.providers, store = _a.store, router = _a.router;
        // Vue.component('Form', Form);
        providers.forEach(function (provider) {
            provider.init(Vue);
            provider.registerRoutes(router);
            provider.registerStore(store);
        });
    };
    return Plugin;
}());
exports.Plugin = Plugin;
;
//# sourceMappingURL=Plugin.js.map