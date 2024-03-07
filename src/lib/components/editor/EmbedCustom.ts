import type { PasteEvent } from '@editorjs/editorjs';
import Embed from '@editorjs/embed';

export default class EmbedCustom extends Embed {
  static get toolbox() {
    return {
      title: 'Embed',
      icon: '<i class="ph ph-frame-corners"></i>'
    };
  }

  /**
   * Render Embed tool content
   *
   * @returns {HTMLElement}
   */

    constructor(...args:any[]){
        super(...args)
    }

    render() {
        if (!super.data.service) {
            const container = document.createElement('div');
            super.element = container;
            const input = document.createElement('input');
            input.classList.add('cdx-input');
            input.placeholder = 'https://www.youtube.com/watch?v=w8vsuOXZBXc';
            input.type = 'url';
            input.addEventListener('paste', (event:PasteEvent) => {
                const url = event.clipboardData.getData('text');
                const service = Object.keys(Embed.services).find((key) => Embed.services[key].regex.test(url));
                if (service) {
                    super.onPaste({detail: {key: service, data: url}});
                }
            });
            container.appendChild(input);

            return container;
        }
        return super.render();
    }
  
    validate(savedData) {
        return savedData.service && savedData.source ? true : false;
    }
}