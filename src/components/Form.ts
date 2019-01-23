/* globals console, Promise */
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import AllComponents from 'formiojs/components';
import Components from 'formiojs/components/Components';
Components.setComponents(AllComponents);
import Form from 'formiojs/Form';
import Formio from 'formiojs/Formio';
import FormioUtils from 'formiojs/utils';

@Component
export default class extends Vue {
  loaded: boolean;

  formio?: Formio;

  @Prop()
  src?: string;

  @Prop()
  url?: string;

  @Prop()
  form?: object;

  @Prop()
  submission?: object;

  @Prop()
  language?: string;

  @Prop({ default: () => {} })
  options?: object;

  @Watch('src')
  srcChange(value: string) {
    if (this.formio) {
      this.formio.src = value;
    }
  }

  @Watch('url')
  urlChange(value: string) {
    if (this.formio) {
      this.formio.url = value;
    }
  }

  @Watch('form')
  formChange(value: object) {
    if (this.formio) {
      this.formio.form = value;
    }
  }

  @Watch('submission')
  submissionhange(value: object, done: boolean) {
    if (done) {
      return
    }
    if (this.formio) {
      this.formio.submission = value;
    }
  }

  @Watch('language')
  languageChange(value: string) {
    if (this.formio) {
      this.formio.language = value;
    }
  }

  mounted() {
    this.initializeForm()
      .then(() => {
        this.setupForm();
      })
      .catch((err) => {
        /* eslint-disable no-console */
        console.warn(err);
        /* eslint-enable no-console */
      });
  }

  destroyed() {
    if (this.formio) {
      this.formio.destroy(true);
    }
  }

  enumerateObject(obj, from, to) {
    let dataFrom = null;
    let dataTo = null;
    for (const key of Object.keys(obj)) {
        if(from === key){
            dataFrom = obj[key];
        }
        if(to === key){
            dataTo = obj[key];
        }
        if(dataFrom != null && dataTo != null){
            this.mergeObject(dataFrom, dataTo);
            break;
        }
        if(typeof obj[key] === 'object'){
            this.enumerateObject(obj[key], from, to);
        }
    }
    if(dataFrom !== null && dataTo === null) {
        obj[to] = dataFrom
    }
  }

  mergeObject(from, to){
    for (const key of Object.keys(from)) {
        if(key === 'data'){
            if(from && to && from.data && to.data){
                this.mergeObject(from.data, to.data);
            }
        }else{
            to[key] = from[key];
        }
    }
  }

  enumerateComponents(components) {
    if(!components){
      return
    }

    FormioUtils.eachComponent(components, (item) => {
        if (item.component.tags && item.component.tags.length > 0) {
            for (let i of item.component.tags) {
                if (i.indexOf("copy_") > -1) {
                    this.enumerateObject(this.submission, i.replace("copy_", ""), item.key)
                }
            }
        }

        if (item.components) {
            this.enumerateComponents(item.components);
        }
    })
  }

  initializeForm(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.src) {
        resolve(
          new Form(this.$refs.formio, this.src, this.options)
            .render()
            .then(
              (formio: Formio): Formio => {
                this.formio = formio;
                return formio;
              },
            )
            .catch((err: Error) => {
              /* eslint-disable no-console */
              console.error(err);
              /* eslint-enable no-console */
            }),
        );
      } else if (this.form) {
        resolve(
          new Form(this.$refs.formio, this.form, this.options)
            .render()
            .then(
              (formio: Formio): Formio => {
                this.formio = formio;
                return formio;
              },
            )
            .catch((err: Error) => {
              /* eslint-disable no-console */
              console.error(err);
              /* eslint-enable no-console */
            }),
        );
      } else {
        // If we get to here there is no src or form
        reject('Must set src or form attribute');
      }
    });
  }

  setupForm() {
    if (!this.formio) {
      return;
    }

    this.enumerateComponents(this.formio.components)
    this.submission = JSON.parse(JSON.stringify(this.submission))

    if (this.submission) {
      this.formio.submission = this.submission;
    }

    if (this.url) {
      this.formio.url = this.url;
    }

    this.formio.language = this.language ? this.language : 'en'

    this.formio.events.onAny((...args: any[]) => {
      const eventParts = args[0].split('.');

      // Only handle formio events.
      if (eventParts[0] !== 'formio' || eventParts.length !== 2) {
        return;
      }

      // Remove formio. from event.
      args[0] = eventParts[1];

      this.$emit.apply(this, args);

      // Emit custom events under their own name as well.
      if (eventParts[1] === 'customEvent') {
        args[0] = args[1].type;
        this.$emit.apply(this, args);
      }
    });
  }

  render(createElement: any) {
    return createElement('div', { ref: 'formio' });
  }
}
