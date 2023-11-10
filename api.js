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

const handleNews = async(newsId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${newsId}`);
    const data = await res.json();
    console.log(data.data);
};




loadNews();
