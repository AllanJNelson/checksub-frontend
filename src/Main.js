import logo from './mainLogo.svg';
import './App.css';
import {Route, Link, BrowserRouter} from "react-router-dom";
import React, {useState} from 'react';

function Main() {

    const [videoUrl, setVideoUrl] = useState('');

    return (
        <>
            <div className='mainTo'>
                <div className='header'>
                    <div className='logo'>
                        <img src={logo} style={{width: 101, height: 19}} alt='logo'/>
                    </div>
                    <div className='menu'>
                        <div className='item'>Product</div>
                        <div className='item'>Pricing</div>
                        <div className='item'>Use Case</div>
                        <div className='item'>Blog</div>
                        <div className='item'>About us</div>
                    </div>
                    <div className='credential'>
                        <div className='item'>
                            <button className='tryBtn'>Try it now</button>
                        </div>
                        <div className='item'>Login</div>
                    </div>
                </div>

                <div className='content' style={{marginTop: 162}}>
                    <div className='introTitle'>
                        Download subtitles file from Youtube videos.
                    </div>
                </div>

                <div className='content' style={{marginTop: 56}}>
                    <div className='input'>
                        <input
                            placeholder='Enter the URL of the video for which you want to download the subtitles'
                            className='urlInput'
                            onChange={event => setVideoUrl(event.target.value)}
                        />
                        <Link className='funcBtn' to={{pathname: '/app', search: `videoUrl=${videoUrl}`}}>Download</Link>
                    </div>
                </div>

                <div className='content' style={{marginTop: 15}}>
                    <div className='endTitle'>
                        Free subtitle file download service. Works on Youtube, Vimeo, Facebook,...
                    </div>
                </div>

                <div className='footer'>
                    <div className='footerElement'>
                        FREE
                    </div>
                    <div className='footerElement'>
                        NO ADS
                    </div>
                    <div className='footerElement'>
                        PRIVATE
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#1C1D1F'}}>
                <div className='content' style={{marginTop: 162, fontSize: 45, color: "white"}}>
                    Subtitles creation should be easy.
                </div>
                <div className='content' style={{marginTop: 162}}>
                    <div style={{width: 1117, fontSize: 38, color: 'white', textAlign: 'center'}}>
                        The Checksub downloader allows you to download for free subtitle files from Youtube in SRT and TXT format. We also allow you to edit these subtitles with our innovative online subtitle editor for free.  For example, you can create subtitles together from your favorite creators as when community subtitles still existed 😸
                    </div>
                </div>
                <div className='content' style={{marginTop: 162, marginBottom: 283, flexDirection: 'column', justifyContent: 'center'}}>
                    <div style={{position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 'auto'}}>
                        <div className='custom1'>
                            To get your subtitles even faster<br/>
                            you can use our <u>chrome extension</u>.
                        </div>
                        <div className='custom'/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;
