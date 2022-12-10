import React, { useState, useRef } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'




function SignIn() {
    const [signIn, setSignIn] = useState(true)
    const aliasRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null)
    const passwordRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null)
    const nameRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null)
    const navigate = useNavigate()
    const submit = async () => {

        let name = nameRef.current?.value, alias = aliasRef.current?.value, password = passwordRef.current?.value
        console.log(name, alias, password)

        if (!signIn) {

            let resp = await fetch('http://localhost:5000/users/register', {
                method: 'POST',
                body: JSON.stringify({ name, alias, password }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'

            })
            if (resp) {
                setSignIn(true)
            }

        }
        else {
            let resp = await fetch('http://localhost:5000/users/login', {
                method: 'POST',
                body: JSON.stringify({ username: alias, password }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, credentials: 'include'

            })
            console.log(resp.headers.get('set-cookie'))
            if (resp.status === 200) {
                navigate('/chat')
            }
        }

    }


    return (
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="font-black text-left text-2xl">
                {signIn ? "Login" : "Register"}
            </h1>
            <form
                onSubmit={
                    (e) => {
                        e.preventDefault()
                        submit()
                    }
                } className="mt-6">
                <div className="mb-2">
                    <label
                        htmlFor="userName"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        User Name
                    </label>
                    <input
                        ref={aliasRef}
                        type="userName"
                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
                {!signIn && <div className="mb-2">
                    <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Name
                    </label>
                    <input
                        ref={nameRef}
                        type="name"
                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>}
                <div className="mb-2">
                    <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Password
                    </label>
                    <input
                        ref={passwordRef}
                        type="password"
                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>

                <div className="mt-6">
                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                        {signIn ? "Login" : "Register"}
                    </button>
                </div>
            </form>

            <p className="mt-8 text-xs font-light text-center text-gray-700">
                {" "}
                {signIn ? "Don't " : "Already "}
                have an account?{" "}
                <span
                    onClick={() => { setSignIn(!signIn) }}
                    className="font-medium text-purple-600 hover:underline "
                >
                    Register
                </span>
            </p>
        </div >
    )
}

export default SignIn