
function getEarliestAnimals(animals) {
    // Sort the animals by createdAt in ascending order (earliest to latest)
    const sortedAnimals = animals.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    // Get first 3 results and return them
    const earliestAnimals = sortedAnimals.slice(0, 3);
    return earliestAnimals;
}

export default getEarliestAnimals;
