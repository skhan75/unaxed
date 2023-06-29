import React, { useEffect, useState } from 'react';
import './social-styles.css';
import UserAvatar from '../UserAvatar';
import { followUser, getDataForUser, getDataForUserByUserId, getFollowersByUserId, getFollowingByUserId, unfollowUser, unfollowUserByUserId } from '../../firebase';
import { useUser } from '../../contexts/UserContext';
import { useAuth } from '../../contexts/AuthContext';
import { UserEnt } from '../../interfaces/UserEnt';

// Define the follower interface

const Followers: React.FC = () => {
    const { 
        viewedEntity,
        setViewedEntity,
        primaryEntity
    } = useUser();
    const { user } = useAuth();
    const [isPrimaryAndViewedEntitySame, setIsPrimaryAndViewedEntitySame] = useState<boolean>(false);
    const [viewerFollowerData, setViewerFollowerData] = useState<any>({});
    const [viewerFollowingData, setViewerFollowingData] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFollowers = async () => {
            if(!user?.uid) {
                throw new Error('Error in loading primary user');
            }

            // Check if viewed entity is primary or other
            const isPrimaryAndViewedEntitySame = primaryEntity?.id === viewedEntity?.id;
            setIsPrimaryAndViewedEntitySame(isPrimaryAndViewedEntitySame);
            setLoading(true);

            let userId = user?.uid;

            if (!isPrimaryAndViewedEntitySame) {
                if(!viewedEntity?.id) {
                    throw new Error('Error in loading viewed user Ent');
                }
                userId = viewedEntity?.id;
            }

            const [followers, following] = await Promise.all([
                getFollowersByUserId(userId),
                getFollowingByUserId(userId),
            ]);
            setViewerFollowerData(followers);
            setViewerFollowingData(following);

            setLoading(false);
        };
        fetchFollowers();
    }, [viewedEntity, primaryEntity]);

    const followerCount = Object.keys(viewerFollowerData).length;

    // P.S. Currently only show the follow button if the user is not viewing their own profile
    const isUserFollowing = (followerId: string) => {
        return viewerFollowingData && viewerFollowingData.hasOwnProperty(followerId);
    };

    const handleFollow = async(followerId: string) => {
        try {
            const followerUserData = await getDataForUserByUserId(followerId);
            if (followerUserData) {
                const followUserEnt: UserEnt = {
                    id: followerId,
                    data: followerUserData,
                }
                if(primaryEntity) {
                    await followUser(primaryEntity, followUserEnt);
                    // Update the viewerFollowingData state with the followed user
                    setViewerFollowingData((prevviewerFollowingData) => ({
                        ...prevviewerFollowingData,
                        [followerId]: followUserEnt,
                    }));
                }
            } else {
                throw new Error('Unable to follow user. User not found.');
            }
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    const handleUnfollow = async(followerId: string) => {
        try {
            await unfollowUserByUserId(viewedEntity?.id, followerId);
            // Remove the unfollowed user from viewerFollowingData state
            setViewerFollowingData((prevviewerFollowingData) => {
                const updatedviewerFollowingData = { ...prevviewerFollowingData };
                delete updatedviewerFollowingData[followerId];
                return updatedviewerFollowingData;
            });
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    return (
        <div>
            <h1>Followers</h1>
            {!loading && followerCount > 0 ? (
                <div className="followerfollowing-list">
                    {Object.keys(viewerFollowerData).map((followerId: any) => {
                        const isFollowing = isUserFollowing(followerId);
                        const handleButtonClick = () => {
                            if (isFollowing) {
                                handleUnfollow(followerId);
                            } else {
                                handleFollow(followerId);
                            }
                        };
                        return (
                            <div key={followerId} className="followerfollowing-list-item">
                                <UserAvatar size={32} profileImageUrl={viewerFollowerData[followerId].profileImageUrl} />
                                <h3 className="followerfollowing-title">{viewerFollowerData[followerId].username}</h3>
                                {isPrimaryAndViewedEntitySame && (
                                    <button onClick={handleButtonClick} className={isFollowing ? 'unfollow-btn' : ''}>
                                        {isFollowing ? 'Unfollow' : 'Follow'}
                                    </button>
                                )}
                              
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