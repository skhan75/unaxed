import React, { useState, ChangeEvent, FormEvent } from 'react';
import './styles/projects.css';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import { DocumentData } from 'firebase/firestore';
import { ProjectEnt } from '../../interfaces/ProjectEnt';

interface CreateProjectProps {
    onClose: () => void;
    setProjects?: React.Dispatch<React.SetStateAction<ProjectEnt[]>>;
}

interface ProjectData {
    title: string;
    description: string;
    timeline: string;
    contributors: string;
}

const CreateProject: React.FC<CreateProjectProps> = ({ onClose, setProjects }) => {
    const [projectData, setProjectData] = useState<ProjectData>({
        title: '',
        description: '',
        timeline: '',
        contributors: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProjectData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onClose();
    };

    const handleCreate = () => {
        const { title, description, timeline, contributors } = projectData;
        const newProject: ProjectEnt = {
            id: Math.random().toString(36).substr(2, 9),
            data: {
                title,
                description,
                timeline,
                contributors,
                status: 'parked',
            },
        };
        if (setProjects) {
            setProjects((prevProjects) => [...prevProjects, newProject]);
        }
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="create-project-container">
            <h2>Create New Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="project-title">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={projectData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="project-description">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={projectData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="project-timeline">
                    <label htmlFor="timeline">Timeline:</label>
                    <input
                        type="text"
                        id="timeline"
                        name="timeline"
                        value={projectData.timeline}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="contributors">Contributors:</label>
                    <input
                        type="text"
                        id="contributors"
                        name="contributors"
                        value={projectData.contributors}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="create-cancel-btns">
                    <ButtonWithIcon title="Cancel" secondary onClick={handleCancel} />
                    <ButtonWithIcon title="Create" onClick={handleCreate} />
                </div>
            </form>
        </div>
    );
};

export default CreateProject;
