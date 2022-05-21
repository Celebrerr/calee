import GSAP from 'gsap';
import { eases } from '../utils/easing';

export default class PageTransition {
    constructor() {
        // this.element = document.createElement('div');
        // this.element.className = 'page-transition';

        // this.element.width = window.innerWidth;
        // document.body.appendChild(this.element);

        this.element = document.querySelector('.transition');
        this.elementTitle = this.element.querySelector('.transition_title_el > h1');
        this.elementLabel = this.element.querySelector('.transition_title_el > p');

        this.main = document.querySelector('main');
        this.nav = document.querySelector('.nav');
    }

    show() {
        return new Promise((resolve) => {
            GSAP.timeline()
                .to(
                    this.element,
                    {
                        duration: 1.5,
                        ease: eases.expoInOut,
                        y: '0%',
                    },
                    0
                )
                .to(
                    [this.elementTitle, this.elementLabel],
                    {
                        duration: 1.5,
                        ease: eases.expoInOut,
                        y: '0%',
                        stagger: 0.05,
                        onComplete: resolve,
                    },
                    0.2
                )
                .to(
                    this.main,
                    {
                        duration: 1.5,
                        ease: eases.expoOut,
                        autoAlpha: 0,
                    },
                    0
                );
        });
    }

    hide() {
        return new Promise((resolve) => {
            GSAP.timeline()
                .to(
                    this.main,
                    {
                        duration: 1.5,
                        ease: eases.expoOut,
                        autoAlpha: 1,
                    },
                    0
                )
                .to(
                    [this.elementTitle, this.elementLabel],
                    {
                        duration: 1.5,
                        ease: eases.expoInOut,
                        stagger: 0.05,
                        y: '101%',
                    },
                    0
                )
                .to(
                    this.element,
                    {
                        duration: 1.5,
                        ease: eases.expoInOut,
                        y: '101%',

                        onComplete: resolve,
                    },
                    0.5
                );
        });
    }
}
