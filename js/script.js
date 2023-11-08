document.addEventListener('DOMContentLoaded', function () {
    const videoPlayerContainer = document.getElementById('videoPlayerContainer');
    let currentVideo; // Declare currentVideo variable
    let currentVideoIndex = 0; // Keep track of the current video index

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

    // Preload all videos in advance
    videoArray.forEach(videoPath => {
        const video = document.createElement('video');
        video.src = videoPath;
        video.preload = 'auto';
        video.setAttribute('playsinline', ''); // Add playsinline attribute for mobile devices
        preloadedVideos.push(video);
    });

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

        // Ensure that the audio track plays on mobile browsers
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // On mobile, start audio and video together on the first click
            if (index === 0) {
                newVideo.play().catch(error => {
                    console.error('Video playback error:', error.message);
                });
                const backgroundAudio = new Audio('wwwroot/assets/Song.m4a');
                backgroundAudio.preload = 'auto';
                backgroundAudio.loop = true;
                backgroundAudio.play().catch(error => {
                    console.error('Audio playback error:', error.message);
                });
            }
        } else {
            // On desktop, preload audio and video on the first click
            if (index === 0) {
                const backgroundAudio = new Audio('wwwroot/assets/Song.m4a');
                backgroundAudio.preload = 'auto';
                backgroundAudio.loop = true;
            }

            // On desktop, start audio and video together on the second click
            if (index === 1) {
                newVideo.play().catch(error => {
                    console.error('Video playback error:', error.message);
                });
                backgroundAudio.play().catch(error => {
                    console.error('Audio playback error:', error.message);
                });
            }
        }

        currentVideoIndex = index;
    }

    // Add a click event listener to switch to the next video on user interaction
    document.addEventListener('click', () => {
        // Calculate the next index, wrapping around to the beginning if needed
        currentVideoIndex = (currentVideoIndex + 1) % videoArray.length;

        // Play the next video
        playVideoByIndex(currentVideoIndex);
    });

    // Start with the first video in the array
    playVideoByIndex(0);
});
