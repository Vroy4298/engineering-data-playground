function validateRow(row) {

    const errors = [];

    if (!row.name || row.name.trim() === "") {
        errors.push("Name is required");
    }

    if (!row.email || row.email.trim() === "") {
        errors.push("Email is required");
    }

    if (!row.age || isNaN(Number(row.age))) {
        errors.push("Age must be a valid number");
    }

    if (!row.city || row.city.trim() === "") {
        errors.push("City is required");
    }

    return {
        isValid: errors.length === 0,
        errors
    };

}

module.exports = {
    validateRow
};