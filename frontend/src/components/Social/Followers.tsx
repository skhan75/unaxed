import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';
// import './social.css';

// Define the follower interface
interface Follower {
    id: number;
    name: string;
}


const Followers: React.FC = () => {
    // const [followers, setFollowers] = useState<Follower[]>([]);

    const { userData } = useUser();
    const followers = userData?.followers;
    const followersCount = userData?.followersCount;

    console.log('followers', followersCount);
    

    return (
        <div>
            <h1>Followers</h1>
            {followersCount > 0 ? (
                <ul>
                    {Object.keys(followers).map((followerId: any) => (
                        <li key={followerId}>{followers[followerId]}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading followers...</p>
            )}
        </div>
    );
};

export default Followers;