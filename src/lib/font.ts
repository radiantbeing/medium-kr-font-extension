import log from "./log";

type Font = {
    value: string;
    name: string;
    style: "sans-serif" | "serif";
    cssPath: string;
};

function isFont(item: unknown): item is Font {
    if (typeof item !== "object" || item === null) {
        return false;
    }
    const font = item as Font;
    return (
        typeof font.value === "string" &&
        typeof font.name === "string" &&
        (font.style === "sans-serif" || font.style === "serif") &&
        typeof font.cssPath === "string"
    );
}

async function getFonts(): Promise<Font[]> {
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

export {type Font};
export default Object.freeze({
    getAll: getFonts
});
