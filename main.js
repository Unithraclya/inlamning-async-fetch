const inputfield = document.getElementById("searchfield");
const searchButton = document.getElementById("search-btn");
const filterButton = document.getElementById("filter-btn");
const container = document.getElementById("content");
let inputValue;
let typeValue;

inputfield.addEventListener('input', (e)=> {
    inputValue = e.target.value;
});

searchButton.addEventListener("click", fetchData);

inputfield.addEventListener("keyup", function(e) {
    if(e.key === "Enter") {
        e.preventDefault();
        searchButton.click();
    }

});

filterButton.addEventListener("click", filterData);


async function fetchData() {
    try {
        let response = await fetch("http://www.omdbapi.com/?apikey=182e29ab&s=" + inputValue);
        if(!response.ok) {
            throw new Error('ERROR! HTTP status: ' + response.status)
        }

        let data = await response.json();
        presentData(data);
    } catch(error) {
        console.log(error);
    }
}

async function filterData() {
    try {
        let url = "http://www.omdbapi.com/?apikey=182e29ab&s=" + inputValue + "&type=" + typeValue;
        console.log(url);
        let response = await fetch(url);
        if(!response.ok) {
            throw new Error('ERROR! HTTP status: ' + response.status)
        }

        let data = await response.json();
        presentData(data);
    } catch(error) {
        console.log(error);
    }
}

function handleClick(myRadio) {

    typeValue = myRadio.value;

}
function presentData(data) {
    let list = '';
    let counter = 1;
   
    for (let video of data.Search) {
 
        list += '<div class="movie-item">';
        list += `<h2>${video.Title}</h2>`; 
        list += `<img class="movie-poster" src="${video.Poster}" />`;
        list += '</div>';
        counter++;
        if(counter >= 10) {
            break
        }
    }
   
    container.innerHTML = list;
}




