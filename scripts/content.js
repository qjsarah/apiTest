
const baseUrl = 'https://api.jikan.moe/v4';

// Fetch popular manga
async function fetchPopularManga() {
    const res = await fetch(`${baseUrl}/top/manga`);
    const data = await res.json();
    return data.data; // Array of manga
}

// Fetch latest manga updates
async function fetchLatestManga() {
  const res = await fetch(`${baseUrl}/manga?status=publishing`);
  const data = await res.json();
  return data.data;
}

// Fetch manga by genre (genreId is a number, e.g. 1 for Action)
async function fetchMangaByGenre(genreId) {
    const res = await fetch(`${baseUrl}/manga?genres=${genreId}&order_by=members&sort=desc`);
    const data = await res.json();
    return data.data;
}

async function owlCarousel() {
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        rtl: false,
        loop:true,
        margin:10,
        smartSpeed: 800,
        autoplay:true,
        autoplayTimeout:1500,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },            
            960:{
                items:5
            },
            1200:{
                items:6
            }
        }
    });
    owl.on('mousewheel', '.owl-stage', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const d = e.originalEvent.deltaY;
        if (d > 0) {
            $(this).closest('.owl-carousel').trigger('next.owl.carousel');
        } else {
            $(this).closest('.owl-carousel').trigger('prev.owl.carousel');
        }
    });
}

//display content in the popular manga section
const popularDiv = document.getElementById('popular-manga');
fetchPopularManga().then(mangaList => {
    popularDiv.innerHTML = `
        <div class="owl-carousel owl-theme">
            ${mangaList.slice(0, 20).map(manga => `
                <div class="item d-flex flex-column">
                    <a href="${manga.url}" target="_blank"><img src="${manga.images.jpg.image_url}" class="rounded-end-4" alt="${manga.title}" style="width: 150px;"></a>
                    <p class="fw-bold text-start">${manga.title}</p>
                </div>
            `).join('')}
        </div>
    `;
    owlCarousel();
});

//display content in the latest manga section
const latestDiv = document.getElementById('latest-manga');
fetchLatestManga().then(mangaList => {
    latestDiv.innerHTML = `
        <div class="owl-carousel owl-theme">
            ${mangaList.slice(0, 10).map(manga => `
                <div class="item">
                    <a href="${manga.url}" target="_blank"><img src="${manga.images.jpg.image_url}" class="rounded-end-4" alt="${manga.title}" style="width: 150px;"></a>
                    <p class="fw-bold text-start">${manga.title}</p>
                </div>
            `).join('')}
        </div>
    `;
    owlCarousel();
});

// GENRE LIST
const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Adventure' },
  { id: 4, name: 'Comedy' },
  { id: 7, name: 'Mystery' },
  { id: 10, name: 'Fantasy' },
  { id: 36, name: 'Slice of Life' },
];  
const genreListDiv = document.getElementById('genre-list');
const genreMangaDiv = document.getElementById('genre-manga');

genreListDiv.innerHTML = genres.map(genre => `
    <button class="btn mb-2 form-control btn-outline-secondary py-3 rounded-end-5" onclick="loadGenreManga(${genre.id})" >${genre.name}</button>`).join('');
//CHANGE BUTTON THEME
function updateGenreButtonTheme(theme) {
  const genreButton = document.querySelectorAll('#genre-list .btn');
  genreButton.forEach(btn => {
    if (theme === 'dark'){
      btn.classList.add('btn-outline-light');
      btn.classList.remove('btn-outline-dark');
    } else {
      btn.classList.add('btn-outline-dark');
      btn.classList.remove('btn-outline-light');
    }
  })
};
const currentTheme = document.documentElement.getAttribute('data-bs-theme');
updateGenreButtonTheme(currentTheme);

async function loadGenreManga(genreId) {
    const mangaList = await fetchMangaByGenre(genreId);
    genreMangaDiv.innerHTML = `
      <div class="text-center my-3">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `;
    genreMangaDiv.innerHTML = `
        <h3>Manga in ${genres.find(g => g.id === genreId).name} Genre</h3>
        <div class="">
            ${mangaList.slice(10, 20).map(manga => `
                <div class="item">
                    <a href="${manga.url}" target="_blank"><img src="${manga.images.jpg.image_url}" class="rounded-end-4" alt="${manga.title}" style="width: 150px;"></a>
                    <p class="fw-bold text-start">${manga.title}</p>
                </div>
            `).join('')}
        </div>
    `;
}
