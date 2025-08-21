

export const getFlowsheet = (id, build) => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/'+id+'/config?build='+build, {mode: 'cors'});
    /*return new Promise((resolve, reject) => { 
        resolve(data3);
    });*/
    
}; 

export const saveFlowsheet = (id, data) => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/'+id+'/update', {
        method: 'POST', 
        mode: 'cors',
        body: JSON.stringify(data)
    });
}; 

export const resetFlowsheet = (id) => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/'+id+'/reset', {
        method: 'GET', 
        mode: 'cors'
    });
}; 

export const unbuildFlowsheet = (id) => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/'+id+'/unbuild', {
        method: 'GET', 
        mode: 'cors'
    });
}; 

export const selectOption = (id, data) => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/'+id+'/select_option', {
        method: 'POST', 
        mode: 'cors',
        body: JSON.stringify(data)
    });
}; 

export const getLogs = () => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/get_logs', {
        method: 'GET', 
        mode: 'cors'
    });
}

export const downloadLogs = () => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/download_logs', {
        method: 'POST', 
        mode: 'cors'
    });
}

export const setProject = (project) => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/set_project', {
        method: 'GET',
        mode: 'cors',
        body: JSON.stringify({'project':project,'data_location':process.env.REACT_APP_BACKEND_DATABASE_LOCATION})
    });
}