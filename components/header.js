import { renderButton, renderHTML } from '../helpers/index.js';

export function renderHeader(video, item) {
  const header = document.getElementById('main-header');
  const { logo, synopsis } = video;
  header.style.backgroundImage = `url(${video.background})`;

  const template = `
  <div id="billboard-metadata" class="billboard-metadata">
  <img src="${logo}" alt="header image" class="billboard-metadata-logo" />
  <p class="billboard-metadata-synopsis">${synopsis}</p>
  </div>
  `;

  renderHTML(template, header);

  item.buttons.map(b => renderButton(b, document.getElementById('billboard-metadata'))).join('');
}
