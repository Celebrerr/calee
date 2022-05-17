import GSAP from 'gsap';
import Component from '../partials/Component';

import { each } from 'lodash';

import { eases } from '../utils/easing';

export default class Preload extends Component {
    constructor() {
        super({
            element: '.loader',
            elements: {
                wrapper: '.loader_wrapper',
                desc: '.loader_desc > h3',
                perc: '.loader_perc > h3',
                images: document.querySelectorAll('img'),
            },
        });

        this.length = 0;
        this.imageLength = this.elements.images.length;

        this.init();
    }

    init() {
        setTimeout(() => {
            this.initLoader();
        }, 1000);
    }

    initLoader() {
        if (this.elements.images.length === 0) {
            this.onAssetLoaded();
            return;
        }

        each(this.elements.images, (element) => {
            let img = new Image();

            img.onload = () => this.onAssetLoaded();
            img.onerror = (error) => console.log(error);

            img.src = element.getAttribute('data-src');
        });
    }

    onAssetLoaded() {
        this.length += 1;

        let percent = this.length / this.imageLength;
        if (this.imageLength === 0) percent = 1;

        this.elements.perc.innerHTML = `${Math.round(percent * 100)}`;

        if (percent === 1) this.emit('completed');
    }

    destroy() {
        GSAP.to(this.elements.wrapper, {
            duration: 0.5,
            autoAlpha: 0,
            ease: eases.circOut,
            onComplete: () => {
                this.element.remove();
            },
        });
    }
}
