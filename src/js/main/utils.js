const utils = {
    toNumber: function(newValue, defaultValue) {
        if (typeof newValue === 'string')
            newValue = parseFloat(newValue);

        if (typeof newValue === 'number')
            return newValue;

        return defaultValue;
    },
    toBoolean: function(newValue, defaultValue) {
        if (typeof newValue === 'boolean')
            return newValue;

        return defaultValue;
    },
    toDate: function (newValue, defaultValue) {
        if (typeof newValue === 'string')
            newValue = new Date(newValue);

        return newValue || defaultValue;
    }
};