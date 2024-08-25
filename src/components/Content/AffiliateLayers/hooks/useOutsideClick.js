import { useEffect } from 'react';

const useOutsideClick = (ref, onOutsideClick, includeInsideClickable, clickEvent) => {
  function handleClickOutside(event) {
    const clickableElements = ['A', 'LI'];
    const containsEl = ref.current && ref.current.contains(event.target);
    if (
      !containsEl ||
      (containsEl && includeInsideClickable && clickableElements.includes(event.target.nodeName))
    ) {
      onOutsideClick();
    }
  }

  useEffect(() => {
    document.addEventListener(clickEvent ? 'click' : 'mouseup', handleClickOutside);

    return () => document.removeEventListener(clickEvent ? 'click' : 'mouseup', handleClickOutside);
  });
};

export default useOutsideClick;
