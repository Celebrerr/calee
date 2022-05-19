import GSAP from 'gsap';
import each from 'lodash/each';
import { eases } from '../utils/easing';

import Gallery from '../pages/Gallery';

export default class Card extends Gallery {
    constructor() {
        super({});

        console.log(this);

        this.initCard();
        this.addEventListeners();

        this.action = false;
    }

    initCard() {
        GSAP.set(this.elements.info, { y: '101%' });
        GSAP.set('main', { pointerEvents: 'auto' });
    }

    addEventListeners() {
        each(this.elements.product, (media) => {
            const info = media.querySelector('.product_info');
            const text = media.querySelector('.product_title');

            const title = text.querySelector('h3');
            const button = text.querySelector('span');

            const tl = GSAP.timeline({ paused: true })
                .to(
                    info,
                    {
                        duration: 1.2,
                        y: 0,
                        ease: eases.expoInOut,
                    },
                    0.1
                )
                .to(
                    button,
                    {
                        duration: 1.2,
                        transformOrigin: 'center',
                        rotate: 135,
                        ease: eases.expoInOut,
                    },
                    0
                )
                .to(
                    title,
                    {
                        duration: 0.6,
                        y: '200%',
                        ease: eases.expoInOut,
                    },
                    0
                )
                .to(
                    title,
                    {
                        duration: 0.6,
                        y: 0,
                        ease: eases.expoInOut,
                    },
                    0.6
                );

            button.onclick = () => {
                !this.action ? tl.play() : tl.reverse();
                this.action = !this.action;
            };
        });
    }
}
