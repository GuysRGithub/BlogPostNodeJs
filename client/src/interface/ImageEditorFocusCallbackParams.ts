import {getSrcFromPostContent, removePostImageFromPostContent} from "../helpers/data_process_helper";
import ImageEditor from "../views/components/EditorComponents/ImageEditor";

export interface ImageEditorFocusCallback {
    focus: boolean,
    ref: ImageEditor
}