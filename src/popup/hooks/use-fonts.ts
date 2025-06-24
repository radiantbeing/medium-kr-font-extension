import {useEffect, useState} from "react";
import {type Font, compareFonts, getAllFonts} from "../../lib/font";

interface UseFontsReturn {
    fonts: Font[];
    sansSerifFonts: Font[];
    serifFonts: Font[];
}

export default function useFonts(): UseFontsReturn {
    const [fonts, setFonts] = useState<Font[]>([]);

    const sansSerifFonts = fonts.filter((f) => f.type === "sans-serif");
    const serifFonts = fonts.filter((f) => f.type === "serif");

    useEffect(function () {
        let ignore = false;
        async function loadAllFonts(): Promise<void> {
            if (!ignore) {
                const loadedFonts = await getAllFonts();
                loadedFonts.sort(compareFonts);
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
