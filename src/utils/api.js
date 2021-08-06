import axios from "axios";

const FileDownload = require('js-file-download')
const endpoint = 'http://67.207.80.164:5000';
export async function fetchVideoInfo(url){
    try {
        const response =  await axios.get(`${endpoint}/video-info?url=${url}`);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
        throw new Error(
            `Error Occurred - status code: ${response.status}`
        );
    } catch (error) {
        console.error(error);
    }
}
export function downloadManualSrt(lang, videoUrl, name, title){
    axios.get(`${endpoint}/manual_srt_download`, {
        params: {
            url: videoUrl,
            lang: lang
        }
    }).then((res) => {
        FileDownload(res.data, `[${name}]${title}[Checksub.com].srt`)
    })
}

export function downloadManualTxt(lang, videoUrl, name, title){
    axios.get(`${endpoint}/manual_txt_download`, {
        params: {
            url: videoUrl,
            lang: lang
        }
    }).then((res) => {
        FileDownload(res.data, `[${name}]${title}[Checksub.com].txt`)
    })
}

export function downloadAutomaticSrt(lang, videoUrl, name, title){
    axios.get(`${endpoint}/automatic_srt_download`, {
        params: {
            url: videoUrl,
            lang: lang
        }
    }).then((res) => {
        FileDownload(res.data, `[${name}]${title}[Checksub.com].srt`)
    })
}

export function downloadAutomaticTxt(lang, videoUrl, name, title){
    axios.get(`${endpoint}/automatic_txt_download`, {
        params: {
            url: videoUrl,
            lang: lang
        }
    }).then((res) => {
        FileDownload(res.data, `[${name}]${title}[Checksub.com].txt`)
    })
}
