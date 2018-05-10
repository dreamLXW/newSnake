

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.tailFree = true
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if(!this.tailFree)
        {
            cc.log("GAME OVER！！！")
        }
        this.tailFree = false
    }
    // update (dt) {},
});
