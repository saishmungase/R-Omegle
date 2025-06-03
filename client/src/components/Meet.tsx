import { useEffect, useRef, useState } from "react"
import { Room } from "./Room";

export const Meet = () => {
     
    const [joined, setJoined] = useState<boolean>(false);
    const [name, setName] = useState<string>("Anonymous");
    const [localVideoStream, setLocalVideoStream] = useState<MediaStreamTrack | null>(null);
    const [localAudioStream, setLocalAudioStream] =  useState<MediaStreamTrack | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const getCam = async () => {
        const stream = await window.navigator.mediaDevices.getUserMedia({
            audio : true,
            video : true
        })

        if(!stream){
            return;
        }
        const video = stream.getVideoTracks()[0];
        const audio = stream.getAudioTracks()[0];
        setLocalVideoStream(video);
        setLocalAudioStream(audio);

        console.log(localAudioStream + " " + localVideoStream)

        if(!videoRef.current){
            return
        }
        videoRef.current.srcObject = new MediaStream([video]);

        videoRef.current.play();
    }


    useEffect(() =>{
        if (videoRef && videoRef.current) {
            getCam()
        }
    }, [videoRef])

    if(!joined){
        return <div>
            <h2>
                Let Go {name} !
            </h2>
            <video autoPlay ref={videoRef}></video>
             <label>Your Name : </label>
            <input onChange={(e) => {
                setName(e.target.value)
                }
            }>
            </input>
            <button onClick={() => setJoined(true)}>Let's Go</button>
        </div>
    }

    return <Room></Room>
}