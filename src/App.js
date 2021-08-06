import React, {useCallback, useReducer, useEffect, useRef} from 'react'
import logo from './mainLogo.svg';
import './App.css';
import {fetchVideoInfo, downloadAutomaticSrt, downloadAutomaticTxt, downloadManualSrt, downloadManualTxt} from './utils/api';
import ReactCountryFlag from "react-country-flag";
import {getCountryName, reConvertCode, reCaptions} from "./Country";
import {Link, useLocation} from "react-router-dom";
import Loader from "react-loader-spinner";

const initialState = {
    autoCaptions: [],
    manualCaptions: [],
    videoThumbnail: '',
    videoTitle: '',
    videoDuration: null,
    downInfoState: false
}
function reducer(state, action) {
    switch (action.type) {
        case 'SET_VIDEO_INFO':
            return {
                ...state,
                autoCaptions: Object.keys(reCaptions(action.data.content['automatic_captions'])).map((key, index) => {
                    return {
                        flag: key,
                        value: action.data.content['automatic_captions'][key],
                        countryCode: reConvertCode(key).toUpperCase(),
                        countryName: getCountryName(key)
                    }
                }),
                manualCaptions: Object.keys(action.data.content['subtitles']).map((key, index) => {
                    return {
                        flag: key,
                        value: action.data.content['subtitles'][key],
                        countryCode: reConvertCode(key).toUpperCase(),
                        countryName: getCountryName(key)
                    }
                }),
                videoThumbnail: action.data.content.thumbnail,
                videoTitle: action.data.content.title,
                videoDuration: new Date(action.data.content.duration * 1000).toISOString().substr(11, 8),
                downInfoState: true
            };
        default:
            return state;
    }
}
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const App = () => {
    let query = useQuery();
    const [state, dispatch] = useReducer(reducer, initialState);
    const {autoCaptions, manualCaptions, videoThumbnail, videoTitle, videoDuration, downInfoState} = state;
    const videoUrl = useRef(query.get('videoUrl'));
    const updateVideoUrl = useCallback(e => {
        videoUrl.current = e.target.value;
    }, [])
    const download = async () => {
        const result = await fetchVideoInfo(videoUrl.current);
        console.log(result['automatic_captions']);
        dispatch({
            type: 'SET_VIDEO_INFO',
            data: {
                content: result
            }
        })
    }
    useEffect(() => {
        setTimeout(download, 100);
    }, [])
    const demo = () => {
        window.location.href= 'https://my.checksub.com/'
    }
    return (
        <div className='main'>
            <div className='header'>
                <div className='logo'>
                    <img src={logo} style={{width: 101, height: 19}} alt='logo'/>
                </div>
                <div className='menu'>
                    <div className='item'>
                        <a href='#' style={{textDecoration: 'none', color: 'white'}}>Product</a>
                    </div>
                    <div className='item'>
                        <a href='https://www.checksub.com/pricing' style={{textDecoration: 'none', color: 'white'}}>Pricing</a>
                    </div>
                    <div className='item'>
                        <a href='https://www.checksub.com/case-studies/translation-agencies/' style={{textDecoration: 'none', color: 'white'}}>Use Case</a>
                    </div>
                    <div className='item'>
                        <a href='https://www.checksub.com/blog' style={{textDecoration: 'none', color: 'white'}}>Blog</a>
                    </div>
                    <div className='item'>
                        <a href='#' style={{textDecoration: 'none', color: 'white'}}>About us</a>
                    </div>
                </div>
                <div className='credential'>
                    <div className='item'><button className='tryBtn'>Try it now</button></div>
                    <div className='item'>Login</div>
                </div>
            </div>
            <div className='content' style={{marginTop: 122}}>
                <div className='input'>
                    <input
                        placeholder='Enter the URL of the video for which you want to download the subtitles'
                        className='urlInput'
                        onChange={event => updateVideoUrl(event)}
                        defaultValue={videoUrl.current}
                    />
                    <button className='funcBtn' onClick={download}>Download</button>
                </div>
            </div>
            <div className='content' style={{marginTop: 15}}>
                <div className='endTitle'>
                    Free subtitle file download service for Youtube videos.
                </div>
            </div>

            {
                downInfoState ? (
                    <>
                        {
                            videoThumbnail && (
                                <>
                                    <div className='content' style={{marginTop: 54}}>
                                        <div className='introTitle'>Your video:</div>
                                    </div>
                                    <div className='content'>
                                        <div className='videoOutline'>
                                            <div className='videoThumbnail'>
                                                <img src={videoThumbnail} alt='videoThumbnail' style={{width: 168, height: 94}}/>
                                            </div>
                                            <div className='videoTitle'>
                                                Title: {videoTitle}<br/>
                                                Length: {videoDuration}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }

                        {
                            manualCaptions.length > 0 && (
                                <>
                                    <div className='content' style={{marginTop: 54}}>
                                        <div className='introTitle'>Subtitles available:</div>
                                    </div>
                                    <div className='content'>
                                        <div className='rOption'>
                                            Manuel
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        {
                            state.manualCaptions.map((item, index) => {
                                return (
                                    <div className='content' style={{marginTop: 10}}>
                                        <div className='rFlag'>
                                            {item.countryName}
                                            <ReactCountryFlag countryCode={item.countryCode} />
                                        </div>
                                        <div className='rItem'>
                                            <button className='txtBtn'
                                                    onClick={() => downloadManualSrt(item.flag, videoUrl.current, item.countryName, videoTitle)}>SRT</button>
                                        </div>
                                        <div className='rItem'>
                                            <button className='txtBtn'
                                                    onClick={() => downloadManualTxt(item.flag, videoUrl.current, item.countryName, videoTitle)}>TXT</button>
                                        </div>
                                        <div className='rItem'>
                                            <button className='editBtn' onClick={demo}>EDIT IT</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {
                            manualCaptions.length > 0 && (
                                <div className='content'>
                                    <hr style={{color: '#2D2F36', height: 0, width: 920}}/>
                                </div>
                            )
                        }
                        {
                            autoCaptions.length > 0 && (
                                <>
                                    <div className='content'>
                                        <div className='rOption'>
                                            Automatic
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        {
                            state.autoCaptions.map((item, index) => {
                                return (
                                    <div className='content' style={{marginTop: 10}}>
                                        <div className='rFlag'>
                                            {item.countryName}
                                            <ReactCountryFlag countryCode={item.countryCode}/>
                                        </div>
                                        <div className='rItem'>
                                            <button className='txtBtn'
                                                    onClick={() => downloadAutomaticSrt(item.flag, videoUrl.current, item.countryName, videoTitle)}>SRT</button>
                                        </div>
                                        <div className='rItem'>
                                            <button className='txtBtn'
                                                    onClick={() => downloadAutomaticTxt(item.flag, videoUrl.current, item.countryName, videoTitle)}>TXT</button>
                                        </div>
                                        <div className='rItem'>
                                            <button className='editBtn' onClick={demo}>EDIT IT</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                ) : (
                    <div className='content' style={{marginTop: 15, justifyContent: 'center'}}>
                        <Loader type="Circles" color="#00BFFF" height={80} width={80}/>
                    </div>
                )
            }
        </div>
    );
}

export default App
