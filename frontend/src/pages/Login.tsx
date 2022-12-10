import React, { useState } from 'react';
import SignIn from '../components/SignIn';

export default function Login() {
    return (
        <div className="relative flex flex-col bg-black justify-center min-h-screen overflow-hidden">
            <SignIn />
        </div>
    );
}