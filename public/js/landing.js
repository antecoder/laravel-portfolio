!function r(e, t, n) {
    function a(i, u) {
        if (!t[i]) {
            if (!e[i]) {
                var f = "function" == typeof require && require;
                if (!u && f) return f(i, !0);
                if (o) return o(i, !0);
                var c = new Error("Cannot find module '" + i + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var l = t[i] = {exports: {}};
            e[i][0].call(l.exports, function (r) {
                var t = e[i][1][r];
                return a(t || r)
            }, l, l.exports, r, e, t, n)
        }
        return t[i].exports
    }

    for (var o = "function" == typeof require && require, i = 0; i < n.length; i++) a(n[i]);
    return a
}({
    1: [function (r, e, t) {
        $(document).ready(function () {
            FastClick.attach(document.body);
            var r = $(".email.obfuscated");
            if (r.data("email")) {
                var e = r.data("email");
                r.attr("href", "mailto:" + e.replace(/ /, "@").replace(/ /, "."))
            }
        })
    }, {}]
}, {}, [1]);