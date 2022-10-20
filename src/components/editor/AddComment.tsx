import "./CommentButton.css";
import "./CommentInput.css"

export default  function AddComment({handleAddCommentButtonClick, handleCancelCommentButtonClick}: {handleAddCommentButtonClick(): void, handleCancelCommentButtonClick(): void}) {

    return (
            <>
                <input data-testid="comment-input" className="comment-input" id="commentInput"></input>
                <div className="comment-buttons">
                    <button className="add-comment-button" onClick={handleAddCommentButtonClick}>Add comment</button>
                    <button className="cancel-comment-button" onClick={handleCancelCommentButtonClick}>Cancel</button>
                </div>
                
            </>
    );
};
