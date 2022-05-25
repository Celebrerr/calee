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

        const button = document.querySelector('.footer_top_dark > a');

        this.tlDark = GSAP.timeline({ paused: true })
            .to(
                selectorMain.body,
                {
                    duration: 0.5,
                    background: '#313131',
                    color: '#efefef',
                    ease: eases.circOut,
                },
                0
            )
            .to(
                [selectorMedia.figure, selectorMedia.info],
                {
                    duration: 0.5,
                    backgroundColor: '#212121',
                    color: '#efefef',
                    ease: eases.circOut,
                },
                0
            )
            .to(
                [selectorLines.header, selectorLines.footer],
                {
                    duration: 0.5,
                    borderBottomColor: '#efefef',
                    ease: eases.circOut,
                },
                0
            );

        this.tlButton = GSAP.timeline({ paused: true })
            .to(
                button,
                {
                    duration: 0.6,
                    y: '200%',
                    ease: eases.expoInOut,
                },
                0
            )
            .to(
                button,
                {
                    duration: 0.6,
                    y: 0,
                    ease: eases.expoInOut,
                },
                0.6
            )
            .to(
                button,
                {
                    text: {
                        value: '☼ Light Mode',
                        delimiter: ' ',
                    },
                    ease: eases.circOut,
                },
                0.6
            );
    }

    playDarkMode() {
        this.tlDark.play();
        this.tlButton.play();
    }
    stopDarkMode() {
        this.tlDark.reverse();
        this.tlButton.reverse();
    }

    onScroll() {
        const header = document.querySelector('.header_wrapper');
        let currentScrollPos = window.pageYOffset;

        currentScrollPos > 500
            ? (header.style.backgroundColor = '#E4E0DF')
            : (header.style.backgroundColor = 'transparent');

        this.prevScrollPos = currentScrollPos;
    }

    addEventListeners() {
        // window.addEventListener('scroll', this.onScroll.bind(this));
    }
}
