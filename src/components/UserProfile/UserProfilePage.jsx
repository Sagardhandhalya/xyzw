import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import './userprofilepage.css'
import TopQuestions from '../Dashboard/TopQuestions'
import Spinner from '../Spinner'
import { fetchUserProfile, fetchUserTags, fetchTopQuestionsForAUser } from '../../Api Calls/dataFetcher'
import {prof , topTag} from './userprofile'
 
function UserProfilePage() {

    // const { userId } = useParams()
    // const [profile, setProfile] = useState(prof)
    // const [topQuestions, setTopQuestions] = useState([])
    // const [topTags, setTopTags] = useState(topTag)
    // const [alltagVisible, setAlltagVisible] = useState(false)


    const { userId } = useParams()
    const [profile, setProfile] = useState(null)
    const [topQuestions, setTopQuestions] = useState([])
    const [topTags, setTopTags] = useState([])
    const [alltagVisible, setAlltagVisible] = useState(false)

    useEffect(() => {

        fetchUserProfile(userId).then(
            profileData => setProfile(profileData)
        )

        fetchUserTags(userId).then(
            userTagData => {

                setTopTags(userTagData)

            }
        )

        fetchTopQuestionsForAUser(userId).then(
            data => setTopQuestions(data)
        )



    }, [])


    const toogleAllTag = () => {

        setAlltagVisible(!alltagVisible)
    }
    return (
        <div className="profile-page-container App">
            <h3>Profile </h3>
            <hr />
            { profile === null ? <Spinner /> : <div className="profile">
                <div className="avatar" >
                    <img src={profile.profile_image} alt="" width="170px" height="180px" />
                    <span className="reputation"><span className="repunumber">{profile.reputation} </span> <span>REPUTATION</span></span>
                    <div className="badgebar">

                        <div className="badge-gold badge ">
                            <span className="gold-dot dot">
                            </span>
                            <span>{profile.badge_counts.gold}</span>
                        </div>
                        <div className="badge-silver badge">
                            <span className="silver-dot dot">
                            </span>
                            <span>{profile.badge_counts.silver}</span>
                        </div>
                        <div className="badge-bronze badge">
                            <span className="bronze-dot dot">
                            </span>
                            <span>{profile.badge_counts.bronze}</span>
                        </div>
                    </div>
                </div>

                <div className="profile-details">
                    <h2> {profile.display_name}</h2>
                    <p>Location : {profile.location} </p>
                    <p>WebSite Url : {profile.website_url}</p>
                </div>
            </div>
            }
            <h3>Top Tags</h3>
            <hr />
            { topTags.length > 0 ? <div className="toptags">

            { (alltagVisible || topTags.length < 3) ? topTags.map((tag) => <div key={Date.now()} className="card">
                    <p className="q-tag">{tag.tag_name}</p>
                    <span>
                        <small>SCORES :</small> <b>{tag.answer_score}</b>
                        <br />
                        <small>POSTS :</small> <b>{tag.answer_count}</b>
                    </span>
                </div>
                )
        
                    :<div className="toptags" >
                   { topTags.slice(0, 3).map((tag) =>  <div key={Date.now()} className="card">
                        <p className="q-tag">{tag.tag_name}</p>
                        <span>
                            <small>SCORES :</small> <b>{tag.answer_score}</b>
                            <br />
                            <small>POSTS :</small> <b>{tag.answer_count}</b>
                        </span>
                    </div>
                 )
                 
                }
                        <a onClick={toogleAllTag}>Show all tags...</a>
                 </div>

        }
            </div>
                : <Spinner />

            }




            <h3>Top Questions</h3>
            <hr />
            {
                topQuestions.length > 0 ? <div className="topquestions">
                    <TopQuestions questions={topQuestions} />
                </div> : <Spinner />
            }
        </div>

    )
}

export default UserProfilePage
