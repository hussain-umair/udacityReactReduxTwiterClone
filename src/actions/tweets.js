import {saveLikeToggle,saveTweet} from '../utils/api'
import {showLoading,hideLoading} from 'react-redux-loading'

function addTweet(tweet){
    return {
        type:'ADD_TWEET',
        tweet
    }
}

export function handleAddTweet(text,replyingTo){
    return (dispatch,getState)=>{
        const {authedUser} = getState()

        dispatch(showLoading())

        return saveTweet({
            text,
            author:authedUser,
            replyingTo
        }).then((tweet)=>dispatch(addTweet(tweet))).then(()=>dispatch(hideLoading()))
    }
}

export const receiveTweets=(tweets)=>{
    return {
        type:'RECEIVE_TWEETS',
        tweets
    }
}

function toggleTweet({id,authedUser,hasLiked}){
    return {
        type:'TOGGLE_TWEET',
        id,
        authedUser,
        hasLiked
    }
}

export function handleToggleTweet(info){
    return (dispatch)=>{
        dispatch(toggleTweet(info))

        return saveLikeToggle(info).catch((e)=>{
            console.warn('error in handleToggleTweet: ',e)
            dispatch(toggleTweet(info))
            alert('error, try again')
        })
    }
}