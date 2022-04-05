import React from 'react';

export default function Meme() {
    const [allMemes, setAllMemes] = React.useState({});

    const [data, setData] = React.useState({
        topText: '',
        bottomText: '',
        imageURL: 'https://i.imgflip.com/1ii4oc.jpg',
    });

    const randomImage = () => {
        if (JSON.stringify(allMemes) !== '{}') {
            const randomNumber = Math.floor(Math.random() * allMemes.length);
            const imageURL = allMemes[randomNumber].url;
            return imageURL;
        }
    };

    React.useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://api.imgflip.com/get_memes');
            const data = await res.json();
            setAllMemes(data.data.memes);
        };
        fetchData();
    }, []);

    const handleChangeMeme = () => {
        setData((preData) => {
            return {
                ...preData,
                imageURL: randomImage(),
            };
        });
    };

    const handleChangeText = (e) => {
        const { name, value } = e.target;
        setData((preData) => ({ ...preData, [name]: value }));
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
                <img className='meme-img' src={data.imageURL} />
                <h1 className='topText label'>{data.topText}</h1>
                <h1 className='bottomText label'>{data.bottomText}</h1>
            </div>
        </main>
    );
}
