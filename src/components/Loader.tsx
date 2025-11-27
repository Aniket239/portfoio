"use client";

import TextType from "./TextType";

export default function Loader() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-lg">
            <TextType
                text={["Aniket Biswas"]}
                typingSpeed={100}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
            />
        </div>
    );
}
