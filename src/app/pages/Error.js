import Page from './Page';

export default class Error extends Page {
    constructor() {
        super({
            id: 'error',

            element: '.error',
            elements: {
                header: document.querySelector('.header'),
                header_links: document.querySelectorAll('.header_wrapper > div'),

                description: '.error_description > p',
                label: '.error_label > span',

                image: '.error_media',
            },
        });
    }

    create() {
        super.create();
    }
}
