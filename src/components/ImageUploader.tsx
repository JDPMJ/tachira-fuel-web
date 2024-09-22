import { useState, ChangeEvent } from "react";
import { Carousel } from "react-bootstrap";

export default function ImageUploader({ setFiles }: { setFiles: Function }) {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setImages(imageUrls); //setImages(prevImages => [...prevImages, ...imageUrls]);
    setFiles(files);
  };

  return (
    <div>
      {images.length == 0 &&
        <label className="file-upload">
          Seleccione sus archivos y suéltelos aquí
          <input type="file" multiple onChange={handleImageUpload} />
        </label>
      }
      {images.length > 0 && (
        <Carousel controls={true} indicators={true} interval={null}>
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={image}
                alt={`Slide ${index}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
}