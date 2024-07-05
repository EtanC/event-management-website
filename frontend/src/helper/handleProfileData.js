import axios from 'axios'

export const fetchProfileData = async (setProfile) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:5000/profile/get', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const profileData = response.data;
        setProfile(profileData);
    } catch (err) {
        console.log(`Failed to fetch profile ${err.message}`);
    }
}

export const updateProfileDetails = async (updatedProfileData) => {
    const { username, description, job_title, fun_fact, full_name, email } = updatedProfileData;
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://127.0.0.1:5000/profile/update/details', {
            email: email,
            username: username,
            description: description,
            full_name: full_name,
            job_title: job_title,
            fun_fact: fun_fact,
            preferences: {},
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.status
    } catch (error) {
        console.log('Failed to update profile:', error.response ? error.response.data.description : error.message)
    }
}

export const updateProfilePassword = async (password, setErrorMessage) => {
    const { old_pw, new_pw, confirm_new_pw } = password
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://127.0.0.1:5000/profile/update/password', {
            old_password: old_pw,
            new_password: new_pw,
            re_password: confirm_new_pw,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(response)
        return response.status
    } catch (error) {
        console.log('Failed to change password:', error.response ? error.response.data.description : error.message)
        setErrorMessage(error.response ? error.response.data.description : error.message);
    }
}

