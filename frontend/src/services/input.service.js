export const deleteConfig = (id, name) => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/'+id+'/delete?name='+name, {mode: 'cors'});
}; 

export const updateNumberOfSubprocesses = (data) => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/update_number_of_subprocesses', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data)
    });
} 