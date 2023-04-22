
const renderProducts = async () => {
  let uri = 'http://localhost:3005/products';

  const res = await fetch(uri);
  const products = await res.json();
  console.log(products)

  let itemProduct;
  let countProductItem = 1;

  let $box = $('#catalog-products');
  let row;

  products.forEach(itemProduct => {

    if (countProductItem == 1 || countProductItem == 5 || countProductItem == 9) {
      row = document.createElement('div');
      row.setAttribute('id', 'product-row');
      row.setAttribute('class', 'row row-cols-4 justify-content-center');
      $box.append(row);
    }

    itemProduct = createItemProductBox(itemProduct);
    row.append(itemProduct);
    countProductItem++;
  });
}

// Получаем фрагмент
const t = document.querySelector('#product-item-t');
const box = t.content.querySelector('#product-item')
const imgProduct = t.content.querySelector('#product-img');
const price = t.content.querySelector('#price');
const priceImg = t.content.querySelector('#price-img');
const priceWeight = t.content.querySelector('#price-weight');
const productTitle = t.content.querySelector('#product-title');

// Создаем элемент товара
function createItemProductBox(itemProduct) {

  box.setAttribute('id', `product-item${itemProduct.id}`);
  imgProduct.setAttribute('src', itemProduct.img);
  price.textContent = itemProduct.price;
  priceImg.setAttribute('src', itemProduct.priceimg);
  priceWeight.textContent = "/кг"
  productTitle.textContent = itemProduct.title;

  let dev = t.content.cloneNode(true);

  return dev;

}

// Работа с элементами продуктов

const selectSingle = document.querySelector('.__select');
const selectSingle_title = selectSingle.querySelector('.__select__title');
const selectSingle_labels = selectSingle.querySelectorAll('.__select__label');

// Toggle menu
selectSingle_title.addEventListener('click', () => {
  if ('active' === selectSingle.getAttribute('data-state')) {
    selectSingle.setAttribute('data-state', '');
  } else {
    selectSingle.setAttribute('data-state', 'active');
  }
});

// Close when click to option
for (let i = 0; i < selectSingle_labels.length; i++) {
  selectSingle_labels[i].addEventListener('click', (evt) => {
    selectSingle_title.textContent = evt.target.textContent;
    selectSingle.setAttribute('data-state', '');
  });
}

const reset = document.querySelector('.reset');
reset.addEventListener('click', () => {
  selectSingle_title.textContent = selectSingle_title.getAttribute('data-default');
});

// Анимация переключения страниц
let activePage = 'page2';
let pages = document.querySelector('.paginator');
pages.addEventListener('click', function (evt) {
  var clickedElement = evt.target;
  if (clickedElement.classList.contains('page')) {
    setActivePage(clickedElement.id);
  }
});

function setActivePage(id) {
  if (activePage === id) {
    return;
  }
  document.querySelector('#' + activePage).classList.remove('active-page');
  document.querySelector('#' + id).classList.add('active-page');

  activePage = id;
};

// const elem;
// elem = document.querySelector('#product-item');
//   elem.addEventListener('click', (e) => {
//     let focusElement = e.target;
//     if (focusElement.classList.contains('product-item')) {
//       setFocusElement(focusElement.id);
//     }
//   });

//   function setFocusElement(id) {
//     if (focusElement === id) {
//       return;
//     }

//     document.querySelector('#' + id).classList.add('btn-add--hover');
//   }


// Ожидание полной загрузки дом дерева стр.
window.addEventListener('DOMContentLoaded', () => 
  renderProducts(),
);

