function solution(records) {
    const userMap = buildUserMap(records);
    return buildChatMessages(records, userMap);
}

function buildUserMap(records) {
    const userMap = {};

    records.forEach(record => {
        const action = getAction(record);
        const userId = getUserId(record);
        const nickname = getNickname(record);
        if (action === 'Enter' || action === 'Change') {
            userMap[userId] = nickname;
        }
    });

    return userMap;
}

function buildChatMessages(records, userMap) {
    messages = [];

    records.forEach(record => {
        const action = getAction(record);
        const userId = getUserId(record);
        const nickname = userMap[userId];

        if (action === 'Enter') {
            messages.push(nickname + " came in.");
        } else if (action === 'Leave') {
            messages.push(nickname + " has left.");
        }
    });

    return messages;
}

function getAction(record) {
    const firstSpaceIndex = record.indexOf(' ');
    return record.substr(0, firstSpaceIndex);
}

function getUserId(record) {
    const elements = record.split(' ');
    return elements[1];
}

function getNickname(record) {
    const elements = record.split(' ');
    return elements[2];
}
