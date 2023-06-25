import React from 'react';
import { FaUser } from 'react-icons/fa';
import './styles/posts.css';
import UserAvatar from '../UserAvatar';
import { useUser } from '../../contexts/UserContext';
import { Create } from '@styled-icons/ionicons-outline';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';

const Posts: React.FC<any> = () => {
    const posts = [
        {
            id: 1,
            author: 'John Doe',
            content: 'This is my first post!',
            date: 'June 25, 2023'
        },
        {
            id: 2,
            author: 'Jane Smith',
            content: 'Hello, world!',
            date: 'June 26, 2023'
        },
        {
            id: 3,
            author: 'Alice Johnson',
            content: 'Feeling great today!',
            date: 'June 27, 2023'
        }
    ];

    const { userData } = useUser();

    const imageUrl = userData?.profileImageUrl;

    return (
        <div className="posts-container">
            <div className="create-post-container">
                <textarea className="post-input" placeholder="Write your post..."></textarea>
                <ButtonWithIcon
                    title="Create Post"
                    icon={<Create className="post-icon" size={18} />}
                    iconPosition="left"
                />
            </div>

            <div className="posts-list">
                {posts.map(post => (
                    <div className="post" key={post.id}>
                        <div className="post-box">
                            <div className="post-header">
                                <UserAvatar className="post-author-icon" profileImageUrl={imageUrl} size={48} />
                                <div className="profile-user-metadata">
                                    <div className="metadata-header">
                                        <span className="post-author">{userData?.fullName}</span>
                                    </div>
                                    <div className="metadata-footer">
                                        <span className="post-date">{post.date}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="post-content">{post.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts;
