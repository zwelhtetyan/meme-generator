import React from 'react';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';

export default function Meme() {
    const [allMemes, setAllMemes] = React.useState({});

    const [data, setData] = React.useState({
        topText: '',
        bottomText: '',
        imageURL: 'https://i.imgflip.com/1ii4oc.jpg',
        imgName: 'Trump Bill Signing',
    });

    React.useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://api.imgflip.com/get_memes');
            const data = await res.json();
            setAllMemes(data.data.memes);
        };
        fetchData();
    }, []);

    const handleChangeMeme = () => {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const randomMeme = allMemes[randomNumber];
        console.log(randomMeme);
        setData((preData) => {
            return {
                ...preData,
                imageURL: randomMeme.url,
                imgName: randomMeme.name,
            };
        });
    };

    const handleChangeText = (e) => {
        const { name, value } = e.target;
        setData((preData) => ({ ...preData, [name]: value }));
    };

    const handleDownload = () => {
        htmlToImage
            .toPng(document.getElementById('meme-img-container'))
            .then(function (dataUrl) {
                download(dataUrl, data.imgName);
            });
    };

    return (
        <main className='main'>
            <div className='input-container'>
                <input
                    type='text'
                    placeholder='top text'
                    name='topText'
                    value={data.topText}
                    className='input input1'
                    onChange={handleChangeText}
                />
                <input
                    type='text'
                    placeholder='bottom text'
                    name='bottomText'
                    value={data.bottomText}
                    className='input input2'
                    onChange={handleChangeText}
                />
            </div>
            <button className='btn' onClick={handleChangeMeme}>
                Get a new meme image 🖼
            </button>
            <div className='img-container'>
                <div id='meme-img-container'>
                    <img className='meme-img' src={data.imageURL} />
                    <h1 className='topText label'>{data.topText}</h1>
                    <h1 className='bottomText label'>{data.bottomText}</h1>
                </div>
            </div>
            <button className='download-btn' onClick={handleDownload}>
                Download
            </button>
        </main>
    );
}
