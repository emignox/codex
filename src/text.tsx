import { FC, useState, useEffect } from "react";

interface TextProps {
  className: string;
}

const touchingText = [
  "Welcome to our sanctuary, a tranquil haven where serenity embraces you like a gentle breeze. Step into our serene 3D realm, where every pixel is infused with tranquility and peace.",
  "In a world where chaos often reigns supreme, our virtual oasis offers a refuge—a place to escape the cacophony of everyday life and immerse yourself in a world of calm. Here, amidst the soothing sights and sounds of nature, you can find solace, renewal, and a moment of respite from the stresses of the outside world.",
  "Close your eyes and let your imagination wander through lush, verdant landscapes, where the sun dances on the leaves and the scent of wildflowers fills the air. Feel the soft caress of a gentle stream as it meanders through the tranquil forest, its rhythmic flow echoing the beat of your own heart.",
  "As you explore our serene sanctuary, may you find peace in every corner and tranquility in every detail. Let the beauty of this virtual haven remind you of the beauty that lies within yourself—a beauty that shines brightest in moments of stillness and quiet reflection.",
  "So take a deep breath, let go of the worries that weigh heavy on your mind, and allow yourself to be swept away by the soothing embrace of our serene 3D world. Here, amidst the pixels and polygons, you'll discover a sense of peace that transcends the boundaries of space and time—a peace that is yours to carry with you, wherever you may roam.",
  "Welcome to our sanctuary. Welcome home.",
];

const Text: FC<TextProps> = ({ className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % touchingText.length);
        setOpacity(1);
      }, 1000); // Tempo di transizione
    }, 10000); // Tempo tra le transizioni

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{ opacity: opacity, transition: "opacity 1s ease-in-out" }}
      className={`${className} absolute z-10 text-white left-96 top-96 w-1/2 text-sm`}
    >
      <h1>{touchingText[currentIndex]}</h1>
    </div>
  );
};

export default Text;
