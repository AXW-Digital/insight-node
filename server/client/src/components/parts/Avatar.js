import React, { useEffect } from 'react';
import { IoMdRefreshCircle } from 'react-icons/io';
import axios from 'axios';

const Avatar = (props) => {

    const [avatarSeed, setAvatarSeed] = React.useState(null)

    useEffect(() => {
        setAvatarSeed(props.avatarSeed);
    }, [props.avatarSeed])




    var url =
        `https://avatars.dicebear.com/api/avataaars/
${avatarSeed}.svg?
facialHairChance=25&
accessoriesChance=15&
topChance=85&
eyes[]=close&
eyes[]=closed&
eyes[]=default&
eyes[]=roll&
eyes[]=eyeRoll&
eyes[]=happy&
eyes[]=side&
eyes[]=squint&
eyes[]=wink&
eyes[]=winkWacky&
mouth[]=default&
mouth[]=disbelief&
mouth[]=eating&
mouth[]=smile&
mouth[]=tongue&
eyebrow[]=default&
eyebrow[]=defaultNatural&
eyebrow[]=raised&
eyebrow[]=raisedExcited&
eyebrow[]=sadConcerned&
eyebrow[]=up&
eyebrow[]=upDown&
eyebrow[]=upDownNatural
    `

    url = url.replace(/(\r\n|\n|\r)/gm, "");

    return (
        <div className='d-flex justify-content-center'>
        <div className='round bg-light '>
                <img src={url} alt=""  className='round'/> 
        </div>
        </div>
    )
}


export default Avatar