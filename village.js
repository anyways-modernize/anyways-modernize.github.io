// village.js
// Memory-safe rewritten version with proper lifecycle cleanup

(() => {
    // Destroy previous instance if it exists
    window.__villageCleanup?.();

    const state = {
        aborted: false,
        intervals: [],
        timeouts: [],
        rafs: [],
        listeners: [],
        nodes: [],
        controllers: [],
    };

    // ------------------------------------------------------------
    // HELPERS
    // ------------------------------------------------------------

    const addListener = (target, event, handler, options) => {
        target.addEventListener(event, handler, options);
        state.listeners.push(() => {
            target.removeEventListener(event, handler, options);
        });
    };

    const addInterval = (fn, ms) => {
        const id = setInterval(fn, ms);
        state.intervals.push(id);
        return id;
    };

    const addTimeout = (fn, ms) => {
        const id = setTimeout(fn, ms);
        state.timeouts.push(id);
        return id;
    };

    const addRAF = (fn) => {
        const id = requestAnimationFrame(fn);
        state.rafs.push(id);
        return id;
    };

    const trackNode = (node) => {
        state.nodes.push(node);
        return node;
    };

    const wait = (ms) =>
        new Promise((resolve) => {
            const id = setTimeout(resolve, ms);
            state.timeouts.push(id);
        });

    // ------------------------------------------------------------
    // CLEANUP
    // ------------------------------------------------------------

    function cleanup() {
        if (state.aborted) return;

        state.aborted = true;

        // intervals
        state.intervals.forEach(clearInterval);

        // timeouts
        state.timeouts.forEach(clearTimeout);

        // animation frames
        state.rafs.forEach(cancelAnimationFrame);

        // listeners
        state.listeners.forEach((off) => off());

        // abort fetches
        state.controllers.forEach((c) => c.abort());

        // remove nodes
        state.nodes.forEach((n) => {
            try {
                n.remove();
            } catch {}
        });

        // clear arrays
        state.intervals.length = 0;
        state.timeouts.length = 0;
        state.rafs.length = 0;
        state.listeners.length = 0;
        state.nodes.length = 0;
        state.controllers.length = 0;

        console.log("[village] cleaned up");
    }

    window.__villageCleanup = cleanup;

    addListener(window, "beforeunload", cleanup);
    addListener(window, "pagehide", cleanup);

    // ------------------------------------------------------------
    // SVG LANDSCAPE
    // ------------------------------------------------------------

    function createLandscape() {
        const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );

        svg.setAttribute("viewBox", "0 0 1200 400");
        svg.classList.add("landscape");

        svg.innerHTML = `
            <rect width="1200" height="400" fill="#07111f"/>
            <circle cx="950" cy="80" r="40" fill="#fff7cc"/>
            <rect x="0" y="300" width="1200" height="100" fill="#13251d"/>
        `;

        document.body.appendChild(svg);

        trackNode(svg);
    }

    // ------------------------------------------------------------
    // FIREFLIES
    // ------------------------------------------------------------

    function createFirefly() {
        const firefly = document.createElement("div");
        firefly.className = "firefly";

        firefly.style.position = "fixed";
        firefly.style.width = "4px";
        firefly.style.height = "4px";
        firefly.style.borderRadius = "50%";
        firefly.style.background = "#ffe066";
        firefly.style.pointerEvents = "none";
        firefly.style.zIndex = "9999";

        document.body.appendChild(firefly);

        trackNode(firefly);

        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;

        async function animate() {
            while (!state.aborted) {
                x += (Math.random() - 0.5) * 50;
                y += (Math.random() - 0.5) * 50;

                firefly.style.transform = `translate(${x}px, ${y}px)`;
                firefly.style.opacity = Math.random();

                await wait(300 + Math.random() * 700);
            }
        }

        animate();
    }

    // ------------------------------------------------------------
    // WINDOW FLICKER
    // ------------------------------------------------------------

    function startWindowFlicker() {
        const windows = document.querySelectorAll(".window-light");

        addInterval(() => {
            windows.forEach((w) => {
                w.style.opacity = Math.random() > 0.5 ? "1" : "0.5";
            });
        }, 800);
    }

    // ------------------------------------------------------------
    // NAV LOAD
    // ------------------------------------------------------------

    async function loadNav() {
        const controller = new AbortController();

        state.controllers.push(controller);

        try {
            const res = await fetch("/nav.html", {
                signal: controller.signal,
            });

            if (state.aborted) return;

            const html = await res.text();

            if (state.aborted) return;

            const nav = document.createElement("div");
            nav.innerHTML = html;

            document.body.prepend(nav);

            trackNode(nav);

            const toggle = nav.querySelector(".nav-toggle");

            if (toggle) {
                const onClick = () => {
                    nav.classList.toggle("open");
                };

                addListener(toggle, "click", onClick);
            }
        } catch (err) {
            if (err.name !== "AbortError") {
                console.error(err);
            }
        }
    }

    // ------------------------------------------------------------
    // HERO ANIMATION
    // ------------------------------------------------------------

    function startHeroAnimation() {
        const hero = document.querySelector(".hero");

        if (!hero) return;

        let dir = 1;

        addInterval(() => {
            const current =
                parseFloat(hero.dataset.offset || "0");

            let next = current + dir * 2;

            if (next > 10) dir = -1;
            if (next < -10) dir = 1;

            hero.dataset.offset = next;

            hero.style.transform =
                `translateY(${next}px)`;
        }, 120);
    }

    // ------------------------------------------------------------
    // MOUSE PARALLAX
    // ------------------------------------------------------------

    function setupParallax() {
        const layers =
            document.querySelectorAll("[data-parallax]");

        const handler = (e) => {
            const x =
                (e.clientX / window.innerWidth - 0.5) * 20;

            const y =
                (e.clientY / window.innerHeight - 0.5) * 20;

            layers.forEach((layer) => {
                const depth =
                    parseFloat(
                        layer.dataset.parallax || "1"
                    );

                layer.style.transform =
                    `translate(${x * depth}px, ${y * depth}px)`;
            });
        };

        addListener(window, "mousemove", handler);
    }

    // ------------------------------------------------------------
    // INIT
    // ------------------------------------------------------------

    async function init() {
        createLandscape();

        for (let i = 0; i < 16; i++) {
            createFirefly();
        }

        startWindowFlicker();
        startHeroAnimation();
        setupParallax();

        await loadNav();

        console.log("[village] initialized");
    }

    init();
})();
