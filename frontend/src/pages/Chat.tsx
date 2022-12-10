import React, { useEffect, useState, useRef } from "react";
import { Navigate, redirect } from "react-router-dom";
import io from 'socket.io-client'

interface Message {
    alias: string,
    message: string,
}
interface User {
    userName: string,
    userId: string,
}

function Chat() {

    const msgref: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
    const [chat, setChat] = useState<Message[]>([]);
    const [isConnected, setIsConnected] = useState(false)
    const [toLogin, setToLogin] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const socketref: React.MutableRefObject<any> = useRef()

    const InitSockets = () => {
        if (socketref.current === undefined)
            socketref.current = io('http://localhost:8000');

        socketref.current.connect()
        socketref.current.on('connect', () => {
            setIsConnected(true);
        });
        socketref.current.on('disconnect', () => {
            setIsConnected(false);
        });
        socketref.current.on('recMessage', (message: { data: Message }) => {
            console.log(message)

            setChat((chat) => [...chat, message.data])
        });
    }
    const CleanSockets = () => {
        if (!socketref.current)
            return;
        socketref.current.disconnect()
        socketref.current.off('connect');
        socketref.current.off('disconnect');
        socketref.current.off('recMessage');
    }
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
            InitSockets()

        }).catch(() => {
            console.log('USRE')
            setToLogin(true)

        })
        return CleanSockets

    }, [])

    if (toLogin) {
        return <Navigate to='/' />
    }

    return (
        <div className="flex w-screen main-chat lg:h-screen bg-black divide-solid">
            <div className="flex w-full shadow-md">
                {/* Users online */}  <button
                    className="absolute right-5 top-5 h-10  text-white text-base font-semibold py-2 px-4 shadow-md bg-blue-700 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2"
                    onClick={(e) => {
                        setToLogin(true)
                    }}
                >
                    Home
                </button>
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
                                        `${el.alias}: ${el.message}`
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
                                    ref={msgref}
                                    type="text"
                                    className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-1 lg:px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none"
                                />
                            </div>
                            <div className="hidden lg:block w-1/6">
                                <button
                                    className="ml-8 flex-shrink-0 text-white text-base font-semibold py-2 px-4 shadow-md bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (user)
                                            socketref.current?.emit('sendMessage', { data: { message: msgref.current?.value, alias: user.userName } });
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