import React, { useState } from "react";
import { createApi } from 'unsplash-js';
import axios from 'axios';

const unsplash = createApi({ accessKey: '2Vx2suOcOjZrVDZCZjeexAU8p5Q2jqSIN0cvwpnfg8U' });

export default function SearchPhotos() {
    const [query, setQuery] = useState("");
    const [pics, setPics] = useState([]);
    const [isRecording, setIsRecording] = useState(false);

    const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();  

    var transcript = "";

    const searchPhotos = async (e) => {
      axios.get(`https://8n1ydxze30.execute-api.us-east-1.amazonaws.com/dev/search?q=${query}`)
      .then(function(result){
          console.log(result);
          setPics(result.data)
      })
      e.preventDefault();
      unsplash.search.getPhotos({
            query: query
          }).then(function(result){
            console.log(result);
        })
    };

    const start = async (ev) => {
      recognition.start();    
      setIsRecording(true);  
    };
    
    const stop =  async (ev) =>{
      console.log("in stop")
      recognition.stop();
      setIsRecording(false);
    };
    
    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
      console.log("in here")
      transcript = event.results[0][0].transcript;
      console.log(transcript)
      setQuery(transcript)
    };

    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <form className="form" onSubmit={searchPhotos}> 
                <label className="label" htmlFor="query"> 
                    {" "}
                    📷
                </label>
                <input
                    type="text"
                    name="query"
                    className="search-input"
                    placeholder={`Try "dog" or "apple"`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="mic-button" onClick={start} hidden={isRecording}><i class="fa fa-microphone"/></button>
                <button className="mic-button" onClick={stop} hidden={!isRecording}>X</button>
                <p>
                  {transcript}
                </p>
                <button type="submit" className="grid-button">Search</button>
            </form>
            <br></br>
            <div className="card-list">
                {
                    pics.map((pic) => (
                        <div className="card" key={pic.id}>
                            <img
                                className="card--image"
                                alt=""
                                src={pic.url}
                                width="50%"
                                height="50%"
                            ></img>
                        </div>
                    ))}{" "}
      </div>
        </>
    );
}