import { UserComment } from "./main.js"

export default{
    data(){
        return{
            textArea: ''
        }
    },
    inject:['currentUser'],
    props:['replyingat'],
    emits:['submit'],
    methods:{
        submitComment(){
            let newComment = new UserComment(this.currentUser, this.textArea, 0, 'now', this.replyingat)
            this.textArea = ''
            if(this.replyingat === null){
                this.$emit('submit', newComment)
            }
            else{
                this.$emit('submit')
                this.replyingat.replies.push(newComment)
            }
        }
    },
    template: /*html*/ `
    <div class="d-flex bg-white rounded p-3">
        <div class="me-2">
            <img src="./images/avatars/image-juliusomo.png" alt="user" />
        </div>
        <form @submit.prevent="submitComment" class="d-flex flex-grow-1">
            <textarea v-model='textArea' class="flex-grow-1" rows="5" placeholder="Add a comment" style="resize: none"><span>Hello</span></textarea>
            <div class="ms-2">
                <button type="submit" class="border-0 bg-danger text-white rounded p-2">Send</button>
            </div>
        </form>
    </div>
    `
}