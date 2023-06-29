import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import UserAvatar from '../UserAvatar';
import { useAuth } from '../../contexts/AuthContext';
import { getFollowingByUserId, unfollowUserByUserId } from '../../firebase';
import './social-styles.css';

const Following: React.FC = () => {
    const {
        userData: primaryUserData,
        viewedEntity,
        setViewedEntity,
        primaryEntity
    } = useUser();
    const { user } = useAuth();
    const [isPrimaryAndViewedEntitySame, setIsPrimaryAndViewedEntitySame] = useState<boolean>(false);
    const [followingData, setFollowingData] = useState<any>({});
    const [ loading, setLoading ] = useState<boolean>(true);
    

    useEffect(() => {
        const fetchFollowing = async () => {
            if(!user?.uid) {
                throw new Error('Error in loading primary user');
            }

            // Check if viewed entity is primary or other
            const isPrimaryAndViewedEntitySame = primaryEntity?.id === viewedEntity?.id;
            setIsPrimaryAndViewedEntitySame(isPrimaryAndViewedEntitySame);

            let userId = user?.uid;

            if(!isPrimaryAndViewedEntitySame) {
                if(!viewedEntity?.id) {
                    throw new Error('Error in loading viewed user Ent');
                }
                userId = viewedEntity?.id;
            }

            const following = await getFollowingByUserId(userId);
            setFollowingData(following);
            setLoading(true);
        }
        fetchFollowing();

    }, [viewedEntity, primaryEntity]);

    const handleUnfollow = async (followerId: string) => {
        try {
            await unfollowUserByUserId(viewedEntity?.id, followerId);
            setFollowingData((prevFollowingData) => {
                const updatedviewerFollowingData = { ...prevFollowingData };
                delete updatedviewerFollowingData[followerId];
                return updatedviewerFollowingData;
            });
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    const followingCount = Object.keys(followingData).length;

    return (
        <div>
            <h1>Following</h1>
            {followingCount > 0 ? (
                <div className="followerfollowing-list">
                    {Object.keys(followingData).map((followingId: any) => {
                        const handleButtonClick = () => handleUnfollow(followingId);
                        return (
                            <div key={followingId} className="followerfollowing-list-item">
                                <UserAvatar size={32} profileImageUrl={followingData[followingId].profileImageUrl} />
                                <h3 className="followerfollowing-title">{followingData[followingId].username}</h3>
                                <button className="unfollow-btn" onClick={handleButtonClick}> Unfollow </button>
                            </div>
                        )
                    })}
                </div>
            ) : (
                    <p>Loading Following...</p>
            )}
        </div>
    );
};

export default Following;