import {
    SET_TASKS
} from 'constants/types'

const setTasks = (payload) => ({
    type: SET_TASKS,
    payload
});


export {setTasks}