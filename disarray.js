class DisArray extends Array {

    constructor() {
        super();

        let _choice_at = -1;
        let _base = this;
        let _sort = DisArray.prototype.sort;

        function __next() {
            _choice_at++;
            return _choice_at < _base.length ? _base[_choice_at] : null
        }

        function __reject() {
            _base.splice(_choice_at, 1)
            _choice_at--;
        }

        Object.assign(this, {
            displace(item) {
                let pos = this.length < 2 ? 0 : Math.floor(Math.random() * this.length);

                if (!this.includes(item)) {
                    this.splice(pos, 0, item);
                    return true;
                }
                return false;
            },
            disarrange() {
                this.sort((a, b) => {
                    return Math.random() > 0.5 ? 1 : -1;
                })
            },
            choices(){


                return {
                    next:__next,
                    reject:__reject
                }
            },
            concat(...arr){
                let out = new DisArray();
                function _c(arr) {
                    for (let idx in arr) {
                        out.push(arr[idx]);
                    }
                }
                _c(this);
                for (let idx in arr) {
                    _c(arr[idx])
                }
                out.disarrange();
                return out;
            }
        });

        DisArray.prototype.push = this.displace;
        // DisArray.prototype.sort = this.disarrange;
    }

}

module.exports = DisArray;