import Page from './Page';

export default class Gallery extends Page {
    constructor() {
        super({
            id: 'gallery',

            element: '.gallery',
            elements: {
                header: document.querySelector('.header'),
                header_links: document.querySelectorAll('.header_wrapper > div'),

                title: '.gallery_heading_title > h1',
                description: '.gallery_heading_description > p',
                info: '.product_info',
                image: '.product_media_image',
            },
        });
    }

    create() {
        super.create();
    }
}
