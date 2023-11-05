document.addEventListener('DOMContentLoaded', function () {
    const videoPlayerContainer = document.getElementById('videoPlayerContainer');
    const audioPlayer = document.createElement('audio');
    audioPlayer.src = 'wwwroot/assets/Song.m4a'; // Update this to the relative path of your audio file
    audioPlayer.preload = 'auto';
    audioPlayer.load();
    document.body.appendChild(audioPlayer);

    let currentVideoIndex = 0;
    let preloadedVideoIndex = 1;
    let isPlaying = false;

    const videoArray = [
        'wwwroot/videos/SW1.mp4',
        'wwwroot/videos/SW2.mp4',
        'wwwroot/videos/SW3.mp4',
        'wwwroot/videos/SW4.mp4',
        'wwwroot/videos/SW5.mp4',
        'wwwroot/videos/SW6.mp4',
        // Add more video filenames as needed
    ];

    let videoElement = document.createElement('video');
    videoElement.id = 'videoPlayer';
    videoElement.controls = true;
    videoElement.setAttribute('playsinline', '');
    videoElement.preload = 'auto';
    videoElement.muted = true; // Mute the video initially

    videoElement.addEventListener('timeupdate', () => {
        if (!audioPlayer.paused && !isPlaying) {
            videoElement.muted = false; // Unmute when audio is playing
            isPlaying = true;
        }
    });

    videoPlayerContainer.appendChild(videoElement);

    function playVideoByIndex(index) {
        videoElement.pause();
        videoElement.src = videoArray[index];
        videoElement.currentTime = audioPlayer.currentTime;

        videoElement.addEventListener('ended', () => {
            videoElement.currentTime = 0;
            videoElement.play();
        });

        currentVideoIndex = index;
    }

    function startAudio() {
        audioPlayer.load();
        audioPlayer.play().catch(error => {
            console.error('Audio playback error:', error.message);
        });
    }

    preloadNextVideo();

    document.addEventListener('click', () => {
        if (!audioPlayer.paused) {
            if (!isPlaying) {
                startAudio();
            }

            const nextIndex = (currentVideoIndex + 1) % videoArray.length;
            playVideoByIndex(nextIndex);

            preloadNextVideo();
        }
    });

    function preloadNextVideo() {
        if (preloadedVideoIndex < videoArray.length) {
            const preloadVideo = document.createElement('video');
            preloadVideo.src = videoArray[preloadedVideoIndex];
            preloadVideo.preload = 'auto';
            preloadVideo.muted = true;
            preloadVideo.onloadeddata = () => {
                preloadedVideoIndex++;
                preloadNextVideo();
            };
        }
    }
});
