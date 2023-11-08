document.addEventListener('DOMContentLoaded', function () {
    const videoPlayerContainer = document.getElementById('videoPlayerContainer');
    let currentVideo; // Declare currentVideo variable
    let currentVideoIndex = 0; // Keep track of the current video index
    let backgroundAudio; // Declare backgroundAudio variable for Howler.js
    let preloading = false; // Flag to track whether preloading is in progress

    // Create an array to store preloaded video elements
    const preloadedVideos = [];

    // Define the videoArray with the video paths
    const videoArray = [
        'wwwroot/videos/SW1.mp4',
        'wwwroot/videos/SW2.mp4',
        'wwwroot/videos/SW3.mp4',
        'wwwroot/videos/SW4.mp4',
        'wwwroot/videos/SW5.mp4',
        'wwwroot/videos/SW6.mp4',
        // Add more video filenames as needed
    ];

    // Function to play video by index
    function playVideoByIndex(index) {
        if (currentVideo) {
            currentVideo.pause();
            videoPlayerContainer.removeChild(currentVideo);
        }

        const newVideo = preloadedVideos[index];
        videoPlayerContainer.appendChild(newVideo);

        newVideo.currentTime = currentVideo ? currentVideo.currentTime : 0; // Sync video time

        currentVideo = newVideo;
        currentVideo.play().catch(error => {
            console.error('Video playback error:', error.message);
        });

        currentVideoIndex = index;
    }

    // Add a click event listener
    document.addEventListener('click', () => {
        if (!preloading) {
            // Preload all videos and start background audio preloading
            preloading = true;

            // Preload all videos
            videoArray.forEach(videoPath => {
                const video = document.createElement('video');
                video.src = videoPath;
                video.preload = 'auto';
                video.setAttribute('playsinline', ''); // Add playsinline attribute for mobile devices
                preloadedVideos.push(video);
            });

            // Start background audio preloading using Howler.js
            if (!backgroundAudio) {
                backgroundAudio = new Howl({
                    src: ['wwwroot/assets/Song.m4a'], // Update this to the relative path of your audio file
                    loop: true, // Set the loop attribute to true for continuous playback
                    html5: true, // Use HTML5 audio
                });
            }
        } else {
            // Play the next video
            currentVideoIndex = (currentVideoIndex + 1) % videoArray.length;
            playVideoByIndex(currentVideoIndex);

            // Play the background audio
            backgroundAudio.play();
        }
    });
});
