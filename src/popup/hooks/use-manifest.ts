import {useEffect, useState} from "react";

export default function useManifest(): chrome.runtime.Manifest {
    const [manifest, setManifest] = useState<chrome.runtime.Manifest>({
        manifest_version: 3,
        name: "",
        version: ""
    });

    useEffect(function () {
        setManifest(chrome.runtime.getManifest());
    }, []);

    return manifest;
}
