(() => {
  const refs = {
    prevReviewBtn: document.querySelector('[data-review-prev]'),
    nextReviewBtn: document.querySelector('[data-review-next]'),
    list: document.querySelector('[data-reviews]'),
    listItem: document.querySelector('[data-review]'),
  };

  refs.prevReviewBtn.addEventListener('click', showPrev);
  refs.nextReviewBtn.addEventListener('click', showNext);

  const queryTablet = matchMedia('(min-width: 768px)');
  queryTablet.addEventListener('change', () => {
    const listItemStyle = getComputedStyle(refs.listItem);
    const listStyle = getComputedStyle(refs.list);
    let offset = new WebKitCSSMatrix(listStyle.transform).m41;
    if (offset < 0) {
      const offset = -(parseInt(listItemStyle.minWidth, 10)) - 32;
      correctPosition(listStyle, offset);
    }
  });

  const queryDesktop = matchMedia('(min-width: 1280px)');
  queryDesktop.addEventListener('change', () => {
    const listStyle = getComputedStyle(refs.list);
    correctPosition(listStyle, "0");
    setButtonsVisibility(false, true);
  });

  function correctPosition(listStyle, offset) {
    const duration = listStyle.transitionDuration;
    refs.list.style.transitionDuration = '0s';
    refs.list.style.transform = `translateX(${offset}px)`;

    setTimeout(function() {
      refs.list.style.transitionDuration = duration;
    }, 100);
  }

  function showPrev() {
    setButtonsVisibility(false, true);
    refs.list.style.transform = 'translateX(0)';
  }

  function showNext() {
    const style = getComputedStyle(refs.listItem);
    let x = -(parseInt(style.minWidth, 10)) - 32;
    setButtonsVisibility(true, false);
    refs.list.style.transform = `translateX(${x}px)`;
  }

  function setButtonsVisibility(isPrevVisible, isNextVisible) {
    if(isPrevVisible) {
      refs.prevReviewBtn.classList.remove('is-hidden');
    }
    else {
      refs.prevReviewBtn.classList.add('is-hidden');
    }
    if(isNextVisible) {
      refs.nextReviewBtn.classList.remove('is-hidden');
    }
    else {
      refs.nextReviewBtn.classList.add('is-hidden');
    }
  }

})();
