document.addEventListener('DOMContentLoaded', function () {
    const videoPlayerContainer = document.getElementById('videoPlayerContainer');
    const videoArray = [
        'wwwroot/videos/SW1.mp4',
        'wwwroot/videos/SW2.mp4',
        'wwwroot/videos/SW3.mp4',
        'wwwroot/videos/SW4.mp4',
        'wwwroot/videos/SW5.mp4',
        'wwwroot/videos/SW6.mp4',
        // Add more video filenames as needed
    ];

    const audioPlayer = document.createElement('audio');
    audioPlayer.src = 'wwwroot/assets/Song.m4a'; // Update this to the relative path of your audio file
    audioPlayer.preload = 'auto';
    audioPlayer.load();
    document.body.appendChild(audioPlayer);

    let currentVideoIndex = 0;
    let videoElement = document.createElement('video');
    videoElement.id = 'videoPlayer';
    videoElement.controls = true;
    videoElement.setAttribute('playsinline', '');
    videoElement.preload = 'auto';
    videoElement.src = videoArray[currentVideoIndex];

    videoElement.addEventListener('ended', () => {
        currentVideoIndex = (currentVideoIndex + 1) % videoArray.length;
        videoElement.src = videoArray[currentVideoIndex];
        videoElement.currentTime = 0;
        videoElement.play();
    });

    videoPlayerContainer.appendChild(videoElement);

    document.addEventListener('click', () => {
        if (!audioPlayer.paused) {
            audioPlayer.play().catch(error => {
                console.error('Audio playback error:', error.message);
            });
        }
    });
});
