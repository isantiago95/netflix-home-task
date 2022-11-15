import { findVideosPerRow, removeClassIfVisible } from './helpers/index.js';
import { renderHeader } from './components/header.js';
import renderRow from './components/row.js';

export const gallery = document.getElementById('gallery');

export function render(data) {
  const { rows, videos, billboards } = data;
  console.log(data);
  const headerRow = billboards.find(i => i.type === 'header');
  const videoId = rows[headerRow.row][0];
  const headerVideo = videos.find(v => v.id === videoId);

  renderHeader(headerVideo, headerRow);
  rows
    .map(r => findVideosPerRow(r, videos))
    .forEach(async (r, idx) => {
      await renderRow(r, billboards, idx);

      let row = document.getElementById(`row-${idx}`);
      let scroll;
      const btnLeft = document.getElementById(`btnLeft-${idx}`);
      const btnRight = document.getElementById(`btnRight-${idx}`);

      console.log(row);

      btnLeft.addEventListener('mouseenter', function () {
        btnLeft.classList.remove('transparent');
        scroll = setInterval(() => (row.scrollLeft -= 1), 10);
      });

      btnLeft.addEventListener('mouseleave', function () {
        btnLeft.classList.add('transparent');
        clearInterval(scroll);
      });

      btnRight.addEventListener('mouseenter', function () {
        btnRight.classList.remove('transparent');
        scroll = setInterval(() => (row.scrollLeft += 1), 10);
      });

      btnRight.addEventListener('mouseleave', function () {
        btnRight.classList.add('transparent');
        clearInterval(scroll);
      });
    });

  [...document.getElementsByClassName('hidden')]?.forEach(e => {
    removeClassIfVisible(e, 'hidden');
  });
}
