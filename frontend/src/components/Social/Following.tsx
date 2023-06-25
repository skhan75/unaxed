import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import UserAvatar from '../UserAvatar';
// import './social.css';

// Define the follower interface
interface Follower {
    id: number;
    name: string;
}


const Following: React.FC = () => {
    // const [followers, setFollowers] = useState<Follower[]>([]);

    const { userData } = useUser();
    const following = userData?.following;
    const followingCount = userData?.followingCount;
    

    return (
        <div>
            <h1>Following</h1>
            {followingCount > 0 ? (
                <div className="followerfollowing-list">
                    {Object.keys(following).map((followingId: any) => (
                        <div key={followingId} className="followerfollowing-list-item">
                            <UserAvatar size={32} profileImageUrl={following[followingId].profileImageUrl} />
                            <h3 className="followerfollowing-title">{following[followingId].username}</h3>
                            <button className="unfollow-btn"> Unfollow </button>
                        </div>
                    ))}
                </div>
            ) : (
                    <p>Loading Following...</p>
            )}
        </div>
    );
};

export default Following;