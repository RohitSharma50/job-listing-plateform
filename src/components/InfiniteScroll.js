import React, { useEffect, useRef } from "react";

function InfiniteScroll({ loadMore }) {
  const loader = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.1
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      observer.unobserve(loader.current);
    };
  }, []);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      loadMore(); // Call loadMore function when loader is visible
    }
  };

  return <li ref={loader} style={{ height: "10px" }}></li>; // Loader element
}

export default InfiniteScroll;
