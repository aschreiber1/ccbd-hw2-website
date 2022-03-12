import React, { useState } from "react";
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default function Recorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [blobURL, setBlobURL] = useState("");

    const start = async (ev) => {
        Mp3Recorder
        .start()
        .then(() => {
            setIsRecording(true)
        }).catch((e) => console.error(e));
        
      };
    
      const stop =  async (ev) =>{
        Mp3Recorder
          .stop()
          .getMp3()
          .then(([buffer, blob]) => {
            const temp = URL.createObjectURL(blob)
            setIsRecording(false)
            console.log(temp)
            setBlobURL(temp)
          }).catch((e) => console.log(e));
      };

    return (
        <>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
          <button className="mic-button" onClick={start} hidden={isRecording}><i class="fa fa-microphone"/></button>
          <button className="mic-button" onClick={stop} hidden={!isRecording}>X</button>
        </>
    );
}