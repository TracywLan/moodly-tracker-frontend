const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/moods`;

// Moods
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
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};
    
const create = async (moodFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(moodFormData)
        });
        if(!res.ok) {
            throw new Error(error.message)
        }
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

const update = async (moodId, moodFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${moodId}`, {
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
        const res = await fetch(`${BASE_URL}/${moodId}`, {
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

// Comments
const addComment = async (moodId, commentFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${moodId}/comments`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentFormData),
        });
        if(!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || "Failed to add comment");

        }
         const updatedMood = await res.json()
        return updatedMood
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateComment = async (moodId, commentId, commentFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${moodId}/comments/${commentId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentFormData),
        });
        if(!res.ok){
        const errData = await res.json();
        throw new Error(errData || "Failed to update comment")
    }

     const updatedMood = await res.json()
        return updatedMood
    } catch (error) {
        throw new Error(error.message)
    }
};

const deleteComment = async (moodId,commentId) => {
    try {
        const res = await fetch(`${BASE_URL}/${moodId}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const updatedMood = await res.json()
        return updatedMood
    } catch (error) {
        throw new Error(error.message)
    }
};

const getCommunityMoods = async () => {
    try {
        const res = await fetch(`${BASE_URL}/community`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const data = await res.json();
        return data;

    } catch (error) {
        console.log(error);
    }
};
const authorInfo = async (userId) => {
    const res = await fetch(`${BASE_URL}/users/${userId}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    })
    return res.json()
}

export { 
    index,show,create,update,deleteMood, addComment, updateComment, deleteComment, getCommunityMoods, authorInfo
};
