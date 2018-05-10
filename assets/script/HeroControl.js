
const MOVE_LEFT = 1
const MOVE_RIGHT = 2
const MOVE_UP = 3
const MOVE_DOWN = 4

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 10,
        moveDelayed: 1,
        tailNode:{
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.body = this.getComponent(cc.RigidBody)
        this.moveStage = MOVE_RIGHT
        this.time = 0
        this.live = false
    },

    init : function (params) {
        this.GameJs = params.GameJs
    },

    onKeyDown (event) {
        switch (event.keyCode) {
            case cc.KEY.w:
                if(this.moveStage != MOVE_DOWN)
                    this.moveStage = MOVE_UP
                break;
            case cc.KEY.a:
                if (this.moveStage != MOVE_RIGHT)
                    this.moveStage = MOVE_LEFT
                break;
            case cc.KEY.s:
                if (this.moveStage != MOVE_UP)
                    this.moveStage = MOVE_DOWN
                break;
            case cc.KEY.d:
                if (this.moveStage != MOVE_LEFT)
                    this.moveStage = MOVE_RIGHT
                break; 
            default:
                break;
        }
    },

    reset : function () {
        this.deleteTail()
        this.moveStage = MOVE_RIGHT
        this.time = 0
        this.live = true
        this.node.position = cc.v2(0,0)
    },

    update (dt) {
        //this.speed = this.body.linearVelocity;
        this.time += dt
        if (this.time >= this.moveDelayed && this.live) {
            this.node.oldPosition = cc.v2(this.node.x, this.node.y)
            if (this.moveStage == MOVE_LEFT) {
                this.node.x -= this.speed
            }
            else if (this.moveStage == MOVE_RIGHT) {
                this.node.x += this.speed
            }
            else if (this.moveStage == MOVE_UP) {
                this.node.y += this.speed
            }
            else if (this.moveStage == MOVE_DOWN) {
                this.node.y -= this.speed
            }
            this.node.offset = cc.v2(this.node.x - this.node.oldPosition.x, this.node.y - this.node.oldPosition.y)
            this.updateTailPositon()
            this.time = 0
        }
        //this.body.linearVelocity = this.speed
    },

    updateTailPositon()
    {
        for(let i = 0; i < this.tailNode._children.length; i++)
        {
            if (this.tailNode._children.length - i - 1 == 0)
            {
                this.tailNode._children[this.tailNode._children.length - i - 1].position = this.node.oldPosition
            }
            else
            {
                this.tailNode._children[this.tailNode._children.length - i - 1].position = this.tailNode._children[this.tailNode._children.length - i - 2].position
            }
            
        }
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.tag === 999) {
            this.live = false
            this.GameJs.gameOver()
            return cc.log("GAME OVER")
        }
        otherCollider.node.parent = this.tailNode
    },

    deleteTail()
    {
        let i = 0
        while (this.tailNode._children.length) {
            this.tailNode._children[i].destroy()
            i++
            if (i >= this.tailNode._children.length) {
                return
            }
        }
    },

    grtScore()
    {
        return this.tailNode._children.length
    }
});
