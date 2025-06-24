import {type JSX} from "react";
import useMediumTabActive from "../hooks/use-medium-tab-active";

export default function Information(): JSX.Element {
    const isMediumTab = useMediumTabActive();
    return isMediumTab ? (
        <p className="information-positive">확장 프로그램이 작동 중입니다.</p>
    ) : (
        <p className="information-negative">
            확장 프로그램은 'medium.com' 도메인에서 작동합니다.
        </p>
    );
}
