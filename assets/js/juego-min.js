const moduloJuego = (() => { "use strict"; let e = [], t = ["C", "D", "H", "S"], r = ["A", "J", "Q", "K"], l = [], n = document.querySelector("#btnPedir"), a = document.querySelector("#btnDetener"), o = document.querySelectorAll("small"), d = document.querySelectorAll(".divCartas"), s = (t = 2) => { i(), e = u(e), l = []; for (let r = 0; r < t; r++)l.push(0), o[r].innerText = 0, d[r].innerHTML = ""; b() }, i = () => { e = []; for (let l = 2; l <= 10; l++)for (let n of t) e.push(`${l}${n}`); for (let a of t) for (let o of r) e.push(`${o}${a}`) }, u = e => { for (let t = e.length - 1; t > 0; t--) { let r = Math.floor(Math.random() * (t + 1));[e[t], e[r]] = [e[r], e[t]] } return e }, c = () => { if (0 === e.length) throw "No hay cartas en el deck"; return e.pop() }, _ = e => { let t = e.substring(0, e.length - 1); return isNaN(t) ? "A" === t ? 11 : 10 : 1 * t }, $ = (e, t) => (l[t] += _(e), o[t].innerText = l[t], l[t]), f = (e, t) => { let r = document.createElement("img"); r.classList.add("carta"), r.src = `./assets/cartas/${e}.png`, d[t].append(r) }, g = e => { let t = 0; do { let r = c(); if (t = $(r, l.length - 1), f(r, l.length - 1), e > 21) break } while (t < e && e <= 21); setTimeout(() => { h() }, 100) }; function h() { let [e, t] = l; t === e ? alert("Nadie gana") : e > 21 ? alert("Computadora gana") : t > 21 ? alert("Jugador gana") : alert("Computadora gana") } function p() { n.disabled = !0, a.disabled = !0 } function b() { n.disabled = !1, a.disabled = !1 } return n.addEventListener("click", () => { let e = c(), t = $(e, 0); f(e, 0), t >= 21 && (p(), g(l[0])) }), a.addEventListener("click", () => { p(), g(l[0]) }), { nuevoJuego: s } })()