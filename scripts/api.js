async function fetchManga() {
      const title = document.getElementById('title').value.trim();
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '';

      if (!title) {
        alert('Please enter a manga title.');
        return;
      }

      try {
        // Search for manga by title
        const searchRes = await fetch(`https://api.jikan.moe/v4/manga?q=${title}`);
        const searchData = await searchRes.json();

        if (!searchData.data || searchData.data.length === 0) {
          resultsDiv.innerText = 'No manga found.';
          return;
        }

        const manga = searchData.data[0]; // First result
        const mangaId = manga.mal_id;

        // Get detailed manga info by ID
        const mangaRes = await fetch(`https://api.jikan.moe/v4/manga/${mangaId}`);
        const charResponse = await fetch(`https://api.jikan.moe/v4/manga/${mangaId}/characters`);
        const mangaData = await mangaRes.json();
        const charData = await charResponse.json();


        const info = mangaData.data;

        // Display manga info
        resultsDiv.innerHTML = `
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h3>${info.title}</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="d-flex gap-3 flex-column flex-lg-row align-items-center justify-content-center container float-center modal-body flex-wrap">
                <a href="${info.url}" target="_blank">
                  <img src="${info.images.jpg.image_url}" alt="${info.title}" class="img-fluid" width="200">
                </a>
                <div>
                  <p>${info.synopsis ? info.synopsis.slice(0, 250) + (info.synopsis.length > 300 ? '...' : '') : 'No synopsis available.'} <a href="${info.url}" target="_blank" class="nav-link"><u>read more.</u></a></p>
                </div>
              </div>
              <div class="mt-3 container">
                <h4>Main Character/s</h4>
                <div class="characterDetails d-flex gap-1 flex-wrap"></div>
              </div>
            </div>
          </div>
        `;
        const characterDetailsDiv = resultsDiv.querySelector('.characterDetails');
        charData.data
          .filter(character => character.role === "Main")
          .forEach(character => {
            characterDetailsDiv.innerHTML += `
            <div class="character">
              <img src="${character.character.images.jpg.image_url}" alt="${character.character.name}" width="100"><br>
              <a href="${character.character.url}" target="_blank" class="nav-link">${character.character.name}</a>
            </div>
            `;
          });
        const modal = new bootstrap.Modal(resultsDiv);
        modal.show();
      } catch (error) {
        console.error('Error:', error);
        resultsDiv.innerText = 'Error fetching manga data. Check the console.';
      }
    }