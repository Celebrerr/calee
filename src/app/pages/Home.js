import Page from './Page';

export default class Home extends Page {
    constructor() {
        super({
            id: 'home',

            element: '.home',
            elements: {
                header: document.querySelector('.header'),
                header_links: document.querySelectorAll('.header_wrapper > div'),

                description: '.home_description > p',
                label: '.home_label > span',

                image: '.home_media',
            },
        });
    }

    create() {
        super.create();
    }
}
