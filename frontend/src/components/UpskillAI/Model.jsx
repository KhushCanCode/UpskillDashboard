import React, { useContext, useState } from 'react';
import { DataProvider } from '../../App';
import { FaChevronDown } from 'react-icons/fa'; // Use react-icons for SVGs

function Model() {
  const { gpt, setModel } = useContext(DataProvider);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (selectedModel) => {
    setModel(selectedModel === 'gpt');
    setIsOpen(false); // Close the dropdown on selection
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block w-40 text-white">
      <div
        className="bg-stone text-sm font-bold p-2 lg:p-3 rounded-full cursor-pointer flex items-center justify-between transition-all duration-300"
        onClick={toggleDropdown}
      >
        {gpt ? 'GPT 4' : 'CLAUD SONNET 3.5'}
        <FaChevronDown className={`ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <ul className="absolute bg-gray-900 text-sm font-bold mt-2 w-full shadow-lg rounded-lg z-20 overflow-hidden">
          <li
            onClick={() => handleChange('gpt')}
            className={`p-2 lg:p-3 cursor-pointer hover:bg-stone transition-colors duration-300 ${
              gpt ? 'bg-stone' : 'bg-darkgreen'
            }`}
          >
            GPT 4
          </li>
          <li
            onClick={() => handleChange('claud')}
            className={`p-2 lg:p-3 cursor-pointer hover:bg-stone transition-colors duration-300 ${
              !gpt ? 'bg-stone' : 'bg-darkgreen'
            }`}
          >
            CLAUD SONNET 3.5
          </li>
        </ul>
      )}
    </div>
  );
}

export default Model;
