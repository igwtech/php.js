PHP.Modules.prototype.preg_replace = function(pattern, replacement, subject, matches, _limit) {
    var COMPILER = PHP.Compiler.prototype;
    var VARIABLE = PHP.VM.Variable.prototype;

    var limit = typeof _limit === 'undefined'
        ? -1
        : _limit[VARIABLE.TYPE] !== VARIABLE.INT
            ? _limit[VARIABLE.CAST_INT]
            : _limit;

    var reText = pattern[COMPILER.VARIABLE_VALUE];
    var delimiter = reText[0];
    var flagsRe = new RegExp(delimiter + '([a-z]*)$', 'i');
    var reFlagsMatch = reText.match(flagsRe);
    var reFlags = reFlagsMatch ? (reFlagsMatch[1] || '') : '';
    reFlags = limit === -1 ? (/g/.test(reFlags) ? reFlags : reFlags + 'g') : reFlags;
    var reSrc = reText.substr(1).replace(flagsRe, '');
    var re = new RegExp(reSrc, reFlags);
    var result = subject[COMPILER.VARIABLE_VALUE].toString().replace(re, replacement[COMPILER.VARIABLE_VALUE]);

    return new PHP.VM.Variable(result);
};
