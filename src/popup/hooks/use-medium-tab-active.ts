import {useEffect, useState} from "react";

async function isCurrentTabMedium(): Promise<boolean> {
    const tabs = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    });
    const currentTab = tabs[0];

    if (currentTab.url === undefined) {
        return false;
    }

    // 현재 활성화된 탭의 URL이 `medium.com`을 포함하면 Medium에 접속 중인 것으로 판단합니다.

    if (currentTab.url.includes("medium.com")) {
        return true;
    } else {
        return false;
    }
}

export default function useMediumTabActive(): boolean {
    const [isMediumTab, setIsMediumTab] = useState<boolean>(false);

    useEffect(function () {
        let ignore = false;
        async function detectCurrentTabMedium() {
            const result = await isCurrentTabMedium();
            if (!ignore) {
                setIsMediumTab(result);
            }
        }
        detectCurrentTabMedium();
        return function () {
            ignore = true;
        };
    }, []);

    return isMediumTab;
}
