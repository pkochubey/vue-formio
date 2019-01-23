import Vue from 'vue';
import Formio from 'formiojs/Formio';
export default class  extends Vue {
    loaded: boolean;
    formio?: Formio;
    src?: string;
    url?: string;
    form?: object;
    submission?: object;
    language?: string;
    options?: object;
    srcChange(value: string): void;
    urlChange(value: string): void;
    formChange(value: object): void;
    submissionhange(value: object, done: boolean): void;
    languageChange(value: string): void;
    mounted(): void;
    destroyed(): void;
    enumerateObject(obj: any, from: any, to: any): void;
    mergeObject(from: any, to: any): void;
    enumerateComponents(components: any): void;
    initializeForm(): Promise<any>;
    setupForm(): void;
    render(createElement: any): any;
}
