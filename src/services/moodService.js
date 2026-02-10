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

const addComment = async (commentData,moodId) => {
    try {
        const res = await fetch(`${BASE_URL}/${moodId}/comments`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": "application/json",
            },
            body: JSON.stringify(commentData)
        });

        if(!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || "Failed to add comment");

        }
        return await res.json();
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateComment = async (commentData,commentId,moodId) => {
    try {
        const res = await fetch(`${BASE_URL}/${moodId}/comments/${commentId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentData)
    });

    if(!res.ok){
        const errData = await res.json();
        throw new Error(errData || "Failed to update comment")
    }

    return await res.json();
    } catch (error) {
        throw new Error(error.message)
    }
}


export { 
    index,
    addComment,
    updateComment,
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

// Comments
const createComment = async (moodId, commentFormData) => {
    try {
        const res = await fetch (`${BASE_URL}/${moodId}/comments`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const updateComment = async (moodId, commentId, commentFormData) => {
    try {
        const res = await fetch (`${BASE_URL}/${moodId}/comments/${commentId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const deleteComment = async (moodId, commentId) => {
    try {
        const res = await fetch (`${BASE_URL}/${moodId}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export { 
    index,show,create,update,deleteMood, createComment, updateComment, deleteComment
};
