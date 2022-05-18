import 'lazysizes';

import { canvasNoise } from './utils/utility';
import PageTransition from './animations/PageTransition';
import Banner from './partials/Banner';

import Preloader from './partials/Preloader';
// import Menu from './partials/Menu';

import SmoothScroll from './animations/SmoothScroll';
import Observer from './animations/Observer';

import Home from './pages/Home';
import Gallery from './pages/Gallery';

class App {
    constructor() {
        this.initPartials();
        this.initAnimations();

        this.initPreloader();

        this.initContents();

        this.addEventListeners();
        this.addLinkListener();
    }

    initPartials() {
        canvasNoise();

        this.transition = new PageTransition();
        // this.menu = new Menu();
    }

    initAnimations() {
        const isMobile = window.matchMedia('(max-width: 769px)');
        const checkIsMobile = isMobile.matches;

        if (!checkIsMobile) {
            this.smoothScroll = new SmoothScroll();
        }
        this.observer = new Observer();
    }

    initPreloader() {
        this.preloader = new Preloader();
        this.preloader.once('completed', this.onPreloaded.bind(this));
    }

    async onPreloaded() {
        await this.transition.show();

        this.preloader.destroy();
        this.transition.hide();

        this.banner = new Banner();
        this.initPages();
    }

    initContents() {
        this.content = document.querySelector('.container');
        this.template = this.content.getAttribute('data-template');
    }

    initPages() {
        this.pages = {
            home: new Home(),
            gallery: new Gallery(),
        };

        this.page = this.pages.home;

        this.page.initIntroAnimation();
        this.page.showIntroAnimation();
    }

    onPopSate() {
        this.onChange({
            url: window.location.pathname,
            push: false,
        });
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

            this.transition.hide();

            this.initAnimations();
            this.initPages();

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
    }

    addLinkListener() {
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

        const darkMode = document.querySelector('.footer_top_dark');
        let isOn = false;

        this.page.initDarkMode();
        darkMode.onclick = (e) => {
            e.preventDefault();
            !isOn ? this.page.playDarkMode() : this.page.stopDarkMode();

            isOn = !isOn;
        };
    }
}

new App();
