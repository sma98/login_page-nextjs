'use client'
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Layout = (props: { auth: boolean; children: React.ReactNode }) => {

    const router = useRouter();


    const logout = async () => {
        await fetch('http://localhost:4000/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        await router.push('/');
    };


    let menu;
    if (!props.auth) {
        menu = (
            <ul className="navbar-nav flex items-center space-x-4 ml-auto" >
                <li className="nav-item">
                    <Link href="/" className="nav-link active text-white">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/register" className="nav-link active text-white">
                        Register
                    </Link>
                </li>
            </ul>
        );
    } else {
        menu = (
            <ul className="navbar-nav flex items-center space-x-4 ml-auto">
                <li className="nav-item ">
                    <a href="/" className="nav-link active text-white" onClick={logout}>
                        Logout
                    </a>
                </li>
            </ul>
        );
    }


    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-blue-500 mb-4 border-b-4 border-white h-16">
                <div className="container-xl">{menu}</div>
            </nav>

            <main className="form-signin">{props.children}</main>
        </>
    );
};


export default Layout;
