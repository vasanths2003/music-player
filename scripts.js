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
    { src: '.git/music/song1.mp3', title: 'vikram', artist: 'Anirudh', art: '.git/images/vik.jpeg' },
    { src: '.git/music/song2.mp3', title: 'Leo', artist: 'Anirudh', art: '.git/images/vijay.jpeg' },
    { src: '.git/music/song3.mp3', title: 'Avesham', artist: 'Sushin ', art: '.git/images/avesham.jpg' },
    { src: '.git/music/song4.mp3', title: 'Premalu', artist: 'Vishnu', art: '.git/images/premalu.jpg' },
    { src: '.git/music/song5.mp3', title: 'Star', artist: 'U1', art: '.git/images/Star.jpeg' },
    { src: '.git/music/song6.mp3', title: 'PS2', artist: 'AR Rahman', art: '.git/images/ps2.jpg' },
    { src: '.git/music/song7.mp3', title: 'Sita Ramam', artist: 'Vishal ', art: '.git/images/sr.jpg' },
    { src: '.git/music/song8.mp3', title: 'Kgf2', artist: 'Ravi Basrur', art: '.git/images/kgf2.jpg' },
    { src: '.git/music/song9.mp3', title: 'PT Sir', artist: 'Hiphop', art: '.git/images/pt.jpg' },
    { src: '.git/music/song10.mp3', title: 'Indian2', artist: 'Anirudh', art: '.git/images/indian2.jpeg' }
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
