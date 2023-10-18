import React, { useState } from "react";
import logo from '../src/assets/images/logo.png'
import backg2 from './assets/images/banner-image-1-1920x500.jpg';
import { Link, useNavigate } from "react-router-dom";
import { authorizeMe, signIn } from "./service";
import './List.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState({
        isEmail: false,
        messageEmail: "Email is requeired.",
        isPassword: false,
        messagePassword: "Password is requeired."
    });
    const [isDisble, setIsDisable] = useState(false)
    const navigate = useNavigate()



    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (elements) => {
        setIsDisable(true)
        setLoader(true);
        elements.preventDefault();
        var obj = {
            "email": elements?.target[0]?.value,
            "password": elements?.target[1]?.value
        }
        setError({ ...error, isEmail: !obj.email ? true : false, isPassword: !obj.password ? true : false })
        if (obj?.email && obj?.password) {
            var res = await signIn(obj)
            if (res?.data?.status) {
                authorizeMe(res?.data?.data?.token)
                localStorage.setItem('Token', res?.data?.data?.token);
                localStorage.setItem('User', JSON.stringify(res?.data?.data?.user));
                navigate('/list')
                window.location.reload();
                setIsDisable(false)
            } else if (!res?.data?.status) {
                console.log(res);
                setIsDisable(false)
                setLoader(false);

            }
        }

        setTimeout(() => {
            setIsDisable(false)
        }, 5000)
    };

    return (
        <div>
            <div>
                <div>
                </div>
                <div className="row d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                    <div className="col-lg-6 d-flex justify-content-center align-items-center section section-bg" style={{ backgroundImage: `url(${backg2})`, height: "100%" }}>
                        <img src={logo} alt="" style={{ width: "100%", zIndex: "99" }} />
                    </div>
                    <div className="col-lg-6 d-flex justify-content-center align-items-center">
                        <div className="loginScreen">
                            <h1>Login</h1>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <input type="email" value={email} onChange={handleEmailChange} placeholder="Enter your Email" />
                                    {error?.isEmail && <p style={{ color: "red" }}> {error?.messageEmail}</p>}
                                </div>
                                <div>
                                    <input type="password" value={password} onChange={handlePasswordChange} placeholder="Enter Your Password" />
                                    {error?.isPassword && <p style={{ color: "red" }}> {error?.messagePassword}</p>}
                                </div>

                                <button className={isDisble ? "restrict" : ""} disabled={isDisble} type="submit">{!loader ? 'Login' : <span class="loader"></span>} </button>
                                {/* <Link to="/list">
                                    <button type="submit">Login</button>
                                </Link> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
