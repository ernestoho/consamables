import { REQUEST_VOTES, RECEIVE_VOTES } from './actionTypes';

const requestVotes = groupId => ({
    type: REQUEST_VOTES,
    id: groupId
});

const receiveVotes = (groupId, json) => ({
    type: RECEIVE_VOTES,
    id: groupId,
    value: json
});

const fetchVotes = groupId => {
    return dispatch => {
        dispatch(requestVotes(groupId));
        fetch(`/api/groups/${groupId}/count-votes`)
            .then( response => response.json() )
            .then( json => dispatch(receiveVotes(groupId, json)) );
    };
};

export default fetchVotes
