import Page from './Page';
import GSAP from 'gsap';
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
    }

    create() {
        super.create();
    }

    addEventListeners() {
        // const element = this.elements.media;
        // for (let i = 0; i < element.length; i++) {
        //     console.log(i);
        //     element[i].addEventListener('mouseenter', this.onMouseEnter.bind(this));
        //     element[i].addEventListener('mouseleave', this.onMouseLeave.bind(this));
        // }

        GSAP.utils.toArray(this.elements.media).forEach((media) => {
            const info = media.querySelector('.product_info');

            const tl = GSAP.timeline({ paused: true }).to(
                info,
                {
                    duration: 0.75,
                    autoAlpha: 1,
                    y: 0,
                    ease: 'circ.easeIn',
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
