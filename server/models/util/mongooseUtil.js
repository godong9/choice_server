module.exports = {
    setStringId: function (schema, options, next) {
        schema
            .virtual('id')
            .get(function () {
                return this._id.str;
            });
    }
};