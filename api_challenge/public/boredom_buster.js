var generateIdea = document.getElementById("generate-idea");
var activity_type = "any";
var continent = "any";
var type_select = document.getElementById("type");
var continent_select = document.getElementById("continent");
var flagArea = document.getElementById("flag");
var suggestion = document.getElementById("suggestion");
var suggestionDiv = document.getElementById("suggestion-div");
var loading = document.getElementById("loading");
suggestionDiv.style.display = "none";
loading.style.display = "none";
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getActivity() {
    var http = new XMLHttpRequest();
    suggestionDiv.style.display = "none";
    loading.style.display = "block";
    if (activity_type != "any") {
        http.open("GET", `http://www.boredapi.com/api/activity?type=${activity_type}`);
    } else {
        http.open("GET", "http://www.boredapi.com/api/activity");
    }
    
    http.onload = function() {
        var activity_data = JSON.parse(http.responseText);
        console.log(activity_data);
        var http2 = new XMLHttpRequest();
        if (continent == "any") {
            http2.open("GET", "https://restcountries.com/v3.1/all");
        } else {
            http2.open("GET", `https://restcountries.com/v2/continent/${continent}`);
        }
        http2.onload = function() {
            var country_data = JSON.parse(http2.responseText);
            console.log(country_data);
            var country_index = getRandomInt(country_data.length);
            var country = country_data[country_index];
            var countryName = country.name.common;
            var flag = country.flags.svg;
            flagArea.src = flag;
            flagArea.style.display = "block"
            generateIdea.disabled = false;
            var suggestionText = `${activity_data.activity} in ${countryName}`;
            suggestion.innerText = suggestionText;
            loading.style.display = "none";
            suggestionDiv.style.display = "block";
        }
        http2.send();
    }
    http.send();
    
}

type_select.addEventListener("change", (e) => {
    activity_type = type_select.value;
});


generateIdea.addEventListener("click", () => {
    generateIdea.disabled = true;
    getActivity();
});

