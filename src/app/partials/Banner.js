import GSAP from 'gsap';
import { TextPlugin } from 'gsap/all';
GSAP.registerPlugin(TextPlugin);

import { eases } from '../utils/easing';

export default class Banner {
    constructor() {
        this.el = document.querySelector('.spotify');
        this.menu = this.el;
        this.menuInner = this.el.children[0];
        console.log(this.menuInner);

        this.navMenu = document.querySelector('.nav_spotify');
        this.navMenuText = document.querySelector('.nav_menu a');

        this.action = false;

        this.openMenu = document.querySelector('.spotify--open');

        this.initSpotify();
        this.animateMenu();
        // this.animateIcon();

        this.addEventListeners();
    }

    initSpotify() {
        GSAP.set(this.el, { autoAlpha: 0 });
    }

    animateMenu() {
        this.matchMedia = window.matchMedia('(max-width: 769px)');
        this.isMobile = this.matchMedia.matches;

        this.tlMenu = GSAP.timeline({ paused: true }).addLabel('start').to(
            this.el,
            {
                duration: 0.5,
                // height: '350px',
                autoAlpha: 1,
                ease: eases.power2,
                // backgroundColor: '#afd8d6',
            },
            'start'
        );
    }

    animateIcon() {
        this.tlNavTop = GSAP.timeline({ paused: true })
            .addLabel('start', 0)
            .to(
                this.navMenu,
                {
                    duration: 0.5,
                    autoAlpha: 0,
                    ease: eases.expo,
                },
                'start'
            )
            .to(
                this.navMenu,
                {
                    duration: 0.5,
                    autoAlpha: 1,
                    ease: eases.expo,
                },
                'start+=1'
            );
    }

    open() {
        this.action = true;

        this.tlMenu.play();
        // this.tlNavTop.play();

        // GSAP.to(this.navMenuText, {
        //     delay: 0.5,
        //     text: 'close',
        // });

        this.menu.classList.add('menu--visible');
    }

    close() {
        this.action = false;

        this.tlMenu.reverse();
        // this.tlNavTop.reverse();

        // GSAP.to(this.navMenuText, {
        //     delay: 0.5,
        //     text: 'menu',
        // });

        this.menu.classList.remove('menu--visible');
    }

    onClick(e) {
        e.preventDefault();
        !this.action ? this.open() : this.close();
    }

    onClickLinks() {
        this.close();
    }

    addEventListeners() {
        this.openMenu.addEventListener('click', this.onClick.bind(this));
    }
}
