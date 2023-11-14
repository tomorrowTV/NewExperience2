document.addEventListener('DOMContentLoaded', function () {
    const videoPlayerContainer = document.getElementById('videoPlayerContainer');
    const loadingBar = document.getElementById('loadingBar');
    const loadingText = document.getElementById('loadingText');

    let currentVideoIndex = 0;
    let audioPlaying = false;
    let audioStartTime = 0;
    let loadingMusicInstance;

    const preloadedVideos = [];

    // Define assets to preload
    const assetsToLoad = [
        { id: "loadingMusic", src: "wwwroot/assets/LoadingMusic.m4a" },
        'wwwroot/assets/CowboyHead.gif',
        'wwwroot/assets/Song.m4a',
        'wwwroot/videos/SW1.mp4',
        'wwwroot/videos/SW2.mp4',
        'wwwroot/videos/SW3.mp4',
        'wwwroot/videos/SW4.mp4',
        'wwwroot/videos/SW5.mp4',
        'wwwroot/videos/SW6.mp4',
        // Add more assets as needed
    ];

    const preload = new createjs.LoadQueue();
    preload.setMaxConnections(5);

    // Preload assets with progress tracking
    preload.loadManifest(assetsToLoad);

    // Add an event listener for when each asset is loaded
    preload.on('fileload', function (event) {
        const asset = event.item.src;

        if (asset.endsWith('.mp4')) {
            const videoElement = document.createElement('video');
            videoElement.src = asset;
            videoElement.preload = 'auto';
            videoElement.setAttribute('playsinline', '');
            preloadedVideos.push(videoElement);
        }

        if (asset === 'wwwroot/assets/LoadingMusic.m4a') {
            // Play the "loadingMusic" audio when it's loaded
            loadingMusicInstance = createjs.Sound.createInstance("loadingMusic");
            loadingMusicInstance.play();
        }

        if (preloadedVideos.length === assetsToLoad.length - 2) {
            // All videos are preloaded, hide loading bar and start the game
            loadingBar.style.display = 'none';
            startGame();
        }
    });

    // Function to play video by index
    function playVideoByIndex(index) {
        const newVideo = preloadedVideos[index];
        videoPlayerContainer.innerHTML = ''; // Clear container
        videoPlayerContainer.appendChild(newVideo);

        // Add the 'playsinline' attribute for mobile devices
        newVideo.setAttribute('playsinline', '');

        // Set the current time in the video to match the audio start time
        newVideo.currentTime = audioStartTime;

        // Play the video
        newVideo.play().catch(error => {
            console.error('Video playback error:', error.message);
        });
    }

    // Function to start the game
    function startGame() {
        // Start with the first video in the array
        playVideoByIndex(0);

        // Change loading text to "Click" when the game starts
        loadingText.textContent = 'Click';

        // Add an event listener for user clicks to switch videos
        document.addEventListener('click', function () {
            // Set the audio start time to match the current time in the current video
            audioStartTime = preloadedVideos[currentVideoIndex].currentTime;

            // Switch to the next video
            currentVideoIndex = (currentVideoIndex + 1) % preloadedVideos.length;
            playVideoByIndex(currentVideoIndex);

            // Stop the "loadingMusic" audio when the first click occurs
            if (!audioPlaying) {
                loadingMusicInstance.stop();
                audioPlaying = true;
            }
        });
    }
});
