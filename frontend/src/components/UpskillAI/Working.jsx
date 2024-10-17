import React, {
    useEffect,
    useState,
    useRef,
    useCallback,
    useContext,
  } from "react";
  import axios from "axios";
  import cursor from "/logo/Prompt/cursor.svg";
  import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
  import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
  import { Copy } from "lucide-react";
  import { api } from "../../utils/chatApi";
  import { DataProvider } from "../../App";
  import UpskillAI from "./UpskillAI";
  import Typewriter from "typewriter-effect";
  
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {},
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };
  
  function Working({ prompt, playing, handleReply, Typing, image }) {
    const [chats, setChats] = useState([]);
    const [pageHeight, setPageHeight] = useState(window.innerHeight);
    const [isLoading, setIsLoading] = useState(false);
    const lastPromptRef = useRef(null);
    const pageRef = useRef(null);
    const bottomRef = useRef(null);
    const replyRef = useRef(null);
    const logoRef = useRef(null);
    const scrollTimeoutRef = useRef(null);
    const [curID, setCurId] = useState("");
  
    const { token, setToken, chatId, changeId, gpt } = useContext(DataProvider);
    useEffect(() => {
      setCurId(chatId);
    }, [chatId]);
  
    const scrollToBottom = useCallback(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, []);
  
    useEffect(() => {
      const updateHeight = () => {
        setPageHeight(window.innerHeight);
        if (playing) {
          scrollToBottom();
        }
      };
  
      const intervalId = setInterval(updateHeight, 500);
  
      return () => clearInterval(intervalId);
    }, [handleReply, playing, scrollToBottom]);
  
    const debouncedScrollToBottom = useCallback(() => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        scrollToBottom();
      }, 100);
    }, [scrollToBottom]);
  
    useEffect(() => {
      debouncedScrollToBottom();
    }, [chats, debouncedScrollToBottom]);
  
    const parseMessage = (message) => {
      const segments = [];
      const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;
      let lastIndex = 0;
      let match;
  
      while ((match = codeRegex.exec(message)) !== null) {
        if (match.index > lastIndex) {
          segments.push({
            type: "text",
            content: message.slice(lastIndex, match.index),
          });
        }
        segments.push({
          type: "code",
          language: match[1] || "javascript",
          content: match[2].trim(),
        });
        lastIndex = match.index + match[0].length;
      }
  
      if (lastIndex < message.length) {
        segments.push({
          type: "text",
          content: message.slice(lastIndex),
        });
      }
  
      return segments;
    };
  
    const formatText = (text) => {
      // Replace ### headings
      text = text.replace(
        /### (.*)/g,
        '<h3 class="text-2xl font-bold my-2">$1</h3>'
      );
  
      // Replace ** for bold text
      text = text.replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-bold">$1</strong>'
      );
  
      // Replace * for italic text
      text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
  
      // Replace ` for inline code
      text = text.replace(
        /`([^`]+)`/g,
        '<code class="bg-gray-800 text-white px-1 py-0.5 rounded">$1</code>'
      );
      return text;
    };
  
    useEffect(() => {
      // Fetch initial chats from the database
      const fetchChats = async () => {
        try {
          const response = await axios.get(`${api}create/getChats/${chatId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const dbChats = response.data[0].chats;
  
          setChats(
            dbChats.map((chat) => ({
              user: chat.user,
              assistant: chat.assistant,
              segments: parseMessage(chat.assistant),
              currentSegment: parseMessage(chat.assistant).length,
              isTyping: false,
              image: chat.image,
              fromDatabase: true,
            }))
          );
        } catch (error) {
          console.error("Error fetching chats:", error);
        }
      };
  
      fetchChats();
    }, [chatId, token]);
  
    useEffect(() => {
      if (!prompt || isLoading || prompt === lastPromptRef.current) {
        return;
      }
  
      lastPromptRef.current = prompt;
      setIsLoading(true);
  
      setChats((prevChats) => [
        ...prevChats,
        {
          user: prompt,
          assistant: "",
          isTyping: true,
          segments: [],
          currentSegment: 0,
          image: image,
          fromDatabase: false,
        },
      ]);
  
      const fetchReply = async () => {
        try {
          const response = await fetch(
            `${api}prompting/${gpt ? "/sendPrompt" : "sendClaudPrompt"}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                query: prompt,
                sessionId: curID,
                chats: chats,
                image: image,
              }),
            }
          );
  
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
  
          let assistantReply = "";
   
  
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
           
            const chunk = decoder.decode(value);
            const lines = chunk.split("\n\n");
          
  
            for (const line of lines) {
              if (line.startsWith("{session: ")) {
                 const sessionId=JSON.parse(line.slice(10))
                 changeId(sessionId.sessionId)
              }
            
              if (line.startsWith("data: ")) {
                const data = JSON.parse(line.slice(6));
               
                if (data.done) {
                  // Stream has ended
                  
                  setChats((prevChats) => {
                    const updatedChats = [...prevChats];
                    const lastChat = updatedChats[updatedChats.length - 1];
                    updatedChats[updatedChats.length - 1] = {
                      ...lastChat,
                      isTyping: false,
                    };
                    return updatedChats;
                  });
                  break;
                }
  
                if (data.content) {
  
                  assistantReply += data.content;
                  setChats((prevChats) => {
                    const updatedChats = [...prevChats];
                    const lastChat = updatedChats[updatedChats.length - 1];
                    const segments = parseMessage(assistantReply);
  
                    updatedChats[updatedChats.length - 1] = {
                      ...lastChat,
                      assistant: assistantReply,
                      isTyping: true,
                      segments: segments,
                      currentSegment: segments.length,
                    };
                    return updatedChats;
                  });
  
                  debouncedScrollToBottom();
                }
              }
            }
          }
  
          handleReply(false);
        } catch (error) {
          console.error("Error fetching reply:", error);
          setChats((prevChats) => {
            const updatedChats = [...prevChats];
            updatedChats[updatedChats.length - 1] = {
              ...updatedChats[updatedChats.length - 1],
              assistant: "An error occurred while fetching the reply.",
              isTyping: false,
              segments: [
                {
                  type: "text",
                  content: "An error occurred while fetching the reply.",
                },
              ],
              currentSegment: 1,
            };
            return updatedChats;
          });
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchReply();
    }, [
      prompt,
      chats,
      token,
      chatId,
      curID,
      debouncedScrollToBottom,
      handleReply,
      changeId,
    ]);
  
    const renderSegment = (segment, isTyping) => {
      if (segment.type === "text") {
        return (
          <div
            dangerouslySetInnerHTML={{ __html: formatText(segment.content) }}
            className="whitespace-pre-wrap"
          />
        );
      } else if (segment.type === "code") {
        return (
          <div className="relative">
            <SyntaxHighlighter
              language={segment.language}
              style={atomDark}
              className="rounded-md"
            >
              {isTyping ? (
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter.typeString(segment.content).start();
                  }}
                  options={{
                    delay: 30,
                    cursor: "|",
                  }}
                />
              ) : (
                segment.content
              )}
            </SyntaxHighlighter>
  
            <button
              onClick={() => copyToClipboard(segment.content)}
              className="absolute top-2 right-2 text-white hover:text-gray-300"
              title="Copy code"
            >
              <Copy size={16} />
            </button>
          </div>
        );
      }
    };
  
    if (chats.length === 0) {
      return <UpskillAI />;
    }
  
    return (
      <div
        ref={pageRef}
        className="working w-[90%] lg:w-[55%]  mt-2 md:mt-0 flex flex-col h-[90%] overflow-y-auto p-4 rounded"
      >

        <div className="absolute left-16 top-0">
        </div>
        <div className="mt-12 "></div>
        {chats.map((item, chatIndex) => (
          <div key={chatIndex} className="mb-4 z-0">
            <div className="prompt w-full flex flex-col items-end mb-2">
              <div className="w-full max-w-[50%] p-2 bg-[#3e3e3e] rounded-xl relative">
                <pre className="text-[14px] text-white text-start whitespace-pre-wrap mt-4 mb-4 break-words font-mono">
                  {item.user}
                </pre>
                {item.image && (
                  <img
                    src={item.image}
                    alt="User uploaded image"
                    className="mt-2 max-w-[150px] min-w-[150px] h-[100px] rounded-xl"
                  />
                )}
                <button
                  onClick={() => copyToClipboard(item.user)}
                  className="absolute top-2 right-2 text-white hover:text-gray-300"
                  title="Copy prompt"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
            <div
              ref={replyRef}
              className="reply w-full p-4 bg-[#2e2f2e] rounded-xl"
            >
              <div className="text-[14px] text-white text-start break-words font-mono">
                <img
                  ref={logoRef}
                  src="/logo/logo.svg"
            
                  className=""
                  alt="Loading..."
                />
                {item.segments
                  ? item.segments.map((segment, segmentIndex) => (
                      <React.Fragment key={segmentIndex}>
                        {renderSegment(
                          segment,
                          item.isTyping &&
                            segmentIndex === item.currentSegment - 1
                        )}
                        {segmentIndex < item.segments.length - 1 && <br />}
                      </React.Fragment>
                    ))
                  : "Loading..."}
                {item.isTyping &&
                  item.currentSegment === item.segments.length && (
                    <img
                      src={cursor}
                      className="animate-pulse"
                      width={"25px"}
                      alt="Loading..."
                    />
                  )}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    );
  }
  
  export default Working;
  