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

