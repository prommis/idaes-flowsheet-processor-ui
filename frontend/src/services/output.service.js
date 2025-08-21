
export const solve = (id, data) => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/'+id+'/solve', {
        method: 'POST', 
        mode: 'cors',
        body: JSON.stringify(data)
    });
}; 

export const sweep = (id, data) => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/'+id+'/sweep', {
        method: 'POST', 
        mode: 'cors',
        body: JSON.stringify(data)
    });
}

export const downloadCSV = (id,data) => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/'+id+'/download', {
        method: 'POST', 
        mode: 'cors',
        body: JSON.stringify(data)
    });
}

export const downloadSingleOutput = (id,data) => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/'+id+'/downloadOutput', {
        method: 'POST', 
        mode: 'cors',
        body: JSON.stringify(data)
    });
}


export const saveConfig = (id,data,name, version) => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/'+id+'/save?name='+name+'&version='+version, {
        method: 'POST', 
        mode: 'cors',
        body: JSON.stringify(data)
    });
}

export const listConfigNames = (id, version) => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/'+id+'/list?version='+version, {mode: 'cors'});
}; 

export const loadConfig = (id, name) => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/'+id+'/load?name='+name, {mode: 'cors'});
}; 

export const downloadSweepResults = (id) => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/'+id+'/download_sweep', {
        method: 'GET', 
        mode: 'cors',
    });
}

