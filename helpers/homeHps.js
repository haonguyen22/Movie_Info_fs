module.exports = {
    time: function (n, block) {
        var accum = "";
        for (var i = 1; i <= n; i++) {
            accum += block.fn(i);
        }
        return accum;
    },
    ifEqual: function (arg1, arg2, block) {
        if (parseInt(arg1) === parseInt(arg2)) return block.fn(this);
        return block.inverse(this);
    },
    ifNotEqual: function (arg1, arg2, block) {
        if (parseInt(arg1) !== parseInt(arg2)) return block.fn(this);
        return block.inverse(this);
    },
};
