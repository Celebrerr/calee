import GSAP from 'gsap';
import { TextPlugin } from 'gsap/all';
GSAP.registerPlugin(TextPlugin);

import { eases } from '../utils/easing';

export default class Menu {
    constructor() {
        this.el = document.querySelector('.menu');
        this.menu = this.el;
        this.menuInner = this.el.children[0];
        this.menuOverlay = this.el.children[1];

        this.navMenu = document.querySelector('.nav_menu');
        this.navMenuText = document.querySelector('.nav_menu a');

        this.action = false;

        this.openMenu = document.querySelector('.action--open');

        this.menuList = this.el.querySelectorAll('.menu-item');
        this.menuListLinks = this.el.querySelectorAll('.menu-link');

        this.body = document.querySelector('body');

        this.animateMenu();
        this.animateIcon();

        this.addEventListeners();
    }

    animateMenu() {
        this.matchMedia = window.matchMedia('(max-width: 769px)');
        this.isMobile = this.matchMedia.matches;

        this.tlMenu = GSAP.timeline({ paused: true })
            .addLabel('start')
            .to(
                this.menuInner,
                {
                    duration: 0.5,
                    height: '50vh',
                    ease: eases.power2,
                    // backgroundColor: '#afd8d6',
                },
                'start'
            )
            .to(
                this.menuOverlay,
                {
                    duration: 0.5,
                    autoAlpha: 0.8,
                    ease: eases.power2,
                },
                'start'
            )
            .from(
                this.menuList,
                {
                    duration: 0.8,
                    // y: '+=100',
                    autoAlpha: 0,
                    ease: eases.power4,
                    stagger: 0.05,
                },
                'start+=0.8'
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
        this.tlNavTop.play();

        GSAP.to(this.navMenuText, {
            delay: 0.5,
            text: 'close',
        });

        this.menu.classList.add('menu--visible');
        this.body.classList.add('ofh');
    }

    close() {
        this.action = false;

        this.tlMenu.reverse();
        this.tlNavTop.reverse();

        GSAP.to(this.navMenuText, {
            delay: 0.5,
            text: 'menu',
        });

        this.menu.classList.remove('menu--visible');
        this.body.classList.remove('ofh');
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
        this.menuOverlay.addEventListener('click', this.onClickLinks.bind(this));
    }
}
