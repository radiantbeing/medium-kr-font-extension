import log from "./log";

type Font = {
    id: string;
    name: string;
    type: "sans-serif" | "serif";
    cssSrc: string;
};

function isFont(item: unknown): item is Font {
    if (typeof item !== "object" || item === null) {
        return false;
    }
    const font = item as Font;
    return (
        typeof font.id === "string" &&
        typeof font.name === "string" &&
        (font.type === "sans-serif" || font.type === "serif") &&
        typeof font.cssSrc === "string"
    );
}

async function getAllFonts(): Promise<Font[]> {
    try {
        const response = await fetch(
            chrome.runtime.getURL("fonts/metadata.json")
        );
        if (!response.ok) {
            throw new Error("NETWORK_ERROR");
        }
        const fonts = await response.json();
        if (!fonts.every(isFont)) {
            throw new Error("INVALID_FONT");
        }
        return fonts;
    } catch (error) {
        log.error(
            "글꼴 메타데이터를 가져올 수 없습니다: ",
            error instanceof Error ? error.message : error
        );
        return [];
    }
}

export {type Font, getAllFonts};
export default Object.freeze({
    getAll: getAllFonts
});
