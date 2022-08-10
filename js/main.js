class User{
    static id = 1
    constructor(name, {image= 'default Image'}={}){
        this.id = User.id;
        this.name = name;
        this.image = image;
        User.id++;
    }
}

export class UserComment{
    static id = 1
    constructor(user, text, score, createdAt, replyingAt){
        this.id = UserComment.id;
        this.user = user;
        this.text = text;
        this.score = score;
        this.createdAt = createdAt;
        this.replyingAt = replyingAt;
        this.replies = [];
        UserComment.id++;
    }
}

let user1 = new User('amyrobson', {image: './images/avatars/image-amyrobson.png'})
let user2 = new User('maxblagun', {image: './images/avatars/image-maxblagun.png'})
let user3 = new User('ramsesmiron', {image: './images/avatars/image-ramsesmiron.png'})
let user4 = new User('juliusomo', {image: './images/avatars/image-juliusomo.png'})

let com1 = new UserComment(
    user1,
    "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    12,
    '2 months ago'
    )
let com2 = new  UserComment(
    user2,
    "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    5,
    '2 weeks ago'
    )
let com3 = new  UserComment(
    user3,
    "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
    4,
    '2 months ago',
    {replyingAt: com2}
    )
com2.replies.push(com3) 

import comment from './comment.js'
import commentlist from './commentList.js'
import reply from './reply.js'

import { createApp } from 'vue'

const app = createApp({
    data(){
        return{
            rootComments: [com1, com2],
            replyingAt: null
        }
    },
    provide(){
        return{
            currentUser: user4,
            rootComments: this.rootComments
        }
    },
    methods:{
        submitComment(comment){
            console.log(comment)
            this.rootComments.push(comment)
            console.log(this.rootComments)
        }
    }
})
app.component('comment', comment)
app.component('commentlist', commentlist)
app.component('reply', reply)
app.mount('#app')
