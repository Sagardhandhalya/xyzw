
import axios from 'axios'

const fetchTopQuestions=()=>{
        let url = 'https://api.stackexchange.com/2.2/questions/featured?order=desc&sort=activity&site=stackoverflow';
       
       return  axios.get(url).then(
            (res) => res.data.items
        )
}

const fetchUserProfile = (userId) =>{

        let url = `https://api.stackexchange.com/2.2/users/${userId}?order=desc&sort=reputation&site=stackoverflow`
       
        return  axios.get(url).then(
                (res) => res.data.items[0]
            )     
        }
        
const fetchUserTags =(userId)=>{

        let url = `https://api.stackexchange.com/2.2/users/${userId}/top-answer-tags?site=stackoverflow`
        return  axios.get(url).then(
                (res) => res.data.items
            ) 
}

const fetchTopQuestionsForAUser = (userId) =>{

        let url = `https://api.stackexchange.com/2.2/users/${userId}/questions?order=desc&sort=activity&site=stackoverflow`
        return  axios.get(url).then(
                (res) => res.data.items
            )

}

export {fetchTopQuestions , fetchTopQuestionsForAUser , fetchUserTags , fetchUserProfile}