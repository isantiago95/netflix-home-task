import { renderButton } from '../helpers/index.js';

export default function singleItem({ video, isInline, billboard }) {
  if (isInline && !billboard) return;

  const { boxart, id } = video;
  const renderBillboard = isInline && billboard;

  const singleVideo = document.createElement('div');

  singleVideo.className = renderBillboard ? 'billboard-background' : 'boxshot';
  singleVideo.id = `video-${id}`;

  if (renderBillboard) {
    console.log({ video, isInline, billboard });
    singleVideo.style.backgroundImage = `url(${video.backgroundShort})`;
    singleVideo.innerHTML = `
      <div class="billboard-metadata hidden">
      <img src="${video.logo}" alt="" />
      <div class="buttons">
      ${billboard?.buttons.map(b => renderButton(b)).join('')}
      </div>
      </div>
      `;
  } else {
    singleVideo.innerHTML = `
      <a href="#">
      <img src="${boxart}" alt="" />
      </a>
      `;
  }

  return singleVideo.outerHTML;
}
