import {ImageEditorFocusCallbackParams} from "./ImageEditorFocusCallbackParams";
import {CSSProperties} from "react";

export interface ImageEditorProp {
    imageSrc: string | null | undefined,
    toggleActiveCallback?: ((params: ImageEditorFocusCallbackParams) => void) | undefined,
    elementStyle?: CSSProperties | undefined,
    caption?: string | null | undefined
}

export interface ImageEditorState {
    imageSrc: string | null | undefined,
    renderMedia: false,
    toggleActiveCallback?: ((params: ImageEditorFocusCallbackParams) => void) | undefined,
    elementStyle?: CSSProperties | undefined,
    caption?: string | null | undefined
}
