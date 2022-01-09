import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { seedImagesAsync, selectImages } from "./app/images/imageSlice";

function App() {
  const dispatch = useAppDispatch();
  const { status, images } = useAppSelector(selectImages);

  useEffect(() => {
    if (images.length === 0) {
      dispatch(seedImagesAsync());
    }
  }, [dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Failed</div>;

  return (
    <Carousel infiniteLoop showThumbs={false} dynamicHeight={false}>
      {images.map((image) => (
        <div key={image._id}>
          <img src={image.src} />
          <p className="legend">{image.name}</p>
        </div>
      ))}
    </Carousel>
  );
}

export default App;
