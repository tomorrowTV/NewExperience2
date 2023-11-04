// ... Your existing code ...

document.addEventListener('DOMContentLoaded', function () {
    const videoPlayerContainer = document.getElementById('videoPlayerContainer');
    const videoElement = document.createElement('video');
    videoElement.id = 'videoPlayer';
    videoElement.controls = true; // Add controls for user interaction
    videoElement.setAttribute('playsinline', ''); // Add playsinline attribute
    videoElement.preload = 'auto'; // Set preload attribute to 'auto' for video
    videoPlayerContainer.appendChild(videoElement);

    // Create an audio element for the background audio
    const backgroundAudio = document.createElement('audio');
    backgroundAudio.src = 'wwwroot/assets/Song.m4a'; // Update this to the relative path of your audio file
    backgroundAudio.preload = 'auto';
    backgroundAudio.loop = true; // Set the loop attribute to true for continuous playback
    backgroundAudio.load();
    document.body.appendChild(backgroundAudio);

    const canvas = document.createElement('canvas');
    canvas.width = 960;
    canvas.height = 540;
    document.body.appendChild(canvas);

    let currentVideoIndex = 0;
    const timerInterval = 100; // 100 ms
    let audioStarted = false;

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

    // Preload videos using PreloadJS
    const preload = new createjs.LoadQueue();

    // Define the video paths for preloading
    const videoPaths = videoArray.map(path => ({ src: path, type: createjs.Types.VIDEO }));

    preload.loadManifest(videoPaths);

    preload.on('fileload', function (event) {
        // Handle preloaded video element
        const preloadedVideo = event.result;
        // You can use the preloadedVideo element in your application as needed
    });

    function playVideoByIndex(index) {
        videoElement.pause();
        videoElement.src = videoArray[index];
        videoElement.currentTime = audioPlayer.currentTime;

        // ... Other video handling code ...

        currentVideoIndex = index;
    }

    function startAudio() {
        // Start the background audio
        backgroundAudio.play().catch(error => {
            console.error('Audio playback error:', error.message);
        });

        audioStarted = true;
    }

    document.addEventListener('click', () => {
        if (!audioStarted) {
            startAudio();
        }

        const nextIndex = (currentVideoIndex + 1) % videoArray.length;
        playVideoByIndex(nextIndex);

        // ... The rest of your code ...
    });
});
