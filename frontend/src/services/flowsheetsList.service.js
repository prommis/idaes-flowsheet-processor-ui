export const getFlowsheetsList = () => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/',{mode: 'cors'});
//        .then((response) => response.json())
};

export const uploadFlowsheet = (data) => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/upload_flowsheet', {
        method: 'POST', 
        mode: 'cors',
        body: data
    });
}; 

export const deleteFlowsheet = (id) => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/'+id+'/remove_flowsheet', {
        method: 'POST',
        mode: 'cors'
    });
}; 