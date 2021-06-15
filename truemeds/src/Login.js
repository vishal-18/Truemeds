import React, {useState, useRef, useEffect} from 'react';
import './Login.css';
import axios from 'axios';

export default function Login(props) {
    const [value, setValue] = useState();
    const [otp,setOtp] = useState();
    const inputValue = useRef();
    const otpValue = useRef();

       useEffect(() => {
           if(value){
          axios.post(`https://stage-services.truemeds.in/CustomerService/sendOtp?mobileNo=${value}`,"",
          {
              headers: {
            "transactionId" : "react_interview"
          }
        })
        .then((res) => {
            console.log(res.data)
          })
        .catch((error) => {
            console.error(error)
          })
    }
      }, [value]);

    useEffect(()=>{
        if(otp){
            console.log(otp);
            axios.post(`https://stage-services.truemeds.in/CustomerService/verifyOtp?mobileNo=${value}&otp=${otp}&deviceKey=abcd&isIos=false&source=react_interview`,"",
            {
                headers: {
              "transactionId" : "react_interview"
            }
          })
          .then((res) => {
            const token=res.data.Response.access_token;
            if(token){
                sessionStorage.setItem('token', JSON.stringify(token));
                 props.history.push("/newscreen");
            }
               console.log(res.data);
              console.log(res.data.Response.access_token);
            })
          .catch((error) => {
              console.error(error)
            })

        }
    },[otp])

    function getOtp(e){
        // const regEx= new RegExp('^[6-9]\d{9}$');
        // const validNumber=regEx.test(inputValue.current.value);
         if(inputValue.current.value!==undefined && inputValue.current.value.length===10){
            e.preventDefault();
        setValue(inputValue.current.value);
            console.log(inputValue.current.value);
        }
    }

    function submit(e){
         if(otpValue.current.value!==undefined && otpValue.current.value.length===4){
            e.preventDefault();
            setOtp(otpValue.current.value);
            console.log(inputValue.current.value);

        }
    }
  return(
    <div className="login-container">
    <h2>Please Log In</h2>
    <form className="form-wrapper">
    <input
      placeholder="Enter phone number"
      type="number"
      maxLength="10"
      minLength="10"
      pattern="[6-9]{1}[0-9]{9}"
      required
      ref={inputValue}
      className="input-element"
       />
      <div className="otp-wrapper">
        <button onClick={getOtp}>Get Otp</button>
        <input
        placeholder="Enter Otp"
        type="number"
        maxLength="4"
        ref={otpValue}
       />
      </div>
      <button onClick={submit}>Submit</button>
      </form>
    </div>
  )
}
