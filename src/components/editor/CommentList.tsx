import CommentCard from './CommentCard';
import docComment from '../../interfaces/comment';

export default function CommentList({comments}: {comments: docComment[]}) {

    const commentItems = comments.map((comment: docComment, index) => {
        if(comment.user && comment.date && comment.range && comment.text) {
            return <CommentCard _id={`commentCard${index}`} comment={comment} key={index} />
        }

        return <div key={index}></div>;
    });

    return (
        <div className="comment-list">
            {commentItems}
        </div>
    )
}