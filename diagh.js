        function getq(aii, ajj, aij) {
            var denom = aii[0] - ajj[0];
            var dir = [aij[0] / abs(aij), aij[1] / abs(aij)];
            if (Math.abs(denom) <= 1e-10) {
                return [[Math.sqrt(0.5), 0], [Math.sqrt(0.5) * dir[0], Math.sqrt(0.5) * dir[1]]];
            }
            else {
                var theta = 0.5 * Math.atan(2 * abs(aij) / denom);
                return [[Math.cos(theta), 0], [Math.sin(theta) * dir[0], Math.sin(theta) * dir[1]]];
            }
        }
        
        function qaq(Hij, q, i, j, N) {
            var c = q[0];
            var s = q[1];
            for (var k = 0; k < N; k++) {
                var temp = add(mul(c, Hij[i * N + k]), mul(s, Hij[j * N + k]));
                Hij[j * N + k] = sub(mul(c, Hij[j * N + k]), mul(conj(s), Hij[i * N + k]));
                Hij[i * N + k] = temp;
            }

            for (var k = 0; k < N; k++) {
                if (k != i && k != j) {
                    Hij[k * N + j] = conj(Hij[j * N + k]);
                    Hij[k * N + i] = conj(Hij[i * N + k]);
                }
                else {
                    var temp = add(mul(c, Hij[k * N + i]), mul(conj(s), Hij[k * N + j]));
                    Hij[k * N + j] = sub(mul(c, Hij[k * N + j]), mul(s, Hij[k * N + i]));
                    Hij[k * N + i] = temp;
                }
            }
        }

        function diag(x, N) {
            var e0 = 1;
            var q;
            while (e0 > 1e-6) {
                var flag = 1;
                while (flag) {
                    flag = 0;
                    for (var i = 0; i < N; i++) {
                        for (var j = i + 1; j < N; j++) {
                            if (abs(x[i * N + j]) >= e0) {
                                q = getq(x[i * N + i], x[j * N + j], x[i * N + j]);
                                qaq(x, q, i, j, N);
                                flag++;
                            }
                        }
                    }
                }
                if (flag < N / 2) {
                    e0 = e0 * 0.5;
                }
            }
            e0 = 1e-7;
            var flag = 1;
            while (flag) {
                flag = 0;
                for (var i = 0; i < N; i++) {
                    for (var j = i + 1; j < N; j++) {
                        if (abs(x[i * N + j]) >= e0) {
                            q = getq(x[i * N + i], x[j * N + j], x[i * N + j]);
                            x = qaq(x, q, i, j, N);
                            flag++;
                        }
                    }
                }
            }

            var Ei = [];

            for (var _i2 = 0; _i2 < N; _i2++) {
                Ei[_i2] = x[_i2 * N + _i2][0];
            }
            return Ei;
        }
