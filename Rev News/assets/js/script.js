// JSON Server API URL
const API_URL = 'http://localhost:3000';
const NEWSAPI_URL = 'https://gnews.io/api/v4/top-headlines?max=20&lang=en&apikey=5b1783d718478d2f477e54c462bd460f';

function showLoginForm() {
    document.getElementById("profileInfo").style.display = "none";
    document.getElementById("header").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registrationForm").style.display = "none";
    document.getElementById("newsContainer").style.display = "none";
}

function showRegistrationForm() {
    document.getElementById("header").style.display = "none";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registrationForm").style.display = "block";
    document.getElementById("newsContainer").style.display = "none";
    document.getElementById("profileInfo").style.display = "none";
}

let currentUser = null;

async function login(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const loginData = {
        username,
        password
    };

    try {
        const response = await fetch(`${API_URL}/users?username=${username}&password=${password}`);
        const data = await response.json();
        console.log(data);
        if (data.length > 0) {
            currentUser = data[0];
            const country = currentUser.country;
            document.querySelector(".profile-icon-btn").style.display = "inline-block";
            localStorage.setItem("userInformation", JSON.stringify(data));
            showNewsContainer();
            fetchNews('general', country);
        } else {
            alert('Invalid credentials. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login. Please try again later.');
    }
}


async function register(event) {
    event.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const email = document.getElementById('regEmail').value;
    const phone_number = document.getElementById('regPhoneNumber').value;
    const country = document.getElementById('regCountry').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    const registrationData = {
        username,
        email,
        phone_number,
        country,
        password
    };

    try {
        
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        });
        await response.json();
        alert('Registration successful! Please login.');
        showLoginForm();
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration. Please try again later.');
    }
}


const categoryDropdown = document.getElementById('categoryDropdown');
categoryDropdown.addEventListener('change', function() {
    const selectedCategory = categoryDropdown.value;
    const country = currentUser.country;;
    fetchNews(selectedCategory, country);
});
function toggleProfile() {
    var profileInfo = document.getElementById('profileInfo');
    if (profileInfo.style.display === 'none') {
      profileData();
      profileInformation();
    } else {
      profileInfo.style.display = 'none';
    }
  }

  function profileInformation() {
    document.getElementById("header").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registrationForm").style.display = "none";
    document.getElementById("newsContainer").style.display = "none";
    document.getElementById("profileInfo").style.display = "block";
}

function profileData() {
  if (currentUser && currentUser.username) {
    // Update the profile information in the HTML
    document.getElementById("username").innerText = currentUser.username;
    document.getElementById("email").innerText = currentUser.email;
    document.getElementById("country").innerText = currentUser.country;
    document.getElementById("phoneNumber").innerText = currentUser.phone_number;
  } else {
    console.error("Failed to retrieve profile data.");
  }
}

// function togglePhoneNumber() {
//     var phoneNumberContainer = document.getElementById("phoneNumberContainer");

//     if (phoneNumberContainer.style.display === "none") {
//         phoneNumberContainer.style.display = "block";
//     } else {
//         phoneNumberContainer.style.display = "none";
//     }
// }
// Get the cancel button element
var cancelButton = document.getElementById("cancelButton");

// Add click event listener to the cancel button
cancelButton.addEventListener("click", function() {
  // Hide the profile container
  var profileContainer = document.getElementById("profileContainer");
  profileInfo.style.display = "none";

  // Show the news container
  document.getElementById("newsContainer").style.display = "block";
});


async function fetchNews(category, country) {
    try {
        const url = `${NEWSAPI_URL}&category=${category}&country=${country}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log('API response:', data);

        if (data.articles && Array.isArray(data.articles)) {
            displayNews(data.articles);
        } else {
            console.error('Invalid data format:', data);
            alert('An error occurred while fetching news. Please try again later.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching news. Please try again later.');
    }
}


function displayNews(news) {
    const newsContainer = document.getElementById('newsList');
  
    if (Array.isArray(news)) {
        newsContainer.innerHTML = '';

        const row = document.createElement('div');
        row.classList.add('row');
        news.forEach((article) => {
            const col = document.createElement('div');
            col.classList.add('col-lg-4', 'mb-4');
        
            const newsArticle = document.createElement('div');
            newsArticle.classList.add('card');
        
            const image = document.createElement('img');
            image.src = article.image;
            image.alt = article.title;
            image.classList.add('card-img-top');
            image.style.width = '100%';
            image.style.height = '200px';
        
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body', 'equal-height');
        
            const title = document.createElement('h5');
            title.classList.add('card-title');
            title.innerText = article.title;
        
            const description = document.createElement('p');
            description.classList.add('card-text', 'description');
            description.innerText = article.description;
        
            const buttonContainer = document.createElement('div');
            buttonContainer.style.display = 'flex';
            buttonContainer.style.justifyContent = 'space-between';
        
            const readMoreButton = document.createElement('a');
            readMoreButton.href = article.url;
            readMoreButton.target = '_blank';
            readMoreButton.classList.add('btn', 'btn-primary', 'read-more-btn');
            readMoreButton.innerText = 'Read More';
        
            const saveButton = document.createElement('button');
            saveButton.classList.add('btn', 'btn-primary', 'save-btn');
            saveButton.innerText = 'Save';
            saveButton.addEventListener('click', () => {
                saveArticle(article);
            });
        
            buttonContainer.appendChild(readMoreButton);
            buttonContainer.appendChild(saveButton);
        
            cardBody.appendChild(title);
            cardBody.appendChild(description);
            cardBody.appendChild(buttonContainer);
            newsArticle.appendChild(image);
            newsArticle.appendChild(cardBody);
            col.appendChild(newsArticle);
            row.appendChild(col);
        });
        
        newsContainer.appendChild(row);
        
        
        
            } else {
        console.error('Invalid news data. Expected an array.');
    }
}


function showNewsContainer() {
    document.getElementById("header").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registrationForm").style.display = "none";
    document.getElementById("newsContainer").style.display = "block";
    document.getElementById("profileInfo").style.display = "none";
}

// Initial setup
showLoginForm();
// showNewsContainer();


function logout() {
    document.getElementById("header").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registrationForm").style.display = "none";
    document.getElementById("newsContainer").style.display = "none";
}


// Save article to JSON Server
async function saveArticle(article) {
    try {
        const response = await fetch(`${API_URL}/savedArticles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(article)
        });
        await response.json();
        alert('Article saved successfully!');
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while saving the article. Please try again later.');
    }
}




const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function() {
  searchContent(searchInput.value);
});


function searchContent(keyword) {
    const newsArticles = Array.from(document.getElementsByClassName('col-lg-4'));
    newsArticles.forEach(function(article) {
      const title = article.querySelector('.card-title').innerText;
      const description = article.querySelector('.description').innerText;
      
      if (title.toLowerCase().includes(keyword.toLowerCase()) || description.toLowerCase().includes(keyword.toLowerCase())) {
        article.style.display = 'block';
      } else {
        article.style.display = 'none';
      }
    });
  }

  