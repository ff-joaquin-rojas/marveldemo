import { createContext, SetStateAction } from "react";

export enum AvailableThemes {
    System = 'System',
    Light = 'Light',
    Dark = 'Dark',
    Colorblind = 'Colorblind'
}

export const themeContext = createContext({
    theme: AvailableThemes.System,
    setTheme: (theme: AvailableThemes) => { }
});
