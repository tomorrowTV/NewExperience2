document.addEventListener('DOMContentLoaded', function () {
    const videoPlayerContainer = document.getElementById('videoPlayerContainer');
    let currentVideo; // Declare currentVideo variable
    let currentVideoIndex = 0; // Keep track of the current video index
    let videoArray = []; // Define the videoArray with the video elements

    // Create video elements for the videoArray
    const videoPaths = [
        'wwwroot/videos/SW1.mp4',
        'wwwroot/videos/SW2.mp4',
        'wwwroot/videos/SW3.mp4',
        'wwwroot/videos/SW4.mp4',
        'wwwroot/videos/SW5.mp4',
        'wwwroot/videos/SW6.mp4',
        // Add more video filenames as needed
    ];

    // Preload all videos in advance and add playsinline attribute
    videoPaths.forEach(videoPath => {
        const video = document.createElement('video');
        video.src = videoPath;
        video.preload = 'auto';
        video.setAttribute('playsinline', 'playsinline');
        videoArray.push(video);
    });

    // Create an audio element for the background audio
    const backgroundAudio = document.createElement('audio');
    backgroundAudio.src = 'wwwroot/assets/Song.m4a'; // Update this to the relative path of your audio file
    backgroundAudio.preload = 'auto';
    backgroundAudio.loop = true; // Set the loop attribute to true for continuous playback

    // Function to play video by index
    function playVideoByIndex(index, time = 0) {
        const newVideo = videoArray[index];

        if (currentVideo) {
            // Pause the current video
            currentVideo.pause();
            videoPlayerContainer.removeChild(currentVideo);
        }

        // Use the preloaded video element for the new video
        videoPlayerContainer.appendChild(newVideo);
        newVideo.currentTime = time;

        // Update the reference to the current video element
        currentVideo = newVideo;

        // Start playback
        currentVideo.play().catch(error => {
            console.error('Video playback error:', error.message);
        });

        // Update the current video index
        currentVideoIndex = index;
    }

    // Add a click event listener to play audio and video on user interaction
    let audioPlaying = false;

    document.addEventListener('click', () => {
        if (!audioPlaying) {
            backgroundAudio.play().catch(error => {
                console.error('Audio playback error:', error.message);
            });
            audioPlaying = true;
        }

        // Start with the first video in the array and synchronize its time with audio
        playVideoByIndex(0, backgroundAudio.currentTime);
    });
});
