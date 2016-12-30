import { Map } from 'immutable';

const currentUser = (state = Map({ userId: 1 }), action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default currentUser
