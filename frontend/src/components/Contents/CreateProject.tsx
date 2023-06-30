import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import './styles/projects.css';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import { ProjectEnt } from '../../interfaces/ProjectEnt';
import JustLineSeparator from '../JustLineSeparator';
import { searchUsersIncrementallyByPartialUsername } from '../../firebase';
import { UserEnt } from '../../interfaces/UserEnt';
import UserAvatar from '../UserAvatar';

interface CreateProjectProps {
    onClose: () => void;
    setProjects?: React.Dispatch<React.SetStateAction<ProjectEnt[]>>;
}

interface ProjectData {
    title: string;
    description: string;
    startDate: {
        day: number;
        month: number;
        year: number;
    };
    endDate: {
        day: number;
        month: number;
        year: number;
    };
    timeline: string;
    contributors: UserEnt[];
}

const CreateProject: React.FC<CreateProjectProps> = ({ onClose, setProjects }) => {
    const [projectData, setProjectData] = useState<ProjectData>({
        title: '',
        description: '',
        startDate: {
            day: 0,
            month: 0,
            year: 0,
        },
        endDate: {
            day: 0,
            month: 0,
            year: 0,
        },
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
        if (!projectData.contributors.includes(contributor.data.username)) {
            setProjectData((prevData) => ({
                ...prevData,
                contributors: [...prevData.contributors, contributor],
            }));
        }
        setShowDropdown(false);
    };

    const handleContributorRemoval = (contributor: UserEnt) => {
        setProjectData((prevData) => ({
            ...prevData,
            contributors: prevData.contributors.filter((c) => c.id !== contributor.id),
        }));
    };

    const handleStartDateChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProjectData((prevData) => ({
            ...prevData,
            startDate: {
                ...prevData.startDate,
                [name]: parseInt(value),
            },
        }));
    };

    const handleEndDateChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProjectData((prevData) => ({
            ...prevData,
            endDate: {
                ...prevData.endDate,
                [name]: parseInt(value),
            },
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

    // To exclude the contributors that are already selected from the search results
    // Not the most efficient way, but it works for now.
    // TODO: Optimize this later to scale well, (maybe optimize the searchUsersIncrementallyByPartialUsername)
    const filteredSearchResults = searchResults.filter(
        (result) => !projectData.contributors.includes(result.data.username)
    );
    
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

    console.log("projectData", projectData);

    return (
        <div className="create-project-container">
            <div className="header">
                <div className="heading-2">Add Project</div>
                <JustLineSeparator className="line-separator" style={{ width: "100%" }} />
            </div>

            <div className="footer">
                <form onSubmit={handleSubmit}>
                    <UserAvatar profileImageUrl='' size={130}/>
                    <div className="image-upload">
                        <input className="file" type="file" accept="image/*" />
                    </div>
                    <div className="project-label">
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
                    <div className="project-label">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={projectData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="project-label">
                        <label htmlFor="media">Media</label>
                        <div className="image-upload">
                            <input className="file" type="file" accept="image/*" />
                        </div>
                    </div>
                    <div className="project-label">
                        <label htmlFor="startDate">Start Date</label>
                        <div className="date-selectors">
                            <div className="date-wrapper">
                                <div className="heading-4">Day</div>
                                <select name="day" value={projectData.startDate.day} onChange={handleStartDateChange}>
                                    {days.map((day) => (
                                        <option key={day} value={day}>
                                            {day}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="date-wrapper">
                                <div className="heading-4">Month</div>
                                <select name="month" value={projectData.startDate.month} onChange={handleStartDateChange}>
                                    {months.map((month) => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="date-wrapper">
                                <div className="heading-4">Year</div>
                                <select name="year" value={projectData.startDate.year} onChange={handleStartDateChange}>
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="project-label">
                        <label htmlFor="endDate">End Date</label>
                        <div className="date-selectors">
                            <div className="date-wrapper">
                                <div className="heading-4">Day</div>
                                <select name="day" value={projectData.endDate.day} onChange={handleStartDateChange}>
                                    {days.map((day) => (
                                        <option key={day} value={day}>
                                            {day}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="date-wrapper">
                                <div className="heading-4">Month</div>
                                <select name="month" value={projectData.endDate.month} onChange={handleStartDateChange}>
                                    {months.map((month) => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="date-wrapper">
                                <div className="heading-4">Year</div>
                                <select name="year" value={projectData.endDate.year} onChange={handleEndDateChange}>
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="project-label">
                        <label htmlFor="timeline">Timeline</label>
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
                                <div key={contributor.id} className="selected-contributor">
                                    <div className="dropdown-user">
                                        <UserAvatar size={24} username={contributor.data.username} profileImageUrl={contributor.data.profileImageUrl} firstName={contributor.data.firstName} lastName={contributor.data.lastName} />
                                        {contributor.data.username}
                                    </div>
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
                                {filteredSearchResults.map((result) => (
                                    <li key={result.id} onClick={() => handleContributorSelection(result)}>
                                        <div className="dropdown-user">
                                            <UserAvatar size={24} username={result.data.username} profileImageUrl={result.data.profileImageUrl} firstName={result.data.firstName} lastName={result.data.lastName} />
                                            {result.data.username}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="create-cancel-btns">
                        {/* <ButtonWithIcon title="Cancel" secondary onClick={handleCancel} /> */}
                        <div className="btn-wrapper">
                            <ButtonWithIcon className="save-btn" title="Save" onClick={handleCreate} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProject;
