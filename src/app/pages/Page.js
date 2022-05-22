import each from 'lodash/each';
import GSAP from 'gsap';
import { TextPlugin } from 'gsap/all';
GSAP.registerPlugin(TextPlugin);

import { eases } from '../utils/easing';

export default class Page {
    constructor({ element, elements, id }) {
        this.selector = element;
        this.selectorChildren = { ...elements };

        this.id = id;

        this.prevScrollPos = window.pageYOffset;

        this.create();

        if (this.id === 'home') this.init();

        this.addEventListeners();
    }

    create() {
        this.element = document.querySelector(this.selector);
        this.elements = {};

        each(this.selectorChildren, (element, key) => {
            if (element instanceof window.HTMLElement || element instanceof window.NodeList || Array.isArray()) {
                this.elements[key] = element;
            } else {
                this.elements[key] = document.querySelectorAll(element);
                if (this.elements[key].length === 0) {
                    this.elements[key] = null;
                } else if (this.elements[key].length === 1) {
                    this.elements[key] = document.querySelector(element);
                }
            }
        });
    }

    init() {
        GSAP.set([this.selectorChildren.header, this.selectorChildren.description, this.selectorChildren.label], {
            y: '-101%',
        });
        GSAP.set(this.selectorChildren.image, {
            scale: '0.7',
            y: '-101%',
        });
    }

    initIntroAnimation() {
        this.intro = GSAP.timeline({ paused: true })
            .to(
                this.selectorChildren.header,
                {
                    duration: 2,
                    y: 0,
                    ease: eases.expoInOut,
                },
                0.4
            )
            .to(
                this.selectorChildren.image,
                {
                    duration: 2,
                    y: 0,
                    scale: 1,
                    ease: eases.expoOut,
                },
                0.5
            )
            .to(
                [this.selectorChildren.description, this.selectorChildren.label],
                {
                    duration: 2,
                    y: 0,
                    ease: eases.expoInOut,
                },
                0.6
            );
    }
    showIntroAnimation() {
        this.intro.play();
    }
    hideIntroAnimation() {
        this.intro.reverse();
    }

    initDarkMode() {
        const selectorMain = {
            body: 'body',
            header: '.header_wrapper',
        };

        const selectorMedia = {
            figure: 'figure:not(.home_figure)',
            info: '.product_info_wrapper',
        };

        const selectorLines = {
            header: '.header_line',
            footer: '.footer_line',
        };

        this.tlDark = GSAP.timeline({ paused: true })
            .to(
                selectorMain.body,
                {
                    duration: 1,
                    background: '#313131',
                    color: '#efefef',
                    ease: eases.circOut,
                },
                0
            )
            .to(
                [selectorMedia.figure, selectorMedia.info],
                {
                    duration: 1,
                    backgroundColor: '#212121',
                    color: '#efefef',
                    ease: eases.circOut,
                },
                0
            )
            .to(
                [selectorLines.header, selectorLines.footer],
                {
                    duration: 1,
                    borderBottomColor: '#efefef',
                    ease: eases.circOut,
                },
                0
            );
    }
    playDarkMode() {
        this.tlDark.play();
        GSAP.to('.footer_top_dark > a', {
            delay: 0.5,
            text: '☼ Light Mode',
        });
    }
    stopDarkMode() {
        this.tlDark.reverse();
        GSAP.to('.footer_top_dark > a', {
            delay: 0.5,
            text: '☀ Dark Mode',
        });
    }

    onScroll() {
        const header = document.querySelector('.header_wrapper');
        let currentScrollPos = window.pageYOffset;

        this.prevScrollPos > currentScrollPos ? (header.style.opacity = '1') : (header.style.opacity = '0');
        this.prevScrollPos = currentScrollPos;
    }

    addEventListeners() {
        window.addEventListener('scroll', this.onScroll.bind(this));
    }
}
