import "./CommentButton.css";
import "./CommentInput.css"

export default  function AddComment({handleAddCommentButtonClick, handleCancelCommentButtonClick}: {handleAddCommentButtonClick(): void, handleCancelCommentButtonClick(): void}) {

    return (
            <>
                <input className="comment-input" id="commentInput"></input>
                <button className="comment-button" onClick={handleAddCommentButtonClick}>Add comment</button>
                <button className="comment-button" onClick={handleCancelCommentButtonClick}>Cancel</button>
            </>
    );
};
