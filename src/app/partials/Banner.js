import GSAP from 'gsap';
import { TextPlugin } from 'gsap/all';
GSAP.registerPlugin(TextPlugin);

import { eases } from '../utils/easing';

export default class Banner {
    constructor() {
        this.element = document.querySelector('.banner');
        this.banner = this.element;
        this.bannerInner = this.element.children[0];
        this.bannerButton = this.element.querySelector('.banner_button');
        this.bannerClose = this.element.querySelector('.banner_close');

        this.initBanner();
        this.addEventListeners();
    }

    initBanner() {
        GSAP.set(this.element, { autoAlpha: 0, y: '101%' });

        this.tl = GSAP.timeline({ paused: true }).to(
            this.element,
            {
                duration: 0.5,
                autoAlpha: 1,
                y: 0,
                ease: eases.power4Out,
            },
            4
        );
    }

    showBanner() {
        this.tl.play();
    }

    addEventListeners() {
        this.bannerClose.onclick = (e) => {
            e.preventDefault();
            this.destroy();
        };
    }

    destroy() {
        this.tl.reverse();

        GSAP.to(this.element, {
            duration: 0.5,
            onComplete: () => {
                this.element.remove();
            },
        });
    }
}
