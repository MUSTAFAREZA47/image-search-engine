async function searchImages() {
    keyword = searchBox.value.trim(); // Trim spaces
    if (!keyword) {
        alert("Please enter a search term.");
        return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${apiKey}&per_page=12`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch images");
        }
        const data = await response.json();

        if (page === 1) {
            searchResult.innerHTML = ""; // Clear old results for a new search
        }

        const results = data.results;

        if (results.length === 0) {
            if (page === 1) {
                searchResult.innerHTML = "<p>No results found. Try another search term.</p>";
            }
            showMoreBtn.style.display = "none";
            return;
        }

        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description || "Unsplash Image";

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink); // Append the image link directly to `searchResult`
        });

        if (!searchResult.contains(showMoreBtn)) {
            searchResult.appendChild(showMoreBtn); // Ensure `showMoreBtn` is appended only once
        }

        showMoreBtn.style.display = "block"; // Show the "Show More" button
    } catch (error) {
        console.error(error);
        searchResult.innerHTML = "<p>Something went wrong. Please try again later.</p>";
        showMoreBtn.style.display = "none";
    }
}
