const wrapper = document.querySelector(".wrapper");
let nextPage = 1;
const preloader = document.querySelector('.preloader');


const infinitiObserver = new IntersectionObserver(
  ([entry], observer) => {
    if (entry.isIntersecting) {
      console.log('loader 2')
      preloader.style.display = ""
      observer.unobserve(entry.target);
      main(++nextPage);
    }
  },
  {}
)

const main = async (page) => {

  const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${page}`)
  console.log('loader 1')
  preloader.style.display = "none"
  const data = await response.json();
  console.log(data)
  data.forEach(cart => {
    const cartEl = document.createElement('div');
    cartEl.classList.add('cart');
    cartEl.innerHTML = `
    <h2>${cart.id}. ${cart.title}</h1>
    <img src="${cart.thumbnailUrl}" alr="${cart.title}">
    `;
    console.log(cartEl)
    wrapper.appendChild(cartEl)
  })

  const lastPage = document.querySelector('.cart:last-child');
  if (lastPage) {
    infinitiObserver.observe(lastPage);
  }
}

main(1);