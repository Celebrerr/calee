class PWA {
    constructor() {
        this.deferredPrompt;

        this.init();
        this.addEventListener();
    }

    init() {
        if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');
    }

    onBeforeIP(e) {
        e.preventDefault();

        this.deferredPrompt = e;
    }

    addEventListener() {
        window.addEventListener('beforeinstallprompt', this.onBeforeIP.bind(this));
    }
}

new PWA();
