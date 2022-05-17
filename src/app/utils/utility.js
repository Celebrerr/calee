import map from 'lodash/map';

export function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

export function lerp2(p1, p2, t) {
    return p1 + (p2 - p1) * t;
}

export function mapEach(element, callback) {
    if (element instanceof window.HTMLElement) {
        return [callback(element)];
    }

    return map(element, callback);
}

export function canvasNoise() {
    const canvas = document.createElement('canvas');
    canvas.className = 'noise';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();

    function noise(ctx) {
        let w = ctx.canvas.width,
            h = ctx.canvas.height,
            idata = ctx.createImageData(w, h),
            buffer32 = new Uint32Array(idata.data.buffer),
            len = buffer32.length,
            i = 0;

        for (; i < len; ) buffer32[i++] = ((100 * Math.random()) | 0) << 24;

        ctx.putImageData(idata, 0, 0);
    }

    window.onresize = () => {
        resize();
        noise(ctx);
    };

    let toggle = true;

    // (function loop() {
    //     toggle = !toggle;
    //     if (toggle) {
    //         requestAnimationFrame(loop);
    //         return;
    //     }

    //     requestAnimationFrame(loop);
    // })();

    noise(ctx);
}
