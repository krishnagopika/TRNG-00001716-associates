const genralbutton= document.getElementById("general");
const businessbutton= document.getElementById("business");
const sportsbutton= document.getElementById("sports");
const technologybutton= document.getElementById("technology");
const entertainmentbutton= document.getElementById("entertainment");
const searchbutton= document.getElementById("searchbtn");
const newsQuery= document.getElementById("newsQuery");
const newsType=document.getElementById("newsType");
const newsdetails=document.getElementById("newsdetails")
const welcomeheadbtn=document.getElementById("headlines");


const API_KEY="d0cd7345ed584f2f90865577ed27c479";
const HEADLINES_NEWS="https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const GENERAL_NEWS="https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=";
const BUSINESS_NEWS="https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=";
const SPORTS_NEWS="https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=";
const ENTERTAINMENT_NEWS="https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=";
const TECHNOLOGY_NEWS="https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=";
const SEARCH_NEWS="https://newsapi.org/v2/everything?q=";

window.onload= function(){
    newsType.innerHTML="<h4>News HeadLines</h4>";

    fetchHeadLines();
}


var newsDataArray=[];

welcomeheadbtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>HeadLine News </h4>";
    fetchHeadLines();

});

genralbutton.addEventListener("click",function(){
    newsType.innerHTML="<h4>General News </h4>";
    fetchGeneralNews();

});

businessbutton.addEventListener("click",function(){
    newsType.innerHTML="<h4>Business News </h4>";
    fetchBusinessNews();

});

sportsbutton.addEventListener("click",function(){
    newsType.innerHTML="<h4>Sports News </h4>";
    fetchSportsNews();

});

technologybutton.addEventListener("click",function(){
    newsType.innerHTML="<h4>Technology News </h4>";
    fetchTechnologyNews();

});

entertainmentbutton.addEventListener("click",function(){
    newsType.innerHTML="<h4>Entertainment News </h4>";
    fetchEntertainmentNews();

});

searchbutton.addEventListener("click",function(){
    newsType.innerHTML="<h4>Search :"+newsQuery.value+"</h4>";
    fetchQueryNews();

});

const fetchHeadLines= async()=>{
    const response=await fetch(HEADLINES_NEWS+API_KEY);
    newsDataArray=[];

    if(response.status >=200 && response.status < 300){
        const myJson=await response.json();
        newsDataArray=myJson.articles;
        
    }
    else{
        //handle errors
        console.log(response.status,response.statusText);
    }
    displayNews();
}

const fetchGeneralNews= async()=>{
    const response=await fetch(GENERAL_NEWS+API_KEY);
    newsDataArray=[];

    if(response.status >=200 && response.status < 300){
        const myJson=await response.json();
        newsDataArray=myJson.articles;
    }
    else{
        
        console.log(response.status,response.statusText);
    }
    displayNews();
}

const fetchBusinessNews= async()=>{
    const response=await fetch(BUSINESS_NEWS+API_KEY);
    newsDataArray=[];

    if(response.status >=200 && response.status < 300){
        const myJson=await response.json();
        newsDataArray=myJson.articles;
    }
    else{
        
        console.log(response.status,response.statusText);
    }
    displayNews();
}

const fetchSportsNews= async()=>{
    const response=await fetch(SPORTS_NEWS+API_KEY);
    newsDataArray=[];

    if(response.status >=200 && response.status < 300){
        const myJson=await response.json();
        newsDataArray=myJson.articles;
    }
    else{
        console.log(response.status,response.statusText);
    }
    displayNews();
}

const fetchTechnologyNews= async()=>{
    const response=await fetch(TECHNOLOGY_NEWS+API_KEY);
    newsDataArray=[];

    if(response.status >=200 && response.status < 300){
        const myJson=await response.json();
        newsDataArray=myJson.articles;
    }
    else{
        //handle errors
        console.log(response.status,response.statusText);
    }
    displayNews();
}

const fetchEntertainmentNews= async()=>{
    const response=await fetch(ENTERTAINMENT_NEWS+API_KEY);
    newsDataArray=[];

    if(response.status >=200 && response.status < 300){
        const myJson=await response.json();
        newsDataArray=myJson.articles;
    }
    else{
        
        console.log(response.status,response.statusText);
    }
    displayNews();
}

const fetchQueryNews= async()=>{
    if(newsQuery.value == null)
    return;
    const response=await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apiKey="+API_KEY);
    newsDataArray=[];

    if(response.status >=200 && response.status < 300){
        const myJson=await response.json();
        newsDataArray=myJson.articles;
    }
    else{
        
        console.log(response.status,response.statusText);
    }
    displayNews();
}

function displayNews(){ 

    newsdetails.innerHTML="";
    if(newsDataArray.length ==0){
        newsdetails.innerHTML = "<h4> No News Found </h4>"
        return;
    }
    newsDataArray.forEach(news =>{

        var date=news.publishedAt.split("T");
        var col=document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";

        var card=document.createElement('div');
        card.className="p-2";

        var image=document.createElement('img');
        image.setAttribute("height","matchparnt");
        image.setAttribute("width","100%");
        image.src=news.urlToImage;

        var cardBody=document.createElement('h4');

        var newsHeading=document.createElement('div');
        newsHeading.className="card-title";
        newsHeading.innerHTML=news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className="text-primary";
        dateHeading.innerHTML=date[0];

        var discription=document.createElement('p');
        discription.className="text-muted";
        discription.innerHTML=news.description;

        var link=document.createElement('a');
        link.className="btn btn-primary";
        link.setAttribute("target","_blank");
        link.href=news.url;
        link.innerHTML="Read more news";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);

    });

}

window.onload=function(){
    if(!sessionStorage.getItem("islogin")){
        window.location.href="login.html";
    }
    document.getElementById("logoutbtn").addEventListener("click",function(){
        sessionStorage.removeItem("islogin");
        window.location.href="login.html";
    });
};