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

                product: '.gallery_product',
                media: '.product_media',
                image: '.product_media_image',

                info: '.product_info',
                info_title: '.product_title > h3',
                info_button: '.product_title > span',
            },
        });
    }

    create() {
        super.create();
    }
}
