import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import CommentCard from './CommentCard';

test('comment card renders with correct comment', () => {

    const _id = "1";

    const key = 1;

    const comment = {
        date: new Date("2022-10-19"),
        user: "test@test.se",
        text: "A comment",
        range: [1, 1]

    }

    render(<CommentCard _id={_id} comment={comment} key={key}/>)

    const commentCard = screen.getByText("A comment");

    expect(commentCard).toBeInTheDocument();

    const user = userEvent.setup();

    user.hover(commentCard);

    //screen.debug();
    
 });