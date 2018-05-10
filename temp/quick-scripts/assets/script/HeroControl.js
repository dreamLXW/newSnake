(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/HeroControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5efdeE3P7lCvpDrrHe27I3A', 'HeroControl', __filename);
// script/HeroControl.js

"use strict";

var MOVE_LEFT = 1;
var MOVE_RIGHT = 2;
var MOVE_UP = 3;
var MOVE_DOWN = 4;

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 10,
        moveDelayed: 1,
        tailNode: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.body = this.getComponent(cc.RigidBody);
        this.moveStage = MOVE_RIGHT;
        this.time = 0;
        this.live = false;
    },


    init: function init(params) {
        this.GameJs = params.GameJs;
    },

    onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
            case cc.KEY.w:
                if (this.moveStage != MOVE_DOWN) this.moveStage = MOVE_UP;
                break;
            case cc.KEY.a:
                if (this.moveStage != MOVE_RIGHT) this.moveStage = MOVE_LEFT;
                break;
            case cc.KEY.s:
                if (this.moveStage != MOVE_UP) this.moveStage = MOVE_DOWN;
                break;
            case cc.KEY.d:
                if (this.moveStage != MOVE_LEFT) this.moveStage = MOVE_RIGHT;
                break;
            default:
                break;
        }
    },


    reset: function reset() {
        this.deleteTail();
        this.moveStage = MOVE_RIGHT;
        this.time = 0;
        this.live = true;
        this.node.position = cc.v2(0, 0);
    },

    update: function update(dt) {
        //this.speed = this.body.linearVelocity;
        this.time += dt;
        if (this.time >= this.moveDelayed && this.live) {
            this.node.oldPosition = cc.v2(this.node.x, this.node.y);
            if (this.moveStage == MOVE_LEFT) {
                this.node.x -= this.speed;
            } else if (this.moveStage == MOVE_RIGHT) {
                this.node.x += this.speed;
            } else if (this.moveStage == MOVE_UP) {
                this.node.y += this.speed;
            } else if (this.moveStage == MOVE_DOWN) {
                this.node.y -= this.speed;
            }
            this.node.offset = cc.v2(this.node.x - this.node.oldPosition.x, this.node.y - this.node.oldPosition.y);
            this.updateTailPositon();
            this.time = 0;
        }
        //this.body.linearVelocity = this.speed
    },
    updateTailPositon: function updateTailPositon() {
        for (var i = 0; i < this.tailNode._children.length; i++) {
            if (this.tailNode._children.length - i - 1 == 0) {
                this.tailNode._children[this.tailNode._children.length - i - 1].position = this.node.oldPosition;
            } else {
                this.tailNode._children[this.tailNode._children.length - i - 1].position = this.tailNode._children[this.tailNode._children.length - i - 2].position;
            }
        }
    },


    onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.tag === 999) {
            this.live = false;
            this.GameJs.gameOver();
            return cc.log("GAME OVER");
        }
        otherCollider.node.parent = this.tailNode;
    },

    deleteTail: function deleteTail() {
        var i = 0;
        while (this.tailNode._children.length) {
            this.tailNode._children[i].destroy();
            i++;
            if (i >= this.tailNode._children.length) {
                return;
            }
        }
    },
    grtScore: function grtScore() {
        return this.tailNode._children.length;
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=HeroControl.js.map
        