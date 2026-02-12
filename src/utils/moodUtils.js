export const moodLabels = [
        'excited', 'very happy', 'happy', 'calm', 
        'tired', 'sad', 'very-sad', 'anxious', 'angry'
    ];


export const getEmoji = (moodLabel) => {    
    if (!moodLabel) return '😐';
        if (moodLabel === 'very-sad') return '😭';
        if (moodLabel === 'sad') return '😢';
        if (moodLabel === 'happy') return '😊';
        if (moodLabel === 'very happy') return '😆';
        if (moodLabel === 'anxious') return '😖';
        if (moodLabel === 'angry') return '😡';
        if (moodLabel === 'excited') return '🤩';
        if (moodLabel === 'tired') return '😪';
        if (moodLabel === 'calm') return '😐';
        return '🙂'
    }

export const getMoodColor = (rating) => {
    if (rating >= 5) return '#f472b6'; 
    if (rating === 4) return '#fbcfe8'; 
    if (rating === 3) return '#fef08a'; 
    if (rating === 2) return '#bae6fd'; 
    return '#cbd5e1';                   
};