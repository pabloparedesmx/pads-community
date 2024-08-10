import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Masonry from 'react-masonry-css';
import { ChevronLeft, ChevronRight, Upload, Globe, Twitter } from 'lucide-react';

const DesignerCard = ({ designer }) => (
  <div className="border rounded-lg p-4 shadow mb-4">
    <div className="mb-4">
      <div className="relative pb-[100%]">
        <img 
          src={designer.profile_picture || '/api/placeholder/300/300'}
          alt={designer.name} 
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
    <h2 className="text-xl font-semibold">{designer.name}</h2>
    <p className="text-sm text-gray-600">{designer.location}</p>
    <p className="mt-2">{designer.role}</p>
    <p className="mt-2">{designer.description}</p>
    <div className="mt-4 flex justify-between">
      <a href={designer.site} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center">
        <Globe size={16} className="mr-1" /> Site
      </a>
      <a href={`https://twitter.com/${designer.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center">
        <Twitter size={16} className="mr-1" /> Twitter
      </a>
    </div>
  </div>
);

const ProfileForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    role: '',
    site: '',
    twitter: '',
    description: '',
    profile_picture: null
  });

  const handleChange = (e) => {
    if (e.target.name === 'profile_picture') {
      setFormData({ ...formData, profile_picture: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg">
      {/* Add input fields for name, location, role, site, twitter, description */}
      {/* Add file input for profile_picture */}
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default function Home() {
  const [designers, setDesigners] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const designersPerPage = 12;

  useEffect(() => {
    fetchDesigners();
  }, []);

  const fetchDesigners = async () => {
    try {
      const response = await fetch('/api/designers');
      const data = await response.json();
      setDesigners(data);
    } catch (error) {
      console.error('Error fetching designers:', error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('/api/designers', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setShowForm(false);
        fetchDesigners();
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const indexOfLastDesigner = currentPage * designersPerPage;
  const indexOfFirstDesigner = indexOfLastDesigner - designersPerPage;
  const currentDesigners = designers.slice(indexOfFirstDesigner, indexOfLastDesigner);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>PADs Community</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="py-8">
        <h1 className="text-4xl font-bold">PADs Community</h1>
      </header>
      
      <div className="mb-8">
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {showForm ? 'Close Form' : 'Create Profile'}
        </button>
      </div>

      {showForm && <ProfileForm onSubmit={handleSubmit} />}

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {currentDesigners.map(designer => (
          <DesignerCard key={designer.id} designer={designer} />
        ))}
      </Masonry>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-1 px-3 py-1 rounded border"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="mx-2">Page {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastDesigner >= designers.length}
          className="mx-1 px-3 py-1 rounded border"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
