import React, { useEffect, useState } from 'react';
import './social-styles.css';
import UserAvatar from '../UserAvatar';
import { followUser, getDataForUser, getDataForUserByUserId, unfollowUser } from '../../firebase';
import { useUser } from '../../contexts/UserContext';
import { useAuth } from '../../contexts/AuthContext';

// Define the follower interface
interface Follower {
    id: number;
    name: string;
}


const Followers: React.FC = () => {
    const { userData:primaryUserData } = useUser();
    const { user } = useAuth();

    const followers = primaryUserData?.followers;
    const following = primaryUserData?.following;
    const followersCount = primaryUserData?.followersCount;
    const followingCount = primaryUserData?.followingCount;


    const isUserFollowing = (followerId: string) => {
        return following && following.hasOwnProperty(followerId);
    };

    const handleFollow = async(followerId: string) => {
        try {
            const followerUserData = await getDataForUserByUserId(followerId);
            console.log("Follower User Data", followerUserData)
            if (followerUserData) {
                await followUser(user, followerUserData);
            } else {
                throw new Error('Unable to follow user. User not found.');
            }
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    const handleUnfollow = (followerId: string) => {
        try {
            // await unfollowUser(user, primaryUserData);
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    return (
        <div>
            <h1>Followers</h1>
            {followersCount > 0 ? (
                <div className="followerfollowing-list">
                    {Object.keys(followers).map((followerId: any) => {
                        const isFollowing = isUserFollowing(followerId);
                        const follower = followers[followerId];
                      
                        const handleButtonClick = () => {
                            if (isFollowing) {
                                handleUnfollow(followerId);
                            } else {
                                console.log("HERE TO FOLLOW ", followerId);
                                handleFollow(followerId);
                            }
                        };
                        return (
                            <div key={followerId} className="followerfollowing-list-item">
                                <UserAvatar size={32} profileImageUrl={followers[followerId].profileImageUrl} />
                                <h3 className="followerfollowing-title">{followers[followerId].username}</h3>
                                <button onClick={handleButtonClick} className={isFollowing ? 'unfollow-btn' : ''}>
                                    {isFollowing ? 'Unfollow' : 'Follow'}
                                </button>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <p>Loading followers...</p>
            )}
        </div>
    );
};

export default Followers;