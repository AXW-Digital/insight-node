// This function takes the total points as an argument and 
// returns the current level and current points relative to the level 

export default function getLevel(totalPoints) {

    var sidx, slen, currentPoints, maxLevelPoints
    const levelThresholds = [
        1500,
        5000,
        10000,
        18500,
        30000
    ]

    for (sidx = 0, slen = levelThresholds.length; sidx < slen; ++sidx) {
        if (totalPoints < levelThresholds[sidx]) break;
    }

    const level = sidx + 1

    if (sidx === 0) {
        currentPoints = totalPoints
        maxLevelPoints = levelThresholds[0]
    } else {
        currentPoints = totalPoints - levelThresholds[sidx - 1]
        maxLevelPoints = levelThresholds[sidx] - levelThresholds[sidx - 1]
    }

    return { currentPoints, maxLevelPoints, level}

}



