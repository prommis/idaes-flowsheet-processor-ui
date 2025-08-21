/**
 * Get the name of the project.
 *
 * @returns {Promise<Response>}
 */
export const getProjectName = () => {
    return fetch(process.env.REACT_APP_BACK_END_URL+'/flowsheets/project', {mode: 'cors'})
        .then((response) => response.json());
}
