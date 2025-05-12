// components/SoundButton.js
import { Howl } from 'howler';
import { useState } from 'react';

export default function SoundButton() {
  const [sound] = useState(
    new Howl({
      src: ['/sounds/click.mp3'], // Make sure this path is correct
    })
  );

  const playSound = () => {
    sound.play();
  };

  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded"
      onClick={playSound}
    >
      Play Sound
    </button>
  );
}
