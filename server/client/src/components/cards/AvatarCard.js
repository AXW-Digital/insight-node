import React, {useEffect} from 'react';
import { IoMdRefreshCircle } from 'react-icons/io';
import axios from 'axios';

const AvatarCard = (props) => {

    const [avatarSeed, setAvatarSeed] = React.useState(null)

    useEffect(() => {
        setAvatarSeed(props.avatarSeed);        
      }, [props.avatarSeed])

    
    const changeAvatar = async () => {
        const seed = Math.floor(Math.random() * 100000000)
        setAvatarSeed(seed);

        const data = {
            _user: props.id,
            avatarSeed: seed.toString()
        }

        await axios.post('/api/profile/avatar', data).then(
            res => {
                console.log('avatar changed successfully')
            }
        ).catch(
            err => {
                console.log(err)
            }
        )

    }

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

    console.log(url)

    return (
        <div>
            <div className="card profile-card">
                <div className="card-body">
                    <div className="row">
                         <div className="col-xl-5 col-md-3 col-d-flex">
                            <div className="profile-image mr-md-auto ml-sm-auto"> 
                                <img src={url} alt="" /> 
                            </div>
                            <div className="col-1" style={{fontSize:30, marginLeft:30, position:'absolute', left:105, bottom:35}}>
                                <IoMdRefreshCircle onClick={changeAvatar}/>
                            </div>

                        </div>
                        <div className="col-xl-7 col-md-9 col-12">
                            <h4 className="mt-3 mt-5-sm mb-3 mr-auto"><strong>{props.fName + ' '}</strong>{props.sName}</h4>
                            <span className="job_post">{props.rank}</span>
                            <p>{props.city}</p>
                            <p className='profile-id'>id: {props.id}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}


export default AvatarCard
