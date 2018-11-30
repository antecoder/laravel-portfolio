!function e(t, a, n) {
    function i(o, r) {
        if (!a[o]) {
            if (!t[o]) {
                var l = "function" == typeof require && require;
                if (!r && l) return l(o, !0);
                if (s) return s(o, !0);
                var c = new Error("Cannot find module '" + o + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var d = a[o] = {exports: {}};
            t[o][0].call(d.exports, function (e) {
                var a = t[o][1][e];
                return i(a || e)
            }, d, d.exports, e, t, a, n)
        }
        return a[o].exports
    }

    for (var s = "function" == typeof require && require, o = 0; o < n.length; o++) i(n[o]);
    return i
}({
    1: [function (e, t, a) {
        e("./_jquery-wheelswipe"), function (e) {
            function t(e) {
                var t = this;
                if ("string" != typeof e) (i = new a(this, e)).build(), t._carousel = i; else {
                    var n = e, i = t._carousel;
                    switch (n) {
                        case"getPage":
                            return i.currentPage;
                        case"setPage":
                            return void i.snapToPage(arguments[1], !0)
                    }
                }
            }

            function a(t, a) {
                this.node = t, this.$carousel = e(t), this.opts = e.extend({}, a || {}), this.opts.loadPage = this.opts.loadPage || function () {
                }
            }

            e.fn.carousel = function () {
                var a, n = arguments;
                return e(this).each(function () {
                    a = t.apply(this, n)
                }), a
            }, a.prototype.build = function () {
                var t = this;
                this.$pages = this.$carousel.find(".page"), this.$pageScroller = e("<div>").addClass("page-scroll").append(this.$pages).appendTo(this.$carousel), this.currentPage = -1, this.loadedPages = {}, this.panning = !1, this.scrollX = 0, this.numPages = this.$pages.length, this.preventDefaultBrowserBehaviors(), e(window).resize(function () {
                    t.relayout()
                }), this.numPages <= 1 ? this.relayout() : (this.$carousel.addClass("pannable"), this.buildPageNavigation(), this.relayout(), this.scrollTo(0, !1, !1), this.setupSwipe())
            }, a.prototype.setupSwipe = function () {
                var e = this;
                this.$carousel.wheelswipe(function (t) {
                    e.snapToPage(e.currentPage + t, !0)
                });
                var t = 0, a = -1, n = !1;
                new Hammer(this.$carousel.get(0), {dragLockToAxis: !0}).on("panend pan swipe", function (i) {
                    i.preventDefault(), i.srcEvent.preventDefault();
                    var s = i.deltaX < 0;
                    switch (i.type) {
                        case"pan":
                            if (!n) {
                                var o = i.deltaX - t;
                                e.panning = !0, a < 0 && (a = e.currentPage), e.$carousel.addClass("panning"), e.scrollTo(e.scrollX - o), t = i.deltaX
                            }
                            break;
                        case"swipe":
                            n = !0, t = 0, s = 0 == (i.direction & Hammer.DIRECTION_RIGHT), e.snapToPage(a + (s ? 1 : -1), !0), setTimeout(function () {
                                e.panning = !1, a = -1, e.$carousel.removeClass("panning")
                            }, 0), i.srcEvent.stopPropagation();
                            break;
                        case"panend":
                            n || (t = 0, e.snapToPage(e.currentPage, !0), setTimeout(function () {
                                e.panning = !1, a = -1, e.$carousel.removeClass("panning")
                            }, 0)), n = !1
                    }
                })
            }, a.prototype.preventDefaultBrowserBehaviors = function () {
                var t = this;
                this.$carousel.on("dragstart", function (e) {
                    e.preventDefault()
                }).on("click", function (e) {
                    t.panning && (e.preventDefault(), e.stopPropagation())
                }).on("wheel", function (e) {
                    Math.abs(e.originalEvent.deltaX) && e.preventDefault()
                }).on("focusin", function (a) {
                    var n = e(a.target).parents(".page");
                    n.length && setTimeout(function () {
                        t.$carousel.scrollLeft(0), t.snapToPage(n.index(), !0)
                    }, 0)
                })
            }, a.prototype.buildPageNavigation = function () {
                var t = this;
                this.$edgeClickerPrev = e("<div>").addClass("edge-clicker prev").appendTo(this.$carousel).click(function () {
                    t.snapToPage(t.currentPage - 1, !0)
                }), this.$edgeClickerNext = e("<div>").addClass("edge-clicker next").appendTo(this.$carousel).click(function () {
                    t.snapToPage(t.currentPage + 1, !0)
                }), this.$pageDots = e("<div>").addClass("page-dots").appendTo(this.$carousel);
                for (var a = 0; a < this.numPages; a++) this.$pageDots.append(e("<div>").addClass("page-dot").click(function () {
                    t.snapToPage(e(this).index(), !0)
                }))
            }, a.prototype.loadPageByIndex = function (e) {
                e < 0 || e >= this.numPages || e in this.loadedPages || (this.loadedPages[e] = !0, this.opts.loadPage(this.$pages.eq(e)))
            }, a.prototype.scrollTo = function (t, a, n) {
                void 0 === n && (n = !0), void 0 === a && (a = !1), this.scrollX = Math.max(0, Math.min((this.pageWidth + this.pageSpacing) * (this.numPages - 1), t)), this.$pageScroller.toggleClass("animate-scroll", a).css("transform", "translate3d(" + -this.scrollX + "px,0,0)");
                var i = Math.round(this.scrollX / this.pageWidth);
                if (this.currentPage != i) {
                    this.currentPage = i, n && (this.loadPageByIndex(this.currentPage - 1), this.loadPageByIndex(this.currentPage), this.loadPageByIndex(this.currentPage + 1));
                    var s = this;
                    this.$pageDots && this.$pageDots.find(".page-dot").each(function (t) {
                        e(this).toggleClass("active", t == s.currentPage)
                    }), this.$carousel.trigger("carouselpagechanged")
                }
            }, a.prototype.snapToPage = function (e, t) {
                this.scrollTo(e * (this.pageWidth + this.pageSpacing), t)
            }, a.prototype.relayout = function () {
                this.pagePeek = window.screen.width < 480 ? 16 : 32, this.pageSpacing = 16, this.pagerWidth = this.$carousel.width(), this.pageWidth = this.pagerWidth - 2 * (this.pagePeek + this.pageSpacing), this.$edgeClickerPrev && (this.$edgeClickerPrev.css({width: this.pagePeek}), this.$edgeClickerNext.css({width: this.pagePeek})), this.$carousel.find(".page").css({
                    width: this.pageWidth,
                    minWidth: this.pageWidth,
                    marginRight: this.pageSpacing
                }), this.$carousel.find(".page:first-child").css({marginLeft: this.pageSpacing + this.pagePeek}), this.$carousel.find(".page:last-child").css({marginRight: this.pagePeek})
            }
        }(jQuery)
    }, {"./_jquery-wheelswipe": 2}], 2: [function (e, t, a) {
        !function (e) {
            e.fn.wheelswipe = function (t) {
                t = t || function () {
                };
                var a, n, i;
                return e(this).on("wheel", function (e) {
                    var s = e.originalEvent.deltaX < 0 ? -1 : 1, o = Math.abs(e.originalEvent.deltaX);
                    return o < Math.abs(e.originalEvent.deltaY) || (i || o < 30 ? (n = o, !1) : ((o > n || s != a) && (a = s, i = !0, setTimeout(function () {
                        i = !1
                    }, 300), t(s)), !1))
                }), this
            }
        }(jQuery)
    }, {}], 3: [function (e, t, a) {
        function n() {
            $(".pages").carousel(), $(window).resize(function () {
                $(".media").each(function () {
                    l($(this))
                })
            }), $(".media").each(function () {
                l($(this))
            })
        }

        function i() {
            function e() {
                $("body").removeClass("has-fullscreen"), n = null
            }

            function t(e) {
                n = e;
                var t = e.find("img, video").first().clone(), i = e.find(".loading-spinner").clone();
                a.empty().append(t).append(i), t.is("video") && (setTimeout(function () {
                    a.addClass("loading")
                }, 10), t.on("canplay", function () {
                    t.addClass("loaded"), a.addClass("loaded").removeClass("loading"), t.get(0).play()
                }), t.get(0).load()), setTimeout(function () {
                    $("body").addClass("has-fullscreen")
                }, 10)
            }

            var a = $("<div>").addClass("fullscreen-overlay loader-parent").click(function () {
                e()
            }).appendTo("body"), n = null;
            $(".page:not(.no-fullscreen) .media").on("click keydown", function (e) {
                "keydown" == e.type && 13 != e.keyCode || (a.removeClass("loaded loading"), $(this).parents(".panning").length > 0 || t($(this)))
            }), $(document).on("keydown", function (t) {
                27 == t.keyCode && e()
            }), window.loadFullscreenMedia = t, window.getCurrentFullscreenMedia = function () {
                return n
            }
        }

        function s() {
            $(".pages").on("carouselpagechanged", function () {
                $(this).carousel("getPage")
            }), $(document).on("keydown", function (e) {
                if (37 == e.keyCode || 39 == e.keyCode) {
                    var t = 37 == e.keyCode ? -1 : 1;
                    if ($("body").hasClass("has-fullscreen")) {
                        var a = getCurrentFullscreenMedia();
                        if (a) {
                            var n = a.parent(".page")[-1 == t ? "prev" : "next"](".page:not(.no-fullscreen)");
                            n.length && loadFullscreenMedia(n.find(".media"))
                        }
                    } else {
                        var i = $(window).height(), s = null, o = 0;
                        $(".pages").each(function () {
                            var e = $(this).get(0).getBoundingClientRect(), t = e.bottom - e.top,
                                a = (Math.min(e.bottom, i) - Math.max(e.top, 0)) / t;
                            a > o && (s = $(this), o = a)
                        }), s && s.carousel("setPage", s.carousel("getPage") + t)
                    }
                }
            })
        }

        function o() {
            function e() {
                c($(n), !0)
            }

            function t() {
                var e = $(window).width(), t = $(window).height();
                i.each(function () {
                    var a = $(this).get(0).getBoundingClientRect();
                    a.bottom < 0 || a.right < 0 || a.left > e || a.top > t || ($(this).addClass("was-visible"), i = $("section.project:not(.was-visible)"))
                })
            }

            var a, n = null;
            $(document).on("mouseenter", ".page.video .media", function () {
                a && (clearTimeout(a), a = 0), n = this, a = setTimeout(e, 100)
            }).on("mouseleave", ".page.video .media", function () {
                a && (clearTimeout(a), a = 0), c($(this), !1)
            }).on("click", ".page.video .media", function () {
                $(this).find("video").get(0).currentTime = 0
            });
            var i = $("section.project:not(.was-visible)");
            t(), $(window).on("scroll resize", t)
        }

        function r() {
            $(".media video").on("resize", function () {
                l($(this).parents(".media"))
            }), $(".media img").on("load", function () {
                l($(this).parents(".media"))
            })
        }

        function l(e) {
            var t = e.children().eq(0);
            if (t.length && !e.parent(".page").hasClass("no-scale")) {
                var a = e.width(), n = e.height(), i = t.get(0).offsetWidth, s = t.get(0).offsetHeight, o = 1;
                o = i / s > a / n ? a / i : n / s, o = Math.min(o, 1), t.css("transform", "scale(" + o + ")")
            }
        }

        function c(e, t) {
            e.data("should-be-playing", t);
            var a = e.find("video");
            t ? e.hasClass("loaded") ? a.get(0).play() : (e.addClass("loading"), a.off("canplay").on("canplay", function () {
                e.addClass("loaded").removeClass("loading"), e.data("should-be-playing") && a.get(0).play()
            }), a.get(0).load()) : a.get(0).pause()
        }

        e("./_jquery-carousel"), $(document).ready(function () {
            n(), r(), o(), i(), s(), FastClick.attach(document.body), $(".project a").attr("target", "_blank")
        })
    }, {"./_jquery-carousel": 1}]
}, {}, [3]);