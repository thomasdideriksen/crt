//
// Animator
//
Animator = function() {
    this._animations = {};
}

Animator.prototype = {
    
    constructor: Animator,
    
    start: function(name, from, to, duration) {
        var animation = {
            from: from,
            to: to,
            duration: duration,
            t0: Date.now(),
        };
        this._animations[name] = animation;
    },
    
    set: function(name, value) {
        this.start(name, value, 0);
    },
    
    finished: function() {
        for (var key in this._animations) {
            if (!this._animations[key].finished) {
                return false;
            }
        }
        return true;
    },
        
    get: function(name) {
        var animation = this._animations[name];
        if (!animation) {
            return 0;
        }
        var dt = Date.now() - animation.t0;
        var t = Math.min(1.0, dt / animation.duration);
        if (t < 1.0) {
            t = t - 1.0;
            t = -(t * t * t * t - 1.0);
            return animation.from + t * (animation.to - animation.from);
        } else {
            animation.finished = true;
            return animation.to;
        }
    },
}