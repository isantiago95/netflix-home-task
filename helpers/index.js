export const renderHTML = function (template, node) {
  //function to render html inside given html element
  if (!node) return;
  node.innerHTML = template;
};

export const appendElement = function (template, node) {
  //function to append child to given html node
  if (!node) return;
  node.appendChild(template);
};

export const findVideosPerRow = (rows, videos) => rows.map(v => videos.find(f => f.id === v)); //find all videos per row

export function renderButton({ type, text }, element) {
  //function to render button for billboards
  const newButton = document.createElement('a');
  newButton.href = '#';
  if (type === 'play') {
    newButton.innerHTML = text;
    newButton.className = 'billboard-metadata-button billboard-metadata-button-play';
  } else {
    newButton.innerHTML = text;
    newButton.className = 'billboard-metadata-button';
  }
  appendElement(newButton, element);

  if (!element) return newButton.outerHTML;
}

const isVisible = element => {
  //function to check if a given html element is visible in screen
  // Get element position in the viewport
  var bounding = element.getBoundingClientRect();
  if (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  ) {
    // console.log('In the viewport! :)');
    return true;
  } else {
    // console.log('Not in the viewport. :(');
    return false;
  }
};

export const removeClassIfVisible = (element, className) => {
  //function to remove hidden (or any given) class if item is visible
  window.addEventListener(
    'scroll',
    function (event) {
      if (isVisible(element)) {
        setTimeout(() => {
          element.classList.remove(className);
          window.removeEventListener('scroll', () => console.log('event listener removed'));
        }, 500); // timeout to smooth the removal
      }
    },
    false
  );
};

export async function addButtonListener(idx) {
  try {
    let row = document.getElementById(`row-${idx}`);
    let scroll;
    const btnLeft = document.getElementById(`btnLeft-${idx}`);
    const btnRight = document.getElementById(`btnRight-${idx}`);

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
  } catch (error) {}
}
