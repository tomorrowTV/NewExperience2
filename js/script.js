document.addEventListener('DOMContentLoaded', function () {
    const videoPlayerContainer = document.getElementById('videoPlayerContainer');
    let videoElement; // Declare videoElement variable
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

    // Create an audio element for the background audio
    const backgroundAudio = document.createElement('audio');
    backgroundAudio.src = 'wwwroot/assets/Song.m4a'; // Update this to the relative path of your audio file
    backgroundAudio.preload = 'auto';
    backgroundAudio.load();
    document.body.appendChild(backgroundAudio);

    // Function to play video by index
    function playVideoByIndex(index) {
        // Pause the current video
        if (videoElement) {
            videoElement.pause();
        }

        // Use the preloaded video element for the new video
        const newVideoElement = preloadedVideos[index];
        videoPlayerContainer.innerHTML = '';
        videoPlayerContainer.appendChild(newVideoElement);

        // Update the reference to the current video element
        videoElement = newVideoElement;

        // Start playback
        videoElement.currentTime = 0;
        videoElement.play().catch(error => {
            console.error('Video playback error:', error.message);
        });

        // Update the current video index
        currentVideoIndex = index;
    }

    // Add a click event listener to transition to the next video on user interaction
    document.addEventListener('click', () => {
        // Calculate the next index, wrapping around to the beginning if needed
        const nextIndex = (currentVideoIndex + 1) % videoArray.length;

        // Play the next video
        playVideoByIndex(nextIndex);
        backgroundAudio.currentTime = videoElement.currentTime;
        backgroundAudio.play().catch(error => {
            console.error('Audio playback error:', error.message);
        });
    });

    // Start with the first video in the array
    playVideoByIndex(0);
});
