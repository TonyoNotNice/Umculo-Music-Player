//Dark/Light Theme Toggle
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
});

// Carousel (next/prev for movie cards)
const carousel = document.getElementById("movieCarousel");
const nextCarouselBtn = document.querySelector(".next");
const prevCarouselBtn = document.querySelector(".prev");

let offset = 0;
const cardWidth = 220;

function updateCarousel() {
  carousel.style.transition = "transform 0.6s ease";
  carousel.style.transform = `translateX(${offset}px)`;
}

// Next slide function
function nextSlide() {
  if (Math.abs(offset) >= carousel.scrollWidth - carousel.clientWidth) {
    offset = 0; // Restart from beginning
  } else {
    offset -= cardWidth;
  }
  updateCarousel();
}

// Previous slide function
function prevSlide() {
  if (offset >= 0) {
    offset = -(carousel.scrollWidth - carousel.clientWidth - cardWidth);
  } else {
    offset += cardWidth;
  }
  updateCarousel();
}

// Button events
nextCarouselBtn.addEventListener("click", nextSlide);
prevCarouselBtn.addEventListener("click", prevSlide);

// ✅ Auto slide every 2 seconds
let autoSlide = setInterval(nextSlide, 2000);

// Optional: Pause auto-slide on mouse hover
carousel.addEventListener("mouseenter", () => clearInterval(autoSlide));
carousel.addEventListener("mouseleave", () => {
  autoSlide = setInterval(nextSlide, 2000);
});

// 🎵 Audio Player
const playBtn = document.querySelector('.master_play .bi-play-circle-fill');
const prevSongBtn = document.querySelector('.master_play .bi-skip-start-fill');
const nextSongBtn = document.querySelector('.master_play .bi-skip-end-fill');
const progressBar = document.querySelector('.master_play input[type="range"]');
const songImg = document.querySelector('.bottom_album_art');
const songTitle = document.querySelector('.song_info_text h5');
const songArtist = document.querySelector('.song_info_text p');

const songs = [
  { title: "Grateful", artist: "Oscar Mbo", img: "img/common_song/Oscar-Mbo2.webp", audio: "audio/oscar-mbo-grateful-feat-sgvo-seko.mp3"},
  { title: "Bazamile", artist: "Soul Keys", img: "img/common_song/unnamed.jpg", audio: "audio/bazamile.mp3"},
  { title: "Undefined", artist: "Kid Fonque", img: "img/common_song/kid_fonque.jpg", audio: "audio/mdu-aka-trp-bd3-in2jazz.mp3" },
  { title: "Show my love", artist: "Mr Shane SA", img: "img/common_song/Mr_Shane_SA.webp", audio: "audio/show-my-love.mp3" },
  { title: "Sunzet", artist: "Desiree", img: "img/common_song/Desiree.jpg", audio: "audio/mdu-aka-trp-bd3-in2jazz.mp3"}
];

let audio = new Audio();
let currentIndex = 0;

function loadSong(index) {
  const song = songs[index];
  audio.src = song.audio;
  songImg.src = song.img;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  progressBar.value = 0;
}

loadSong(currentIndex);

// Play / Pause
playBtn.addEventListener('click', () => {
  if(audio.paused) {
    audio.play();
    playBtn.classList.replace('bi-play-circle-fill', 'bi-pause-circle-fill');
  } else {
    audio.pause();
    playBtn.classList.replace('bi-pause-circle-fill', 'bi-play-circle-fill');
  }
});

// Next / Previous Song
nextSongBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  audio.play();
  playBtn.classList.replace('bi-play-circle-fill', 'bi-pause-circle-fill');
});

prevSongBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  audio.play();
  playBtn.classList.replace('bi-play-circle-fill', 'bi-pause-circle-fill');
});

// Update progress
audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progressPercent || 0;
});

// Seek functionality
progressBar.addEventListener('input', () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Auto next song
audio.addEventListener('ended', () => {
  nextSongBtn.click();
});