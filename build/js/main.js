

// var catalogLink = document.getElementById('catalog');
var modalNav = document.getElementById('modal-nav');

// catalogLink.addEventListener('mouseover', function (evt) {
//   evt.preventDefault();
//   modalNav.classList.add('show-modal-content');
// });

var btnSearch = document.getElementById('btn-search');
var search = document.getElementById('search');
var searchInput = document.querySelector('.form-control')
var btnLogIn = document.getElementById('login');
var singIn = document.getElementById('singin');

btnSearch.addEventListener('click', function (evt) {
  evt.preventDefault();
  search.classList.add('show-modal-content');
  searchInput.classList.add('form-control--mod');
  btnSearch.classList.add('active');
  singIn.classList.remove('show-content--singin')
  btnLogIn.classList.remove('active');
});

btnLogIn.addEventListener('click', function (evt) {
  evt.preventDefault();
  singIn.classList.add('show-content--singin');
  btnLogIn.classList.add('active');
  search.classList.remove('show-modal-content');
  btnSearch.classList.remove('active');
})

var btnClose = document.querySelectorAll('#close');
btnClose[0].addEventListener('click', function (evt) {
  evt.preventDefault();
  search.classList.remove('show-modal-content');
  btnSearch.classList.remove('active');
  
});

btnClose[1].addEventListener('click', function (evt) {
  evt.preventDefault();
  singIn.classList.remove('show-content--singin');
  btnLogIn.classList.remove('active');
});

