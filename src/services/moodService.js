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
};
