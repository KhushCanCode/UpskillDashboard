import React, { useState, useRef, useEffect } from 'react';

function ChatInput({ Send, playing, handleReply, setTyping }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const textareaRef = useRef(null);
  const sendRef = useRef(null);
  const attachmentRef = useRef(null);
  const [popUpload, setPopUpload] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    autoResizeTextarea(e.target);
  };

  const autoResizeTextarea = (textarea) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleSend = () => {
    if (inputValue || selectedImage) {
      Send({ text: inputValue, image: selectedImage });
      setInputValue('');
      setSelectedImage(null);
      setTyping(true);
    }
    if (!inputValue && !selectedImage) {
      setTyping(false);
      handleReply(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setPopUpload(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (attachmentRef.current && !attachmentRef.current.contains(event.target)) {
        setPopUpload(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [attachmentRef]);

  return (
    <div
      className='flex justify-center items-center w-full h-auto max-h-[30%] mb-4 p-4 sm:p-2 '
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onPaste={handlePaste}
    >
      <div className='w-full md:w-[90%] max-w-3xl flex items-center justify-between bg-stone py-2 lg:py-3 px-4 rounded-lg border border-gray-600 working'>
        <div className='flex items-center w-full gap-2'>
          <img
            src="/assets/paperclip.svg"
            alt="Attach"
            className='cursor-pointer'
            onClick={() => setPopUpload((prevVal) => !prevVal)}
          />
          {selectedImage && (
            <div className="relative mb-2">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-[100px] object-cover h-[50px] rounded-lg"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 bg-red-500 text-white w-3 h-3 rounded-full flex items-center justify-center"
              >
                &times;
              </button>
            </div>
          )}
          <textarea
            ref={textareaRef}
            rows="1"
            value={inputValue}
            onChange={handleInputChange}
            placeholder='Ask UpskillAI'
            className='bg-stone outline-none text-txtcolor w-[90%] placeholder:text-gray-400 resize-none overflow-y-auto max-h-32 working'
            style={{ lineHeight: '1.5rem' }}
            disabled={playing}
          />
        </div>
        <button type="submit" onClick={handleSend}>
          <img
            src="/assets/send.svg"
            alt="Send"
            ref={sendRef}
            className='cursor-pointer'
          />
        </button>
      </div>
      {popUpload && (
        <div
          ref={attachmentRef}
          className="absolute flex items-center justify-between border-[1px] border-gray-600 bg-gray-900 rounded-xl p-2 h-[50px] w-[200px] text-[#999999] cursor-pointer hover:bg-gray-800 duration-150"
        >
          <label className="flex items-center cursor-pointer">
            <img width={"20px"} src="/assets/upload.svg" alt="Upload" />
            <p className="text-[13px] ml-2">Upload from computer</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
}

export default ChatInput;
