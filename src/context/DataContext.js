import {  useState, useEffect, Children, createContext } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';
import useWindowSize from '../hooks/useWindowSize';

const DataContext = createContext({});
export const DataProvider = ({ children })=>{
    const { width } = useWindowSize();
    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

    useEffect(() => {
        setPosts(data);
    }, [data])

    useEffect(() => {
        const filteredResults = posts.filter((post) =>
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase()));

        setSearchResults(filteredResults.reverse());
    }, [posts, search])

    return (
        <DataContext.Provider value ={{
            posts, setPosts,search, setSearch,setSearchResults,
            searchResults,isLoading, data, fetchError, width
        }}>
            {children}
        </DataContext.Provider> 
    )
}
export default DataContext;

