import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Cast = () => {
  const { id } = useParams();
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const res = await axios.get(`https://movierecomendation-gilt.vercel.app/cast/${id}`);
        setCast(res.data);
      } catch (error) {
        console.error('Error fetching cast details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [id]);

  if (loading) return <div className="text-white text-center mt-10">Loading cast details...</div>;
  if (!cast) return <div className="text-red-500 text-center mt-10">Cast not found.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Image */}
        {cast.profile && (
          <img
            src={cast.profile}
            alt={cast.name}
            className="w-64 h-auto object-cover rounded-xl shadow-lg"
          />
        )}

        {/* Info */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{cast.name}</h1>
          <p className="text-gray-400 italic mb-4">{cast.knownFor}</p>

          <div className="space-y-2">
            {cast.birthday && (
              <p><span className="font-semibold">Birthday:</span> {cast.birthday}</p>
            )}
            {cast.deathday && (
              <p><span className="font-semibold">Died:</span> {cast.deathday}</p>
            )}
            {cast.placeOfBirth && (
              <p><span className="font-semibold">Place of Birth:</span> {cast.placeOfBirth}</p>
            )}
            <p><span className="font-semibold">Gender:</span> {cast.gender}</p>
            <p><span className="font-semibold">Popularity:</span> {cast.popularity.toFixed(1)}</p>
          </div>

          {cast.homepage && (
            <a
              href={cast.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-blue-400 hover:underline"
            >
              Official Website
            </a>
          )}
        </div>
      </div>

      {/* Biography */}
      {cast.biography && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-2">Biography</h2>
          <p className="text-gray-300 leading-relaxed">{cast.biography}</p>
        </div>
      )}
    </div>
  );
};

export default Cast;
