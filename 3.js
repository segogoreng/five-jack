function solution(table) {
    const colIndices = buildColIndices(table);
    let candidatesKeySet = new Set();
    countCandidateKeys(table, colIndices, candidatesKeySet);
    return candidatesKeySet.size;
}

function buildColIndices(table) {
    const cols = table[0].length;
    const colIndices = [];
    
    for (let i = 0; i < cols; i++) {
        colIndices.push(i);
    }

    return colIndices;
}

function countCandidateKeys(table, colIndices, candidatesKeySet) {
    if (!isCandidateKey(table, colIndices)) return 0;

    let count = 0;
    for (let i = 0; i < colIndices.length; i++) {
        count += countCandidateKeys(table, colIndicesWithout(i, colIndices), candidatesKeySet);
    }

    if (count == 0) {
        candidatesKeySet.add(buildStringKey(colIndices));
        return 1;
    }

    return count;
}

function isCandidateKey(table, colIndices) {
    const rows = table.length;
    const entrySet = new Set();

    for (let row = 0; row < rows; row++) {
        let entry = '';
        colIndices.forEach(index => {
            entry += table[row][index] + ',';
        });
        if (entrySet.has(entry)) return false;
        entrySet.add(entry);
    }

    return true;
}

function colIndicesWithout(indexRemoved, colIndices) {
    return colIndices.filter((value, index) => index !== indexRemoved);
}

function buildStringKey(colIndices) {
    let key = '';
    colIndices.forEach(index => {
        key += index + ',';
    });
    return key;
}

const answer = solution([
    ['100','ryan','music','2'],
    ['200','apeach','math','1'],
    ['300','tube','computer','3'],
    ['400','con','computer','4'],
    ['500','muzi','music','3'],
    ['600','apeach','music','5']
]);
console.log(answer);