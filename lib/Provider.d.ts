export declare type ProviderTypes = 'auth' | 'builder' | 'forms' | 'offline' | 'resource' | 'other';
export interface ProviderInterface {
    name: string;
    title?: string;
    form?: string;
    type?: ProviderTypes;
    titlePlural?: string;
    routes?: any[];
    store?: any;
    children?: Provider[];
    views?: any;
}
export declare class Provider implements ProviderInterface {
    settings: ProviderInterface;
    parent?: Provider;
    constructor(settings: ProviderInterface, parent?: Provider);
    protected capitalize(value: string): string;
    protected pluralize(value: string): string;
    name: string;
    title: string;
    titlePlural: string;
    form: string;
    readonly children: Provider[];
    readonly rootPath: string;
    readonly path: string;
    init(Vue: any): void;
    registerRoutes(router: any): void;
    registerStore(store: any): void;
}
