 const tweets=(state={},action)=>{
    switch(action.type){
        case 'RECEIVE_TWEETS':
            return {
                ...state,
                ...action.tweets
            }
        case 'ADD_TWEET':
            const {tweet} =action
            let replyingTo = {}
            if(tweet.replyingTo!==null){
                replyingTo={
                    [tweet.replyingTo]:{
                        ...state[tweet.replyingTo],
                        replies:state[tweet.replyingTo].replies.concat([tweet.id])
                    }
                }
            }
            return {
                ...state,
                [action.tweet.id]:action.tweet,
                ...replyingTo
            }
        case 'TOGGLE_TWEET':
            return {
                ...state,
                [action.id]:{
                    ...state[action.id],
                    likes: action.hasLiked ===true?
                    state[action.id].likes.filter((uid)=>uid!==action.authedUser):
                    state[action.id].likes.concat([action.authedUser])
                }
            }
        default: return state
    }
    }
    export default tweets