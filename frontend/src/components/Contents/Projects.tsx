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
import { ProjectEnt } from '../../interfaces/ProjectEnt';
import { Add } from '@styled-icons/fluentui-system-filled';
import TextBox from '../TextBox';
import { getUserEntByUserId } from '../../firebase';
import UserAvatar from '../UserAvatar';
import { useUser } from '../../contexts/UserContext';
import { useAuth } from '../../contexts/AuthContext';
import { UserEnt } from '../../interfaces/UserEnt';



const Projects: React.FC = () => {
    const {
        viewedEntity,
        setViewedEntity,
        primaryEntity
    } = useUser();
    const { user } = useAuth();
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
            // Check if viewed entity is primary or other
            const isPrimaryAndViewedEntitySame = primaryEntity?.id === viewedEntity?.id;
            setIsPrimaryAndViewedEntitySame(isPrimaryAndViewedEntitySame);

            const newprojects: ProjectEnt[] = [
                {
                    id: '1',
                    data: {
                        title: "Advanced AI System: J.A.R.V.I.S 2.0",
                        description: "Develop an advanced artificial intelligence system to upgrade J.A.R.V.I.S. Enhance its capabilities in natural language processing, pattern recognition, and decision-making algorithms. Enable J.A.R.V.I.S to provide even more intuitive and efficient assistance to Tony Stark, from managing his suits and equipment to analyzing complex scientific data.",
                        startedOn: '2022-10-10',
                        status: 'live',
                        contributors: ["S2Dt4hRaLfTxnnxX0iw0q4hVrCw2", "DtOT6QEftzcbMeqSOhxcW2q9vLm1"],
                    }
                },
                {
                    id: '2',
                    data: {
                        title: "Next-Generation Suit Technology: Mark XLV",
                        description: "Create the next iteration of Iron Man's suit, Mark XLV, with cutting-edge technologies. Incorporate advanced materials for enhanced protection, propulsion systems for increased flight capabilities, and integrated weapon systems for improved combat effectiveness. Develop a streamlined user interface and advanced HUD (Heads-Up Display) for better situational awareness.",
                        startedOn: '2023-02-10',
                        status: 'live',
                        contributors: ["S2Dt4hRaLfTxnnxX0iw0q4hVrCw2", "DtOT6QEftzcbMeqSOhxcW2q9vLm1"],
                    }
                },
            ]

            // First collect the list of unique contributors from the list of projects
            const contributors: string[] = [];
            newprojects.forEach((project) => {
                project.data.contributors.forEach((contributor) => {
                    if (!contributors.includes(contributor)) {
                        contributors.push(contributor);
                    }
                });
            });

            // Then fetch the user data for each contributor
            const contributorsData = {};
            for (const contributor of contributors) {
                const contributorData = await getUserEntByUserId(contributor);
                contributorsData[contributor] = {
                    firstName: contributorData?.data.firstName,
                    lastName: contributorData?.data.lastName,
                    username: contributorData?.data.username,
                    profileImageUrl: contributorData?.data.profileImageUrl || null,
                };
            }
            setContributorsData(contributorsData);
            setProjects(newprojects);
            setCachedData(true); // Cache the data
            setLoading(false);
        }
        fetchProjects();
    }, [previousPath, navigate]);

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

    const handleCreate = () => {
        // setProjects([...projects, project]);
        closeModal();
    }


    const ProjectItem = ({ project }: { project: ProjectEnt }) => {
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
                    <div className="subheading">Contributors</div>
                    <div className="contributors-container">
                        {project.data.contributors.map((contributor) => {
                            const contributorData = contributorsData[contributor];
                            return (
                                <UserAvatar key={contributorData.username} firstName={contributorData.firstName} lastName={contributorData.lastName} profileImageUrl={contributorData.profileImageUrl} username={contributorData.username} size={42} />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    const renderProjectsForPrimary = () => {
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
                            <li>
                                <ButtonWithIcon
                                    className="create-project-btn"
                                    icon={<Add className="project-icon" size={20} />}
                                    iconPosition="left"
                                    onClick={startCreate}
                                />
                            </li>
                        </ul>
                    </div>

                    <div className="create-project-container">

                    </div>

                    {isPrimaryAndViewedEntitySame && (
                        <>
                            <div className="projects-list">
                                {renderProjectsForPrimary()}
                            </div>

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