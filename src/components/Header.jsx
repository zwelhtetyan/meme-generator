import React from 'react';
import trollFace from '../Troll Face.png';

export default function Header() {
    return (
        <header className='header'>
            <img src={trollFace} className='header-img' />
            <h2 className='header-title'>Meme Generator</h2>
        </header>
    );
}
