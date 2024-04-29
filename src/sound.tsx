import { useEffect, useState, useRef, FunctionComponent as FC } from "react";
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

interface SoundProps {
  className?: string;
}

const Sound: FC<SoundProps> = ({ className }) => {
  const audioRef = useRef(new Audio("/sound.mp3"));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true; // Fai ricominciare l'audio quando finisce

    playing ? audio.play() : audio.pause();

    // Pulisci l'effetto quando il componente viene smontato
    return () => {
      audio.pause();
    };
  }, [playing]);

  return (
    <div
      className={`fixed z-10 text-3xl text-black top-3 left-2  ${className}`}
    >
      <button className="flex items-center justify-center " onClick={toggle}>
        {playing ? (
          <>
            {" "}
            <FaPause /> <p className="pl-2 text-sm">Stop The Sound</p>
          </>
        ) : (
          <>
            <FaPlay />
            <p className="pl-2 text-sm">Active The Sound</p>
          </>
        )}{" "}
      </button>
    </div>
  );
};

export default Sound;
