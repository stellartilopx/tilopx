const viewer = document.querySelector(".viewer");

if (viewer) {
    const viewerImage = viewer.querySelector(".viewer-image");
    const closeButton = viewer.querySelector(".close");
    const previousButton = viewer.querySelector(".previous");
    const nextButton = viewer.querySelector(".next");
    const screenshotLinks = [...document.querySelectorAll(".gallery a")];
    let currentIndex = 0;

    function showScreenshot(index) {
        currentIndex = (index + screenshotLinks.length) % screenshotLinks.length;
        const image = screenshotLinks[currentIndex].querySelector("img");

        viewerImage.src = image ? image.src : screenshotLinks[currentIndex].href;
        viewerImage.alt = image ? image.alt : "Project screenshot";
    }

    function openViewer(index) {
        showScreenshot(index);
        viewer.classList.add("show");
        viewer.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeViewer() {
        viewer.classList.remove("show");
        viewer.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    screenshotLinks.forEach((link, index) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            openViewer(index);
        });
    });

    closeButton.addEventListener("click", closeViewer);
    previousButton.addEventListener("click", () => showScreenshot(currentIndex - 1));
    nextButton.addEventListener("click", () => showScreenshot(currentIndex + 1));

    viewer.addEventListener("click", (event) => {
        if (event.target === viewer) {
            closeViewer();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (!viewer.classList.contains("show")) {
            return;
        }

        if (event.key === "Escape") {
            closeViewer();
        } else if (event.key === "ArrowLeft") {
            showScreenshot(currentIndex - 1);
        } else if (event.key === "ArrowRight") {
            showScreenshot(currentIndex + 1);
        }
    });
}