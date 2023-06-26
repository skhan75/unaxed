import React, { useEffect, useState } from 'react';
import './social-styles.css';
import UserAvatar from '../UserAvatar';
import { followUser, getDataForUser, getDataForUserByUserId, getFollowersByUserId, unfollowUser, unfollowUserByUserId } from '../../firebase';
import { useUser } from '../../contexts/UserContext';
import { useAuth } from '../../contexts/AuthContext';
import { UserEnt } from '../../interfaces/UserEnt';

// Define the follower interface
interface Follower {
    id: number;
    name: string;
}

const Followers: React.FC = () => {
    const { 
        userData:primaryUserData,
        viewedEntity,
        setViewedEntity,
        primaryEntity
    } = useUser();
    const { user } = useAuth();
    const [isPrimaryAndViewedEntitySame, setIsPrimaryAndViewedEntitySame] = useState<boolean>(false);
    const [followersData, setFollowersData] = useState<any>({});
    const [followingData, setFollowingData] = useState<any>({});
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

            const followers = await getFollowersByUserId(userId);
            setFollowersData(followers);
            const following = await getFollowersByUserId(userId);
            setFollowingData(following);

            setLoading(true);
        };
        fetchFollowers();
    }, [viewedEntity, primaryEntity]);

    const followersCount = primaryUserData?.followersCount;
    const followingCount = primaryUserData?.followingCount;

    // P.S. Currently only show the follow button if the user is not viewing their own profile
    const isUserFollowing = (followerId: string) => {
        return followingData && followingData.hasOwnProperty(followerId);
    };

    const handleFollow = async(followerId: string) => {
        try {
            console.log("Following");
            const followerUserData = await getDataForUserByUserId(followerId);
            if (followerUserData) {
                const followUserEnt: UserEnt = {
                    id: followerId,
                    data: followerUserData,
                }
                if(primaryEntity) {
                    await followUser(primaryEntity, followUserEnt);
                    // Update the followingData state with the followed user
                    setFollowingData((prevFollowingData) => ({
                        ...prevFollowingData,
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
            // Remove the unfollowed user from followingData state
            setFollowingData((prevFollowingData) => {
                const updatedFollowingData = { ...prevFollowingData };
                delete updatedFollowingData[followerId];
                return updatedFollowingData;
            });
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    return (
        <div>
            <h1>Followers</h1>
            {followersCount > 0 ? (
                <div className="followerfollowing-list">
                    {Object.keys(followersData).map((followerId: any) => {
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
                                <UserAvatar size={32} profileImageUrl={followersData[followerId].profileImageUrl} />
                                <h3 className="followerfollowing-title">{followersData[followerId].username}</h3>
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