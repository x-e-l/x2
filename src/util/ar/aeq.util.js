const aeq = (a, b) => {

    if (!Array.isArray(a) || !Array.isArray(b)) {
        return a === b;
    }

    if (a.length !== b.length) {
        return false;
    }

    for (let i = 0; i < a.length; i += 1) {
        if (b[i] !== a[i]) {
            return false;
        }
    }

    return true;
};


export default aeq;
