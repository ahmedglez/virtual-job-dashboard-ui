import {
    SET_TASKS,
    SET_USERS
} from 'constants/types'

const setTasks = (payload) => ({
    type: SET_TASKS,
    payload
});

const setUsers = (payload) => ({
    type: SET_USERS, 
    payload
})


export {setTasks, setUsers}