import {type JSX} from "react";
import useMediumTabActive from "../hooks/use-medium-tab-active";

export default function Indicator(): JSX.Element {
    const isMediumTab = useMediumTabActive();
    return isMediumTab ? (
        <p className="indicator-active">확장 프로그램이 작동 중입니다.</p>
    ) : (
        <p className="indicator-inactive">현재 탭은 Medium이 아닙니다.</p>
    );
}
