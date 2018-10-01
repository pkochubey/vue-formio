"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_expose_inject_1 = require("vue-expose-inject");
var Provider = /** @class */ (function () {
    function Provider(settings, parent) {
        this.settings = settings;
        this.parent = parent;
    }
    Provider.prototype.capitalize = function (value) {
        return value[0].toUpperCase() + value.substring(1);
    };
    Provider.prototype.pluralize = function (value) {
        return value + 's';
    };
    Object.defineProperty(Provider.prototype, "name", {
        get: function () {
            return this.settings.name;
        },
        set: function (value) {
            this.settings.name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Provider.prototype, "title", {
        get: function () {
            return this.settings.title || this.capitalize(this.name);
        },
        set: function (value) {
            this.settings.title = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Provider.prototype, "titlePlural", {
        get: function () {
            return this.settings.titlePlural || this.pluralize(this.title);
        },
        set: function (value) {
            this.settings.titlePlural = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Provider.prototype, "form", {
        get: function () {
            return this.settings.form || this.name.toLowerCase();
        },
        set: function (value) {
            this.settings.form = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Provider.prototype, "children", {
        // public get type(): ProviderTypes {
        //   return this.type || 'resource';
        // }
        //
        // public set type(value: ProviderTypes) {
        //   this.settings.type = value;
        // }
        //
        get: function () {
            return this.settings.children || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Provider.prototype, "rootPath", {
        get: function () {
            return (this.parent ? this.parent.path : '') + '/' + this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Provider.prototype, "path", {
        get: function () {
            return this.rootPath + '/:id';
        },
        enumerable: true,
        configurable: true
    });
    Provider.prototype.init = function (Vue) {
        this.children.forEach(function (child) {
            child.init(Vue);
        });
    };
    Provider.prototype.registerRoutes = function (router) {
        var _this = this;
        router.addRoutes([
            {
                path: this.rootPath,
                component: {
                    mixins: [vue_expose_inject_1.expose],
                    expose: function () { return ({
                        $provider: _this
                    }); },
                    render: function (createElement) {
                        return createElement('router-view');
                    }
                },
                children: this.settings.routes
            }
        ]);
        this.children.forEach(function (child) {
            child.registerRoutes(router);
        });
    };
    Provider.prototype.registerStore = function (store) {
        this.children.forEach(function (child) {
            child.registerStore(store);
        });
    };
    return Provider;
}());
exports.Provider = Provider;
//# sourceMappingURL=Provider.js.map