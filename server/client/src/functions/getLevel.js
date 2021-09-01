// This function takes the total points as an argument and 
// returns the current level and current points relative to the level 

export const levelThresholds = [
    500,
    1000,
    1600,
    2300,
    3100,
    4100,
    5300,
    6800,
    8600,
    10800,
    13000,
    27000,
    45000,
    70000,
    110000

]

export const couponThresholds = [
    {0: 'bronze'},
    {1: 'bronze'},
    {2: 'bronze'},
    {3: 'silver'},
    {4: 'bronze'},
    {5: 'gold'},
    {6: 'bronze'},
    {7: 'silver'},
    {8: 'gold'},
    {9: 'silver'},
    {10: 'gold'},
    {11: 'gold'},
    {12: 'gold'},
    {13: 'gold'},
    {14: 'gold'},
    {15: 'gold'}
]


export default function getLevel(totalPoints, pointsIncrease) {

    
    var sidx, slen, currentPoints, maxLevelPoints, pointsDiffToMax
    var levelUp = false

    for (sidx = 0, slen = levelThresholds.length; sidx < slen; ++sidx) {
        if (totalPoints < levelThresholds[sidx]) break;
    }

    const level = sidx + 1

    if ((totalPoints + pointsIncrease) > levelThresholds[sidx]) {
        levelUp = true
    }


    switch( levelUp ) {
        case false:
            if (sidx === 0) {
                currentPoints = totalPoints
                maxLevelPoints = levelThresholds[0]
            } else {
                currentPoints = totalPoints - levelThresholds[sidx - 1]
                maxLevelPoints = levelThresholds[sidx] - levelThresholds[sidx - 1]
            }
            return { currentPoints, maxLevelPoints, level, levelUp}
        case true:
            if (sidx === 0) {
                pointsDiffToMax = levelThresholds[0] - totalPoints
                currentPoints = pointsIncrease - pointsDiffToMax
                maxLevelPoints = levelThresholds[sidx + 1] - levelThresholds[sidx]
            } else {
                pointsDiffToMax = levelThresholds[sidx + 1] - totalPoints
                currentPoints = pointsIncrease - pointsDiffToMax
                maxLevelPoints = levelThresholds[sidx] - levelThresholds[sidx - 1]
            }
            return { currentPoints, maxLevelPoints, level, levelUp}

    }   

}





