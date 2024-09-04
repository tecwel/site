
// List of YouTube video URLs https://www.youtube.com/embed/kjRviCUtu-U
const videoUrls = [
    'https://www.youtube.com/embed/kjRviCUtu-U',
    'https://www.youtube.com/embed/qdPSfp4XJK8',
    'https://www.youtube.com/embed/-TJgEhwWaHw',
    'https://www.youtube.com/embed/mIGNjSkf2XI',
    'https://www.youtube.com/embed/n0GMxkPbCfQ',
    'https://www.youtube.com/embed/MAXRy8f-k24',
    'https://www.youtube.com/embed/zsjgDu_wNKU',
    'https://www.youtube.com/embed/g4oVgsgxdmo',
    'https://www.youtube.com/embed/_IVAt2W5qUU',
    'https://www.youtube.com/embed/DIykM1mELc8',
    'https://www.youtube.com/embed/iIaQGmZaxpA',
    'https://www.youtube.com/embed/ygrMA5BYi2M',
    'https://www.youtube.com/embed/GxfOInGxMps',
    'https://www.youtube.com/embed/UeID0yeNfnc',
    'https://www.youtube.com/embed/pZR8QjHURdE',
    'https://www.youtube.com/embed/R4-3DhsOzpY',
    'https://www.youtube.com/embed/MwsrlVNvHrY',
    'https://www.youtube.com/embed/WIZ563pe4YY',
    'https://www.youtube.com/embed/Gvs6X9zMtAo',
    'https://www.youtube.com/embed/YF7atmp-omc',
    'https://www.youtube.com/embed/Sp45qE-umDg',
    'https://www.youtube.com/embed/IMQVvjFWZVU',
    'https://www.youtube.com/embed/colccmR78Ug',
    'https://www.youtube.com/embed/UInjvaNmfpo',
    'https://www.youtube.com/embed/9Zt7kBATeqE',
    'https://www.youtube.com/embed/RaFfQCAo0mg',
    'https://www.youtube.com/embed/D5vLVge2LO8',
    'https://www.youtube.com/embed/TDm7fru7SQY',
    'https://www.youtube.com/embed/-SdyhS0MZkM',
    'https://www.youtube.com/embed/DeZsWVx7T_U',
    'https://www.youtube.com/embed/S7ndu-6joJs',
    'https://www.youtube.com/embed/_02xrVU1gwo',
    'https://www.youtube.com/embed/dvbFIcw96a4',
    'https://www.youtube.com/embed/fUpiEtbXZE8',
    'https://www.youtube.com/embed/1y4_tihWt2w',
    'https://www.youtube.com/embed/HyG5BaY7bNA',
    
];
// // Adding event listeners for all video elements
// handleIframeShow('p', videoUrls);

// // Adding event listeners for close buttons
// addCloseListeners();
// Function to handle showing the iframe and setting the video src
function handleIframeShow(videoClassPrefix, videoUrls) {
    videoUrls.forEach((videoUrl, index) => {
        const paragraphElement = document.querySelector(`.${videoClassPrefix}${index + 1}`);
        const iframeElement = document.querySelector(`.v${index + 1}`);
        const containerElement = document.querySelector(`.floatingIframeContainer[data-index="${index}"]`);

        if (paragraphElement && iframeElement && containerElement) {
            paragraphElement.addEventListener('click', function (event) {
                event.preventDefault();
                // Append a unique parameter to force reload
                const uniqueVideoUrl = `${videoUrl}?t=${new Date().getTime()}`;

                // Set iframe src when the preview button is clicked
                iframeElement.src = uniqueVideoUrl;
                containerElement.style.display = 'block';
            });
        }
    });
}

// Function to close the iframe and stop the video
function addCloseListeners() {
    const closeButtons = document.querySelectorAll('.closeBtn');

    closeButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            const containerElement = document.querySelector(`.floatingIframeContainer[data-index="${index}"]`);
            const iframe = containerElement.querySelector('iframe');
            if (iframe) {
                iframe.src = ''; // Reset the src to stop the video
                containerElement.style.display = 'none'; // Hide the iframe container
            }
        });
    });
}

// Lazy load iframes when they come into view
function lazyLoadIframes() {
    const iframes = document.querySelectorAll('iframe[data-src]');
    const iframeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                if (!iframe.src) {
                    iframe.src = iframe.getAttribute('data-src');
                }
                iframe.removeAttribute('data-src');
                observer.unobserve(iframe);
            }
        });
    });

    iframes.forEach(iframe => {
        iframeObserver.observe(iframe);
    });
}

// Call lazyLoadIframes on page load
window.addEventListener('DOMContentLoaded', lazyLoadIframes);

// Initialize the preview handling
handleIframeShow('p', videoUrls);

// Initialize the close button handling
addCloseListeners();

// Function to scroll to a specific product based on the product number
function scrollToProduct(productNumber) {
    const productElement = document.querySelector(`.p${productNumber}`);
    if (productElement) {
        productElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        alert('Product not found!');
    }
}

// Function to handle search icon click
function handleSearchClick() {
    const searchInput = document.getElementById('searchProduct');
    const productNumber = searchInput.value.trim();
    if (productNumber) {
        scrollToProduct(productNumber);
        searchInput.value = ''; // Clear the input after search
    }
}

// Function to handle Enter key press
function handleEnterKeyPress(event) {
    if (event.key === 'Enter') {
        handleSearchClick();
    }
}

// Adding event listener for the search icon
document.querySelector('.search-icon').addEventListener('click', handleSearchClick);

// Adding event listener for Enter key press
document.getElementById('searchProduct').addEventListener('keydown', handleEnterKeyPress);

// Function to show/hide scroll-to-top button
function handleScroll() {
    const scrollToTopButton = document.getElementById('scrollToTop');
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
}

// Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Adding event listener for the scroll-to-top button
document.getElementById('scrollToTop').addEventListener('click', scrollToTop);

// Adding scroll event listener to handle scroll-to-top button visibility
window.addEventListener('scroll', handleScroll);