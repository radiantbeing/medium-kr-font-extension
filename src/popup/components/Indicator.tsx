import {type JSX} from "react";
import useMediumTabActive from "../hooks/use-medium-tab-active";

export default function Indicator(): JSX.Element {
    const isMediumTab = useMediumTabActive();
    return <p>{isMediumTab ? "" : "접속 중인 탭은 Medium이 아닙니다."}</p>;
}
