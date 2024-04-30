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
      className={`fixed z-10 text-3xl text-white top-3 left-2 flex justify-between items-center w-full ${className}`}
    >
      <button className="flex items-center justify-center" onClick={toggle}>
        {playing ? (
          <>
            <FaPause /> <p className="pl-2 text-sm">Stop The Sound</p>
          </>
        ) : (
          <>
            <FaPlay />
            <p className="pl-2 text-sm">Active The Sound</p>
          </>
        )}
      </button>
      <a target="blanck_" href="https://emignox.github.io/portfolio/">
        <button className="px-4 py-3 mr-3 text-sm text-center duration-500 transform bg-black border border-white rounded-full w-44 hover:text-black hover:bg-white">
          {" "}
          Go to my Portfolio
        </button>
      </a>
    </div>
  );
};

export default Sound;
