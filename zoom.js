document.addEventListener('DOMContentLoaded', function () {
    if (window.self !== window.top) { // Check if the page is being loaded within an iframe
      document.body.style.zoom = '0.5'; // Adjust the zoom level here
    }
});