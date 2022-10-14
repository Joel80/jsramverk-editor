import './CommentCard.css';
import docComment from  '../../interfaces/comment';

export default function CommentCard({comment}: {comment: docComment}) {
    return (
        <div className='comment-card'>
            <p>{comment.date.toLocaleString()}</p>
            <p>{comment.user}</p>
            <p>{comment.text}</p>
        </div>
    );

}