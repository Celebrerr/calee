import GSAP from 'gsap';
import { TextPlugin } from 'gsap/all';
GSAP.registerPlugin(TextPlugin);

import { eases } from '../utils/easing';

export default class Banner {
    constructor() {
        this.banner = document.querySelector('.banner');
        this.bannerButton = this.banner.querySelector('.banner_button');
        this.bannerClose = this.banner.querySelector('.banner_close');

        this.initBanner();
        this.addEventListeners();
    }

    initBanner() {
        GSAP.set(this.banner, { autoAlpha: 0, y: '101%' });

        this.tl = GSAP.timeline({ paused: true }).to(
            this.banner,
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

        GSAP.to(this.banner, {
            duration: 0.5,
            onComplete: () => {
                this.banner.remove();
            },
        });
    }
}
