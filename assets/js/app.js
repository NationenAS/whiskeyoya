setTimeout(() => {console.log("delayed 250ms ")}, 250);
/* Mapbox init */
const natlabStart = [12.477378845214844, 66.76016258859444];
mapboxgl.accessToken = 'pk.eyJ1IjoiamFyYW5kIiwiYSI6ImNrZnBhMDBuMjBzajEycm9laGFzenN2MjcifQ.5QyfTBxmSzxDGAyZ_kTusA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jarand/ckybjbmcg0t8q14mjjvipvoj8',
    center: natlabStart,          
    zoom: 3,
    interactive: false
});

/* Zoom in on viewport intersection */
let natlabm = document.querySelector('#map');
let natlabMapObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            map.easeTo({
                zoom: 14.3,
                duration: 8000,
                pitch: 45,
                bearing: 50,
                easing(t) {
                    return -(Math.cos(3.14 * t) - 1) / 2;
                }
            })
        }
        else {
            map.stop();
            map.easeTo({
                zoom: 4,
                duration: 2000,
                pitch: 0,
                bearing:0,
                easing(t) {
                    return Math.sin((t * 3.14) / 2);
                }
            });
        }
    });
    }, { 
    threshold: 0.8
});
natlabMapObserver.observe(natlabm);

/* Videos start/stop */
let natlabvideos = document.querySelectorAll('video.intersect');
let observeVideo = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && !entry.target.paused) {
            entry.target.pause();
        } else if (entry.isIntersecting && entry.target.paused) {
            entry.target.play();
        }
    });
}, {
    threshold: 0.3
});
natlabvideos.forEach(el => {
    observeVideo.observe(el);   
});

/* Nat Story v3 */

// Build
let natStories = document.querySelectorAll(".story"), id = 1;
natStories.forEach(s => {
    s.dataset.story = id; id++;
    let rect = s.getBoundingClientRect();
    let storyContent = s.querySelectorAll(".story__background, .story__trigger"), i = 0;
    let bg = s.querySelectorAll(".story__background");
    storyContent.forEach(e => {
        if (e.className == "story__background") { 
            i++; e.dataset.storyId = i;
            if (i == 1 && rect.y > 0) e.dataset.storyState = "active";
            else if (i == bg.length && rect.y < 0) e.dataset.storyState = "active";
        }
        else if (e.classList.contains("story__trigger")) e.dataset.storyControl = i;
    });
});

// Observe
var natlabelementObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        let t = entry.target;
        if (entry.isIntersecting) {
            let s = t.parentNode,
                tId = parseInt(t.dataset.storyControl),
                tBg = s.querySelector(".story__background[data-story-id='" + tId + "']"),
                prevBg = s.querySelector(".story__background[data-story-id='" + (tId - 1) + "']"),
                nextBg = s.querySelector(".story__background[data-story-id='" + (tId + 1) + "']"),
                hasState = s.querySelectorAll('[data-story-state]');
            hasState.forEach(e => { delete e.dataset.storyState; });
            t.dataset.storyState = tBg.dataset.storyState = "active";
            if (prevBg !== null) prevBg.dataset.storyState = "prev";
            if (nextBg !== null) nextBg.dataset.storyState = "next";
        }
        else {
            delete t.dataset.storyState;
        }
    });
}, { 
    threshold: 0.4
});
var storyElement = document.querySelectorAll('.story__trigger');
storyElement.forEach((e) => {
    natlabelementObserver.observe(e);
});
/* End Nat Story */
