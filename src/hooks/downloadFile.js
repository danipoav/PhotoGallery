import { saveAs } from "file-saver";

export default function downloadFile(url, name) {

    const nameFile = name + '.jpg';
    saveAs(url, nameFile)
}
