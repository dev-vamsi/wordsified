import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import config from "../config";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { Login, SignUp } = config.AuthEndPoint;
        const formData = new FormData(e.target);
        const reqUrl = config.BackendBaseURL + (isLogin ? Login : SignUp);
        const body = {
            email: formData.get("email"),
            password: formData.get("password"),
        };
        if (!isLogin) {
            body["name"] = formData.get("name");
        }
        const response = await fetch(reqUrl, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <>
            <form
                className="flex flex-col items-center"
                onSubmit={handleFormSubmit}
            >
                {!isLogin && (
                    <Input placeholder="Enter your name..." name="name" />
                )}
                <Input
                    placeholder="Enter your email..."
                    name="email"
                    type="email"
                />
                <Input
                    placeholder="Enter your password..."
                    name="password"
                    type="password"
                />
                <Button
                    text={
                        <>
                            {isLogin ? "Login" : "Sign Up"}
                            <i className="fa-solid fa-right-to-bracket ml-2"></i>
                        </>
                    }
                />
            </form>
            {isLogin ? (
                <p className="text-sm text-center my-2">
                    New to Wordsified?{" "}
                    <span
                        className="text-[#4379F2] cursor-pointer"
                        onClick={() => setIsLogin(false)}
                    >
                        Sign Up
                    </span>
                </p>
            ) : (
                <p className="text-sm text-center my-2">
                    Already have an account?{" "}
                    <span
                        className="text-[#4379F2] cursor-pointer"
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </span>
                </p>
            )}
            <div className="flex items-center gap-3">
                <div className="w-full h-[1px] bg-gray-700" />
                OR
                <div className="w-full h-[1px] bg-gray-700" />
            </div>
            {/* TODO: yet to implement the functionality for google and twitter */}
            <div className="flex items-center justify-center">
                <Button
                    text={<i className="fa-brands fa-google"></i>}
                    bgColor="#D91656"
                />
                <Button
                    text={<i className="fa-brands fa-x-twitter"></i>}
                    bgColor="#D91656"
                />
            </div>
        </>
    );
};

export default Auth;
