import { createContext, SetStateAction } from "react";

export enum AvailableThemes {
    System = 'System',
    Light = 'Light',
    Dark = 'Dark',
    Daltonism = 'Daltonism'
}

export const themeContext = createContext({
    theme: AvailableThemes.System,
    setTheme: (theme: AvailableThemes) => { }
});
