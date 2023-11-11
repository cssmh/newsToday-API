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

  //   Outside loop
  const detailsNews = document.getElementById("card-container");
  detailsNews.innerHTML = "";
  //   So clear again & again
  soloData.forEach((categoryId) => {
    // console.log(categoryId);
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card card-compact w-96 bg-base-100 shadow-xl">
                      <figure><img src="${
                        categoryId.image_url
                      }" alt="" /></figure>
                      <div class="card-body">
                          <h2 class="card-title">${
                            categoryId.author.name
                              ? categoryId.author.name
                              : "No name"
                          }</h2>
                           <div class="flex">
                             <p>${categoryId.details.slice(0, 100)}</p>
                             <p class="badge badge-secondary
                             font-semibold p-5">${categoryId.rating.badge}</p>
                           </div>
                           <p>Total view : ${
                             categoryId.total_view
                               ? categoryId.total_view
                               : "No views"
                           }</p>
                           <div class="card-actions justify-end">
                               <button onclick="handleModal('${
                                 categoryId._id
                               }')" class="btn">Details</button>
                           </div>
                      </div>
                  </div>
      `;
    detailsNews.appendChild(div);
  });
};

// Modal section
const handleModal = async (newsId) => {
  // console.log(newsId);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/${newsId}`
  );
  const data = await res.json();
  const soloData = data?.data[0];
  console.log(soloData);

  const modalFather = document.getElementById("modal-container");
  modalFather.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box">
    <img src="${soloData.thumbnail_url}" alt="">
      <h3 class="font-bold text-lg mt-2">${soloData.author?.name? soloData.author.name : "No Name mentioned"}</h3>
      <p class="py-4">${soloData.details.slice(0, 100)}</p>
      <h3 class="text-lg">Publish date: ${soloData.author?.published_date}</h3>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
  `;
  modalFather.appendChild(div);
  // showing Modal
  const modal = document.getElementById("my_modal_1");
  modal.showModal();
  // showing Modal end
};

loadNews();

// Default show 01 value thats why call this function.
handleNews("05");
