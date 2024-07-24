const searchForm = document.getElementById("search-form")
const searchBox = document.getElementById("search-box")
const searchResult = document.getElementById("search-result")
const showMoreBtn = document.getElementById("show-more-btn")

const count = 30
const apiKey = 'b8HbiEfRxZcXm3AYSQzH3QkWUx3AWesqq8WsuzA-Om0'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

let keyword = ""
let page = 1

async function searchImages(){
    keyword = searchBox.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${apiKey}&per_page=12`

    const response = await fetch(url)
    const data = await response.json()

    // if (page === 1){
    //     searchResult.innerHTML = ""
    // }

    // console.log(data)

    const results = data.results

    results.map((result) => {
        const image = document.createElement("img")

        image.src = result.urls.small

        const imageLink = document.createElement('a')

        imageLink.href = result.links.html

        imageLink.target = "_blank"

        imageLink.appendChild(image)

        searchResult.insertBefore(imageLink, showMoreBtn)
    })

    showMoreBtn.style.display = 'block'
    
}



searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    page = 1 

    searchImages()
})


showMoreBtn.addEventListener('click', () => {
    page++

    searchImages()
})