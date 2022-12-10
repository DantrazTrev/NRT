import React, { useEffect, useState } from "react";
import { Navigate, redirect } from "react-router-dom";
import io from 'socket.io-client'

const socket = io('https://localhost:8000');
console.log(socket)
function Chat() {

    const [msg, setMsg] = useState("");
    const [chat, setChat] = useState([]);
    const [isConnected, setIsConnected] = useState(false)
    const [toLogin, setToLogin] = useState(false);
    const [user, setUser] = useState({ userId: null, alias: null });

    useEffect(() => {
        fetch('http://localhost:5000/users/protected', { credentials: 'include' }).then((res) => {
            console.log(res)
            if (res.status !== 200) {
                setToLogin(true)
            }
            else {
                return res.json()
            }
        }).then((data) => {
            setUser(data)
            socket.on('connect', () => {
                setIsConnected(true);
            });
            socket.on('disconnect', () => {
                setIsConnected(false);
            });
            socket.on('recMessage', (data) => {
                console.log(data)
                // setChat((oldmsg) => {
                //     let messages = oldmsg
                //     messages.push()
                //     return messages
                // });
            });

        }).catch(() => {
            console.log('USRE')
            setToLogin(true)

        })
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        };

    }, [])

    if (toLogin) {
        return <Navigate to='/' />
    }

    return (
        <div className="flex w-screen main-chat lg:h-screen bg-black divide-solid">
            <div className="flex w-full shadow-md">
                {/* Users online */}

                <div className="flex flex-col flex-grow lg:max-w-full bg-purple-50">
                    {/* Messages */}
                    <p className="font-black mt-4 mb-2 pl-4 lg:pl-8 text-2xl">
                        Main Chat
                    </p>
                    <div
                        id="msg"
                        className="h-5/6 overflow-y-auto pl-4 lg:pl-8 pt-4 mb-2 lg:mb-0"
                    >
                        <ul className="w-full lg:w-96">
                            {chat.map((el, index) => (
                                <li
                                    key={index}
                                    className="w-screen break-words pr-6 lg:pr-0 lg:w-full"
                                >
                                    {el != null ? (
                                        `${el}: ${el}`
                                    ) : (
                                        <p className="text-base font-semibold text-purple-900 rounded py-1">
                                            {el}
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <form className="">

                        <div className="w-full flex p-4 lg:p-8 bg-purple-50">
                            {" "}
                            <div className="flex relative w-full lg:w-5/6">

                                <input
                                    type="text"
                                    className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-1 lg:px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none"
                                    name="message"
                                    onChange={(e) => setMsg(e.target.value)}
                                    value={msg}
                                />
                            </div>
                            <div className="hidden lg:block w-1/6">
                                <button
                                    className="ml-8 flex-shrink-0 text-white text-base font-semibold py-2 px-4 shadow-md bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        socket.emit('sendMessage', { alias: user.alias, message: msg });
                                    }}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chat;