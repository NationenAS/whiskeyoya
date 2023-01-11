/* Wipe
const w = document.querySelectorAll('.wipe__element--back');
let wipeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        let e = entry.target.querySelector('.wipe__media');
        if (e) {
            let c = entry.target.querySelector('.wipe__content');
            if (entry.isIntersecting) {
                e.style.opacity = 1;
                setTimeout(() => {
                    c.style.opacity = 1;
                }, 500);
            }
            else {
                e.style.opacity = 0;
                c.style.opacity = 0;
            }
        }
    });
    }, { 
    threshold: 0.001
});
w.forEach(e => {
    wipeObserver.observe(e);
}); */

/* Create images */
const p = document.querySelectorAll('figure.create');
p.forEach(el => {
    let o = JSON.parse(el.innerHTML),
        w = el.offsetWidth,
        u = 'https://imengine.editorial.prod.tun.infomaker.io/',
        q = (o.q) ? "&q=" + o.q : "",
        a = d = "",
        b = `<img src="${u}?uuid=${o.uuid}&type=preview&width=${w}${q}" loading="lazy" alt="${o.alt}">`,
        c = (o.caption) ? `<figcaption>${o.caption}</figcaption>` : "";
    if (o.small || el.classList.contains('col--l') || el.classList.contains('col--full')) {
        let h = (o.small == "square") ? "&height=600" : (o.small == "portrait") ? "&height=800" : "&height=400";
        a = `<picture><source media="(max-aspect-ratio: 3/4)" srcset=${u}?uuid=${o.uuid}&type=preview&function=thumbnail&width=600${h}${q}>`;
        d = "</picture>";
    }
    el.innerHTML = a + b + c + d;
    el.classList.remove("create");
});

/* Header
let svg = document.querySelectorAll(".header__title path");
let i = 0;
svg.forEach(el => {
    el.style.animation = "float 4s 0." + i + "s ease-in-out infinite";
    i++;
});
const e = document.querySelector('.header__title'),
    y = window.innerHeight * 1.2,
    bl_s = 15,
    z_s = 30,
    z_e = 90,
    t = 300,
    header = function() {
        let w = this.scrollY;
        let f = (w / y) * 100;
        let b = bl_s + -((bl_s / 60) * f); if (b < 0) b = 0;
        let z = z_s + ((z_e - z_s) / 100 * f); if (z > z_e) z = z_e;
        e.style.cssText = `filter: blur(${b}px); width: ${z}%`;
    }
window.addEventListener('scroll', header);
header(); */
