export default{
    props: ['comments'],
    template: /*html*/ `
    <div>
        <comment v-for="comment in comments" :key="comment.id" :comment="comment">
        </comment>
    </div>
    `
}