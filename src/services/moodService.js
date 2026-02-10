const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/moods`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const show = async (moodId) => {
    try {
        const res = await fetch(`${BASE_URL}/${moodId}`, {
            header: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};
    
const create = async (MoodForm) => {
    try {
        const res = await fetch (BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(MoodForm)
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

const update = async (moodId, moodFormData) => {
    try {
        const res = await fetch (`${BASE_URL}/${moodId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(moodFormData)
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}


const deleteMood = async (moodId) => {
    try {
        const res = await fetch (`${BASE_URL}/${moodId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};


export { 
    index,show,create,update,deleteMood
};
