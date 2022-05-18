import Page from './Page';

import GSAP from 'gsap';

import each from 'lodash/each';
import { eases } from '../utils/easing';

export default class Gallery extends Page {
    constructor() {
        super({
            id: 'gallery',

            element: '.gallery',
            elements: {
                header: document.querySelector('.header'),
                header_links: document.querySelectorAll('.header_wrapper > div'),

                title: '.gallery_heading_title > h1',
                description: '.gallery_heading_description > p',

                media: '.product_media',
                image: '.product_media_image',
                info: '.product_info',
            },
        });

        this.addEventListeners();
        GSAP.set(this.elements.info, { y: '101%' });
        GSAP.set('main', { pointerEvents: 'auto' });
    }

    create() {
        super.create();
    }

    addEventListeners() {
        each(this.elements.media, (media) => {
            const info = media.querySelector('.product_info');

            const tl = GSAP.timeline({ paused: true }).to(
                info,
                {
                    duration: 1.5,
                    y: 0,
                    ease: eases.expoInOut,
                },
                0.1
            );

            media.addEventListener('mouseenter', () => {
                tl.play();
            });
            media.addEventListener('mouseleave', () => {
                tl.reverse();
            });
        });
    }
}
