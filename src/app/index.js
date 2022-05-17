import 'lazysizes';
import { canvasNoise } from './utils/utility';

import Preloader from './partials/Preloader';
import Menu from './partials/Menu';

import PageTransition from './animations/PageTransition';
import SmoothScroll from './animations/SmoothScroll';
import Observer from './animations/Observer';

import Page from './pages/Page';

import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';

class App {
    constructor() {
        this.initPartials();
        // this.checkAnimations();

        // this.initPreloader();

        this.initAnimations();
        this.initContents();
        this.initPages();

        this.addEventListeners();
        this.addLinkListener();

        this.prevScrollPos = window.pageYOffset;
    }

    initPartials() {
        this.transition = new PageTransition();
        this.observer = new Observer();

        // this.menu = new Menu();
        canvasNoise();
    }

    checkAnimations() {
        // const isMobile = window.matchMedia('(max-width: 769px)');
        // const checkIsMobile = isMobile.matches;
        // if (!checkIsMobile) {
        //     this.initAnimations();
        // }
    }

    initAnimations() {
        // new SmoothScroll();
    }

    initPreloader() {
        this.preloader = new Preloader();
        this.preloader.once('completed', this.onPreloaded.bind(this));
    }

    async onPreloaded() {
        await this.transition.show();

        this.preloader.destroy();

        await this.transition.hide();
    }

    initContents() {
        this.content = document.querySelector('.container');
        this.template = this.content.getAttribute('data-template');
    }

    initPages() {
        this.pages = {
            home: new Home(),
            gallery: new Gallery(),
            // about: new About(),
            // contact: new Contact(),
        };

        this.page = this.pages[this.template];

        this.page.initIntroAnimation();
        this.page.showIntroAnimation();
    }

    onPopSate() {
        this.onChange({
            url: window.location.pathname,
            push: false,
        });
    }

    onScroll() {
        if (this.template !== 'home' && this.template !== 'about') return;

        const arrowScroll = document.querySelector('.hero_scroll');
        let currentScrollPos = window.pageYOffset;

        this.prevScrollPos > currentScrollPos ? (arrowScroll.style.opacity = '1') : (arrowScroll.style.opacity = '0');
        this.prevScrollPos = currentScrollPos;
    }

    async onChange({ url, push = true }) {
        await this.transition.show();

        const request = await window.fetch(url);

        if (request.status === 200) {
            window.scrollTo(0, 0);

            const html = await request.text();
            const div = document.createElement('div');

            if (push) {
                window.history.pushState({}, '', url);
                console.log('push');
            }

            div.innerHTML = html;

            const divContent = div.querySelector('.container');
            this.template = divContent.getAttribute('data-template');

            this.content.setAttribute('data-template', this.template);
            this.content.innerHTML = divContent.innerHTML;

            this.page = this.pages[this.template];

            await this.transition.hide();

            // this.checkAnimations();

            this.initPages();
            this.observer = new Observer();

            this.addLinkListener();
        } else {
            console.log('Error');
        }
    }

    onOrientationChange() {
        location.reload();
    }

    addEventListeners() {
        window.addEventListener('popstate', this.onPopSate.bind(this));
        window.addEventListener('orientationchange', this.onOrientationChange.bind(this));
        // window.addEventListener('scroll', this.onScroll.bind(this));
    }

    addLinkListener() {
        // const navLinks = document.querySelectorAll('.header_wrapper div a');

        // for (let link of navLinks) {
        //     link.addEventListener('click', (e) => {
        //         e.preventDefault();
        //         const footer = document.querySelector('.footer');
        //         footer.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        //     });
        // }

        const linkProject = document.querySelectorAll('.project_link');

        linkProject.forEach((link) => {
            link.onclick = (e) => {
                e.preventDefault();

                const { href } = link;

                // if (link.classList.contains('menu-link')) {
                //     this.menu.onClickLinks();
                //     setTimeout(() => {
                //         this.onChange({ url: href });
                //     }, 1100);

                //     return;
                // }

                this.onChange({ url: href });
            };
        });
    }
}

new App();
window.scrollTo(0, 0);
