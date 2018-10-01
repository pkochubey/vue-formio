import Vue from 'vue';
export default class extends Vue {
    builder?: any;
    builderReady?: Promise<any>;
    form?: any;
    options?: object;
    formChange(value: object): void;
    mounted(): void;
    destroyed(): void;
    initializeBuilder(): Promise<any>;
    render(createElement: any): any;
}
