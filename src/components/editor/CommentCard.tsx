import './CommentCard.css';
import docComment from  '../../interfaces/comment';
import { useEffect, useRef } from 'react';

export default function CommentCard({_id, comment}: {_id: string, comment: docComment}) {
    const commentDate = new Date(comment.date);
    const innerRef = useRef(null);
    useEffect(()=> {
        const div = innerRef.current as HTMLDivElement | null;
        if (div) {
            div.addEventListener("mouseover", (e)=>{
                div.style.backgroundColor="purple";
                div.style.color="white";
                div.style.padding="1.2em";
                const element = document.querySelector("trix-editor") as any | null;
                if (element) {
                    element.editor.setSelectedRange(comment.range);
                }
            });

            div.addEventListener("mouseout", (e)=> {
                div.style.backgroundColor="white";
                div.style.color="black";
                div.style.padding="1em";
                const element = document.querySelector("trix-editor") as any | null;
                if (element) {
                    element.editor.setSelectedRange(comment.range);
                    const end = element.editor.getDocument().toString().length - 1;
                    element.editor.setSelectedRange(end);
                }
            });

           /*  return () => {
                div.removeEventListener("click");
              }; */
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='comment-card' id={_id} ref={innerRef}>
            <p>{commentDate.toLocaleString('no-NO')}</p>
            <p>{comment.user}</p>
            <p>{comment.text}</p>
        </div>
    );

}