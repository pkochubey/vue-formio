import { Provider } from './Provider';
import Vue from 'vue';
export declare class Plugin {
    static install(Vue: Vue, {providers, store, router}: {
        providers: Provider[];
        store: any;
        router: any;
    }): void;
}
