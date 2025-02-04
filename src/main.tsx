import React from "react";
import ReactDOM from "react-dom/client";
import AudioRecorder from "./components/AudioRecordingComponent";

const addAudioElement = (blob: Blob) => {
  const url = URL.createObjectURL(blob);
  const audio = document.createElement("audio");
  audio.src = url;
  audio.controls = true;
  document.body.appendChild(audio);
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AudioRecorder onRecordingComplete={(blob) => addAudioElement(blob)} 
      labelSaveRecording="Save recording" 
      labelStartRecording="Start recording"
      labelResumeRecording="Resume recording"
      labelPauseRecording="Pause recording"
      labelDiscardRecording="Delete recording"/>
  </React.StrictMode>
);
