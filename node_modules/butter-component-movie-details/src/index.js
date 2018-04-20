import React, { Component } from 'react';
import { translate } from 'react-i18next';
import style from './styl/style.styl';
import {Navbar, Dropdowns, Buttons} from 'butter-base-components';
import ActionBar from './components/action-bar';

let {Dropdown} = Dropdowns
let {Button} = Buttons

let CloseButton = (props) => (props)
let goBack = () => ('/')

let LegendedButton = ({children, title}) => (
    <div style={{display: 'flex', flexDirection: 'row'}}>
        {children}
        {title}
    </div>
)

let ToolBar = ({}) => (
    <div>
        <Button title="Add to Bookmarks" icon="favorite"/>
        <Button title="Seen" icon="visibility"/>
    </div>
)

let PlayButtons = ({type, torrents, subtitles, ...props}) => (
    <div style={{display: 'flex', flexWrap: 'wrap', paddingTop: '1vw'}}>
        <LegendedButton title={`Play ${type}`}><Button title="Watch Now" /></LegendedButton>
        <LegendedButton title="Subtitles"><Dropdown options={Object.keys(subtitles)}/></LegendedButton>
        <LegendedButton title="Quality"><Dropdown options={Object.keys(torrents)}/></LegendedButton>

        <LegendedButton title="Streamer"><Dropdown options={['butter', 'vlc', 'mpv']}/> </LegendedButton>
    </div>
)

let Info = ({year, runtime, genres, rating, ...props}) => (
    <div>
        {year} · {runtime} mins · {genres[0]} · {rating}
    </div>
)

let MovieDetails = ({title, synopsis, cover, backdrop, ...props}) => (

        <div style={{display: 'flex', backgroundImg: `url(${backdrop})`}}>
            <div style={{
		display: 'flex',
                position: 'relative',
                zIndex: 10
            }}>
                <img src={cover} style={{padding: '4vh', borderRadius: '5px', width: '40vw', objectFit: 'cover';}}/>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '4vw',
		width: '100%', 
		overflow: 'auto'
            }}>
                <h1 style={{
                    color: '#FFF',
                    position: 'relative',
                    textStroke: '1px rgba(0,0,0,0.1)',
                    fontSize: '48px',
                    fontSmoothing: 'antialiased'
                }}>{title}</h1>
                <Info {...props}/>
                <p style={{flexGrow: 2}}>
                    {synopsis}
                </p>
                <PlayButtons {...props}/>
            </div>
        </div>
)

MovieDetails.defaultProps = {
    subtitles: {none: null},
    torrents: {Unknown: null},
    genres: ['none']
}
export {
    MovieDetails as default
}
