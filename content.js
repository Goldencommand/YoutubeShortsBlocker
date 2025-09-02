function hideYouTubeElements() {
    // Hide Shorts (home, sections, sidebars, filter button)
    document.querySelectorAll(
        'grid-shelf-view-model, ' +
        'ytd-rich-section-renderer ytd-rich-shelf-renderer[is-shorts], ' +
        'ytd-reel-shelf-renderer, ' +
        'a[title="Shorts"], ' +
        'button.ytChipShapeButtonReset'
    ).forEach(el => {
        if (el.tagName === 'A' || el.tagName === 'BUTTON') {
            if (el.innerText.trim() === "Shorts" || el.title === "Shorts") {
                el.parentElement && (el.parentElement.style.display = 'none');
            }
        } else {
            el.style.display = 'none';
        }
    });

    // Redirect shorts to normal /watch?v= format
    if (location.pathname.startsWith("/shorts/")) {
        const videoId = location.pathname.split("/shorts/")[1];
        window.location.replace(`/watch?v=${videoId}`);
    }

    // Hide Shorts from search results
    document.querySelectorAll('ytd-video-renderer, ytd-grid-video-renderer, ytd-rich-item-renderer').forEach(el => {
        const link = el.querySelector('a#thumbnail');
        if (link && link.href.includes('/shorts/')) el.style.display = 'none';
    });

    // Hide ads (banners, promoted videos, etc.)
    document.querySelectorAll(
        '#masthead-ad, ytd-banner-promo-renderer, ytd-ad-slot-renderer, ' +
        'ytd-promoted-video-renderer, ytd-display-ad-renderer, ' +
        'ytd-promoted-sparkles-web-renderer, ytd-action-companion-ad-renderer'
    ).forEach(el => {
        if (
            el.parentElement.parentElement &&
            el.parentElement.parentElement.className.toLowerCase() === 'style-scope ytd-rich-grid-renderer'
        ) {
            el.parentElement.parentElement.style.display = 'none';
        } else {
            el.style.display = 'none';
        }
    });

    // Hide engagement panel ads
    document.querySelectorAll(
        'ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-ads"]'
    ).forEach(el => el.style.display = 'none');
}

// Watch for new elements being added (YouTube loads content dynamically)
let timeout;
const observer = new MutationObserver(() => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(hideYouTubeElements, 50);
});
observer.observe(document.body, { childList: true, subtree: true });

hideYouTubeElements();
