import React, { useState, useEffect, useMemo } from 'react';
import { Create } from '@styled-icons/ionicons-outline';
import { CheckCircle } from '@styled-icons/bootstrap';
import { Parking } from '@styled-icons/boxicons-solid';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import TabWithIcon from '../Tabs/TabWithIcon';
import './styles/projects.css';
import { useLocation, useNavigate } from 'react-router-dom';
import LiveDot from '../LiveDot';
import Modal from '../Modal';
import CreateProject from './CreateProject';
import { ProjectContributorsEnt, ProjectEnt } from '../../interfaces/ProjectEnt';
import { Add } from '@styled-icons/fluentui-system-filled';
import TextBox from '../TextBox';
import { getProjectsByProjectId, getUserEntByUserId, setupPrimaryEntityListener } from '../../firebase';
import UserAvatar from '../UserAvatar';
import { useUser } from '../../contexts/UserContext';

const Projects: React.FC = () => {
    const {
        viewedEntity,
        setViewedEntity,
        primaryEntity
    } = useUser();
    const [currentTab, setCurrentTab] = useState<string>('live');
    const [previousPath, setPreviousPath] = useState<string>("");
    const [projects, setProjects] = useState<ProjectEnt[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [contributorsData, setContributorsData] = useState<Object>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [isPrimaryAndViewedEntitySame, setIsPrimaryAndViewedEntitySame] = useState<boolean>(false);
    const [cachedData, setCachedData] = useState<boolean>(false); // Add cachedData state

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handlePopstate = () => {
            window.location.reload();
        };
        window.addEventListener('popstate', handlePopstate);
        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);

    useEffect(() => {
        // This is to enable the back button to take back to previous path
        setPreviousPath(`${location.pathname}?tab=projects&type=${currentTab}`);

        // Update the current tab based on the URL parameter
        const searchParams = new URLSearchParams(location.search);
        const tab = searchParams.get('tab');
        const type = searchParams.get('type');
        if (tab === 'projects' && type) {
            setCurrentTab(type);
        } else {
            // Set the default type to 'live' and update the URL
            setCurrentTab('live');
            const searchParams = new URLSearchParams();
            searchParams.set('tab', 'projects');
            searchParams.set('type', 'live');
            navigate(`${location.pathname}?${searchParams.toString()}`);
        }

        const fetchProjects = async () => {
            if (!viewedEntity?.id) return;

            // Check if viewed entity is primary or other
            const isPrimaryAndViewedEntitySame = primaryEntity?.id === viewedEntity?.id;
            setIsPrimaryAndViewedEntitySame(isPrimaryAndViewedEntitySame);

            /* Fetch projects from the database by user ids (projects.data.contributors[..].id) */
            // Get all the project IDs for the viewed Ent
            const projectIds = viewedEntity?.data?.projects || [];

            console.log("Project IDs: ", projectIds);
            
            // Get all the projects for the viewed Ent
            const projectsList = await Promise.all(projectIds.map(async (projectId) => {
                const project = await getProjectsByProjectId(projectId);
                return project;
            }));

            console.log("Projects: ", projectsList);

            // First fetch synchronously for the primary user so that the data is available to view immediately
            // const primaryUserProjectIds = await getProjectsByUserId(viewedEntity?.id);
            // console.log("projects: ", primaryUserProjectIds);


            // First collect the list of unique contributors from the list of projects
            const contributors: ProjectContributorsEnt[] = [];
            projectsList.forEach((project) => {
                if(!project.data.contributors) return;
                project.data.contributors.forEach((contributor) => {
                    const existingContributor = contributors.find((c) => c.id === contributor.id);
                    if (!existingContributor) {
                        contributors.push(contributor);
                    }
                });
            });

            // Then fetch the user data for each contributor
            const contributorsData = {};
            await Promise.all(
                contributors.map(async (contributor) => {
                    const contributorData = await getUserEntByUserId(contributor.id);
                    contributorsData[contributor.id] = {
                        firstName: contributorData?.data.firstName,
                        lastName: contributorData?.data.lastName,
                        username: contributorData?.data.username,
                        profileImageUrl: contributorData?.data.profileImageUrl || null,
                    };
                })
            );

            setContributorsData(contributorsData);
            setProjects(projectsList);
            setCachedData(true); // Cache the data
            setLoading(false);
        }
        fetchProjects();

        // Setup viewed entity listener
        // This listener makes sure that the viewed entity is always up-to-date.
        // Because we always want to show the latest data for the viewed entity. 
        // Non viewed Ents can update their data in the background.(asynchronously)
        const unsubscribe = setupPrimaryEntityListener(viewedEntity?.id, setViewedEntity);

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [previousPath, navigate, viewedEntity?.id, primaryEntity?.id, setViewedEntity, primaryEntity?.data]);

    const handleTabChange = (type: string) => {
        setCurrentTab(type);

        // Create the new URL with the tab path
        const searchParams = new URLSearchParams();
        searchParams.set('tab', 'projects');
        searchParams.set('type', type);

        // Update the URL without refreshing the page
        navigate({
            pathname: location.pathname,
            search: '?' + searchParams.toString(),
        });
    };

    const startCreate = () => {
        // Generate a unique ID for the new project
        const projectId = Math.random().toString(36).substr(2, 9);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    }

    // console.log("PRimary: ", primaryEntity);

    const ProjectItem = ({ project }: { project: ProjectEnt }) => {
        console.log("Project: ", project);
        return (
            <div className="project-item-container">
                <div className="item">
                    <div className="heading-3">{project.data.title}</div>
                    <div className="subtitle">{project.data.startedOn} - Present</div>
                </div>
                <div className="item">
                    <TextBox content={project.data.description} maxLength={200} />
                </div>
                <div className="item">
                    {project.data.contributors.length > 0 && (
                        <>
                            <div className="subheading">Contributors</div>
                            <div className="contributors-container">
                                {project.data.contributors.map((contributor) => {
                                    const contributorData = contributor.data;
                                    return (
                                        <UserAvatar key={contributorData.username} firstName={contributorData.firstName} lastName={contributorData.lastName} profileImageUrl={contributorData.profileImageUrl} username={contributorData.username} size={42} />
                                    )
                                })}
                            </div>
                        </>
                    )}
                   
                </div>
            </div>
        )
    }

    const renderProjects = () => {
        const filteredProjects = projects.filter(
            (project) => project.data.status === currentTab
        );

        if (filteredProjects.length === 0) {
            return <p>No projects available.</p>;
        }

        return filteredProjects.map((project) => (
            <div className="projects-list-item" key={project.id}>
                <div className="project-item-container">
                    <ProjectItem project={project} />
                </div>
               
            </div>
        ));
    };

    return (
        <div className="projects-container">
            {loading ? (
                <div className="loading-container">
                    <div className="loading">Loading..</div>
                </div>

            ) : (
                <>
                    <div className="projects-header">
                    </div>

                    <div className="projects-tabs">
                        <ul>
                            <li>
                                <TabWithIcon
                                    title="Live"
                                    icon={<LiveDot />}
                                    iconPosition="left"
                                    onClick={() => handleTabChange('live')}
                                    isActive={currentTab === 'live'}
                                />
                            </li>
                            <li>
                                <TabWithIcon
                                    title="Completed"
                                    icon={<CheckCircle className="tab-icon" size={18} />}
                                    iconPosition="left"
                                    onClick={() => handleTabChange('completed')}
                                    isActive={currentTab === 'completed'}
                                />
                            </li>
                            <li>
                                <TabWithIcon
                                    title="Parked"
                                    icon={<Parking className="tab-icon" size={18} />}
                                    iconPosition="left"
                                    onClick={() => handleTabChange('parked')}
                                    isActive={currentTab === 'parked'}
                                />
                            </li>
                            <div className="spacer"></div>
                            {isPrimaryAndViewedEntitySame && (
                                <li>
                                    <ButtonWithIcon
                                        className="create-project-btn"
                                        icon={<Add className="project-icon" size={20} />}
                                        iconPosition="left"
                                        onClick={startCreate}
                                    />
                                </li>
                            )}
                           
                        </ul>
                    </div>

                    <div className="create-project-container">

                    </div>
                    <div className="projects-list">
                        {renderProjects()}
                    </div>
                    {isPrimaryAndViewedEntitySame && (
                        <>
                            <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
                                <CreateProject onClose={closeModal} setProjects={setProjects} />
                            </Modal>
                        </>
                    )}
                </>
            )}
            
        </div>
    );
};

export default Projects;