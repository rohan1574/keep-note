import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = ({ user }) => {
    return (
        <div>

            <section
                class="relative bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat"
            >
                <div
                    class="absolute inset-0 bg-white sm:bg-[#000000bd] sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
                ></div>

                <div
                    class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
                >
                    <div class="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                        <h1 class="text-3xl text-white font-extrabold sm:text-5xl pb-5">
                            Welcome to 
    
                        </h1>
                        <strong class="block font-extrabold text-white text-2xl"> {user?.displayName} </strong>
                        <div class="mt-8 flex flex-wrap gap-4 text-center">
                            <Link to='/Dashboard'

                                class="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 "
                            >
                                Go to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WelcomePage;