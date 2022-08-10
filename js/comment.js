export default{
    data(){
        return{
            replyActive: false
        }
    },
    methods:{
        increaseScore(){
            this.comment.score++
        },
        decreaseScore(){
            if(this.comment.score == 0) return
            this.comment.score--
        },
        isCurrentUser(){
            if(this.comment.user.id === this.currentUser.id){
                return true
            }
            return false
        },
        deleteComment(){
            if(this.comment.replyingAt === null){
                console.log('im working')
                this.rootComments = this.rootComments.filter(comment => comment !== this.comment)
            }
            else{
                this.comment.replyingAt.replies = this.comment.replyingAt.replies.filter(comment => comment !== this.comment)
            }
        },
        editComment(){

        },
        toggleReplyForm(){
            this.replyActive = !this.replyActive
        }
    },
    inject: ['currentUser', 'rootComments'],
    props: ['comment'],
    template: /*html*/ `
    <div class="row bg-white rounded position-relative p-3 m-0 mb-3">
        <div class="col-12 col-md-11">
            <div class="d-flex align-items-center mb-2">
                <img :src="comment.user.image" alt="user">
                <h3 class="mx-3">{{comment.user.name}}</h3><s>{{comment.createdAt}}</s>
            </div>
            <section>
                <p>{{comment.text}}</p>
            </section>
        </div>
        <div class="col-12 col-md-1 order-md-first d-flex justify-content-between justify-content-md-center align-items-center">
            <div class="d-md-flex flex-column text-center bg-warning rounded p-2">
                <button @click="increaseScore" class="border-0 bg-transparent">
                    <img src="images/icon-plus.svg" alt="">
                </button>
                {{comment.score}}
                <button @click="decreaseScore" class="border-0 bg-transparent">
                    <img src="images/icon-minus.svg" alt="">
                </button>
            </div>
            <div class="d-inline-block position-md-absolute">
                <div v-if="isCurrentUser()">
                    <button @click="deleteComment" class="border-0 bg-transparent text-danger">
                        <img src="images/icon-delete.svg">Delete
                    </button>
                    <button @click="editComment" class="border-0 bg-transparent">
                        <img src="images/icon-edit.svg">Edit
                    </button>
                </div>
                <div v-else>
                    <button @click="toggleReplyForm" class="border-0 bg-transparent">
                        <img src="images/icon-reply.svg" alt="">Reply
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="replyActive">
        <reply :replyingat="this.comment" @submit="toggleReplyForm"></reply>
    </div>
    <div v-if="comment.replies.length > 0" class="ms-md-5">
        <commentlist :comments="comment.replies"></commentlist>
    </div>
    `
}