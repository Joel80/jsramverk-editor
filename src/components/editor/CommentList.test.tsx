import { render, screen } from '@testing-library/react';
import CommentList from './CommentList';

test('comment list renders with correct comments', () => {

    const _id = "1";

    const key = 1;

    const comments = [
        {
            date: new Date("2022-10-19"),
            user: "test@test.se",
            text: "A comment",
            range: [1, 1]
        },

        {
            date: new Date("2022-10-19"),
            user: "test@test.se",
            text: "Another comment",
            range: [2, 2]
        },
    ]

    render(<CommentList comments={comments}/>)

    const commentCard1 = screen.getByText("A comment");

    expect(commentCard1).toBeInTheDocument();

    const commentCard2 = screen.getByText("Another comment");

    expect(commentCard2).toBeInTheDocument();

    //screen.debug();
    
 });