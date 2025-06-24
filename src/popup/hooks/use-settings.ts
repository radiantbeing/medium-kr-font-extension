import {useEffect, useState} from "react";
import extensionSettings, {type Settings} from "../../lib/settings";

interface UseSettingsReturn {
    settings: Settings;
    changeSettings<K extends keyof Settings>(key: K, value: Settings[K]): void;
    applySettings(): void;
}

export default function useSettings(): UseSettingsReturn {
    const [settings, setSettings] = useState<Settings>({});

    useEffect(function () {
        let ignore = false;
        async function loadSettings() {
            const loadedSettings = await extensionSettings.getAll();
            if (!ignore) {
                setSettings(loadedSettings);
            }
        }
        loadSettings();
        return function () {
            ignore = true;
        };
    }, []);

    function changeSettings<K extends keyof Settings>(
        key: K,
        value: Settings[K]
    ): void {
        setSettings({...settings, [key]: value});
    }

    function applySettings(): void {
        (Object.keys(settings) as (keyof Settings)[]).forEach((key) =>
            extensionSettings.set(key, settings[key])
        );
    }

    return {
        settings,
        changeSettings,
        applySettings
    };
}
