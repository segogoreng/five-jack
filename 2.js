function solution(N, users) {
    const stuckUsersInStage = calculateStuckUsersInStage(N, users);
    const totalUsersInStage = calculateTotalUsersInStage(N, stuckUsersInStage);
    const failureRatesInStage = calculateFailureRatesInStage(N, stuckUsersInStage, totalUsersInStage);
    
    return buildSortedStagesByFailureRates(N, failureRatesInStage);
}

function calculateStuckUsersInStage(N, users) {
    const stuckUsersInStage = new Array(N+2).fill(0);
    users.forEach(stageNumber => {
        stuckUsersInStage[stageNumber]++;
    });
    return stuckUsersInStage;
}

function calculateTotalUsersInStage(N, stuckUsersInStage) {
    const totalUsersInStage = new Array(N+2).fill(0);
    let sum = 0;

    for (let i = N+1; i > 0; i--) {
        sum += stuckUsersInStage[i];
        totalUsersInStage[i] = sum;
    }

    return totalUsersInStage;
}

function calculateFailureRatesInStage(N, stuckUsersInStage, totalUsersInStage) {
    const failureRatesInStage = new Array(N+1).fill(0.0);

    for (let i = 1; i <= N; i++) {
        failureRatesInStage[i] = stuckUsersInStage[i] / totalUsersInStage[i];
    }

    return failureRatesInStage;
}

function buildSortedStagesByFailureRates(N, failureRatesInStage) {
    const sortedStages = [];

    for (let i = 0; i < N; i++) {
        sortedStages[i] = i + 1;
    }

    sortedStages.sort(function (a, b) {
        if (failureRatesInStage[a] < failureRatesInStage[b]) return 1;
        if (failureRatesInStage[a] > failureRatesInStage[b]) return -1;
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
    
    return sortedStages;
}
