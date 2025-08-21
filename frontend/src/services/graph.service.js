export const getDiagram = (id) => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/'+id+'/diagram', {mode: 'cors'});
}; 