import { findVideosPerRow, removeClassIfVisible, addButtonListener } from './helpers/index.js';
import { renderHeader } from './components/header.js';
import renderRow from './components/row.js';

export const gallery = document.getElementById('gallery');

export function render(data) {
  const { rows, videos, billboards } = data;
  // search for header billboard
  const headerRow = billboards.find(i => i.type === 'header');
  const videoId = rows[headerRow.row][0];
  const headerVideo = videos.find(v => v.id === videoId);

  // run until rows are rendered
  const onFinish = async idx => await addButtonListener(idx);

  renderHeader(headerVideo, headerRow); //function imported from header to render it

  rows
    .map(r => findVideosPerRow(r, videos))
    .forEach(async (items, idx) => {
      await renderRow({ items, billboards, idx, onFinish });
    });

  [...document.getElementsByClassName('hidden')]?.forEach(e => {
    removeClassIfVisible(e, 'hidden');
  });
}
