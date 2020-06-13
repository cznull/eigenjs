        function mul(a, b) {
            return [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
        }
        function add(a, b) {
            return [a[0] + b[0], a[1] + b[1]];
        }
        function sub(a, b) {
            return [a[0] - b[0], a[1] - b[1]];
        }
        function conj(a) {
            return [a[0], -a[1]];
        }
        function abs(a) {
            return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
        }
