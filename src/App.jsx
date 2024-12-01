import axios from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";


export default function App() {
    const [data, setData] = useState([])
    const [photos, setPhotos] = useState(null)
    const [loadPage, setLoadPage] = useState('1');
    const loaderRef = useRef(null);

    useEffect(() => {
        async function getData() {
            let response = await axios.get(`http://localhost:3000/photos/?_page=${loadPage}&_per_page=20`);
            let data = await response.data;
            setPhotos(data);

            setData((prev) => {
                return [...prev, ...data.data];

            })

        }
        getData()
    }, [loadPage]);

    const clickHandler = () => {
        if (photos?.next) {
            setLoadPage(photos.next)
        }

    };

    useEffect(() => {

        const observer = new IntersectionObserver((items) => {
        const section = items[0];

        if (section.isIntersecting && photos?.next) {
            setLoadPage(photos.next)
        }
            
        })
       
      
       


        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [photos]);


    return (
        <div>
            <div>
                <ul>
                    {data.length !== 0 &&
                        data.map(photo => (
                            <li key={photo.id}>
                                <h3>
                                    {photo.title}

                                </h3>
                                <img width={150} src={photo.thumbnailUrl} alt="text" />
                            </li>
                        ))}
                </ul>
                <div className="text-center mb-5" ref={loaderRef}>
                    <p>Loading more...</p>
                </div>
                <div className="text-center mb-5">

                    <button onClick={clickHandler} className="bg-yellow-400 py-2 px-4 rounded">Load More</button>
                </div>
            </div>
        </div>
    )
}



// Intersection Observer setup


