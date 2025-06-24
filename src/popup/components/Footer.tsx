import {type JSX} from "react";
import useManifest from "../hooks/use-manifest";

export default function Footer(): JSX.Element {
    const manifest = useManifest();
    return (
        <footer>
            <span>v{manifest.version}</span>
            <a
                href="https://github.com/radiantbeing/medium-kr-font-extension"
                target="_blank"
                rel="noopener noreferrer"
            >
                소스 코드
            </a>
        </footer>
    );
}
