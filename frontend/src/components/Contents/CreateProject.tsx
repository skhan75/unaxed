import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import './styles/projects.css';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import { ProjectEnt } from '../../interfaces/ProjectEnt';
import JustLineSeparator from '../JustLineSeparator';
import { searchUsersIncrementallyByPartialUsername } from '../../firebase';
import { UserEnt } from '../../interfaces/UserEnt';

interface CreateProjectProps {
    onClose: () => void;
    setProjects?: React.Dispatch<React.SetStateAction<ProjectEnt[]>>;
}

interface ProjectData {
    title: string;
    description: string;
    timeline: string;
    contributors: Array<string>;
}

const CreateProject: React.FC<CreateProjectProps> = ({ onClose, setProjects }) => {
    const [projectData, setProjectData] = useState<ProjectData>({
        title: '',
        description: '',
        timeline: '',
        contributors: [],
    });

    const [searchContributor, setSearchContributor] = useState('');
    const [searchResults, setSearchResults] = useState<UserEnt[]>([]);
    const [selectedContributors, setSelectedContributors] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const search = async () => {
            if (searchContributor) {
                const results = await searchUsersIncrementallyByPartialUsername(searchContributor);
                setSearchResults(results);
                setShowDropdown(true);
            } else {
                setSearchResults([]);
                setShowDropdown(false);
            }
        };

        /* P.S. The logic to add timeout is added because without this fast backspacing is causing the search results on the display to persist. Kind of a hack for now, as this is not mission critical */
        
        // Clear the previous timeout, if any
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // Set a timeout before executing the search request
        searchTimeoutRef.current = setTimeout(() => {
            search();
        }, 180);  // 180 seems to be a good value for now

        // Clean up the timeout on unmount
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchContributor]);

    useEffect(() => {
        const handleBackspace = (event: KeyboardEvent) => {
            if (event.key === 'Backspace') {
                setSearchContributor((prevValue) => prevValue.slice(0, -1));
            }
        };

        const inputElement = inputRef.current;
        if (inputElement) {
            inputElement.addEventListener('keydown', handleBackspace);
        }

        return () => {
            if (inputElement) {
                inputElement.removeEventListener('keydown', handleBackspace);
            }
        };
    }, []);

    const handleContributorsInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearchContributor(value);
    };

    const handleContributorSelection = (contributor: UserEnt) => {
        setProjectData((prevData) => ({
            ...prevData,
            contributors: [...prevData.contributors, contributor.data.username],
        }));
        setShowDropdown(false);
    };

    const handleContributorRemoval = (contributor: string) => {
        setProjectData((prevData) => ({
            ...prevData,
            contributors: prevData.contributors.filter((c) => c !== contributor),
        }));
    };

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

    console.log("Projects ", projectData);

    return (
        <div className="create-project-container">
            <div className="header">
                <div className="heading-2">Add Project</div>
                <JustLineSeparator className="line-separator" style={{ width: "100%" }} />
            </div>

            <div className="footer">
                <form onSubmit={handleSubmit}>
                    <div className="project-title">
                        <label htmlFor="title">Project Name</label>
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
                        <div className="selected-contributors-input">
                            {projectData.contributors.map((contributor) => (
                                <div key={contributor} className="selected-contributor">
                                    {contributor}
                                    <button type="button" className="remove-contributor" onClick={() => handleContributorRemoval(contributor)}>
                                        &times;
                                    </button>
                                </div>
                            ))}
                            <input
                                type="text"
                                id="contributors"
                                name="contributors"
                                required
                                onChange={handleContributorsInputChange}
                                value={searchContributor}
                            />
                        </div>
                        {showDropdown && (
                            <ul className="contributors-dropdown">
                                {searchResults.map((result) => (
                                    <li key={result.id} onClick={() => handleContributorSelection(result)}>
                                        {result.data.username}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="create-cancel-btns">
                        <ButtonWithIcon title="Cancel" secondary onClick={handleCancel} />
                        <ButtonWithIcon title="Create" onClick={handleCreate} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProject;
