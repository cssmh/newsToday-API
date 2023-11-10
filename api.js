const loadNews = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await res.json();

  const mainNews = data.data.news_category.slice(0, 3);
  //   console.log(mainNews);
  const appendParent = document.getElementById("news-container");
  mainNews.forEach((category) => {
    // console.log(category.category_id);
    const div = document.createElement("div");
    div.innerHTML = `
        <a onclick="handleNews('${category.category_id}')" class="tab">${category.category_name}</a>
        `;
    appendParent.appendChild(div);
  });
};

// Next fetch
const handleNews = async (newsId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${newsId}`
  );
  const data = await res.json();
  const soloData = data.data;

  //   Outside loap
  const detailsNews = document.getElementById("card-container");
  detailsNews.innerHTML = "";
  //   So clear again again
  soloData.forEach((categoryId) => {
    console.log(categoryId);
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card card-compact w-96 bg-base-100 shadow-xl">
                      <figure><img src="${categoryId.image_url}" alt="" /></figure>
                      <div class="card-body">
                          <h2 class="card-title">${categoryId.author.name}</h2>
                          <p>If a dog chews shoes whose shoes does he choose?</p>
                          <div class="card-actions justify-end">
                              <button class="btn btn-primary">Buy Now</button>
                          </div>
                      </div>
                  </div>
      `;
    detailsNews.appendChild(div);
  });
};

loadNews();