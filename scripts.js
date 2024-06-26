const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const volumeControl = document.getElementById('volume-control');
const trackArt = document.getElementById('track-art');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');

const audio = new Audio();
let isPlaying = false;
let currentTrack = 0;

const tracks = [
    { src: 'music/song1.mp3', title: 'vikram', artist: 'Anirudh', art: 'images/vik.jpeg' },
    { src: 'music/song2.mp3', title: 'Leo', artist: 'Anirudh', art: 'images/vijay.jpeg' },
    { src: 'music/song3.mp3', title: 'Avesham', artist: 'Sushin ', art: 'images/avesham.jpg' },
    { src: 'music/song4.mp3', title: 'Premalu', artist: 'Vishnu', art: 'images/premalu.jpg' },
    { src: 'music/song5.mp3', title: 'Star', artist: 'U1', art: 'images/Star.jpeg' },
    { src: 'music/song6.mp3', title: 'PS2', artist: 'AR Rahman', art: 'images/ps2.jpg' },
    { src: 'music/song7.mp3', title: 'Sita Ramam', artist: 'Vishal ', art: 'images/sr.jpg' },
    { src: 'music/song8.mp3', title: 'Kgf2', artist: 'Ravi Basrur', art: 'images/kgf2.jpg' },
    { src: 'music/song9.mp3', title: 'PT Sir', artist: 'Hiphop', art: 'images/pt.jpg' },
    { src: 'music/song10.mp3', title: 'Indian2', artist: 'Anirudh', art: 'images/indian2.jpeg' }
];

function loadTrack(trackIndex) {
    audio.src = tracks[trackIndex].src;
    trackTitle.textContent = tracks[trackIndex].title;
    trackArtist.textContent = tracks[trackIndex].artist;
    trackArt.src = tracks[trackIndex].art;
    audio.load(); // Ensure the new source is loaded
    console.log(`Loaded track: ${tracks[trackIndex].title}`);
}

loadTrack(currentTrack);

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.classList.replace('fa-pause', 'fa-play');
    } else {
        audio.play();
        playPauseBtn.classList.replace('fa-play', 'fa-pause');
    }
    isPlaying = !isPlaying;
});

prevBtn.addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    if (isPlaying) audio.play();
});

nextBtn.addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    if (isPlaying) audio.play();
});

audio.addEventListener('timeupdate', () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
});

progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

audio.addEventListener('canplaythrough', () => {
    console.log('Audio can play through');
});

audio.addEventListener('error', (e) => {
    console.error('Error loading audio', e);
});
