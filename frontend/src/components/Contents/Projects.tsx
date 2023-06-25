import React, { useState, useEffect } from 'react';
import { Create } from '@styled-icons/ionicons-outline';
import { CheckCircle } from '@styled-icons/bootstrap';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import { Live } from '@styled-icons/fluentui-system-filled';
import TabWithIcon from '../Tabs/TabWithIcon';
import './styles/projects.css';
import { useLocation, useNavigate } from 'react-router-dom';

interface Project {
    id: string;
    title: string;
    status: string;
}

const Projects: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<string>('live');
    const [projects, setProjects] = useState<Project[]>([
        { id: '1', title: 'Project 1', status: 'live' },
        { id: '2', title: 'Project 2', status: 'live' },
        { id: '3', title: 'Project 3', status: 'completed' },
    ]);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
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
    }, [location.search]);

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

    const createProject = () => {
        // Generate a unique ID for the new project
        const projectId = Math.random().toString(36).substr(2, 9);

        // Create the new project object
        const newProject: Project = {
            id: projectId,
            title: `Project ${projectId}`,
            status: 'live',
        };

        // Add the new project to the projects array
        setProjects([...projects, newProject]);
    };

    const renderProjects = () => {
        const filteredProjects = projects.filter(
            (project) => project.status === currentTab
        );

        if (filteredProjects.length === 0) {
            return <p>No projects available.</p>;
        }

        return filteredProjects.map((project) => (
            <div className="projects-list-item" key={project.id}>
                <h3>{project.title}</h3>
                <p>Status: {project.status}</p>
            </div>
        ));
    };

    return (
        <div className="projects-container">
            <div className="projects-header">
            </div>

            <div className="projects-tabs">
                <ul>
                    <li>
                        <TabWithIcon
                            title="Live Projects"
                            icon={<Live className="tab-icon" size={18} />}
                            iconPosition="left"
                            onClick={() => handleTabChange('live')}
                            isActive={currentTab === 'live'}
                        />
                    </li>
                    <li>
                        <TabWithIcon
                            title="Completed Projects"
                            icon={<CheckCircle className="tab-icon" size={18} />}
                            iconPosition="left"
                            onClick={() => handleTabChange('completed')}
                            isActive={currentTab === 'completed'}
                        />
                    </li>
                </ul>
            </div>

            <div className="create-project-button">
                <ButtonWithIcon
                    title="Create Project"
                    icon={<Create className="post-icon" size={18} />}
                    iconPosition="left"
                    onClick={createProject}
                />
            </div>

            <div className="projects-list">{renderProjects()}</div>
        </div>
    );
};

export default Projects;
