import { useEffect, useState } from "react";
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

const Sound = () => {
  const [audio] = useState(() => {
    const audio = new Audio("/sound.mp3");
    audio.loop = true; // Fai ricominciare l'audio quando finisce
    return audio;
  });
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  return (
    <div className="fixed z-10 text-3xl text-black top-3 left-2 ">
      <button onClick={toggle}>{playing ? <FaPause /> : <FaPlay />}</button>
    </div>
  );
};

export default Sound;
