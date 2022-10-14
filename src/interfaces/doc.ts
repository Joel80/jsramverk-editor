import comment from './comment';
export default interface doc {
    _id: string | null;
    name: string;
    html: string | undefined;
    allowed_users: string[];
    code: boolean | undefined;
    comments: comment[];
}