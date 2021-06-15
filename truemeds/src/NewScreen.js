import React from 'react';
import { useState, useEffect } from 'react';
import './NewScreen.css';
import axios from 'axios';

export default function NewScreen(props) {
    const {initialMinute = 1,initialSeconds = 0} = props;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);

  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    console.log(userToken);
    return userToken;
  };

    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        if(minutes === 0 && seconds === 0){
         axios.post(`https://stage-services.truemeds.in/ArticleService/getArticleListing`,"",
         {
             headers: {
           "Authorization" : `${getToken()}` //error regarding cors
         }
       })
       .then((res) => {
           console.log(res.data)
         })
       .catch((error) => {
           console.error(error)
         })
        }
        return ()=> {
            clearInterval(myInterval);
          };
    });

    function resetTimer(){
        setMinutes(initialMinute);
        setSeconds(initialSeconds);
    }
    function logOut(){
        sessionStorage.removeItem("token");
        props.history.goBack();
    }
    return (
        <div>
        { minutes === 0 && seconds === 0
            ? 
            <div className="article-container">
                <button onClick={resetTimer}>Reset Timer</button>
                <button onClick={logOut}>Log Out</button>
            </div>
            : <div className="countdown-container"> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</div> 
        }
        </div>
    );
}
