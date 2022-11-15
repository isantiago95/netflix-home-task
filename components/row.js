import { gallery } from '../app.js';
import { appendElement } from '../helpers/index.js';
import singleItem from './single-item.js';

export default async function renderRow(items, billboards, idx) {
  const isInline = items.length === 1;
  const moreThan5 = items.length > 5;

  const row = createRow({ idx, isInline, items, billboards });

  const wrapper = wrap({ row, isInline, idx, moreThan5 });
  console.log(wrapper);

  appendElement(wrapper, gallery);
}

function wrap({ row, isInline, idx, moreThan5 }) {
  // console.log({ row, isInline, idx });
  const wrapper = document.createElement('div');
  wrapper.id = `wrapper-${idx}`;
  wrapper.className = 'wrapper';
  const btnLeft = document.createElement('button');
  btnLeft.classList.add('btn-nav', 'btn-left', 'transparent');
  btnLeft.id = `btnLeft-${idx}`;
  btnLeft.innerHTML = '<';
  const btnRight = document.createElement('button');
  btnRight.classList.add('btn-nav', 'btn-right', 'transparent');
  btnRight.id = `btnRight-${idx}`;
  btnRight.innerHTML = '>';

  wrapper.innerHTML = `
  ${!isInline && moreThan5 ? btnLeft.outerHTML : ''}
  ${row.outerHTML}
  ${!isInline && moreThan5 ? btnRight.outerHTML : ''}
  `;

  return wrapper;
}

function createRow({ idx, isInline, items, billboards }) {
  const rowTemplate = document.createElement('div');
  rowTemplate.id = `row-${idx}`;
  rowTemplate.className = isInline ? 'row-billboard-inline' : 'row-videos';

  rowTemplate.innerHTML = `
        <div id="carousel-content-${idx}" class="carousel-content">
          ${items
            .map(video => singleItem(buildProps({ video, billboards, isInline, idx })))
            .join('')}
        </div>
    `;

  return rowTemplate;
}

const buildProps = ({ video, billboards, isInline, idx }) => {
  let props = {
    video,
    isInline,
  };
  if (isInline) {
    const billboard = billboards.filter(b => b.type === 'inline' && b.row === idx)[0];
    props = { ...props, billboard };
  }
  return props;
};
