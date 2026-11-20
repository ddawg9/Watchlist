const form = document.querySelector("#search-form");
const search = document.querySelector("#search");
const results = document.querySelector("#results");

async function searchShows(name) {
    results.textContent = "Loading...";

    try 
    {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(name)}`);

        if (!response.ok) 
            throw new Error("Could not load shows");
        
        const data = await response.json();

        results.innerHTML = "";

        if (data.length === 0) 
        {
            results.textContent = "No shows found.";
            return;
        }

        data.forEach((item) => {
            const show = item.show;

            const li = document.createElement("li");

            const title = document.createElement("h3");
            title.textContent = show.name;

            const rating = document.createElement("p");
            rating.textContent = "Rating: " + (show.rating.average ?? "N/A");

            li.append(title, rating);

            if (show.image) {
                const poster = document.createElement("img");
                poster.src = show.image.medium;
                poster.alt = show.name + " poster";
                li.prepend(poster);
            }

            results.append(li);
        });

    } 
    catch (error) 
    {
        results.textContent = "Something went wrong. Please try again.";
        console.error(error);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = search.value.trim();

    if (name !== "") 
    {
        searchShows(name);
    }
});
