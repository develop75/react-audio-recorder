import React, { useState, useEffect, ReactElement } from "react";
import { Props } from "./interfaces";
import useAudioRecorder from "../hooks/useAudioRecorder";

import micSVG from "../icons/mic.svg";
import pauseSVG from "../icons/pause.svg";
import resumeSVG from "../icons/play.svg";
import saveSVG from "../icons/save.svg";
import discardSVG from "../icons/stop.svg";
import "../styles/audio-recorder.css";

/**
 * Usage: https://github.com/samhirtarif/react-audio-recorder#audiorecorder-component
 *
 *
 * @prop `onRecordingComplete` Method that gets called when save recording option is clicked
 * @prop `recorderControls` Externally initilize hook and pass the returned object to this param, this gives your control over the component from outside the component.
 * https://github.com/samhirtarif/react-audio-recorder#combine-the-useaudiorecorder-hook-and-the-audiorecorder-component
 * @prop `classes` Is an object with attributes representing classes for different parts of the component
 */
const AudioRecorder: (props: Props) => ReactElement = ({
  labelSaveRecording = "",
  labelStartRecording = "",
  labelResumeRecording = "",
  labelPauseRecording = "",
  labelDiscardRecording = "",
  onRecordingComplete,
  recorderControls,
  classes,
}: Props) => {
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = recorderControls ?? useAudioRecorder();
  const [shouldSave, setShouldSave] = useState(false);
  const stopAudioRecorder: (save?: boolean) => void = (
    save: boolean = true
  ) => {
    setShouldSave(save);
    stopRecording();
  };

  /*
  * label : label of property
  * labelDefault : label of default.
  */
  function getByLabelText (label: string,labelDefault: string) : string {
    if(label === null || label === "")
      return labelDefault;
    else
      return label;
  }

  useEffect(() => {
    if (
      (shouldSave) &&
      recordingBlob != null &&
      onRecordingComplete != null
    ) {
      onRecordingComplete(recordingBlob);
    }
  }, [recordingBlob]);
  return (
    <div
      className={`audio-recorder ${isRecording ? "recording" : ""} ${
        classes?.AudioRecorderClass ?? ""
      }`}
      data-testid="audio_recorder"
    >
      <img
        src={isRecording ? saveSVG : micSVG}
        className={`audio-recorder-mic ${
          classes?.AudioRecorderStartSaveClass ?? ""
        }`}
        onClick={isRecording ? () => stopAudioRecorder() : startRecording}
        data-testid="ar_mic"
        title={isRecording ? getByLabelText(labelSaveRecording,"Save recording") : getByLabelText(labelStartRecording,"Start recording")}
      />
      <span
        className={`audio-recorder-timer ${
          !isRecording ? "display-none" : ""
        } ${classes?.AudioRecorderTimerClass ?? ""}`}
        data-testid="ar_timer"
      >
        {Math.floor(recordingTime / 60)}:
        {String(recordingTime % 60).padStart(2, "0")}
      </span>
      <span
        className={`audio-recorder-status ${
          !isRecording ? "display-none" : ""
        } ${classes?.AudioRecorderStatusClass ?? ""}`}
      >
        <span className="audio-recorder-status-dot"></span>
        Recording
      </span>
      <img
        src={isPaused ? resumeSVG : pauseSVG}
        className={`audio-recorder-options ${
          !isRecording ? "display-none" : ""
        } ${classes?.AudioRecorderPauseResumeClass ?? ""}`}
        onClick={togglePauseResume}
        title={isPaused ? getByLabelText(labelResumeRecording,"Resume recording") : getByLabelText(labelPauseRecording,"Pause recording")}
        data-testid="ar_pause"
      />
      <img
        src={discardSVG}
        className={`audio-recorder-options ${
          !isRecording ? "display-none" : ""
        } ${classes?.AudioRecorderDiscardClass ?? ""}`}
        onClick={() => stopAudioRecorder(false)}
        title={getByLabelText(labelDiscardRecording,"Discard recording")}
        data-testid="ar_cancel"
      />
    </div>
  );
};

export default AudioRecorder;
