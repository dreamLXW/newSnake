"use strict";
cc._RF.push(module, 'b5b8dlSfQFNgJvsiTN5QtgA', 'TailItem');
// script/TailItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.tailFree = true;
    },


    onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        if (!this.tailFree) {
            cc.log("GAME OVER！！！");
        }
        this.tailFree = false;
    }
    // update (dt) {},
});

cc._RF.pop();