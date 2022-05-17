import Page from './Page';

export default class Contact extends Page {
    constructor() {
        super({
            id: 'contact',

            element: '.hero',
            elements: {
                nav: document.querySelector('.nav'),
                nav_links: document.querySelectorAll('.nav_flex-links > a'),

                image: '.hero_media',
                title: '.hero_title',
                parag: '.hero_description',
            },
        });
    }

    create() {
        super.create();
    }
}
