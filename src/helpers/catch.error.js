'use strict'

const handleDatabaseError = (error) => {
    console.error('Database query failed:', error);
    throw error;
}

module.exports = {
    handleDatabaseError
}