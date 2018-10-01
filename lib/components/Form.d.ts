import Vue from 'vue';
import Formio from 'formiojs/Formio';
export default class extends Vue {
    formio?: Formio;
    src?: string;
    url?: string;
    form?: object;
    submission?: object;
    options?: object;
    srcChange(value: string): void;
    urlChange(value: string): void;
    formChange(value: object): void;
    submissionhange(value: object, done: boolean): void;
    mounted(): void;
    destroyed(): void;
    initializeForm(): Promise<any>;
    setupForm(): void;
    render(createElement: any): any;
}
