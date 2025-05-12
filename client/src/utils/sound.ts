import { Howl } from "howler";

export const clickSound = new Howl({
  src: ["/sounds/click.mp3"], // Path to your sound file in the public folder
  html5: true, // Ensures playback works on mobile devices
  volume: 1.0, // Set the volume (0.0 to 1.0)
});