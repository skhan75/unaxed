// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// const SearchAsYouType = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchResults, setSearchResults] = useState([]);

//     useEffect(() => {
//         const db = firebase.firestore();
//         const searchCollection = db.collection('yourCollection');

//         // Define a search function that fetches the search results
//         const search = async () => {
//             const snapshot = await searchCollection
//                 .where('fieldToSearch', '>=', searchQuery)
//                 .where('fieldToSearch', '<=', searchQuery + '\uf8ff')
//                 .get();

//             const results = snapshot.docs.map((doc) => doc.data());
//             setSearchResults(results);
//         };

//         // Call the search function when the search query changes
//         search();
//     }, [searchQuery]);

//     const handleSearchInputChange = (event) => {
//         setSearchQuery(event.target.value);
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleSearchInputChange}
//                 placeholder="Search..."
//             />

//             <ul>
//                 {searchResults.map((result) => (
//                     <li key={result.id}>{result.fieldToDisplay}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default SearchAsYouType;
