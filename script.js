const apiURL = "https://api.lyrics.ovh/";
const form = document.getElementById("form");
const button = document.getElementById("button");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const searchSong = async searchTerm => {
  const res = await fetch(`${apiURL}/suggest/${searchTerm}`);
  const data = await res.json();
  console.log(data);
  showSongs(data);
};
function showSongs(data) {
  let output = "";
  data.data.forEach(
    song =>
      (output += `
  <li class="song-list">
  <a target="artist" href="${song.artist.picture_big}"><img src="${
        song.artist.picture_small
      }"></a>
  <strong>${song.artist.name}</strong> <span class="dash">-</span> 
  <span class="song-name">${song.title}</span>
  <a class="listen" target="song${Math.random()}" href="${
        song.preview
      }">Listen preview</a> 
  <hr>
  </li>
  `)
  );
  result.innerHTML = output;
  if (data.prev || data.next) {
    more.innerHTML = `
    ${
      data.prev
        ? `<button onclick="getMoreSongs('${data.prev}')" class="btn">Prev</button>`
        : ""
    }
    ${
      data.next
        ? `<button onclick="getMoreSongs('${data.next}')" class="btn">Next</button>`
        : ""
    }
    `;
  }
}

async function getMoreSongs(link) {
  console.log("--", link);
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${link}`);
  const data = await res.json();
  console.log(data);
  showSongs(data);
}
form.addEventListener("submit", e => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  if (!searchTerm) {
    alert("please, type something!");
  } else {
    console.log(searchTerm);
    searchSong(searchTerm);
  }
});
