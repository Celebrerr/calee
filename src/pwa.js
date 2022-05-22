import Banner from './app/partials/Banner';

export default class PWA {
    constructor() {
        this.deferredPrompt;
        this.isInstalled;

        this.init();
        this.addEventListener();
    }

    init() {
        if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');
        this.banner = new Banner();
    }

    showInstallPromotion() {
        if (this.isInstalled === undefined) return;

        this.banner.showBanner();
        this.buttonBanner = this.banner.bannerButton;

        this.buttonBanner.addEventListener('click', async () => {
            this.deferredPrompt.prompt();

            const { outcome } = await this.deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);

            this.deferredPrompt = null;
            this.banner.destroy();
        });
    }

    onBeforeIP(e) {
        e.preventDefault();

        this.deferredPrompt = e;
        this.isInstalled = false;
    }

    addEventListener() {
        window.addEventListener('beforeinstallprompt', this.onBeforeIP.bind(this));
    }
}
