"use client";

import React, { useEffect, useState } from "react";
import GlassSurface from "./GlassSurface";
import Image from "next/image";
import { useTheme } from "@/hooks/ThemeContext";
import nextSvg from "../../public/next.svg";

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div
            className="fixed top-5 z-10 left-1/2 -translate-x-1/2 w-[95%]"
        >
            <GlassSurface width="100%" height="auto" borderRadius={24}>
                <div className="flex justify-between items-center w-full">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        {isMobile && (
                            <label className="hamburger cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={menuOpen}
                                    onChange={() => setMenuOpen((prev) => !prev)}
                                />
                                <svg viewBox="0 0 32 32">
                                    <path
                                        className="line line-top-bottom"
                                        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                                    ></path>
                                    <path className="line" d="M7 16 27 16"></path>
                                </svg>
                            </label>
                        )}
                        <Image src={nextSvg} alt="Logo" width={50} height={10} />
                    </div>
                    {/* Desktop Menu */}
                    <div className="flex items-center gap-5">
                        {!isMobile && (
                            <ul className="flex gap-6 items-center">
                                <li className="navbar-item-text">Home</li>
                                <li className="navbar-item-text">About</li>
                                <li className="navbar-item-text">Projects</li>

                                <li>
                                    <div className="button-borders">
                                        <button className="primary-button">
                                            Hire Me
                                        </button>
                                    </div>
                                </li>

                                {/* Theme toggle */}
                            </ul>
                        )}
                        <div >
                            <label htmlFor="switch" className="toggle">
                                <input type="checkbox" className="input" id="switch" checked={theme === "light"} onChange={toggleTheme} />
                                <div className="icon icon--moon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        width="20"
                                        height="20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>

                                <div className="icon icon--sun">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        width="20"
                                        height="20"
                                    >
                                        <path
                                            d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
                                        ></path>
                                    </svg>
                                </div>
                            </label>
                        </div>
                    </div>
                    {/* Mobile Hamburger */}
                </div>

                {/* Mobile Menu — Expanding Area */}
                {isMobile && (
                    <div
                        className={`
                            overflow-hidden transition-all duration-300 !mt-4 !mb-4
                            ${menuOpen ? "!px-12 flex flex-col" : "max-h-0 hidden"}
                        `}
                    >
                        <ul className="flex flex-col items-start gap-4 text-center">
                            <li className="navbar-item-text">Home</li>
                            <li className="navbar-item-text">About</li>
                            <li className="navbar-item-text">Projects</li>

                            <li>
                                <div className="button-borders mx-auto">
                                    <button className="primary-button w-full">
                                        Hire Me
                                    </button>
                                </div>
                            </li>

                            {/* <div >
                                <label htmlFor="switch" className="toggle">
                                    <input type="checkbox" className="input" id="switch" checked={theme === "light"} onChange={toggleTheme} />
                                    <div className="icon icon--moon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            width="20"
                                            height="20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>

                                    <div className="icon icon--sun">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            width="20"
                                            height="20"
                                        >
                                            <path
                                                d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
                                            ></path>
                                        </svg>
                                    </div>
                                </label>
                            </div> */}
                        </ul>
                    </div>
                )}
            </GlassSurface>
        </div>
    );
};

export default Navbar;
