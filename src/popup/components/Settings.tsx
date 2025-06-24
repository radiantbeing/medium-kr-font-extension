import {type JSX, type FormEvent, type ChangeEvent} from "react";
import useFonts from "../hooks/use-fonts";
import useSettings from "../hooks/use-settings";
import {type Settings} from "../../lib/settings";

export default function Settings(): JSX.Element {
    const {sansSerifFonts, serifFonts} = useFonts();
    const {settings, changeSettings, applySettings} = useSettings();

    function handleChange<K extends keyof Settings>(
        e: ChangeEvent<HTMLSelectElement>
    ): void {
        const {name, value} = e.target;
        changeSettings(name as K, value as Settings[K]);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        applySettings();
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>환경 설정</legend>
                <label>
                    글꼴
                    <select
                        name="font-family"
                        value={settings["font-family"]}
                        onChange={handleChange}
                    >
                        <option value="">설정 안 함</option>
                        <optgroup label="시스템 기본값">
                            <option value="sans-serif">Sans Serif</option>
                            <option value="serif">Serif</option>
                        </optgroup>
                        <optgroup label="Sans Serif">
                            {sansSerifFonts.map(({id, name}) => (
                                <option key={id} value={id}>
                                    {name}
                                </option>
                            ))}
                        </optgroup>
                        <optgroup label="Serif">
                            {serifFonts.map(({id, name}) => (
                                <option key={id} value={id}>
                                    {name}
                                </option>
                            ))}
                        </optgroup>
                    </select>
                </label>
            </fieldset>
            <input type="submit" value="적용" />
        </form>
    );
}
