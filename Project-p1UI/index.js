const genralbutton= document.getElementById("general");
const businessbutton= document.getElementById("business");
const sportsbutton= document.getElementById("sports");
const technologybutton= document.getElementById("technology");
const entertainmentbutton= document.getElementById("entertainment");
const searchbutton= document.getElementById("searchbtn");


const newsQuery= document.getElementById("newsQuery");
const newsType=document.getElementById("newsType");
const newsdetails=document.getElementById("newsdetails")


var newsDataArray=[];



genralbutton.addEventListener("click",function(){
    fetchGeneralNews();

});

businessbutton.addEventListener("click",function(){
    fetchBusinessNews();

});

sportsbutton.addEventListener("click",function(){
    fetchSportsNews();

});

technologybutton.addEventListener("click",function(){
    fetchTechnologyNews();

});

entertainmentbutton.addEventListener("click",function(){
    fetchEntertainmentNews();

});

searchbutton.addEventListener("click",function(){
    fetchQueryNews();

});

const fetchGeneralNews= async()=>{
    const response=await fetch();
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

const fetchBusinessNews= async()=>{
    const response=await fetch();
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

const fetchSportsNews= async()=>{
    const response=await fetch();
    newsDataArray=[];

    if(response.status >=200 && response.status < 300){
        const myJson=await response.json();
        newsDataArray=myJson.articles;
    }
    else{
        console.log(response.status,response.statusText);//handle errors
    }
    displayNews();
}

const fetchTechnologyNews= async()=>{
    const response=await fetch();
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
    const response=await fetch();
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

const fetchQueryNews= async()=>{
    if(newsQuery.value == null)
    return;
    const response=await fetch();
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

function displayNews(){ 

    newsdetails.innerHTML="";
    if(newsDataArray.length ==0){
        newsdetails.innerHTML = "<h4> No News Found </h4>"
        return;
    }
    newsDataArray.forEach(news =>{
        var col=document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2";

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

    })

}