import React, { useState, useEffect } from 'react'
import TopQuestions from './TopQuestions'
import './dashboard.css'
import { fetchTopQuestions } from '../../Api Calls/dataFetcher'
import Spinner from '../Spinner'
import {data} from './data'
function Dashboard() {
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        fetchTopQuestions().then(
            questionsList => {
                setQuestions(questionsList)
            })
    }, [])

    return (

        <>
            <h2 className="App">Top Questions</h2>

      { questions.length === 0 ? <Spinner />  :<div className="dashboard-container App">
                <TopQuestions questions={questions} />
            </div>
    }

        </>
    )
}

export default Dashboard

