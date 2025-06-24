import {useEffect, useState} from "react";
import font, {type Font} from "../../lib/font";

interface UseFontsReturn {
    fonts: Font[];
    sansSerifFonts: Font[];
    serifFonts: Font[];
}

export default function useFonts(): UseFontsReturn {
    const [fonts, setFonts] = useState<Font[]>([]);

    const sansSerifFonts = fonts.filter((f) => f.style === "sans-serif");
    const serifFonts = fonts.filter((f) => f.style === "serif");

    useEffect(function () {
        let ignore = false;
        async function loadAllFonts(): Promise<void> {
            if (!ignore) {
                const loadedFonts = await font.getAll();
                loadedFonts.sort(function (a, b) {
                    if (a.style !== b.style) {
                        return a.style.localeCompare(b.style);
                    }
                    return a.name.localeCompare(b.name);
                });
                setFonts(loadedFonts);
            }
        }
        loadAllFonts();
        return function () {
            ignore = true;
        };
    }, []);

    return {
        fonts,
        sansSerifFonts,
        serifFonts
    };
}
