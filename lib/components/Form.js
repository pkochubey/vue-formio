"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/* globals console, Promise */
var vue_1 = require("vue");
var vue_property_decorator_1 = require("vue-property-decorator");
var components_1 = require("formiojs/components");
var Components_1 = require("formiojs/components/Components");
Components_1.default.setComponents(components_1.default);
var Form_1 = require("formiojs/Form");
var utils_1 = require("formiojs/utils");
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    default_1.prototype.srcChange = function (value) {
        if (this.formio) {
            this.formio.src = value;
        }
    };
    default_1.prototype.urlChange = function (value) {
        if (this.formio) {
            this.formio.url = value;
        }
    };
    default_1.prototype.formChange = function (value) {
        if (this.formio) {
            this.formio.form = value;
        }
    };
    default_1.prototype.submissionhange = function (value, done) {
        if (done) {
            return;
        }
        if (this.formio) {
            this.formio.submission = value;
        }
    };
    default_1.prototype.languageChange = function (value) {
        if (this.formio) {
            this.formio.language = value;
        }
    };
    default_1.prototype.mounted = function () {
        var _this = this;
        this.initializeForm()
            .then(function () {
            _this.setupForm();
        })
            .catch(function (err) {
            /* eslint-disable no-console */
            console.warn(err);
            /* eslint-enable no-console */
        });
    };
    default_1.prototype.destroyed = function () {
        if (this.formio) {
            this.formio.destroy(true);
        }
    };
    default_1.prototype.enumerateObject = function (obj, from, to) {
        var dataFrom = null;
        var dataTo = null;
        for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
            var key = _a[_i];
            if (from === key) {
                dataFrom = obj[key];
            }
            if (to === key) {
                dataTo = obj[key];
            }
            if (dataFrom != null && dataTo != null) {
                this.mergeObject(dataFrom, dataTo);
                break;
            }
            if (typeof obj[key] === 'object') {
                this.enumerateObject(obj[key], from, to);
            }
        }
        if (dataFrom !== null && dataTo === null) {
            obj[to] = dataFrom;
        }
    };
    default_1.prototype.mergeObject = function (from, to) {
        for (var _i = 0, _a = Object.keys(from); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key === 'data') {
                if (from && to && from.data && to.data) {
                    this.mergeObject(from.data, to.data);
                }
            }
            else {
                to[key] = from[key];
            }
        }
    };
    default_1.prototype.enumerateComponents = function (components) {
        var _this = this;
        if (!components) {
            return;
        }
        utils_1.default.eachComponent(components, function (item) {
            if (item && item.component && item.component.tags && item.component.tags.length > 0) {
                for (var _i = 0, _a = item.component.tags; _i < _a.length; _i++) {
                    var i = _a[_i];
                    if (i.indexOf("copy_") > -1) {
                        _this.enumerateObject(_this.submission, i.replace("copy_", ""), item.key);
                    }
                }
            }
            if (item && item.components) {
                _this.enumerateComponents(item.components);
            }
        });
    };
    default_1.prototype.initializeForm = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.src) {
                resolve(new Form_1.default(_this.$refs.formio, _this.src, _this.options)
                    .render()
                    .then(function (formio) {
                    _this.formio = formio;
                    return formio;
                })
                    .catch(function (err) {
                    /* eslint-disable no-console */
                    console.error(err);
                    /* eslint-enable no-console */
                }));
            }
            else if (_this.form) {
                resolve(new Form_1.default(_this.$refs.formio, _this.form, _this.options)
                    .render()
                    .then(function (formio) {
                    _this.formio = formio;
                    return formio;
                })
                    .catch(function (err) {
                    /* eslint-disable no-console */
                    console.error(err);
                    /* eslint-enable no-console */
                }));
            }
            else {
                // If we get to here there is no src or form
                reject('Must set src or form attribute');
            }
        });
    };
    default_1.prototype.setupForm = function () {
        var _this = this;
        if (!this.formio) {
            return;
        }
        this.enumerateComponents(this.formio.components);
        this.submission = JSON.parse(JSON.stringify(this.submission));
        if (this.submission) {
            this.formio.submission = this.submission;
        }
        if (this.url) {
            this.formio.url = this.url;
        }
        this.formio.language = this.language ? this.language : 'en';
        this.formio.events.onAny(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var eventParts = args[0].split('.');
            // Only handle formio events.
            if (eventParts[0] !== 'formio' || eventParts.length !== 2) {
                return;
            }
            // Remove formio. from event.
            args[0] = eventParts[1];
            _this.$emit.apply(_this, args);
            // Emit custom events under their own name as well.
            if (eventParts[1] === 'customEvent') {
                args[0] = args[1].type;
                _this.$emit.apply(_this, args);
            }
        });
    };
    default_1.prototype.render = function (createElement) {
        return createElement('div', { ref: 'formio' });
    };
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], default_1.prototype, "src", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], default_1.prototype, "url", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], default_1.prototype, "form", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], default_1.prototype, "submission", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], default_1.prototype, "language", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: function () { } }),
        __metadata("design:type", Object)
    ], default_1.prototype, "options", void 0);
    __decorate([
        vue_property_decorator_1.Watch('src'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], default_1.prototype, "srcChange", null);
    __decorate([
        vue_property_decorator_1.Watch('url'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], default_1.prototype, "urlChange", null);
    __decorate([
        vue_property_decorator_1.Watch('form'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], default_1.prototype, "formChange", null);
    __decorate([
        vue_property_decorator_1.Watch('submission'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Boolean]),
        __metadata("design:returntype", void 0)
    ], default_1.prototype, "submissionhange", null);
    __decorate([
        vue_property_decorator_1.Watch('language'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], default_1.prototype, "languageChange", null);
    default_1 = __decorate([
        vue_property_decorator_1.Component
    ], default_1);
    return default_1;
}(vue_1.default));
exports.default = default_1;
//# sourceMappingURL=Form.js.map