export const renderHTML = function (template, node) {
  if (!node) return;
  node.innerHTML = template;
};

export const appendElement = function (template, node) {
  if (!node) return;
  node.appendChild(template);
};

export const findVideosPerRow = (rows, videos) => rows.map(v => videos.find(f => f.id === v));

export function renderButton({ type, text }, element) {
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
  //   console.log(element);
  // Get the bounding client rectangle position in the viewport
  var bounding = element.getBoundingClientRect();
  // Checking part. Here the code checks if it's *fully* visible
  // Edit this part if you just want a partial visibility
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
  window.addEventListener(
    'scroll',
    function (event) {
      if (isVisible(element)) {
        // update the element display
        setTimeout(() => {
          element.classList.remove(className);
          window.removeEventListener('scroll', () => console.log('event listener removed'));
        }, 500);
      }
    },
    false
  );
};
