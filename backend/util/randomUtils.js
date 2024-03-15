function getRandomInt(max, blackList, attempts = 0) {
    if (attempts >= max) {
        throw new Error(
            "getRandomInt cannot generate a random Int because the Blacklist includes all possible values under the Max."
        );
    }

    const randomInt = Math.floor(Math.random() * max);

    return blackList.includes(randomInt)
        ? getRandomInt(max, blackList, attempts + 1)
        : randomInt;
}

module.exports = { getRandomInt };
