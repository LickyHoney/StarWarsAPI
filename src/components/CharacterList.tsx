import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Pagination from "./Pagination";
import { login } from '../AuthService';
import Footer from "./Footer";

const swapi = axios.create({
    baseURL: "https://swapi.dev/api/"
});

interface Character {
    name: string;
    height: string;
    mass: string;
    species: string[];
    url: string;
    birth_year: string;
    created: string;
    films: string[];
    homeworld: string;
}

interface Homeworld {
    name: string;
    terrain: string;
    climate: string;
    residents: string[];
}

const CharacterList: React.FC = () => {
    const [people, setPeople] = useState<Character[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const history = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [homeworld, setHomeworld] = useState<Homeworld | null>(null);
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filterType, setFilterType] = useState<string | null>(null);
    const [filterValue, setFilterValue] = useState<string | null>(null);
    const [allCharacters, setAllCharacters] = useState<Character[]>([]);
    const [showHomeworld, setShowHomeworld] = useState(false);

    const sentinelRef = useRef<HTMLDivElement>(null);

    const fetchPeople = async () => {
        setLoading(true);
        try {
            const response = await swapi.get(`people/?page=1`);
            setPeople(response.data.results);
            setAllCharacters(response.data.results);
            setTotalPages(Math.ceil(response.data.count / pageSize));
        } catch (error) {
            setError('Error fetching characters');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPeople();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await login('demo', 'password');
                setUsername(response.username);
            } catch (error) {
                console.error('Login failed', error);
            }
        };

        fetchUserData();
    }, []);

    const openModal = async (character: Character) => {
        setSelectedCharacter(character);
        try {
            const homeworldResponse = await axios.get(character.homeworld);
            setHomeworld(homeworldResponse.data);
        } catch (error) {
            setError('Error fetching homeworld information');
        }
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setHomeworld(null);
    };

    const handleRefresh = async () => {
        setLoading(true);
        setError(null);
        try {
            await fetchPeople();
        } catch (error) {
            setError('Error refreshing characters');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        history('/login');
    };

    const handleReset = () => {
        setSearchTerm('');
        setFilterType(null);
        setFilterValue(null);
    };

    const filterCharacter = (character: Character): boolean => {
        switch (filterType) {
            case 'homeworld':
                return character.homeworld.toLowerCase() === filterValue?.toLowerCase();
            case 'film':
                return character.films.includes(filterValue || '');
            case 'species':
                return character.species.includes(filterValue || '');
            default:
                return true;
        }
    };

    const searchAndFilterCharacters = () => {
        return people.filter((character) => {
            return (
                character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (!filterType || !filterValue || filterCharacter(character))
            );
        });
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFilterType = event.target.value;
        setFilterType(selectedFilterType);
        setFilterValue(null);
    };

    const handleFilterValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFilterValue = event.target.value;
        setFilterValue(selectedFilterValue);
    };

    const uniqueValues = (key: keyof Character) => {
        return Array.from(new Set(allCharacters.flatMap((character) => character[key])));
    };

    const extractIdFromUrl = (url: string): string => {
        const id = url.split('/').filter(Boolean).pop();
        return id ? id : '';
    };

    useEffect(() => {
        const sentinel = sentinelRef.current;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && page < totalPages && !loading) {
                fetchMorePeople();
            }
        }, { threshold: 0.1 });

        if (sentinel) {
            observer.observe(sentinel);
        }

        return () => {
            if (sentinel) {
                observer.unobserve(sentinel);
            }
        };
    }, [page, totalPages, loading]);

    const fetchMorePeople = async () => {
        setLoading(true);
        try {
            const nextPage = Math.min(page + 1, totalPages);
            const response = await swapi.get(`people/?page=${nextPage}`);
            const newPeople: Character[] = response.data.results;
            const uniqueNewPeople = newPeople.filter((newPerson: Character) => !people.some((person: Character) => person.url === newPerson.url));
            setPeople(prevPeople => [...prevPeople, ...uniqueNewPeople]);
            setPage(nextPage);
        } catch (error) {
            setError('Error fetching more characters');
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (pageNum: number) => {
        setPage(pageNum);
    };

    return (
        <div className="container">
            <div className="content">
                <div className="header">
                    <h2>Star Wars Characters</h2>
                    <div className="logout-container">
                        <div className="logout-button btn-primary">
                            <button type="button" className="btn btn-primary" onClick={handleLogout}>
                                Logout  <i className="fas fa-sign-out-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='filter'>
                    <h3 className="list_header">Welcome, {username}!</h3>
                    <div className='filter_type'>
                        <label htmlFor="filterType">Filter By:</label>
                        <select id="filterType" onChange={handleFilterChange} value={filterType || ''}>
                            <option value="">Select Filter</option>
                            <option value="homeworld">Homeworld</option>
                            <option value="film">Film</option>
                            <option value="species">Species</option>
                        </select>
                        {filterType && (
                            <div>
                                <label htmlFor="filterValue">Filter Value:</label>
                                <select
                                    id="filterValue"
                                    onChange={handleFilterValueChange}
                                    value={filterValue || ''}
                                >
                                    <option value="">Select Value</option>
                                    {filterType === 'homeworld' && uniqueValues('homeworld').map((value, index) => (
                                        <option key={index} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                    {filterType === 'film' && uniqueValues('films').map((value, index) => (
                                        <option key={index} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                    {filterType === 'species' && uniqueValues('species').map((value, index) => (
                                        <option key={index} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {!loading && !error && (
                          <div id="sentinel" style={{height: '10px', background: 'transparent'}}/>
                        )}

                        <button className="btn_refresh" onClick={handleRefresh} disabled={loading}>
                          Refresh
                        </button>
                    </div>

                </div>

                <div className="form-outline" data-mdb-input-init>
                    <input
                        type="search"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="button" className="btn_reset" onClick={handleReset}>
                        Reset
                    </button>
                </div>

                {loading && <div className="loader"></div>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <ul className="character-list">
                    {searchAndFilterCharacters().map((character, index) => (
                        <div key={index} className="character-card" onClick={() => openModal(character)} >
                            <img
                                src={`https://starwars-visualguide.com/assets/img/characters/${extractIdFromUrl(character.url)}.jpg`}
                                alt={character.name}
                                className="character-image"
                            />
                            <h3 style={{ textAlign: "center" }}>{character.name}</h3>
                        </div>
                    ))}
                </ul>

                <div id="sentinel" ref={sentinelRef} style={{ height: '10px', background: 'transparent' }} />
            </div>

            <footer className="footer">
                <div className="pagination">
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
            </footer>

            <Modal
        className={"react-modal"}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Character Details Modal"
        ariaHideApp={false}
      >
        {selectedCharacter && 
        <div className='modal-content'>
        <h3 className='character-details'>{selectedCharacter?.name}</h3>
        <p>Height: {selectedCharacter?.height}M</p>
        <p>Mass: {selectedCharacter?.mass}KG</p>
        <p>Birth Year: {selectedCharacter?.birth_year}</p>
        <p>Date Added: {selectedCharacter?.created}</p>
      <p>Number of Films: {selectedCharacter?.films.length}</p> 

         {/* Button to toggle display of homeworld information */}
      <button onClick={() => setShowHomeworld(!showHomeworld)}>
        {showHomeworld ? 'Hide Homeworld Information' : 'Show Homeworld Information'}
      </button>

      {/* Display homeworld information if showHomeworld is true */}
      {showHomeworld && homeworld && (
        <>
          <h3 className="character-details">Homeworld Information</h3>
          <p>Name: {homeworld.name}</p>
          <p>Terrain: {homeworld.terrain}</p>
          <p>Climate: {homeworld.climate}</p>
          <p>Residents: {homeworld.residents.length}</p>
        </>
      )}

      <button onClick={closeModal}>Close</button>

        
      </div> 
        }
        
      </Modal>
        </div>
    );
};

export default CharacterList;
