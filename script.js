// ====== Video Data ======
const videolist = [
  { title: "Learning JavaScript in 30 Minutes", channel: "Code Academy", views: "1M views", duration: "30:00", category: "Web Development", thumbnail: "https://img.youtube.com/vi/PkZNo7MFNFg/0.jpg", youtubeLink: "https://www.youtube.com/watch?v=PkZNo7MFNFg" },
  { title: "React in 1 Hour", channel: "Bro Code", views: "2M views", duration: "60:00", category: "AI", thumbnail: "https://img.youtube.com/vi/bMknfKXIFA8/0.jpg", youtubeLink: "https://www.youtube.com/watch?v=bMknfKXIFA8" },
  { title: "Python Full Course", channel: "freeCodeCamp", views: "5M views", duration: "1:20:00", category: "AI", thumbnail: "https://img.youtube.com/vi/rfscVS0vtbw/0.jpg", youtubeLink: "https://www.youtube.com/watch?v=rfscVS0vtbw" },
  { title: "Build Website with HTML CSS", channel: "Programming with Mosh", views: "3M views", duration: "30:00", category: "Web Development", thumbnail: "https://img.youtube.com/vi/qz0aGYrrlhU/0.jpg", youtubeLink: "https://www.youtube.com/watch?v=qz0aGYrrlhU" },
  { title: "JavaScript Tutorial for Beginners", channel: "Traversy Media", views: "1.5M views", duration: "45:00", category: "Web Development", thumbnail: "https://img.youtube.com/vi/W6NZfCO5SIk/0.jpg", youtubeLink: "https://www.youtube.com/watch?v=W6NZfCO5SIk" },
  { title: "AI with Python", channel: "freeCodeCamp", views: "3M views", duration: "1:10:00", category: "AI", thumbnail: "https://img.youtube.com/vi/aircAruvnKk/0.jpg", youtubeLink: "https://www.youtube.com/watch?v=aircAruvnKk" }
];

// ====== Variables ======
const videosContainer = document.querySelector(".videos");
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const searchInput = document.getElementById("searchInput");
const darkModeBtn = document.getElementById("darkModeBtn");
const categories = document.querySelectorAll(".categories span");
const modal = document.getElementById("videoModal");
const player = document.getElementById("videoPlayer");
const closeBtn = document.getElementById("closeVideo");

let startIndex = 0;
const batchSize = 4;
let currentList = [...videolist];

// ====== Functions ======
function renderVideos(videos, append=false) {
  if (!append) videosContainer.innerHTML = "";
  videos.forEach(video => {
    const card = document.createElement("div");
    card.classList.add("video-card");
    card.innerHTML = `
      <div class="thumbnail-container">
        <img src="${video.thumbnail}" class="thumbnail">
        <span class="duration">${video.duration}</span>
      </div>
      <div class="video-info">
        <img src="https://i.pravatar.cc/40" class="channel-icon">
        <div class="video-text">
          <h4>${video.title}</h4>
          <p>${video.channel} • ${video.views}</p>
        </div>
      </div>
    `;
    card.addEventListener("click", () => {
      const videoId = video.youtubeLink.split("v=")[1];
      player.src = `https://www.youtube.com/embed/${videoId}`;
      modal.style.display = "flex";
    });
    videosContainer.appendChild(card);
  });
}

function loadNextVideos() {
  if (startIndex >= currentList.length) {
    if (!document.getElementById("endMessage")) {
      const msg = document.createElement("p");
      msg.id = "endMessage";
      msg.textContent = "No more videos to load!";
      msg.style.textAlign = "center";
      msg.style.margin = "20px";
      msg.style.color = "gray";
      videosContainer.appendChild(msg);
    }
    return;
  }
  const nextVideos = currentList.slice(startIndex, startIndex + batchSize);
  renderVideos(nextVideos, true);
  startIndex += batchSize;
}

function resetAndLoad(newList) {
  currentList = [...newList];
  startIndex = 0;
  const endMsg = document.getElementById("endMessage");
  if (endMsg) endMsg.remove();
  loadNextVideos();
}

// ====== Event Listeners ======
menuBtn.addEventListener("click", () => { sidebar.classList.toggle("sidebar-hidden"); });

searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();
  const filtered = currentList.filter(video => video.title.toLowerCase().includes(searchText));
  resetAndLoad(filtered);
});

darkModeBtn.addEventListener("click", () => { document.body.classList.toggle("dark-mode"); });

categories.forEach(cat => {
  cat.addEventListener("click", () => {
    categories.forEach(c => c.classList.remove("active"));
    cat.classList.add("active");
    const selected = cat.textContent;
    const filtered = selected === "All" ? videolist : videolist.filter(video => video.category === selected);
    searchInput.value = "";
    resetAndLoad(filtered);
  });
});

closeBtn.addEventListener("click", () => { modal.style.display = "none"; player.src = ""; });

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 100) loadNextVideos();
});

// ====== Initial Load ======
loadNextVideos();