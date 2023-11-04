document.addEventListener('DOMContentLoaded', function () {
    const videoPlayerContainer = document.getElementById('videoPlayerContainer');
    let videoElement; // Declare videoElement variable

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
    backgroundAudio.loop = true; // Set the loop attribute to true for continuous playback
    backgroundAudio.load();
    document.body.appendChild(backgroundAudio);

    // Function to play video by index
    function playVideoByIndex(index) {
        // Pause the current video
        if (videoElement) {
            videoElement.pause();
            videoPlayerContainer.removeChild(videoElement);
        }

        // Use the preloaded video element for the new video
        const newVideoElement = preloadedVideos[index];
        videoPlayerContainer.appendChild(newVideoElement);

        // Update the reference to the current video element
        videoElement = newVideoElement;

        // Start playback
        videoElement.currentTime = backgroundAudio.currentTime;
        videoElement.play().catch(error => {
            console.error('Video playback error:', error.message);
        });
    }

    // ... Rest of your code ...
});
