import { lerp } from 'utils/utility';

export default class SmoothScroll {
    constructor() {
        this.el = document.querySelector("[data-smoothscroll='content']");

        this.gallery = document.getElementById('gallery');
        this.about = document.getElementById('about');
        this.contact = document.getElementById('contact');
        this.scrollTop = document.querySelector('.footer_bottom_backtotop');

        this.current = 0;
        this.target = 0;
        this.ease = 0.04;

        this.isMobile = window.matchMedia('(max-width: 769px)').matches;
        !this.isMobile ? this.init() : null;

        this.addEventListeners();
    }

    init() {
        this.containerHeight = this.el.getBoundingClientRect().height;
        document.body.style.height = `${this.containerHeight}px`;

        this.scroll();
    }

    calcSectionRect(section) {
        this.section = section.getBoundingClientRect();
        return this.section.top;
    }

    scroll() {
        this.current = lerp(this.current, this.target, this.ease);
        this.current = parseFloat(this.current.toFixed(2));
        this.target = window.scrollY;

        this.el.style.transform = `translateY(${-this.current}px)`;

        requestAnimationFrame(() => this.scroll());
    }

    onResize() {
        this.containerHeight = this.el.getBoundingClientRect().height;
        document.body.style.height = `${this.containerHeight}px`;
    }

    onScrollTop(e) {
        e.preventDefault();

        if (!this.isMobile) {
            window.scrollBy(0, -this.containerHeight);
        } else {
            document.querySelector('.home').scrollIntoView({ behavior: 'smooth' });
        }
    }

    onScrollBy(e) {
        e.preventDefault();

        const id = e.srcElement.id;
        const selector = this.el.querySelector(`.${id}`);

        if (id === 'gallery') window.scrollBy({ top: this.calcSectionRect(selector), left: 0, behavior: 'smooth' });
        if (id === 'about') window.scrollBy({ top: this.calcSectionRect(selector), left: 0, behavior: 'smooth' });
        if (id === 'contact') window.scrollBy({ top: this.calcSectionRect(selector), left: 0, behavior: 'smooth' });
    }

    addEventListeners() {
        window.addEventListener('resize', this.onResize.bind(this));

        this.scrollTop.addEventListener('click', this.onScrollTop.bind(this));
        this.gallery.addEventListener('click', this.onScrollBy.bind(this));
        this.about.addEventListener('click', this.onScrollBy.bind(this));
        this.contact.addEventListener('click', this.onScrollBy.bind(this));
    }
}
