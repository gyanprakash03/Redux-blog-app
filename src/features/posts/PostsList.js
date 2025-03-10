import { useSelector } from "react-redux";
import { selectPostIds, getPostsStatus, getPostsError } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from './postsSlice';
import { fetchUsers } from '../users/usersSlice';

const PostsList = () => {

    const dispatch = useDispatch();

    const orderedPostIds = useSelector(selectPostIds)
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    useEffect(() => {
        // only dispatch when not present in slice
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
            dispatch(fetchUsers())
        }
    }, [])

    let content;
    if (postStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postStatus === 'succeeded') {
        content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <section>
            {content}
        </section>
    )
}
export default PostsList