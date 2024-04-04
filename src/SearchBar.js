import React, { useState } from 'react';
import './searchBar.css';
import axios from 'axios';

const SearchBar = () =>{
    const [question, setQuestion] = useState("");
    const [context, setContext] = useState("");
    const [answers, setAnswer] = useState("");
    
    const handleQuestionChange = (e) =>{
        setQuestion(e.target.value)
    }

    const handleContextChange = (e) =>{
        setContext(e.target.value)
    }

    const submitQuestion = async () =>{
        const payload = {
            inputs: {
              question: question,
              context: context
            }
        };

        try{
            const response = await axios.post('https://api-inference.huggingface.co/models/deepset/roberta-base-squad2', payload, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_HUGGING_FACE_API_KEY}`
                }
                });
        
                const answer = response.data.answer;
                console.log(answer)
                setAnswer(answer);
        } catch (error) {
            console.error('Error fetching the answer:', error);
            setAnswer('Failed to fetch answer. please enter corresponding context.');
        }
    };

    return(
        <div>
            <input value={question} onChange={handleQuestionChange} placeholder='Type your question here'></input>
            <button onClick={submitQuestion}>Submit</button>
            <div>
                <textarea value={context} onChange={handleContextChange} placeholder='type the corresponding context'></textarea>
            </div>
            <div>
            <h2>Answer</h2>
            <p>{answers || 'Your answer will show here...'}</p>
            </div>
        </div>
    )


};

export default SearchBar;