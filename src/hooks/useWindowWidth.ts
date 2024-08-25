import { useEffect, useState } from 'react';

const useWindowWidth = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);

    window.onresize = () => {
      setWidth(window.innerWidth);
    };
  }, []);

  return width;
};

export default useWindowWidth;
