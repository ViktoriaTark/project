const btn = document.querySelector('.j-btn-test');
const btnIcon = document.querySelector('.btn_icon');

btn.addEventListener('click', () => {
  alert(`Ширина экрана: ${window.screen.width}\n
  Высота экрана: ${window.screen.height}`);
});