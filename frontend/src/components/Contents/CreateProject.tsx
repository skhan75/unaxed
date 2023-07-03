import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import './styles/projects.css';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import { ProjectContributorsEnt, ProjectData, ProjectEnt } from '../../interfaces/ProjectEnt';
import JustLineSeparator from '../JustLineSeparator';
import { addProject, addProjectForUser, 
    createProject, searchUsersIncrementallyByPartialUsername, 
    updateProject, uploadMediaForEntId 
} from '../../firebase';
import { UserEnt } from '../../interfaces/UserEnt';
import UserAvatar from '../UserAvatar';
import { Add } from '@styled-icons/fluentui-system-regular';
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';

interface CreateProjectProps {
    onClose: () => void;
    setProjects?: React.Dispatch<React.SetStateAction<ProjectEnt[]>>;
}

const CreateProject: React.FC<CreateProjectProps> = ({ onClose, setProjects }) => {
    const { user } = useAuth();
    const { userData } = useUser();
    const [projectData, setProjectData] = useState<ProjectData>({
        title: '',
        projectId: '',
        description: '',
        timeline: '',
        contributors: [],
        media: [],
        status: 'parked',
        startDate: {
            day: 1,
            month: 1,
            year: new Date().getFullYear(),
        },
        endDate: {
            day: 1,
            month: 1,
            year: new Date().getFullYear(),
        },
    });

    const [searchContributor, setSearchContributor] = useState('');
    const [searchResults, setSearchResults] = useState<UserEnt[]>([]);
    const [selectedMedia, setSelectedMedia] = useState<File[]>([]);
    const [allSelectedMedia, setAllSelectedMedia] = useState<{ mediaId: string, downloadUrl: string }[]>([]);
    const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
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
        const { value } = e.target;
        setSearchContributor(value);
    };

    const handleContributorSelection = (contributorUser: UserEnt) => {
        if (!projectData) return;

        const id = contributorUser.id;
        const data = contributorUser.data;
        const { username, firstName, lastName, profileImageUrl } = data;

        if (!projectData.contributors?.some((c) => c.data.contributorId === id)) {
            const newContributor: ProjectContributorsEnt = {
                id: id,
                data: {
                    contributorId: id,
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    profileImageUrl: profileImageUrl || "",
                },
            };

            setProjectData((prevData) => {
                if (prevData && prevData.contributors) {
                    return {
                        ...prevData,
                        contributors: [...prevData.contributors, newContributor],
                    };
                } else {
                    return {
                        ...prevData,
                        contributors: [newContributor],
                    }
                }
            });
        }
        setShowDropdown(false);
    };

    const handleContributorRemoval = (contributor: ProjectContributorsEnt) => {
        if (!projectData) return;

        setProjectData((prevData) => {
            if (prevData && prevData.contributors) {
                return {
                    ...prevData,
                    contributors: prevData.contributors.filter((c) => c.id !== contributor.id),
                };
            } else {
                return prevData;
            }
            return prevData;
        });
    };

    const handleStartDateChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProjectData((prevData: ProjectData) => {
            if (prevData.startDate) {
                return {
                    ...prevData,
                    startDate: {
                        ...(prevData.startDate || {}),
                        [name]: parseInt(value),
                    },
                };
            }
            return prevData;
        });
    };

    const handleEndDateChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProjectData((prevData: ProjectData) => {
            if (prevData.endDate) {
                return {
                    ...prevData,
                    endDate: {
                        ...(prevData.endDate || {}),
                        [name]: parseInt(value),
                    },
                };
            }
            return prevData;
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProjectData((prevData) => {
            if (prevData) {
                return {
                    ...prevData,
                    [name]: value,
                };
            }
            return prevData;
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onClose();
    };

    // Add the useEffect hook here
    useEffect(() => {

        if (allSelectedMedia.length > 0) {
            setProjectData((prevData) => {
                if (prevData) {
                    return {
                        ...prevData,
                        media: allSelectedMedia,
                    };
                }
                return prevData;
            });
        };

        const updateProjectRecords = async () => {
            // And update the Project records in the database
            if (currentProjectId) {
                await updateProject(currentProjectId, { media: allSelectedMedia } as ProjectData);
            }
        };

        updateProjectRecords();
    }, [allSelectedMedia]);

    const handleSave = async (e: FormEvent) => {
        e.preventDefault();

        // Now add the current user as a contributor to the project, since he/she is the one creating it
        const currentUserContributor: ProjectContributorsEnt = {
            id: user?.uid || userData?.userId,
            data: {
                contributorId: user?.uid || userData?.userId,
                username: userData?.username || "",
                firstName: userData?.firstName || "",
                lastName: userData?.lastName || "",
                profileImageUrl: userData?.profileImageUrl || "",
            },
        };

        const updatedProjectData = {
            ...projectData,
            contributors: [...(projectData.contributors || []), currentUserContributor],
        }

        setProjectData(updatedProjectData);

        if(!user?.uid) throw new Error("User not logged in");

        // Create a new project
        const projectEntId = await createProject(updatedProjectData);
        const projectRecordToUpdateOnContributors = { projects: [projectEntId] }

        // update the projects list on all contributors
        const allContributors = updatedProjectData.contributors || [];
        
        await Promise.all(allContributors.map(async (contributor) => {
           await addProjectForUser(projectEntId, contributor.id);
        }));
       

        // const newProjectId = await addProject(updatedProjectData, user?.uid);
        setCurrentProjectId(projectEntId);

        let newMedias = [] as { mediaId: string, downloadUrl: string }[];

        // If there are media files selected, add them to the storage and 
        // add the media IDs to the project data
        if (selectedMedia.length > 0) {
            const uploadPromises = selectedMedia.map(async (mediaFile) => {
                const uploadResponse = await uploadMediaForEntId(mediaFile, projectEntId);
                if(uploadResponse) {
                    const { mediaId, downloadUrl } = uploadResponse;
                    return { mediaId, downloadUrl };
                } else {
                    throw new Error("Error uploading media file");
                }
            });

            newMedias = await Promise.all(uploadPromises);
        };
        projectData.status = 'parked';
        setAllSelectedMedia(newMedias);

        const newProject: ProjectEnt = {
            id: projectEntId,
            data: projectData,
        };

        if (setProjects) {
            setProjects((prevProjects) => [...prevProjects, newProject]);
        }
        onClose();
    };
    
    const handleMediaRemoval = (file: File) => {
        setSelectedMedia((prevSelectedMedia) => prevSelectedMedia.filter((media) => media !== file));
    };

    const handleFileSelect = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFilesChosen = (event) => {
        const files = event.target.files;
        const selectedFilesArray = Array.from(files) as File[];
        setSelectedMedia(selectedFilesArray);
    };

    // To exclude the contributors that are already selected from the search results
    // Not the most efficient way, but it works for now.
    // TODO: Optimize this later to scale well, (maybe optimize the searchUsersIncrementallyByPartialUsername)
    const filteredSearchResults = searchResults.filter(
        (result) => !projectData?.contributors?.some((contributor) => contributor.data.username === result.data.username)
    );
    
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

    const isSaveDisabled = !projectData.title || !projectData.description;

    return (
        <div className="create-project-container">
            <div className="header">
                <div className="heading-2">Add Project</div>
                <JustLineSeparator className="line-separator" style={{ width: "100%" }} />
            </div>

            <div className="footer">
                <form onSubmit={handleSubmit}>
                    <div className="project-label">
                        <label htmlFor="title">Project Name</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={projectData?.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="project-label">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={projectData?.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="project-label">
                        <label htmlFor="media">Media</label>
                        <div className="selected-media-container">
                            <div className="selected-media-view-container">
                                {selectedMedia.map((file) => (
                                    <div key={file.name} className="selected-media-item">
                                        {file.type.startsWith('image/') ? (
                                            <img src={URL.createObjectURL(file)} alt={file.name} />
                                        ) : (
                                            <video src={URL.createObjectURL(file)}></video>
                                        )}
                                        <button
                                            type="button"
                                            className="remove-media"
                                            onClick={() => handleMediaRemoval(file)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="media-selection-container">
                                <div className="image-upload">
                                    <div className="custom-file-upload">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            id="media"
                                            name="media"
                                            multiple
                                            style={{ display: 'none' }}
                                            accept="image/*,video/*"
                                            onChange={handleFilesChosen}
                                        />
                                        <ButtonWithIcon
                                            title="Add Media"
                                            className="upload-button"
                                            icon=<Add size={15} />
                                            onClick={handleFileSelect}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="project-label">
                        <label htmlFor="startDate">Start Date</label>
                        <div className="date-selectors">
                            <div className="date-wrapper">
                                <div className="heading-4">Day</div>
                                <select name="day" value={projectData?.startDate?.day} onChange={handleStartDateChange}>
                                    {days.map((day) => (
                                        <option key={day} value={day}>
                                            {day}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="date-wrapper">
                                <div className="heading-4">Month</div>
                                <select name="month" value={projectData?.startDate?.month} onChange={handleStartDateChange}>
                                    {months.map((month) => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="date-wrapper">
                                <div className="heading-4">Year</div>
                                <select name="year" value={projectData?.startDate?.year} onChange={handleStartDateChange}>
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
                                <select name="day" value={projectData?.endDate?.day} onChange={handleStartDateChange}>
                                    {days.map((day) => (
                                        <option key={day} value={day}>
                                            {day}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="date-wrapper">
                                <div className="heading-4">Month</div>
                                <select name="month" value={projectData?.endDate?.month} onChange={handleStartDateChange}>
                                    {months.map((month) => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="date-wrapper">
                                <div className="heading-4">Year</div>
                                <select name="year" value={projectData?.endDate?.year} onChange={handleEndDateChange}>
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
                            value={projectData?.timeline}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="contributors">Contributors:</label>
                        <div className="selected-contributors-input">
                            {projectData?.contributors?.map((contributor) => (
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
                        <div className="btn-wrapper">
                            <ButtonWithIcon disabled={isSaveDisabled} className="save-btn" title="Save" onClick={handleSave} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProject;
