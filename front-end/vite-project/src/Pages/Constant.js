
const userID = localStorage.getItem("myid")


export const samesender = (messages, m, i, userID) => {
    return (
        i < messages.length - 1 && (
            messages[i + 1].sender._id !== m.sender._id ||
            messages[i + 1].sender._id === undefined) && messages[i].sender._id !== userID
    )
}

export const isLastMessage = (messages, i, userID) => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userID &&
        messages[messages.length - 1].sender._id
    )
}


export const sameSenderMargin = (messages, m, i, userID) => {
    if (i < messages.length - 1 &&
        messages[i + 1].sender._id === m.sender._id &&
        messages[i].sender._id !== userID)

        return 33

    else if (
        i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userID || (i === messages.length - 1 && messages[i].sender._id !== userID)
    )
        return 0
    else return "auto"
}

export const sameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id
}