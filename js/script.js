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

    // Create an audio context and audio buffer source
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioSource = audioContext.createBufferSource();

    // Load the audio file using fetch
    fetch('wwwroot/assets/Song.m4a')
        .then(response => response.arrayBuffer())
        .then(data => audioContext.decodeAudioData(data))
        .then(decodedData => {
            audioSource.buffer = decodedData;
            audioSource.loop = true; // Set the loop attribute to true for continuous playback
            audioSource.connect(audioContext.destination);
        })
        .catch(error => console.error('Audio loading error:', error.message));

    let audioPlaying = false;

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

        if (audioPlaying) {
            // Start playback of the background audio on the second click
            audioSource.start();
        } else {
            audioPlaying = true;
            audioSource.start();
        }

        currentVideo.play().catch(error => {
            console.error('Video playback error:', error.message);
        });

        currentVideoIndex = index;
    }

    // Add a click event listener to switch to the next video on user interaction
    document.addEventListener('click', () => {
        // Calculate the next index, wrapping around to the beginning if needed
        currentVideoIndex = (currentVideoIndex + 1) % videoArray.length;

        // Play the next video
        playVideoByIndex(currentVideoIndex);
    });

    // Start with the first video in the array and synchronize its time with audio
    playVideoByIndex(0);
});
