<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">
<head>
  <meta charset="UTF-8">
  <title>Manga Info Search</title>
  <link rel="stylesheet" href="main.css">
  <script src="bootstrap.bundle.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
  <link rel="stylesheet" href="node_modules/owl.carousel/dist/assets/owl.carousel.min.css" />
</head>

<body>
  <div class="container mt-3 w-100 d-flex justify-content-between align-items-center">
    <h3>MangaVerse</h3>
    <div class="d-flex float-end">
      <input type="text" id="title" placeholder="Enter manga title" class="form-control">
      <button onclick="fetchManga()" class="btn btn-dark" data-toggle="modal" data-target="results">Search</button>
      <div>
      <button id="themeToggle" class="btn ">
      <span id="themeIcon"><i class="fa-solid fa-sun"></i></span>
    </div>
    </div>
  </div>

    <div id="results" class="modal fade mt-3 w-100" role="dialog"></div>

    <?php include 'content.php'; ?>
</body>

  <script src="node_modules/jquery/dist/jquery.js"></script>
  <script src="node_modules/owl.carousel/dist/owl.carousel.min.js"></script>
  <script src="scripts/api.js"></script>
  <script src="scripts/main.js"></script>
  <script src="scripts/content.js"></script>
</html>