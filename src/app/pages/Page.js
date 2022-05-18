import each from 'lodash/each';
import GSAP from 'gsap';
import { eases } from '../utils/easing';

export default class Page {
    constructor({ element, elements, id }) {
        this.selector = element;
        this.selectorChildren = { ...elements };

        this.id = id;

        // console.log(id);

        this.create();
        this.initDarkMode();
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
            // console.log(this.elements[key], element);
        });
    }

    initIntroAnimation() {
        GSAP.set(this.elements.info, { y: '101%', autoAlpha: 0.5 });

        this.intro = GSAP.timeline({ paused: true })
            .addLabel('start')
            .from(
                this.selectorChildren.header,
                {
                    duration: 0.8,
                    autoAlpha: 0,
                    y: '-101%',
                    stagger: 0.05,
                    ease: eases.power4Out,
                },
                'start+=0.5'
            )
            // .from(
            //     this.selectorChildren.image,
            //     {
            //         duration: 0.8,
            //         autoAlpha: 0,
            //         scale: 0.5,
            //         stagger: 0.5,
            //         ease: eases.power4Out,
            //     },
            //     'start+=1'
            // )
            .from(
                [this.selectorChildren.title, this.selectorChildren.description],
                {
                    duration: 1,
                    // autoAlpha: 0,
                    y: '-101%',
                    rotate: 0.2,
                    ease: eases.power4Out,
                },
                'start+=0.75'
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
            figure: 'figure',
            info: '.product_info_wrapper',
        };

        const selectorLines = {
            header: '.header_line',
            footer: '.footer_line',
        };

        this.tlDark = GSAP.timeline({ paused: true })
            .to(
                [selectorMain.body, selectorMain.header],
                {
                    duration: 1,
                    backgroundColor: '#313131',
                    color: '#efefef',
                    ease: eases.circIn,
                },
                0
            )
            .to(
                [selectorMedia.figure, selectorMedia.info],
                {
                    duration: 1,
                    backgroundColor: '#212121',
                    color: '#efefef',
                    ease: eases.circIn,
                },
                0
            )
            .to(
                [selectorLines.header, selectorLines.footer],
                {
                    duration: 1,
                    borderBottomColor: '#efefef',
                    ease: eases.circIn,
                },
                0
            );
        // .to(
        //     'img',
        //     {
        //         duration: 1,
        //         filter: 'invert(1)',
        //         ease: eases.circIn,
        //     },
        //     0
        // );
    }

    playDarkMode() {
        this.tlDark.play();
    }
    stopDarkMode() {
        this.tlDark.reverse();
    }
}
