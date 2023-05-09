import { Theme } from "@react-navigation/native";
import { Insets } from "react-native/types";

export const PALETTE = {
    dark00: '#000000',
    dark10: '#202020',
    dark20: '#151515',
    red: '#ec1d24',
    white: '#ffffff',
    subtle: '#BBBBBB',
}

export const DEFAULT_SPACING = 8;
export const DEFAULT_HITSLOP = 10;
export const DEFAULT_ACTIVE_OPACITY_BUTTON = 0.6

interface ColorClassification {
    [name: string]: string;
}

export interface MarvelTheme extends Theme {
    defaultOpacity: number,
    hitSlop: number,
    hitSlopInsets: Insets,
    spacing: number,
    text: {
        primary: string;
        secondary: string;
        subtle: string;
    },
    background: {
        primary: string;
        card: string;
    }
    [classification: string]: ColorClassification | boolean | Insets | number
}

export const lightTheme: MarvelTheme = {
    defaultOpacity: DEFAULT_ACTIVE_OPACITY_BUTTON,
    hitSlop: DEFAULT_HITSLOP,
    hitSlopInsets: { bottom: DEFAULT_HITSLOP, left: DEFAULT_HITSLOP, right: DEFAULT_HITSLOP, top: DEFAULT_HITSLOP },
    spacing: DEFAULT_SPACING,
    colors: {
        background: PALETTE.white,
        border: PALETTE.dark10,
        card: PALETTE.white,
        notification: PALETTE.red,
        primary: PALETTE.red,
        text: PALETTE.dark20,
    },
    dark: false,
    background: {
        primary: PALETTE.red,
        card: PALETTE.dark20,
    },
    text: {
        primary: PALETTE.white,
        secondary: PALETTE.dark00,
        subtle: PALETTE.subtle
    }
};

export const darkTheme: MarvelTheme = {
    defaultOpacity: DEFAULT_ACTIVE_OPACITY_BUTTON,
    hitSlop: DEFAULT_HITSLOP,
    hitSlopInsets: { bottom: DEFAULT_HITSLOP, left: DEFAULT_HITSLOP, right: DEFAULT_HITSLOP, top: DEFAULT_HITSLOP },
    spacing: DEFAULT_SPACING,
    colors: {
        background: PALETTE.dark10,
        border: PALETTE.subtle,
        card: PALETTE.dark10,
        notification: PALETTE.red,
        primary: PALETTE.white,
        text: PALETTE.white,
    },
    dark: true,
    background: {
        primary: PALETTE.red,
        card: PALETTE.dark20,
    },
    text: {
        primary: PALETTE.white,
        secondary: PALETTE.white,
        subtle: PALETTE.subtle
    }
};