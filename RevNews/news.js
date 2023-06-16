

// get the elements from the HTML file
const general = document.getElementById("general");
const business = document.getElementById("business");
const sports = document.getElementById("sports");
const technology = document.getElementById("technology");
const entertainment = document.getElementById("entertainment");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");
const newsQuery = document.getElementById("newsQuery");
const searchBtn = document.getElementById("searchBtn");


function fetchNews(category) {
  newsdetails.innerHTML = "";
  fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=d6d78a72ad8e4504a0d049ca6f63b8a8`)
    .then((response) => response.json()) 
    .then((data) => {
      for (let article of data.articles) {
        let card = document.createElement("div");
        card.className = "card mb-3";
        card.style.width = "18rem";
        let img = document.createElement("img");
        img.src = article.urlToImage;
        img.className = "card-img-top";
        img.alt = "News Image";
        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
        let title = document.createElement("h5");
        title.className = "card-title";
        title.textContent = article.title;
        let description = document.createElement("p");
        description.className = "card-text";
        description.textContent = article.description;
        let link = document.createElement("a");
        link.href = article.url;
        link.className = "btn btn-primary";
        link.textContent = "Read More";
        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(link);
        card.appendChild(img);
        card.appendChild(cardBody);
        newsdetails.appendChild(card);
      }
    })
    .catch((error) => console.error(error)); 
}

function searchNews(query) {
  newsdetails.innerHTML = "";
  fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=d6d78a72ad8e4504a0d049ca6f63b8a8`)
    .then((response) => response.json())
    .then((data) => {
      for (let article of data.articles) {
        let card = document.createElement("div");
        card.className = "card mb-3";
        card.style.width = "18rem";
        let img = document.createElement("img");
        img.src = article.urlToImage;
        img.className = "card-img-top";
        img.alt = "News Image";
        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
        let title = document.createElement("h5");
        title.className = "card-title";
        title.textContent = article.title;
        let description = document.createElement("p");
        description.className = "card-text";
        description.textContent = article.description;
        let link = document.createElement("a");
        link.href = article.url;
        link.className = "btn btn-primary";
        link.textContent = "Read More";
        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(link);
        card.appendChild(img);
        card.appendChild(cardBody);
       newsdetails.appendChild(card);
      }
    })
    .catch((error) => console.error(error));
}

general.addEventListener("click", () => {
  newsType.textContent = "General News";
  fetchNews("general");
});

business.addEventListener("click", () => {
  newsType.textContent = "Business News";
  fetchNews("business");
});

sports.addEventListener("click", () => {
  newsType.textContent = "Sports News";
  fetchNews("sports");
});

technology.addEventListener("click", () => {
  newsType.textContent = "Technology News";
  fetchNews("technology");
});

entertainment.addEventListener("click", () => {
  newsType.textContent = "Entertainment News";
  fetchNews("entertainment");
});


searchBtn.addEventListener("click", () => {
  let query = newsQuery.value;
  if (query) {
    newsType.textContent = `Search Results for "${query}"`;
    searchNews(query);
    newsQuery.value = "";
  }
});
