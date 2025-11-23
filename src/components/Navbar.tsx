"use client";

import React from "react";
import GlassSurface from "./GlassSurface";
import Image from "next/image";
import { useTheme } from "@/hooks/ThemeContext";
import nextSvg from "../../public/next.svg";

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="fixed w-full top-5 flex justify-center items-center z-10">
            <GlassSurface
                width="95vw"
                height="auto"
                borderRadius={24}
            >
                <div className="flex justify-between items-center w-full py-5">
                    <Image src={nextSvg} alt="Logo" width={50} height={50} />

                    <ul className="flex gap-6 items-center">
                        <li className="cursor-pointer">Home</li>
                        <li className="cursor-pointer">About</li>
                        <li className="cursor-pointer">Projects</li>
                        <li>
                            <button className="px-3 py-1 rounded bg-green-500 dark:bg-green-700">
                                Hire Me
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={toggleTheme}
                                className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 capitalize"
                            >
                                {theme}
                            </button>
                        </li>
                    </ul>
                </div>
            </GlassSurface>
        </div>
    );
};

export default Navbar;
